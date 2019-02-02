import Vue from 'vue';
export default{

    //open timeline compoenent
    fillMyTimeline(state,payload){


        state.posts = payload;
      },

      //open time....
    truncateTimeline(state){
      state.posts = [];
    },



    loadMore(state,payload){
      // 
      // let shufflePayload = payload.sort(function() {
      //   return .5 - Math.random();
      // });

        payload.map((value)=>{
            state.posts.push(value);
        });

    },
    isLoadingMoreTimeline(state){
      state.isLoadingMoreTimeline = !state.isLoadingMoreTimeline;
    },
      updatePost(state,payload){

        let timelineposts = state.posts;
        let postIndexInTimeline = timelineposts.findIndex((val)=>{
              return val.id == payload.id
        })

        console.log(postIndexInTimeline);
        if (postIndexInTimeline != -1) {

          setTimeout(function(){
            Vue.set(state.posts, postIndexInTimeline, payload.updatedPost);
          },500)

        }

      },


}
