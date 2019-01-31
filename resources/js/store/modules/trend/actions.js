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

                context.commit('fillTrendPosts',response.data.posts)
        })
        .catch((error)=>{
          console.log(error.response);
        })
      },
      loadMoreTrendPosts(context,commit,rootState){
        axios.post('/api/trend/load-more',{
          offset:commit.offset,
          word : commit.word
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{

          console.log(response.data.posts);
          context.commit('addToTrendPosts',response.data.posts)
        })
        .catch((error)=>{
          console.log(error.response);
        })

      }

}
