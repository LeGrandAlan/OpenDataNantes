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

/**         findBy         **/

router.get('/departement/:departement/commune/:commune/equipement/:equipement/typeEquipement/:typeEquipement/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	equipementController.findByAll(req, res);
});

//Les  équipements associé à une installation
router.get('/installation/:no_de_l_installation', function (req, res) {
	equipementController.findByNoDeLInstallation(req, res);
});

/**         listOf         **/

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