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


      Vue.set(liked,liked.length,payload);

      if (disliked.indexOf(payload) != -1) {

            Vue.set(state.disLikedPosts,disliked.indexOf(payload),null);
      }


    },

  addToDisLikedPosts(state,payload){

      let liked = state.likedPosts;
      let disliked = state.disLikedPosts;

      Vue.set(disliked,disliked.length,payload);

      if(liked.indexOf(payload) != -1) {

        Vue.set(state.likedPosts,liked.indexOf(payload),null);

      }



    },

  noAction(state,payload){

      let liked = state.likedPosts;
      let disliked = state.disLikedPosts;

            if (liked.indexOf(payload) != -1) {
                  liked.splice(liked.indexOf(payload),1);
                  //Vue.set(liked,liked.indexOf(payload),null);
                    console.log('exist in liked and index is ', liked.indexOf(payload));
            }

              if (disliked.indexOf(payload) != -1) {
              disliked.splice(disliked.indexOf(payload),1);
              //Vue.set(disliked,disliked.indexOf(payload),null);
              console.log('exist in disliked and index is ', disliked.indexOf(payload));

    }},

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
                if (context.state.likedPosts.indexOf(commit.postId) == -1) {

                        context.commit('addToLikedPosts',commit.postId);

                }

            }
            if (commit.react == 'dislike') {

              if (context.state.disLikedPosts.indexOf(commit.postId) == -1) {

                context.commit('addToDisLikedPosts',commit.postId);
              }

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
              if (response.data.result == 'like') {
                  console.log(response.data);
                  context.commit('updatePost',{id:commit.postId,updatedPost:response.data.updated_post});
                  context.commit('showPost',response.data.updated_post)

}

              if (response.data.result == 'dislike') {
              console.log(response.data);
              context.commit('updatePost',{id:commit.postId,updatedPost:response.data.updated_post});
              context.commit('showPost',response.data.updated_post)

              }

              if (response.data.result == null) {

              console.log(response.data.result);
              context.commit('updatePost',{id:commit.postId,updatedPost:response.data.updated_post});
              context.commit('noAction',commit.postId);
              context.commit('showPost',response.data.updated_post)

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

                //push to liked post;

                if (response.data.type != null) {

                if (response.data.type.type_id == 'LIKE' ) {

                      //push to my liked posts
                      console.log('to liked');
                    context.commit('addToLikedPosts',postId)
                }

                if (response.data.type.type_id == 'DISLIKE') {
                    console.log('to disliked');
                    context.commit('addToDisLikedPosts',postId);

                }

              }

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
