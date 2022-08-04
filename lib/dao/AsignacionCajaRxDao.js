const asignacionCaja  = require('../modelBd/entity/AsignacionCaja');    
const Op        = require('Sequelize').Op;
const Sequelize   = require('Sequelize');
/**
 * @description Función que permite consultar las asignaciones de caja
 * @creation David Villanueva 03/08/2022
 * @update
 */
exports.consultarAsignacionCaja = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        
        if(oFiltro.sCodEmpresa !== undefined){
            oFiltroLista.where.CodEmpresa  = oFiltro.sCodEmpresa; 
        } 
        if(oFiltro.sUsuarioCaja !== undefined){
            oFiltroLista.where.UsuarioCaja  = oFiltro.sUsuarioCaja; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        if(oFiltro.sCodApertura !== undefined){
            oFiltroLista.where.CodApertura  = oFiltro.sCodApertura; 
        }
        if(oFiltro.iEstadoAsignacionId !== undefined){
            oFiltroLista.where.EstadoAsignacionId  = oFiltro.iEstadoAsignacionId; 
        }
        if(oFiltro.dFechaActual !== undefined){
            oFiltroLista.where.FechaInicio = {
                [Op.lte]: oFiltro.dFechaActual 
              }; 
        }
        if(oFiltro.dFechaActual !== undefined){
            oFiltroLista.where.FechaFin = {
                [Op.gte]: oFiltro.dFechaActual 
              }; 
        }
         
        oFiltroLista.where.EstadoId     = 1;   

        const consultarListaResponse = await  asignacionCaja.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de asignaciones de caja'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: asignacioncaja, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}