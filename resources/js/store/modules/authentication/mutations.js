export default{

      signupFails(state,payload){
        state.signupErrors = payload;
      },

      signupSuccess(state,payload){
          state.currentUser = payload.currentUser;
          state.currentUserProfile = null;
          state.userToken = payload.token;
          state.verificationCode = payload.verificationCode;
          state.userId = payload.userId;
          state.signupErrors = null;
      },

      verified(state,payload){

              state.isVerified = 1;
              state.userId = payload.userId;
              state.isLoggedIn = true;
              state.signupErrors = null;

          },

          accountCreated(state){

            state.verificationCode = localStorage.getItem("verification_code");
            state.hasProfile = localStorage.getItem('has_profile');

        },

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

            userCredionals(state,payload){
            state.email = payload.email;
            state.password = payload.password;
          },
          updateUser(state){
            state.currentUser = JSON.parse(localStorage.getItem("current_user"));
          },
          updateEmail(state){
            state.email = localStorage.getItem('email');
          },
          updatePassword(state){
            state.password = localStorage.getItem('password');

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

}
