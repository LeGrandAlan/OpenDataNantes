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
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	};


	/**         findBy         **/


	findByAll(departement, commune, nomInstallation, installationParticuliere, bus, tram, handicap) {
		const sqlRequest = "select * from installations where " +
			"(Code_du_departement = $departement OR $departement IS NULL) and (Nom_de_la_commune = $commune OR $commune IS NULL) and " +
			"(Nom_usuel_de_linstallation like $nomInstallation OR $nomInstallation IS NULL) and " +
			"(Installation_particuliere like $installatlionParticuliere OR $installatlionParticuliere IS NULL) and " +
			"(Desserte_bus = $bus OR $bus IS NULL) and (Desserte_Tram = $tram OR $tram IS NULL) and " +
			"(Accessibilite_handicapes_à_mobilite_reduite = $handicap OR $handicap IS NULL) ;";

		const sqlParams = {
			$departement: departement !== 'null' ? departement : null,
			$commune: commune !== 'null' ? commune : null,
			$nomInstallation: nomInstallation !== 'null' ? "%" + nomInstallation + "%" : null,
			$installatlionParticuliere: installationParticuliere !== 'null' ? installationParticuliere : null,
			$bus: bus !== 'null' ? bus : null,
			$tram: tram !== 'null' ? tram : null,
			$handicap: handicap !== 'null' ? handicap : null
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}
			return installations;
		});
	}

	findById(id) {
		const sqlRequest = "select * from installations where id = $id";
		const sqlParams = {
			$id: id
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
				let installations = [];

				for (const row of rows) {
					let values = Object.values(row);
					installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
						, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
				}
				return installations;
			}
		);

	}


	findByCodeDepartement(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Code_du_departement LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
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
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}

	findByNomCommune(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Nom_de_la_commune LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}

	findByNumeroInstallation(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Numero_de_linstallation = $value";
		const sqlParams = {
			$value: value
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}

	findByNomInstallation(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Nom_usuel_de_linstallation LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}

	findByCodePostal(codePostal) {
		const sqlRequest = "SELECT * FROM installations WHERE Code_postal LIKE $codePostal";
		const sqlParams = {
			$codePostal: "%" + codePostal + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}

	findByInstallationParticuliere(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Installation_particuliere LIKE $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}

	findByAccessibiliteHandicapes(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Accessibilite_handicapes_à_mobilite_reduite = $value";
		const sqlParams = {
			$value: value
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}

	findByDesserteBus(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Desserte_bus = $value";
		const sqlParams = {
			$value: value
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}


	findByDesserteTram(value) {
		const sqlRequest = "SELECT * FROM installations WHERE Desserte_Tram = $value";
		const sqlParams = {
			$value: value
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let installations = [];

			for (const row of rows) {
				let values = Object.values(row);
				installations.push(new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}

			return installations;
		});
	}


	findByCoordonnees(latitude, longitude, rayon) {
		const sqlRequest = "SELECT *,  111.045* DEGREES(ACOS(COS(RADIANS($latitude)) " +
			"                 * COS(RADIANS(latitude)) " +
			"                 * COS(RADIANS($longitude) - RADIANS(longitude)) " +
			"                 + SIN(RADIANS($latitude)) " +
			"                 * SIN(RADIANS(latitude)))) as distance " +
			"FROM installations where ( 111.045* DEGREES(ACOS(COS(RADIANS($latitude)) " +
			"                 * COS(RADIANS(latitude)) " +
			"                 * COS(RADIANS($longitude) - RADIANS(longitude)) " +
			"                 + SIN(RADIANS($latitude)) " +
			"                 * SIN(RADIANS(latitude))))) < $rayon " +
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
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}
			return installations;
		});

	}



	/**         listOf         **/



	listOfNomDepartement(value) {
		const sqlRequest = "select distinct Departement from installations where Departement like $value";
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
		const sqlRequest = "select distinct Nom_de_la_commune from installations";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom_de_la_commune"]);
			}
			return noms;
		});
	}

	listOfNomCommune(value) {
		const sqlRequest = "select distinct Nom_de_la_commune from installations where Nom_de_la_commune like $value";
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

	listOfNomCommuneByDepartement(value) {
		const sqlRequest = "select distinct Nom_de_la_commune from installations where Code_du_departement like $value";
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


	listOfNomsInstallations() {
		const sqlRequest = "select distinct Nom_usuel_de_linstallation from installations";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom_usuel_de_linstallation"]);
			}
			return noms;
		});
	}

	listOfNomInstallation(value) {
		const sqlRequest = "select distinct Nom_usuel_de_linstallation from installations where Nom_usuel_de_linstallation like $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom_usuel_de_linstallation"]);
			}
			return noms;
		});
	}

	listOfInstallationsParticulieres() {
		const sqlRequest = "select distinct Installation_particuliere from installations";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Installation_particuliere"]);
			}
			return noms;
		});
	}

	listOfInstallationParticuliere(value) {
		const sqlRequest = "select distinct Installation_particuliere from installations where Installation_particulierelike $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Installation_particuliere"]);
			}
			return noms;
		});
	}

	listOfCodesPostaux() {
		const sqlRequest = "select distinct Code_postal from installations";

		return this.common.findAll(sqlRequest).then(rows => {
			let codePostaux = [];
			for (const row of rows) {
				codePostaux.push(row["Code_postal"]);
			}
			return codePostaux;
		});
	}

	listOfCodePostal(value) {
		const sqlRequest = "select distinct Code_postal from installations where Code_postal like $value";
		const sqlParams = {
			$value: value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Code_postal"]);
			}
			return noms;
		});
	}


}

module.exports = InstallationDao;