const express = require('express');
const randtoken = require('rand-token');

const router = express.Router();

router.post('/', (_req, res) => {
  res.status(200).json({ token: randtoken.generate(16) });
});

module.exports = router;