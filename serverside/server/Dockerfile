FROM node:8.7.0-alpine

RUN mkdir -p srv/app/serverside
WORKDIR /srv/app/serverside


COPY package.json /srv/app/serverside
COPY package-lock.json /srv/app/serverside

RUN npm install

EXPOSE 3000

COPY . .

CMD [ "npm", "start" ]