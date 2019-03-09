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
                    <v-layout justify-center align-center>
                        <Map />
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

	export default {
		name: 'app',
		components: {
			Map
		},
        data: () => ({
			drawer: true
		}),

		props: {
			source: String
		},
		mounted() {
			setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);
		}
	}
</script>
