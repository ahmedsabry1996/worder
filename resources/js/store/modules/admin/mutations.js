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
  },

  deleteAdmin(state,index){
     state.admins.splice(index,1);
  },

  addAdmin(state,payload){
    state.admins.unshift(payload.admin);
    }


}
