const express = require('express');
const randtoken = require('rand-token');
const validation = require('../validation');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validation.emailValidation(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validation.passwordValidation(password)) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).json({ token: randtoken.generate(16) });
});

module.exports = router;