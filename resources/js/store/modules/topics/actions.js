export default{

    fillTopicPosts(context,commit,rootState){
      let currentTopic = commit.topic;
      let id = context.state.topics.findIndex((val)=>{
      return val.topic == currentTopic});

      return new Promise(function(resolve, reject) {
        axios.post(`/api/topic/show`,{
          topic_id:id + 1
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        }).
        then((response)=>{

          context.commit('fillTopicPosts',{posts:response.data.posts,
                                            postsNum:response.data.posts_num});
          resolve(response);
        }).
        catch((error)=>{

          reject(error);
        });
      });

    },

    loadMoreTopicPosts(context,commit,rootState){
      let currentTopic = commit.topic;

      let id = context.state.topics.indexOf(currentTopic)+1;

      let loadedTopicPosts = context.state.loadedTopicPosts;
      let allTopicPosts = context.state.allTopicPosts;

    if (allTopicPosts > loadedTopicPosts){
    axios.post('/api/topic/load-more',{
        offset:context.state.Topicsoffset,
        topic_id : id
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{

        context.commit('addToTopicPosts',response.data.posts);
      })
      .catch((error)=>{
        console.log(error.response);
      })}

    }

}
