const asignacionCaja     = require('../modelBd/entity/AsignacionCaja'); 
const utilsDao  = require('./utils/utils'); 
const utilsGen  = require('../utils/utils'); 
const config    = require('../config/config.json');  

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
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.SociedadId        = oParam.oData.iSociedadId;
        oRegistro.Sociedad          = oParam.oData.sSociedad;
        oRegistro.SedeId            = oParam.oData.iSedeId;
        oRegistro.Sede              = oParam.oData.sSede;
        oRegistro.AreaId            = oParam.oData.iAreaId;
        oRegistro.Area              = oParam.oData.sArea;
        oRegistro.AlmacenId         = oParam.oData.iAlmacenId;
        oRegistro.Almacen           = oParam.oData.sAlmacen; 
        oRegistro.Periodo           = oParam.oData.sPeriodo;
        oRegistro.UsuarioCajaId     = oParam.oData.iUsuarioCajaId;
        oRegistro.UsuarioCaja       = oParam.oData.sUsuarioCaja;
        oRegistro.FechaInicio       = oParam.oData.dFechaInicio;
        oRegistro.FechaFin          = oParam.oData.dFechaFin; 

        const crearRegistroPromise = await asignacionCaja.create(oRegistro);
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
        
        if(oParam.oData.iSociedadId !== undefined){
            oRegistro.SociedadId     = oParam.oData.iSociedadId; 
        }
        if(oParam.oData.sSociedad !== undefined){
            oRegistro.Sociedad     = oParam.oData.sSociedad; 
        }
        if(oParam.oData.iSedeId !== undefined){
            oRegistro.SedeId     = oParam.oData.iSedeId; 
        }
        if(oParam.oData.sSede !== undefined){
            oRegistro.Sede     = oParam.oData.sSede; 
        }
        if(oParam.oData.iAreaId !== undefined){
            oRegistro.AreaId     = oParam.oData.iAreaId; 
        }
        if(oParam.oData.sArea !== undefined){
            oRegistro.Area     = oParam.oData.sArea; 
        }
        if(oParam.oData.iAlmacenId !== undefined){
            oRegistro.AlmacenId     = oParam.oData.iAlmacenId; 
        }
        if(oParam.oData.sAlmacen !== undefined){
            oRegistro.Almacen     = oParam.oData.sAlmacen; 
        }
        if(oParam.oData.iPeriodoId !== undefined){
            oRegistro.iPeriodoId     = oParam.oData.iPeriodoId; 
        }
        if(oParam.oData.sPeriodo !== undefined){
            oRegistro.Periodo     = oParam.oData.sPeriodo; 
        }
        if(oParam.oData.iUsuarioCajaId !== undefined){
            oRegistro.UsuarioCajaId     = oParam.oData.iUsuarioCajaId; 
        }
        if(oParam.oData.sUsuarioCaja !== undefined){
            oRegistro.UsuarioCaja     = oParam.oData.sUsuarioCaja; 
        }
        if(oParam.oData.dFechaInicio !== undefined){
            oRegistro.FechaInicio     = oParam.oData.dFechaInicio; 
        }
        if(oParam.oData.dFechaFin !== undefined){
            oRegistro.FechaFin     = oParam.oData.dFechaFin; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await asignacionCaja.update(oRegistro, oFiltro);

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