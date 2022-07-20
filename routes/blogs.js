const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { existeBlogById } = require("../helpers/db-validators");
const { esAdminRole } = require("../middlewares/validar-role");

const {
  blogGet,
  blogPost,
  blogByIdGet,
  blogPut,
  blogDelete,
} = require("../controllers/blogs");
const router = Router();

//-------get-------------
router.get("/", [validarJWT], blogGet);
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID de MOngo válido").isMongoId(),
    check("id").custom(existeBlogById),
    validarCampos,
  ],
  blogByIdGet
);

//--------post--------------
router.post(
  "/",
  [
    validarJWT,
    check("title", "El título es obligatorio").notEmpty(),
    check("body", "El cuerpo del post es obligatorio").notEmpty(),
    validarCampos,
  ],
  blogPost
);

//-----put-----------------
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID de MOngo válido").isMongoId(),
    check("id").custom(existeBlogById),
    check("title", "El título es obligatorio").notEmpty(),
    check("body", "El cuerpo del post es obligatorio").notEmpty(),
    validarCampos,
  ],
  blogPut
);

//-----delete-----------------
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID de MOngo válido").isMongoId(),
    check("id").custom(existeBlogById),
    validarCampos,
  ],
  blogDelete
);

module.exports = router;
