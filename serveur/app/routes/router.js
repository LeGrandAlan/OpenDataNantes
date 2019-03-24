"use strict";
/**
 * Express Router configuration
 */
const router = require('express').Router();

/* API routes */
router.use('/installation', require('./api/installationRoutes'));
router.use('/equipement', require('./api/equipementRoutes'));
router.use('/activite', require('./api/activiteRoutes'));

module.exports = router;