;
'use strict'

let gestionDocumentos = (http) => {
    let io = require('socket.io')(http),
        socketjwt = require('socketio-jwt')
    io.use(socketjwt.authorize({
        secret: (req, decodedToken, callback) => {
            console.log(req._query.sessionID)
            callback(null, req._query.sessionID)
        },
        handshake: true
    }))
    const gestionDatos = {}
    io.on('connection', socket => {
        let anteriorId
        const safeJoin = actualId => {
            //salir de la sala
            socket.leave(anteriorId)
                //unirme a sala
            socket.join(actualId)
        }
        socket.on('getDoc', docId => {
            safeJoin(docId)
            socket.emit('gestionDato', gestionDatos[docId])
        })
        socket.on('addDoc', doc => {
            let salas = Object.keys(gestionDatos)
            let numeroDeSalas = salas.length + 1
            let nombreSala = `documento ${numeroDeSalas}`
            doc.id = nombreSala
            gestionDatos[doc.id] = doc
            safeJoin(doc.id)
            io.emit('gestionDatos', Object.keys(gestionDatos))
            socket.emit('gestionDato', doc)
        })
        socket.on('editDoc', doc => {
            gestionDatos[doc.id] = doc
            socket.to(doc.id).emit('gestionDato', doc)
        })
        socket.on("saveDoc", function(id) {
            var id = doc.id;
            gestionDatos[id] = JSON.parse(gestionDatos);
        });
        io.emit('gestionDatos', Object.keys(gestionDatos))
    })
}
module.exports = gestionDocumentos