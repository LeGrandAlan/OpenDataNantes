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

router.get('/departement/:departement/commune/:commune/nom_equipement/:nom_equipement/typeEquipement/:typeEquipement/buvette/:buvette/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	equipementController.findByAll(req, res);
});

router.get('/latitude/:latitude/longitude/:longitude/rayon/:rayon/nom_equipement/:nom_equipement/typeEquipement/:typeEquipement/buvette/:buvette/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	equipementController.findByAllAndCoordonnees(req, res);
});

router.get('/id/:id', function (req, res) {
	equipementController.findById(req, res);
});

//Les  équipements associé à une installation
router.get('/installation/:no_de_l_installation', function (req, res) {
	equipementController.findByNoDeLInstallation(req, res);
});


/**         listOf         **/

router.get('/liste/nom_departement/:value', function (req, res) {
	equipementController.listOfNomDepartement(req, res);
});

router.get('/liste/nom_commune/', function (req, res) {
	equipementController.listOfNomsCommunes(res);
});

router.get('/liste/nom_commune/:value', function (req, res) {
	equipementController.listOfNomCommune(req, res);
});

router.get('/liste/departement/:value/nom_commune', function (req, res) {
	equipementController.listOfNomCommuneByDepartement(req, res);
});

router.get('/liste/nom_equipement/', function (req, res) {
	equipementController.listOfNomsEquipements(res);
});

router.get('/liste/nom_equipement/:value', function (req, res) {
	equipementController.listOfNomEquipement(req, res);
});

router.get('/liste/type_equipement/', function (req, res) {
	equipementController.listOfTypesEquipements(res);
});

router.get('/liste/type_equipement/:value', function (req, res) {
	equipementController.listOfTypeEquipement(req, res);
});


module.exports = router;