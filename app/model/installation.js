/**
 * Installation Entity (ES6 Class)
 */

class Installation {
    constructor(noDeLInstallation, nomUsuelDeLInstallation, codePostal, nomDeLaCommune) {
        this.noDeLInstallation= noDeLInstallation;
        this.nomUsuelDeLInstallation = nomUsuelDeLInstallation;
        this.codePostal = codePostal;
        this.nomDeLaCommune =nomDeLaCommune;
       // console.log(this);
    }
}

module.exports = Installation;