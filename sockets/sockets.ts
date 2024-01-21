import  { Server } from 'socket.io';

let playerCount = 0;

export function listen(io:Server) {
    io.on('connection', (socket) => {
        //init room
        let room:string;
        
        console.log('New client connected', socket.id);
          socket.on('ready', () => {
            
            //set room when player joins
            room = 'room' + Math.floor(playerCount / 2);  
            //join room
            socket.join(room);
            
            console.log('player ready', socket.id,room);
                playerCount++;
                // when we have 2 players ready, start the game
                if (playerCount % 2 == 0) {
                    console.log('Player count reached, starting game',playerCount);
                    //send a message to both players to start the game
                    //sending the socket id of the second player to be the referee
                    io.in(room).emit('startGame',socket.id);
                }
          });
          socket.on('ballMove', (ballX: number, ballY: number,score:number) => {
              //only sned to non referee player
              socket.to(room).emit('ballMove',ballX,ballY,score);
          });
          socket.on('paddleMove', (paddleXpos: number) => {
              //only sned to non referee player
              socket.to(room).emit('paddleMove',paddleXpos);
          });
      
          socket.on('disconnect', (reason:string) => {
            socket.leave(room);
            console.log('Client disconnected', socket.id,reason);
          });
      });
      
}