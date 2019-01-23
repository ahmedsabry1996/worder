import Vue from 'vue';
import axios from 'axios';

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

  actions:{


        signup(context,credionals){

        return new Promise ((resolve,reject)=>{

            axios.post("/api/auth/signup",credionals)
            .then((response)=>{

              console.log(response.data);

              localStorageSettter('current_user',JSON.stringify(response.data.user))
              localStorageSettter('access_token',response.data.access_token.accessToken);
              localStorageSettter('verification_code',response.data.verification_code);
              localStorageSettter('user_id',response.data.user.id);
              context.commit('signupSuccess');
              resolve();

            })
            .catch((errors)=>{

                console.log(errors.response);
                console.log(errors.response.data.errors);
                context.commit('signupFails',errors.response.data.errors);
                reject();
            })
        })
      },

    //for signup
        confrimEmail(context){
            let userId = (context.state.currentUser).id;
                axios.post("/api/auth/verify/"+userId)
                .then((response)=>{
                  console.log(response);
                  localStorageSettter("user_id",userId);
                  localStorageSettter("is_verified",1);
                  context.commit('verified');

                })
                .catch((errors)=>{
                  console.log(errors.response);
                });

      },

    //the 3rd condition in login
        sendVerificationCode(context,email,token){

                return new Promise(function(resolve, reject) {
                  axios.post("/api/auth/sendcode",{
                    email,
                  },{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                  })
                  .then((response)=>{
                    console.log(response.data);
                    localStorageSettter('verification_code',response.data.verification_code);
                    context.commit('signupSuccess');
                    resolve()
                  })

                  .catch((errors)=>{
                    console.log(errors.response);
                  })
                });
            },

        accountCreated(context){

              localStorage.removeItem('verification_code');
              localStorage.setItem('has_profile',"1");
              context.commit('accountCreated');
    },

        createPost(context,post){


        return new Promise(function(resolve, reject) {
          axios.post("/api/post/create-post",post,
          {
            headers:{
              "Authorization": `Bearer  ${context.state.userToken}`,
            }
          }
          )
          .then((response)=>{
              console.log(response);
              return resolve();
          })
          .catch((errors)=>{
              console.log(errors);
              console.log(errors.response);
              return reject();

          })
        });
      },


        deletePost(context,post){

          axios.get(`/api/post/delete-post/${post.id}`,
          {
            headers:{
              Authorization:`Bearer ${context.state.userToken}`,
            },
          }).then((response)=>{
              console.log(response.data);
          }).catch((errors)=>{
              console.log(errors);
              console.log(errors.response);
          });
      },

        timeline(context){
          if(context.state.isLoggedIn){
        axios.post('/api/timeline/posts',{},{
          headers:{
            "Authorization":`Bearer ${context.state.userToken}`,
            "X-Requested-With":"XMLHttpRequest"
          },

        }).then((response)=>{


            console.log(response.data);

            context.commit('fillLikedPosts',response.data.posts_liked_by_current_user);
            context.commit('fillDisLikedPosts',response.data.posts_disliked_by_current_user);
            context.commit('fillMyTimeline',response.data.posts);

        }).catch((errors)=>{
            console.log(errors);
            console.log(errors.response);
        })}
      },

        loadMore(context,data){

          axios.post(`/api/${data.url}`,{
              offset:data.offset,
              user_id:data.userId
          },{
            headers:{
              "Authorization":`Bearer ${context.state.userToken}`,
            }
          })
          .then((response)=>{
              console.log(response.data);

              //timeline posts
              if (data.url == 'timeline/load-more') {
                context.commit('loadMore',response.data.loaded_posts);

              context.commit('addToLikedPosts',response.data.liked_posts);
              context.commit('addToDisLikedPosts',response.data.disliked_posts);


              }

              //profile posts
              else {
                if (response.data.loaded_posts.length > 0 ) {
                  console.log(response.data.loaded_posts);
                  context.commit('loadMoreProfilePosts',response.data.loaded_posts);
                }
              }

          })
          .catch((errors)=>{
            console.log(errors);
            console.log(errors.response);
          })
      },

        getNotifications(context){

              axios.post('/api/timeline/notifications',{},{
                headers:{
                  "Authorization":`Bearer ${context.state.userToken}`
                }
              }).then((response)=>{

                  console.log(response.data);
                  context.commit('fillNotifications',response.data.all_notifications);
              }).catch((errors)=>{
                  console.log(errors);
                  console.log(errors.response);
              })

        },

        unreadNotifications(context){
          axios.post('/api/timeline/unread-notifications',{},{
            headers:{
              Authorization:`Bearer ${context.state.userToken}`
            },
          })
          .then((response)=>{

              if (response.data.unread) {
                  context.commit('unreadNotifications');
              }
          })
          .catch((errors)=>{
            console.log(errors);
            console.log(errors.response);
          })
        },

        suggestPeople(context){
      axios.get('/api/timeline/suggest-people',{
          headers:{

          "Authorization" :`Bearer ${context.state.userToken}`

          }
      })
      .then((response)=>{

        //console.log("sugg",response.data);
        let suggested = response.data.suggest_people;
        context.commit('suggestedPeople',suggested);

      })
      .catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
      })
    },

        toggleFollow(context,payload){
          if (payload.action == 'follow') {
            context.commit('addToFollowing',payload.followed_id);

          }
          else{
            context.commit('removeFromFollowing',payload.followed_id);

          }
        axios.post('/api/timeline/follow',{
          followed_id:payload.followed_id
        },{

          headers:{
            "Authorization" : `Bearer ${context.state.userToken}`
          }
        })
        .then((response)=>{

          let action = response.data.action;
          if (action == 'follow') {
              context.commit('addToFollowing',payload.followed_id);
              context.commit('isFollow',true);
          }
          else{
            context.commit('removeFromFollowing',payload.followed_id);
            context.commit('isFollow',false);
          }
          console.log(action);
        })
        .catch((errors)=>{
          console.log(errors);
          console.log(errors.response);
        })
      },

        toggleMyFollow(context,payload){
          if (payload.action == 'follow') {
            context.commit('addToFollowing',payload.followed_id);

          }
          else{
            context.commit('removeFromFollowing',payload.followed_id);

          }
        axios.post('/api/timeline/follow',{
          followed_id:payload.followed_id
        },{

          headers:{
            "Authorization" : `Bearer ${context.state.userToken}`
          }
        })
        .then((response)=>{

          let action = response.data.action;
          if (action == 'follow') {
              context.commit('addToMyFollowing',payload.followed_id);
              context.commit('isFollow',true);
          }
          else{
            context.commit('removeFromMyFollowing',payload.followed_id);
            context.commit('isFollow',false);
          }
          console.log(action);
        })
        .catch((errors)=>{
          console.log(errors);
          console.log(errors.response);
        })
      },

        showProfile(context,displayName){

            axios.get(`/api/user/${displayName}`,{
              headers:{
                "Authorization" :`Bearer ${context.state.userToken}`
              }
            })
            .then((response)=>{
                context.commit('showProfile',{profile:response.data.profile,
                                                posts:response.data.posts,
                                                followers:response.data.profile.follower_counter,
                                                isFollow:response.data.is_follow});
      console.log("ddd");
      console.log(response.data.profile);

            })
            .catch((errors)=>{
                console.log(errors);
                console.log(errors.response);
            })
      },

        showFans(context,offset=0){
              axios.post('/api/timeline/fans',{
                offset:offset,
              },

        {
            headers:{"Authorization":`Bearer ${context.state.userToken}`
        }})
        .then((response)=>{

            context.commit('fillMyFollowers',response.data.followers);
            context.commit('fillMyFollowing',response.data.following);
            context.commit('addToFollowing',response.data.following_id);
            console.log(response.data.following_id);
            console.log('offfffset',offset);
      })
        .catch((errors)=>{
          alert('error')
          console.log(errors);
          console.log(errors.response);
  });

      }



  },

  mutations:{

    signupFails(state,payload){

state.signupErrors = payload;

},

    signupSuccess(state){
        state.currentUser = JSON.parse(localStorage.getItem("current_user"));
        state.currentUserProfile = JSON.parse(localStorage.getItem("current_user_profile"));
        state.userToken = localStorage.getItem("access_token");
        state.verificationCode = localStorage.getItem("verification_code");
        state.userId = localStorage.getItem('user_id');
        state.signupErrors = null;
  },
  updateUser(state){
    state.currentUser = JSON.parse(localStorage.getItem("current_user"));
  },
  updateProfile(state){
    state.currentUserProfile = JSON.parse(localStorage.getItem("current_user_profile"));
  },
    verified(state){

            state.isVerified = localStorage.getItem('is_verified');
            state.userId = localStorage.getItem('user_id');
            state.isLoggedIn = true;
            state.signupErrors = null;

        },

    accountCreated(state){

      state.verificationCode = localStorage.getItem("verification_code");
      state.hasProfile = localStorage.getItem('has_profile');

  },

    loginSuccess(state,payload){

    state.currentUser = JSON.parse(localStorage.getItem("current_user"));
    state.currentUserProfile = JSON.parse(localStorage.getItem("current_user_profile"));
    state.currentUserTopics = JSON.parse(localStorage.getItem("current_user_topics"));
    state.missedNotifications = payload;
    state.userToken = localStorage.getItem("access_token");
    state.hasProfile = localStorage.getItem('has_profile');
    state.isVerified = localStorage.getItem('is_verified');
    state.userId = localStorage.getItem('user_id');
    state.isLoggedIn = !!state.currentUser;
    state.loginErrors = null;
  },

    userHasProfile(state){
    state.hasProfile = localStorage.getItem('has_profile');
  },

    needProfile(state){
    state.currentUser = JSON.parse(localStorage.getItem("current_user"))
    state.isVerified = localStorage.getItem('is_verified');
    state.hasProfile = localStorage.getItem('has_profile');
    state.userToken = localStorage.getItem("access_token");
    state.userId = localStorage.getItem("user_id");
    state.isLoggedIn = !!(localStorage.getItem("current_user"));
    state.loginErrors = null;

  },

    userCredionals(state){
    state.email = localStorage.getItem('email');
    state.password = localStorage.getItem('password');
  },

    fillMyPost(state,payload){
      state.myPosts = payload;
    },

    deletePost(state,payload){

        state.myPosts.splice(payload,1);

  },
    fillNotifications(state,payload){
    state.notifications = payload;
    state.unreadNotifications = false;
    },
    unreadNotifications(state){
      state.unreadNotifications = true;
    },
    PushToNotificatiosn(state,payload){

          payload.map((val)=>{
              state.notifications.push(val);
          });
    },
    fillMyFollowers(state,payload){
      state.following = Array.from(new Set(state.following));

        let followers = state.myFollowers;
        console.log('er',payload.length);
        if (payload.length !== 0) {

        payload.map((val)=>{
            return followers.push(val);
        });
        console.log('added to followers');
        }
        state.following = Array.from(new Set(state.following));

    },

    fillMyFollowing(state,payload){
      state.following = Array.from(new Set(state.following));

      let  following = state.myFollowing;
        console.log('ing',payload.length);
          if (payload.length !== 0) {


        payload.map((val)=>{
            return following.push(val);
        });
        state.following = Array.from(new Set(state.following));

        console.log('added to following');
}
    },

    fillMyTimeline(state,payload){

        state.showProfile = [];
        state.isFollow = null;
        state.profilePosts = [];

            payload.map((value)=>{

                    state.timeline.push(value);
                    state.timeline = Array.from(new Set(state.timeline));

            });

      //state.timeline = Array.from(new Set(state.timeline));

      },

    fillLikedPosts(state,payload){

        state.likedPosts=payload;

        state.likedPosts = Array.from(new Set(state.likedPosts));

      },

    fillDisLikedPosts(state,payload){
        state.disLikedPosts=payload;
        state.disLikedPosts = Array.from(new Set(state.disLikedPosts));

      },

    addToLikedPosts(state,payload){
        let liked = state.likedPosts;
        let disliked = state.disLikedPosts;

        if (typeof(payload) !== "object") {

        liked.push(payload);
        if (disliked.indexOf(payload) !== -1) {

              disliked.splice(disliked.indexOf(payload),1);
        }

      }
      else{
        payload.map((val)=>{
          liked.push(val);
        });
      }

        state.likedPosts = Array.from(new Set(state.likedPosts));

      },

    addToDisLikedPosts(state,payload){

      console.log('typeof payload' , typeof(payload));
        let liked = state.likedPosts;
        let disliked = state.disLikedPosts;
        if (typeof(payload) !== "object") {

        disliked.push(payload);

        if(liked.indexOf(payload) !== -1) {

                      liked.splice(liked.indexOf(payload),1);
        }
      }
        else{

          payload.map((val)=>{
            disliked.push(val);

          });
        }
        state.disLikedPosts = Array.from(new Set(state.disLikedPosts));

      },

    noAction(state,payload){

        let liked = state.likedPosts;
        let disliked = state.disLikedPosts;

              if (liked.indexOf(payload) !== -1) {
                    liked.splice(liked.indexOf(payload),1);
              }

                if (disliked.indexOf(payload) !== -1) {
                disliked.splice(disliked.indexOf(payload),1);
      }

      state.likedPosts = Array.from(new Set(state.likedPosts));
      state.disLikedPosts = Array.from(new Set(state.disLikedPosts));

    },

    updatePost(state,payload){

      let timelineposts = state.timeline;
      let profilePosts = state.profilePosts;


      let postIndexInTimeline = timelineposts.findIndex((val)=>{
            return val.id == payload.id
      })


      if (postIndexInTimeline != -1) {
        setTimeout(function(){
          Vue.set(state.timeline, postIndexInTimeline, payload.updatedPost);

        },500)

      }

       let postIndexInUserProfile = profilePosts.findIndex((val)=>{
            return val.id == payload.id
      });

      if (postIndexInUserProfile != -1) {

        setTimeout(function () {
          Vue.set(state.profilePosts, postIndexInUserProfile, payload.updatedPost);

        },500)
      }

    },

    loadMore(state,payload){

        payload.map((value)=>{
          state.timeline.push(value);
        });

        state.timeline = Array.from(new Set(state.timeline));

    },

    truncateTimeline(state){
      state.timeline = [];
    },

    suggestedPeople(state,payload){
      state.suggestedPeople = payload;
    },

    addToFollowing(state,payload){

      state.following = Array.from(new Set(state.following));

      if (typeof(payload) == 'number') {

            state.following.push(payload);
      }

      if (payload.length !== 0  && typeof(payload) !== 'number' && state.following.length == 0) {
        state.following = payload;
      }

      if (Array.isArray(payload) && state.following.length !== 0) {
          payload.map((val)=>{
            return state.following.push(val);
          })
      }
      state.following = Array.from(new Set(state.following));

      console.log(state.following);
      state.profileFollowers [0] = state.profileFollowers [0]+1;

    },

        addToMyFollowing(state,payload){

          if (typeof(payload) != 'object') {

                state.following.push(payload);
          }
          else{
              state.following = payload;
          }

          state.profileFollowers [1] = state.profileFollowers [1]+1;

        },
    removeFromFollowing(state,payload){

      let following = state.following ;

      let isInFollowing = following.findIndex((value,index)=>{
            return value == payload;
      });
      if (isInFollowing !== -1) {
          following.splice(isInFollowing,1)
      }

      let updateFollowing = following.filter((val)=>{
            return val !== payload;
      });

      state.following = Array.from(new Set(state.following));

      state.profileFollowers [0] = state.profileFollowers [0]-1;


    },

    removeFromMyFollowing(state,payload){

      let following = state.following ;

      let isInFollowing = following.findIndex((value,index)=>{
            return value == payload;
      });
      if (isInFollowing !== -1) {
          following.splice(isInFollowing,1)
      }


        let updateFollowing = following.filter((val)=>{
              return val !== payload;
        });

            state.following = Array.from(new Set(state.following));
            state.profileFollowers [1] = state.profileFollowers [1]-1;

    },


    showProfile(state,payload){

      if (payload.profile.profile.user_id == state.userId) {
        state.following = Array.from(new Set(state.following));
        state.showProfile = payload.profile;
        state.isFollow = payload.isFollow;
        state.profilePosts = payload.posts;
        state.myPosts = state.profilePosts;

        if (payload.followers !== null) {

          state.profileFollowers[0] = payload.followers.followers;
          state.profileFollowers[1] = payload.followers.following;

        }
        else{
          state.profileFollowers[0]= 0 ;
          state.profileFollowers[1]= 0 ;
        }
        console.log('its mine');
      }
else {

        state.showProfile = payload.profile;
        state.isFollow = payload.isFollow;
        state.profilePosts = payload.posts;
        console.log('it doesnt mine');
}
      if (payload.followers !== null) {

        state.profileFollowers[0] = payload.followers.followers;
        state.profileFollowers[1] = payload.followers.following;

      }
      else{
        state.profileFollowers[0]= 0 ;
        state.profileFollowers[1]= 0 ;
      }
      state.following = Array.from(new Set(state.following));

    },

    isFollow(state,payload){
      state.isFollow = payload;
    },

    loadMoreProfilePosts(state,payload){

      payload.map((val)=>{
      return  state.profilePosts.push(val);
      })
      state.myPosts = state.profilePosts;
    },

    truncateProfile(state){
      state.showProfile = [];
      state.profileFollowers[0]= 0 ;
      state.profileFollowers[1]= 0 ;
      state.isFollow = null;
      state.profilePosts = [];
      state.myFollowers = [];
      state.myFollowing = [];

    },

    logout(state){
    state.currentUser = JSON.parse(localStorage.getItem("current_user"));
    state.currentUserProfile = JSON.parse(localStorage.getItem("current_user_profile"));
    state.currentUserTopics = JSON.parse(localStorage.getItem("current_user_profile"));
    state.trend = JSON.parse(localStorage.getItem('trend'));
    state.userToken = localStorage.getItem("access_token");
    state.hasProfile = localStorage.getItem('has_profile');
    state.isVerified = localStorage.getItem('is_verified');
    state.userId = localStorage.getItem("userId");
    state.verificationCode = localStorage.getItem('verification_code');
    state.email = localStorage.getItem('email');
    state.password = localStorage.getItem('password');
    state.isLoggedIn = !!state.currentUser;
    state.loginErrors = null;
    state.posts = [];
    state.myPosts = [];
    state.publishingPostErrors = [];
    state.timeline = [];
    state.likedPosts = [];
    state.disLikedPosts = [];
    state.followers=[];
    state.following=[];
    state.myFollowers=[];
    state.myFollowing=[];
    state.suggestedPeople=[];
    state.showProfile=[];
    state.profilePosts=[];
    state.profileFollowers=[0,0];
    state.isFollow=null;
  },
  trend(state){
    state.trend = JSON.parse(localStorage.getItem('trend'));
  },
  newTrend(state){
    state.newTrend = true ;
  },
  newTrendOff(state){
    state.newTrend = false ;

  }
},
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
