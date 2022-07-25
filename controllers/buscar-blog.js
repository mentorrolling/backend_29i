const { request, response } = require("express");

//Importo ObjectId para luego consultar si me manda el id del blog
const { ObjectId } = require("mongoose").Types;

const Blog = require("../models/blog");

//función para buscar blog
const buscarBlog = async (req = request, res = response) => {
  const { search } = req.query; //Obtengo la query

  //verificar si search trae un id de mongo
  const esMongoID = ObjectId.isValid(search);
  if (esMongoID) {
    const blog = await Blog.findById(search);
    return res.json({
      results: blog ? [blog] : [],
    });
  }

  //por título
  const regex = new RegExp(search, "i");

  const blogs = await Blog.find({
    title: regex,
    hidden: false,
  }).populate("author", "nombre");

  return res.json({
    results: blogs,
  });
};

module.exports = { buscarBlog };
