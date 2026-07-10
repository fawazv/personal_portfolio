import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, role, quote } = await req.json();

    if (!name || !role || !quote) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn(
        '⚠️ EMAIL_USER or EMAIL_PASS environment variables are missing. Mocking successful testimonial submission.\n' +
        'To configure real email sending, add them to your .env.local file.\n' +
        `Mocked Testimonial: Name: ${name}, Role: ${role}, Quote: ${quote}`
      );
      return NextResponse.json({ message: 'Testimonial submitted successfully (mock mode)' }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Testimonial Submission: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">New Testimonial Submission</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Role/Company:</strong> ${role}</p>
          </div>
          <div style="background-color: #fff; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
            <p><strong>Start of Quote:</strong></p>
            <p style="font-style: italic; color: #555;">"${quote}"</p>
            <p><strong>End of Quote</strong></p>
          </div>
          <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">
             Review this testimonial and add it to <code>src/components/Testimonials.tsx</code> if approved.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Testimonial submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send testimonial email:', error);
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}
