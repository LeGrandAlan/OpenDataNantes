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

}

module.exports = EquipementController;