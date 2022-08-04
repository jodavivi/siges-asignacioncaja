const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
 
const AsignacionCaja = db.define('caja_asignacion', { 
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
    CodApertura          : Sequelize.STRING(8),
    CodEmpresa          : Sequelize.STRING(4),
    Empresa             : Sequelize.STRING(64),
    CodSede             : Sequelize.STRING(4),
    Sede                : Sequelize.STRING(64),    
    UsuarioCaja         : Sequelize.STRING(16),
    UsuarioCajaNombre   : Sequelize.STRING(128),
    FechaInicio         : Sequelize.DATE,
    FechaFin            : Sequelize.DATE,
    HoraInicio         : Sequelize.STRING(16),
    HoraFin            : Sequelize.STRING(16),
    EstadoAsignacionId  : Sequelize.INTEGER, //0:Inactivo, 1:Activo
    EstadoAsignacion    : Sequelize.STRING(64) 
} 
,
{
    schema: "administracion"
});

 
module.exports = AsignacionCaja;