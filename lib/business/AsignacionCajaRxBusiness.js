const asignacionCajaRxDao   = require('../dao/AsignacionCajaRxDao'); 
const utils 	  			= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las asignaciones de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.consultarAsignacionCaja = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroAsignacionCaja = {};
		 oFiltroAsignacionCaja.iUsuarioCajaId  	= req.query.iUsuarioCajaId;
		 oFiltroAsignacionCaja.iId 	  			= req.query.iId; 
		 var consultarAsignacionCajaResponse =  await asignacionCajaRxDao.consultarAsignacionCaja(oFiltroAsignacionCaja);
		 if(consultarAsignacionCajaResponse.iCode !== 1){
			throw new Error(consultarAsignacionCajaResponse.iCode + "||" + consultarAsignacionCajaResponse.sMessage);
		 }
		 
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarAsignacionCajaResponse.oData;
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
 