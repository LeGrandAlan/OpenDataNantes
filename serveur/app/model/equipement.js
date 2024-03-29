"use strict";

/**
 * Equipement Entity (ES6 Class)
 */

class Equipement {
	constructor(codeDepartement, departement, codeINSEE, commune, numeroInstalation, nomInstalation, numeroEquipement
		, nomEquipement, typeEquipementCode, typeEquipement, proprietairePrincipal, nombreVestiaire, accueilBuvette
		, longitude, latitude, id, installation) {
		this.codeDepartement = codeDepartement;
		this.departement = departement;
		this.codeINSEE = codeINSEE;
		this.commune = commune;
		this.numeroInstalation = numeroInstalation;
		this.nomInstalation = nomInstalation;
		this.numeroEquipement = numeroEquipement;
		this.nomEquipement = nomEquipement;
		this.typeEquipementCode = typeEquipementCode;
		this.typeEquipement = typeEquipement;
		this.proprietairePrincipal = proprietairePrincipal;
		this.nombreVestiaire = nombreVestiaire;
		this.accueilBuvette = accueilBuvette;
		this.latitude = latitude;
		this.longitude = longitude;
		this.id = id;
		this.installation = installation;
	}
}

module.exports = Equipement;