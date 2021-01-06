const asignacionCajaEstadoRxDao   = require('../dao/AsignacionCajaEstadoRxDao'); 
const utils 	  				  = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar el estado de las asignaciones de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.consultarAsignacionCajaEstado = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroAsignacionCaja = {};
		 oFiltroAsignacionCaja.iAsignacionCajaId  	= req.query.iAsignacionCajaId;
		 oFiltroAsignacionCaja.iId 	  				= req.query.iId; 
		 var consultarAsignacionCajaEstadoResponse =  await asignacionCajaEstadoRxDao.consultarAsignacionCajaEstado(oFiltroAsignacionCaja);
		 if(consultarAsignacionCajaEstadoResponse.iCode !== 1){
			throw new Error(consultarAsignacionCajaEstadoResponse.iCode + "||" + consultarAsignacionCajaEstadoResponse.sMessage);
		 }
		 
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarAsignacionCajaEstadoResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 