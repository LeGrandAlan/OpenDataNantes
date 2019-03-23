"use strict";
/* Load Modules */
const router = require('express').Router();

/* Load controller */
const EquipementController = require('../../controller/equipementController');
const equipementController = new EquipementController();

/**
 * Equipement Entity routes
 */

// retourne tous les équipements de la base
router.get('/', function (req, res) {
	equipementController.findAll(res);
});

/**         findBy         **/

// retourne tous les équipements répondants aux critètes passés en paramètre
router.get('/departement/:departement/commune/:commune/nom_equipement/:nom_equipement/typeEquipement/:typeEquipement/buvette/:buvette/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	equipementController.findByAll(req, res);
});

// retourne tous les équipements
router.get('/latitude/:latitude/longitude/:longitude/rayon/:rayon/nom_equipement/:nom_equipement/typeEquipement/:typeEquipement/buvette/:buvette/bus/:bus/tram/:tram/handicap/:handicap', function (req, res) {
	equipementController.findByAllAndCoordonnees(req, res);
});

router.get('/id/:id', function (req, res) {
	equipementController.findById(req, res);
});

// returne les équipements associé à une installation dont le numéro est passé en paramètre
router.get('/installation/:no_de_l_installation', function (req, res) {
	equipementController.findByNoDeLInstallation(req, res);
});


/**         listOf         **/

// retourne la liste des noms de départemnt commencant pas la valeur passée en paramètre
router.get('/liste/nom_departement/:value', function (req, res) {
	equipementController.listOfNomDepartement(req, res);
});

// retourne la liste des noms de communes
router.get('/liste/nom_commune/', function (req, res) {
	equipementController.listOfNomsCommunes(res);
});

// retourne la liste des noms de communes commencant pas la valeur passée en paramètre
router.get('/liste/nom_commune/:value', function (req, res) {
	equipementController.listOfNomCommune(req, res);
});

// retourne la liste des noms de communes dans le département passé en paramètre
router.get('/liste/departement/:value/nom_commune', function (req, res) {
	equipementController.listOfNomCommuneByDepartement(req, res);
});

// retourne la liste des différents nom d'équipements
router.get('/liste/nom_equipement/', function (req, res) {
	equipementController.listOfNomsEquipements(res);
});

// retourne la liste des noms d'équipements commencant par la valeur passé en paramètre
router.get('/liste/nom_equipement/:value', function (req, res) {
	equipementController.listOfNomEquipement(req, res);
});

// retourne la liste des différents type d'équipements
router.get('/liste/type_equipement/', function (req, res) {
	equipementController.listOfTypesEquipements(res);
});

// retpurne la liste des type d'équipement commencant par la valeur passée en paramètre
router.get('/liste/type_equipement/:value', function (req, res) {
	equipementController.listOfTypeEquipement(req, res);
});


module.exports = router;