<template>
    <div class="gridlist">
        <v-container v-bind="{'grid-list-md': true}" fluid>
            <v-layout row wrap>
                <v-flex xs4 v-for="(marqueurActivite, index) in marqueursActivite" :key="`activite-${index}`">
                    <v-card flat tile>
                        <v-card-title>
                            {{marqueurActivite.activiteLibelle}}
                        </v-card-title>
                        <v-card-text>
                            Commune : {{marqueurActivite.nomDeLaCommune}}<br>
                            Niveau : {{marqueurActivite.niveauDeLActivite}}<br>
                            Nombre d'équipements : {{marqueurActivite.nombreEquipementsIdentiques}}
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
	export default {
		name: "GridList",
		props: {
			marqueursActivite: Array
		}
	}
</script>