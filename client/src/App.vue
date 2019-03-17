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
                    <v-list-tile v-on:click="currentComponent = 'RechercheActivite'">
                        <v-list-tile-action>
                            <v-icon>fas fa-dumbbell</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Activités</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-on:click="currentComponent = 'RechercheInstallations'">
                        <v-list-tile-action>
                            <v-icon>fas fa-warehouse</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Installations</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed clipped-left>
                <v-toolbar-side-icon  v-on:click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>OpenDataNantes</v-toolbar-title>
            </v-toolbar>
            <v-content>
                <!--<keep-alive>-->
                <component v-if="currentComponent === 'DetailsInstallation'" :noInstallation="noInstallation" v-bind:is="currentComponent"></component>
                <component v-else v-bind:is="currentComponent"></component>
                <!--</keep-alive>-->
            </v-content>
            <v-footer app fixed>
                <span>&copy; 2019</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
	import RechercheActivite from './components/RechercheActivite.vue';
	import RechercheInstallations from './components/RechercheInstallations.vue';
	import DetailsInstallation from './components/DetailsInstallation.vue';

	export default {
		name: 'app',
		components: {
			RechercheActivite,
			RechercheInstallations,
			DetailsInstallation
		},
		data: () => ({
			drawer: true,
			currentComponent: null,
			noInstallation: null
		}),
		mounted() {
			this.$root.$on('installationDetailsClicked', (noInstallation) => {
				this.currentComponent = 'DetailsInstallation';
				this.noInstallation = noInstallation;
			})
		}
	}
</script>
