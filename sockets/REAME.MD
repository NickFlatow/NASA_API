## PONG

### GETTING STARTED

#### Run the pong server
* from the root of sockets run the following command
```bash
npm run watch 
```
```bash
npx ts-node server.ts
```
* api.ts express server/ servering public folder where client side pong is located
* sockets.ts server side logic for pong
* initialization for express, socket.io, and the game logic is in server.ts


#### Build the pong client
* from the root of sockets run the following command
* creates dist folder in public to be served by express
* public script.ts client side logic for pong
```bash
npm run build
```
```bash
npx vite build public
```
