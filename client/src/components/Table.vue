<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="table">
        <v-card>
            <v-card-title>
                <span v-if="marqueursActivite">Activités</span>
                <span v-if="marqueursInstallation">Installations</span>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Rechercher"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    v-if="marqueursActivite"
                    :headers="headersActivite"
                    :items="marqueursActivite"
                    :search="search"
                    no-results-text="Aucune activité pour cette recherche"
                    no-data-text="Aucune activité pour ces critères"
                    rows-per-page-text="Activités par page"
                    :rows-per-page-items="rowsParPage"
            >
                <template v-slot:items="props">
                    <td class="text-xs-center">{{ props.item.equipement }}</td>
                    <td class="text-xs-center">{{ props.item.activiteLibelle }}</td>
                    <td class="text-xs-center">{{ props.item.niveauDeLActivite }}</td>
                    <td class="text-xs-center">{{ props.item.nombreEquipementsIdentiques }}</td>
                    <td class="text-xs-center" v-if="props.item.salleSpecialisable === 'true'">Oui</td>
                    <td class="text-xs-center" v-else="">Non</td>
                    <td class="text-xs-center">{{ props.item.nomDeLaCommune }}</td>
                </template>
                <v-alert v-slot:no-results="" :value="true" color="error" icon="warning">
                    Votre recherche "{{ search }}" n'aboutit à aucun résultat.
                </v-alert>
            </v-data-table>

            <v-data-table
                    v-if="marqueursInstallation"
                    :headers="headersInstallation"
                    :items="marqueursInstallation"
                    :search="search"
                    no-results-text="Aucune installation pour cette recherche"
                    no-data-text="Aucune installation pour ces critères"
                    rows-per-page-text="Installations par page"
                    :rows-per-page-items="rowsParPage"
            >
                <template v-slot:items="props">
                    <tr v-on:click="detailsInstallation(props.item.noDeLInstallation)">
                        <td class="text-xs-center">{{ props.item.nomUsuelDeLInstallation }}</td>
                        <td class="text-xs-center">{{ props.item.nombrePlaceParking }}</td>
                        <td class="text-xs-center" v-if="props.item.accHandicapes === 'true'">Oui</td>
                        <td class="text-xs-center" v-else="">Non</td>
                        <td class="text-xs-center" v-if="props.item.desserteTram === 'true'">Oui</td>
                        <td class="text-xs-center" v-else="">Non</td>
                        <td class="text-xs-center" v-if="props.item.desserteBus === 'true'">Oui</td>
                        <td class="text-xs-center" v-else="">Non</td>
                    </tr>
                </template>
                <v-alert v-slot:no-results="" :value="true" color="error" icon="warning">
                    Votre recherche "{{ search }}" n'aboutit à aucun résultat.
                </v-alert>
            </v-data-table>
        </v-card>

        <!--<span v-if="marqueurInstallation.noDeLaVoie !== 'null'">{{marqueurInstallation.noDeLaVoie}},</span> {{marqueurInstallation.nomDeLaVoie}},-->
        <!--{{marqueurInstallation.codePostal}}, {{marqueurInstallation.nomDeLaCommune}}<br>-->

    </div>
</template>

<script>
	export default {
		name: "Table",
		props: {
			marqueursActivite: Array,
			marqueursInstallation: Array,
		},
		data () {
			return {
				search: '',
				rowsParPage: [6, 10, 20, 30, 40, 50,],
				headersActivite: [
					{ text: 'Nom de l\'équipement', value: 'equipement', align: 'center'},
					{ text: 'Activité', value: 'activiteLibelle', align: 'center' },
					{ text: 'Niveau', value: 'niveauDeLActivite', align: 'center' },
					{ text: 'Nombre d\'équipements', value: 'nombreEquipementsIdentiques', align: 'center' },
					{ text: 'Salle spécialisée', value: 'salleSpecialisable', align: 'center' },
					{ text: 'Commune', value: 'nomDeLaCommune', align: 'center' }
				],
				headersInstallation: [
					{ text: 'Nom de l\'installation', value: 'nomUsuelDeLInstallation', align: 'center'},
					{ text: 'Places de parking', value: 'nombrePlaceParking', align: 'center' },
					{ text: 'Handi-accessible', value: 'accHandicapes', align: 'center' },
					{ text: 'Tram', value: 'desserteTram', align: 'center' },
					{ text: 'Bus', value: 'desserteBus', align: 'center' },
				]
			}
		},
		methods: {
			detailsInstallation(noInstallation) {
				this.$root.$emit('installationDetailsClicked', noInstallation);
			}
		}
	}
</script>

<style>
    .table {
        flex-grow: 1;
    }
</style>