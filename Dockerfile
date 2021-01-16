FROM node:14

COPY package*.json ./

RUN yarn install

COPY client/package*.json client/

RUN yarn run cd client && yarn install

COPY . .

EXPOSE 9090

CMD ["node", "index.js"]