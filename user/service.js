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

const { checkPassword } = require('../utils/bcrypt.js');
const { generateToken, validateToken } = require('../utils/jwt.js');

const login = async (email, password) => {
  try {
    const query = knex('user')
      .select('*')
      .where({ email })
      .toString();

    const [rows] = await db.promise().query(query);
    if (!rows?.length) return { message: 'email invalid', status: 404 };

    const user = rows[0];

    const passwordMatch = await checkPassword(password, user.password_hash);
    if (!passwordMatch) return { message: 'incorrect password', status: 401 }; // 401 -> Não autorizado

    const token = generateToken({ email }, '1d', String(user.id));      
    return { message: 'logged in', status: 200, token };

  } catch(err) {
    console.error(err);
    return { message: 'server error', status: 500 };      
  }
};

const getUser = async (token, params) => {
  try {
    const { message, status, tokenData } = validateToken(token);
    if (!tokenData) return { message, status };

    const query = knex('user').select('*');

    if (params){
      const { id, name, email } = params;
      
      if (id) query.where({ id });
      if (name) query.andWhere('username', 'like', `%${name.toUpperCase()}%`);
      if (email) query.andWhere('email', 'like', `%${email}%`);
    }

    const [rows] = await db.promise().query(query.toString());
    if (!rows.length) return { status: 404, data: [] };

    return { status: 200, data: rows };
  } catch(err) {
    console.error(err);
    return { message: 'server error', status: 500 };      
  }
};

const createUser = async (email, password) => {

};

module.exports = { login, getUser, createUser };