"use strict";

const fs = require('fs');
const sqlite = require('sqlite3').verbose();
const parse = require('csv-parse');

const ACTIVITEFILEPATH = ("./data/extra_small/234400034_004-009_activites-des-fiches-equipements-rpdl_extra_small.csv");
// const ACTIVITEFILEPATH = ("./data/small/234400034_004-009_activites-des-fiches-equipements-rpdl_small.csv");
const ACTIVITETABLENAME = "activites";

const INSTALLATIONFILEPATH = ("./data/extra_small/234400034_004-010_fiches-installations-rpdl_extra_small.csv");
// const INSTALLATIONFILEPATH = ("./data/small/234400034_004-010_fiches-installations-rpdl_small.csv");
const INSTALLATIONTABLENAME = "installations";

const EQUIPEMENTPATH = ("./data/extra_small/234400034_004-011_fiches-equipements-rpdl_extra_small.csv");
// const EQUIPEMENTPATH = ("./data/small/234400034_004-011_fiches-equipements-rpdl_small.csv");
const EQUIPEMENTTABLENAME = "equipements";
// open database in memory
const db = new sqlite.Database('./database.db', (err) => {
	if (err)
		return console.error(err.message);
	console.log('Connected to my database.');
});

db.get("PRAGMA foreign_keys = ON"); // on active les contraintes d'intégrités
db.get("PRAGMA synchronous = OFF"); // pas d'appels disque à chaque insert
db.get("PRAGMA temp_store = MEMORY"); // on place la BD en RAM


/**
 * Crée la table activité
 * @returns {Promise<>}
 */
const createActiviteTable = function () {
	return new Promise(function (resolve, reject) {
		let parser = parse({delimiter: ';'}, function (err, data) {//4 is primary key
			let sqlCreateTable = `CREATE TABLE IF NOT EXISTS ${ACTIVITETABLENAME} (
    \`${data[0][0].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][1].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][2].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][3].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][4].split(' ').join('_')}\` INTEGER DEFAULT null, 
    \`${data[0][5].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][6].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][7].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][8].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][9].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][10].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${"Niveau_de_lactivite"}\` TEXT DEFAULT null,
    \`latitude\` TEXT,
    \`longitude\` TEXT,
    "id" INTEGER PRIMARY KEY AUTOINCREMENT
     )`;
			// noinspection RegExpSingleCharAlternation
			sqlCreateTable = sqlCreateTable.replace(new RegExp('é|è|ê|ë', 'gi'), 'e');
			sqlCreateTable = sqlCreateTable.split('\'').join('');
			sqlCreateTable = sqlCreateTable.split('\.').join('');
			db.run(sqlCreateTable, function (err) {
				if (err) {
					reject(err);
				} else {
					console.log("+++ Fiches créée");
					resolve(this);
				}
			});
		});
		fs.createReadStream(ACTIVITEFILEPATH).pipe(parser);

	});
};

/**
 * Peuple la table activité
 * @returns {Promise<>}
 */
const populateActivite = function () {
	console.log('--> Début de populate activitée');
	return new Promise(function (resolve, reject) {
		let stream = fs.createReadStream(ACTIVITEFILEPATH, {encoding: 'utf8'});
		let parser = parse({
			delimiter: ';',
			from: 2
		});

		parser.on('readable', function () {
			let element;
			// noinspection JSAssignmentUsedAsCondition
			while (element = this.read()) {
				let sqlInsertTable = `INSERT INTO ${ACTIVITETABLENAME} VALUES(
    ${element[0]},
    "${element[1]}",
    ${element[2]},
    "${element[3] === "" ? null : element[3].split('"').join('')}",
    ${element[4]},
    ${element[5]},
    ${element[6] === "" ? null : element[6]},
    "${element[7] === "" ? null : element[7].split('"').join('')}",
    "${element[8] === "Non" ? "false" : "true"}",
    "${element[9] === "Non" ? "false" : "true"}",
    "${element[10] === "Non" ? "false" : "true"}",
    "${element[11].split('"').join('')}",
    "${element[12].slice(0, 13)}",
        "${element[12].slice(15)}",
        null
     )`;
				sqlInsertTable = sqlInsertTable.split('/').join('-');
				db.run(sqlInsertTable);
			}
		});

		stream.pipe(parser);

		parser.on('finish', function () {
			console.log("<-- Populate activitée fait");
			resolve(this);
		});

		parser.on("error", (err) => {
			console.log(err);
			reject(err);
		});
	})
};

/**
 * Crée la table équipement
 * @returns {Promise<>}
 */
const createEquipementTable = function () {
	return new Promise(function (resolve, reject) {
		let parser = parse({delimiter: ';'}, function (err, data) { //4 is primary key but disable for insert because of time taking
			let sqlCreateTable = `CREATE TABLE IF NOT EXISTS ${EQUIPEMENTTABLENAME} (
    \`${data[0][0].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][1].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][2].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][3].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][4].split(' ').join('_')}\` INTEGER DEFAULT null, 
    \`${data[0][5].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][6].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${"nom_" + data[0][7].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][10].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][11].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][12].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][43].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][83].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][195].split(' ').join('_')}\` TEXT DEFAULT null,
   \`${data[0][196].split(' ').join('_')}\` TEXT DEFAULT null,
   "id" INTEGER PRIMARY KEY AUTOINCREMENT
     )`;
			// noinspection RegExpSingleCharAlternation
			sqlCreateTable = sqlCreateTable.replace(new RegExp('é|è|ê|ë', 'gi'), 'e');
			sqlCreateTable = sqlCreateTable.split('\'').join('');
			sqlCreateTable = sqlCreateTable.split('\.').join('');
			db.run(sqlCreateTable, function (err) {
				if (err) {
					reject(err);
				} else {
					console.log("+++ Equipement créée");
					resolve(this);
				}
			});
		});
		fs.createReadStream(EQUIPEMENTPATH).pipe(parser);

	});
};

/**
 * Peuple la table équipement
 * @returns {Promise<>}
 */
const populateEquipement = function () {
	console.log('--> Début de populate équipement');

	return new Promise(function (resolve, reject) {

		let stream = fs.createReadStream(EQUIPEMENTPATH, {encoding: 'utf8'});
		let parser = parse({
			delimiter: ';',
			from: 2
		});

		parser.on('readable', function () {
			let element;
			// noinspection JSAssignmentUsedAsCondition
			while (element = this.read()) {
				let sqlInsertTable = `INSERT INTO ${EQUIPEMENTTABLENAME} VALUES(
    ${element[0] === "" ? null : element[0]} ,
    "${element[1] === "" ? null : element[1]}" ,
    ${element[2] === "" ? null : element[2]} ,
    "${element[3] === "" ? null : element[3].split('"').join('')}" ,
    ${element[4] === "" ? null : element[4]} , 
    "${element[5] === "" ? null : element[5].split('"').join('')}" ,
    ${element[6] === "" ? null : element[6]} , 
    "${element[7] === "" ? null : element[7].split('"').join('')}" ,
    ${element[10] === "" ? null : element[10]} ,
    "${element[11] === "" ? null : element[11].split('"').join('')}" ,
    "${element[12] === "" ? null : element[12].split('"').join('')}" ,
    ${element[43] === "" ? null : element[43]} ,
    "${element[85] === "Non" ? "false" : "true"}" ,
    "${element[195]}" ,
    "${element[196]}",
    null
     )`; //LATITUDE LONGITUDE 195 196
				sqlInsertTable = sqlInsertTable.split('/').join('-');
				db.run(sqlInsertTable);
			}
		});

		stream.pipe(parser);

		parser.on('finish', function () {
			console.log("<-- Populate équipement fait");
			resolve(this);
		});
		parser.on("error", (err) => {
			console.log(err);
			reject(err);
		});
	})
};

/**
 * Crée la table installation
 * @returns {Promise<>}
 */
const createInstallationTable = function () {
	return new Promise(function (resolve, reject) {
		let parser = parse({delimiter: ';'}, function (err, data) { //4 is primary key but disable for insert because of time taking
			let sqlCreateTable = `CREATE TABLE IF NOT EXISTS ${INSTALLATIONTABLENAME} (
    \`${data[0][0].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][1].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][3].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][4].split(' ').join('_')}\` INTEGER DEFAULT null, 
    \`${data[0][5].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][6].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][7].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][8].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][9].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][10].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][16].split(' ').join('_')}\` TEXT DEFAULT null,
    \`${data[0][18].split(' ').join('_')}\` INTEGER DEFAULT null,
    \`${data[0][23].split(' ').join('_')}\` TEXT DEFAULT null,
   \`${data[0][24].split(' ').join('_')}\` TEXT DEFAULT null,
    "latitude",
    "longitude",
    "id" INTEGER PRIMARY KEY AUTOINCREMENT
     )`; //LATITUDE LONGITUDE 34
			// noinspection RegExpSingleCharAlternation
			sqlCreateTable = sqlCreateTable.replace(new RegExp('é|è|ê|ë', 'gi'), 'e');
			sqlCreateTable = sqlCreateTable.split('\'').join('');
			sqlCreateTable = sqlCreateTable.split('\.').join('');
			db.run(sqlCreateTable, function (err) {
				if (err) {
					reject(err);
				} else {
					console.log("+++ Installation créée");
					resolve(this);
				}
			});
		});
		fs.createReadStream(INSTALLATIONFILEPATH).pipe(parser);

	});
};

/**
 * peuple la table installation
 * @returns {Promise<>}
 */
const populateInstallation = function () {
	console.log('--> Début de populate installation');
	return new Promise(function (resolve, reject) {
		let stream = fs.createReadStream(INSTALLATIONFILEPATH, {encoding: 'utf8'});
		let parser = parse({
			delimiter: ';',
			from: 2
		});

		parser.on('readable', function () {
			let element;
			// noinspection JSAssignmentUsedAsCondition
			while (element = this.read()) {
				let sqlInsertTable = `INSERT INTO ${INSTALLATIONTABLENAME} VALUES(
    ${element[0] === "" ? null : element[0].split('"').join('')} ,
    "${element[1] === "" ? null : element[1].split('"').join('')}" ,
    "${element[3] === "" ? null : element[3].split('"').join('')}" ,
    ${element[4] === "" ? null : element[4].split('"').join('')} , 
    "${element[5] === "" ? null : element[5].split('"').join('')}" ,
    "${element[6] === "" ? null : element[6].split('"').join('')}" ,
    "${element[7] === "" ? null : element[7].split('"').join('')}" ,
    "${element[8] === "" ? null : element[8].split('"').join('')}" ,
    ${element[9] === "" ? null : element[9]} ,
    "${element[10] === "" ? null : (element[10].split('"').join('')) === "Non" ? "false" : element[10]}" ,
    "${element[16] === "Non" ? "false" : "true"}" ,
    ${element[18] === "" ? 0 : element[18]} ,
    "${element[23] === "Non" ? "false" : "true"}" ,
   "${element[24] === "Non" ? "false" : "true"}" ,
    "${element[34].slice(0, 9)}",
        "${element[34].slice(11)}",
        null
     )`;
				sqlInsertTable = sqlInsertTable.split('/').join('-');
				db.run(sqlInsertTable);
			}
		});

		stream.pipe(parser);

		parser.on('finish', function () {
			console.log("<--  Populate Installation fait");
			resolve(this);
		});

		parser.on("error", (err) => {
			console.log(err);
			reject(err);
		});
	})
};

/**
 *  Gestion du script
 */
const init = function () {
	// noinspection JSUnresolvedFunction
	console.time("Initialisation effectuée en ");
	db.serialize(() => {
		console.log("Création des tables et importation des données");
		createActiviteTable()
			.then(
				() => populateActivite()
			).then(
			() =>
				createEquipementTable() //equipement
		)
			.then(
				() => populateEquipement() //equipement
			).then(
			() =>
				createInstallationTable() //installation
		).then(
			() => populateInstallation() //installation
		).then(() => {
			console.log("Fin de l'importation");
			console.timeEnd("Initialisation effectuée en ");

		}).catch((err) => {
			console.error(err)
		});
	});
};

module.exports = {
	init: init,
	db: db
};
