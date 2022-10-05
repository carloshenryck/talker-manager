const express = require('express');
const randtoken = require('rand-token');
const { validateEmail, validatePassword } = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (_req, res) => {
  res.status(200).json({ token: randtoken.generate(16) });
});

module.exports = router;