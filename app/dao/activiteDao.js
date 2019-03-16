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
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13]
					, new Equipement(values[14], values[15], values[16], values[17], values[18], values[19], values[20], values[21], values[22]
						, values[23], values[24], values[25], values[26], values[27], values[28])));
			}
			return activites;
		});
	};


	/**         findBy         **/



	findByAll(departement, commune, activite, niveau, bus, tram, handicap) {
		const sqlRequest = "select a.* from activites a, Equipements e, installations i where " +
			"(a.\"Code du département\" = $departement OR $departement IS NULL) and (a.\"Nom de la commune\" like $commune OR $commune IS NULL) and " +
			"(a.\"Activité libellé\" = $activite OR $activite IS NULL) and (a.\"Niveau de l activité - Classif.\" = $niveau OR $niveau IS NULL) and " +
			"a.\"Numéro de la fiche équipement\" = e.\"Numéro de la fiche équipement\" and e.\"Numéro de l installation\" = i.\"Numéro de l installation\" and " +
			"(i.\"Desserte bus\" = $bus OR $bus IS NULL) and (i.\"Desserte Tram\" = $tram OR $tram IS NULL) and (i.\"Accessibilité handicapés à mobilité réduite\" = $handicap OR $handicap IS NULL) ;";

		const sqlParams = {
			$departement: departement !== 'null' ? departement : null,
			$commune: commune !== 'null' ? commune : null,
			$activite: activite !== 'null' ? activite : null,
			$niveau: niveau !== 'null' ? niveau : null,
			$bus: bus !== 'null' ? bus : null,
			$tram: tram !== 'null' ? tram : null,
			$handicap: handicap !== 'null' ? handicap : null
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let activites = [];

			for (const row of rows) {
				let values = Object.values(row);
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13]));
			}
			return activites;
		});
	}

	findById(id) {
		const sqlRequest = "select * from activites where \"Activité code\" = $id";
		const sqlParams = {
			$id: id
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let activites = [];

			for (const row of rows) {
				let values = Object.values(row);
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13]));
			}

			return activites;
		});
	}


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
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13]
					, new Equipement(values[14], values[15], values[16], values[17], values[18], values[19], values[20], values[21], values[22]
						, values[23], values[24], values[25], values[26], values[27], values[28])));
			}

			return activites;
		});
	}

	findByCoordonnees(latitude, longitude, rayon) {
		const sqlRequest = "SELECT *,  111.045* DEGREES(ACOS(COS(RADIANS($latitude)) " +
			"                 * COS(RADIANS(latitute)) " +
			"                 * COS(RADIANS($longitude) - RADIANS(longitude)) " +
			"                 + SIN(RADIANS($latitude)) " +
			"                 * SIN(RADIANS(latitute)))) as distance " +
			"FROM activites where ( 111.045* DEGREES(ACOS(COS(RADIANS($latitude)) " +
			"                 * COS(RADIANS(latitute)) " +
			"                 * COS(RADIANS($longitude) - RADIANS(longitude)) " +
			"                 + SIN(RADIANS($latitude)) " +
			"                 * SIN(RADIANS(latitute))))) < $rayon " +
			"order by distance;";
		const sqlParams = {
			$latitude: latitude,
			$longitude: longitude,
			$rayon: rayon
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let activites = [];

			for (const row of rows) {
				let values = Object.values(row);
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13]));
			}

			return activites;
		});

	}


	/**         listOf         **/


	listOfNomDepartement(value) {
		const sqlRequest = "select distinct \"Libellé du département\" from activites where \"Libellé du département\" like $value";
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

	listOfNomCommuneByDepartement(value) {
		const sqlRequest = "select distinct \"Nom de la commune\" from activites where \"Code du département\" like $value";
		const sqlParams = {
			$value: value
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom de la commune"]);
			}
			return noms;
		});
	}

	listOfNomCommune(value) {
		const sqlRequest = "select distinct \"Nom de la commune\" from activites where \"Nom de la commune\" like $value";
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

	listOfCodeDepartment() {
		const sqlRequest = "select distinct \"Code du département\" from activites";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Code du département"]);
			}
			return noms;
		});
	}

	listOfNomActivite() {
		const sqlRequest = "select distinct \"Activité libellé\", \"Activité code\" from activites";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push({nom: row["Activité libellé"], code: row["Activité code"]});
			}
			return noms;
		});
	}

	listOfNiveauActivite() {
		const sqlRequest = "select distinct \"Niveau de l activité - Classif.\" from activites";

		return this.common.findAll(sqlRequest).then(rows => {
			let niveaux = [];
			for (const row of rows) {
				if (row["Niveau de l activité - Classif."] !== "")
					niveaux.push(row["Niveau de l activité - Classif."]);
			}
			return niveaux;
		});
	}


}

module.exports = ActiviteDao;