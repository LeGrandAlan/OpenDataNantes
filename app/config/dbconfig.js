/* Load modules */
let sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv');
const parse = require('csv-parse');
const path = require('path');

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
const db = new sqlite3.Database('les_activites_dans_une_commune.db');
//const db = new sqlite3.Database(':memory:');

//Activation des contraintes d'intégrté
db.get("PRAGMA foreign_keys = ON")



const createInstallation = function() {
    return new Promise(function (resolve, reject) {
        const sqlRequest = "CREATE TABLE IF NOT EXISTS installation (" +
            "numero_de_l_installation TEXT NOT NULL, " +
            "nom_usuel_de_l_installation TEXT NOT NULL, " +
            "code_postal TEXT NOT NULL, " +
            "nom_de_la_commune TEXT NOT NULL, " +
            "PRIMARY KEY (numero_de_l_installation))";

        db.run(sqlRequest,[], (err) => {

            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log("Installation créée");
                resolve(this);
            }
        });

    })
};

const createEquipement = function() {
    return new Promise(function (resolve, reject) {
        const sqlRequest = "CREATE TABLE IF NOT EXISTS equipement (" +
            "numero_de_la_fiche_equipement TEXT NOT NULL," +
            "numero_de_l_installation TEXT NOT NULL," +
            "PRIMARY KEY (numero_de_la_fiche_equipement)," +
            "FOREIGN KEY (numero_de_l_installation) REFERENCES installation(numero_de_l_installation))";

        db.run(sqlRequest, [], (err) => {

            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log("Equipement créée");
                resolve(this);
            }

        });

    });
};
const createActivite = function () {
    return new Promise(function (resolve, reject) {
        const sqlRequest = "CREATE TABLE IF NOT EXISTS activite (" +
            "activite_code TEXT NOT NULL," +
            "activite_libelle TEXT NOT NULL," +
            "numero_de_la_fiche_equipement TEXT NOT NULL," +
            "PRIMARY KEY (activite_code, numero_de_la_fiche_equipement)," +
            "FOREIGN KEY (numero_de_la_fiche_equipement) REFERENCES equipement(numero_de_la_fiche_equipement))";
        db.run(sqlRequest, [], (err) => {

            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log("Activité créée");
                resolve(this);
            }
        });

    });
};

const populateInstallation =  function() {
    return new Promise(function (resolve, reject) {
        const fileName = 'data/234400034_004-010_fiches-installations-rpdl_extra_small.csv';
        const stream = fs.createReadStream(fileName, {encoding: 'utf8'});


        const parser = parse({
            delimiter: ';',
            columns: header =>
                header.map( column => column.normalize('NFD').
                    replace(/[\u0300-\u036f]/g, "").
                    replace(/[^a-z0-9]/gmi, "_").
                    replace(/\s+/g, '_').
                    toLowerCase())
        });


        parser.on('readable', function () {
            let row;

            while (row = this.read()) {
                    const sqlRequest = "INSERT OR IGNORE into installation (numero_de_l_installation, nom_usuel_de_l_installation, code_postal, nom_de_la_commune) " +
                        "VALUES ($noDeLInstallation, $nomUsuelDeLInstallation, $codePostal, $nomDeLaCommune)";
                    const sqlParams = {
                        $noDeLInstallation: row.numero_de_l_installation,
                        $nomUsuelDeLInstallation: row.nom_usuel_de_l_installation,
                        $codePostal: String(row.code_postal),
                        $nomDeLaCommune: String(row.nom_de_la_commune)

                    };


                    db.run(sqlRequest, sqlParams, function (err) {
                        if (err)
                            console.log(err);
                    });

            }
        });


        stream.pipe(parser);

        parser.on('finish', function ()  {
            console.log("Installations importées");
            resolve(this);

        });

        parser.on("error", (err) =>{
            console.log(err);
            reject(err);
        });

    })
}

const populateEquipement =  function() {
    return new Promise(function (resolve, reject) {
        const fileName = 'data/234400034_004-011_fiches-equipements-rpdl_extra_small.csv';
        const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

        const parser = parse({
            delimiter: ';',
            columns: header =>
                header.map( column => column.normalize('NFD').
                replace(/[\u0300-\u036f]/g, "").
                replace(/[^a-z0-9]/gmi, "_").
                replace(/\s+/g, '_').
                toLowerCase())
        });

        parser.on('readable', function () {
            let row;

            while (row = this.read()) {
                const sqlRequest = "INSERT OR IGNORE into equipement (numero_de_la_fiche_equipement, numero_de_l_installation) " +
                    "VALUES ($numeroDeLaFicheEquipement, $numeroDeLInstallation)";
                const sqlParams = {
                    $numeroDeLaFicheEquipement: row.numero_de_la_fiche_equipement,
                    $numeroDeLInstallation: row.numero_de_l_installation


                };

                db.run(sqlRequest, sqlParams, function (err) {
                    if (err)
                        console.log(err);
                });
            }
        });


        stream.pipe(parser);

        parser.on('finish', function ()  {
            console.log("Equipements importés");
            resolve(this);

        });

        parser.on("error", (err) =>{
            console.log(err);
            reject(err);
        });

    })
}

const populateActivite =  function() {
    return new Promise(function (resolve, reject) {
        const fileName = 'data/234400034_004-009_activites-des-fiches-equipements-rpdl_extra_small.csv';
        const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

        const parser = parse({
            delimiter: ';',
            columns: header =>
                header.map( column => column.normalize('NFD').
                replace(/[\u0300-\u036f]/g, "").
                replace(/[^a-z0-9]/gmi, "_").
                replace(/\s+/g, '_').
                toLowerCase())
        });

        parser.on('readable', function () {
            let row;

            while (row = this.read()) {
                const sqlRequest = "INSERT OR IGNORE into activite(activite_code, activite_libelle, numero_de_la_fiche_equipement) " +
                    "VALUES ($activiteCode, $activiteLibelle, $numeroDeLaFicheEquipement)";
                const sqlParams = {
                    $activiteCode: row.activite_code,
                    $activiteLibelle: row.activite_libelle,
                    $numeroDeLaFicheEquipement : row.numero_de_la_fiche_equipement
                };


               db.run(sqlRequest, sqlParams, function (err) {
                    if (err) {
                        console.log(err);
                        console.log(sqlRequest, sqlParams.$activiteCode, sqlParams.$activiteLibelle, sqlParams.$numeroDeLaFicheEquipement);
                    }
                });
            }
        });


        stream.pipe(parser);

        parser.on('finish', function ()  {
            console.log("Activités importées");
            resolve(this);

        });

        parser.on("error", (err) =>{
            console.log(err);
            reject(err);
        });

    })
}
const init = function() {
    db.serialize(() => {
        console.log("Création des tables et importation des données");
        createInstallation().
        then(
            ()=>createEquipement()
        ).then(
            ()=>createActivite()
        ).then(
            ()=>populateInstallation()
        ).then(
            ()=>populateEquipement()
        ).then(
            ()=>populateActivite()
        ).catch((err)=>console.log(err));
    });


};
/* Init car and driver tables if they don't exist */




module.exports = {
    init: init,
    db: db
};

