; 
'use strict'

const env = require('dotenv').config(),
      app = require('./app'),
      port = process.env.PORT || 3000,
      fs = require('fs')
    //   ,
    //    httpsOptions = {
    //     key: fs.readFileSync("./config/key.pem"),
    //     cert: fs.readFileSync("./config/cert.pem")
    //   }

let http = require('http').Server(app),
    io = require('../controles/socket.control')(http)

http.listen(port, (err) => {
    if (!err) {
        console.log(`El servidor esta funcionando en el puerto http://localhost:${port}`)
    }else{
        console.log('El servidor no esta funcionando')
    }
})