/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ActiviteController = require('../../controller/activiteController');
const activiteController = new ActiviteController();

/**
 * Activite Entity routes
 */




router.get('/code_postal/:code_postal', function (req, res) {
    activiteController.findByCodePostal(req,res);
});




module.exports = router;