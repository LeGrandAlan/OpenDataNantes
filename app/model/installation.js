"use strict";

/**
 * Installation Entity (ES6 Class)
 */

class Installation {
	constructor(codeDepartement, departement, nomDeLaCommune, noDeLInstallation, nomUsuelDeLInstallation
		, noDeLaVoie, nomDeLaVoie, nomDuLieuDit, codePostal, installationParticuliere, accHandicapes
		, nombrePlaceParking, desserteBus, desserteTram, latitute, longitude) {

		this._codeDepartement = codeDepartement;
		this._departement = departement;
		this._nomDeLaCommune = nomDeLaCommune;
		this._noDeLInstallation = noDeLInstallation;
		this._nomUsuelDeLInstallation = nomUsuelDeLInstallation;
		this._noDeLaVoie = noDeLaVoie;
		this._nomDeLaVoie = nomDeLaVoie;
		this._nomDuLieuDit = nomDuLieuDit;
		this._codePostal = codePostal;
		this._installationParticuliere = installationParticuliere;
		this._accHandicapes = accHandicapes;
		this._nombrePlaceParking = nombrePlaceParking;
		this._desserteBus = desserteBus;
		this._desserteTram = desserteTram;
		this._latitute = latitute;
		this._longitude = longitude;
	}

	get codeDepartement() {
		return this._codeDepartement;
	}

	get departement() {
		return this._departement;
	}

	get nomDeLaCommune() {
		return this._nomDeLaCommune;
	}

	get noDeLInstallation() {
		return this._noDeLInstallation;
	}

	get nomUsuelDeLInstallation() {
		return this._nomUsuelDeLInstallation;
	}

	get noDeLaVoie() {
		return this._noDeLaVoie;
	}

	get nomDeLaVoie() {
		return this._nomDeLaVoie;
	}

	get nomDuLieuDit() {
		return this._nomDuLieuDit;
	}

	get codePostal() {
		return this._codePostal;
	}

	get installationParticuliere() {
		return this._installationParticuliere;
	}

	get accHandicapes() {
		return this._accHandicapes;
	}

	get nombrePlaceParking() {
		return this._nombrePlaceParking;
	}

	get desserteBus() {
		return this._desserteBus;
	}

	get desserteTram() {
		return this._desserteTram;
	}

	get latitute() {
		return this._latitute;
	}

	get longitude() {
		return this._longitude;
	}
}

module.exports = Installation;