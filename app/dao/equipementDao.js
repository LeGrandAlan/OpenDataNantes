"use strict";
/* Load Equipement entity */
const Equipement = require('../model/equipement');
/* Load Installation entity */
const Installation = require('../model/installation');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Car Data Access Object
 */
class EquipementDao {

	constructor() {
		this.common = new daoCommon();
	}

	/**
	 * Finds all entities.
	 * @return {Promise} all entities
	 */
	findAll() {
		const sqlRequest = "SELECT * FROM Equipements inner join installations on Equipements.\"Numéro de l installation\" = installations.\"Numéro de l installation\";";

		return this.common.findAll(sqlRequest).then(rows => {

			let equipements = [];

			for (const row of rows) {
				console.log(row);
				let values = Object.values(row);
				console.log(values);
				equipements.push(new Equipement(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]
					, new Installation(values[16], values[17], values[18], values[19], values[20], values[21], values[22]
						, values[23], values[24], values[25], values[26], values[27], values[28], values[29], values[30], values[31])));

			}

			return equipements;
		});
	};


	/**         findBy         **/


	findByAll(departement, commune, nomEquipement, typeEquipement, buvette, bus, tram, handicap) {
		const sqlRequest = "select e.* from Equipements e, installations i where " +
			"(e.\"Code departement\" = $departement OR $departement IS NULL) and (e.Commune = $commune OR $commune IS NULL) and " +
			"(e.Equipement = $nomEquipement OR $nomEquipement IS NULL) and (e.\"Type d équipement\" = $typeEquipement OR $typeEquipement IS NULL) and " +
			"(e.\"Accueil buvette\" = $buvette OR $buvette IS NULL) and " +
			"e.\"Numéro de l installation\" = i.\"Numéro de l installation\" and " +
			"(i.\"Desserte bus\" = $bus OR $bus IS NULL) and (i.\"Desserte Tram\" = $tram OR $tram IS NULL) and (i.\"Accessibilité handicapés à mobilité réduite\" = $handicap OR $handicap IS NULL) ;";

		const sqlParams = {
			$departement: departement !== 'null' ? departement : null,
			$commune: commune !== 'null' ? commune : null,
			$nomEquipement: nomEquipement !== 'null' ? nomEquipement : null,
			$typeEquipement: typeEquipement !== 'null' ? typeEquipement : null,
			$buvette: buvette !== 'null' ? buvette : null,
			$bus: bus !== 'null' ? bus : null,
			$tram: tram !== 'null' ? tram : null,
			$handicap: handicap !== 'null' ? handicap : null
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let equipements = [];

			for (const row of rows) {
				let values = Object.values(row);
				equipements.push(new Equipement(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}
			return equipements;
		});
	}


	findByNoDeLInstallation(noDeLInstallation) {
		const sqlRequest = "select numero_de_la_fiche_equipement, " +
			"installation.numero_de_l_installation, installation.nom_usuel_de_l_installation, " +
			"installation.nom_de_la_commune, installation.code_postal " +
			"from equipement " +
			"inner join installation on installation.numero_de_l_installation=equipement.numero_de_l_installation " +
			"where installation.numero_de_l_installation = $noDeLInstallation";
		const sqlParams = {
			$noDeLInstallation: noDeLInstallation
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let equipements = [];

			for (const row of rows) {
				equipements.push(new Equipement(row.numero_de_la_fiche_equipement,
					new Installation(row.numero_de_l_installation, row.nom_usuel_de_l_installation, row.code_postal, row.nom_de_la_commune)));

			}

			return equipements;
		});
	}

	findByCoordonnees(latitude, longitude, rayon) {
		const sqlRequest = "SELECT *,  111.045* DEGREES(ACOS(COS(RADIANS($latitude)) " +
			"                 * COS(RADIANS(latitute)) " +
			"                 * COS(RADIANS($longitude) - RADIANS(longitude)) " +
			"                 + SIN(RADIANS($latitude)) " +
			"                 * SIN(RADIANS(latitute)))) as distance " +
			"FROM Equipements where ( 111.045* DEGREES(ACOS(COS(RADIANS($latitude)) " +
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
			let equipements = [];

			for (const row of rows) {
				let values = Object.values(row);
				equipements.push(new Equipement(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}
			return equipements;
		});

	}


	/**         listOf         **/


	listOfNomDepartement(value) {
		const sqlRequest = "select distinct Departement from Equipements where Departement like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Departement"]);
			}
			return noms;
		});
	}

	listOfNomsCommunes() {
		const sqlRequest = "select distinct Commune from Equipements";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Commune"]);
			}
			return noms;
		});
	}

	listOfNomCommune(value) {
		const sqlRequest = "select distinct Commune from Equipements where Commune like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Commune"]);
			}
			return noms;
		});
	}

	listOfNomsEquipements() {
		const sqlRequest = "select distinct Equipement from Equipements";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Equipement"]);
			}
			return noms;
		});
	}

	listOfNomEquipement(value) {
		const sqlRequest = "select distinct Equipement from Equipements where Equipement like $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Equipement"]);
			}
			return noms;
		});
	}

	listOfTypesEquipements() {
		const sqlRequest = "select distinct \"Type d équipement\" from Equipements";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Type d équipement"]);
			}
			return noms;
		});
	}

	listOfTypeEquipement(value) {
		const sqlRequest = "select distinct \"Type d équipement\" from Equipements where \"Type d équipement\" like $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Type d équipement"]);
			}
			return noms;
		});
	}


}

module.exports = EquipementDao;