const { request, resolve } = require("express");

const usuariosGet = (req = request, res) => {
  const { api_key, nombre } = req.query;

  res.json({
    msg: "Petición GET - controller",
    api_key,
    nombre,
  });
};

const usuarioPost = (req = request, res = resolve) => {
  const body = req.body;
  console.log(req.body);
  res.json({
    msg: "Petición POST - controller",
    body,
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
