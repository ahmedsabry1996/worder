import Vue from 'vue';
export default {

  state:{


          posts:[],

  },

  getters:{

    posts(state){
      return state.posts;
    },

  },

  mutations:{
    fillMyTimeline(state,payload){

        state.posts = payload;

      },

    truncateTimeline(state){
      state.posts = [];
    },

    loadMore(state,payload){

        payload.map((value)=>{
          Vue.set(state.posts, state.posts.length,value);
        });

    },

      updatePost(state,payload){

        let timelineposts = state.posts;



        let postIndexInTimeline = timelineposts.findIndex((val)=>{
              return val.id == payload.id
        })


        if (postIndexInTimeline != -1) {

          setTimeout(function(){
            Vue.set(state.posts, postIndexInTimeline, payload.updatedPost);
          },500)
        }

      },


  },

  actions:{
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
      axios.post(`/api/timeline/load-more`,{
          offset:data.offset,
        },{
        headers:{
          "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
        }
      })
      .then((response)=>{
          console.log(response.data);
            context.commit('loadMore',response.data.loaded_posts);
      })
      .catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
      })
    }

  }
}
