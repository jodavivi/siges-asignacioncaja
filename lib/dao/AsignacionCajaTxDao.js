const asignacionCaja     = require('../modelBd/entity/AsignacionCaja'); 
const utilsDao  = require('./utils/utils'); 
const utilsGen  = require('../utils/utils'); 
const config    = require('../config/config.json');  
let cacheProvider = require('../config/cache-provider')

/**
 * @description Función que permite crear una asignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.crearAsignacionCaja = async function (oParam) { 
    const oResponse = {};
    try {
        var seqAsignacionCaja = "'" +config.seqAsignacionCaja +"'";
        var seq = await utilsDao.obtenetSequencia(seqAsignacionCaja);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var sCodigo = utilsGen.generarCodigo(seq.oData,6,"A"); 
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.CodApertura            = sCodigo;
        oRegistro.CodEmpresa             = oParam.oData.sCodEmpresa;
        oRegistro.Empresa                = oParam.oData.sEmpresa;
        oRegistro.CodSede                = oParam.oData.sCodSede;
        oRegistro.Sede                   = oParam.oData.sSede;
        oRegistro.CodArea                = oParam.oData.sCodArea;
        oRegistro.Area                   = oParam.oData.sArea;
        oRegistro.UsuarioCaja            = oParam.oData.sUsuarioCaja; 
        oRegistro.UsuarioCajaNombre      = oParam.oData.sUsuarioCajaNombre;
        oRegistro.FechaInicio            = oParam.oData.dFechaInicio;
        oRegistro.FechaFin               = oParam.oData.dFechaFin;
        oRegistro.HoraInicio             = oParam.oData.sHoraInicio;
        oRegistro.HoraFin                = oParam.oData.sHoraFin; 
        oRegistro.EstadoAsignacionId     = oParam.oData.iEstadoAsignacionId; 
        oRegistro.EstadoAsignacion       = oParam.oData.sEstadoAsignacion; 

        const crearRegistroPromise = await asignacionCaja.create(oRegistro);
        //desactivamos cahche para que vuelva a cargar
        cacheProvider.refreshCache();
        ///
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: asignacioncaja, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar la Asignación de Caja 
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.actualizarAsignacionCaja = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.sCodSede !== undefined){
            oRegistro.CodSede     = oParam.oData.sCodSede; 
        }
        if(oParam.oData.sSede !== undefined){
            oRegistro.Sede     = oParam.oData.sSede; 
        }
        if(oParam.oData.sCodArea !== undefined){
            oRegistro.CodArea     = oParam.oData.sCodArea; 
        }
        if(oParam.oData.sArea !== undefined){
            oRegistro.Area     = oParam.oData.sArea; 
        }
        if(oParam.oData.sUsuarioCaja !== undefined){
            oRegistro.UsuarioCaja     = oParam.oData.sUsuarioCaja; 
        }
        if(oParam.oData.sUsuarioCajaNombre !== undefined){
            oRegistro.UsuarioCajaNombre     = oParam.oData.sUsuarioCajaNombre; 
        }
        if(oParam.oData.dFechaInicio !== undefined){
            oRegistro.FechaInicio     = oParam.oData.dFechaInicio; 
        }
        if(oParam.oData.dFechaFin !== undefined){
            oRegistro.FechaFin     = oParam.oData.dFechaFin; 
        }
        if(oParam.oData.sHoraInicio !== undefined){
            oRegistro.HoraInicio     = oParam.oData.sHoraInicio; 
        }
        if(oParam.oData.sHoraFin !== undefined){
            oRegistro.HoraFin     = oParam.oData.sHoraFin; 
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
        const acrualizarRegistroPromise = await asignacionCaja.update(oRegistro, oFiltro);
         //desactivamos cahche para que vuelva a cargar
         cacheProvider.refreshCache();
         ///

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: asignacioncaja, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar AsignacionCaja 
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.eliminarAsignacionCaja = async function (oParam) { 
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
        const acrualizarRegistroPromise = await asignacionCaja.update(oRegistro, oFiltro);
         //desactivamos cahche para que vuelva a cargar
         cacheProvider.refreshCache();
         ///
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: asignacioncaja, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}