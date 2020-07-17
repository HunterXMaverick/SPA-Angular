const mongoose = require("mongoose");

const { Schema } = mongoose;

const usuarioModel = Schema({
  nombre: { type: String },
  apellido: { type: String },
  edad: { type: Number },
  email: { type: String },
  profile_pic: { type: String },
  password: { type: String },
  sessionID: { type: String },
  createAt: { type: Date },
  role: { type: String },
  tituloAcademico: { type: String },
});

module.exports = mongoose.model("Usuario", usuarioModel);