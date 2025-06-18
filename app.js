const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const memberRoutes = require('./routes/memberRoutes');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use('/', memberRoutes);

app.post('/send', async (req, res) => {
  const { name, email } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email provider
    auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
},
  });

  let mailOptions = {
    from: 'tezhumai@gmail.com',
    to: [email, 'shashwat.official.mail@gmail.com'],
    subject: 'Confirmation Email',
    html: `<h2>Greetings! ${name},</h2><p>Thanks for registering!</p>`,
  };

  try {
  await transporter.sendMail(mailOptions);
  res.send("✅ Confirmation email sent.");
} catch (err) {
  console.error("❌ Email sending failed:", err);
  res.status(500).send("❌ Error sending email.");
}

});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
