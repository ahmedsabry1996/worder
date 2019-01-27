import axios from 'axios';
export default {
        getNotifications(context){

              axios.post('/api/timeline/notifications',{},{
                headers:{
                  "Authorization":`Bearer ${context.state.authentication.userToken}`
                }
              }).then((response)=>{

                  console.log(response.data);
                  context.commit('fillNotifications',response.data.all_notifications);
              }).catch((errors)=>{
                  console.log(errors);
                  console.log(errors.response);
              })

        },

        unreadNotifications(context){
          axios.post('/api/timeline/unread-notifications',{},{
            headers:{
              Authorization:`Bearer ${context.state.authentication.userToken}`
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

        suggestPeople(context){
      axios.get('/api/timeline/suggest-people',{
          headers:{

          "Authorization" :`Bearer ${context.state.authentication.userToken}`

          }
      })
      .then((response)=>{

        //console.log("sugg",response.data);
        let suggested = response.data.suggest_people;
        context.commit('suggestedPeople',suggested);

      })
      .catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
      })
    },



  }
