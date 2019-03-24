<template>
    <div id="map">
        <l-map
                id="map-map"
                :zoom="zoom"
                :center="center"
                :bounds="bounds"
                :options="mapOptions"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"
        >
            <l-tile-layer
                    :url="url"
                    :attribution="attribution"
            />
            <v-marker-cluster v-if="marqueursActivite">
                <!-- eslint-disable-next-line -->
                <l-marker v-for="(marqueurActivite, index) in marqueursActivite" :key="`marqueurActivite-${index}`" v-if="getLatLng(marqueurActivite) !== null" :lat-lng="getLatLng(marqueurActivite)">
                    <l-popup>
                        <div>
                            <h3>{{marqueurActivite.equipement}} : {{marqueurActivite.activiteLibelle}}</h3><br>
                            <span v-if="marqueurActivite.niveauDeLActivite">Niveau : {{marqueurActivite.niveauDeLActivite}}<br></span>
                            Commune : {{marqueurActivite.nomDeLaCommune}}<br>
                            Nombre d'équipements : {{marqueurActivite.nombreEquipementsIdentiques}}
                        </div>
                    </l-popup>
                </l-marker>
            </v-marker-cluster>
            <v-marker-cluster v-if="marqueursInstallation">
                <!-- eslint-disable-next-line -->
                <l-marker v-for="(marqueurInstallation, index) in marqueursInstallation" :key="`marqueursInstallation-${index}`" v-if="getLatLng(marqueurInstallation) !== null" :lat-lng="getLatLng(marqueurInstallation)">
                    <l-popup>
                        <div>
                            <h3>{{marqueurInstallation.nomUsuelDeLInstallation}}</h3><br>
                            <span v-if="marqueurInstallation.installationParticuliere !== 'false'">{{marqueurInstallation.installationParticuliere}}<br></span>
                            {{marqueurInstallation.noDeLaVoie !== 'null' ? marqueurInstallation.noDeLaVoie : ''}} {{marqueurInstallation.nomDeLaVoie}}, {{marqueurInstallation.nomDeLaCommune}}<br>
                            Places de parking : {{marqueurInstallation.nombrePlaceParking}}<br>
                            <a v-on:click="detailsInstallation(marqueurInstallation.noDeLInstallation)">Voir toutes les informations</a>
                        </div>
                    </l-popup>
                </l-marker>
            </v-marker-cluster>
        </l-map>
    </div>
</template>

<script>
	import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
	import * as L from "leaflet";

	export default {
		name: 'Map',
		components: {
			LMap,
			LTileLayer,
			LMarker,
			LPopup
		},
		data () {
			return {
				zoom: 12,
				center: L.latLng(47.209274, -1.548773),
				//url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
				currentZoom: 12,
				currentCenter: L.latLng(47.209274, -1.548773),
				mapOptions: {
					zoomSnap: 0.5
				},
				bounds: null
			};
		},
		props: {
			marqueursActivite: Array,
			marqueursInstallation: Array,
			darkMode: Boolean
		},
		watch: {
			darkMode: function (newVal) {
				if (newVal)
					this.url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
				else
					this.url = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
			},
			marqueursActivite: function (newVal) {
				let latLngList= [];
				newVal.forEach(element => {
					let latLng = this.getLatLng(element);
					if (latLng !== null){
						latLngList.push([latLng.lat, latLng.lng]);
					}
				});
				this.bounds = L.latLngBounds(latLngList);
			},
			marqueursInstallation: function (newVal) {
				let latLngList= [];
				newVal.forEach(element => {
					let latLng = this.getLatLng(element);
					if (latLng !== null) {
						latLngList.push([this.getLatLng(element).lat, this.getLatLng(element).lng]);
					}
				});
				this.bounds = L.latLngBounds(latLngList);
			}
		},
		mounted() {
			if (this.darkMode)
				this.url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
			else
				this.url = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
		},
		methods: {
			detailsInstallation(noInstallation) {
				this.$root.$emit('installationDetailsClicked', noInstallation);
			},
			zoomUpdate (zoom) {
				this.currentZoom = zoom;
			},
			centerUpdate (center) {
				this.currentCenter = center;
			},
			getLatLng(elem) {
				let latSplit = elem.longitude.split(" ");
				if(latSplit.length > 1){
					latSplit = latSplit[1];
				} else {
					latSplit = latSplit[0];
				}

				//La base de donnée n'étant pas bien faite, il faut tester si les coordonnées sont bonnes
				try {
					return L.latLng(parseFloat(elem.latitude), parseFloat(latSplit));
				} catch (e) {
					return null;
				}
			}
		}
	};
</script>

<style>
    #map {
        z-index: 2;
        position: relative;
    }
    #map-map {
        height: 100%;
        position: absolute;
        bottom: 0;
    }

    .theme--dark .leaflet-popup-content-wrapper {
        background: #222 !important;
        color: white !important;
    }

    .theme--dark .leaflet-popup-tip {
        background: #222 !important;
    }
</style>