; 
'use strict'

const env = require('dotenv').config(),
      app = require('./app'),
      port = process.env.PORT || 3000

let http = require('http').Server(app),
    io = require('../sockets/socket.control')(http)

http.listen(port, (err) => {
    if (!err) {
        console.log(`El servidor esta funcionando en el puerto http://localhost:${port}`)
    }else{
        console.log('El servidor no esta funcionando')
    }
})