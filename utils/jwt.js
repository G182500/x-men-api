require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const generateToken = (data, expiresIn = '2h', subject ) => {
  /* O token não é “criptografado”, mas assinado com a SECRET_KEY para impedir que atacantes gerem tokens válidos por conta própria.
  O algoritmo padrão de codificação é o HS256 e 'subject' funciona como ID para a biblioteca JWT */
  return jwt.sign(data, secretKey, { expiresIn, subject });
}

const decode = (token) => {
  // No resultado do decode, 'iat' representa a data de criação, enquanto 'exp' a validade do TOKEN (formato UTC)
  return jwt.decode(token);
};

const validateToken = (token) => {
  try {
    if (!token) return { status: 401, message: 'token is missing' };

    const parts = token.split(' ');
    // Formato esperado no header 'Authorization: Bearer meu_token'
    if (parts[0] !== 'Bearer') return { status: 401, message: 'token invalid' };
  
    const decode = jwt.verify(parts[1], secretKey); // return { email: 'xxxxxxx', iat: 1743880838, exp: 1743967238, sub: '1' }
    return { tokenData: decode };
  } catch (err){
    return { status: 401, message: err.name }; // TokenExpiredError
  }
};

module.exports = { generateToken, decode, validateToken };