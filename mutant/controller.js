const getAllMutants = async (req, res) => {
  res.status(200).json({ data: [
    {
      "id": 1,
      "name": "Wolverine",
      "abilities": ["Regeneration", "Adamantium Claws", "Enhanced Senses"],
      "category": "Omega Level",
      "side": "good"
    },
    {
      "id": 2,
      "name": "Magneto",
      "abilities": ["Metal Manipulation", "Magnetic Field", "Flight"],
      "category": "Alpha Level",
      "side": "evil"
    },
    {
      "id": 3,
      "name": "Jean Grey",
      "abilities": ["Telepathy", "Telekinesis", "Phoenix Force"],
      "category": "Omega Level",
      "side": "good"
    },
    {
      "id": 4,
      "name": "Professor X",
      "abilities": ["Telepathy", "Mind Control", "Astral Projection"],
      "category": "Alpha Level",
      "side": "good"
    }
  ]});
};

const getMutantById = async (req, res) => {
  res.status(200).json({ data: [
    {
      "id": 1,
      "name": "Wolverine",
      "abilities": ["Regeneration", "Adamantium Claws", "Enhanced Senses"],
      "category": "Omega Level",
      "side": "good"
    }
  ]});
};

module.exports = { getAllMutants, getMutantById };