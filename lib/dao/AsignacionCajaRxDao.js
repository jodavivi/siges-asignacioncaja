const asignacionCaja  = require('../modelBd/entity/AsignacionCaja');   
const asignacionCajaEstado  = require('../modelBd/entity/AsignacionCajaEstado');   

/**
 * @description Función que permite consultar las asignaciones de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.consultarAsignacionCaja = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iUsuarioCajaId !== undefined){
            oFiltroLista.where.UsuarioCajaId  = oFiltro.iUsuarioCajaId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
        oFiltroLista.include = [
            { model: asignacionCajaEstado, as: "AsignacionCajaEstado" } 
        ]

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