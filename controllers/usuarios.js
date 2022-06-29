const usuariosGet = (req, res) => {
  res.json({
    msg: "Petición GET - controller",
  });
};

const usuarioPost = (req, res) => {
  res.json({
    msg: "Petición POST - controller",
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
  res.json({
    msg: "Petición DELETE - controller",
  });
};
module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
};
