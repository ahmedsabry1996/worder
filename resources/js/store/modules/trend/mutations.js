import Vue from 'vue';
export default{
  topTen(state,payload){
     state.topTen = payload.trend;
  },
  topTenAuth(state,payload){
     state.topTen = JSON.parse(localStorage.getItem('trend'));
  },
  fillTrendPosts(state,payload){
    state.trendPosts = payload.posts;
    state.trendPostsNum = payload.postsNum;
    state.trendLoadedPosts = state.trendPosts.length;
    state.trendOffset = 27;

  },

  addToTrendPosts(state,payload){

      payload.map((val)=>{
          state.trendPosts.push(val);
      });
      state.trendLoadedPosts = state.trendPosts.length;
      state.trendOffset += 27;

  },
  updateTrendPost(state,payload){


      let trend= state.trendPosts;

        let trendIndex = trend.findIndex((val)=>{
              return val.id == payload.id
        })

        Vue.set(state.trendPosts,trendIndex,payload);
  }

}
