import Vue from 'vue';
export default{

  state:{

    currentProfile:{profile:0},
    followersNum:0,
    followingNum:0,
    isFollow:null,
    myFollowers:[],
    myFollowing:[],
    myFollowingIds:[],
    profilePosts:[],
    likers:[],
    dislikers:[],

  },

  getters:{
    showProfile(state){
      return state.currentProfile;
    },

    profileFollowers(state){
        return  state.profileFollowers;
    },
    profilePosts(state){
      return state.profilePosts;
    },
    followingNum(state){
      return  state.followingNum;
    },
    followersNum(state){
      return state.followersNum;
    },
    myFollowingIds(state){
      return state.myFollowingIds;
    }
  },

  mutations:{
    showProfile(state,payload){
      console.log(payload);
      state.currentProfile = payload.profile;
      state.followersNum = payload.followers;
      state.followingNum = payload.following;
      state.myFollowingIds = payload.followingIds;
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
              profile:response.data.profile,
              followingIds:response.data.following_ids,
              followers:response.data.followers,
              following:response.data.following,
              isFollow:response.data.is_follow,
              posts:response.data.posts,

            });


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
      })
      .catch((error)=>{
        console.log(error);
        console.log(error.response);
      })
    }


  }

}
