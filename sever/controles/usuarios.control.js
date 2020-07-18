;
'use strict'

const Usuario = require('../modelos/usuarioModel'),
    path = require('path'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    fs = require('fs')

// prueba conexion
let prueba = (req, res) => {
    res.status(200).send('Hola API')
}

// lee usuarios
let getUsuario = (req, res) => {
    Usuario.find()
        .then(data => {
            res.status(200).json({
                transaccion: true,
                data: data,
                msg: 'listo'
            })
        }).catch(err => {
            res.status(500).json({
                transaccion: false,
                data: null,
                msg: err
            })
        })
}

// insertar 1
let insertUsuario = (req, res) => {
    nombre = req.body.nombre,
        apellido = req.body.apellido,
        edad = req.body.edad,

        Usuario.create({ nombre, apellido, edad })
            .then(data => {
                res.status(200).json({
                    transaccion: true,
                    data: data,
                    msg: 'usuario creado'
                })
            }).catch(err => {
                res.status(500).json({
                    transaccion: false,
                    data: data,
                    msg: err
                })
            })
}

// insertar varios 
let insertUsuarios = (req, res) => {
    data = req.body.data

    Usuario.insertMany(data)
        .then(data => {
            res.status(200).json({
                transaccion: true,
                data: data,
                msg: 'usuarios creados'
            })
        }).catch(err => {
            res.status(500).json({
                transaccion: false,
                data: data,
                msg: err
            })
        })
}

//actualizar 1
let updateUsuario = (req, res) => {
    let id = req.params.id,
        data = req.body.data

    Usuario.updateOne({ '_id': _id }, { $set: data })
        .then(data => {
            res.status(200).json({
                transaccion: true,
                data: data,
                msg: 'usuario actualizado'
            })
        }).catch(err => {
            res.status(500).json({
                transaccion: false,
                data: data,
                msg: err
            })
        })
}

//actualizar varios
let updateUsuarios = (req, res) => {
    let id = req.params.id,
        data = req.body.data

    Usuario.updateMany({ '_id': _id }, { $set: data })
        .then(data => {
            res.status(200).json({
                transaccion: true,
                data: data,
                msg: 'usuarios actualizados'
            })
        }).catch(err => {
            res.status(500).json({
                transaccion: false,
                data: data,
                msg: err
            })
        })
}

// buscar por ID
let getUsuarioId = (req, res) => {
    id = req.params.id

    Usuario.find({ 'id': id })
        .then(data => {
            res.status(200).json({
                transaccion: true,
                data: data,
                msg: 'usuario encontrado'
            })
        }).catch(err => {
            res.status(500).json({
                transaccion: false,
                data: data,
                msg: err
            })
        })
}

// borrar 1
let deleteUsuario = (req, res) => {
    id = req.params.id
    Usuario.deleteOne({'id': id})
    .then(data => {
        res.status(200).json({
            transaccion: true,
            data: data,
            msg: 'usuario borrado'
        })
    }).catch(err => {
        res.status(500).json({
            transaccion: false,
            data: null,
            msg: err
        })
    })
}

// borrar varios
let deleteUsuarios = ( req, res) => {
    Usuario.deleteOne({})
    .then(data => {
        res.status(200).json({
            transaccion: true,
            data: data,
            msg: 'usuarios borrados'
        })
    }).catch(err => {
        res.status(500).json({
            transaccion: false,
            data: null,
            msg: err
        })
    })
}

// insertar usuario con brypt
let nuevoUsuario = (req, res) => {
    let usuario = req.body.data
    Usuario.create(usuario)
    .then(data => {
        res.status(200).json({
            transaccion: true,
            data: data,
            msg: 'usuario creado en bcrypt'
        })
    }).catch(err => {
        res.status(500).json({
            transaccion: false,
            data: null,
            msg: err
        })
    })
}

//login
let loginUsuario = (req, res) => {
    let { data } = req.body
    let email = data.email
    let passwrod = data.passwrod

    Usuario.find({ email })
        .then(data => {
            let token,
                tokenBody = {
                    nombre: data[0].nombre,
                    email: data[0].email,
                    rol: data[0].rol,
                    sessionID: data[0].sessionID,
                }

            bcrypt.compareSync(passwrod, data[0].passw)
                ? ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
                    algorithm: "HS256",
                    expiresIn: 60000,
                })),
                    res.status(200).json({
                        ok: true,
                        data: null,
                        msg: 'usuario OK',
                        token,
                    }))
                : res.status(404).json({
                    ok: false,
                    data: null,
                    msg: 'Password incorrecto',
                    token: null,
                });
        })
        .catch((err) => {
            res.status(404).json({
                ok: false,
                data: null,
                msg: 'Email no encontrado',
            })
        })
}


module.exports = {
    prueba,
    getUsuario,
    insertUsuario,
    insertUsuarios,
    updateUsuario,
    updateUsuarios,
    getUsuarioId,
    deleteUsuario,
    deleteUsuarios,
    nuevoUsuario,
    loginUsuario
}