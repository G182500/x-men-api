# Roteiro pro Docker criar a imagem da aplicação

FROM node:18.15.0

# Criar o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas o package.json primeiro (otimiza cache)
COPY package.json ./

# Limpa o cache do npm antes de instalar
RUN npm cache clean --force

# Instala as dependências
RUN npm install

# Copia o restante do código (ex: api.js)
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando para rodar a API
CMD ["node", "api.js"]
