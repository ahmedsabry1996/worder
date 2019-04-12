export default{

    showBottomNav(state){
    state.showBottomNav = true;
  },

  hideBottomNav(state){
    state.showBottomNav = false;
  },

  changeLanguage(state,payload){
    state.appLang = payload;
  },

}
