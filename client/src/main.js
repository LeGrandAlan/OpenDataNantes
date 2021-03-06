import Vue from 'vue';
import App from './App.vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import Vuetify from 'vuetify';
import VuetifyConfirm from 'vuetify-confirm';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vuetify/dist/vuetify.min.css'
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

Vue.config.productionTip = false;

/** Debut : sert à débuguer la librairie Vue2Leaflet **/
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../node_modules/leaflet/dist/images/marker-shadow.png')
});
/** Fin **/

//utilisation des icons font-awesome
Vue.use(Vuetify, {
  iconfont: 'fa'
});
//utilisation d'une fenêtre modale
Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Je n\'affiche pas',
  buttonFalseText: 'J\'affiche',
  color: 'warning',
  icon: 'warning',
  title: 'Attention',
  width: 350,
  property: '$confirm'
});
//utilisation d'une librairie de clusterisation des "markers" de la carte
Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster);

new Vue({
  render: h => h(App),
}).$mount('#appHtml'); //charge l'application dans la fichier index.html (../../public/index.html)
