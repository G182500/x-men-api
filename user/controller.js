const userService = require('./service');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' }); // 400 -> Bad request

  const { token, message, status } = await userService.login(email, password);
  if (!token) return res.status(status).json({ message });

  return res.status(status).json({ message, data: { token } });
};

const getUser = async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(400).json({ message: 'token is missing' });

  const { id, name, email } = req.query; // 'user/1' -> req.params | 'user?id=1' -> req.query
  
  const { data, status } = await userService.getUser(token, id, name, email);
  if (!data) res.status(status).json({ message: 'server error' });

  return res.status(status).json({ data });
};

const createUser = async (req, res) => {
  /*const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'email and password required' }); // 400 -> Bad request

  const { token, message, status } = await userService.login(email, password);
  if (!token) return res.status(status).json({ message });

  return res.status(status).json({ message, data: { token } });*/
};

module.exports = { login, createUser, getUser };