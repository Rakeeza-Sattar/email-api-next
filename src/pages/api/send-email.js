import nodemailer from "nodemailer";

// API Handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    companyName,
    phone,
    email,
    businessID,
    businessType,
    vehicleType,
    language,
  } = req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !companyName ||
    !phone ||
    !email ||
    !businessID ||
    !businessType ||
    !vehicleType ||
    !language
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }
  console.log("EMAIL:", process.env.EMAIL);
  console.log("PASSWORD:", process.env.PASSWORD);

  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: "rakeezasattar53@gmail.com",
      subject: "New Form Submission",
      text: `
        New form submission details:

        First Name: ${firstName}
        Last Name: ${lastName}
        Company Name: ${companyName}
        Phone: ${phone}
        Email: ${email}
        Business ID: ${businessID}
        Business Type: ${businessType}
        Vehicle Type: ${vehicleType}
        Preferred Language: ${language}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
}
