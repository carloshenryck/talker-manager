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

module.exports = {
  getTalkers,
  getTalkerById,
};