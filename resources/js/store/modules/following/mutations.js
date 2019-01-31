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


      fillMyFollowersProfiles(state,payload){
        state.myFollowersProfiles = payload;
      },

      addToMyFollowersProfiles(state,payload){
          payload.map((val)=>{
            state.myFollowersProfiles.push(val);

          })

      },

      fillMyFollowingProfiles(state,payload){
        state.myFollowingProfiles = payload;
      },

      addToMyFollowingProfiles(state,payload){
          state.myFollowingProfiles.push(payload);
      },

}
