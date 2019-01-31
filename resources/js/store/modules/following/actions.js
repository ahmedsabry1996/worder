export default{

    myFollowingIds(context,commit,rootState){
      axios.post('/api/timeline/following-ids',{},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
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
    toggleFollow(context,payload){

      if (payload.action == 'follow') {
        //context.commit('addToFollowing',{followed_id:payload.followed_id});
        //context.commit('myFollowingIds',payload.followed_id);
      }
      else{
        //context.commit('removeFromFollowing',payload.followed_id);
        //context.commit('myFollowingIds',payload.followed_id);

      }
    axios.post('/api/timeline/follow',{
      followed_id:payload.followed_id
    },{

      headers:{
        "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
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
    loadMoreFollowers(context,commit,payload){
      axios.post('/api/timeline/my-followers',{
        offset:commit.offset
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{
        if (response.data.followers.length > 0) {
          context.commit('addToMyFollowersProfiles',response.data.followers);

        }
      })
      .catch((error)=>{
        console.log(error);
        console.log(error.response);
      })
    },
    loadMoreFollowing(context,commit,payload){

              axios.post('/api/timeline/my-following',{
                offset:commit.offset
              },{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('access_token')}`
                }
              })
              .then((response)=>{
                if (response.data.following.length > 0) {

                  context.commit('addToMyFollowingProfiles',response.data.following);

                }

              })
              .catch((error)=>{
                console.log(error);
                console.log(error.response);
              })
    }
  }
