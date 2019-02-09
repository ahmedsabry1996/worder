export default {

      showTrendPosts(context,commit,rootState){
        axios.post('/api/trend/posts',{
          word:commit.word
        }
        ,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{
          console.log(response.data);

                context.commit('fillTrendPosts',{posts:response.data.posts,
                                                  postsNum:response.data.posts_num});
                console.log(commit.word);
                console.log(45);
        })
        .catch((error)=>{
          console.log(error.response);
        })
      },
      loadMoreTrendPosts(context,commit,rootState){
        let trendPostsNum = context.state.trendPostsNum;
        let trendLoadedPosts = context.state.trendLoadedPosts;

        if (trendPostsNum > trendLoadedPosts){
          axios.post('/api/trend/load-more',{
          offset:context.state.trendOffset,
          word : commit.word
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{

          console.log(response.data);
          context.commit('addToTrendPosts',response.data.posts);
          console.log(commit.word);
        })
        .catch((error)=>{
          console.log(error.response);
        })}

      }

}
