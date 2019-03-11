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

router.get('/liste/nom_departement/:value', function (req, res) {
	equipementController.listOfNomDepartement(req, res);
});

router.get('/liste/nom_commune/:value', function (req, res) {
	equipementController.listOfNomCommune(req, res);
});

router.get('/liste/nom_equipement/:value', function (req, res) {
	equipementController.listOfNomEquipement(req, res);
});

router.get('/liste/type_equipement/:value', function (req, res) {
	equipementController.listOfTypeEquipement(req, res);
});


module.exports = router;