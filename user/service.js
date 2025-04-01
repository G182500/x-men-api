require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

/* Pool (de conexões) é uma técnica para evitar o constante "abre-fecha" de conexões para acessar um BD, mantendo um determinado número delas sempre abertas,
e simplesmente resusá-las quando necessário, dessa forma você diminui tanto o gasto de recursos da máquina, quanto o tempo de resposta da sua aplicação */

const { checkEmail } = require('../utils/check-email.js');
const { checkPassword } = require('../utils/bcrypt.js');
const { generateToken } = require('../utils/jwt.js');

const login = async (email, password) => {
  try {   
    const user = await checkEmail(email, db);
    if (!user) return { message: 'email invalid', status: 404 };

    const passwordMatch = await checkPassword(password, user.password_hash);
    if (!passwordMatch) return { message: 'incorrect password', status: 401 }; // 401 -> Não autorizado

    const token = generateToken({ email }, '1d', String(user.id));      
    return { message: 'logged in', status: 200, token };

  } catch(err) {
    console.error(err);
    return { message: 'server error', status: 500 };      
  }
};

const createUser = async (email, password) => {
  /*try {   
    const user = await checkEmail(email, db);
    if (!user) return { message: 'email invalid', status: 404 };

    const passwordMatch = await checkPassword(password, user.password_hash);
    if (!passwordMatch) return { message: 'incorrect password', status: 401 }; // 401 -> Não autorizado

    const token = generateToken({ email }, '1d', String(user.id));      
    return { message: 'logged in', status: 200, token };
    
  } catch(err) {
    console.error(err);
    return { message: 'server error', status: 500 };      
  }*/
};

module.exports = { login, createUser };