"use strict";

/**
 * Activite Entity (ES6 Class)
 */

class Activite {
	constructor(codeDuDepartement, libelleDuDepartement, codeINSEE, nomDeLaCommune,numeroEquipement, nombreEquipementsIdentiques
		, activiteCode, activiteLibelle, activitePraticable, activitePratiquee, salleSpecialisable
		, niveauDeLActivite, latitute, longitude, equipement) {
		this.codeDuDepartement = codeDuDepartement;
		this.libelleDuDepartement = libelleDuDepartement;
		this.codeINSEE = codeINSEE;
		this.nomDeLaCommune = nomDeLaCommune;
		this.numeroEquipement = numeroEquipement;
		this.nombreEquipementsIdentiques = nombreEquipementsIdentiques;
		this.activiteCode = activiteCode;
		this.activiteLibelle = activiteLibelle;
		this.activitePraticable = activitePraticable;
		this.activitePratiquee = activitePratiquee;
		this.salleSpecialisable = salleSpecialisable;
		this.niveauDeLActivite = niveauDeLActivite;
		this.latitude = latitute;
		this.longitude = longitude;
		this.equipement = equipement;
	}
}

module.exports = Activite;
