import Vue from 'vue';
export default{

      fillMyFollowingIds(state,payload){
        state.myFollowingIds = payload;
      },

      addToMyFollowingIds(state,payload){
        state.myFollowingIds.push(payload);
      },

      removeFromMyFollowingIds(state,payload){
        Vue.set(state.myFollowingIds,state.myFollowingIds.indexOf(payload),null)
      },


      pickMyFansNum(state,payload){
          state.myFollowersNum = payload.followers;
          state.myFollowingNum = payload.following;
      },

      fillMyFollowersProfiles(state,payload){
        state.myFollowersProfiles = payload;
        state.loadedFollowers = state.myFollowersProfiles.length;

      },

      addToMyFollowersProfiles(state,payload){
          payload.map((val)=>{
            state.myFollowersProfiles.push(val);

          })

          state.loadedFollowers = state.myFollowersProfiles.length;
          state.followersOffset +=50;
      },

      fillMyFollowingProfiles(state,payload){
        state.myFollowingProfiles = payload;
        state.loadedFollowing = state.myFollowingProfiles.length;
        console.log('addddddddddd');
        console.log(payload);
      },

      addToMyFollowingProfiles(state,payload){
          payload.map((val)=>{
            state.myFollowingProfiles.push(val);

          })
          state.loadedFollowing = state.loadedFollowing.length;

      },

}
