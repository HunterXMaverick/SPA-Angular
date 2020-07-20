const jwt = require("jsonwebtoken");

let admin = (req, res, next) => {
    let token = req.headers.authorization || null;

    jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
        if (err) {
            return res.status(400).json({
                data: err,
                msg: "token Invalido",
            });
        } else {
            switch (decode.data.rol) {
                case "Administrador":
                    console.log("Bienvenido administrator. ):");
                    next();
                    break;
                default:
                    res.status(401).json({
                        ok: false,
                        data: null,
                        msg: "No tienes Permisos para usar esta app",
                    });
            }
        }
    });
};

let client = (req, res, next) => {
    let token = req.headers.authorization || null;

    jwt.verify(token, req.sessionID, (err, decode) => {
        if (err) {
            return res.status(400).json({
                data: err,
                msg: "token Invalido",
            });
        } else {
            switch (decode.data.rol) {
                case "Estuadiante":
                    console.log("Bienvenido Estudiante.");
                    next();
                    break;
                default:
                    res.status(401).json({
                        ok: false,
                        data: null,
                        msg: "tienes Permisos ciertas cosas",
                    });
            }
        }
    });
};

module.exports = {
    admin,
    client,
};
