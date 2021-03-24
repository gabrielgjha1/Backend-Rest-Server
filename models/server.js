express = require("express");
var cors = require('cors');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRouterPath = '/api/usuarios';
    //middlewares

    this.middlewares();

    //Rutas de mi aplicación

    this.routes();

  }

  middlewares(){

    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static('public'))

  }

  routes() {
    
    this.app.use( this.usuariosRouterPath , require('../routes/user'));

  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Servidor Corriendo En El Puerto", this.port);
    });
  }


}

module.exports = Server;
