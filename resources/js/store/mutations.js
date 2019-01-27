import Vue from 'vue';
export default{
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
              // myFollowingIds(state,payload){
              //   console.log('ttt');
              //   console.log(typeof(payload));
              //
              //   if (typeof(payload) !== 'object') {
              //     if (state.myFollowingIds.indexOf(payload) != -1) {
              //         Vue.set(state.myFollowingIds,state.myFollowingIds.indexOf(payload),null);
              //     }
              //     else{
              //       state.myFollowingIds.push(payload);
              //     }
              //
              //   }
              //   else{
              //
              // payload.map((val)=>{
              //   state.myFollowingIds.push(val);
              // })
              //   }
              //   state.myFollowingIds = Array.from(new Set(state.myFollowingIds));
              //
              // },
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
