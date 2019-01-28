import Vue from 'vue';
export default{
  //Notifications
    fillNotifications(state,payload){
    state.notifications = payload;
    state.unreadNotifications = false;
    },
    unreadNotifications(state){
      state.unreadNotifications = true;
    },
    PushToNotificatiosn(state,payload){

          payload.map((val)=>{
              state.notifications.push(val);
          });
    },

          //suggestion
    suggestedPeople(state,payload){
      state.suggestedPeople = payload;
    },



}
