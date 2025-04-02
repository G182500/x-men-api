# 🚀 Introdução ao Docker com Node.js + Express
Este projeto tem como objetivo a aprendizagem de conceitos básicos de uma API, através de uma aplicação Node.js com Docker, usando Express, variáveis de ambiente, e conexão com MySQL.

# 🛠️ Inicialização do Projeto
**Iniciar o projeto Node.js com os seguintes comandos:**

* Selecionar a versão do Node: **nvm use 18.25.0**
* Gerar um package.json: **npm init -y**
* Instalar as dependências do projeto: **npm install express dotenv mysql2 bcrypt jsonwebtoken**

# 🐳 Conceitos Básicos do Docker

Um container Docker é um **pacote de software com as dependências necessárias para executar um aplicativo específico**. Todas as configurações e instruções para iniciar ou parar containers são **ditadas pela imagem do Docker**. Sempre que um usuário **executa uma imagem**, um **container é criado.**

A principal diferença entre **Docker** e uma **Máquina Virtual**, é que os containers do Docker executam aplicações de forma isolada e leve, compartilhando o sistema operacional do host. Enquanto isso, as máquinas virtuais têm seu próprio sistema operacional, já que simulam um computador inteiro, o que acaba afetando o desempenho e as necessidades de hardware.

É fácil gerenciar containers com a ajuda da API do Docker ou da interface de linha de comando (ILC).

# 📦 Criando Container

**Usando Docker Compose, ou seja, um arquivo docker-compose.yml:**

* Subir os container em modo detached: **docker compose up -d**
* Parar e remover os containers: **docker compose down**
* Será criada uma **network** automática, permitindo que os containers se comuniquem se estiverem conectados nela.

**Sem o arquivo:**

* **Build da imagem** do container: **docker build --tag nome-imagem .** (sendo 'ponto final' o caminho do diretório atual, onde deve estar o Dockerfile)
* Executar com **docker run -p 3000:3000 nome-container** (Porta do seu computador (host) : Porta do container Docker)

# 📋 Comandos Úteis

**Listagem:**

* **docker images** mostra todas imagens
* **docker ps -a** lista todos os containers, enquanto sem **-a** mostrará somente os em execução

**Gerenciando um Container:**

* Parar com **docker stop nome-container**
* Iniciar com **docker start nome-container**
* Reinicialização com **docker restart nome-container**
* Entrar em um container via terminal com **docker exec -it nome-container bash**

**Deletar:**

* Com o container parado, podemos excluir usando seu nome, através de **docker rm nome-container**
* Remover uma imagem é possível com **docker rmi nome-imagem**

# 💾 MySQL dentro do Container

Com o container em execução, entre no MySQL com **docker exec -it nome-container mysql -u root -p**. Lembrando que **-p** (password) deve ser correspondente ao **-u** (user) digitado. Nesse exemplo, o usuário é **root**, então deve-se usar o **root password** informado no **dockerfile**

* Mostrar bancos de dados com **SHOW DATABASES;**
* Sair do MySQL com **EXIT;**
* Criar banco de dados com
  
    **CREATE DATABASE nome-bd;**
  
    **GRANT ALL PRIVILEGES ON nome-bd.\* TO 'root'@'%' IDENTIFIED BY 'sua_senha';**

    **FLUSH PRIVILEGES;**

Para conectar o BD de um container em um **editor SQL**, como o DBeaver, podemos usar **localhost** e porta do host na conexão, ou IP e porta do container. Para a segunda opção, basta digitar **docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nome-container** e usar o IP retornado

# 📥 Restaurar DUMP dentro do Container
Se tiver um arquivo backup **.sql** e quiser restaurá-lo, use **docker cp caminho/do/seu/backup.sql nome-container:/backup.sql** para copiá-lo, depois entre no container e rode **mysql -u root -p nome-bd < /backup.sql**
