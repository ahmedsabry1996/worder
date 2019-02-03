import Vue from 'vue';
export  default{

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
}
