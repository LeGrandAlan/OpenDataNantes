"use strict";
/* Load Car Data Access Object */
const EquipementDao = require('../dao/equipementDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/**
 * Equipement Controller
 */
class EquipementController {

	constructor() {
		this.equipementDao = new EquipementDao();
		this.common = new ControllerCommon();
	}

	/**
	 * Finds all entities.
	 * @return all entities
	 */
	findAll(res) {
		this.equipementDao.findAll()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};


	/**         findBy         **/


	findByAll(req, res) {
		const departement = req.params.departement;
		const commune = req.params.commune;
		const nomEquipement = req.params.nom_equipement;
		const typeEquipement = req.params.typeEquipement;
		const buvette = req.params.buvette;
		const bus = req.params.bus;
		const tram = req.params.tram;
		const handicap = req.params.handicap;
		this.equipementDao.findByAll(departement, commune, nomEquipement, typeEquipement, buvette, bus, tram, handicap)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};


	findByNoDeLInstallation(req, res) {
		const noDeLInstallation = req.params.no_de_l_installation;
		this.equipementDao.findByNoDeLInstallation(noDeLInstallation)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	findByCoordonnees(req, res) {
		const latitude = req.params.latitude;
		const longitude = req.params.longitude;
		const rayon = req.params.rayon;
		this.equipementDao.findByCoordonnees(latitude, longitude, rayon)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	};

	/**         listOf         **/


	listOfNomDepartement(req, res) {
		const value = req.params.value;
		this.equipementDao.listOfNomDepartement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomsCommunes(res) {
		this.equipementDao.listOfNomsCommunes()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomCommune(req, res) {
		const value = req.params.value;
		this.equipementDao.listOfNomCommune(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomsEquipements(res) {
		this.equipementDao.listOfNomsEquipements()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomEquipement(req, res) {
		const value = req.params.value;
		this.equipementDao.listOfNomEquipement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfTypesEquipements(res) {
		this.equipementDao.listOfTypesEquipements()
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfTypeEquipement(req, res) {
		const value = req.params.value;
		this.equipementDao.listOfTypeEquipement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

}

module.exports = EquipementController;