const express = require("express"); //Importar algo en node

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //rutas
    this.routes();
  }

  routes() {
    this.app.get("/", function (req, res) {
      res.json({
        msg: "Petición GET",
      });
    });

    this.app.post("/", function (req, res) {
      res.json({
        msg: "Petición POST",
      });
    });

    this.app.put("/", function (req, res) {
      res.json({
        msg: "Petición PUT",
      });
    });

    this.app.delete("/", function (req, res) {
      res.json({
        msg: "Petición DELETE",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server online port:", this.port);
    });
  }
}

// export default Server YA NO SE USA MAS!!!
module.exports = Server;
