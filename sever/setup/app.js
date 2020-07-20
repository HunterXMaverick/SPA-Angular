;
'use strict'

const express = require('express'),
  connectDb = require('../config/db'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  parseurl = require('parseurl')

let app = express(),
  session = require('express-session'),
  usuarioRuta = require('../rutas/usuarios.rutas'),
  fileRuta = require('../rutas/files.rutas')
db = connectDb(),
  sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIEMPO),
    }
  }
corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

//Cors
app.use(cors(corsOptions))

//Session
app.use(session(sess))

//Passport
app.use(passport.initialize())
app.use(passport.session())

//ejemplo de sesion para verificar
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  let pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
})

app.get('/prueba1', (req, res, next) => {
  res.send(
    `tu session: ${req.sessionID}, visitas: ${req.sessionID.views['/']} tiempo`
  )
})

app.get('/prueba2', (req, res, next) => {
  res.send('visita pagina 1' + '  ' + req.session.views['/prueba2'] + '  ' + req.sessionID)
})

app.use('/api', usuarioRuta)
app.use('/api', fileRuta)

module.exports = app