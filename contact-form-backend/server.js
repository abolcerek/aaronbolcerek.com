const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_USER = process.env.EMAIL_USER;

const app = express();

const corsOptions = {
    origin: 'https://abolcerek.github.io/aaronbolcerek.com',
    methods: ['GET', 'POST'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.post('/contact', (req, res) => {
    console.log('POST /contact hit!');
    const { name, email, message } = req.body;

    const mailOptions = {
        from: EMAIL_USER,
        to: 'abolcerek@gmail.com',
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        replyTo: email, 
    };

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Failed to send email.' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

// Debug catch-all route to log unmatched requests (Express 5.x safe)
app.all(/.*/, (req, res) => {
    console.log(`Unmatched request: ${req.method} ${req.path}`);
    res.status(404).send('Not found');
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port} (make sure you POST to 3001!)`);
});

const dbHOST = process.env.dbHOST;
console.log(`Database Host: ${dbHOST}`);
