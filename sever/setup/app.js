;
'use strict'

const express = require('express'),
  bodyParser = require('body-parser'),
  connectDb = require('../config/db'),
  passport = require('passport'),
  cors = require('cors'),
  parseurl = require('parseurl')

let app = express(),
  session = require('express-session'),
  usuarioRuta = require('../rutas/usuarios.rutas')
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

app.get('/', (req,res)=>{
  res.send(
    `tu session: ${req.sessionID}, visitas: ${req.sessionID.views['/']} tiempo`
  )
})

app.use('/api', usuarioRuta)


module.exports = app