import Vue from 'vue';
export default{

  state:{

      post:[],
      likedPosts:[],
      disLikedPosts:[],


  },
  getters:{

      post(state){
        return state.post;
      },
      likedPosts(state){
        return  state.likedPosts;
      },
      disLikedPosts(state){
        return  state.disLikedPosts;
      },


  },

  mutations:{

    showPost(state,payload){
      state.post = payload;
    },
    fillLikedPosts(state,payload){

      state.likedPosts=payload;

    },

    fillDisLikedPosts(state,payload){
      state.disLikedPosts=payload;

    },

    addToLikedPosts(state,payload){
      let liked = state.likedPosts;
      let disliked = state.disLikedPosts;

        if (liked.indexOf(payload) != -1) {
            liked.splice(liked.indexOf(payload),1);
        }

        else if (liked.indexOf(payload) == -1 && disliked.indexOf(payload) != -1) {

            liked.push(payload);
            disliked.splice(disliked.indexOf(payload),1)
        }

        else if (liked.indexOf(payload) == -1 && disliked.indexOf(payload) == -1) {
          liked.push(payload);
        }



    },

  addToDisLikedPosts(state,payload){

      let liked = state.likedPosts;
      let disliked = state.disLikedPosts;


              if (disliked.indexOf(payload) != -1) {
                  disliked.splice(disliked.indexOf(payload),1);
              }

              else if (disliked.indexOf(payload) == -1 && liked.indexOf(payload) != -1) {

                  disliked.push(payload);
                  liked.splice(liked.indexOf(payload),1)
              }

              else if (liked.indexOf(payload) == -1 && disliked.indexOf(payload) == -1) {
                disliked.push(payload);
              }




    },



  post(state,payload){
      state.post = payload;
  }
  },

  actions:{

            createPost(context,post,rootState){
            return new Promise(function(resolve, reject) {
              axios.post("/api/post/create-post",post,
              {
                headers:{
                  "Authorization": `Bearer  ${context.rootState.authentication.userToken}`,
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


            deletePost(context,post,rootState){

              axios.get(`/api/post/delete-post/${post.id}`,
              {
                headers:{
                  Authorization:`Bearer ${context.rootState.authentication.userToken}`,
                },
              }).then((response)=>{
                  console.log(response.data);
              }).catch((errors)=>{
                  console.log(errors);
                  console.log(errors.response);
              });
          },

          reactedPosts(context,commit,rootState){
              axios.post('/api/timeline/reacted-posts',{},{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('access_token')}`
                }
              })
              .then((response)=>{
                  context.commit('fillLikedPosts',response.data.liked_posts);
                  context.commit('fillDisLikedPosts',response.data.disliked_posts);
              })
              .catch((error)=>{
                  console.log(error.response);
              })
          },

          postReact(context,commit,rootState){
            if (commit.react == 'like') {
                        context.commit('addToLikedPosts',commit.postId);
            }
            if (commit.react == 'dislike') {

                context.commit('addToDisLikedPosts',commit.postId);

              }

            axios.post('/api/timeline/react',{
              post_id:commit.postId,
              action:commit.react
            },

            {
              headers:{
                "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
              }})

            .then((response)=>{

              console.log(response.data);


              context.commit('showPost',response.data.updated_post);
              if (commit.routeName=='root') {

            context.commit('updatePost',{id:commit.postId,
                                         updatedPost:response.data.updated_post});
              }

              else if (commit.routeName == 'trend') {
                context.commit('updateTrendPost',response.data.updated_post)
              }

              else if (commit.routeName == 'show-profile') {
                context.commit('updateProfilePosts',response.data.updated_post)
              }
            })
            .catch((error)=>{
              console.log(error);
              console.log(error.response);
            })
          },

          showSinglePost(context,postId,rootState){
            axios.post(`/api/timeline/post/`,{
                post_id:postId,
                user_id:localStorage.getItem('user_id')
            },{
              headers:{
                "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
              }
            })
            .then((response)=>{

              context.commit('showPost',response.data.post)
              console.log('post loaded Successfully');
            })
            .catch((errors)=>{
              console.log(errors);
              console.log(errors.response);
            })
          }


  }

}
