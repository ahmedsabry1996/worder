require('./bootstrap');
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import vuexI18n from 'vuex-i18n';
import axios from 'axios';
import storeData from './store/index';
import {routes} from './routes';
import Home from './components/Home.vue';
import swal from 'sweetalert';
import Toastr from 'vue-toastr';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp as n,faThumbsDown as b  }  from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as m,faThumbsDown as d ,faQuoteLeft as q,faTrashAlt,faBell,faAward }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import Popover  from 'vue-js-popover';
import VueProgressBar from 'vue-progressbar'
import en from './locale/en';
import ar from './locale/ar';
import tr from './locale/tr';
library.add(n,b,m,d,q,faTrashAlt,faBell,faAward);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Popover,{ tooltip: true });
Vue.use(vueNumeralFilterInstaller,{ locale: 'en' });
//Vue.use(BootstrapVue);

Vue.use(VueProgressBar, {
  color: 'green',
  failedColor: 'red',
  thickness: '3px',

})
require('vue-toastr/src/vue-toastr.scss');
require('vue2-animate/dist/vue2-animate.min.css')

Vue.use(Toastr,{
	defaultTimeout: 3000,
	defaultProgressBar: false,
	defaultProgressBarValue: 0,
	defaultPosition: "toast-top-right",
});
const router = new VueRouter({
  routes,
  mode:'history'
});

const store = new Vuex.Store(storeData);

Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('en', en);
Vue.i18n.add('ar', ar);
Vue.i18n.add('tr', tr)
Vue.i18n.set('trd');

Vue.i18n.fallback('en');
router.beforeEach((to,from,next)=>{
  window.scrollTo(0,0);

  if (to.path !== "/login" && to.path !== "/signup" && to.path !== '/' && to.path !== '/create-profile') {

      if (store.state.authentication.isLoggedIn == true && store.state.authentication.hasProfile == "1" && store.state.authentication.isVerified == "1") {
          next();
      }
      else{
        console.log("need to v or p or lo");
        next('/')
      }
  }
  else{
    next();
  }

});

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
};
var vm = new Vue({
    el: '#app',
    store,
    router,
    components:{
      homePage:Home,
    }
});
