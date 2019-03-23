"use strict";
/* Load Car entity */
const Installation = require('../model/installation');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');
const DaoError = require('./commons/daoError');

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
		const sqlRequest = "select * from installations";

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
		const sqlRequest =
			"select * " +
			"from installations " +
			"where (Code_du_departement = $departement OR $departement IS NULL)" +
			"  and (Nom_de_la_commune = $commune OR $commune IS NULL)" +
			"  and (Nom_usuel_de_linstallation like $nomInstallation OR $nomInstallation IS NULL)" +
			"  and (Installation_particuliere like $installatlionParticuliere OR $installatlionParticuliere IS NULL)" +
			"  and (Desserte_bus = $bus OR $bus IS NULL)" +
			"  and (Desserte_Tram = $tram OR $tram IS NULL)" +
			"  and (Accessibilite_handicapes_à_mobilite_reduite = $handicap OR $handicap IS NULL) ;";

		const sqlParams = {
			$departement: departement !== 'null' ? departement : null,
			$commune: commune !== 'null' ? commune : null,
			$nomInstallation: nomInstallation !== 'null' ? "%" + nomInstallation + "%" : null,
			$installatlionParticuliere: installationParticuliere !== 'null' ? installationParticuliere : null,
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
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]));
			}
			return installations;
		});
	}

	findByAllAndCoordonnees(latitude, longitude, rayon, nomInstallation, installationParticuliere, bus, tram, handicap) {
		const sqlRequest =
			"select * " +
			"from installations " +
			"where (Nom_usuel_de_linstallation like $nomInstallation OR $nomInstallation IS NULL) " +
			"  and (Installation_particuliere like $installatlionParticuliere OR $installatlionParticuliere IS NULL) " +
			"  and (Desserte_bus = $bus OR $bus IS NULL) " +
			"  and (Desserte_Tram = $tram OR $tram IS NULL) " +
			"  and (Accessibilite_handicapes_à_mobilite_reduite = $handicap OR $handicap IS NULL) " +
			"  and cast(latitude as reel) > $latitudeMin " +
			"  and cast(latitude as reel) < $latitudeMax " +
			"  and cast(longitude as reel) > $longitudeMin " +
			"  and cast(longitude as reel) < $longitudeMax;";

		latitude = Number(latitude);
		longitude = Number(longitude);
		rayon = Number(rayon) * 1000;
		if (typeof (Number.prototype.toRad) === "undefined") {
			Number.prototype.toRad = function () {
				return this * Math.PI / 180;
			}
		}
		const distance = (lon1, lat1, lon2, lat2) => {
			let R = 6371;
			let dLat = (lat2 - lat1).toRad();
			let dLon = (lon2 - lon1).toRad();
			let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
				Math.sin(dLon / 2) * Math.sin(dLon / 2);
			let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

			return R * c;
		};
		const sqlParams = {
			$latitudeMin: latitude - (rayon / 110754),
			$latitudeMax: latitude + (rayon / 110754),
			$longitudeMin: longitude - Math.abs(rayon / (111132.954 * Math.cos(latitude))),
			$longitudeMax: longitude + Math.abs(rayon / (111132.954 * Math.cos(latitude))),
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
				installations.push({
					installation: new Installation(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
						, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]),
					distance: distance(latitude, longitude, Number(values[14]), Number(values[15]))
				});
			}

			installations.sort((a, b) => {
				return a.distance - b.distance;
			});
			installations = installations.filter((value) => {
				return value.distance <= (rayon / 1000);
			});
			return installations.length > 0 ? installations : new DaoError(21, "Entity not found");
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
		const sqlRequest = "select * from installations where Code_du_departement LIKE $value";
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
		const sqlRequest = "select * from installations where Département LIKE $value";
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
		const sqlRequest = "select * from installations where Nom_de_la_commune LIKE $value";
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
		const sqlRequest = "select * from installations where Numero_de_linstallation = $value";
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
		const sqlRequest = "select * from installations where Nom_usuel_de_linstallation LIKE $value";
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
		const sqlRequest = "select * from installations where Code_postal LIKE $codePostal";
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
		const sqlRequest = "select * from installations where Installation_particuliere LIKE $value";
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
		const sqlRequest = "select * from installations where Accessibilite_handicapes_à_mobilite_reduite = $value";
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
		const sqlRequest = "select * from installations where Desserte_bus = $value";
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
		const sqlRequest = "select * from installations where Desserte_Tram = $value";
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