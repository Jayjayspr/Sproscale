import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, bedrijf, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Sproscale <onboarding@resend.dev>', // You might need to verify your domain in Resend for a custom domain
      to: ['jay.sprock00@gmail.com'],
      subject: `Nieuwe Lead: ${name} (${bedrijf})`,
      html: `
        <h1>Nieuwe Lead van Sproscale Website</h1>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Bedrijf:</strong> ${bedrijf}</p>
        <p><strong>Bericht/Uitdaging:</strong></p>
        <p>${message}</p>
        <hr />
        <p>Dit bericht is automatisch verzonden via het contactformulier op sproscale.com</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
