/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const InstallationController = require('../../controller/installationController');
const installationController = new InstallationController();

/**
 * Installation Entity routes
 */


router.get('/', function (req, res) {
    installationController.findAll(res);
});

router.get('/code_postal/:code_postal', function (req, res) {
    installationController.findByCodePostal(req,res);
});




module.exports = router;