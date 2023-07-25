const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
const cors = require('cors') // Avoid CORS blocking policy

const socketPort = 8000;

app.use(cors()); // Avoid CORS policy

app.get('/', function(req, res){
  res.send('Socket Server test branch');
})
  
http.listen(socketPort, function(){
  console.log(`listening on port ${socketPort}`);
});

io.on('connection', function(socket){

  socket.on('message',function(message,roomId){

  socket.broadcast.emit('message',message,roomId)
  })
});