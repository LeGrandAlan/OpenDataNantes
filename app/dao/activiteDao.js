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
		const sqlRequest = "select * from activites inner join Equipements on activites.Numero_de_la_fiche_equipement = Equipements.Numero_de_la_fiche_equipement;";

		return this.common.findAll(sqlRequest).then(rows => {

			let activites = [];

			for (const row of rows) {
				let values = Object.values(row);
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14]
					, new Equipement(values[15], values[16], values[17], values[18], values[19], values[20], values[21], values[22]
						, values[23], values[24], values[25], values[26], values[27], values[28], values[29])));
			}
			return activites;
		});
	};


	/**         findBy         **/



	findByAll(departement, commune, activite, niveau, bus, tram, handicap) {
		const sqlRequest = "select a.* from activites a, Equipements e, installations i where " +
			"(a.Code_du_departement = $departement OR $departement IS NULL) and (a.Nom_de_la_commune like $commune OR $commune IS NULL) and " +
			"(a.Activite_libelle = $activite OR $activite IS NULL) and (a.\"Niveau_de_l-activite_-_Classif.\" = $niveau OR $niveau IS NULL) and " +
			"a.Numero_de_la_fiche_equipement = e.Numero_de_la_fiche_equipement and e.\"Numero_de_l-installation\" = i.\"Numero_de_l-installation\" and " +
			"(i.Desserte_bus = $bus OR $bus IS NULL) and (i.Desserte_Tram = $tram OR $tram IS NULL) and (i.Accessibilite_handicapes_à_mobilite_reduite = $handicap OR $handicap IS NULL) ;";

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
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14]));
			}
			return activites;
		});
	}

	findById(id) {
		const sqlRequest = "select * from activites where id = $id";
		const sqlParams = {
			$id: id
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let activites = [];
			console.log(rows);
			for (const row of rows) {
				let values = Object.values(row);
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14]));
			}

			return activites;
		});
	}

	findByNoEquipement(value) {
		const sqlRequest = "select * from activites inner join Equipements on activites.Numero_de_la_fiche_equipement = Equipements.Numero_de_la_fiche_equipement " +
			"where Equipements.Numero_de_la_fiche_equipement = $value;";
		const sqlParams = {
			$value: value
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let activites = [];

			for (const row of rows) {
				let values = Object.values(row);
				activites.push(new Activite(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14]
					, new Equipement(values[15], values[16], values[17], values[18], values[19], values[20], values[21], values[22]
						, values[23], values[24], values[25], values[26], values[27], values[28], values[29])));
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
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14]));
			}

			return activites;
		});

	}


	/**         listOf         **/


	listOfNomDepartement(value) {
		const sqlRequest = "select distinct Libelle_du_departement from activites where Libelle_du_departement like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Libelle_du_departement"]);
			}
			return noms;
		});
	}

	listOfNomCommuneByDepartement(value) {
		const sqlRequest = "select distinct Nom_de_la_commune from activites where Code_du_departement like $value";
		const sqlParams = {
			$value: value
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom_de_la_commune"]);
			}
			return noms;
		});
	}

	listOfNomCommune(value) {
		const sqlRequest = "select distinct Nom_de_la_commune from activites where Nom_de_la_commune like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom_de_la_commune"]);
			}
			return noms;
		});
	}

	listOfCodeDepartment() {
		const sqlRequest = "select distinct Code_du_departement from activites";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Code_du_departement"]);
			}
			return noms;
		});
	}

	listOfNomActivite() {
		const sqlRequest = "select distinct Activite_libelle, Activite_code from activites";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push({nom: row["Activite_libelle"], code: row["Activite_code"]});
			}
			return noms;
		});
	}

	listOfNiveauActivite() {
		const sqlRequest = "select distinct \"Niveau_de_l-activite_-_Classif.\" from activites";

		return this.common.findAll(sqlRequest).then(rows => {
			let niveaux = [];
			for (const row of rows) {
				if (row["Niveau_de_l-activite_-_Classif."] !== "")
					niveaux.push(row["Niveau_de_l-activite_-_Classif."]);
			}
			return niveaux;
		});
	}


}

module.exports = ActiviteDao;