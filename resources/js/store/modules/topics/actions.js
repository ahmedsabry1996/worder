export default{

    fillTopicPosts(context,commit,rootState){
      let currentTopic = commit.topic
      let id =context.state.topics.indexOf(currentTopic)+1;

    axios.post(`/api/topic/show`,{
      topic_id:id
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      }
    }).
    then((response)=>{

      context.commit('fillTopicPosts',response.data.posts);

    }).
    catch((error)=>{

      console.log(error);
      console.log(error.response.data);

    })
    },
    loadMoreTopicPosts(context,commit,rootState){
      let currentTopic = commit.topic;

      let id = context.state.topics.indexOf(currentTopic)+1;

      axios.post('/api/topic/load-more',{
        offset:commit.offset,
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
      })

    }

}
