const mongoose = require('mongoose');

const { Schema } = mongoose;

const usuarioModel = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String },
  edad: { type: Number },
  passw: { type: String },
  file: { type: String },
  createAt: { type: String },
  sessionID: { type: String },
  rol: { type: String },
})

module.exports = mongoose.model('usuario', usuarioModel);