# Docker file for server

FROM node:14.17.4

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
