 const asignacionCajaEstado  = require('../modelBd/entity/AsignacionCajaEstado');   

/**
 * @description Función que permite consultar el estado de la  asignaciones de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.consultarAsignacionCajaEstado = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iAsignacionCajaId !== undefined){
            oFiltroLista.where.AsignacionCajaId  = oFiltro.iAsignacionCajaId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;   
        const consultarListaResponse = await  asignacionCajaEstado.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información del estado de la  asignaciones de caja'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: asignacioncaja_estado, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}