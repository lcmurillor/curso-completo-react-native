const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    requied: true,
    trim: true,
  },
  email: {
    type: String,
    requied: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    requied: true,
    trim: true,
  },
  registo: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
