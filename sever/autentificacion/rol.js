const jwt = require('jsonwebtoken')

let admin = (req, res, next) => {
    let token = req.headers.authorization || null

    jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
        if (err) {
            return res.status(400).json({
                transaccion: false,
                data: null,
                msg: 'token invalido'
            })
        } else {
            switch (decode.data.rol) {
                case 'administrador':
                    console.log('Bienvenido administrador :v')
                    next()
                    break;

                default:
                    res.status(401).json({
                        transaccion: false,
                        data: null,
                        msg: 'token invalido'
                    })
            }
        }
    })
}

let client = (req,res,next) => {
    let token = req.headers.authorization || null

    jwt.verify(token, req.sessionID, (err, decode) => {
        if(err) {
            return res.status(400).json({
                transaccion: false,
                data: null,
                msg: 'token invalido' 
            })
        } else {
            switch (decode.data.rol) {
                case 'estudiante':
                    console.log('Bienvenido estudiante uwu')
                    next()
                    break;

                default:
                    res.status(401).json({
                        transaccion: false,
                        data: null,
                        msg: 'no tienes derecho'
                    })
            }
        }
    })
}

module.exports = {
    admin,
    client
}