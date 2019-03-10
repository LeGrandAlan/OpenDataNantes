"use strict";
/* Load Activite entity */
const Activite = require('../model/activite');
const Equipement = require('../model/equipement');
const Installation = require('../model/installation');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Activite Data Access Object
 */
class ActiviteDao {

	constructor() {
		this.common = new daoCommon();
	}


	/**
	 * Finds all entities.
	 * @return {Promise} all entities
	 */
	findAll() {
		const sqlRequest = "select * from activites inner join Equipements on activites.\"Numéro de la fiche équipement\" = Equipements.\"Numéro de la fiche équipement\";";

		return this.common.findAll(sqlRequest).then(rows => {

			let activites = [];

			for (const row of rows) {
				let values = Object.values(row);
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13]
					, new Equipement(values[14], values[15], values[16], values[17], values[18], values[19], values[20], values[21], values[22]
						, values[23], values[24], values[25], values[26], values[27], values[28])));
			}
			return activites;
		});
	};

	findByCodePostal(codePostal) {
		const sqlRequest = "select activites.activite_code, activites.activite_libelle, " +
			"Equipements.numero_de_la_fiche_equipement," +
			"installations.numero_de_l_installation, installations.nom_usuel_de_l_installation, installations.nom_de_la_commune, installations.code_postal " +
			"from activites " +
			"inner join Equipements on Equipements.numero_de_la_fiche_equipement = activites.numero_de_la_fiche_equipement " +
			"inner join installations on installations.numero_de_l_installation = Equipements.numero_de_l_installation " +
			"where installations.code_postal = $codePostal";

		const sqlParams = {
			$codePostal: codePostal
		};


		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let activites = [];

			for (const row of rows) {

				activites.push(
					new Activite(row.activite_code, row.activite_libelle,
						new Equipement(row.numero_de_la_fiche_equipement,
							new Installation(row.numero_de_l_installation, row.nom_usuel_de_l_installation, row.code_postal, row.nom_de_la_commune))));

			}
			return activites;
		});
	}


	findByNoEquipement(value) {
		const sqlRequest = "select * from activites inner join Equipements on activites.\"Numéro de la fiche équipement\" = Equipements.\"Numéro de la fiche équipement\" " +
			"where Equipements.\"Numéro de la fiche équipement\" = $value;";
		const sqlParams = {
			$value: value
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let activites = [];

			for (const row of rows) {
				let values = Object.values(row);
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13]
					, new Equipement(values[14], values[15], values[16], values[17], values[18], values[19], values[20], values[21], values[22]
						, values[23], values[24], values[25], values[26], values[27], values[28])));
			}

			return activites;
		});
	}


	listOfNomDepartement(value) {
		const sqlRequest = "select distinct activites.\"Libellé du département\" from activites where activites.\"Libellé du département\" like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Libellé du département"]);
			}
			return noms;
		});
	}

	listOfNomCommune(value) {
		const sqlRequest = "select distinct activites.\"Nom de la commune\" from activites where activites.\"Nom de la commune\" like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom de la commune"]);
			}
			return noms;
		});
	}

	listOfNomActivite(value) {
		const sqlRequest = "select distinct activites.\"Activité libellé\" from activites where activites.\"Activité libellé\" like $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				let current = row["Activité libellé"].split(" / ");
				current.forEach((nom) => {
					if (nom.length !== 0 && nom.match("([" + value + "])\\w+"))
						noms.push(nom);
				});
			}
			return noms;
		});
	}

	listOfNiveauActivite() {
		const sqlRequest = "select distinct activites.\"Niveau de l activité - Classif.\" from activites";

		return this.common.findAll(sqlRequest).then(rows => {

			let niveaux = [];

			for (const row of rows) {
				let current = row["Niveau de l activité - Classif."].split(" - ");

				current.forEach((niveau) => {
					if (niveau.length !== 0)
						niveaux.push(niveau);
				});
			}
			return niveaux;
		});
	}


}

module.exports = ActiviteDao;