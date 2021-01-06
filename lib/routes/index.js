const express = require('express');
const router = express.Router();

const asignacionCajaRxBusiness          = require('../business/AsignacionCajaRxBusiness');  
const asignacionCajaTxBusiness          = require('../business/AsignacionCajaTxBusiness');  
const asignacionCajaEstadoRxBusiness    = require('../business/AsignacionCajaEstadoRxBusiness');  
const asignacionCajaEstadoTxBusiness    = require('../business/AsignacionCajaEstadoTxBusiness');  

module.exports = function(){

    //asignacioncaja
    router.post('/', asignacionCajaTxBusiness.registrarAsignacionCaja); 
    router.put('/:id', asignacionCajaTxBusiness.actualizarAsignacionCaja); 
    router.delete('/', asignacionCajaTxBusiness.eliminarAsignacionCaja);  
    router.get('/', asignacionCajaRxBusiness.consultarAsignacionCaja); 
    
    //asignacioncaja_estado
    router.post('/cajaestado', asignacionCajaEstadoTxBusiness.registrarAsignacionCajaEstado); 
    router.put('/cajaestado/:id', asignacionCajaEstadoTxBusiness.actualizarAsignacionCajaEstado); 
    router.delete('/cajaestado/', asignacionCajaEstadoTxBusiness.eliminarAsignacionCajaEstado);  
    router.get('/cajaestado/', asignacionCajaEstadoRxBusiness.consultarAsignacionCajaEstado); 
 
    return router;
}

