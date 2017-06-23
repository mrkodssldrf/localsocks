const http = require('http').createServer()
const socketIo = require('socket.io')(http)
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
http.listen(3001, '10.0.0.2', () => console.log(http))
