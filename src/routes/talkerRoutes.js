const express = require('express');
const talker = require('../helpers/talker');
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

router.get('/search', validateAuthorization, async (req, res) => {
  const { q } = req.query;
  const talkerObj = await talker.getTalkerByName(q);
  res.status(200).json(talkerObj);
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

router.put(
  '/:id', 
  validateAuthorization, 
  validateName, 
  validateAge,
  validateTalk,
  validateTalkWatched,
  validateTalkRate,
  async (req, res) => { 
    const { id } = req.params;
    await talker.editTalker(Number(id), req.body);  
    res.status(200).json(req.body);
  },
);

router.delete('/:id', validateAuthorization, async (req, res) => {
  const { id } = req.params;
  await talker.deleteTalker(Number(id));
  res.status(204).end();
});

module.exports = router;