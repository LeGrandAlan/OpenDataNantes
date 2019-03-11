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
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14]
					, new Installation(values[15], values[16], values[17], values[18], values[19], values[20], values[21], values[22]
						, values[23], values[24], values[25], values[26], values[27], values[28], values[29], values[30])));

			}

			return equipements;
		});
	};

	findByAll(departement, commune, activite, niveau, bus, tram, handicap) {
		const sqlRequest = "select a.* from activites a, Equipements e, installations i where " +
			"(a.\"Code du département\" = $departement OR $departement IS NULL) and (a.\"Nom de la commune\" = $commune OR $commune IS NULL) and " +
			"(a.\"Activité libellé\" = $activite OR $activite IS NULL) and (a.\"Niveau de l activité - Classif.\" = $niveau OR $niveau IS NULL) and " +
			"a.\"Numéro de la fiche équipement\"=e.\"Numéro de la fiche équipement\" and e.\"Numéro de l installation\"=i.\"Numéro de l installation\" and " +
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

		console.log(sqlParams);
		return this.common.findAllWithParams(sqlRequest, sqlParams).then(rows => {
			let equipements = [];

			for (const row of rows) {
				let values = Object.values(row);
				equipements.push(new Equipement(values[0], values[1], values[2], values[3],values[4], values[5], values[6], values[7]
					, values[8], values[9], values[10], values[11], values[12], values[13], values[14]));
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




	listOfNomDepartement(value) {
		const sqlRequest = "select distinct Equipements.Departement from Equipements where Equipements.Departement like $value";
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

	listOfNomCommune(value) {
		const sqlRequest = "select distinct Equipements.Commune from Equipements where Equipements.Commune like $value";
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

	listOfNomEquipement(value) {
		const sqlRequest = "select distinct Equipements.\"Equipement\" from Equipements where Equipements.\"Equipement\" like $value";
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

	listOfTypeEquipement(value) {
		const sqlRequest = "select distinct Equipements.\"Type d équipement\" from Equipements where Equipements.\"Type d équipement\" like $value";
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