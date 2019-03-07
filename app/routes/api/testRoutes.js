/* Load Modules */
const express = require('express');
const router = express.Router();



/**
 * Activite Entity routes
 */




router.get('/test1', function (req, res) {
    res.status(200); // Found
    res.json({
        noms: ['sebastien','jf','bahia']

    });
});




module.exports = router;