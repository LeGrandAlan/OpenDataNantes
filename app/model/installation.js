"use strict";

/**
 * Installation Entity (ES6 Class)
 */

class Installation {
	constructor(codeDepartement,departement,nomDeLaCommune,noDeLInstallation,nomUsuelDeLInstallation,noDeLaVoie
	,nomDeLaVoie,nomDuLieuDit,codePostal,installationParticuliere,accHandicapes,nombrePlaceParking
	,desserteBus,desserteTram,latitute,longitude) {

		this.codeDepartement = codeDepartement;
		this.departement = departement;
		this.nomDeLaCommune = nomDeLaCommune;
		this.noDeLInstallation = noDeLInstallation;
		this.nomUsuelDeLInstallation = nomUsuelDeLInstallation;
		this.noDeLaVoie = noDeLaVoie;
		this.nomDeLaVoie = nomDeLaVoie;
		this.nomDuLieuDit = nomDuLieuDit;
		this.codePostal = codePostal;
		this.installationParticuliere = installationParticuliere;
		this.accHandicapes = accHandicapes;
		this.nombrePlaceParking = nombrePlaceParking;
		this.desserteBus = desserteBus;
		this.desserteTram = desserteTram;
		this.latitute = latitute;
		this.longitude = longitude;
	}
}

module.exports = Installation;