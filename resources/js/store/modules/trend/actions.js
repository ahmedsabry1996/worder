import { resolve } from "q";

export default {

      showTrendPosts(context,commit,rootState){
        axios.post('/api/trend/posts',{
          word:commit.word
        }
        ,{
          headers:{
            Authorization:`Bearer ${context.rootState.authentication.userToken}`
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

        return new Promise((resolve,reject)=>{

        if (trendPostsNum > trendLoadedPosts){
          axios.post('/api/trend/load-more',{
          offset:context.state.trendOffset,
          word : commit.word
        },{
          headers:{
            Authorization:`Bearer ${context.rootState.authentication.userToken}`
          }
        })
        .then((response)=>{

          console.log(response.data);
          context.commit('addToTrendPosts',response.data.posts);
          console.log(commit.word);
          resolve(response);
        })
        .catch((error)=>{
          console.log(error.response);
          reject(error)
        })}
      });

      }

}
