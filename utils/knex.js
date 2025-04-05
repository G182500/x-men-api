require('dotenv').config();

const knex = require('knex')({
  client: 'mysql2',
  pool: { min: 2, max: 10 },
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

/* Pool (de conexões) é uma técnica para evitar o constante "abre-fecha" de conexões para acessar um BD, mantendo um determinado número delas sempre abertas,
e simplesmente resusá-las quando necessário, dessa forma você diminui tanto o gasto de recursos da máquina, quanto o tempo de resposta da sua aplicação */

module.exports = { knex };