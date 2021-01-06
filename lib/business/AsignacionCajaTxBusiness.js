const utils 	 = require('../utils/utils'); 
const asignacionCajaTxDao = require('../dao/AsignacionCajaTxDao');   

/**
 * @description Función que permite registrar la asignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.registrarAsignacionCaja = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 var oRegistroVenta = {};
		 oRegistroVenta.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroVenta.oData		  = oRequest.oData; 
		 const crearAsignacionCajaResponse 	  = await  asignacionCajaTxDao.crearAsignacionCaja(oRegistroVenta);
		 if(crearAsignacionCajaResponse.iCode !== 1){
			throw new Error(crearAsignacionCajaResponse.iCode + "||" + crearAsignacionCajaResponse.sMessage);
		 } 
		 var oAsignacionCaja = crearAsignacionCajaResponse.oData;

     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= oAsignacionCaja;
		
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
 * @description Función que permite actualizar la asignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.actualizarAsignacionCaja = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
 
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarAsignacionCajaResponse = await  asignacionCajaTxDao.actualizarAsignacionCaja(oRegistro);
		if(actualizarAsignacionCajaResponse.iCode !== 1){
		   throw new Error(actualizarAsignacionCajaResponse.iCode + "||" + actualizarAsignacionCajaResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarAsignacionCajaResponse.oData; 
	   
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
 * @description Función que permite eliminar la asignacion de caja
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.eliminarAsignacionCaja = async (req, res) => { 
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
			const eliminarAsignacionCajaResponse = await  asignacionCajaTxDao.eliminarAsignacionCaja(oRegistro);
			if(eliminarAsignacionCajaResponse.iCode !== 1){
				throw new Error(eliminarAsignacionCajaResponse.iCode + "||" + eliminarAsignacionCajaResponse.sMessage);
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

