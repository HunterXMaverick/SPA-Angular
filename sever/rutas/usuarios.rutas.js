;
'use strict'
const express = require('express'),
    multiParty = require('connect-multiparty'),
    passwordControl = require('../autentificacion/password'),
    aunteticacionControl = require('../autentificacion/autentificar'),
    rolControl = require('../autentificacion/rol')

let api = express.Router(),
    usuarioControl = require('../controles/usuarios.control'),
    galeriaMiddelware = multiParty({uploadDir: './files/galeria'}),
    rolControl = require('../autentificacion/rol')

// ENDPOINTS de usuarios

// prueba conexion
api.get('/prueba', usuarioControl.prueba)

// ver usuarios
api.get('/usuarios', aunteticacionControl.autentificar, usuarioControl.getUsuario)

// insert usuario
api.post('/insert_usuario', usuarioControl.insertUsuario)
api.post('/insert_usuarios', usuarioControl.insertUsuarios)

//actualiar usuario
api.put('/update_usuario/:id', aunteticacionControl.autentificar, usuarioControl.updateUsuario)
api.put('/update_usuarios/:id', aunteticacionControl.autentificar, usuarioControl.updateUsuario)

//ver usuario
api.get('/usuario/:id', usuarioControl.getUsuarioId)

//borrar usuario
api.delete('/delete_usuario', aunteticacionControl.autentificar, usuarioControl.deleteUsuario)
api.delete('/delete_usuarios', aunteticacionControl.autentificar, usuarioControl.deleteUsuarios)

//encriptar password
api.post('/insert_passw' [passwordControl.codificar], usuarioControl.nuevoUsuario)

//login
api.post('/login', usuarioControl.loginUsuario)

module.exports = api