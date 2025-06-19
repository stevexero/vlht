'use server';

import { createClient } from '@/app/lib/supabase/server';

/****************************/
/* Add Days of Availability */
/****************************/
export const updateDaysOfAvailability = async (formData: FormData) => {
  const userId = formData.get('userId');
  const days = {
    monday: formData.get('monday') === 'true',
    tuesday: formData.get('tuesday') === 'true',
    wednesday: formData.get('wednesday') === 'true',
    thursday: formData.get('thursday') === 'true',
    friday: formData.get('friday') === 'true',
    saturday: formData.get('saturday') === 'true',
    sunday: formData.get('sunday') === 'true',
  };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_days_availability')
    .upsert({ user_id: userId, ...days })
    .select('*');

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/****************/
/* Add Schedule */
/****************/
export const addSchedule = async (formData: FormData) => {
  const supabase = await createClient();

  const userId = formData.get('userId') as string;
  const scheduleName = formData.get('scheduleName') as string;
  const timeInterval = parseInt(formData.get('timeInterval') as string);
  const duration = parseInt(formData.get('duration') as string);
  const maxDuration = parseInt(formData.get('maxDuration') as string);
  const startTime = formData.get('startTime') as string;
  const endTime = formData.get('endTime') as string;
  const days = JSON.parse(formData.get('days') as string);
  const selectedTimeSlots = JSON.parse(
    formData.get('selectedTimeSlots') as string
  );
  const allAvailableDays = formData.get('allAvailableDays') === 'true';

  console.log('selectedTimeSlots', selectedTimeSlots); // Logs 'selectedTimeSlots { all: [ '09:00', '10:00', '11:00', '13:00', '17:00' ] }'

  try {
    // First create the days record
    const { data: daysData, error: daysError } = await supabase
      .from('days')
      .insert({
        user_id: userId,
        monday: days.monday,
        tuesday: days.tuesday,
        wednesday: days.wednesday,
        thursday: days.thursday,
        friday: days.friday,
        saturday: days.saturday,
        sunday: days.sunday,
      })
      .select('id')
      .single();

    if (daysError) throw daysError;

    // Then create the schedule with the days ID
    const { data: scheduleData, error: scheduleError } = await supabase
      .from('schedules')
      .insert({
        user_id: userId,
        name: scheduleName,
        days: daysData.id,
        time_interval: timeInterval,
        duration: duration,
        max_duration: maxDuration,
        start_time: startTime,
        end_time: endTime,
      })
      .select('id')
      .single();

    if (scheduleError) throw scheduleError;

    // Get all time slots from database
    const { data: timeSlotsData, error: timeSlotsError } = await supabase
      .from('time_slots_reference')
      .select('id, slot_time');

    if (timeSlotsError) throw timeSlotsError;

    // Create a map of time strings to IDs (using HH:MM format as key)
    const timeSlotMap = new Map(
      timeSlotsData.map((slot) => [slot.slot_time.substring(0, 5), slot.id])
    );

    // Prepare time slot insertions
    const timeSlotInserts = [];

    if (allAvailableDays) {
      // If all available days, use the 'all' time slots for each available day
      const allTimeSlots = selectedTimeSlots.all || [];
      const availableDayNames = Object.keys(days).filter((day) => days[day]);

      for (const day of availableDayNames) {
        for (const slotTime of allTimeSlots) {
          const slotTimeId = timeSlotMap.get(slotTime);
          if (slotTimeId) {
            timeSlotInserts.push({
              schedule_id: scheduleData.id,
              day,
              slot_time_id: slotTimeId,
            });
          }
        }
      }
    } else {
      // If specific days, use each day's specific time slots
      for (const [day, isAvailable] of Object.entries(days)) {
        if (isAvailable && selectedTimeSlots[day]) {
          for (const slotTime of selectedTimeSlots[day]) {
            const slotTimeId = timeSlotMap.get(slotTime);
            if (slotTimeId) {
              timeSlotInserts.push({
                schedule_id: scheduleData.id,
                day,
                slot_time_id: slotTimeId,
              });
            }
          }
        }
      }
    }

    console.log('timeSlotInserts', timeSlotInserts);

    // Insert all time slots
    if (timeSlotInserts.length > 0) {
      const { error: insertError } = await supabase
        .from('schedule_time_slots')
        .insert(timeSlotInserts);

      if (insertError) throw insertError;
    }

    return {
      success: true,
      error: null,
      data: {
        scheduleId: scheduleData.id,
        daysId: daysData.id,
      },
    };
  } catch (error) {
    console.error('Error creating schedule:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
      data: null,
    };
  }
};
