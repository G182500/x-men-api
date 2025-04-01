require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (data, expiresIn = '2h', subject ) => {
  /* O token não é “criptografado”, mas assinado com a SECRET_KEY para impedir que atacantes gerem tokens válidos por conta própria.
  O algoritmo padrão de codificação é o HS256 e 'subject' funciona como ID para a biblioteca JWT */
  
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign(data, secretKey, { expiresIn, subject });
}

const decode = (token) => {
  // No resultado do decode, 'iat' representa a data de criação, enquanto 'exp' a validade do TOKEN (formato UTC)
  return jwt.decode(token);
};

module.exports = { generateToken, decode };