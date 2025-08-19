import Contact from "../models/contactModel.js";
import nodemailer from "nodemailer";

export const createContact = async (req, res) => {
  try {
    const data = req.body;
    console.log("data", data);

    if (!req.body) {
      return res
        .status(403)
        .json({ success: false, message: "Contact fields are required" });
    }
    // 1. Save booking to DB
    const contactsData = await Contact.create(data);

    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Email content
    const mailOptions = {
      from: `"${data.name}" <${process.env.EMAIL_USER}>`, // Gmail will use your auth account
      replyTo: data.email, // Owner can reply directly to customer
      to: process.env.EMAIL_USER, // Owner's email
      subject: `Contact Us: ${data.name}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; background: #ffffff;">
        <div style="background: orange; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Contact Deatail!</h1>
          <p style="margin: 5px 0;">Thank you for contact us</p>
        </div>

        <div style="padding: 20px; color: #333;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Customer Details</h2>
          <p><strong>Custemer Name:</strong> ${contactsData.name}</p>
          <p><strong>Custemer Email:</strong> ${contactsData.email}</p>
          <p><strong>Subject:</strong> ${contactsData.subject}</p>
          <p><strong>Message:</strong> ${contactsData.message}</p>
        <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555;">
          &copy; ${new Date().getFullYear()} Northscape Tours and Travels. All rights reserved.
        </div>
      </div>
      `,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Contact created and email sent",
      contactsData,
    });
  } catch (error) {
    console.error("Contacting error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create contact" });
  }
};
