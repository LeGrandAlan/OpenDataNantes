"use strict";
/* Load modules */
const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const helmet = require('helmet');
const compression = require('compression');

/* Database configuration */
const database = require('./app/config/dbconfig');

/* Init database */
if (process.argv[2] === "init") // si la commande d'execution comporte init
	database.init();

/* Init server listening */
const port = 3000;
app.listen(port, () => {
	console.log("Server listening on port : " + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

/* Express security   */
app.use(helmet());
app.disable('x-powered-by');

/* Router configuration */
app.use('/api', require('./app/routes/router'));

