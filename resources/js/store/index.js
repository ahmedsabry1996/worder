import Vue from 'vue';
import axios from 'axios';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import createMutationsSharer from 'vuex-shared-mutations';

export default {

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
