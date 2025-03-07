export default{

        showProfile(context,displayName,rootState){

      return new Promise(function(resolve, reject) {

          axios.get(`/api/user/${displayName}`,{
            headers:{
              "Authorization" :`Bearer ${context.rootState.authentication.userToken}`
            }
          })
          .then((response)=>{
            console.log(745);
              console.log(response.data.is_follow);

              context.commit('showProfile',

              {
                profile:response.data.profile,
                followers:response.data.followers,
                following:response.data.following,
                isFollow:response.data.is_follow,
                posts:response.data.posts,
                postsNum:response.data.posts_num,


              });
              resolve();

          })
          .catch((errors)=>{
              reject();
              console.log(errors);
              console.log(errors.response);

          })
          });
      },

      showFans(context,someData,rootState){
        axios.post('/api/timeline/my-fans',{},{
          headers:{
            Authorization:`Bearer ${context.rootState.authentication.userToken}`
          }
        })
        .then((response)=>{
        context.commit('fillMyFollowersProfiles',response.data.followers);
        context.commit('fillMyFollowingProfiles',response.data.following);

        context.commit('pickMyFansNum',{followers:response.data.followers_num,
                                        following:response.data.following_num});
        })
        .catch((error)=>{
          console.log(error);
          console.log(error.response);
        })
      },

      loadMoreProfilePosts(context,commit,rootState){

        return new Promise((resolve,reject)=>{
    

        axios.post('/api/user-posts',{
            offset:context.state.profilesOffset,
            user_id:commit.userId,
        },{
          headers:{
            Authorization:`Bearer ${context.rootState.authentication.userToken}`
          }
        })
        .then((response)=>{
            //console.log(response.data.posts);
          context.commit('loadMoreProfilePosts',response.data.posts);
          resolve(response);
        })
        .catch((error)=>{
            console.log(error);
            reject(error);
        })
        
      });

      },

      deletePost(context,commit,rootState){

        axios.post('/api/post/delete-post',{
          post_id:commit.id,
        },{
          headers:{
            Authorization:`Bearer ${context.rootState.authentication.userToken}`
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
      updateLocale(context,data){
        axios.post('/api/profile/update-locale',{
          locale:data.locale,
          id:data.id,
        })
        .then((response)=>{
          console.log(response);
        })
        .catch((errors)=>{
          console.log(errors);
          console.log(errors.response);
        })
      }

}
