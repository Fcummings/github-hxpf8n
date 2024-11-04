const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

exports.sendEmail = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'hello@flabs.io',
      replyTo: data.email,
      subject: 'New Contact Form Submission - F-Labs',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from F-Labs website contact form</small></p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      
      // Send confirmation email to the user
      const confirmationMailOptions = {
        from: process.env.GMAIL_USER,
        to: data.email,
        subject: 'Thank you for contacting F-Labs',
        html: `
          <h2>Thank you for reaching out to F-Labs!</h2>
          <p>We've received your message and will get back to you within 24-48 hours.</p>
          <p>Here's a copy of your message:</p>
          <hr>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Best regards,</p>
          <p>The F-Labs Team</p>
        `
      };
      
      await transporter.sendMail(confirmationMailOptions);
      
      // Update the document status
      await snap.ref.update({
        status: 'email_sent',
        emailSentAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Update the document status
      await snap.ref.update({
        status: 'email_failed',
        error: error.message
      });
      
      throw new functions.https.HttpsError('internal', 'Error sending email');
    }
  });