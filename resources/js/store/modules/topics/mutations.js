import Vue from 'vue';

export default{

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
}
