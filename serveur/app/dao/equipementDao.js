"use strict";
/* Load Equipement entity */
const Equipement = require('../model/equipement');
/* Load Installation entity */
const Installation = require('../model/installation');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');
const DaoError = require('./commons/daoError');

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
		const sqlRequest =
			"select e.*," +
			"       i.Code_du_departement                         as I_Code_du_departement," +
			"       i.Departement                                 as I_Departement," +
			"       i.Nom_de_la_commune                           as I_Nom_de_la_commune," +
			"       i.Numero_de_linstallation                     as I_Numero_de_linstallation," +
			"       i.Nom_usuel_de_linstallation                  as I_Nom_usuel_de_linstallation," +
			"       i.Numero_de_la_voie                           as I_Numero_de_la_voie," +
			"       i.Nom_de_la_voie                              as I_Nom_de_la_voie," +
			"       i.Nom_du_lieu_dit                             as I_Nom_du_lieu_dit," +
			"       i.Code_postal                                 as I_Code_postal," +
			"       i.Installation_particuliere                   as I_Installation_particuliere," +
			"       i.Accessibilite_handicapes_à_mobilite_reduite as I_Accessibilite_handicapes_à_mobilite_reduite," +
			"       i.Nombre_total_de_place_de_parking            as I_Nombre_total_de_place_de_parking," +
			"       i.Desserte_bus                                as I_Desserte_bus," +
			"       i.Desserte_Tram                               as I_Desserte_Tram," +
			"       i.latitude                                    as I_latitude," +
			"       i.longitude                                   as I_longitude," +
			"       i.id                                          as I_id " +
			"from equipements e" +
			"       inner join installations i on e.Numero_de_linstallation = i.Numero_de_linstallation;";

		return this.common.findAll(sqlRequest).then(rows => {
			let equipements = [];

			for (const row of rows) {
				let values = Object.values(row);
				equipements.push(new Equipement(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16]
					, new Installation(values[17], values[18], values[19], values[20], values[21], values[22], values[23]
						, values[24], values[25], values[26], values[27], values[28], values[29], values[30], values[31], values[32])));

			}
			return equipements;
		});
	};


	/**         findBy         **/


	findByAll(departement, commune, nomEquipement, typeEquipement, buvette, bus, tram, handicap) {
		const sqlRequest =
			"select e.* " +
			"from equipements e," +
			"     installations i " +
			"where (e.Code_departement = $departement OR $departement IS NULL)" +
			"  and (e.Commune = $commune OR $commune IS NULL)" +
			"  and (Nom_equipement = $nomEquipement OR $nomEquipement IS NULL)" +
			"  and (e.Type_dequipement = $typeEquipement OR $typeEquipement IS NULL)" +
			"  and (e.Accueil_buvette = $buvette OR $buvette IS NULL)" +
			"  and e.Numero_de_linstallation = i.Numero_de_linstallation" +
			"  and (i.Desserte_bus = $bus OR $bus IS NULL)" +
			"  and (i.Desserte_Tram = $tram OR $tram IS NULL)" +
			"  and (i.Accessibilite_handicapes_à_mobilite_reduite = $handicap OR $handicap IS NULL);";

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

	findByAllAndCoordonnees(latitude, longitude, rayon, nomEquipement, typeEquipement, buvette, bus, tram, handicap) {
		const sqlRequest =
			"select e.* " +
			"from equipements e, " +
			"     installations i " +
			"where (Nom_equipement = $nomEquipement OR $nomEquipement IS NULL) " +
			"  and (e.Type_dequipement = $typeEquipement OR $typeEquipement IS NULL) " +
			"  and (e.Accueil_buvette = $buvette OR $buvette IS NULL) " +
			"  and (i.Desserte_bus = $bus OR $bus IS NULL) " +
			"  and e.Numero_de_linstallation = i.Numero_de_linstallation" +
			"  and (i.Desserte_Tram = $tram OR $tram IS NULL) " +
			"  and (i.Accessibilite_handicapes_à_mobilite_reduite = $handicap OR $handicap IS NULL) " +
			"  and cast(e.Coordonnees_GPS_latitude as reel) > $latitudeMin " +
			"  and cast(e.Coordonnees_GPS_latitude as reel) < $latitudeMax " +
			"  and cast(e.Coordonnees_GPS_longitude as reel) > $longitudeMin " +
			"  and cast(e.Coordonnees_GPS_longitude as reel) < $longitudeMax;";

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
				equipements.push({
					equipement: new Equipement(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
						, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]),
					distance: distance(latitude, longitude, Number(values[14]), Number(values[13]))
				});
			}
			equipements.sort((a, b) => {
				return a.distance - b.distance;
			});
			equipements = equipements.filter((value) => {
				return value.distance <= (rayon / 1000);
			});
			if (equipements.length === 0)
				throw new DaoError(21, "Entity not found");

			return equipements;
		});
	}


	findById(id) {
		const sqlRequest = "select * from equipements where id = $id";
		const sqlParams = {
			$id: id
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
				let equipements = [];

				for (const row of rows) {
					let values = Object.values(row);
					equipements.push(new Equipement(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
						, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]));
				}
				return equipements;
			}
		);

	}


	findByNoDeLInstallation(noDeLInstallation) {
		const sqlRequest =
			"select * " +
			"from equipements e " +
			"   inner join installations i on e.Numero_de_linstallation = i.Numero_de_linstallation " +
			"where i.Numero_de_linstallation = $noDeLInstallation;";
		const sqlParams = {
			$noDeLInstallation: noDeLInstallation
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {

			let equipements = [];

			for (const row of rows) {
				let values = Object.values(row);
				equipements.push(new Equipement(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]
					, new Installation(values[17], values[18], values[19], values[20], values[21], values[22], values[23]
						, values[24], values[25], values[26], values[27], values[28], values[29], values[30], values[31], values[32])));

			}

			return equipements;
		});
	}

	/**         listOf         **/


	listOfNomDepartement(value) {
		const sqlRequest = "select distinct Departement from equipements where Departement like $value";
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
		const sqlRequest = "select distinct Commune from equipements";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Commune"]);
			}
			return noms;
		});
	}

	listOfNomCommune(value) {
		const sqlRequest = "select distinct Commune from equipements where Commune like $value";
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

	listOfNomCommuneByDepartement(value) {
		const sqlRequest = "select distinct Commune from equipements where Code_departement = $value";
		const sqlParams = {
			$value: value
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
		const sqlRequest = "select distinct Nom_equipement from equipements";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom_equipement"]);
			}
			return noms;
		});
	}

	listOfNomEquipement(value) {
		const sqlRequest = "select distinct Nom_equipement from equipements where Equipement like $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Nom_equipement"]);
			}
			return noms;
		});
	}

	listOfTypesEquipements() {
		const sqlRequest = "select distinct Type_dequipement from equipements";

		return this.common.findAll(sqlRequest).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Type_dequipement"]);
			}
			return noms;
		});
	}

	listOfTypeEquipement(value) {
		const sqlRequest = "select distinct Type_dequipement from equipements where Type_dequipement like $value";
		const sqlParams = {
			$value: "%" + value + "%"
		};

		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let noms = [];
			for (const row of rows) {
				noms.push(row["Type_d-equipement"]);
			}
			return noms;
		});
	}


}

module.exports = EquipementDao;