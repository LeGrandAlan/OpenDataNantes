"use strict";
/* Load Modules */
const router = require('express').Router();

/* Load controller */
const ActiviteController = require('../../controller/activiteController');
const activiteController = new ActiviteController();

/**
 * Activite Entity routes
 */

// retourne toutes les activites
router.get('/', function (req, res) {
	activiteController.findAll(res);
});

/**         findBy         **/

// retourne toutes les activites correspondants aux critères
router.get('/departement/:departement/commune/:commune/activite/:activite/niveau/:niveau/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	activiteController.findByAll(req, res);
});

// retourne toutes les activites correspondants aux critères par coordonnées
router.get('/latitude/:latitude/longitude/:longitude/rayon/:rayon/activite/:activite/niveau/:niveau/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	activiteController.findByAllAndCoordonnees(req, res);
});

// retourne l'activité corespondant à l'id
router.get('/id/:id', function (req, res) {
	activiteController.findById(req, res);
});

// retour les activites correspondant au numéro d'équipement associé
router.get('/equipement/numero_equipement/:value', function (req, res) {
	activiteController.findByNoEquipement(req, res);
});

/**         listOf         **/

// retourne la liste des noms de département commencant par la valeur passé en paramètre
router.get('/liste/nom_departement/:value', function (req, res) {
	activiteController.listOfNomDepartement(req, res);
});

// retourne la liste des noms de communes commencant par la valeur passé en paramètre
router.get('/liste/nom_commune/:value', function (req, res) {
	activiteController.listOfNomCommune(req, res);
});

// retourne la liste des noms de communes dont le département est passé en paramètre
router.get('/liste/departement/:value/nom_commune', function (req, res) {
	activiteController.listOfNomCommuneByDepartement(req, res);
});

// retourne la liste des différents codes de départements
router.get('/liste/code_departement/', function (req, res) {
	activiteController.listOfCodeDepartment(res);
});

// retourne la liste des différents noms d'activités
router.get('/liste/nom_activite/', function (req, res) {
	activiteController.listOfNomActivite(res);
});

// retourne la liste des différents niveaux d'activités
router.get('/liste/niveau_activite/', function (req, res) {
	activiteController.listOfNiveauActivite(res);
});


module.exports = router;