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

        toggleFollow(context,payload){

          if (payload.action == 'follow') {
            context.commit('addToFollowing',{followed_id:payload.followed_id});
            //context.commit('myFollowingIds',payload.followed_id);
          }
          else{
            context.commit('removeFromFollowing',payload.followed_id);
            //context.commit('myFollowingIds',payload.followed_id);

          }
        axios.post('/api/timeline/follow',{
          followed_id:payload.followed_id
        },{

          headers:{
            "Authorization" : `Bearer ${context.state.authentication.userToken}`
          }
        })
        .then((response)=>{

          let action = response.data.action;
          if (action == 'follow') {

            context.commit('addToFollowing',{followed_id:payload.followed_id,
              followers:response.data.followers,
              following:response.data.following});
              
              context.commit('isFollow',true);
          }
          else{
            context.commit('removeFromFollowing',{followed_id:payload.followed_id,
              followers:response.data.followers,
              following:response.data.following});

            context.commit('isFollow',false);
          }
          console.log(action);
        })
        .catch((errors)=>{
          console.log(errors);
          console.log(errors.response);
        })
      },



  }
