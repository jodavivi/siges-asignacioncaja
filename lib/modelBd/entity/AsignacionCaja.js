const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

db.createSchema("administracion").then(() => {
    // esquema para el producto
});

const AsignacionCaja = db.define('asignacioncaja', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING(64),
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64), 
    SociedadId                  : Sequelize.INTEGER, 
    Sociedad                    : Sequelize.STRING(16), 
    SedeId                      : Sequelize.INTEGER, 
    Sede                        : Sequelize.STRING(64),
    AreaId                      : Sequelize.INTEGER, 
    Area                        : Sequelize.STRING(64),
    AlmacenId                   : Sequelize.INTEGER,   
    Almacen                     : Sequelize.STRING(64), 
    PeriodoId                   : Sequelize.INTEGER,
    Periodo                     : Sequelize.STRING(16), 
    UsuarioCajaId               : Sequelize.INTEGER,
    UsuarioCaja                 : Sequelize.STRING(64),
    FechaInicio                 : Sequelize.DATE,
    FechaFin                    : Sequelize.DATE
} 
,
{
    schema: "administracion"
});

 
module.exports = AsignacionCaja;