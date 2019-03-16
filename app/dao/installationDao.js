"use strict";
/* Load Car entity */
const Installation = require('../model/installation');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Car Data Access Object
 */
class InstallationDao {

	constructor() {
		this.common = new daoCommon();
	}

	/**
	 * Finds all entities.
	 * @return {Promise} all entities
	 */
	findAll() {
		const sqlRequest = "SELECT * FROM installations";

		return this.common.findAll(sqlRequest).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	};


	/**         findBy         **/


	findByAll(departement, commune, nomInstallation, codePostal, installationParticuliere, bus, tram, handicap) {
		const sqlRequest = "select i.* from installations where " +
			"(\"Code du département\" = $departement OR $departement IS NULL) and (a.\"Nom de la commune\" = $commune OR $commune IS NULL) and " +
			"(\"Code postal\" = $codePostal OR $codePostal IS NULL) and (a.\"Installation particulière\" = $instalatlionParticuliere OR $instalatlionParticuliere IS NULL) and " +
			"(\"Desserte bus\" = $bus OR $bus IS NULL) and (\"Desserte Tram\" = $tram OR $tram IS NULL) and (\"Nom usuel de l installation\" = $nomInstallation OR $nomInstallation IS NULL) and" +
			" (\"Accessibilité handicapés à mobilité réduite\" = $handicap OR $handicap IS NULL) ;";

		const sqlParams = {
			$departement: departement !== 'null' ? departement : null,
			$commune: commune !== 'null' ? commune : null,
			$nomInstallation: nomInstallation !== 'null' ? nomInstallation : null,
			$codePostal: codePostal !== 'null' ? codePostal : null,
			$instalatlionParticuliere: installationParticuliere !== 'null' ? installationParticuliere : null,
			$bus: bus !== 'null' ? bus : null,
			$tram: tram !== 'null' ? tram : null,
			$handicap: handicap !== 'null' ? handicap : null
		};

		console.log(sqlParams);
		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}
			return installations;
		});
	}

	findByCodeDepartement(value) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Code du département\" LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}

	findByDepartement(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Département LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}

	findByNomCommune(value) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Nom de la commune\" LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}

	findByNumeroInstallation(value) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Numéro de l installation\" LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}

	findByNomInstallation(value) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Nom usuel de l installation\" LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}

	findByCodePostal(codePostal) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Code postal\" LIKE $codePostal";
		const sqlParams = {
			$codePostal: "%" + codePostal + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}

	findByInstallationParticuliere(value) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Installation particulière\" LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}

	findByAccessibiliteHandicapes(value) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Accessibilité handicapés à mobilité réduite\" LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}

	findByDesserteBus(value) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Desserte bus\" LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}


	findByDesserteTram(value) {
		const sqlRequest = "SELECT * FROM installations WHERE \"Desserte Tram\" LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}

			return installations;
		});
	}


	findByCoordonnees(latitude, longitude, rayon) {
		const sqlRequest = "SELECT *,  111.045* DEGREES(ACOS(COS(RADIANS($latitude)) " +
			"                 * COS(RADIANS(latitute)) " +
			"                 * COS(RADIANS($longitude) - RADIANS(longitude)) " +
			"                 + SIN(RADIANS($latitude)) " +
			"                 * SIN(RADIANS(latitute)))) as distance " +
			"FROM installations where ( 111.045* DEGREES(ACOS(COS(RADIANS($latitude)) " +
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
			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
			}
			return installations;
		});

	}


	/**         listOf         **/



	listOfNomDepartement(value) {
		const sqlRequest = "select distinct Département from installations where Département like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Département"]);
			}
			return noms;
		});
	}

	listOfNomsCommunes() {
		const sqlRequest = "select distinct \"Nom de la commune\" from installations";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom de la commune"]);
			}
			return noms;
		});
	}

	listOfNomCommune(value) {
		const sqlRequest = "select distinct \"Nom de la commune\" from installations where \"Nom de la commune\" like $value";
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

	listOfNomsInstallations() {
		const sqlRequest = "select distinct \"Nom usuel de l installation\" from installations";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom usuel de l installation"]);
			}
			return noms;
		});
	}

	listOfNomInstallation(value) {
		const sqlRequest = "select distinct \"Nom usuel de l installation\" from installations where \"Nom usuel de l installation\" like $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom usuel de l installation"]);
			}
			return noms;
		});
	}

	listOfInstallationsParticulieres() {
		const sqlRequest = "select distinct \"Installation particulière\" from installations";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom usuel de l installation"]);
			}
			return noms;
		});
	}

	listOfInstallationParticuliere(value) {
		const sqlRequest = "select distinct \"Installation particulière\" from installations where \"Installation particulière\" like $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom usuel de l installation"]);
			}
			return noms;
		});
	}

	listOfCodesPostaux() {
		const sqlRequest = "select distinct \"Code postal\" from installations";

		return this.common.findAll(sqlRequest).then(rows => {
			let codePostaux = [];
			for (const row of rows) {
				codePostaux.push(row["Code postal"]);
			}
			return codePostaux;
		});
	}

	listOfCodePostal(value) {
		const sqlRequest = "select distinct \"Code postal\" from installations where \"Code postal\" like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Code postal"]);
			}
			return noms;
		});
	}


}

module.exports = InstallationDao;