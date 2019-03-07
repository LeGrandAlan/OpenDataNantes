/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const EquipementController = require('../../controller/equipementController');
const equipementController = new EquipementController();

/**
 * Equipement Entity routes
 */


//Les  équipements associé à une installation
router.get('/installation/:no_de_l_installation', function (req, res) {
    equipementController.findByNoDeLInstallation(req,res);
});


module.exports = router;