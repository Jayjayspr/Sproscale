import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      company_name, 
      email, 
      kvk_number, 
      btw_number, 
      billing_address, 
      selected_service,
      meta_access, 
      google_access, 
      linkedin_access, 
      deadline, 
      remarks 
    } = body;

    // Send email to ADMIN (jay.sprock00@gmail.com)
    await resend.emails.send({
      from: 'Sproscale Onboarding <onboarding@resend.dev>',
      to: ['jay.sprock00@gmail.com'],
      subject: `Nieuwe Onboarding: ${company_name} (${selected_service})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">Nieuwe Klant Aan Boord! 🚀</h1>
          <p><strong>Bedrijf:</strong> ${company_name}</p>
          <p><strong>Gekozen Service:</strong> <span style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${selected_service}</span></p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>KVK:</strong> ${kvk_number}</p>
          <p><strong>BTW:</strong> ${btw_number}</p>
          <p><strong>Adres:</strong> ${billing_address}</p>
          
          <h3 style="margin-top: 30px; color: #333;">Koppelingsverzoeken:</h3>
          <ul>
            <li>Meta Access: ${meta_access ? '✅ Ja' : '❌ Nee'}</li>
            <li>Google Access: ${google_access ? '✅ Ja' : '❌ Nee'}</li>
            <li>LinkedIn Access: ${linkedin_access ? '✅ Ja' : '❌ Nee'}</li>
          </ul>

          <h3 style="margin-top: 30px; color: #333;">Project Details:</h3>
          <p><strong>Gewenste Deadline:</strong> ${deadline || 'Niet opgegeven'}</p>
          <p><strong>Opmerkingen:</strong> ${remarks || 'Geen'}</p>
          
          <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888; text-align: center;">Automatisch verzonden vanaf sproscale.com</p>
        </div>
      `,
    });

    // Send confirmation to CLIENT
    await resend.emails.send({
      from: 'Sproscale Onboarding <onboarding@resend.dev>',
      to: [email],
      subject: `Welkom bij Sproscale! 👋`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <div style="background-color: #000; color: #fff; padding: 40px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; letter-spacing: -0.02em;">Welkom bij <span style="font-style: italic; color: #888;">Sproscale.</span></h1>
          </div>
          <div style="padding: 40px; line-height: 1.6; color: #333;">
            <p style="font-size: 18px;">Beste <strong>${company_name}</strong>,</p>
            <p>Wat geweldig dat we samen aan de slag gaan! We hebben je onboardinggegevens in goede orde ontvangen voor het volgende project: <strong>${selected_service}</strong>.</p>
            
            <p>Bij Sproscale geloven we in snelheid en resultaat. Ons team gaat direct aan de slag met het voorbereiden van jouw systemen voor maximale schaalbaarheid.</p>

            <div style="background-color: #f9f9f9; border: 1px solid #eee; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="margin: 0; font-weight: bold; color: #000;">Project Overzicht:</p>
              <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #555;">
                <li>Service: ${selected_service}</li>
                <li>Gewenste Deadline: ${deadline || 'N.v.t.'}</li>
              </ul>
            </div>

            <p>Wat zijn de volgende stappen?</p>
            <ol style="padding-left: 20px;">
              <li style="margin-bottom: 10px;"><strong>Review:</strong> Ons team controleert de verstrekte gegevens en koppelingen.</li>
              <li style="margin-bottom: 10px;"><strong>Strategiecall:</strong> Je ontvangt binnen 24 uur een uitnodiging voor onze uitgebreide intake.</li>
              <li style="margin-bottom: 10px;"><strong>Kick-off:</strong> We maken een vliegende start met de realisatie van jouw doelen.</li>
            </ol>

            <p style="margin-top: 30px;">We kijken er ontzettend naar uit om samen met jou de grenzen van marketing en AI te verleggen!</p>
            
            <div style="margin-top: 40px; border-top: 1px solid #f0f0f0; padding-top: 20px;">
              <p style="margin-bottom: 0;">Met vriendelijke groet,</p>
              <p style="margin-top: 5px; font-weight: bold; color: #000; font-size: 18px;">Jay Sprock</p>
              <p style="margin: 0; color: #666; font-size: 14px;">Founder, Sproscale</p>
            </div>
          </div>
          <div style="background-color: #fcfcfc; padding: 20px; text-align: center; border-top: 1px solid #f0f0f0;">
             <p style="margin: 0; font-size: 12px; color: #999;">&copy; 2026 Sproscale. Schaalbaarheid door intelligentie.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Onboarding API Error:', error);
    return NextResponse.json({ error: 'Failed to complete onboarding' }, { status: 500 });
  }
}
