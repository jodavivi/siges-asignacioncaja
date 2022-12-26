const utils 	 = require('../utils/utils'); 
const asignacionCajaTxDao = require('../dao/AsignacionCajaTxDao');   
const asignacionCajaRxDao = require('../dao/AsignacionCajaRxDao');   
const config 					= require('../config/config.json');  

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
		 var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);  
		  //Consultamos si existe la el mismo horario
		  var oFiltro = {};
		  oFiltro.sCodEmpresa = oEmpresa.CodEmpresa;
		  oFiltro.sUsuarioCaja = oRequest.oData.sUsuarioCaja;
		  oFiltro.iEstadoAsignacionId = [0,1];
		  var consultarAsignacionCajaResponse = await asignacionCajaRxDao.consultarAsignacionCaja(oFiltro); 
		  var oHorarioExistente = {};
		  if(consultarAsignacionCajaResponse.iCode === 1){
			var aLista = consultarAsignacionCajaResponse.oData; 
			var isExisteCruze = false; 
			for (let index = 0; index < aLista.length; index++) { 
				var element = aLista[index].toJSON();
				isExisteCruze = validarCruzeHorario(oRequest.oData, element); 
				if(isExisteCruze){
					oHorarioExistente = element;
					break;
				} 
			} 
			if(isExisteCruze){ 
				throw new Error(102 + "||" + "Ya existe un horario asignado, Id: " + oHorarioExistente.Id );
			}  
		  }

		 var oRegistroVenta = {};
		 oRegistroVenta.oAuditRequest  		= oRequest.oAuditRequest;
		 oRegistroVenta.oData		  		= oRequest.oData; 
		 oRegistroVenta.oData.sCodEmpresa 	= oEmpresa.CodEmpresa;
		 oRegistroVenta.oData.sEmpresa 		= oEmpresa.RazonSocial;
		 if(oRequest.oData.iEstadoAsignacionId === 1){
			oRegistroVenta.oData.sEstadoAsignacion = config.estadoActivo;
		 }else{
			oRegistroVenta.oData.sEstadoAsignacion = config.estadoDesactivo;
		 }
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
		var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);  
		//Consultar si existe cruze de horario
		var oFiltro = {};
		  oFiltro.sCodEmpresa = oEmpresa.CodEmpresa;
		  oFiltro.sUsuarioCaja = oRequest.oData.sUsuarioCaja;
		  oFiltro.iEstadoAsignacionId = [0,1];
		  var consultarAsignacionCajaResponse = await asignacionCajaRxDao.consultarAsignacionCaja(oFiltro); 
		  var oHorarioExistente = {};
		  if(consultarAsignacionCajaResponse.iCode === 1){
			var aLista = consultarAsignacionCajaResponse.oData; 
			var isExisteCruze = false;
			for (let index = 0; index < aLista.length; index++) { 
				var element = aLista[index].toJSON();
				if(element.Id !== parseInt(req.params.id, 10)){
					isExisteCruze = validarCruzeHorario(oRequest.oData, element); 
					if(isExisteCruze){
						oHorarioExistente = element;
						break;
					} 
				} 
			} 
			if(isExisteCruze){ 
				throw new Error(102 + "||" + "Ya existe un horario asignado, Id: " + oHorarioExistente.Id );
			}  
		  }

		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		if(oRequest.oData.iEstadoAsignacionId === 1){
			oRegistro.oData.sEstadoAsignacion = config.estadoActivo;
		 }else{
			oRegistro.oData.sEstadoAsignacion = config.estadoDesactivo;
		 }
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

function validarCruzeHorario(oFechaHorarioNuevo, oFechaHorario){ 
	var fechaInicioNuevo = new Date(oFechaHorarioNuevo.dFechaInicio); 
	//fechaInicioNuevo.setHours(0,0,0,0);    
	if (fechaInicioNuevo >=oFechaHorario.FechaInicio && fechaInicioNuevo <=oFechaHorario.FechaFin){ 
		var horaNuevoinicio = fechaInicioNuevo.setHours(parseInt(oFechaHorarioNuevo.sHoraInicio.split(":")[0]),parseInt(oFechaHorarioNuevo.sHoraInicio.split(":")[1]),0,0);
		var horaNuevoFinal = fechaInicioNuevo.setHours(parseInt(oFechaHorarioNuevo.sHoraFin.split(":")[0]),parseInt(oFechaHorarioNuevo.sHoraFin.split(":")[1]),0,0);
		var horaActualInicio = fechaInicioNuevo.setHours(parseInt(oFechaHorario.HoraInicio.split(":")[0]),parseInt(oFechaHorario.HoraInicio.split(":")[1]),0,0);
		var horaActualFinal = fechaInicioNuevo.setHours(parseInt(oFechaHorario.HoraFin.split(":")[0]),parseInt(oFechaHorario.HoraFin.split(":")[1]),0,0);
			console.log("Esta dentro de la fecha 1");
		if(horaNuevoinicio >= horaActualInicio && horaNuevoinicio <= horaActualFinal) {
			console.log("Esta dentro del horario 1");
			return true;
		}

	} 

	var fechaFinNuevo = new Date(oFechaHorarioNuevo.dFechaFin); 
	if (fechaFinNuevo >=oFechaHorario.FechaInicio && fechaFinNuevo <=oFechaHorario.FechaFin){ 
		var horaNuevoinicio = fechaFinNuevo.setHours(parseInt(oFechaHorarioNuevo.sHoraInicio.split(":")[0]),parseInt(oFechaHorarioNuevo.sHoraInicio.split(":")[1]),0,0);
		var horaNuevoFinal = fechaFinNuevo.setHours(parseInt(oFechaHorarioNuevo.sHoraFin.split(":")[0]),parseInt(oFechaHorarioNuevo.sHoraFin.split(":")[1]),0,0);
		var horaActualInicio = fechaFinNuevo.setHours(parseInt(oFechaHorario.HoraInicio.split(":")[0]),parseInt(oFechaHorario.HoraInicio.split(":")[1]),0,0);
		var horaActualFinal = fechaFinNuevo.setHours(parseInt(oFechaHorario.HoraFin.split(":")[0]),parseInt(oFechaHorario.HoraFin.split(":")[1]),0,0);
			console.log("Esta dentro de la fecha 2");
		if(horaNuevoFinal >= horaActualInicio && horaNuevoFinal <= horaActualFinal) {
			console.log("Esta dentro del horario 2");
			return true;
		}

	}  
	return false;
}
