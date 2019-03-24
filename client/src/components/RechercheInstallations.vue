<template>
    <v-container fluid fill-height pa-0>
        <v-layout column>
            <v-layout row wrap align-content-start pa-2 style="flex-grow: 0">
                <v-flex xs12>
                    <v-card-text>
                        <h1 style="display: inline-block; margin-right: 10px;">Recherche d'installations</h1>
                        <v-icon v-if="geolocalisation" v-on:click="changerStatusGeolocalisation()" style="font-size: 34px; color: #1976d2;">far fa-compass</v-icon>
                        <v-icon v-else v-on:click="changerStatusGeolocalisation()" style="font-size: 34px; color: gray;">far fa-compass</v-icon>
                        (Géolocalisation <span v-if="geolocalisation">activée</span><span v-else>désactivée</span>)
                    </v-card-text>
                </v-flex>
                <v-flex xs2>
                    <v-card-text>
                        <v-autocomplete
                                v-model="departement"
                                :items="departements"
                                :disabled="geolocalisation"
                                color="gray"
                                hide-no-data
                                hide-selected
                                item-text="Description"
                                item-value="API"
                                label="Dép."
                                placeholder="Nom du département"
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
                                color="gray"
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
                <v-flex xs2 style="margin: 0 20px;">
                    <v-slider
                            :disabled="!geolocalisation"
                            prepend-icon="fas fa-road"
                            thumb-size="24"
                            v-model="slider"
                            thumb-label="always"
                            min="1"
                            max="50"
                    ></v-slider>
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
                                v-model="installation"
                                :items="installations"
                                color="gray"
                                hide-no-data
                                hide-selected
                                item-text="Description"
                                item-value="API"
                                label="Nom d'installation"
                                placeholder="Nom de l'installation"
                                prepend-icon="fas fa-city"
                                return-object
                                clearable
                        ></v-autocomplete>
                    </v-card-text>
                </v-flex>
                <v-flex xs4>
                    <v-card-text>
                        <v-autocomplete
                                v-model="installationParticuliere"
                                :items="installationParticulieres"
                                color="gray"
                                hide-no-data
                                hide-selected
                                item-text="Description"
                                item-value="API"
                                label="Installation particuliere"
                                placeholder="Installation particuliere"
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
                <v-tabs fixed-tabs>
                    <v-tab v-on:click="table = false">
                        Carte
                    </v-tab>
                    <v-tab v-on:click="table = true" >
                        Tableau
                    </v-tab>
                </v-tabs>
            </v-layout>
            <keep-alive>
                <Map v-if="!table && marqueursInstallation !== null" :dark-mode="darkMode" :marqueurs-installation=marqueursInstallation style="height: 70%; width: 100%;"/>
                <Map v-if="!table && marqueursInstallation === null" :dark-mode="darkMode" style="height: 70%; width: 100%;"/>
            </keep-alive>
            <Table v-if="table && marqueursInstallation !== null" :marqueurs-installation=marqueursInstallation style="width: 100%;"/>
            <Table v-if="table && marqueursInstallation === null" style="width: 100%;"/>
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
	import Table from './Table.vue';
	import axios from 'axios';

	export default {
		name: "RechercheInstallations",
		components: {
			Table,
			Map
		},
		data: () => ({
			table: false,
			departement: "",
			departements: null,
			commune: "",
			communes: null,
			installation: "",
			installations: null,
			installationParticuliere: "",
			installationParticulieres: null,
			handi: false,
			bus: false,
			tram: false,
			marqueursInstallation: null,
			snackbar: false,
			y: 'top',
			x: null,
			mode: '',
			timeout: 4000,
			text: '',
			geolocalisation: null,
			slider: 1
		}),
		props: {
			darkMode: Boolean
		},
		mounted() {
			setTimeout(function () {
				window.dispatchEvent(new Event('resize'))
			}, 250);
			axios.get("http://localhost:3000/api/installation/liste/installations_particuliere/").then(response => {
				this.installationParticulieres = response.data;
				this.installationParticulieres = this.installationParticulieres.filter((item) => {
					return item !== "Non";
				});
			});
			axios.get("http://localhost:3000/api/installation/liste/nom_installation/").then(response => {
				this.installations = response.data;
			});
			axios.get("http://localhost:3000/api/activite/liste/code_departement/").then(response => {
				this.departements = response.data;
			});
		},
		methods: {
			/**
			 * Active la géolocalisation (la variable)
			 */
			changerStatusGeolocalisation() {
				this.geolocalisation = !this.geolocalisation;
			},
			/**
			 * Retourne une promesse avec la géolocalisation ou une erreur
			 * @returns {Promise<any>}
			 */
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
			/**
			 * Charge la carte avec les critères de recherche et la géolocalisation de l'utilisateur
			 * @param rayon                     rayon de recherche en kilomètres
			 * @param installation              nom de l'installation
			 * @param installationParticuliere  type d'installation
			 * @param bus                       vrai si accessible en bus
			 * @param tram                      vrai si accessible en tram
			 * @param handi                     vrai si accessible aux personnes à mobilité réduite
			 */
			chargerMarqueursCarteGeolocalisation(rayon, installation, installationParticuliere, bus, tram, handi) {

				this.getGeolocalisation()
					.then((gelocalisation) => {

						let url = `http://localhost:3000/api/installation/`+
							`latitude/${gelocalisation.coords.latitude}`+
							`/longitude/${gelocalisation.coords.longitude}`+
							`/rayon/${rayon}`+
							`/nom_installation/${installation}`+
							`/installationParticuliere/${installationParticuliere}`+
							`/bus/${bus}`+
							`/tram/${tram}`+
							`/handicap/${handi}`;

						axios.get(url).then(response => { //TODO: catch si recoit une réponse mais vide
							if(response.data.length > 2000) {
								this.$confirm("Voulez vous vraiment afficher les résultats ?<br>Il y en a " + response.data.length + ".<br><b>C'est fortement déconseillé !</b>").then(res => {
									if (!res) {
										this.marqueursInstallation = response.data.map(el => {return el.installation});
										this.text = response.data.length + " résultats !";
										this.snackbar = true;
									}
								});
							} else {
								this.marqueursInstallation = response.data.map(el => {return el.installation});
								this.text = response.data.length + " résultats !";
								this.snackbar = true;
							}

						}).catch(() => {
							this.marqueursInstallation = null;
							this.text = "Aucun résultats !";
							this.snackbar = true;
						});

					})
					.catch((erreur) => {
						alert(erreur);
					});

			},
			/**
			 * Charge la carte avec les critères de recherche et, si activée, la géolocalisation de l'utilisateur
			 */
			chargerMarqueursCarte() {

				let installationParticuliere = this.installationParticuliere === "" || this.installationParticuliere === undefined ? "null" : this.installationParticuliere;
				let installation = this.installation === "" || this.installation === undefined ? "null" : this.installation;
				let commune = this.commune === "" || this.commune === undefined ? "null" : this.commune;
				let departement = this.departement === "" || this.departement === undefined ? "null" : this.departement;
				let bus = this.bus ? true : "null";
				let tram = this.tram ? true : "null";
				let handi = this.handi ? true : "null";
				let slider = this.slider;

				if(this.geolocalisation) {
					this.chargerMarqueursCarteGeolocalisation(slider, installation, installationParticuliere, bus, tram, handi);
					return;
				}

				let url = `http://localhost:3000/api/installation/`+
					`departement/${departement}`+
					`/commune/${commune}`+
					`/nom_installation/${installation}`+
					`/installationParticuliere/${installationParticuliere}`+
					`/bus/${bus}`+
					`/tram/${tram}`+
					`/handicap/${handi}`;

				axios.get(url).then(response => {

					if(response.data.length > 2000) {
						this.$confirm("Voulez vous vraiment afficher les résultats ?<br>Il y en a " + response.data.length + ".<br><b>C'est fortement déconseillé !</b>").then(res => {
							if(!res) {
								this.marqueursInstallation = response.data;
								this.text = response.data.length + " résultats !";
								this.snackbar = true;
							}
						});
					} else {
						this.marqueursInstallation = response.data;
						this.text = response.data.length + " résultats !";
						this.snackbar = true;
					}

				}).catch(() => {
					this.marqueursInstallation = null;
					this.text = "Aucun résultats !";
					this.snackbar = true;
				});
			},
			/**
			 * Charge la liste des communes en fonction du département sélectionné
			 */
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