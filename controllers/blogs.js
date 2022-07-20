const { request, response } = require("express");
const Blog = require("../models/blog");

// --------traer todos los post visibles---------
const blogGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const blogs = await Blog.find({ hidden: false })
    .limit(limite)
    .skip(desde)
    .populate("author", "nombre email");

  const total = await Blog.countDocuments({ hidden: false });

  res.status(200).json({
    total,
    blogs,
  });
};

// -------traer un post por su id--------------

const blogByIdGet = async (req = request, res = response) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).populate("author", "nombre email");

  if (blog.hidden) {
    return res.status(400).json({
      msg: "No se encuentra la entrada de blog",
    });
  }

  res.status(200).json({
    blog,
  });
};

// --crear posteo-----------
const blogPost = async (req = request, res = response) => {
  const { title, body } = req.body;

  const blog = new Blog({
    title,
    body,
    author: req.usuario._id,
  });

  await blog.save();

  res.json({
    blog,
  });
};

//--actualizar---------------------
const blogPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const datos = {
    title,
    body,
  };

  const blog = await Blog.findByIdAndUpdate(id, datos, { new: true });

  res.json({
    msg: "Blog actualizado",
    blog,
  });
};

//----borrar-------------------------
const blogDelete = async (req, res) => {
  const { id } = req.params;

  const blogBorrado = await Blog.findByIdAndUpdate(
    id,
    { hidden: true },
    { new: true }
  );

  res.json({
    msg: "Posteo borrado",
    blogBorrado,
  });
};

module.exports = {
  blogGet,
  blogByIdGet,
  blogPost,
  blogPut,
  blogDelete,
};
