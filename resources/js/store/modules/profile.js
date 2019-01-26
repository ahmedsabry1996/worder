import Vue from 'vue';
export default{
  
  state:{

    showProfile:{profile:0},
    profileFollowers:[0,0],
    myPosts:[],

  },

  getters:{
    showProfile(state){
      return state.showProfile;
    },

    profileFollowers(state){
        return  state.profileFollowers;
    },
    profilePosts(state){
      return state.profilePosts;
    },
  },

  mutations:{
    showProfile(state,payload){
      if (!!payload.isMyProfile) {
        state.showProfile = payload.profile;
        state.isFollow = payload.isFollow;
        state.profilePosts = payload.posts;


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

  },

  actions:{
    showProfile(context,displayName,rootState){

        axios.get(`/api/user/${displayName}`,{
          headers:{
            "Authorization" :`Bearer ${context.rootState.authentication.userToken}`
          }
        })
        .then((response)=>{
          console.log(response.data.followers);
          console.log(response.data.following);

          if (context.rootState.authentication.userId == response.data.profile.profile.user_id) {

              var isMyProfile = true;
          }
          else{
              var isMyProfile = false;
          }
            context.commit('showProfile',

            {
              isMyProfile,
            profile:response.data.profile,
            posts:response.data.posts,
            followers:response.data.followers,
            following:response.data.following,
            following_id:response.data.following_id,
            isFollow:response.data.is_follow});


        })
        .catch((errors)=>{
            console.log(errors);
            console.log(errors.response);
        })
    },

    showFans(context,someData,rootState){
      axios.post('/api/timeline/my-fans',{},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{
        console.log(50);
      context.commit('fillMyFollowers',response.data.followers);
      context.commit('fillMyFollowing',response.data.following);
      context.commit('myFollowingIds',response.data.following_ids);
      })
      .catch((error)=>{
        console.log(error);
        console.log(error.response);
      })
    }


  }

}
