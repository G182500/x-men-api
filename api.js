require('dotenv').config();

const PORT = process.env.PORT;

const exp = require('express');
const app = exp();

app.use(exp.json()); // access the body request

app.listen(PORT, () => {
  // Acessar logs com 'docker logs <nome-container>'
  console.log(`Servidor X-MEN rodando na porta: ${PORT}`);
});

const { login, createUser } = require('./user/controller.js');

app.post('/login', login);
app.post('/user', createUser);

const { getAllMutants, getMutantById } = require('./mutant/controller.js');

app.get('/mutant/:id', getMutantById);
app.get('/mutant', getAllMutants);

/*
app.post('/user', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!email || !password || !username) return res.status(400).json({ message: 'username, email and password required' });

    const user = await checkEmail(email, db);
    if (user) return res.status(422).json({ message: 'email already registered' });
  
    //const query = await db.promise().query('INSERT INTO users (username, email, password_hash) values (?, ?, ?)', [username, email, password]);
    //console.log(query);

  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
})*/

  // const hashedPassword = await bcrypt.hash(password, 10); 
  /* Salt rounds é uma camada de proteção, onde cada round deixa o hash mais forte. Quanto mais rounds, mais seguro e mais demorado.
  Menos rounds, mais rápido e mais arriscado. 10 é o padrão. */

/*
app.get('/', async (req, res) => {
    res.send('<h1 style="color: green">🔥 Servidor dos X-MEN está rodando!</h1>');
});*/