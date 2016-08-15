const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

app.get('/', function(req, res){
  res.sendFile(INDEX);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('chat message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
