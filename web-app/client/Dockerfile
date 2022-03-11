# Docker file for deploying front end

FROM node:14.17.4

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
