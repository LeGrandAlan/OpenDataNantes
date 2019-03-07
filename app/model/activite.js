"use strict";

/**
 * Activite Entity (ES6 Class)
 */

class Activite {
	constructor(codeDuDepartement, libelleDuDepartement, codeINSEE, nomDeLaCommune, nombreEquipementsIdentiques
		, activiteCode, activiteLibelle, activitePraticable, activitePratiquee, salleSpecialisable
		, niveauDeLActivite, latitute, longitude, equipement) {
		this._codeDuDepartement = codeDuDepartement;
		this._libelleDuDepartement = libelleDuDepartement;
		this._codeINSEE = codeINSEE;
		this._nomDeLaCommune = nomDeLaCommune;
		this._nombreEquipementsIdentiques = nombreEquipementsIdentiques;
		this._activiteCode = activiteCode;
		this._activiteLibelle = activiteLibelle;
		this._activitePraticable = activitePraticable;
		this._activitePratiquee = activitePratiquee;
		this._salleSpecialisable = salleSpecialisable;
		this._niveauDeLActivite = niveauDeLActivite;
		this._latitute = latitute;
		this._longitude = longitude;
		this._equipement = equipement;
	}

	get codeDuDepartement() {
		return this._codeDuDepartement;
	}

	get libelleDuDepartement() {
		return this._libelleDuDepartement;
	}

	get codeINSEE() {
		return this._codeINSEE;
	}

	get nomDeLaCommune() {
		return this._nomDeLaCommune;
	}

	get nombreEquipementsIdentiques() {
		return this._nombreEquipementsIdentiques;
	}

	get activiteCode() {
		return this._activiteCode;
	}

	get activiteLibelle() {
		return this._activiteLibelle;
	}

	get activitePraticable() {
		return this._activitePraticable;
	}

	get activitePratiquee() {
		return this._activitePratiquee;
	}

	get salleSpecialisable() {
		return this._salleSpecialisable;
	}

	get niveauDeLActivite() {
		return this._niveauDeLActivite;
	}

	get latitute() {
		return this._latitute;
	}

	get longitude() {
		return this._longitude;
	}

	get equipement() {
		return this._equipement;
	}
}

module.exports = Activite;
