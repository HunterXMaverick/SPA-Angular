;
'use strict'
const fs = require('fs'),
    path = require('path'),
    bcrypt = require('bcrypt'),
    jwt = require("jsonwebtoken"),
    usuarios_model = require('../modelos/usuarios.model');

let getUsuario = (req, res) => {
    usuarios_model.find()
        .then(data => {
            res.status(200).json({
                msg: 'ready',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: `${e}`,
                data: null,
                transaccion: false
            })
        })
}

//insertar uno
let insertOne = (req, res) => {
    let data = req.body.data
    usuarios_model.create({data})
        .then(data => {
            res.status(200).json({
                msg: 'ready',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: `${e}`,
                data: null,
                transaccion: false
            })
        })
}

//insertar varios
let insertMany = (req, res) => {
    data = req.body.data
    usuarios_model.insertMany(data)
        .then(data => {
            res.status(200).json({
                msg: 'ready',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: `${e}`,
                data: null,
                transaccion: false
            })
        })
}


//Actualizar uno
let updateOne = (req, res) => {
    let _id = req.params.id,
        { data } = req.body;
    console.log(data)
    usuarios_model.updateOne({ _id: _id }, { $set: data })
        .then(data => {
            res.status(200).json({
                msg: "ready",
                data: data,
                transaccion: true,
                token: req.token,
            });
        })
        .catch(e => {
            res.status(500).json({
                msg: `${e}`,
                data: null,
                transaccion: false
            });
        });
};
//buscar por ID
//pruebale
let get_usuario_one = (req, res) => {
    id = req.params.id
    usuarios_model.find({ '_id': id })
        .then(data => {
            res.status(200).json({
                msg: 'ready',
                data: data,
                transaccion: true
            })
            console.log(data)
        }).catch(e => {
            res.status(500).json({
                msg: `${e}`,
                data: null,
                transaccion: false
            })
        })
}

//Delete varios
let deleteMany = (req, res) => {
    usuarios_model.deleteMany({})
        .then(data => {
            res.status(200).json({
                msg: 'ready',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: `${e}`,
                data: null,
                transaccion: false
            })
        })
}

//delete One
let deleteOne = (req, res) => {
    id = req.params.id
    usuarios_model.deleteOne({ '_id': id })
        .then(data => {
            res.status(200).json({
                msg: 'ready',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: `${e}`,
                data: null,
                transaccion: false
            })
        })
}
//---------------------------------------------------------------------------------------

//ingresar usuarios con bcryp
let nuevoUsuario = (req, res) => {
    let data = req.body.data
    usuarios_model.create(data)
        .then(data => {
            res.status(200).json({
                msg: 'ready',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: `${e}`,
                data: null,
                transaccion: false
            })
        })

}


let login = (req, res) => {
    let { data } = req.body,
        email = data.email,
        password = data.password;
    console.log(data);
    usuarios_model.find({ email })
        .then((data) => {
            //  if (data[0].email === email) {
            let token,
                tokenBody = {
                    name: data[0].name,
                    email: data[0].email,
                    rol: data[0].rol,
                    sessionID: data[0].sessionID,
                };
            bcrypt.compareSync(password, data[0].password) ?
                ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
                    algorithm: "HS256",
                    expiresIn: 600,
                })),
                    res.status(200).json({
                        msg: 'ready',
                        data: data,
                        transaccion: true,
                        token,
                    })) :
                res.status(404).json({
                    msg: 'ready',
                    data: null,
                    transaccion: false,
                    token: null,
                });
            //}
        })
        .catch((err) => {
            res.status(404).json({
                transaccion: false,
                data: null,
                msg: "Email not found",
            });
        });
};
module.exports = {
    getUsuario,
    insertOne,
    insertMany,
    updateOne,
    get_usuario_one,
    deleteMany,
    deleteOne,
    nuevoUsuario,
    login
}
