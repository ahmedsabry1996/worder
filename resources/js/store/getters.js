export default{

  countries(state){
    return state.countries;
  },

  topics(state){
    return state.topics;
  },
  followers(state){
    return state.followers;
  },
  following(state){
    return state.following;
  },
  suggestedPeople(state){
    return state.suggestedPeople;
  },
  myFollowers(state){
    return state.myFollowers;
  },
  myFollowing(state){
    return  state.myFollowing;
  },
  myFollowingIds(state){
    return state.myFollowingIds;
  },


  isFollow(state){
    return state.isFollow;
  },
  
  notifications(state){
    return state.notifications;
  },
  unreadNotifications(state){
    return state.unreadNotifications;
  },
  trend(state){
      return state.trend;
  },
  newTrend(state){
    return  state.newTrend;
  }
}
