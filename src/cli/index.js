const socketIo = require('socket.io').listen(3000)

socketIo.on('connection', s =>{
  console.log('new connection', s)
  s.on('disconnect', () => console.log('gone'))
})
console.log("start")