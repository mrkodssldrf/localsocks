const env = require('dotenv').config()
const http = require('http').createServer()
const socketIo = require('socket.io')(http)
const os = require('os')



socketIo.on('connection', s => {
  s.on('connected', (d) => {
    s.emit('server.infos', {
      os: [
        os.arch(),
        os.platform(),
        os.networkInterfaces(),
        os.hostname()
      ],
      user: {
        ip : s.conn.remoteAddress
      }
    })
  })
  s.on('disconnect', () => console.log('gone'))
})



/** @TODO Wrap in Method */
console.log(process.env.LOCAL_SOCKET_DEV)
if (process.env.LOCAL_SOCKET_SERVER &&  process.env.LOCAL_SOCKET_DEV) {
  http.listen(process.env.LOCAL_SOCKET_PORT, process.env.LOCAL_SOCKET_SERVER_DEV, () => console.log(http))
}
else if(process.env.LOCAL_SOCKET_SERVER) {
  http.listen(process.env.LOCAL_SOCKET_PORT, process.env.LOCAL_SOCKET_SERVER, () => console.log(http))
}

else {
  http.listen(3001, '0.0.0.0', () => console.log(http))
}


