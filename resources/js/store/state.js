import {currentUser,
  currentUserProfile
  ,currentUserTopics
  ,userToken
  ,isVerified
  ,verificationCode
  ,userId
  ,hasProfile
  ,email
  ,password
  ,newTrend}  from './../auth';
import {localStorageSettter} from './../localstorage.js';
const USER = currentUser();
const USER_PROFILE = currentUserProfile();
const USER_TOPICS = currentUserTopics();
const ACCESS_TOKEN = userToken();
const IS_VERIFIED = isVerified();
const VERIFICATION_CODE  = verificationCode();
const USER_ID = userId();
const HAS_PROFILE = hasProfile();
const EMAIL = email();
const PASSWORD = password();
const TREND = newTrend();

export default{
      isLoggedIn:!!USER,
      signupErrors:null,
      currentUser:USER,
      currentUserProfile: USER_PROFILE,
      currentUserTopics : USER_TOPICS,
      userToken:ACCESS_TOKEN,
      isVerified:IS_VERIFIED,
      verificationCode:VERIFICATION_CODE,
      hasProfile:HAS_PROFILE,
      userId :USER_ID,
      email:EMAIL,
      password:PASSWORD,
      notifications:[],
      unreadNotifications:false,
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
      countries:['Turkey','Egypt','Filstin'],

      timeline:[],
      posts:[],
      myPosts:[],
      likedPosts:[],
      disLikedPosts:[],
      publishingPostErrors:[],

      followers:[],
      following:[],
      myFollowers:[],
      myFollowing:[],
      suggestedPeople:[],

      showProfile:{profile:0},
      profilePosts:[],
      profileFollowers:[0,0],
      isFollow:null,
      trend:TREND,
      newTrend:false
}
