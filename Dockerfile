
FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /flightcrs-ui


COPY ./package*.json ./
COPY ./server.production.js ./
# RUN npm install
COPY ./node_modules ./node_modules
COPY ./public/build ./public/build

EXPOSE 3000

CMD [ "node", "server.production" ]
