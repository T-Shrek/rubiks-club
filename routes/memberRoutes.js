const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, year, skill, time } = req.body;
    await Member.create({ name, email, year, skill, time });
    res.redirect('/thankyou');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
});

router.get('/thankyou', (req, res) => {
  res.render('thankyou');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;
