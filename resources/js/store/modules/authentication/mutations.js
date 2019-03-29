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



              logout(state){
              state.currentUser = null
              state.currentUserProfile = null;
              state.currentUserTopics = null;
              state.trend = null;
              state.userToken = null;
              state.hasProfile = null;
              state.isVerified = null;
              state.userId = null;
              state.verificationCode = null;
              state.email = null;
              state.password = null;
              state.isLoggedIn = false;
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
