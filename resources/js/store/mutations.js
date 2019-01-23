import Vue from 'vue';
export default{
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

console.log(45454545);
    },

    fillMyFollowing(state,payload){
        console.log(45454545);
    },

    fillMyTimeline(state,payload){

        state.showProfile = [];
        state.isFollow = null;
        state.profilePosts = [];
        state.timeline = [];
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

        if (typeof(payload) != "object") {

        liked.push(payload);
        if (disliked.indexOf(payload) != -1) {

              Vue.set(state.disLikedPosts,disliked.indexOf(payload),null);
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

          Vue.set(state.likedPosts,liked.indexOf(payload),null);

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

      if (typeof(payload.followed_id) == 'number') {

            state.following.push(payload.followed_id);
      }

      if (payload.followed_id.length !== 0  && typeof(payload.followed_id) == 'object' && state.following.length == 0) {
        state.following = payload.followed_id;
      }

      if (typeof(payload.followed_id) == 'object' && state.following.length !== 0) {
          payload.followed_id.map((val)=>{
            return state.following.push(val);
          })
      }

      //state.following = Array.from(new Set(state.following));

      Vue.set(state.profileFollowers, 0, payload.followers);
      Vue.set(state.profileFollowers, 1, payload.following);


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

    //  state.following = Array.from(new Set(state.following));


      Vue.set(state.profileFollowers, 0, payload.followers);
      Vue.set(state.profileFollowers, 1, payload.following);


    },
        addToMyFollowing(state,payload){

          if (typeof(payload) != 'object') {

                state.following.push(payload);
          }
          else{
              state.following = payload;
          }


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


        Vue.set(state.profileFollowers, 0, payload.followers);
        Vue.set(state.profileFollowers, 1, payload.following);


        console.log('its mine');
      }
else {

        state.showProfile = payload.profile;
        state.isFollow = payload.isFollow;
        state.profilePosts = payload.posts;
        console.log('it doesnt mine');
}

      Vue.set(state.profileFollowers, 0, payload.followers);
      Vue.set(state.profileFollowers, 1, payload.following);

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
}
