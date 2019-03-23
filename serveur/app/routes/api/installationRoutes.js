"use strict";
/* Load Modules */
const router = require('express').Router();

/* Load controller */
const InstallationController = require('../../controller/installationController');
const installationController = new InstallationController();

/**
 * Installation Entity routes
 */

// retourne toutes les installations de la base
router.get('/', function (req, res) {
	installationController.findAll(res);
});

/**         findBy          **/

// retourne les installations correspondants aux critères passé en paramètres
router.get('/departement/:departement/commune/:commune/nom_installation/:nom_installation/installationParticuliere/:installationParticuliere/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	installationController.findByAll(req, res);
});

// retourne les installations correspondants aux critères passé en paramètres par géolocalisation
router.get('/latitude/:latitude/longitude/:longitude/rayon/:rayon/nom_installation/:nom_installation/installationParticuliere/:installationParticuliere/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	installationController.findByAllAndCoordonnees(req, res);
});

// retourne l'instalation dont l'id est passé en paramètre
router.get('/id/:id', function (req, res) {
	installationController.findById(req, res);
});

// retourne toutes les installations du département dont le code est passé en paramètre
router.get('/code_departement/:value', function (req, res) {
	installationController.findByCodeDepartement(req, res);
});

// retourne toutes les installations du département dont le nom est passé en paramètre
router.get('/departement/:value', function (req, res) {
	installationController.findByDepartement(req, res);
});

// retourne toutes les installations d'une communedont le nom est passé en paramètre
router.get('/nom_commune/:value', function (req, res) {
	installationController.findByNomCommune(req, res);
});

// retourne toutes les instalations ayant le numero passé en paramètre
router.get('/numero_installation/:value', function (req, res) {
	installationController.findByNumeroInstallation(req, res);
});

// retourne toutes les installations dont le nom contient la valeur passée en paramètre
router.get('/nom_installation/:value', function (req, res) {
	installationController.findByNomInstalation(req, res);
});

// retourne toutes les installations dont le code postal est celui passé en paramètre
router.get('/code_postal/:value', function (req, res) {
	installationController.findByCodePostal(req, res);
});

// retourne toutes les installations dont l'installation particulère est la valeur passée en paramètre
router.get('/installation_particuliere/:value', function (req, res) {
	installationController.findByInstallationParticuliere(req, res);
});

// retourne toutes les installations dont l'accessiblite aux handicapes est la valeur passée en paramètre
router.get('/accessiblite_handicapes/:value', function (req, res) {
	installationController.findByAccessibiliteHandicapes(req, res);
});

// retourne toutes les installations dont la desserte de tram est la valeur passée en paramètre
router.get('/desserte_bus/:value', function (req, res) {
	installationController.findByDesserteBus(req, res);
});

// retourne toutes les installations dont la desserte de bus est égual à la valeur passée en parapètre
router.get('/desserte_tram/:value', function (req, res) {
	installationController.findByDesserteTram(req, res);
});

/**     listOf     **/

// retourne la liste des noms de départements commencant par la valeur passé en paramètre
router.get('/liste/nom_departement/:value', function (req, res) {
	installationController.listOfNomDepartement(req, res);
});

// retourne la liste différents des noms de communes
router.get('/liste/nom_commune/', function (req, res) {
	installationController.listOfNomsCommunes(res);
});

// retourne la liste des nom de communes commencant par la valeur passée en paramètre
router.get('/liste/nom_commune/:value', function (req, res) {
	installationController.listOfNomCommune(req, res);
});

// retourne la liste des noms de communes dans le département passé en paramètre
router.get('/liste/departement/:value/nom_commune', function (req, res) {
	installationController.listOfNomCommuneByDepartement(req, res);
});

// retourne la liste des differents noms des installations
router.get('/liste/nom_installation/', function (req, res) {
	installationController.listOfNomsInstallations(res);
});

// retourne la liste des noms d'installations commencant par la valeur passé en paramètre
router.get('/liste/nom_installation/:value', function (req, res) {
	installationController.listOfNomInstallation(req, res);
});

// retourne la liste des différentes installations particulère
router.get('/liste/installations_particuliere/', function (req, res) {
	installationController.listOfInstallationsParticulieres(res);
});

// retourne la liste des installations partiluclières commencant par la valeur passée en paramètre
router.get('/liste/installations_particuliere/:value', function (req, res) {
	installationController.listOfInstallationParticuliere(req, res);
});

// retourne la liste des différents codes postaux
router.get('/liste/code_postal/', function (req, res) {
	installationController.listOfCodesPostaux(res);
});

// retourne la liste des codes postaux commencant par la valeur passé en paramètre
router.get('/liste/code_postal/:value', function (req, res) {
	installationController.listOfCodePostal(req, res);
});


module.exports = router;