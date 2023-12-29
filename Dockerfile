# ts-node produces an error after this verison??
# npx ts-node src/server.ts
# TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /app/server/src/server.ts
FROM node:18.16-alpine

WORKDIR /app

# breaking things out into steps to take advantage of docker caching (layering)
# these client commands will only run if client files have changed
COPY package.json ./
COPY client/package*.json client/
RUN npm run install-client --omit=dev
# RUN npm run install-client 

COPY server/package.json server/
RUN npm run install-server --omit=dev
# RUN npm run install-server

COPY client/ client/ 

COPY server/ server/

RUN npm run build --prefix client

RUN npm i

# USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 3000