/**
 * Activite Entity (ES6 Class)
 */

class Activite {
    constructor(activiteCode, activiteLibelle,equipement) {
        this.activiteCode= activiteCode;
        this.activiteLibelle =  activiteLibelle;
        this.equipement = equipement;
    }
}

module.exports = Activite;