<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid fill-height pa-8 >
        <v-layout column>
            <h1>Details de l'installation : {{installation.nomUsuelDeLInstallation}}</h1>
            <ul>
                <li>{{installation.noDeLaVoie !== 'null' ? installation.noDeLaVoie : ''}} {{installation.nomDeLaVoie}}, {{installation.codePostal}} {{installation.nomDeLaCommune}}, {{installation.departement}}</li>
                <li v-if="installation.accHandicapes === 'true'">Accessible aux personnes à mobilité réduites <v-icon>fab fa-accessible-icon</v-icon></li>
                <li>Type d'installation : {{installation.installationParticuliere !== 'false' ? installation.installationParticuliere : 'non précisé'}}</li>
                <li v-if="installation.nombrePlaceParking > 0">{{installation.nombrePlaceParking}} places de parking</li>
                <li v-if="installation.desserteTram === 'true'">Accessible par tram <v-icon>fas fa-train</v-icon></li>
                <li v-if="installation.desserteBus === 'true'">Accessible par bus <v-icon>fas fa-bus</v-icon></li>
            </ul>
            <h1 style="margin-bottom: 16px;">Equipements de l'installation</h1>
            <v-expansion-panel>
                <v-expansion-panel-content
                        v-for="(equipement, index) in equipements"
                        :key="index"
                >
                    <template v-slot:header="">
                        <div>{{equipement.nomEquipement}}</div>
                    </template>
                    <v-card>
                        <v-card-text>
                            Type : {{equipement.typeEquipement}}<br>
                            Nombre de vestiaire : {{equipement.nombreVestiaire}}<br>
                            Propriétaire : {{equipement.proprietairePrincipal}}
                        </v-card-text>
                    </v-card>
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
			equipements: null
		}),
		mounted() {
			//Récupération des informations sur l'installation
			axios.get("http://localhost:3000/api/installation/numero_installation/" + this.noInstallation).then(response => {
				this.installation = response.data[0];
			});

			//Récupération des équipements de l'installation
			axios.get("http://localhost:3000/api/equipement/installation/" + this.noInstallation).then(response => {
				this.equipements = response.data;
			});

			//activite/equipement/numero_equipement/:value

		}
	}
</script>