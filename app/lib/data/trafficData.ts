export async function fetchTrafficData() {
  if (
    !process.env.NEXT_PUBLIC_UMAMI_API_URL ||
    !process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ||
    !process.env.UMAMI_API_KEY
  ) {
    console.error('Missing Umami environment variables:', {
      apiUrl: process.env.NEXT_PUBLIC_UMAMI_API_URL,
      websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      apiKey: process.env.UMAMI_API_KEY ? '[REDACTED]' : undefined,
    });
    return {
      stats: {
        pageviews: { value: 0 },
        visitors: { value: 0 },
        bounces: { value: 0 },
        visits: { value: 0 },
      },
      pageviews: [],
      referrers: [],
    };
  }

  const startAt = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days ago
  const endAt = Date.now();
  const timezone = 'America/Los_Angeles';

  let stats = {
    pageviews: { value: 0 },
    visitors: { value: 0 },
    bounces: { value: 0 },
    visits: { value: 0 },
  };
  let pageviews = [];
  let referrers = [];

  // Fetch summarized stats
  try {
    const statsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_UMAMI_API_URL}/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: { 'x-umami-api-key': `${process.env.UMAMI_API_KEY}` },
        cache: 'no-store',
      }
    );
    if (!statsResponse.ok) {
      console.error('Stats request failed:', {
        status: statsResponse.status,
        statusText: statsResponse.statusText,
        response: await statsResponse.text(),
      });
    } else {
      stats = await statsResponse.json();
    }
  } catch (error) {
    console.error('Stats fetch error:', error);
  }

  try {
    const pageviewsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_UMAMI_API_URL}/websites/${
        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
      }/pageviews?startAt=${startAt}&endAt=${endAt}&unit=day&timezone=${encodeURIComponent(
        timezone
      )}`,
      {
        headers: { 'x-umami-api-key': `${process.env.UMAMI_API_KEY}` },
        cache: 'no-store',
      }
    );
    if (!pageviewsResponse.ok) {
      console.error('Pageviews request failed:', {
        status: pageviewsResponse.status,
        statusText: pageviewsResponse.statusText,
        response: await pageviewsResponse.text(),
      });
    } else {
      const data = await pageviewsResponse.json();
      pageviews = data.pageviews;
    }
  } catch (error) {
    console.error('Pageviews fetch error:', error);
  }

  try {
    const referrersResponse = await fetch(
      `${process.env.NEXT_PUBLIC_UMAMI_API_URL}/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/metrics?startAt=${startAt}&endAt=${endAt}&type=referrer&limit=5`,
      {
        headers: { 'x-umami-api-key': `${process.env.UMAMI_API_KEY}` },
        cache: 'no-store',
      }
    );
    if (!referrersResponse.ok) {
      console.error('Referrers request failed:', {
        status: referrersResponse.status,
        statusText: referrersResponse.statusText,
        response: await referrersResponse.text(),
      });
    } else {
      referrers = await referrersResponse.json();
    }
  } catch (error) {
    console.error('Referrers fetch error:', error);
  }

  return { stats, pageviews, referrers };
}
