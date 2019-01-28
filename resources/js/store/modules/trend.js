import Vue from 'vue';
import  {newTrend} from './../../auth.js';

const TREND = newTrend();

export default {
  state:{
    topTen:TREND,
    trendPosts:[],

  },

  getters:{
    trendPosts(state){
      return  state.trendPosts;
    },
    topTen(state){
      return state.topTen;
    }
  },

  mutations:{

      topTen(state,payload){
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

  },
  actions:{
      showTrendPosts(context,commit,rootState){
        axios.post('/api/trend/posts',{
          word:commit.word
        }
        ,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{

                context.commit('fillTrendPosts',response.data.posts)
        })
        .catch((error)=>{
          console.log(error.response);
        })
      },
      loadMoreTrendPosts(context,commit,rootState){
        axios.post('/api/trend/load-more',{
          offset:commit.offset,
          word : commit.word
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{

          console.log(response.data.posts);
          context.commit('addToTrendPosts',response.data.posts)
        })
        .catch((error)=>{
          console.log(error.response);
        })

      }
  }
}
