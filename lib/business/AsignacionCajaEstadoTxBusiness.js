const utils 	 				= require('../utils/utils'); 
const asignacionCajaEstadoTxDao = require('../dao/AsignacionCajaEstadoTxDao');   

/**
 * @description Función que permite registrar el estado de la asignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.registrarAsignacionCajaEstado = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 var oRegistroVenta = {};
		 oRegistroVenta.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroVenta.oData		  = oRequest.oData; 
		 const crearAsignacionCajaEstadoResponse 	  = await  asignacionCajaEstadoTxDao.crearAsignacionCajaEstado(oRegistroVenta);
		 if(crearAsignacionCajaEstadoResponse.iCode !== 1){
			throw new Error(crearAsignacionCajaEstadoResponse.iCode + "||" + crearAsignacionCajaEstadoResponse.sMessage);
		 } 
		 var oAsignacionCajaEstado = crearAsignacionCajaEstadoResponse.oData;

     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= oAsignacionCajaEstado;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar el estado de la assignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.actualizarAsignacionCajaEstado = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
 
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarAsignacionCajaEstadoResponse = await  asignacionCajaEstadoTxDao.actualizarAsignacionCajaEstado(oRegistro);
		if(actualizarAsignacionCajaEstadoResponse.iCode !== 1){
		   throw new Error(actualizarAsignacionCajaEstadoResponse.iCode + "||" + actualizarAsignacionCajaEstadoResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarAsignacionCajaEstadoResponse.oData; 
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar el estado de la asignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.eliminarAsignacionCajaEstado = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
	 
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarAsignacionCajaEstadoResponse = await  asignacionCajaEstadoTxDao.eliminarAsignacionCajaEstado(oRegistro);
			if(eliminarAsignacionCajaEstadoResponse.iCode !== 1){
				throw new Error(eliminarAsignacionCajaEstadoResponse.iCode + "||" + eliminarAsignacionCajaEstadoResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

