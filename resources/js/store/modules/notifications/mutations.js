import Vue from 'vue';
export default{
  fillNotifications(state,payload){
  state.notifications = payload;
  state.unreadNotifications = false;
  },
  unreadNotifications(state){
    state.unreadNotifications = true;
  },
  markAsRead(state){
    state.unreadNotifications = false;
  },
  PushToNotificatiosn(state,payload){

        payload.map((val)=>{
            state.notifications.push(val);
        });
  },

  instantNotfication(state,payload){

    state.notifications.unshift(payload);
  },

  logoutNotifications(state){
    state.notifications=[];

    state.unreadNotifications=false;

    state.broadcastNotifications=false;

  }


}
