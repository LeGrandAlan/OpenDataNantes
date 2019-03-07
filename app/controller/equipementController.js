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



    findByNoDeLInstallation(req,res){
        const noDeLInstallation = req.params.no_de_l_installation;
        this.equipementDao.findByNoDeLInstallation(noDeLInstallation)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

}

module.exports = EquipementController;