export default {

    applyRoles(state,payload){
        state.hasRole =  payload.hasRole;
        state.roleId = payload.roleId;
    },
    logoutAdmin(state){
      state.hasRole = false;
      state.roleId = null;
},

  fillAdmins(state,payload){

    state.admins = payload.admins;

  }
}
