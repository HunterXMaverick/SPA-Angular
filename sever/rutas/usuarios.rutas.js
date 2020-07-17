;
'use strict'
const express = require("express");

let api = express.Router(),
    usuarioControl = require('../controles/usuarios.control')

//ENDPOINT de usuarios
api.get('/prueba', usuarioControl.prueba)
api.post('/login', usuarioControl.loginUsuario)

module.exports = api