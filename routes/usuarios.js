const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
} = require("../controllers/usuarios");
const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("email", "El correo no es válido").isEmail(),
    check("nombre", "El nombre es obligatorio").notEmpty(),
  ],
  usuarioPost
);

router.put("/:id", usuarioPut);

router.delete("/:id", usuarioDelete);

module.exports = router;
