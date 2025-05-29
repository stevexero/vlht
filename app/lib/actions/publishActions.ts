'use server';

// import { createClient } from '@/app/lib/supabase/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

/*****************************/
/* Publish post to Mailchimp */
/*****************************/
export const publishPostToMailchimpAction = async ({
  postId,
  title,
  content,
}: {
  postId: string;
  title: string;
  content: string;
}) => {
  // Configure Mailchimp client
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: 'us17', // From API key suffix
  });

  try {
    // Validate inputs
    if (!title?.trim()) {
      return { success: false, error: 'Title cannot be empty', data: null };
    }
    if (!content?.trim()) {
      return { success: false, error: 'Content cannot be empty', data: null };
    }
    if (!postId?.trim()) {
      return { success: false, error: 'Post ID cannot be empty', data: null };
    }

    // Create a Mailchimp campaign
    const campaign = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        list_id: process.env.MAILCHIMP_LIST_ID!,
      },
      settings: {
        subject_line: title,
        from_name: 'RSDNTONE',
        reply_to: 'r1@rsdntone.com',
        title: title,
      },
    });

    if ('id' in campaign) {
      // Set campaign content
      await mailchimp.campaigns.setContent(campaign.id, {
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; padding: 0; background-color: #f0f0f0; }
                .container {
                  max-width: 836px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                @media only screen and (max-width: 836px) {
                  .container {
                    width: 100% !important;
                    padding: 15px !important;
                  }
                }
              </style>
            </head>
            <body>
              <div class="container">
                ${content}
              </div>
            </body>
          </html>
        `,
      });

      // Send the campaign
      await mailchimp.campaigns.send(campaign.id);

      return { success: true, error: null, data: { campaignId: campaign.id } };
    } else {
      return { success: false, error: 'Failed to create campaign', data: null };
    }
  } catch (error) {
    console.error('Error publishing to Mailchimp:', error);
    if (error instanceof Error && 'response' in error) {
      const mailchimpError = error as {
        response: { body: { detail?: string } };
      };
      console.error('Mailchimp error details:', mailchimpError.response?.body);
      return {
        success: false,
        error: mailchimpError.response?.body?.detail || error.message,
        data: null,
      };
    }
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to publish to Mailchimp',
      data: null,
    };
  }
};
