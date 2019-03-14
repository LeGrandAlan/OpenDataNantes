"use strict";
/* Load Car Data Access Object */
const ActiviteDao = require('../dao/activiteDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/**
 * Activite Controller
 */
class ActiviteController {

	constructor() {
		this.activiteDao = new ActiviteDao();
		this.common = new ControllerCommon();
	}


	/**
	 * Finds all entities.
	 * @return {Activite} all entities
	 */
	findAll(res) {
		this.activiteDao.findAll()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	findByAll(req, res) {
		const departement = req.params.departement;
		const commune = req.params.commune;
		const activite = req.params.activite;
		const niveau = req.params.niveau;
		const bus = req.params.bus;
		const tram = req.params.tram;
		const handicap = req.params.handicap;
		this.activiteDao.findByAll(departement, commune, activite, niveau, bus, tram, handicap)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	findByCodePostal(req, res) {
		const codePostal = req.params.code_postal;
		this.activiteDao.findByCodePostal(codePostal)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByNoEquipement(req, res) {
		const value = req.params.value;
		this.activiteDao.findByNoEquipement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	findByCoordonnees(req, res) {
		const latitude = req.params.latitude;
		const longitude = req.params.longitude;
		const rayon = req.params.rayon;
		this.activiteDao.findByCoordonnees(latitude,longitude,rayon)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};


	/**         listOf         **/


	listOfNomDepartement(req, res) {
		const value = req.params.value;
		this.activiteDao.listOfNomDepartement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	listOfNiveauActivite(res) {
		this.activiteDao.listOfNiveauActivite()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	listOfNomActivite(res) {
		this.activiteDao.listOfNomActivite()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	listOfNomCommune(req, res) {
		const value = req.params.value;
		this.activiteDao.listOfNomCommune(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	listOfCodeDepartment(res) {
		this.activiteDao.listOfCodeDepartment()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	listOfNomCommuneByDepartement(req, res) {
		const value = req.params.value;
		this.activiteDao.listOfNomCommuneByDepartement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};


}

module.exports = ActiviteController;