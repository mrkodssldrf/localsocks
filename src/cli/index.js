const socketIo = require('socket.io').listen(3000)
const os = require('os')

socketIo.on('connection', s =>{

  s.on('connected', (d) => {
    s.emit('server.infos', {
      os : [os.arch(), os.platform(), os.networkInterfaces(), os.hostname()],
      user : s.handshake
    })
  })

  s.on('disconnect', () => console.log('gone'))
})
console.log("start")