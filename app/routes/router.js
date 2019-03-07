/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/installation', require('./api/installationRoutes'));
router.use('/equipement', require('./api/equipementRoutes'));
router.use('/activite', require('./api/activiteRoutes'));
router.use('/test', require('./api/testRoutes'));

module.exports = router;