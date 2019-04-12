import Vue from 'vue';

export default{

        fillTopicPosts(state,payload){
            state.topicPosts = payload.posts;
            state.allTopicPosts = payload.postsNum;
            state.loadedTopicPosts = payload.posts.length;
            state.Topicsoffset = 27;
            if (payload.postsNum === 0) {
                state.noTopicPosts = true;
            }
            else{
              state.noTopicPosts = false;

            }
        },

        addToTopicPosts(state,payload){
            payload.map((val)=>{
                state.topicPosts.push(val);
            })
            state.loadedTopicPosts = state.topicPosts.length;
            state.Topicsoffset +=27;
        },

        updateTopicPost(state,payload){

          let posts = state.topicPosts;

          let postIndex  = posts.findIndex((val)=>{
                return val.id == payload.id
          })

          Vue.set(posts,postIndex,payload)
        },
        logoutTopics(state){
          state.topicPosts=[];
          state.allTopicPosts=0;
          state.Topicsoffset=27;
          state.loadedTopicPosts=0;
          state.noTopicPosts=false;
        }
}
