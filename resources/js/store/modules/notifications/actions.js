import { reject } from "q";

export default{

    getNotifications(context,data,rootState){

          axios.post('/api/timeline/notifications',{},{
            headers:{
              "Authorization":`Bearer ${context.rootState.authentication.userToken}`
            }
          }).then((response)=>{

              console.log(response.data);
              context.commit('fillNotifications',response.data.all_notifications);
          }).catch((errors)=>{
              console.log(errors);
              console.log(errors.response);
          })

    },
    loadMoreNotifications(context,commit,rootState){
      return new Promise((resolve,reject)=>{
              axios.post('/api/timeline/load-more-notifications',{
        offset:commit.offset
      },{
        headers:{
          "Authorization":`Bearer ${context.rootState.authentication.userToken}`
        }
      })
      .then((response)=>{

            if(response.data.notifications.length > 0){
              context.commit('PushToNotificatiosn',response.data.notifications);
              }

        console.log(response.data.notifications);
      resolve(response);
      })
      .catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
        reject(error);
      })
    })

    },
    unreadNotifications(context){
      axios.post('/api/timeline/unread-notifications',{},{
        headers:{
          Authorization:`Bearer ${context.rootState.authentication.userToken}`

        },
      })
      .then((response)=>{

          if (response.data.unread) {
              context.commit('unreadNotifications');
          }
      })
      .catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
      })
    },
    broadcastNotifications(context,payload,rootState){

          context.commit('instantNotfication',payload) ;

    }


}
