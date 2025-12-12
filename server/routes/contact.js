import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required.' 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format.' 
    });
  }

  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Email credentials not configured');
    return res.status(500).json({ 
      success: false, 
      message: 'Email service not configured. Please contact the administrator.' 
    });
  }

  let mongoSaveSuccess = false;

  // Try to save to MongoDB (optional - don't fail if this fails)
  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    mongoSaveSuccess = true;
    console.log('✅ Contact saved to MongoDB');
  } catch (mongoError) {
    console.warn('⚠️ Failed to save to MongoDB (continuing with email):', mongoError.message);
    // Continue with email sending even if MongoDB save fails
  }

  // Send Email
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // force TLS for production (works behind Render proxy)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      ...(process.env.NODE_ENV === 'development' && {
        tls: {
          rejectUnauthorized: false, // Only in development
        },
      }),
    });

    const mailOptions = {
      from: `"Portfolio" <${process.env.EMAIL_USER}>`, // Use configured email as sender
      replyTo: email, // Allow replies to go to the form submitter
      to: process.env.EMAIL_USER, // Send to configured email
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (emailError) {
    console.error('❌ Error sending email:', emailError);
    
    // Provide more specific error message
    let errorMessage = 'Failed to send message.';
    if (emailError.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check email credentials.';
    } else if (emailError.code === 'ECONNECTION') {
      errorMessage = 'Failed to connect to email service.';
    }

    res.status(500).json({ 
      success: false, 
      message: errorMessage 
    });
  }
});

export default router;
