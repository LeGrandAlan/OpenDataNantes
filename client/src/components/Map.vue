<template>
    <div id="map">
        <div>

        </div>
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
            <v-marker-cluster>
                <l-marker :lat-lng="withPopup">
                    <l-popup>
                        <div @click="innerClick">
                            I am a popup
                            <p v-show="showParagraph">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.
                            </p>
                        </div>
                    </l-popup>
                </l-marker>
                <l-marker :lat-lng="withTooltip">
                    <l-tooltip :options="{permanent: true, interactive: true}">
                        <div @click="innerClick">
                            I am a tooltip
                            <p v-show="showParagraph">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.
                            </p>
                        </div>
                    </l-tooltip>
                </l-marker>
            </v-marker-cluster>
        </l-map>
    </div>
</template>

<script>
	import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';
	import * as L from "leaflet";

	export default {
		name: 'Map',
		components: {
			LMap,
			LTileLayer,
			LMarker,
			LPopup,
			LTooltip
		},
		data () {
			return {
				zoom: 12,
				center: L.latLng(47.209274, -1.548773),
				//url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				url: ' https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
				withPopup: L.latLng(47.209274, -1.648773),
				withTooltip: L.latLng(47.209274, -1.548773),
				currentZoom: 12,
				currentCenter: L.latLng(47.209274, -1.548773),
				showParagraph: false,
				mapOptions: {
					zoomSnap: 0.5
				}
			};
		},
		methods: {
			zoomUpdate (zoom) {
				this.currentZoom = zoom;
			},
			centerUpdate (center) {
				this.currentCenter = center;
			},
			innerClick () {
				alert('Click!');
			}
		}
	};
</script>

<style>
    #map {
        width: 100%;
        height: 100%;
        z-index: 2;
        position: relative;
    }
    #map-map {
        height: 70%;
        position: absolute;
        bottom: 0;
    }
</style>