;
'use strict'

let gestionDocumentos = (http) => {
    let io = require('socket.io')(http)
    let socketJwt = require('socketio-jwt')
    
    io.use(socketJwt.authorize({
        secret: process.env.KEY_JWT,
        handshake: true
    }))
    const gestionDatos = {}

    io.on('connection', socket => {

        let anteriosId
        console.log(socket.handshake)
        const safeJoin = actualId => {
            socket.leave(anteriosId)
            socket.join(actualId)
            anteriosId = actualId
        }

        socket.on('getDoc', (id) => {
            safeJoin(docId)
            socket.emit('gestionDato', gestionDatos[docId])
        })

        socket.on('addDoc', (doc) => {
            let salas = Object.keys(gestionDatos)
            let numeroSalas = salas.length + 1
            let nombreSala = `documento ${numeroSalas}`

            doc.id = nombreSala

            gestionDatos[doc.id]= doc
            console.log(gestionDatos)
            safeJoin(doc.id)

            io.emit('gestionDatos', Object.keys(gestionDatos))
            socket.emit('gestionDato', doc)
        })

        socket.on('editDoc', (doc) => {
            gestionDatos[doc.id] = doc
            console.log(doc)
            socket.to(doc.id).emit('gestionDato', doc)
        })

        io.emit('gestionDatos', Object.keys(gestionDatos))
        io.on('disconnected', socket => {
            console.log('adios');
        })
    })
}

module.exports = gestionDocumentos 