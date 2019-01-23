import Vue from 'vue';
import axios from 'axios';
import actions from './actions';
import mutations from './mutations';
import createMutationsSharer from 'vuex-shared-mutations';
import {currentUser,
  currentUserProfile
  ,currentUserTopics
  ,userToken
  ,isVerified
  ,verificationCode
  ,userId
  ,hasProfile
  ,email
  ,password
  ,newTrend}  from './../auth';
import {localStorageSettter} from './../localstorage.js';
const USER = currentUser();
const USER_PROFILE = currentUserProfile();
const USER_TOPICS = currentUserTopics();
const ACCESS_TOKEN = userToken();
const IS_VERIFIED = isVerified();
const VERIFICATION_CODE  = verificationCode();
const USER_ID = userId();
const HAS_PROFILE = hasProfile();
const EMAIL = email();
const PASSWORD = password();
const TREND = newTrend();

export default {

  state:{
        isLoggedIn:!!USER,
        signupErrors:null,
        currentUser:USER,
        currentUserProfile: USER_PROFILE,
        currentUserTopics : USER_TOPICS,
        userToken:ACCESS_TOKEN,
        isVerified:IS_VERIFIED,
        verificationCode:VERIFICATION_CODE,
        hasProfile:HAS_PROFILE,
        userId :USER_ID,
        email:EMAIL,
        password:PASSWORD,
        notifications:[],
        unreadNotifications:false,
        topics:['politics',
                'sport',
                'films',
                'love',
                'economy',
                'trade',
                'industry',
                'travel',
                'migration',
                'education'],
        countries:['Turkey','Egypt','Filstin'],

        timeline:[],
        posts:[],
        myPosts:[],
        likedPosts:[],
        disLikedPosts:[],
        publishingPostErrors:[],

        followers:[],
        following:[],
        myFollowers:[],
        myFollowing:[],
        suggestedPeople:[],

        showProfile:{profile:0},
        profilePosts:[],
        profileFollowers:[0,0],
        isFollow:null,
        trend:TREND,
        newTrend:false
  },

  getters:{

    isLoggedIn(state){
      return  state.isLoggedIn;
    },

    currentUser(state){
      return state.currentUser;
    },

    currentUserProfile(state){
      return state.currentUserProfile;
    },
    currentUserTopics(state){
      return  state.currentUserTopics;
    },
    userToken(state){
      return state.userToken;
    },

    signupErrors(state){
      return state.signupErrors;
    },

    verificationCode(state){
      return state.verificationCode;
    },

    isVerified(state){
      return state.isVerified;
    },


    hasProfile(state){
        return state.hasProfile;
    },

    countries(state){
      return state.countries;
    },

    topics(state){
      return state.topics;
    },

    posts(state){
      return state.posts;
    },
    myPosts(state){
      return state.myPosts;
    },
    timeline(state){
      return state.timeline;
    },
    likedPosts(state){
      return  state.likedPosts;
    },
    disLikedPosts(state){
      return  state.disLikedPosts;
    },

    followers(state){
      return state.followers;
    },
    following(state){
      return state.following;
    },
    suggestedPeople(state){
      return state.suggestedPeople;
    },
    myFollowers(state){
      return state.myFollowers;
    },
    myFollowing(state){
      return  state.myFollowing;
    },

    showProfile(state){
      return state.showProfile;
    },

    isFollow(state){
      return state.isFollow;
    },
    profileFollowers(state){
        return  state.profileFollowers;
    },
    profilePosts(state){
      return state.profilePosts;
    },
    notifications(state){
      return state.notifications;
    },
    unreadNotifications(state){
      return state.unreadNotifications;
    },
    trend(state){
        return state.trend;
    },
    newTrend(state){
      return  state.newTrend;
    }
  },

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
