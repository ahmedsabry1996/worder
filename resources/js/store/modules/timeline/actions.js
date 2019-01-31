export default{

    timeline(context,commit,rootState){

    axios.post('/api/timeline/posts',{},{
      headers:{
        "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
        "X-Requested-With":"XMLHttpRequest"
      },

    }).then((response)=>{


        console.log(response.data);

        context.commit('fillMyTimeline',response.data.posts);

    }).catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
    })
    },


    loadMorePosts(context,data,rootState){
        context.commit("isLoadingMoreTimeline");
      axios.post(`/api/timeline/load-more`,{
          offset:data.offset,
        },{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
        }
      })
      .then((response)=>{
          console.log(response.data);
            context.commit("isLoadingMoreTimeline")
            context.commit('loadMore',response.data.loaded_posts);
      })
      .catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
      })
    }

}
