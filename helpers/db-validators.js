const Role = require("../models/role");

const esRoleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no existe en la BD`);
  }
};

//VALIDAR EMAIL SI EXISTE

//VALIDAR ID SI EXISTE

module.exports = {
  esRoleValido,
};
