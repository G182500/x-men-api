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
require('dotenv').config();

const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const { checkEmail } = require('./utils/check-email.js');
const { checkPassword } = require('./utils/bcrypt.js');

const PORT = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});*/

/* Pool (de conexões) é uma técnica para evitar esse constante "abre-fecha" de conexões para acessar um BD, mantendo um determinado número delas sempre abertas,
e simplesmente resusá-las quando necessário, dessa forma você diminui tanto o gasto de recursos da máquina quanto o tempo de resposta da sua aplicação */

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
});

app.get('/mutants', (req, res) => {
    res.json([
        {
          "id": 1,
          "name": "Wolverine",
          "abilities": ["Regeneration", "Adamantium Claws", "Enhanced Senses"],
          "category": "Omega Level",
          "side": "good"
        },
        {
          "id": 2,
          "name": "Magneto",
          "abilities": ["Metal Manipulation", "Magnetic Field", "Flight"],
          "category": "Alpha Level",
          "side": "evil"
        },
        {
          "id": 3,
          "name": "Jean Grey",
          "abilities": ["Telepathy", "Telekinesis", "Phoenix Force"],
          "category": "Omega Level",
          "side": "good"
        },
        {
          "id": 4,
          "name": "Professor X",
          "abilities": ["Telepathy", "Mind Control", "Astral Projection"],
          "category": "Alpha Level",
          "side": "good"
        },
        {
          "id": 5,
          "name": "Apocalypse",
          "abilities": ["Immortality", "Molecular Manipulation", "Super Strength"],
          "category": "Beyond Omega",
          "side": "evil"
        },
        {
          "id": 6,
          "name": "Mystique",
          "abilities": ["Shapeshifting", "Camouflage", "Enhanced Agility"],
          "category": "Beta Level",
          "side": "evil"
        },
        {
          "id": 7,
          "name": "Storm",
          "abilities": ["Weather Control", "Flight", "Electricity Manipulation"],
          "category": "Omega Level",
          "side": "good"
        },
        {
          "id": 8,
          "name": "Sabretooth",
          "abilities": ["Regeneration", "Superhuman Strength", "Enhanced Senses"],
          "category": "Beta Level",
          "side": "evil"
        },
        {
          "id": 9,
          "name": "Rogue",
          "abilities": ["Power Absorption", "Super Strength", "Invulnerability"],
          "category": "Alpha Level",
          "side": "good"
        },
        {
          "id": 10,
          "name": "Nightcrawler",
          "abilities": ["Teleportation", "Superhuman Agility", "Shadow Invisibility"],
          "category": "Beta Level",
          "side": "good"
        }
      ]      
    );
});

/*
nvm use 18.15.0 | express → Framework API | dotenv → .env | jsonwebtoken

npm init -y | Gerar um package.json
npm install express dotenv mysql2

container = imagem em execução

* DEPOIS DE CRIAR O DOCKERFILE:
    # se tiver o compose.yml, para subir os containers 'docker compose up -d' e 'docker compose down' para parar
        * Será criado uma network para comunicar mais de um container, se eles forem conectados na configuração

    # se não tiver, criar um container com 'docker build --tag <nome-container> .' com "." para o path atual (path do dockerfile)
    e executar com 'docker run -p 3000:3000 <nome-container>' | Porta do seu computador (host) : Porta do container Docker

* LISTAGEM 
    # 'docker images' verifica todas imagens
    # 'docker ps -a' verifica os containers, sem '-a' somente os em exec

* INICIAR / PARAR CONTAINER
    # docker start <nome-container>
    # docker restart <nome-container>
    # docker stop <nome-container>

* EXCLUIR
    # Com o container parado, podemos excluir com 'docker rm <id-container>'
    # Podemos remover uma imagem com 'docker rmi <id-imagem>' 
*/
