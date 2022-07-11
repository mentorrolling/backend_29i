const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { esRoleValido } = require("../helpers/db-validators");

// const Role = require("../models/role");

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
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "La contraseña debe tener mínimo 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(esRoleValido),

    validarCampos,
  ],
  usuarioPost
);

router.put("/:id", usuarioPut);

router.delete("/:id", usuarioDelete);

module.exports = router;
