export  default{
  post(state){
    return state.post;
  },
  likesNum(state){
      return state.likesNum;
  },
  dislikesNum(state){
      return state.dislikesNum;
  },
  postLikers(state){
    return state.postLikers;
  },
  postDislikers(state){
      return state.postDislikers;
  },
  likersOffset(state){
    return state.likersOffset;
  },
  dislikerOffset(state){
    return state.dislikerOffset;
  },
  likedPosts(state,getters,rootState){
    return  state.likedPosts;
  },
  disLikedPosts(state,getters,rootState){
    return  state.disLikedPosts;
  },

}
