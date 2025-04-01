const userService = require('./service');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' }); // 400 -> Bad request

  const { token, message, status } = await userService.login(email, password);
  if (!token) return res.status(status).json({ message });

  return res.status(status).json({ message, data: { token } });
};

const createUser = async (req, res) => {
  /*const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'email and password required' }); // 400 -> Bad request

  const { token, message, status } = await userService.login(email, password);
  if (!token) return res.status(status).json({ message });

  return res.status(status).json({ message, data: { token } });*/
};

module.exports = { login, createUser };