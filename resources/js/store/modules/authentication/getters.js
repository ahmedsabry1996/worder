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

        readyToCreateProfile(state){
          return state.readyToCreateProfile;
        }

}
