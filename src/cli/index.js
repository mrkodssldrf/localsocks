const socketIo = require('socket.io').listen(3000)
const os = require('os')

socketIo.on('connection', s =>{
  console.log('new connection', s)
  s.emit('con', {
    os : os.hostname(),
    osPlatform: os.platform(),
    osNet: os.networkInterfaces(),
    user : s.handshake.address
  })
  s.on('disconnect', () => console.log('gone'))
})
console.log("start")