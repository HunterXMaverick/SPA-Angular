const jwt = require('jsonwebtoken');

let autentificar = (req, res, next) => {

    let token = req.headers.authorization || null;

    jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
        if (err) {
            return res.status(400).json({
                data: err,
                msg: "Token Invalido",
            });
        } else {
            req.decode = decode
            let token = jwt.sign({ data: decode.data }, process.env.KEY_JWT, {
                algorithm: "HS256",
                expiresIn: 300,
            })
            req.token = token

            next();
        }
    })
}

module.exports = {
    autentificar
}