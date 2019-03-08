import Vue from 'vue';
import App from './App.vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../node_modules/leaflet/dist/images/marker-shadow.png')
});

Vue.use(Vuetify);

new Vue({
  render: h => h(App),
}).$mount('#app');
