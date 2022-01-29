FROM node:16-alpine3.14

# COPY . /app
COPY package.json /usr/src/auth/package.json
COPY package-lock.json /usr/src/auth/package-lock.json

WORKDIR /usr/src/auth

RUN npm install
CMD npm start