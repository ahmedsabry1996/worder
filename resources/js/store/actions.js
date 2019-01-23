import axios from 'axios';
export default {


        signup(context,credionals){

        return new Promise ((resolve,reject)=>{

            axios.post("/api/auth/signup",credionals)
            .then((response)=>{

              console.log(response.data);

              localStorageSettter('current_user',JSON.stringify(response.data.user))
              localStorageSettter('access_token',response.data.access_token.accessToken);
              localStorageSettter('verification_code',response.data.verification_code);
              localStorageSettter('user_id',response.data.user.id);
              context.commit('signupSuccess');
              resolve();

            })
            .catch((errors)=>{

                console.log(errors.response);
                console.log(errors.response.data.errors);
                context.commit('signupFails',errors.response.data.errors);
                reject();
            })
        })
      },

    //for signup
        confrimEmail(context){
            let userId = (context.state.currentUser).id;
                axios.post("/api/auth/verify/"+userId)
                .then((response)=>{
                  console.log(response);
                  localStorageSettter("user_id",userId);
                  localStorageSettter("is_verified",1);
                  context.commit('verified');

                })
                .catch((errors)=>{
                  console.log(errors.response);
                });

      },

    //the 3rd condition in login
        sendVerificationCode(context,email,token){

                return new Promise(function(resolve, reject) {
                  axios.post("/api/auth/sendcode",{
                    email,
                  },{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                  })
                  .then((response)=>{
                    console.log(response.data);
                    localStorageSettter('verification_code',response.data.verification_code);
                    context.commit('signupSuccess');
                    resolve()
                  })

                  .catch((errors)=>{
                    console.log(errors.response);
                  })
                });
            },

        accountCreated(context){

              localStorage.removeItem('verification_code');
              localStorage.setItem('has_profile',"1");
              context.commit('accountCreated');
    },

        createPost(context,post){


        return new Promise(function(resolve, reject) {
          axios.post("/api/post/create-post",post,
          {
            headers:{
              "Authorization": `Bearer  ${context.state.userToken}`,
            }
          }
          )
          .then((response)=>{
              console.log(response);
              return resolve();
          })
          .catch((errors)=>{
              console.log(errors);
              console.log(errors.response);
              return reject();

          })
        });
      },


        deletePost(context,post){

          axios.get(`/api/post/delete-post/${post.id}`,
          {
            headers:{
              Authorization:`Bearer ${context.state.userToken}`,
            },
          }).then((response)=>{
              console.log(response.data);
          }).catch((errors)=>{
              console.log(errors);
              console.log(errors.response);
          });
      },

        timeline(context){
          if(context.state.isLoggedIn){
        axios.post('/api/timeline/posts',{},{
          headers:{
            "Authorization":`Bearer ${context.state.userToken}`,
            "X-Requested-With":"XMLHttpRequest"
          },

        }).then((response)=>{


            console.log(response.data);

            context.commit('fillLikedPosts',response.data.posts_liked_by_current_user);
            context.commit('fillDisLikedPosts',response.data.posts_disliked_by_current_user);
            context.commit('fillMyTimeline',response.data.posts);

        }).catch((errors)=>{
            console.log(errors);
            console.log(errors.response);
        })}
      },

        loadMore(context,data){

          axios.post(`/api/${data.url}`,{
              offset:data.offset,
              user_id:data.userId
          },{
            headers:{
              "Authorization":`Bearer ${context.state.userToken}`,
            }
          })
          .then((response)=>{
              console.log(response.data);

              //timeline posts
              if (data.url == 'timeline/load-more') {
                context.commit('loadMore',response.data.loaded_posts);

              context.commit('addToLikedPosts',response.data.liked_posts);
              context.commit('addToDisLikedPosts',response.data.disliked_posts);


              }

              //profile posts
              else {
                if (response.data.loaded_posts.length > 0 ) {
                  console.log(response.data.loaded_posts);
                  context.commit('loadMoreProfilePosts',response.data.loaded_posts);
                }
              }

          })
          .catch((errors)=>{
            console.log(errors);
            console.log(errors.response);
          })
      },

        getNotifications(context){

              axios.post('/api/timeline/notifications',{},{
                headers:{
                  "Authorization":`Bearer ${context.state.userToken}`
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
              Authorization:`Bearer ${context.state.userToken}`
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

          "Authorization" :`Bearer ${context.state.userToken}`

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
          }
          else{
            context.commit('removeFromFollowing',payload.followed_id);

          }
        axios.post('/api/timeline/follow',{
          followed_id:payload.followed_id
        },{

          headers:{
            "Authorization" : `Bearer ${context.state.userToken}`
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

        showProfile(context,displayName){

            axios.get(`/api/user/${displayName}`,{
              headers:{
                "Authorization" :`Bearer ${context.state.userToken}`
              }
            })
            .then((response)=>{
              console.log("277872");
              console.log(response.data.followers);
              console.log(response.data.following);
                context.commit('showProfile',
                {profile:response.data.profile,
                posts:response.data.posts,
                followers:response.data.followers,
                following:response.data.following,
                isFollow:response.data.is_follow});

            })
            .catch((errors)=>{
                console.log(errors);
                console.log(errors.response);
            })
      },

        showFans(context,offset=0){
              axios.post('/api/timeline/fans',{
                offset:offset,
              },

        {
            headers:{"Authorization":`Bearer ${context.state.userToken}`
        }})
        .then((response)=>{

            context.commit('fillMyFollowers',response.data.followers);
            context.commit('fillMyFollowing',response.data.following);
            console.log(response.data.following_id);
            console.log('offfffset',offset);
      })
        .catch((errors)=>{
          alert('errorq')
          console.log(errors);
          console.log(errors.response);
  });

      }



  }
