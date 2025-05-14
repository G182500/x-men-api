require('dotenv').config();

const PORT = process.env.PORT;

const cors = require('cors');
const exp = require('express');
const app = exp();

/* Mesmo sendo localhost, são origens diferentes (:3000 !== :4200),
Para proteger os dados o servidor trava as requests não confiaveis.*/
app.use(cors({
  origin: 'http://localhost:4200', // Angular’s frontend permission
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
}));

app.use(exp.json()); // access the body request

app.listen(PORT, () => {
  console.log(`Servidor X-MEN rodando na porta: ${PORT}`); // acessar em 'docker logs <nome-container>'
});

const { login, createUser, getUser, checkToken } = require('./user/controller.js');
const { getMutant, createMutant, updateMutant } = require('./mutant/controller.js');

app.post('/login', login);

app.get('/user', getUser);
app.get('/user/auth', checkToken);
app.post('/user', createUser);

app.get('/mutant', getMutant);
app.post('/mutant', createMutant);
app.put('/mutant', updateMutant);

app.get('/', async (req, res) => {
  res.send('<h1 style="color: green">🔥 Servidor dos X-MEN está rodando!</h1>');
});