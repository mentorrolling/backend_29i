const { request, resolve } = require("express");
const bcrypt = require("bcryptjs");

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
  const { nombre, email, password, role } = req.body;
  const usuario = new Usuario({ nombre, email, password, role });

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.status(201).json({
    // msg: "Petición POST - controller",
    usuario,
  });
};

const usuarioPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, email, ...datos } = req.body;

  //validar contra la base de datos
  if (password) {
    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    datos.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, datos, { new: true });

  res.json({
    msg: "Usuario actualizado",
    usuario,
  });
};

const usuarioDelete = async (req, res) => {
  const { id } = req.params;

  const usuarioBorrado = await Usuario.findByIdAndRemove(id);

  res.json({
    msg: "Usuario Borrado de la BD",
    usuarioBorrado,
  });
};
module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
