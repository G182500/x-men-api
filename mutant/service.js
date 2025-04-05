require('dotenv').config();

const mysql = require('mysql2');
const knex = require('knex')({ client: 'mysql2' }); // SQL query builder

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

/* Pool (de conexões) é uma técnica para evitar o constante "abre-fecha" de conexões para acessar um BD, mantendo um determinado número delas sempre abertas,
e simplesmente resusá-las quando necessário, dessa forma você diminui tanto o gasto de recursos da máquina, quanto o tempo de resposta da sua aplicação */

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

    const [rows] = await db.promise().query(query.toString());
    if (!rows.length) return { status: 404, data: [] };

    return { status: 200, data: rows };
  } catch(err) {
    console.error(err);
    return { message: 'server error', status: 500 };      
  }
};

const createMutant = async (data) => {};

module.exports = { getMutant, createMutant };