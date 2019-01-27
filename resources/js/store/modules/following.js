export default{


  state:{

      myFollowersProfiles:[],
      myFollowingProfiles:[],
  },

  getters:{
    myFollowersProfiles(state){
      return state.myFollowersProfiles;
    },
    myFollowingProfiles(state){
      return state.myFollowingProfiles;
    }
  },

  mutations:{
    fillMyFollowersProfiles(state,payload){
      state.myFollowersProfiles = payload;
    },

    addToMyFollowersProfiles(state,payload){
    state.myFollowersProfiles.push(payload);
    },

    fillMyFollowingProfiles(state,payload){
      state.myFollowingProfiles = payload;
    },

    addToMyFollowingProfiles(state,payload){
      state.myFollowingProfiles.push(payload);
    },


  },

  actions:{
    toggleFollow(context,payload){

      if (payload.action == 'follow') {
        context.commit('addToFollowing',{followed_id:payload.followed_id});
        //context.commit('myFollowingIds',payload.followed_id);
      }
      else{
        context.commit('removeFromFollowing',payload.followed_id);
        //context.commit('myFollowingIds',payload.followed_id);

      }
    axios.post('/api/timeline/follow',{
      followed_id:payload.followed_id
    },{

      headers:{
        "Authorization" : `Bearer ${context.state.authentication.userToken}`
      }
    })
    .then((response)=>{

      let action = response.data.action;
      if (action == 'follow') {

        context.commit('addToFollowing',{followed_id:payload.followed_id,
          followers:response.data.followers,
          following:response.data.following});

          context.commit('isFollow',true);
      }
      else{
        context.commit('removeFromFollowing',{followed_id:payload.followed_id,
          followers:response.data.followers,
          following:response.data.following});

        context.commit('isFollow',false);
      }
      console.log(action);
    })
    .catch((errors)=>{
      console.log(errors);
      console.log(errors.response);
    })
  },
  }

}
