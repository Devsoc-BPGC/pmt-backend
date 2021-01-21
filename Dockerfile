FROM node:10.19.0

WORKDIR /usr/src/app

COPY package*.json ./
#COPY package-lock.json /app && COPY package-lock.json

RUN npm install --save-exact
COPY . .

EXPOSE 5001