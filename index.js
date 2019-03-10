"use strict";
/* Load modules */
const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

app.use(cors());

/* BJF Current PATH */
//const path = require('path');
//global.appRoot = path.resolve(__dirname); //espacede nommage global

/* Database configuration */
const database = require('./app/config/dbconfig');

/* Init database */
// database.init();

/* Init server listening */
const port = process.argv[2] || 3000;
app.listen(port, () => {
	console.log("Server listening on port : " + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Router configuration */
app.use('/api', require('./app/routes/router'));

app.use('/', express.static('client'));


