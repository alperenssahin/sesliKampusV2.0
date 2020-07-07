import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as firebase from "firebase";
Vue.config.productionTip = false
const configOptions = {
  apiKey: "AIzaSyCB5zHxi6STSjTbB1G8FtPSNkK2Y5byYeo",
  databaseURL: "https://seslikampus.firebaseio.com/",
  storageBucket: "gs://seslikampus.appspot.com",
};
firebase.initializeApp(configOptions);
window.db = firebase.database();
window.sto = firebase.storage();
// window.player = new  Player();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
