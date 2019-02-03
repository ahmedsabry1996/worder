import Vue from 'vue';
export default{
  topTen(state,payload){
     state.topTen = JSON.parse(localStorage.getItem('trend'));
  },
  topTenAuth(state,payload){
     state.topTen = JSON.parse(localStorage.getItem('trend'));
  },
  fillTrendPosts(state,payload){
    state.trendPosts = payload;
  },

  addToTrendPosts(state,payload){

      payload.map((val)=>{
          state.trendPosts.push(val);
      });
  },
  updateTrendPost(state,payload){


      let trend= state.trendPosts;

        let trendIndex = trend.findIndex((val)=>{
              return val.id == payload.id
        })

        Vue.set(state.trendPosts,trendIndex,payload);
  }

}
