import Vue from 'vue';
export  default{

   post(state,payload){
     state.post = payload;
   },

      showPost(state,payload){

        state.post = payload.post;
        state.likesNum = payload.likes;
        state.dislikesNum = payload.dislikes;

      },

      likers(state,payload){
        state.postLikers = payload;
        state.loadedLikers = state.postLikers.length;

      },

      loadMoreLikers(state,payload){

        payload.map((value)=>{
          state.postLikers.push(value);
        });
        state.likersOffset += 27;
        state.loadedLikers = state.postLikers.length;
      } ,

      dislikers(state,payload){

          state.postDislikers = payload;
          state.loadMoreDisLikers = state.postDislikers.length;
      },


      loadMoreDisLikers(state,payload){

        payload.map((value)=>{
          state.postDislikers.push(value);
        });
        state.dislikersOffset += 27;
        state.loadMoreDisLikers = state.postDislikers.length;


      } ,

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

      logoutPosts(state){
        state.post={user:{"profile":"a"}};
        state.likesNum=0;
        state.dislikesNum=0;

        state.postLikers=[];
        state.loadedLikers=0;

        state.postDislikers=[];
        state.loadedDislikers=0;

        state.likersOffset=27;
        state.dislikersOffset=27;

        state.likedPosts=[];
        state.disLikedPosts=[];
      }
}
