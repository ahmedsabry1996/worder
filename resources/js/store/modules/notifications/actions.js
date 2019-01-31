export default{

    getNotifications(context){

          axios.post('/api/timeline/notifications',{},{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('access_token')}`
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
      axios.post('/api/timeline/load-more-notifications',{
        offset:commit.offset
      },{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{

            if(response.data.notifications.length > 0){
              context.commit('PushToNotificatiosn',response.data.notifications);
              }

        console.log(response.data.notifications);
      })
      .catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
      })

    },
    unreadNotifications(context){
      axios.post('/api/timeline/unread-notifications',{},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`

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

  
}
