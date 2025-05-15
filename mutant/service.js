const { knex } = require('../utils/knex.js');
const { validateToken } = require('../utils/jwt.js');

const getMutant = async (token, params) => {
  try {
    const { message, status, tokenData } = validateToken(token);
    if (!tokenData) return { message, status };

    const query = knex('mutant')
      .select('mutant.id', 'mutant.name', 'mutant.side', 'mutant.category', knex.raw('JSON_ARRAYAGG(ability.name) as abilities'))
      .leftJoin('mutant_ability', 'mutant_ability.mutant_id', 'mutant.id')
      .leftJoin('ability', 'ability.id', 'mutant_ability.ability_id')
      .groupBy('mutant.id', 'mutant.name');

    if (params) {
      const { id, name, category, side, abilities } = params;

      if (id) query.where({ id });
      if (name) query.andWhere('name', 'like', `%${name.toUpperCase()}%`);
      if (category) query.andWhere('category', 'like', `%${category.toUpperCase()}%`);
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

    const rows = await query.orderBy("mutant.name");
    return { status: 200, data: rows };
  } catch (err) {
    console.error(err);
    return { message: 'server error', status: 500 };
  }
};

const createMutant = async (token, data) => {
  try {
    const { message, status, tokenData } = validateToken(token);
    if (!tokenData) return { message, status };

    const { name, category, side, abilities } = data;
    if (!name || !category || !side || !abilities?.length) return { message: 'missing params', status: 400 }; // 400 -> Bad request

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

    return { status: 200, message: `mutant ${id} created` };
  } catch (err) {
    console.error(err);
    return { message: 'server error', status: 500 };
  }
};

const updateMutant = async (token, updatedData) => {
  try {
    const { message, status, tokenData } = validateToken(token);
    if (!tokenData) return { message, status };

    const { id, name, category, side, abilities } = updatedData;

    if (!id || !name || !category || !side || !abilities?.length) {
      return { message: 'missing params', status: 400 };
    }

    await knex.transaction(async trx => {
      await trx('mutant')
        .where({ id })
        .update({ name, category, side });

      // Remove habilidades antigas
      await trx('mutant_ability')
        .where({ mutant_id: id })
        .del();

      const mutantRelationship = abilities.map(abilityId => ({
        mutant_id: id,
        ability_id: abilityId
      }));

      await trx('mutant_ability').insert(mutantRelationship);
    });

    return { status: 200, message: `mutant ${name} updated` };
  } catch (err) {
    console.error(err);
    return { message: 'server error', status: 500 };
  }
};

module.exports = { getMutant, createMutant, updateMutant };