<template>
    <div class="gridlist">
        <v-container v-bind="{'grid-list-md': true}" fluid>
            <v-layout row wrap v-if="marqueursActivite">
                <v-flex xs4 v-for="(marqueurActivite, index) in marqueursActivite" :key="`activite-${index}`">
                    <v-card flat tile>
                        <v-card-title>
                            {{marqueurActivite.equipement}}
                        </v-card-title>
                        <v-card-text>
                            Activité : {{marqueurActivite.activiteLibelle}}<br>
                            Commune : {{marqueurActivite.nomDeLaCommune}}<br>
                            Niveau : {{marqueurActivite.niveauDeLActivite}}<br>
                            Nombre d'équipements : {{marqueurActivite.nombreEquipementsIdentiques}}
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-if="marqueursInstallation">
                <v-flex xs4 v-for="(marqueurInstallation, index) in marqueursInstallation" :key="`installation-${index}`">
                    <v-card flat tile>
                        <v-card-title>
                            <h2>{{marqueurInstallation.nomUsuelDeLInstallation}}</h2>
                        </v-card-title>
                        <v-card-text>
                            <span v-if="marqueurInstallation.noDeLaVoie !== 'null'">{{marqueurInstallation.noDeLaVoie}},</span> {{marqueurInstallation.nomDeLaVoie}},
                            {{marqueurInstallation.codePostal}}, {{marqueurInstallation.nomDeLaCommune}}<br>
                            Nombre de place de parking : {{marqueurInstallation.nombrePlaceParking}}<br>
                            <span v-if="marqueurInstallation.accHandicapes === 'true'">Accessible aux personnes à mobilité réduite<br></span>
                            <span v-if="marqueurInstallation.desserteTram === 'true'">Accessible par tram<br></span>
                            <span v-if="marqueurInstallation.desserteBus === 'true'">Accessible par bus</span>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
	export default {
		name: "GridList",
		props: {
			marqueursActivite: Array,
			marqueursInstallation: Array
		}
	}
</script>