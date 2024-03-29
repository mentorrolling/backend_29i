const express = require("express"); //Importar algo en node
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.blogsPath = "/api/blogs";
    this.buscarblogPath = "/api/buscarb";

    //Conexion DB
    this.conectarDB();

    //middlewares
    this.middlewares();
    //rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //Lectura de body
    this.app.use(express.json());

    //CORS
    this.app.use(cors());

    //carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.blogsPath, require("../routes/blogs"));
    this.app.use(this.buscarblogPath, require("../routes/buscar-blog"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online port:", this.port);
    });
  }
}

// export default Server YA NO SE USA MAS!!!
module.exports = Server;
