import Vue from 'vue';
export default{

  state:{

    currentProfile:{profile:0},
    followersNum:0,
    followingNum:0,
    isFollow:null,
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
  },

  mutations:{
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
      context.commit('fillMyFollowersProfiles',response.data.followers);
      context.commit('fillMyFollowingProfiles',response.data.following);
      })
      .catch((error)=>{
        console.log(error);
        console.log(error.response);
      })
    },

    loadMoreProfilePosts(context,commit,rootState){

      axios.post('/api/user-posts',{
          offset:commit.offset,
          user_id:commit.userId,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{
          console.log(response.data.posts);
        context.commit('loadMoreProfilePosts',response.data.posts)
      })
      .catch((error)=>{
          console.log(error);
          console.log(error.response);
      })
    },

    deletePost(context,commit,rootState){

      axios.post('/api/post/delete-post',{
        post_id:commit.id,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{
        console.log(response.data);
        context.commit('deletePost',commit.index)
      })
      .catch((error)=>{
        console.log(error);
        console.log(error.response);
      })

    },

  }

}
