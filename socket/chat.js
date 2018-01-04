module.exports = (io,server) => {

  var clients = [];

  io.on('connection', (socket) => {

    socket.on('add-message', (message, username) => {
      io.emit('messages', { type: 'new-message', text: message, username: username });
    });

    socket.on('saveUser', (username) => {
     
      

     
      
      clients.push(username);
       
      io.emit('users', { type: 'users', users: clients });
    
    });
    


    

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
