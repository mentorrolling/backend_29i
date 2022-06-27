// import react from  'react' NO SE USA MÁS!!!

// const express = require("express"); //Importar algo en node
//importar dotenv
const Server = require("./models/server");
require("dotenv").config();

const server = new Server();

server.listen();
// const app = express();

// app.get("/", function (req, res) {
//   //req = request , res = response
//   //   res.json({
//   //     msg: "Hello World",
//   //   });
//   res.send("Hola mundo!");
// });

// app.listen(process.env.PORT, () => {
//   console.log("Server online port:", process.env.PORT);
// });
