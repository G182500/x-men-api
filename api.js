require('dotenv').config();

const PORT = process.env.PORT;

const exp = require('express');
const app = exp();

app.use(exp.json()); // access the body request

app.listen(PORT, () => {
  console.log(`Servidor X-MEN rodando na porta: ${PORT}`); // acessar logs 'docker logs <nome-container>'
});

const { login, createUser, getUser } = require('./user/controller.js');
const { getMutant } = require('./mutant/controller.js');

app.post('/login', login);

/* Autenticação utilizando um Token no formato JWT, que virá no cabeçalho das requisições.
Este tipo de autenticação, é chamado de Bearer Authentication. Enquanto JWT define o tipo do formato do Token, Bearer define como o Token é trafegado.
Para utilizar este padrão, basta definir um item no cabeçalho da requisição, chamado de 'Authorization' e que contenha a string 'Bearer SEU_TOKEN' */

app.get('/user', getUser);
app.post('/user', createUser);

app.get('/mutant', getMutant);

// const hashedPassword = await bcrypt.hash(password, 10); 
/* Salt rounds é uma camada de proteção, onde cada round deixa o hash mais forte. Quanto mais rounds, mais seguro e mais demorado.
Menos rounds, mais rápido e mais arriscado. 10 é o padrão.

app.get('/', async (req, res) => {
    res.send('<h1 style="color: green">🔥 Servidor dos X-MEN está rodando!</h1>');
});*/