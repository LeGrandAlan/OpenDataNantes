<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid fill-height pa-8 >
        <v-layout column v-if="installation">
            <h1>Details de l'installation : {{installation.nomUsuelDeLInstallation}}</h1>
            <ul style="margin: 16px 0;">
                <li>{{installation.noDeLaVoie !== 'null' ? installation.noDeLaVoie : ''}} {{installation.nomDeLaVoie}}, {{installation.codePostal}} {{installation.nomDeLaCommune}}, {{installation.departement}}</li>
                <li v-if="installation.accHandicapes === 'true'">Accessible aux personnes à mobilité réduites <v-icon>fab fa-accessible-icon</v-icon></li>
                <li>Type d'installation : {{installation.installationParticuliere !== 'false' ? installation.installationParticuliere : 'non précisé'}}</li>
                <li v-if="installation.nombrePlaceParking > 0">{{installation.nombrePlaceParking}} places de parking</li>
                <li v-if="installation.desserteTram === 'true'">Accessible par tram <v-icon>fas fa-train</v-icon></li>
                <li v-if="installation.desserteBus === 'true'">Accessible par bus <v-icon>fas fa-bus</v-icon></li><br>
                <li v-if="installation.latitude">Latitude : {{installation.latitude}}</li>
                <li v-if="installation.longitude">Longitude : {{installation.longitude}}</li>
            </ul>
            <h1 style="margin-bottom: 16px;">Equipements de l'installation</h1>
            <v-expansion-panel>
                <v-expansion-panel-content
                        style="padding: 12px 32px;"
                        v-for="(equipement, index) in equipements"
                        :key="index"
                >
                    <template v-slot:header="">
                        <h2>{{equipement.nomEquipement}}</h2>
                    </template>
                    <v-card>
                        <v-card-text style="padding: 0;">
                            Type : {{equipement.typeEquipement}}<br>
                            Nombre de vestiaire : {{equipement.nombreVestiaire}}<br>
                            Propriétaire : {{equipement.proprietairePrincipal}}<br>
                        </v-card-text>
                    </v-card>
                    <h3 style="margin-top: 18px; margin-bottom: -14px;">Activités de cet équipement</h3>
                    <v-list two-line>
                        <template v-for="activite in listeActiviteesEquipement[index]">
                            <v-list-tile
                                    :key="activite.id"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{activite.activiteLibelle}}</v-list-tile-title>
                                    <v-list-tile-sub-title >Niveau : {{activite.niveauDeLActivite}}, nombre d'équipement : {{activite.nombreEquipementsIdentiques}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-layout>
    </v-container>
</template>

<script>
	import axios from 'axios';

	export default {
		name: "DetailsInstallation",
		props: {
			noInstallation: Number
		},
		data: () => ({
			installation: null,
			equipements: null,
			listeActiviteesEquipement: []
		}),
		mounted() {
			//Récupération des informations sur l'installation
			axios.get("http://localhost:3000/api/installation/numero_installation/" + this.noInstallation).then(response => {
				this.installation = response.data[0];
			});

			//Récupération des équipements de l'installation
			axios.get("http://localhost:3000/api/equipement/installation/" + this.noInstallation).then(response => {
				this.equipements = response.data;
			}).then(() => {
				//Récupération des activitées de chaque équipement de l'installation
				this.equipements.forEach(equipement => {
					axios.get("http://localhost:3000/api/activite/equipement/numero_equipement/" + equipement.numeroEquipement).then((response) => {
						this.listeActiviteesEquipement.push(response.data);
					});
				});
			});
		}
	}
</script>

<style>
    .v-expansion-panel__header {
        padding: 0 !important;
    }
    .v-list--two-line .v-list__tile {
        padding: 0 !important;
    }
</style>