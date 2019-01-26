
import  {newTrend} from './../auth.js';

const TREND = newTrend();

export default{



      //Notifications
      notifications:[],
      unreadNotifications:false,

      //Countries
      countries:['Turkey','Egypt','Filstin'],

      //tryimeline
      timeline:[],

      //posts
      posts:[],
      myPosts:[],
      likedPosts:[],
      disLikedPosts:[],
      publishingPostErrors:[],

      //Topics
      topics:['politics',
              'sport',
              'films',
              'love',
              'economy',
              'trade',
              'industry',
              'travel',
              'migration',
              'education'],

      //trend
      trend:TREND,
      newTrend:false,

      //Following
      followers:[],
      following:[],
      myFollowers:[],
      myFollowing:[],
      myFollowingIds:[],
      isFollow:null,

      //suggestion
      suggestedPeople:[],

      //profile
      showProfile:{profile:0},
      profilePosts:[],
      profileFollowers:[0,0],


}
