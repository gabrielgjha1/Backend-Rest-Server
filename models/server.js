express = require("express");
var cors = require('cors');
const fileUpload = require('express-fileupload')
const { dbConnection } = require("../database/config");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRouterPath = '/api/usuarios';
    this.authPath = '/api/auth';
    this.categoriasPath = '/api/categorias';
    this.productosPath = '/api/productos';
    this.buscarPath = '/api/buscar';
    this.uploadsPath = '/api/uploads';

    //conectar a base de datos
    this.conectarDB();

    //middlewares

    this.middlewares();

    //Rutas de mi aplicación

    this.routes();

  

  }

  async conectarDB(){

    await dbConnection();

  }

  middlewares(){

    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static('public'))

    //fileupload -carga de archivos 

    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true
    }));

  }

  routes() {
    
    this.app.use( this.usuariosRouterPath , require('../routes/user'));
    this.app.use( this.authPath, require('../routes/auth'));
    this.app.use( this.categoriasPath, require('../routes/categorias'));
    this.app.use( this.productosPath, require('../routes/productos'));
    this.app.use( this.buscarPath, require('../routes/buscar'));
    this.app.use( this.uploadsPath, require('../routes/uploads'));

  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Servidor Corriendo En El Puerto", this.port);
    });
  }


}

module.exports = Server;
