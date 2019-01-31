import Vue from 'vue';
import axios from 'axios';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import authentication from './modules/authentication/index';
import notifications from './modules/notifications/index';
import profile from './modules/profile/index';
import posts from './modules/posts/index';
import suggest from './modules/suggest/index';
import timeline from './modules/timeline/index';
import topics from './modules/topics/index';
import trend from './modules/trend/index';
import following from './modules/following/index';

import createMutationsSharer from 'vuex-shared-mutations';

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
    suggest
  },

  state,

  getters,

  actions,

  mutations,

  plugins: [createMutationsSharer({
		predicate: [
    'signupSuccess',
    'loginSuccess',
    'verified',
    'addToLikedPosts',
    'addToDisLikedPosts',
    'fillDisLikedPosts',
    'fillLikedPosts',
    'updatePost',
    'noAction',
    'logout',
    'truncateProfile',
    'addToFollowing',
    'removeFromFollowing',
    'addToMyFollowing',
    'removeFromMyFollowing',
    'showProfile',
    'loadMoreProfilePosts',
    'isFollow']
 }),
]

}
