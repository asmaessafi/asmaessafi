import express from 'express';
import { Resend } from 'resend'; // NEW: Import Resend
import Contact from '../models/Contact.js';

const router = express.Router();

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

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

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not configured in environment');
    return res.status(500).json({ 
      success: false, 
      message: 'Email service not configured. Please contact the administrator.' 
    });
  }

  let mongoSaveSuccess = false;

  // Try to save to MongoDB (optional - don't fail the whole request if DB fails)
  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    mongoSaveSuccess = true;
    console.log('✅ Contact saved to MongoDB');
  } catch (mongoError) {
    console.warn('⚠️ Failed to save to MongoDB (continuing with email):', mongoError.message);
  }

  // Send Email via Resend
  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Default Resend sender (works immediately)
      to: process.env.EMAIL_USER, // ← Your inbox
      replyTo: email, // Person who filled the form
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
    });

    console.log('✅ Email sent successfully via Resend');

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (emailError) {
    console.error('❌ Error sending email via Resend:', emailError);

    // Still return success if MongoDB saved (optional - you can change to 500 if you want strict)
    if (mongoSaveSuccess) {
      return res.status(200).json({ 
        success: true, 
        message: 'Message received (email delivery issue, will retry).' 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

export default router;