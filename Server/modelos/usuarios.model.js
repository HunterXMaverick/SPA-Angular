  ;
  'use strict'
  const mongoose = require('mongoose');
  const { Schema } = mongoose;

  const usuario_model = new Schema({
      name: { type: String },
      lastname: { type: String },
      email: { type: String },
      age: { type: Number },
      password: { type: String },
      file: { type: String },
      createAt: { type: String },
      sessionID: { type: String },
      rol: { type: String },
  });

  module.exports = mongoose.model('usuarios', usuario_model);
