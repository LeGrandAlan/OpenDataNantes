<template>
    <div id="map">
        <l-map
                id="map-map"
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"
        >
            <l-tile-layer
                    :url="url"
                    :attribution="attribution"
            />
            <v-marker-cluster v-if="marqueursActivite">
                <l-marker v-for="(marqueurActivite, index) in marqueursActivite" :key="`marqueurActivite-${index}`" :lat-lng="getLatLng(marqueurActivite)">
                    <l-popup>
                        <div>
                            <h3>{{marqueurActivite.activiteLibelle}}</h3><br>
                            {{marqueurActivite.niveauDeLActivite}}<br>
                            {{marqueurActivite.nomDeLaCommune}}<br>
                            Nombre d'équipements : {{marqueurActivite.nombreEquipementsIdentiques}}
                        </div>
                    </l-popup>
                </l-marker>
            </v-marker-cluster>
            <v-marker-cluster v-if="marqueursInstallation">
                <l-marker v-for="(marqueurInstallation, index) in marqueursInstallation" :key="`marqueursInstallation-${index}`" :lat-lng="getLatLng(marqueurInstallation)">
                    <l-popup>
                        <div>
                            <h3>{{marqueurInstallation.nomUsuelDeLInstallation}}</h3><br>
                            {{marqueurInstallation.installationParticuliere}}<br>
                            {{marqueurInstallation.noDeLaVoie}} {{marqueurInstallation.nomDeLaVoie}} {{marqueurInstallation.nomDeLaCommune}}<br>
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
				url: ' https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
				currentZoom: 12,
				currentCenter: L.latLng(47.209274, -1.548773),
				mapOptions: {
					zoomSnap: 0.5
				}
			};
		},
		props: {
			marqueursActivite: Array,
			marqueursInstallation: Array
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
				return L.latLng(parseFloat(elem.latitude), parseFloat(latSplit));
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
</style>