;
'use strict'

const Usuario = require('../modelos/usuarioModel')
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken')

let prueba = (req, res) => {
    res.status(200).send('Hola API')
}



let loginUsuario = (req, res) => {
    let { data } = req.body
    let email = data.email
    let passwrod = data.passwrod

    Usuario.find({ email })
        .then(data => {

            let token,
                tokenBody = {
                    nombre: data[0].name,
                    email: data[0].email,
                    role: data[0].role,
                    sessionID: data[0].sessionID,
                }

            bcrypt.compareSync(passwrod, data[0].passwrod)
                ? ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
                    algorithm: "HS256",
                    expiresIn: 300,
                })),
                    res.status(200).json({
                        ok: true,
                        data: null,
                        msg: "usuario OK",
                        token,
                    }))
                : res.status(404).json({
                    ok: false,
                    data: null,
                    msg: "Password incorrecto",
                    token: null,
                });
        })
        .catch((err) => {
            res.status(404).json({
                ok: false,
                data: null,
                msg: "Email no encontrado",
            })
        })
}

module.exports = {
    prueba,
    loginUsuario
}