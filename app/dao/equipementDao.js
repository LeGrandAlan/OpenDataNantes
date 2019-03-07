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



    findByNoDeLInstallation(noDeLInstallation){
        const sqlRequest = "select numero_de_la_fiche_equipement, "+
            "installation.numero_de_l_installation, installation.nom_usuel_de_l_installation, "+
            "installation.nom_de_la_commune, installation.code_postal " +
            "from equipement " +
            "inner join installation on installation.numero_de_l_installation=equipement.numero_de_l_installation "+
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



}

module.exports = EquipementDao;