import Vue from 'vue';
export default{

    showProfile(state,payload){
      console.log(payload);
      state.currentProfile = payload.profile;
      state.followersNum = payload.followers;
      state.followingNum = payload.following;
      state.profilePosts = payload.posts;
      state.isFollow = payload.is_follow;
    },
    loadMoreProfilePosts(state,payload){

        payload.map((val)=>{
            state.profilePosts.push(val);
        })
    },

    followersNum(state,payload){
        state.followersNum = payload;
    },
    followingNum(state,payload){
      state.followingNum = payload
    },

  truncateProfile(state){
  state.currentProfile = [];
  state.followingNum= 0 ;
  state.followersNum= 0 ;
  state.isFollow = null;
  state.profilePosts = [];
  },
  deletePost(state,payload){
    state.profilePosts.splice(payload,1);
  },

  updateProfilePosts(state,payload){

    let posts = state.profilePosts;

    let postIndex = posts.findIndex((val)=>{
          return val.id == payload.id
    })

      Vue.set(state.profilePosts,postIndex,payload)


  }
}
