export default{

    myFollowingIds(context,commit,rootState){
      axios.post('/api/timeline/following-ids',{},{
        headers:{
          Authorization:`Bearer ${context.rootState.authentication.userToken}`
        }
      }).
      then((response)=>{
          console.log(response.data.following_ids);
        context.commit('fillMyFollowingIds',response.data.following_ids);

      }).
      catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
      })
    },
    toggleFollow(context,payload,rootState){

      if (payload.action == 'follow') {
        //context.commit('addToFollowing',{followed_id:payload.followed_id});
        //context.commit('myFollowingIds',payload.followed_id);
      }
      else{
        //context.commit('removeFromFollowing',payload.followed_id);
        //context.commit('myFollowingIds',payload.followed_id);

      }
    axios.post('/api/timeline/follow',{
      followed_id:payload.followed_id,
    },{

      headers:{
        "Authorization" : `Bearer ${context.rootState.authentication.userToken}`
      }
    })
    .then((response)=>{

      let action = response.data.action;
      if (action == 'follow') {
          console.log(response.data);

          //push followinID
          context.commit('addToMyFollowingIds',payload.followed_id)
      }
      else{
        console.log(response.data);
        //remove followingId
        context.commit('removeFromMyFollowingIds',payload.followed_id);

      }
      console.log(action);
    })
    .catch((errors)=>{
      console.log(errors);
      console.log(errors.response);
    })
  },

    loadMoreFollowers(context,commit,rootState){

      let loadedFollowers = context.state.loadedFollowers;
      let myFollowersNum = context.state.myFollowersNum;
        if (myFollowersNum > loadedFollowers) {

      axios.post('/api/timeline/my-followers',{
        offset:context.state.followersOffset
      },{
        headers:{
          Authorization:`Bearer ${context.rootState.authentication.userToken}`
        }
      })
      .then((response)=>{

          context.commit('addToMyFollowersProfiles',response.data.followers);

      })
      .catch((error)=>{
        console.log(error);
        console.log(error.response);
      })

    }
    },

    loadMoreFollowing(context,commit,rootState){
          let loadedFollowing = context.state.loadedFollowing;
          let myFollowingNum = context.state.myFollowingNum;
          if (myFollowingNum > loadedFollowing) {

              axios.post('/api/timeline/my-following',{
                offset:context.state.followingOffset
              },{
                headers:{
                  Authorization:`Bearer ${context.rootState.authentication.userToken}`
                }
              })
              .then((response)=>{

                  context.commit('addToMyFollowingProfiles',response.data.following);

              })
              .catch((error)=>{
                console.log(error);
                console.log(error.response);
              })

            }
    }
  }
