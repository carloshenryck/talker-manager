const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

const getTalkers = async () => {
  try {
    const talkers = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(talkers);
  } catch (error) {
    return null;
  }
};

const getTalkerById = async (id) => {
  const talkers = await getTalkers();
  return talkers.find((talker) => Number(talker.id) === id);
};

const addTalker = async (talker) => {
  const talkerWithId = talker;
  try {
    const talkers = await getTalkers();
    talkerWithId.id = talkers[talkers.length - 1].id + 1;
    const newTalkers = JSON.stringify([...talkers, talkerWithId]);
    await fs.writeFile(join(__dirname, path), newTalkers);
  } catch (err) {
    return null;
  }
};

module.exports = {
  getTalkers,
  getTalkerById,
  addTalker,
};