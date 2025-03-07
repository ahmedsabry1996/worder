import Vue from 'vue';
import axios from 'axios';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import createPersistedState from 'vuex-persistedstate';
import authentication from './modules/authentication/index';
import notifications from './modules/notifications/index';
import profile from './modules/profile/index';
import posts from './modules/posts/index';
import suggest from './modules/suggest/index';
import timeline from './modules/timeline/index';
import topics from './modules/topics/index';
import trend from './modules/trend/index';
import following from './modules/following/index';
import admin from './modules/admin/index';
import createCache from 'vuex-cache';
export default {

  modules:{
    authentication,
    timeline,
    posts,
    profile,
    following,
    trend,
    topics,
    notifications,
    suggest,
    admin
  },


  state,

  getters,

  mutations,

  plugins: [createPersistedState(),createCache()],

}
