
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'POST',
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.post('/send-email', async (req, res) => {
    const { company_name, phone, email, pincode, messages } = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Email content
    const mailOptions = {
        from: email,
        to: "a.verma0827@gmail.com",
        subject: "Request for pricing",
        text: `
            Company Name: ${company_name}
            Phone: ${phone}
            Email: ${email}
            Pincode: ${pincode}
            Message: ${messages}
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions); 
        console.log("Email sent:", info.response);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
