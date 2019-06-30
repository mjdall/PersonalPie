# could use a node container but for now i'll use
# ubuntu and a bootstrap script
FROM node:10.16-alpine

WORKDIR /PersonalPie

# install all of the node modules
COPY package.json .
RUN npm install

COPY ./src ./src
COPY ./public ./public

CMD [ "npm", "run", "start" ]
