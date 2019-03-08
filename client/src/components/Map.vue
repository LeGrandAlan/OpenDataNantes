<template>
    <div>
        <div style="height: 20vh; overflow: auto;">
            <h3>Simple map</h3>
            <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
            <p> Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }} </p>
            <button @click="showLongText">Toggle long popup</button>
        </div>
        <l-map
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                style="height: 80vh"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"
        >
            <l-tile-layer
                    :url="url"
                    :attribution="attribution"
            />
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
        </l-map>
    </div>
</template>

<script>
	import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';
	import * as L from "leaflet";

	export default {
		name: 'Simple',
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
			showLongText () {
				this.showParagraph = !this.showParagraph;
			},
			innerClick () {
				alert('Click!');
			}
		}
	};
</script>