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
  ,newTrend}  from './../../auth';
import {localStorageSettter} from './../../localstorage.js';
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

export default {

  state:{
    //Authentication
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
  },

  getters:{

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

  },

  mutations:{
    //Authentication

    signupFails(state,payload){
      state.signupErrors = payload;
    },

    signupSuccess(state){
        state.currentUser = JSON.parse(localStorage.getItem("current_user"));
        state.currentUserProfile = JSON.parse(localStorage.getItem("current_user_profile"));
        state.userToken = localStorage.getItem("access_token");
        state.verificationCode = localStorage.getItem("verification_code");
        state.userId = localStorage.getItem('user_id');
        state.signupErrors = null;
    },

    verified(state){

            state.isVerified = localStorage.getItem('is_verified');
            state.userId = localStorage.getItem('user_id');
            state.isLoggedIn = true;
            state.signupErrors = null;

        },

        accountCreated(state){

          state.verificationCode = localStorage.getItem("verification_code");
          state.hasProfile = localStorage.getItem('has_profile');

      },

          loginSuccess(state,payload){

          state.currentUser = JSON.parse(localStorage.getItem("current_user"));
          state.currentUserProfile = JSON.parse(localStorage.getItem("current_user_profile"));
          state.currentUserTopics = JSON.parse(localStorage.getItem("current_user_topics"));
          state.missedNotifications = payload;
          state.userToken = localStorage.getItem("access_token");
          state.hasProfile = localStorage.getItem('has_profile');
          state.isVerified = localStorage.getItem('is_verified');
          state.userId = localStorage.getItem('user_id');
          state.isLoggedIn = !!state.currentUser;
          state.loginErrors = null;
        },

          userHasProfile(state){
          state.hasProfile = localStorage.getItem('has_profile');
        },

          needProfile(state){
          state.currentUser = JSON.parse(localStorage.getItem("current_user"))
          state.isVerified = localStorage.getItem('is_verified');
          state.hasProfile = localStorage.getItem('has_profile');
          state.userToken = localStorage.getItem("access_token");
          state.userId = localStorage.getItem("user_id");
          state.isLoggedIn = !!(localStorage.getItem("current_user"));
          state.loginErrors = null;

        },

          userCredionals(state){
          state.email = localStorage.getItem('email');
          state.password = localStorage.getItem('password');
        },
        updateUser(state){
          state.currentUser = JSON.parse(localStorage.getItem("current_user"));
        },
        updateProfile(state){
          state.currentUserProfile = JSON.parse(localStorage.getItem("current_user_profile"));
        },



            logout(state){
            state.currentUser = JSON.parse(localStorage.getItem("current_user"));
            state.currentUserProfile = JSON.parse(localStorage.getItem("current_user_profile"));
            state.currentUserTopics = JSON.parse(localStorage.getItem("current_user_profile"));
            state.trend = JSON.parse(localStorage.getItem('trend'));
            state.userToken = localStorage.getItem("access_token");
            state.hasProfile = localStorage.getItem('has_profile');
            state.isVerified = localStorage.getItem('is_verified');
            state.userId = localStorage.getItem("userId");
            state.verificationCode = localStorage.getItem('verification_code');
            state.email = localStorage.getItem('email');
            state.password = localStorage.getItem('password');
            state.isLoggedIn = !!state.currentUser;
            state.loginErrors = null;
            state.posts = [];
            state.myPosts = [];
            state.publishingPostErrors = [];
            state.timeline = [];
            state.likedPosts = [];
            state.disLikedPosts = [];
            state.followers=[];
            state.following=[];
            state.myFollowers=[];
            state.myFollowing=[];
            state.suggestedPeople=[];
            state.showProfile=[];
            state.profilePosts=[];
            state.profileFollowers=[0,0];
            state.isFollow=null;
          },

  },

  actions:{
    signup(context,credionals){

    return new Promise ((resolve,reject)=>{

        axios.post("/api/auth/signup",credionals)
        .then((response)=>{

          console.log(response.data);

          localStorageSettter('current_user',JSON.stringify(response.data.user))
          localStorageSettter('access_token',response.data.access_token.accessToken);
          localStorageSettter('verification_code',response.data.verification_code);
          localStorageSettter('user_id',response.data.user.id);
          context.commit('signupSuccess');
          resolve();

        })
        .catch((errors)=>{

            console.log(errors.response);
            console.log(errors.response.data.errors);
            context.commit('signupFails',errors.response.data.errors);
            reject();
        })
    })
  },

//for signup
    confrimEmail(context){
        let userId = (context.state.currentUser).id;
            axios.post("/api/auth/verify/"+userId)
            .then((response)=>{
              console.log(response);
              localStorageSettter("user_id",userId);
              localStorageSettter("is_verified",1);
              context.commit('verified');

            })
            .catch((errors)=>{
              console.log(errors.response);
            });

  },

//the 3rd condition in login
    sendVerificationCode(context,email,token){

            return new Promise(function(resolve, reject) {
              axios.post("/api/auth/sendcode",{
                email,
              },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              .then((response)=>{
                console.log(response.data);
                localStorageSettter('verification_code',response.data.verification_code);
                context.commit('signupSuccess');
                resolve()
              })

              .catch((errors)=>{
                console.log(errors.response);
              })
            });
        },

    accountCreated(context){

          localStorage.removeItem('verification_code');
          localStorage.setItem('has_profile',"1");
          context.commit('accountCreated');
},
}
}
