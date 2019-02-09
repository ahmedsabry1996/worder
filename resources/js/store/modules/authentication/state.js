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
  

}
