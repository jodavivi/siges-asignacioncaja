/**
 * @description Función para devoler el objeto de respuesta
 * @creation David Villanueva 30/11/2020
 * @update 
 */
exports.customResponse   = function (oParam) {  
	var oResponse = {};
	oResponse.oAuditResponse				= {};
	oResponse.oAuditResponse.iCode			= oParam.iCode;
	oResponse.oAuditResponse.sMessage		= oParam.sMessage;
	oResponse.oAuditResponse.sIdTransaction = oParam.sIdTransaccion;
	oResponse.oData 						 = oParam.oData;
	
	return oResponse;
}

/**
 * @description Función para devoler el objeto de entrada
 * @creation David Villanueva 01/12/2020
 * @update 
 */
 exports.customRequest   = function (oRequest) {  
	var oResponse = {};
	oResponse.oAuditRequest					= {}; 
	oResponse.oAuditRequest.sUsuario		= oRequest.headers.susuario;
 
	if(oRequest.headers.dfecha !== undefined){
		oResponse.oAuditRequest.dFecha			= oRequest.headers.dfecha;
	}else{
		oResponse.oAuditRequest.dFecha			= new Date().toISOString();
	} 
	oResponse.oAuditRequest.sTerminal 		= oRequest.headers.sterminal;
	oResponse.oAuditRequest.sIdTransaccion  = oRequest.headers.sidtransaccion;
	oResponse.oAuditRequest.oInfoUsuario 	= oRequest.headers.oinfousuario;
	oResponse.oAuditRequest.sSociedad 		= oRequest.headers.ssociedad;
	oResponse.oAuditRequest.oEmpresa 		= oRequest.headers.oempresa;
	oResponse.oData 						= oRequest.body; 
	return oResponse;
}

/**
 * @description Función para obtener el error
 * @creation David Villanueva 09/08/2020
 * @update 
 */
exports.customError   = function (error) {  
	var oError = {};
	if(error.name === "Error"){
		var sErrorMensaje	= error.message.split("||");
		oError.iCode		= parseInt(sErrorMensaje[0],10);
		oError.sMessage 	= sErrorMensaje[1]; 
	}else{
		var sErrorMensaje = "Sin ubicación";
		if(error.stack !== undefined){
			sErrorMensaje	= error.stack.split("\n")[1].replace("    at ", "");
		} 
		oError.sMessage 	= sErrorMensaje; 
	}
	
	return oError;
}

/**
 * @description Función para generar codigos personalizados
 * @creation David Villanueva 10/08/2020
 * @update 
 */
exports.generarCodigo  = function (Id,cantidad, valorInicial){
    var pad ="";
    for(var i=0;i<cantidad;i++){
        pad="0"+pad;
    }
    var n = Id;
    var codigo = valorInicial+ (pad+n).slice(-pad.length); 
    
    return codigo;
}

/**
 * @description Función para devoler el objeto de entrada
 * @creation David Villanueva 03/08/2022
 * @update 
 */
 exports.validaDatosAuditoria   = function (oHeader) {  
	var oResponse = {}; 
	oResponse.iCode = 1;
	oResponse.sMessage = "OK";
	if(!oHeader['sidtransaccion']){
		oResponse.iCode = 200;
		oResponse.sMessage = "Falta datos de Auditoria: Idtransaccion";
	}
	if(!oHeader['saplicacion']){
		oResponse.iCode = 201;
		oResponse.sMessage = "Falta datos de Auditoria: Aplicacion";
	}
	if(!oHeader['sterminal']){
		oResponse.iCode = 203;
		oResponse.sMessage = "Falta datos de Auditoria: Terminal";
	} 
	 
	return oResponse;
}

/**
 * @description Función para obtener formato de fecha segun formato: dd/mm/yyyy ---- dd/mm/yyyy h:m:s
 * @creation David Villanueva 09/08/2020
 * @update 
 */
 exports.formatDate   = function (date, format) {   
	
	var nuevoFormat='';
	if(date !== undefined && date !== null ){
		if(date.getFullYear() !== -1){
		    var dd = (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());
		    var mm = (date.getMonth() + 1<=9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));
		    var yyyy = date.getFullYear();
		    var hour = (date.getHours() <= 9 ? '0' + date.getHours() : date.getHours());
		    var minut = (date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes());
		    var segund = (date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds());
		    nuevoFormat = format.replace('dd',dd)
								    .replace('mm',mm)
								    .replace('yyyy',yyyy)
								    .replace('h',hour)
								    .replace('m', minut)
								    .replace('s',segund);
		}
	}
    return  nuevoFormat;
}

/**
 * @description Función para obtener formato de fecha segun formato: dd/mm/yyyy ---- dd/mm/yyyy h:m:s
 * @creation David Villanueva 09/08/2020
 * @update 
 */

 exports.generarDate   = function (fecha) {  
	var nuevaFecha = ''; 
	if(fecha === undefined || fecha === null || fecha === ''){
		var iTiempoServidor = 5; 
		var FechaInicio = new Date();  
	 	FechaInicio.setHours(FechaInicio.getHours() + iTiempoServidor);
	 	nuevaFecha  = this.formatDate(FechaInicio, "yyyy-mm-ddTh:m:sZ");
	}else{ 
		nuevaFecha = fecha;
	} 
	return nuevaFecha;
}

