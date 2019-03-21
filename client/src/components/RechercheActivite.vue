<template>
    <v-container fluid fill-height pa-0>
        <v-layout column>
            <v-layout row wrap align-content-start pa-2>
                <v-flex xs12>
                    <v-card-text>
                        <h1 style="display: inline-block; margin-right: 10px;">Recherche d'activités</h1>
                        <v-icon v-if="geolocalisation" v-on:click="changerStatusGeolocalisation()" style="font-size: 34px; color: blue;">far fa-compass</v-icon>
                        <v-icon v-else v-on:click="changerStatusGeolocalisation()" style="font-size: 34px; color: grey;">far fa-compass</v-icon>
                        (Géolocalisation <span v-if="geolocalisation">activée</span><span v-else>désactivée</span>)
                    </v-card-text>
                </v-flex>
                <v-flex xs2>
                    <v-card-text>
                        <v-autocomplete
                                v-model="departement"
                                :items="departements"
                                :disabled="geolocalisation"
                                color="grey"
                                hide-no-data
                                hide-selected
                                item-text="Description"
                                item-value="API"
                                label="Département"
                                placeholder="Nom du dép.    "
                                prepend-icon="fas fa-city"
                                return-object
                                v-on:change="chargerCommunes()"
                                clearable
                        ></v-autocomplete>
                    </v-card-text>
                </v-flex>
                <v-flex xs3>
                    <v-card-text>
                        <v-autocomplete
                                v-model="commune"
                                :items="communes"
                                :disabled="(departement === '' || departement === undefined) || geolocalisation"
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
                    <v-switch v-model="bus" label="Déserte bus"></v-switch>
                </v-flex>
                <v-flex xs2>
                    <v-switch v-model="tram" label="Déserte tram"></v-switch>
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
                    <v-switch v-model="handi" label="Handi-accessible"></v-switch>
                </v-flex>
                <v-flex xs1>
                    <v-btn v-on:click="chargerMarqueursCarte" color="info">Valider</v-btn>
                </v-flex>
                <v-flex xs1>
                    <v-switch v-model="grille" label="Affichage grille"></v-switch>
                </v-flex>
            </v-layout>
            <Map v-if="!grille && marqueursActivite !== null" :calculated-zoom="zoom" :calculated-center="center" :marqueurs-activite=marqueursActivite style="height: 70%; width: 100%;"/>
            <Map v-if="!grille && marqueursActivite === null" style="height: 70%; width: 100%;"/>
            <GridList v-if="grille && marqueursActivite !== null" :marqueurs-activite=marqueursActivite style="width: 100%;"/>
            <GridList v-if="grille && marqueursActivite === null" style="width: 100%;"/>
        </v-layout>
        <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :left="x === 'left'"
                :multi-line="mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
                :vertical="mode === 'vertical'"
        >
            {{ text }}
            <v-btn
                    color="pink"
                    flat
                    @click="snackbar = false"
            >
                Fermer
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
	import Map from './Map.vue';
	import GridList from './GridList.vue';
	import axios from 'axios';
	import * as L from "leaflet";

	export default {
		name: "RechercheActivite",
		components: {
			GridList,
			Map
		},
		data: () => ({
			grille: false,
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
			tram: false,
			marqueursActivite: null,
			snackbar: false,
			y: 'top',
			x: null,
			mode: '',
			timeout: 4000,
			text: '',
			center: null,
			zoom: null,
			geolocalisation: null
		}),
		props: {
			source: String
		},
		mounted() {

			setTimeout(function () {
				window.dispatchEvent(new Event('resize'))
			}, 250);
			axios.get("http://localhost:3000/api/activite/liste/niveau_activite").then(response => {
				this.niveauxActivite = response.data;
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
			changerStatusGeolocalisation() {
				this.geolocalisation = !this.geolocalisation;
			},
			getGeolocalisation() {
				return new Promise(function (resolve, reject) {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(
							(position) => {
								resolve(position);
							},
							function (error) {
								reject(error.message);
							}, {
								enableHighAccuracy: true
								, timeout: 5000
							}
						);
					} else {
						reject("La géolocalisation n'est pas suportée par votre navigateur.");
					}
				});
			},
			chargerMarqueursCarteGeolocalisation(niveauActivite, activite, bus, tram, handi) {

				this.getGeolocalisation()
					.then((gelocalisation) => {

						let url = `http://localhost:3000/api/activite/`+
							`latitude/${gelocalisation.coords.latitude}`+
							`/longitude/${gelocalisation.coords.longitude}`+
							`/rayon/5`+
							`/activite/${activite}`+
							`/niveau/${niveauActivite}`+
							`/bus/${bus}`+
							`/tram/${tram}`+
							`/handicap/${handi}`;

						axios.get(url).then(response => { //TODO: catch si recoit une réponse mais vide
							if(response.data.length > 2000) {
								this.$confirm("Voulez vous vraiment afficher les résultats ?<br>Il y en a " + response.data.length + ".<br><b>C'est fortement déconseillé !</b>").then(res => {
									if (res) {
										this.marqueursActivite = response.data.map(el => {return el.activite});
										this.text = response.data.length + " résultats !";
										this.snackbar = true;
									}
								});
							} else {
								this.marqueursActivite = response.data.map(el => {return el.activite});
								this.text = response.data.length + " résultats !";
								this.snackbar = true;

								//recherche du centre
								let latitudes = 0;
								let longitudes = 0;
								let total = 0;
								this.marqueursActivite.forEach((marqueur, index) => {
									latitudes += parseFloat(marqueur.latitude);
									longitudes += parseFloat(marqueur.longitude);
									total = index;
								});

								latitudes /= total;
								longitudes /= total;

								let minLongitude = Math.min(...this.marqueursActivite.map(marqueur => parseFloat(marqueur.longitude)));
								let maxLongitude = Math.max(...this.marqueursActivite.map(marqueur => parseFloat(marqueur.longitude)));
								let minLatitude = Math.min(...this.marqueursActivite.map(marqueur => parseFloat(marqueur.latitude)));
								let maxLatitude = Math.max(...this.marqueursActivite.map(marqueur => parseFloat(marqueur.latitude)));

								//TODO : calculer un niveau de zoom (defaultZoom = 12)

								const indice = Math.max((maxLongitude - minLongitude), (maxLatitude - minLatitude));

								if(indice > 0.5) {
									this.zoom = 8;
								} else if(indice > 0.3) {
									this.zoom = 10;
								} else {
									this.zoom = 12;
								}

								this.center = L.latLng(latitudes, longitudes);
							}

						}).catch(() => {
							this.marqueursActivite = null;
							this.text = "Aucun résultats !";
							this.snackbar = true;
						});

					})
					.catch((erreur) => {
						alert(erreur);
					});

			},
			chargerMarqueursCarte() {
				let niveauActivite = this.niveauActivite === "" || this.niveauActivite === undefined ? "null" : this.niveauActivite;
				let activite = this.activite === "" || this.activite === undefined ? "null" : this.activite;
				let commune = this.commune === "" || this.commune === undefined ? "null" : this.commune;
				let departement = this.departement === "" || this.departement === undefined ? "null" : this.departement;
				let bus = this.bus ? true : "null";
				let tram = this.tram ? true : "null";
				let handi = this.handi ? true : "null";

				if(this.geolocalisation) {
					this.chargerMarqueursCarteGeolocalisation(niveauActivite, activite, bus, tram, handi);
					return;
				}


				let url = `http://localhost:3000/api/activite/`+
					`departement/${departement}`+
					`/commune/${commune}`+
					`/activite/${activite}`+
					`/niveau/${niveauActivite}`+
					`/bus/${bus}`+
					`/tram/${tram}`+
					`/handicap/${handi}`;

				axios.get(url).then(response => {

					if(response.data.length > 2000) {
						this.$confirm("Voulez vous vraiment afficher les résultats ?<br>Il y en a " + response.data.length + ".<br><b>C'est fortement déconseillé !</b>").then(res => {
							if (res) {
								this.marqueursActivite = response.data;
								this.text = response.data.length + " résultats !";
								this.snackbar = true;
							}
						});
					} else {
						this.marqueursActivite = response.data;
						this.text = response.data.length + " résultats !";
						this.snackbar = true;

						//recherche du centre
						let latitudes = 0;
						let longitudes = 0;
						let total = 0;
						this.marqueursActivite.forEach((marqueur, index) => {
							latitudes += parseFloat(marqueur.latitude);
							longitudes += parseFloat(marqueur.longitude);
							total = index;
						});

						latitudes /= total;
						longitudes /= total;

						let minLongitude = Math.min(...this.marqueursActivite.map(marqueur => parseFloat(marqueur.longitude)));
						let maxLongitude = Math.max(...this.marqueursActivite.map(marqueur => parseFloat(marqueur.longitude)));
						let minLatitude = Math.min(...this.marqueursActivite.map(marqueur => parseFloat(marqueur.latitude)));
						let maxLatitude = Math.max(...this.marqueursActivite.map(marqueur => parseFloat(marqueur.latitude)));

						//TODO : calculer un niveau de zoom (defaultZoom = 12)

						const indice = Math.max((maxLongitude - minLongitude), (maxLatitude - minLatitude));

						if(indice > 0.5) {
							this.zoom = 8;
						} else if(indice > 0.3) {
							this.zoom = 10;
						} else {
							this.zoom = 12;
						}

						this.center = L.latLng(latitudes, longitudes);
					}

				}).catch(() => {
					this.marqueursActivite = null;
					this.text = "Aucun résultats !";
					this.snackbar = true;
				});
			},
			chargerCommunes() {
				if (this.departement !== "Non défini") {
					axios.get("http://localhost:3000/api/activite/liste/departement/" + this.departement + "/nom_commune/").then(response => {
						this.communes = response.data;
					});
				} else {
					this.communes = null;
				}
			}
		}
	}
</script>