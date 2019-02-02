export  default{
  post(state){
    return state.post;
  },
  likedPosts(state,getters,rootState){
    return  state.likedPosts;
  },
  disLikedPosts(state,getters,rootState){
    return  state.disLikedPosts;
  },

}
