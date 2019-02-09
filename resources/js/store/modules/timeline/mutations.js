import Vue from 'vue';
export default{

    //open timeline compoenent
    fillMyTimeline(state,payload){


        state.posts = payload.posts;
        state.loadedTimelinePosts = payload.posts.length;
        state.postsNum = payload.postsNum;
        state.offset = 27;

      },

      //open time....
    truncateTimeline(state){
      state.posts = [];
    },



    loadMore(state,payload){

        payload.posts.map((value)=>{
            state.posts.push(value);
        });
        state.loadedTimelinePosts = state.posts.length;
        state.offset += 27;
        console.log('offffffffffff');
        console.log(state.offset);

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
      NoMore(state){
        state.NoMore = true;
      }

}
