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

router.get('/code_postal/:code_postal', function (req, res) {
	activiteController.findByCodePostal(req, res);
});

router.get('/equipement/numero_equipement/:value', function (req, res) {
	activiteController.findByNoEquipement(req, res);
});

router.get('/liste/nom_departement/:value', function (req, res) {
	activiteController.listOfNomDepartement(req, res);
});
router.get('/liste/nom_commune/:value', function (req, res) {
	activiteController.listOfNomCommune(req, res);
});
router.get('/liste/nom_activite/:value', function (req, res) {
	activiteController.listOfNomActivite(req, res);
});

router.get('/liste/niveau_activite/', function (req, res) {
	activiteController.listOfNiveauActivite(res);
});


module.exports = router;