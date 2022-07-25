const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Blog = require("../models/blog");

const buscarBlog = async (req = request, res = response) => {
  const { search } = req.query;

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

  res.json({
    results: blogs,
  });
};

module.exports = { buscarBlog };
