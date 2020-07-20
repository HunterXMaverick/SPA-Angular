;
'use strict'

const bcrypt = require('bcrypt')


let codificar = (req, res, next) => {
    let data = req.body.data || null
    if (!data || !data.password) {
        return res.status(401).send('usuario o contraseña invalidos')
    } else {
        let codificarpassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
        if (codificarpassword) {
            req.body.data.password = codificarpassword
            req.body.data.createAt = new Date()
            req.body.data.sessionID = req.sessionID
            next();
        } else {
            return res.status(401).send('no se encrypto su contraseña')
        }
    }
}

module.exports = { codificar }