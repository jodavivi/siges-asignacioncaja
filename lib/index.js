const express = require('express');
const config = require('./config/entorno.js'); 
const routes = require('./routes');
const path  = require('path');
const bodyParser = require('body-parser'); 
const log4js = require("log4js"); 
const utils = require('./utils/utils');
let cacheProvider = require('./config/cache-provider');

//Crear Conexion a BD
const db = require('./config/db');

//importal modelo
require('./modelBd/entity/AsignacionCaja');  
//Arrancar BD y creacion de tablas
db.sync()
    .then(()=> console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

//crea un app de express
const app = express();

//Iniciamos Cache
cacheProvider.start(function (err) {
  if (err) console.error(err)
})

log4js.configure({
    appenders: {
        siges_asignacioncaja: {
        type: "dateFile",
        filename: "../log/siges-asignacioncaja.log",
        pattern: "yyyy-MM-dd",
        compress: true,
      },
    },
    categories: {
      default: { appenders: ["siges_asignacioncaja"], level: "debug" },
    },
  });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
 

//uso de mildware
app.use((req, res, next) => {

    var oValidaDatosAuditoria  = utils.validaDatosAuditoria(req.headers);
      if(oValidaDatosAuditoria.iCode === 1){
          next();
      }else{
          res.status(406).send({
              error: oValidaDatosAuditoria.sMessage
            });
            return;
      }
      
  });
 
//Inicia Routes
app.use('/asignacioncaja', routes());
 
//Servidor y puerto
const host = config.HOST;
const port = config.PORT; 
const logger = log4js.getLogger("siges_asignacioncaja"); 
app.listen(port, host, () => {
     console.log('Servidor funcionando correctamente en el puerto: ' + port);
     logger.debug('Servidor funcionando correctamente en el puerto: ' + port); 
});