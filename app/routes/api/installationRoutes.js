"use strict";
/* Load Modules */
const router = require('express').Router();

/* Load controller */
const InstallationController = require('../../controller/installationController');
const installationController = new InstallationController();

/**
 * Installation Entity routes
 */


router.get('/', function (req, res) {
	installationController.findAll(res);
});

router.get('/code_departement/:value', function (req, res) {
	installationController.findByCodeDepartement(req, res);
});

router.get('/departement/:value', function (req, res) {
	installationController.findByDepartement(req, res);
});

router.get('/nom_commune/:value', function (req, res) {
	installationController.findByNomCommune(req, res);
});

router.get('/numero_instalation/:value', function (req, res) {
	installationController.findByNumeroInstallation(req, res);
});

router.get('/nom_instalation/:value', function (req, res) {
	installationController.findByNomInstalation(req, res);
});

router.get('/code_postal/:value', function (req, res) {
	installationController.findByCodePostal(req, res);
});

router.get('/instalation_particuliere/:value', function (req, res) {
	installationController.findByInstalationParticuliere(req, res);
});

router.get('/accessiblite_handicapes/:value', function (req, res) {
	installationController.findByAccessibiliteHandicapes(req, res);
});

router.get('/desserte_bus/:value', function (req, res) {
	installationController.findByDesserteBus(req, res);
});

router.get('/desserte_tram/:value', function (req, res) {
	installationController.findByDesserteTram(req, res);
});

router.get('/coordonnes/:latitude/:longitude', function (req, res) {
	installationController.findByCoordonnes(req, res);
});


module.exports = router;