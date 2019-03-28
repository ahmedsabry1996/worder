export  default{

            createPost(context,post,rootState){
              return new Promise(function(resolve, reject) {
                axios.post("/api/post/create-post",{
                  post:post.post,
                  topic:post.topic,
                  image:post.image
                },
                {
                  headers:{
                    "Authorization": `Bearer  ${context.rootState.authentication.userToken}`,
                  }
                }
                )
                .then((response)=>{
                    console.log(response.data);
                     resolve();
                })
                .catch((errors)=>{
                    console.log(errors);
                    console.log(errors.response);
                     reject();

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

            postReact(context,commit,rootState){
              if (commit.react == 'like') {
                          context.commit('addToLikedPosts',commit.postId);
              }
              else if (commit.react == 'dislike') {

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


                context.commit('showPost',{post:response.data.updated_post});
                if (commit.routeName==null) {

              context.commit('updatePost',{id:commit.postId,
                                           updatedPost:response.data.updated_post});
                }

                else if (commit.routeName == 'trend') {
                  context.commit('updateTrendPost',response.data.updated_post)
                }

                else if (commit.routeName == 'topic') {
                  context.commit('updateTopicPost',response.data.updated_post)
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
          return new Promise(function(resolve, reject) {
            axios.post(`/api/timeline/post/`,{
                  post_id:postId,
                  user_id:localStorage.getItem('user_id')
              },{
                headers:{
                  "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
                }
              })
              .then((response)=>{
                console.log(response.data);
                context.commit('showPost',{post:response.data.post,
                                          likes:response.data.likes,
                                          dislikes:response.data.dislikes})
                resolve(response);
              })
              .catch((errors)=>{

                console.log(errors);
                console.log(errors.response);
                reject(errors);
              })
          });
        },

            showLikers(context,commit,rootState){
              axios.post('/api/post/likers',{
                post_id:commit.postId
              },{
                headers:{
                  "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
                }
              })
              .then((response)=>{

                context.commit('likers',response.data.likers)
              })
              .catch((errors)=>{
                 console.log(errors);
                 console.log(errors.response);
              })
            },

            loadMoreLikers(context,commit,rootState){
                let likesNum = context.state.likesNum;
                let loadedLikers = context.state.loadedLikers;
              if (likesNum > loadedLikers) {

              axios.post('/api/post/likers',{
                offset:context.state.likersOffset,
                post_id:commit.postId
              },{
                headers:{
                  "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
                }
              })
              .then((response)=>{
                  context.commit('loadMoreLikers',response.data.likers)
              })
              .catch((errors)=>{
                 console.log(errors);
                 console.log(errors.response);
              })


              }
            },

            showDisLikers(context,commit,rootState){
              axios.post('/api/post/dislikers',{
                post_id:commit.postId
              },{
                headers:{
                  "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
                }
              })
              .then((response)=>{

                    context.commit('dislikers',response.data.dislikers)


              })
              .catch((errors)=>{
                 console.log(errors);
                 console.log(errors.response);
              })

            },

            loadMoreDisLikers(context,commit,rootState){
                let dislikesNum = context.state.dislikesNum;
                let loadedDislikers = context.state.loadedDislikers;
if (dislikesNum > loadedDislikers)  {

                axios.post('/api/post/dislikers',{
                offset:context.state.dislikersOffset,
                post_id:commit.postId
              },{
                headers:{
                  "Authorization":`Bearer ${context.rootState.authentication.userToken}`,
                }
              })
              .then((response)=>{

                  context.commit('loadMoreDisLikers',response.data.dislikers);
                  alert();
              })
              .catch((errors)=>{
                 console.log(errors);
                 console.log(errors.response);
              })
}

            },

            reactedPosts(context,commit,rootState){
                axios.post('/api/timeline/reacted-posts',{},{
                  headers:{
                    Authorization:`Bearer ${context.rootState.authentication.userToken}`
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
}
