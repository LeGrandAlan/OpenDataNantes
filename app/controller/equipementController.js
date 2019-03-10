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


	findByNoDeLInstallation(req, res) {
		const noDeLInstallation = req.params.no_de_l_installation;
		this.equipementDao.findByNoDeLInstallation(noDeLInstallation)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomDepartement(req, res) {
		const value = req.params.value;
		this.equipementDao.listOfNomDepartement(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomCommune(req, res) {
		const value = req.params.value;
		this.equipementDao.listOfNomCommune(value)
			.then(this.common.findSuccess(res))
			.catch(this.common.findError(res));
	}

	listOfNomEquipement(req, res) {
		const value = req.params.value;
		this.equipementDao.listOfNomEquipement(value)
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