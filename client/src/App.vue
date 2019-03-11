<template>
    <div id="app">
        <v-app id="inspire" light>
            <v-navigation-drawer
                    clipped
                    fixed
                    v-model="drawer"
                    app
            >
                <v-list dense>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon>fas fa-dumbbell</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Activités</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile><!-- v-on:click="" -->
                        <v-list-tile-action>
                            <v-icon>fas fa-warehouse</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Equipements</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed clipped-left>
                <v-toolbar-side-icon  v-on:click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>OpenDataNantes</v-toolbar-title>
            </v-toolbar>
            <v-content>
                <v-container fluid fill-height pa-0>
                    <v-layout column>
                        <v-layout row wrap align-content-start pa-2>
                            <v-flex xs12>
                                <v-card-text>
                                    <h1>Recherche d'activités</h1>
                                </v-card-text>
                            </v-flex>
                            <v-flex xs3>
                                <v-card-text>
                                    <v-autocomplete
                                            v-model="departement"
                                            :items="departements"
                                            color="grey"
                                            hide-no-data
                                            hide-selected
                                            item-text="Description"
                                            item-value="API"
                                            label="Département"
                                            placeholder="Nom du département"
                                            prepend-icon="fas fa-city"
                                            return-object
                                            v-on:change="chargerCommunes()"
                                            clearable
                                    ></v-autocomplete>
                                </v-card-text>
                            </v-flex>
                            <v-flex xs4>
                                <v-card-text>
                                    <v-autocomplete
                                            v-model="commune"
                                            :items="communes"
                                            :disabled="departement === ''"
                                            color="grey"
                                            hide-no-data
                                            hide-selected
                                            item-text="Description"
                                            item-value="API"
                                            label="Commune"
                                            placeholder="Nom de la commune"
                                            prepend-icon="fas fa-city"
                                            return-object
                                            clearable
                                    ></v-autocomplete>
                                </v-card-text>
                            </v-flex>
                            <v-flex xs2>
                                <v-switch v-model="bus" label="Déserte bus"></v-switch> <!--  v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"  -->
                            </v-flex>
                            <v-flex xs2>
                                <v-switch v-model="tram" label="Déserte tram"></v-switch> <!--  v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"  -->
                            </v-flex>
                            <v-flex xs4>
                                <v-card-text>
                                    <v-autocomplete
                                            v-model="activite"
                                            :items="activites"
                                            color="grey"
                                            hide-no-data
                                            hide-selected
                                            item-text="Description"
                                            item-value="API"
                                            label="Activité"
                                            placeholder="Type d'activité"
                                            prepend-icon="fas fa-city"
                                            return-object
                                            clearable
                                    ></v-autocomplete>
                                </v-card-text>
                            </v-flex>
                            <v-flex xs4>
                                <v-card-text>
                                    <v-autocomplete
                                            v-model="niveauActivite"
                                            :items="niveauxActivite"
                                            color="grey"
                                            hide-no-data
                                            hide-selected
                                            item-text="Description"
                                            item-value="API"
                                            label="Niveau"
                                            placeholder="Niveau d'activité"
                                            prepend-icon="fas fa-city"
                                            return-object
                                            clearable
                                    ></v-autocomplete>
                                </v-card-text>
                            </v-flex>
                            <v-flex xs2>
                                <v-switch v-model="handi" label="Handi-accessible"></v-switch> <!--  v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"  -->
                            </v-flex>
                            <v-flex xs2>
                                <v-btn v-on:click="getData" color="info">Valider</v-btn>
                            </v-flex>
                        </v-layout>
                        <Map style="height: 70%; width: 100%;"/>
                    </v-layout>
                </v-container>
            </v-content>
            <v-footer app fixed>
                <span>&copy; 2019</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
	import Map from './components/Map.vue';
	import axios from 'axios';

	export default {
		name: 'app',
		components: {
			Map
		},
		data: () => ({
			drawer: true,
            departement: "",
            departements: null,
            commune: "",
            communes: null,
            activite: "",
            activites: null,
			niveauActivite: "",
            niveauxActivite: null,
			handi: false,
            bus: false,
            tram: false
		}),
		props: {
			source: String
		},
		mounted() {

			setTimeout(function () {
				window.dispatchEvent(new Event('resize'))
			}, 250);
			axios.get("http://localhost:3000/api/activite/liste/niveau_activite").then(reponse => {
				this.niveauxActivite = reponse.data;
				this.niveauxActivite = this.niveauxActivite.filter((item) => {
					return item !== "Non défini";
				});
            });
			axios.get("http://localhost:3000/api/activite/liste/nom_activite/").then(response => {
				this.activites = response.data.map(res => res.nom);
            });
			axios.get("http://localhost:3000/api/activite/liste/code_departement/").then(response => {
				this.departements = response.data;
            });
		},
		methods: {
			getData() {
				console.log(this.departement/*===""*/);
				console.log(this.commune);
                console.log(this.activite);
				console.log(this.niveauActivite);
                console.log(this.handi);
				console.log(this.bus);
				console.log(this.tram);
			},
			chargerCommunes() {
				if(this.departement !== "Non défini") {
					axios.get("http://localhost:3000/api/activite/liste/departement/nom_commune/" + this.departement).then(response => {
						this.communes = response.data;
					});
                } else {
					this.communes = null;
                }
            }
        }
	}
</script>
