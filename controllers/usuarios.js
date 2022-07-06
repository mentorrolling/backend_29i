const { request, resolve } = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res) => {
  const { api_key, nombre } = req.query;

  res.json({
    msg: "Petición GET - controller",
    api_key,
    nombre,
  });
};

const usuarioPost = async (req = request, res = resolve) => {
  //verificar si el correo es válido
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { nombre, email, password, role } = req.body;

  const usuario = new Usuario({ nombre, email, password, role });

  //Validar si el email existe
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ingresado ya existe",
    });
  }

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.status(201).json({
    // msg: "Petición POST - controller",
    usuario,
  });
};

const usuarioPut = (req, res) => {
  const { id } = req.params;

  res.json({
    msg: "Petición PUT - controller",
    id,
  });
};

const usuarioDelete = (req, res) => {
  const { id } = req.params;

  res.json({
    msg: "Petición DELETE - controller",
    userId: id,
  });
};
module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
