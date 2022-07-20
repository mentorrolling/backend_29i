const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Blog = require("../models/blog");

const esRoleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no existe en la BD`);
  }
};

//VALIDAR EMAIL SI EXISTE
const emailExiste = async (email) => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ${email} ya existe`);
  }
};

//VALIDAR ID SI EXISTE
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findOne({ _id: id });

  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeBlogById = async (id) => {
  const existeBlog = await Blog.findById(id);

  if (!existeBlog) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeBlogById,
};
