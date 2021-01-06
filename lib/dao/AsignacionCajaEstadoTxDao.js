const asignacionCajaEstado     = require('../modelBd/entity/AsignacionCajaEstado'); 
const utilsDao  = require('./utils/utils'); 
const utilsGen  = require('../utils/utils'); 
const config    = require('../config/config.json');  

/**
 * @description Función que permite crear un estado de la  asignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.crearAsignacionCajaEstado = async function (oParam) { 
    const oResponse = {};
    try {
        var seqAsignacionCajaEstado = "'" +config.seqAsignacionCajaEstado +"'";
        var seq = await utilsDao.obtenetSequencia(seqAsignacionCajaEstado);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.AsignacionCajaId        = oParam.oData.iAsignacionCajaId; 
        oRegistro.EstadoAsignacionId     = oParam.oData.iEstadoAsignacionId;
        oRegistro.EstadoAsignacion       = oParam.oData.sEstadoAsignacion; 

        const crearRegistroPromise = await asignacionCajaEstado.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: asignacioncaja_estado, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar el estado de la asignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.actualizarAsignacionCajaEstado = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.iAsignacionCajaId !== undefined){
            oRegistro.AsignacionCajaId     = oParam.oData.iAsignacionCajaId; 
        }
        if(oParam.oData.iEstadoAsignacionId !== undefined){
            oRegistro.EstadoAsignacionId     = oParam.oData.iEstadoAsignacionId; 
        }
        if(oParam.oData.sEstadoAsignacion !== undefined){
            oRegistro.EstadoAsignacion     = oParam.oData.sEstadoAsignacion; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await asignacionCajaEstado.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: asignacioncaja_estado, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar el estado de la  AsignacionCaja 
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.eliminarAsignacionCajaEstado = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await asignacionCajaEstado.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: asignacioncaja_estado, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}