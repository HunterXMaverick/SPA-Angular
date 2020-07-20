;
'use strict'

const express = require('express'),
    connectDb = require('../config/db'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cors = require('cors'),
    parseurl = require('parseurl')

let app = express(),
    session = require('express-session'),
    usuarioRuta = require('../rutas/usuarios.rutas.js'),
    fileRuta = require('../rutas/files.rutas'),
    db = connectDb(),
    sess = {
        secret: process.env.KEY_SESSION,
        resave: false,
        saveUninitialized: true,
        name: 'sessionID',
        cookie: {
            httpOnly: false,
            maxAge: parseInt(process.env.TIEMPO)
        }
    },
    corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200
    }
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//cors despues del body-parser
app.use(cors(corsOptions));
//consiguracion del session
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

//ejemplos de sessions
app.use((req, res, next) => {
    if (!req.session.views) {
        req.session.views = {};
    }
    let pathname = parseurl(req).pathname
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
    next()
});

app.get('/prueba1', (req, res, next) => {
    res.send('visita pagina 1' + req.session.views['/pueba1'] + 'times')
})

app.get('/prueba2', (req, res, next) => {
    res.send('visita pagina 1' + '  ' + req.session.views['/prueba2'] + '  ' + req.sessionID)
})

app.use('/api', usuarioRuta)

app.use('/api', fileRuta)

module.exports = app
