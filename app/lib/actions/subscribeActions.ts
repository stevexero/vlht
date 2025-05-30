'use server';

// Subscribe to mailchimp
export const subscribeToMailchimp = async (formData: FormData) => {
  const email = formData.get('email');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string)) {
    return { success: false, message: 'Please enter a valid email address' };
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const dc = apiKey?.split('-')[1];

  if (!apiKey || !listId || !dc) {
    return { success: false, message: 'Mailchimp configuration missing' };
  }

  try {
    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString(
            'base64'
          )}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || 'Failed to subscribe to newsletter',
      };
    }

    return {
      success: true,
      message: 'Subscribed to newsletter successfully',
    };
  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    return {
      success: false,
      message: 'An error occurred while subscribing to the newsletter',
    };
  }

  //   const response = await fetch(
  //     `https://rsdntone.us17.list-manage.com/subscribe/post?u=b627e9c3d4852a46d048685ac&amp;id=5046240ccf`,
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({ email }),
  //     }
  //   );

  //   if (!response.ok) {
  //     return { success: false, message: 'Failed to subscribe to newsletter' };
  //   }

  //   return { success: true, message: 'Subscribed to newsletter' };
};
