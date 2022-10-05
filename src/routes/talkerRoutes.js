const express = require('express');
const talker = require('../talker');
const { 
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateTalkWatched,
  validateTalkRate,
} = require('../middlewares/validateTalker');

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

router.post(
'/', 
validateAuthorization,
validateName,
validateAge,
validateTalk,
validateTalkWatched,
validateTalkRate,
async (req, res) => {
  await talker.addTalker(req.body);
  res.status(201).json(req.body);
},
);

module.exports = router;