"use strict";
/* Load Modules */
const router = require('express').Router();

/* Load controller */
const ActiviteController = require('../../controller/activiteController');
const activiteController = new ActiviteController();

/**
 * Activite Entity routes
 */

router.get('/', function (req, res) {
	activiteController.findAll(res);
});

/**         findBy         **/

router.get('/code_postal/:code_postal', function (req, res) {
	activiteController.findByCodePostal(req, res);
});

router.get('/equipement/numero_equipement/:value', function (req, res) {
	activiteController.findByNoEquipement(req, res);
});

router.get('/departement/:departement/commune/:commune/activite/:activite/niveau/:niveau/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	activiteController.findByAll(req, res);
});

/**         listOf         **/

router.get('/liste/nom_departement/:value', function (req, res) {
	activiteController.listOfNomDepartement(req, res);
});
router.get('/liste/nom_commune/:value', function (req, res) {
	activiteController.listOfNomCommune(req, res);
});
router.get('/liste/nom_activite/:value', function (req, res) {
	activiteController.listOfNomActivite(req, res);
});

router.get('/liste/departement/:value/nom_commune', function (req, res) {
	activiteController.listOfNomCommuneByDepartement(req, res);
});

router.get('/liste/code_departement/', function (req, res) {
	activiteController.listOfCodeDepartment(res);
});

router.get('/liste/nom_activite/', function (req, res) {
	activiteController.listOfNomActiviteSimple(res);
});

router.get('/liste/niveau_activite/', function (req, res) {
	activiteController.listOfNiveauActivite(res);
});


module.exports = router;