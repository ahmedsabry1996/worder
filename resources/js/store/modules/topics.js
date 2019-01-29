import Vue from 'vue';
export default{

state:{

      topicPosts:[],
        topics:['politics',
                'sport',
                'films',
                'love',
                'economy',
                'trade',
                'industry',
                'travel',
                'migration',
                'education'],
},

getters:{

  topics(state){
      return state.topics;
  },
  topicPosts(state){
    return state.topicPosts;
  }

},

mutations:{

      fillTopicPosts(state,payload){
          state.topicPosts = payload;
      },

      addToTopicPosts(state,payload){
          payload.map((val)=>{
              state.topicPosts.push(val);
          })
      },

      updateTopicPost(state,payload){

        let posts = state.topicPosts;

        let postIndex  = posts.findIndex((val)=>{
              return val.id == payload.id
        })

        Vue.set(posts,postIndex,payload)

      }
},

actions:{

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

}
