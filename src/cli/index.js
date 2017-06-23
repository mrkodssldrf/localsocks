const env = require('dotenv').config()
const http = require('http').createServer()
const socketIo = require('socket.io')(http)
const os = require('os')
console.log(process.env.LOCAL_SOCKET_SERVER)
socketIo.on('connection', s => {
  s.on('connected', (d) => {
    s.emit('server.infos', {
      os: [
        os.arch(),
        os.platform(),
        os.networkInterfaces(),
        os.hostname()
      ],
      user: s.handshake
    })
  })
  s.on('disconnect', () => console.log('gone'))
})
console.log(process.env.LOCAL_SOCKET_DEV)
if (process.env.LOCAL_SOCKET_DEV == "1") {
  http.listen(process.env.LOCAL_SOCKET_PORT, process.env.LOCAL_SOCKET_SERVER_DEV, () => console.log(http))
}
else {
  http.listen(process.env.LOCAL_SOCKET_PORT, process.env.LOCAL_SOCKET_SERVER, () => console.log(http))
}


