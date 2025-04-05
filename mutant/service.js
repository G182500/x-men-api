require('dotenv').config();

const { knex } = require('../utils/knex.js');
const { validateToken } = require('../utils/jwt.js');

const getMutant = async (token, params) => {
  try {
    const { message, status, tokenData } = validateToken(token);
    if (!tokenData) return { message, status };

    const query = knex('mutant')
      .select('mutant.id', 'mutant.name', knex.raw('JSON_ARRAYAGG(ability.name) as abilities'))
      .leftJoin('mutant_ability', 'mutant_ability.mutant_id', 'mutant.id')
      .leftJoin('ability', 'ability.id', 'mutant_ability.ability_id')
      .groupBy('mutant.id', 'mutant.name');

    if (params) {
      const { id, name, category, side, abilities } = params;

      if (id) query.where({ id });
      if (name) query.andWhere('name', 'like', `%${name.toUpperCase()}%`);
      if (category) query.andWhere('categort', 'like', `%${category}%`);
      if (side) query.andWhere({ side });

      let abilitiesArray = abilities ? abilities.split(',') : [];
      if (abilitiesArray?.length) {
        // mutant?abilities=xxx,yyy
        abilitiesArray = abilitiesArray.map(ability => {
          return ability.trim();
        });

        query.whereIn('ability.name', abilitiesArray);
      }
    }

    const rows = await query;
    if (!rows.length) return { status: 404, data: [] };

    return { status: 200, data: rows };
  } catch(err) {
    console.error(err);
    return { message: 'server error', status: 500 };      
  }
};

const createMutant = async (token, data) => {
  try {
    const { message, status, tokenData } = validateToken(token);
    if (!tokenData) return { message, status };

    const { name, category, side, abilities } = data;
    if (!name || !category || !side || !abilities?.length) return { message: 'missing params' , status: 400 }; // 400 -> Bad request

    // transaction -> Se der erro no meio, ele desfaz tudo
    const id = await knex.transaction(async trx => {
      // Usa "trx" no lugar do "knex" dentro da transação
      const [newMutantId] = await trx('mutant').insert({ name, category, side });

      const mutantRelationship = abilities.map(abilityId => ({
        mutant_id: newMutantId,
        ability_id: abilityId
      }));

      await trx('mutant_ability').insert(mutantRelationship);
      return newMutantId;
    });

    console.log('id', id);

    return { status: 200, message: 'mutant created' };
  } catch(err) {
    console.error(err);
    return { message: 'server error', status: 500 };      
  }
};

module.exports = { getMutant, createMutant };