import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Save to MongoDB
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
      // ,
      // ...(process.env.NODE_ENV === 'development' && {
      //   tls: {
      //     rejectUnauthorized: false, // Only in development
      //   },
      // }),
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // or a different receiving email
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

export default router;
