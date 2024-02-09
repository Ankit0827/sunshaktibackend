require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  methods: "POST",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { First_name, Last_name, Email, Mobile, Solar_for, Light_bill } =
    req.body;
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email content
  const mailOptions = {
    from: Email,
    to: "a.verma0827@gmail.com",
    subject: "Request for pricing",
    text:
      `Hello Sir, I want to know the pricing of the solar panel.Let me know when will we contact to each others for further discusion and also you can contact me given by the following details.
Full Name: ${First_name}` +
      `${Last_name}
Email: ${Email}
Mobile: ${Mobile}
Light bills: ${Light_bill}
Solar for: ${Solar_for}
`,
  };

  try {
    console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
