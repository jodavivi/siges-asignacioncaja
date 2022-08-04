const express = require('express');
const router = express.Router();

const asignacionCajaRxBusiness          = require('../business/AsignacionCajaRxBusiness');  
const asignacionCajaTxBusiness          = require('../business/AsignacionCajaTxBusiness');   

module.exports = function(){

    //asignacioncaja
    router.post('/', asignacionCajaTxBusiness.registrarAsignacionCaja); 
    router.put('/:id', asignacionCajaTxBusiness.actualizarAsignacionCaja); 
    router.delete('/', asignacionCajaTxBusiness.eliminarAsignacionCaja);  
    router.get('/', asignacionCajaRxBusiness.consultarAsignacionCaja);  

    router.get('/verificar', asignacionCajaRxBusiness.verificarAsignacionCaja);  
    return router;
}

