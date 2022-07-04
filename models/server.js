const express = require("express"); //Importar algo en node

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //middlewares
    this.middlewares();
    //rutas
    this.routes();
  }

  middlewares() {
    //Lectura de body
    this.app.use(express.json());

    //carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online port:", this.port);
    });
  }
}

// export default Server YA NO SE USA MAS!!!
module.exports = Server;
