module.exports = (io,server) => {

  var clients = [];

  io.on('connection', (socket) => {

    socket.on('add-message', (message, username,time) => {
      io.emit('messages', { type: 'new-message', text: message, username: username, time:time });
    });

    socket.on('saveUser', (username) => {
     // console.log(username);
     if(username==undefined){}
      else{
      if(clients.indexOf(username)>-1){
    socket.emit('msg',{alert:'Username unavailable!',sta:'f'});
     
      }else{
      clients.push(username);
      //console.log('t');
       socket.emit('msg',{alert:'Available',sta:'t' });
      io.emit('users', { type: 'users',users: clients});
  }
  }    });
    


    

    socket.on('users', () => {
      io.emit('users', { type: 'users', users: clients });
    });

    socket.on('exitSession', (username) => {
      const index = clients.indexOf(username);
      clients.splice(index, 1);
    });

  });

  return io;
}
