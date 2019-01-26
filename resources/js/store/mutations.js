import Vue from 'vue';
export default{


    //posts
    fillMyPost(state,payload){
      state.myPosts = payload;
    },

    deletePost(state,payload){

        state.myPosts.splice(payload,1);

  },

    fillLikedPosts(state,payload){

      state.likedPosts=payload;

    },

    fillDisLikedPosts(state,payload){
      state.disLikedPosts=payload;

    },

    addToLikedPosts(state,payload){
      let liked = state.likedPosts;
      let disliked = state.disLikedPosts;

      if (typeof(payload) != "object") {

      Vue.set(liked,liked.length,payload);

      if (disliked.indexOf(payload) != -1) {

            Vue.set(state.disLikedPosts,disliked.indexOf(payload),null);
      }

    }
    else{
      payload.map((val)=>{

        liked.push(val)
      });
    }

    },

  addToDisLikedPosts(state,payload){

    console.log('typeof payload' , typeof(payload));
      let liked = state.likedPosts;
      let disliked = state.disLikedPosts;
      if (typeof(payload) !== "object") {


      Vue.set(disliked,disliked.length,payload);

      if(liked.indexOf(payload) != -1) {

        Vue.set(state.likedPosts,liked.indexOf(payload),null);

      }
    }
      else{

        payload.map((val)=>{

          disliked.push(val);
        });
      }


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

    let timelineposts = state.timeline.timeline;
    let profilePosts = state.profilePosts;


    let postIndexInTimeline = timelineposts.findIndex((val)=>{
          return val.id == payload.id
    })


    if (postIndexInTimeline != -1) {

      setTimeout(function(){
        Vue.set(state.timeline.timeline, postIndexInTimeline, payload.updatedPost);
      },500)
    }

     let postIndexInUserProfile = profilePosts.findIndex((val)=>{
          return val.id == payload.id
    });

    if (postIndexInUserProfile != -1) {
        Vue.set(state.profilePosts, postIndexInUserProfile, payload.updatedPost);
    }

  },




  //Notifications
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


    //Following
    fillMyFollowers(state,payload){

        if (state.myFollowers.length === 0) {
          state.myFollowers = payload;
        }

        else {
            payload.map((val)=>{
              state.myFollowers.push(val);
            });
        }
        state.myFollowers = Array.from(new Set(state.myFollowers));


    },

    fillMyFollowing(state,payload){
      if (state.myFollowing.length === 0) {
        state.myFollowing = payload;
      }

      else {
          payload.map((val)=>{
            state.myFollowing.push(val);
          });
      }
      state.myFollowing = Array.from(new Set(state.myFollowing));

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




          },
              addToMyFollowing(state,payload){

                if (typeof(payload) != 'object') {

                      state.following.push(payload);
                }
                else{
                    state.following = payload;
                }


              },
              myFollowingIds(state,payload){
                console.log('ttt');
                console.log(typeof(payload));

                if (typeof(payload) !== 'object') {
                  if (state.myFollowingIds.indexOf(payload) != -1) {
                      Vue.set(state.myFollowingIds,state.myFollowingIds.indexOf(payload),null);
                  }
                  else{
                    state.myFollowingIds.push(payload);
                  }

                }
                else{

              payload.map((val)=>{
                state.myFollowingIds.push(val);
              })
                }
                state.myFollowingIds = Array.from(new Set(state.myFollowingIds));

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

          isFollow(state,payload){
            state.isFollow = payload;
          },

          //suggestion
    suggestedPeople(state,payload){
      state.suggestedPeople = payload;
    },


    //profile
        showProfile(state,payload){

          if (payload.profile.profile.user_id == state.authentication.userId) {
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
    truncateProfile(state){
      state.showProfile = [];
      state.profileFollowers[0]= 0 ;
      state.profileFollowers[1]= 0 ;
      state.isFollow = null;
      state.profilePosts = [];
    },
    loadMoreProfilePosts(state,payload){

      payload.map((val)=>{
      return  state.profilePosts.push(val);
      })
      state.myPosts = state.profilePosts;
    },

  //trend
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
