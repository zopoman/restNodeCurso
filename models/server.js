const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config');


class Server{
    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath= '/api/users'

        //Conexion BBDD
        this.dbConn();

        //Middlewares
        this.Middlewares();

        //rutas de aplicacion
        this.routes();
    }

    routes(){      
        this.app.use(this.usuariosRoutePath, require('../routes/users'));
    }

    async dbConn(){
        await dbConnection();
    }

    Middlewares(){
        //Llamado al public
        this.app.use(express.static('public'));

        //Lectura y parse del bopy
        this.app.use(express.json());

        
        //CORS
        this.app.use(cors());

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en', this.port);
        });
    }
}


module.exports = Server;