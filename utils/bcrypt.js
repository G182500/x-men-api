const bcrypt = require('bcryptjs');

const checkPassword = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

const generateHashPass = async (password) => {
	// Salt rounds é uma camada de proteção, onde cada round deixa o hash mais forte.
	// Quanto mais rounds, mais seguro e mais demorado. 10 é um bom padrão.
	return await bcrypt.hash(password, 10);
};

module.exports = { checkPassword, generateHashPass };