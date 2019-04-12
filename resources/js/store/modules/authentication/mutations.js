export default{

      signupFails(state,payload){
        state.signupErrors = payload;
      },

      signupSuccess(state,payload){
          state.currentUser = payload.currentUser;
          state.currentUserProfile = null;
          state.userId = payload.userId;
          state.signupErrors = null;
      },
      readyToCreateProfile(state){
          state.readyToCreateProfile = true;
      },
      verified(state,payload){

              state.isVerified = 1;
              state.userId = payload.userId;
              state.isLoggedIn = true;
              state.signupErrors = null;

          },
          cancelEmailVerification(state){
            state.verificationCode = null;
          }
,
            loginSuccess(state,payload){

            state.currentUser = payload.currentUser;
            state.userToken = payload.token;
            state.isVerified = payload.isVerified;
            state.hasProfile = payload.hasProfile;
            state.userId = payload.userId;
            state.currentUserProfile = payload.currentUserProfile;
            state.currentUserTopics = payload.currentUserTopics;
            state.isLoggedIn = true;
            state.loginErrors = null;
          },

          userCredionals(state,payload){
          state.name = payload.name;
          state.email = payload.email;
          state.password = payload.password;
        },

          verificationCode(state,payload){
            state.verificationCode = payload.verificationCode;
          },
          updateUser(state,payload){
            state.currentUser = payload.currentUser;
          },

          updatePassword(state,payload){
            state.password = payload.password;

          },
          updateProfile(state,payload){
            state.currentUser = payload.currentUser;
            state.currentUserProfile = payload.currentUserProfile;
            state.currentUserTopics = payload.currentUserTopics;
          },

          createProfile(state,payload){
            state.userToken = payload.token;
            state.currentUserProfile = payload.profile;
            state.currentUserTopics = payload.currentUserTopics;
            state.isLoggedIn = true;
            state.isVerified = 1;
            state.hasProfile = 1;
          },

              logoutAuth(state){
                state.isLoggedIn=false
                state.signupErrors=null
                state.currentUser=null
                state.userId =null
                state.currentUserProfile= null
                state.currentUserTopics = null
                state.userToken=null
                state.isVerified=false
                state.hasProfile=false
                state.readyToCreateProfile=false
                state.verificationCode=null
                state.name=null
                state.email=null
                state.password=null
            },

}
