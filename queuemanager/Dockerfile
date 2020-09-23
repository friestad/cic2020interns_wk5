FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/queuemanager
WORKDIR /srv/app/queuemanager

COPY package.json .


RUN npm install

EXPOSE 8080

COPY . .

CMD [ "npm", "run", "dev-server" ]