const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const AsignacionCaja = require('./AsignacionCaja'); 

db.createSchema("administracion").then(() => {
    // esquema para el producto
});

const AsignacionCajaEstado = db.define('asignacioncaja_estado', { 
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
    AsignacionCajaId    : {
                            type: Sequelize.INTEGER,
                            references: {
                            model: 'asignacioncaja', // 'fathers' refers to table name
                            key: 'Id', // 'id' refers to column name in fathers table
                            }
                        }, 
    EstadoAsignacionId  : Sequelize.INTEGER, 
    EstadoAsignacion    : Sequelize.STRING(64) 
} 
,
{
    schema: "administracion"
});

AsignacionCajaEstado.belongsTo(AsignacionCaja, { as: "AsignacionCaja",targetKey: 'Id',foreignKey: 'AsignacionCajaId' });   
AsignacionCaja.hasMany(AsignacionCajaEstado, { as: "AsignacionCajaEstado",foreignKey: 'AsignacionCajaId' });
 
module.exports = AsignacionCajaEstado;