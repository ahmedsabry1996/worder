import Vue from 'vue';
export default{

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
    isLoadingMoreTimeline(state){
      state.isLoadingMoreTimeline = !state.isLoadingMoreTimeline;
      console.log(state.isLoadingMoreTimeline);
    },
      updatePost(state,payload){

        let timelineposts = state.posts;



        let postIndexInTimeline = timelineposts.findIndex((val)=>{
              return val.id == payload.id
        })


        if (postIndexInTimeline != -1) {

          // setTimeout(function(){
            Vue.set(state.posts, postIndexInTimeline, payload.updatedPost);
          // },500)

        }

      },


}
