import Vue from 'vue';
export default{

    //open timeline compoenent
    fillMyTimeline(state,payload){
      state.posts = Vue._.uniq(payload.posts);
      state.loadedTimelinePosts = payload.posts.length;
        state.postsNum = payload.postsNum;
        state.offset = 27;
      },

    //open time....
    truncateTimeline(state){
      state.posts = [];
      state.offset = 27;

    },

    loadMore(state,payload){


        let uniquePayload =  Vue._.uniq(payload.posts);

        uniquePayload.map((value)=>{
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
      },

      logoutTimeline(state){
                state.posts=[];
                state.postsNum=0;
                state.isLoadingMoreTimeline=false;
                state.loadedTimelinePosts=0;
                state.offset=27;
                state.NoMore=false;
      },

}
