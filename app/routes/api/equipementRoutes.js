"use strict";
/* Load Modules */
const router = require('express').Router();

/* Load controller */
const EquipementController = require('../../controller/equipementController');
const equipementController = new EquipementController();

/**
 * Equipement Entity routes
 */

router.get('/', function (req, res) {
	equipementController.findAll(res);
});


//Les  équipements associé à une installation
router.get('/installation/:no_de_l_installation', function (req, res) {
	equipementController.findByNoDeLInstallation(req, res);
});


module.exports = router;