var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.get('/', function(req, res){
  if(ioController.isFull()){
    res.sendFile(__dirname + "/full.html");
  }else{
    res.sendFile(__dirname + "/index.html");
  }
});

app.get('*', function(req, res){
  res.sendFile(__dirname + "/error.html");
})

io.on('connection', function (socket){

    ioController.connect();

  socket.on('disconnect', function(){
    ioController.handleDisconnect();
  });

  socket.on('chat message', function(msg){
    ioController.handleMessage(msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
