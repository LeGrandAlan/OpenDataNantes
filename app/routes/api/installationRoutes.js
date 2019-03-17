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

/**         findBy          **/

router.get('/departement/:departement/commune/:commune/nom_installation/:nom_installation/installationParticuliere/:installationParticuliere/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	installationController.findByAll(req, res);
});

router.get('/id/:id', function (req, res) {
	installationController.findById(req, res);
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

router.get('/numero_installation/:value', function (req, res) {
	installationController.findByNumeroInstallation(req, res);
});

router.get('/nom_installation/:value', function (req, res) {
	installationController.findByNomInstalation(req, res);
});

router.get('/code_postal/:value', function (req, res) {
	installationController.findByCodePostal(req, res);
});

router.get('/installation_particuliere/:value', function (req, res) {
	installationController.findByInstallationParticuliere(req, res);
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

router.get('/latitude/:latitude/longitude/:longitude/rayon/:rayon', function (req, res) {
	installationController.findByCoordonnes(req, res);
});

/**     listOf     **/

router.get('/liste/nom_departement/:value', function (req, res) {
	installationController.listOfNomDepartement(req, res);
});

router.get('/liste/nom_commune/', function (req, res) {
	installationController.listOfNomsCommunes(res);
});

router.get('/liste/nom_commune/:value', function (req, res) {
	installationController.listOfNomCommune(req, res);
});

router.get('/liste/departement/:value/nom_commune', function (req, res) {
	installationController.listOfNomCommuneByDepartement(req, res);
});

router.get('/liste/nom_installation/', function (req, res) {
	installationController.listOfNomsInstallations(res);
});

router.get('/liste/nom_installation/:value', function (req, res) {
	installationController.listOfNomInstallation(req, res);
});

router.get('/liste/installations_particuliere/', function (req, res) {
	installationController.listOfInstallationsParticulieres(res);
});

router.get('/liste/installations_particuliere/:value', function (req, res) {
	installationController.listOfInstallationParticuliere(req, res);
});

router.get('/liste/code_postal/', function (req, res) {
	installationController.listOfCodesPostaux(res);
});

router.get('/liste/code_postal/:value', function (req, res) {
	installationController.listOfCodePostal(req, res);
});


module.exports = router;