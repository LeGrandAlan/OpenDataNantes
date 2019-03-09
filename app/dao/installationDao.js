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

	findByNomInstalation(value) {
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

	findByInstalationParticuliere(value) {
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


	findByCoordonnes(latitude,longitude) {
		const sqlRequest = "SELECT * FROM installations WHERE code_postal LIKE $value";
		const sqlParams = {
			$latitude: "%" + latitude + "%",
			$longitude: "%" + longitude + "%"
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


	listOfCodeDepartement(value){
		const sqlRequest = "SELECT * FROM installations WHERE code_postal LIKE $value";
		const sqlParams = {
			$latitude: "%" + latitude + "%",
			$longitude: "%" + longitude + "%"
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



}

module.exports = InstallationDao;