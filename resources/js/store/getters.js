export default{

  isLoggedIn(state){
    return  state.isLoggedIn;
  },

  currentUser(state){
    return state.currentUser;
  },

  currentUserProfile(state){
    return state.currentUserProfile;
  },
  currentUserTopics(state){
    return  state.currentUserTopics;
  },
  userToken(state){
    return state.userToken;
  },

  signupErrors(state){
    return state.signupErrors;
  },

  verificationCode(state){
    return state.verificationCode;
  },

  isVerified(state){
    return state.isVerified;
  },


  hasProfile(state){
      return state.hasProfile;
  },

  countries(state){
    return state.countries;
  },

  topics(state){
    return state.topics;
  },

  posts(state){
    return state.posts;
  },
  myPosts(state){
    return state.myPosts;
  },
  timeline(state){
    return state.timeline;
  },
  likedPosts(state){
    return  state.likedPosts;
  },
  disLikedPosts(state){
    return  state.disLikedPosts;
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

  showProfile(state){
    return state.showProfile;
  },

  isFollow(state){
    return state.isFollow;
  },
  profileFollowers(state){
      return  state.profileFollowers;
  },
  profilePosts(state){
    return state.profilePosts;
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
