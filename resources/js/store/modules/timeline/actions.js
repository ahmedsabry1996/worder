import Vue from 'vue';
export default{

    timeline(context,commit,rootState){


    axios.post('/api/timeline/posts',{},{
      headers:{
        "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
        "X-Requested-With":"XMLHttpRequest"
      },

    }).then((response)=>{
        console.log(response.data);
        context.commit('fillMyTimeline',{posts:response.data.posts,
                                         postsNum:response.data.posts_num});
    }).catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
    })

    },


    loadMorePosts(context,data,rootState){
      context.commit("isLoadingMoreTimeline");
      let postsNum = context.state.postsNum;
      let loadedTimelinePosts = context.state.loadedTimelinePosts;
      if (postsNum > loadedTimelinePosts) {
        axios.post(`/api/timeline/load-more`,{
            offset:context.state.offset,
          },{
          headers:{
            "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
          }
        })
        .then((response)=>{
              console.log(response.data);

              context.commit("isLoadingMoreTimeline")
              context.commit('loadMore',{posts:response.data.loaded_posts});
        })
        .catch((errors)=>{
          console.log(errors);
          console.log(errors.response);
        })
      }
      if(context.state.offset > context.state.postsNum){
        context.commit('resetOffset');
      }
    }

}
