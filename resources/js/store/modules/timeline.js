import Vue from 'vue';
export default {

  state:{

          timeline:[],
  },

  getters:{

    timeline(state){
      return state.timeline;
    },

  },

  mutations:{
    fillMyTimeline(state,payload){

        state.showProfile = [];
        state.isFollow = null;
        state.profilePosts = [];
        state.timeline = payload;

      },

    truncateTimeline(state){
      state.timeline = [];
    },

    loadMore(state,payload){

        payload.map((value)=>{
          Vue.set(state.timeline, state.timeline.length,value);
        });
        state.timeline = Array.from(new Set(state.timeline));

    },


  },

  actions:{
    timeline(context){
    axios.post('/api/timeline/posts',{},{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
        "X-Requested-With":"XMLHttpRequest"
      },

    }).then((response)=>{


        console.log(response.data);

        context.commit('fillLikedPosts',response.data.posts_liked_by_current_user);
        context.commit('fillDisLikedPosts',response.data.posts_disliked_by_current_user);
        context.commit('fillMyTimeline',response.data.posts);

    }).catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
    })
    },

  }
}
