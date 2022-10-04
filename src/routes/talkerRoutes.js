const express = require('express');
const talker = require('../talker');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await talker.getTalkers();
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const speaker = await talker.getTalkerById(Number(id));
  if (speaker) {
    res.status(200).json(speaker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = router;