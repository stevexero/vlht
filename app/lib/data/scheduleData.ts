import { createClient } from '@/app/lib/supabase/server';

/***************************************/
/* Get Days of Availability by User ID */
/***************************************/
export const getDaysOfAvailabilityByUserId = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_days_availability')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/*******************************************/
/* Get Days of Availability (for bookings) */
/*******************************************/
export const getDaysOfAvailability = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('days').select('*');

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/*********************/
/* Get All Schedules */
/*********************/
export const getAllSchedules = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedules_with_days_and_slots')
    .select('*');

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/*************************/
/* Get User's Schedules */
/*************************/
export const getUserSchedules = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedules_with_days_and_slots')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/**********************/
/* Get All Time Slots */
/**********************/
export const getAllTimeSlots = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('time_slots_reference')
    .select('*');

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/**********************************************/
/* Get All Schedule Time Slots by Schedule ID */
/**********************************************/
export const getAllScheduleTimeSlotsByScheduleId = async (
  scheduleId: string
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedule_time_slots')
    .select('*')
    .eq('schedule_id', scheduleId);

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};
