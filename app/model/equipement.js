"use strict";

/**
 * Equipement Entity (ES6 Class)
 */

class Equipement {
	constructor(codeDepartement, departement, codeINSEE, commune, numeroEquipement, nomEquipement
		, typeEquipementCode, typeEquipement, proprietairePrincipal, nombreVestiaire, accueilBuvette
		, longitude, latitude, installation) {
		this.codeDepartement = codeDepartement;
		this.departement = departement;
		this.codeINSEE = codeINSEE;
		this.commune = commune;
		this.numeroEquipement = numeroEquipement;
		this.nomEquipement = nomEquipement;
		this.typeEquipementCode = typeEquipementCode;
		this.typeEquipement = typeEquipement;
		this.proprietairePrincipal = proprietairePrincipal;
		this.nombreVestiaire = nombreVestiaire;
		this.accueilBuvette = accueilBuvette;
		this.longitude = longitude;
		this.latitude = latitude;
		this.installation = installation;
	}
}

module.exports = Equipement;