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
  ,newTrend}  from './../../../auth';
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


export default{
  isLoggedIn:false,
  signupErrors:null,
  currentUser:null,
  userId :null,
  currentUserProfile: null,
  currentUserTopics : null,
  userToken:null,
  isVerified:false,
  hasProfile:false,
  verificationCode:null,
  email:null,
  password:null,


}
