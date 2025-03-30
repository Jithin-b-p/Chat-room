import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 });

let userCount = 0;

// remembering all the received sockets.
let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  userCount = userCount + 1;
  console.log(userCount);

  allSockets.push(socket);

  socket.on("message", (message) => {
    console.log("Message received: " + message.toString());

    // broadcasting the recieved message to all connected clients.
    allSockets.forEach((ws) => {
      if (ws === socket) return;
      ws.send(message.toString());
    });
  });
});
