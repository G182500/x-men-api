const { knex } = require('../utils/knex.js');

const { checkPassword } = require('../utils/bcrypt.js');
const { generateToken, validateToken } = require('../utils/jwt.js');

const login = async (email, password) => {
  try {
    const query = knex('user')
      .select('*')
      .where({ email });

    const rows = await query;
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

    const rows = await query;
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