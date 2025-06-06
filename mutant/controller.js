const mutantService = require('./service');

const getMutant = async (req, res) => {
  const token = req.header('Authorization');
  const params = req.query; // 'user/1' -> req.params | 'user?id=1' -> req.query

  const { data, status, message } = await mutantService.getMutant(token, params);
  if (!data) return res.status(status).json({ message });

  return res.status(status).json({ data: data });
};

const createMutant = async (req, res) => {
  const token = req.header('Authorization');
  const newMutantData = req.body;

  const { status, message } = await mutantService.createMutant(token, newMutantData);
  return res.status(status).json({ message });
};

const updateMutant = async (req, res) => {
  const token = req.header('Authorization');
  const updatedData = req.body;

  const { status, message } = await mutantService.updateMutant(token, updatedData);
  return res.status(status).json({ message });
};

/*
    {
      "id": 4,
      "name": "Professor X",
      "abilities": ["Telepathy", "Mind Control", "Astral Projection"],
      "category": "Alpha Level",
      "side": "good"
    }
*/

module.exports = { getMutant, createMutant, updateMutant };