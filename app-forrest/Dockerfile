FROM node:16-alpine3.14

# COPY . /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install
CMD npm start