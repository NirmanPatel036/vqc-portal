// Supabase Edge Function to send welcome email
// Deploy this using: supabase functions deploy send-welcome-email

// @ts-ignore: Deno imports
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// @ts-ignore: Deno global
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    if (!email) {
      throw new Error('Email is required')
    }

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'VQC Playground <onboarding@resend.dev>', // Replace with the verified domain
        to: [email],
        subject: 'Welcome to VQC Playground Newsletter! 🎉',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px; }
                .button { display: inline-block; background: #fbbf24; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🚀 You're Aboard!</h1>
                </div>
                <div class="content">
                  <p>Hi there,</p>
                  <p>Thank you for subscribing to the <strong>VQC Playground Research Newsletter</strong>! You're now part of an exciting community exploring the cutting edge of quantum machine learning.</p>
                  
                  <h3>What to Expect:</h3>
                  <ul>
                    <li>📚 Latest quantum computing research papers and breakthroughs</li>
                    <li>🔬 Updates on variational quantum algorithms</li>
                    <li>💡 Tutorials and insights on quantum machine learning</li>
                    <li>✨ New features and improvements to the VQC Playground</li>
                  </ul>

                  <p>Get started by exploring our interactive playground:</p>
                  <a href="https://vqc-playground.vercel.app/playground" class="button">Launch Playground</a>

                  <p>Have questions or feedback? Reply to this email or reach out at <a href="mailto:nirman0511@gmail.com">nirman0511@gmail.com</a>.</p>

                  <p>Happy quantum computing!</p>
                  <p><strong>The VQC Playground Team</strong></p>
                </div>
                <div class="footer">
                  <p>You're receiving this because you subscribed to VQC Playground newsletter.</p>
                  <p>© 2025 VQC Playground. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      throw new Error(data.message || 'Failed to send email')
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
