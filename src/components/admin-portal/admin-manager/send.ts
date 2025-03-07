import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

async function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail', // Gmail service
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables for security
      pass: process.env.EMAIL_PASS, // App password for Gmail with 2FA enabled
    },
    debug: true,  // This will log all the SMTP communication for debugging
  });
}

async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<void> {
  const transporter = await createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address
    subject, // Email subject
    text, // Plain text body
    html, // HTML body
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Example usage of sendEmail function:
sendEmail({
  to: 'jrv123756@example.com',
  subject: 'Hello from TypeScript!',
  text: 'This is a plain text body.',
  html: '<p>This is an <strong>HTML</strong> body.</p>',
}).catch((error) => console.error(error));
