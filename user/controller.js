const userService = require('./service');

const checkToken = async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(400).json({ message: 'token required' }); // 400 -> Bad request

  const { data, message, status } = await userService.checkToken(token);
  if (!data) return res.status(status).json({ message });

  return res.status(status).json({ message, data });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' }); // 400 -> Bad request

  const { data, message, status } = await userService.login(email, password);
  if (!data) return res.status(status).json({ message });

  return res.status(status).json({ message, data });
};

const getUser = async (req, res) => {
  const token = req.header('Authorization');

  const { data, status, message } = await userService.getUser(token, req.query);
  // 'user/1' -> req.params | 'user?id=1' -> req.query
  if (!data) return res.status(status).json({ message });

  return res.status(status).json(data);
};

const createUser = async (req, res) => {
  const token = req.header('Authorization');

  const { data, status, message } = await userService.createUser(token, req.body);
  if (!data) return res.status(status).json({ message });

  return res.status(status).json(data);
};

module.exports = { login, createUser, getUser, checkToken };