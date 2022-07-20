const { request } = require("express");

const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res, next) => {
  const token = req.header("x-token");

  //verificar que venga el token
  if (!token) {
    return res.status(401).json({
      msg: "No se reconoce el token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuario
    const usuario = await Usuario.findById(uid);

    //verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - Usuario no existe",
      });
    }

    //verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - Usuario suspendido",
      });
    }

    //guardando en la request los datos del usuario
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
