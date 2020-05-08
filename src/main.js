import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faChevronLeft, 
  faChevronRight,
  faArrowCircleRight} 
  from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft, faChevronRight, faArrowCircleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
