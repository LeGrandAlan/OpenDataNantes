"use strict";
/* Load Car Data Access Object */
const InstallationDao = require('../dao/installationDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');


/**
 * Installation Controller
 */
class InstallationController {

	constructor() {
		this.installationDao = new InstallationDao();
		this.common = new ControllerCommon();
	}


	/**
	 * Finds all entities.
	 * @return all entities
	 */
	findAll(res) {
		this.installationDao.findAll()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};


	/**         findBy         **/


	findByAll(req, res) {
		const departement = req.params.departement;
		const commune = req.params.commune;
		const nomInstallation = req.params.nom_installation;
		const installationParticuliere = req.params.installationParticuliere;
		const bus = req.params.bus;
		const tram = req.params.tram;
		const handicap = req.params.handicap;
		this.installationDao.findByAll(departement, commune, nomInstallation, installationParticuliere, bus, tram, handicap)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	findById(req, res) {
		const id = req.params.id;
		this.installationDao.findById(id)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}


	findByCodeDepartement(req, res) {
		const value = req.params.value;
		this.installationDao.findByCodeDepartement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByDepartement(req, res) {
		const value = req.params.value;
		this.installationDao.findByDepartement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByNomCommune(req, res) {
		const value = req.params.value;
		this.installationDao.findByNomCommune(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByNumeroInstallation(req, res) {
		const value = req.params.value;
		this.installationDao.findByNumeroInstallation(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByNomInstalation(req, res) {
		const value = req.params.value;
		this.installationDao.findByNomInstallation(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByCodePostal(req, res) {
		const value = req.params.value;
		this.installationDao.findByCodePostal(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByInstallationParticuliere(req, res) {
		const value = req.params.value;
		this.installationDao.findByInstallationParticuliere(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByAccessibiliteHandicapes(req, res) {
		const value = req.params.value;
		this.installationDao.findByAccessibiliteHandicapes(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByDesserteBus(req, res) {
		const value = req.params.value;
		this.installationDao.findByDesserteBus(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByDesserteTram(req, res) {
		const value = req.params.value;
		this.installationDao.findByDesserteTram(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByCoordonnes(req, res) {
		const latitude = req.params.latitude;
		const longitude = req.params.longitude;
		const rayon = req.params.rayon;
		this.installationDao.findByCoordonnees(latitude, longitude, rayon)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	/**         listOf         **/


	listOfNomDepartement(req, res) {
		const value = req.params.value;
		this.installationDao.listOfNomDepartement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomsCommunes(res) {
		this.installationDao.listOfNomsCommunes()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomCommune(req, res) {
		const value = req.params.value;
		this.installationDao.listOfNomCommune(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomCommuneByDepartement(req, res) {
		const value = req.params.value;
		this.installationDao.listOfNomCommuneByDepartement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	listOfNomsInstallations(res) {
		this.installationDao.listOfNomsInstallations()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomInstallation(req, res) {
		const value = req.params.value;
		this.installationDao.listOfNomInstallation(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfInstallationsParticulieres(res) {
		this.installationDao.listOfInstallationsParticulieres()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfInstallationParticuliere(req, res) {
		const value = req.params.value;
		this.installationDao.listOfInstallationParticuliere(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfCodesPostaux(res) {
		this.installationDao.listOfCodesPostaux()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfCodePostal(req, res) {
		const value = req.params.value;
		this.installationDao.listOfCodePostal(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}
}

module.exports = InstallationController;