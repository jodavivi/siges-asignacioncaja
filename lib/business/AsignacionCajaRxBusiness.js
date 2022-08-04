const asignacionCajaRxDao   = require('../dao/AsignacionCajaRxDao'); 
const utils 	  			= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las asignaciones de caja
 * @creation David Villanueva 03/08/2022
 * @update
 */
exports.consultarAsignacionCaja = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroAsignacionCaja = {};
		 oFiltroAsignacionCaja.sUsuario  	= req.query.sUsuario; 
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
 
/**
 * @description Función que permite validar el usuario si tiene asignada la caja
 * @creation David Villanueva 03/08/2022
 * @update
 */
 exports.verificarAsignacionCaja = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData			= {}; 
	var oRequest			= null;
	try { 
		oRequest		 = utils.customRequest(req);  
		var oFiltroAsignacionCaja = {};
		oFiltroAsignacionCaja.sUsuarioCaja  	=  oRequest.oAuditRequest.sUsuario; 
		oFiltroAsignacionCaja.sCodEmpresa 	= oRequest.oAuditRequest.sSociedad;  
		oFiltroAsignacionCaja.dFechaActual	= new Date();
		oFiltroAsignacionCaja.iEstadoAsignacionId = 1 ;
		var consultarAsignacionCajaResponse =  await asignacionCajaRxDao.consultarAsignacionCaja(oFiltroAsignacionCaja);
		if(consultarAsignacionCajaResponse.iCode !== 1){
		   throw new Error(consultarAsignacionCajaResponse.iCode + "||" + consultarAsignacionCajaResponse.sMessage);
		}
		var aPermisosCaja = consultarAsignacionCajaResponse.oData;

		var oPermisoUsuario = undefined;
		for (let index = 0; index < aPermisosCaja.length; index++) {
			const element = aPermisosCaja[index]; 
			 var sFechaActual = utils.formatDate(new Date(utils.generarDate()), "yyyy-mm-dd");  
			var sFormatFechaHora = "FE HA:00-05";
			var sFechaHoraInicio = sFormatFechaHora.replace("FE", sFechaActual).replace("HA", element.HoraInicio);
			var sFechaHoraFinal = sFormatFechaHora.replace("FE", sFechaActual).replace("HA", element.HoraFin);
			 
			if(new Date() >= new Date(sFechaHoraInicio) 
				&& new Date() <= new Date(sFechaHoraFinal)){
					oPermisoUsuario = element;
					break;
			} 
			//console.log(new Date()); 
		}
		if(oPermisoUsuario){
			oResponse.iCode 		= 1; 
			oResponse.sMessage		= 'OK';
			oResponse.oData		= oPermisoUsuario;
		}else{
			oResponse.iCode 		= 2; 
			oResponse.sMessage		= 'No tiene caja asignada para este horario';
		}
		
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

