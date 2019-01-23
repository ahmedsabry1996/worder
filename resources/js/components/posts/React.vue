<template>
<div class="">
  <p class="text-center"
  v-if="likedPosts.indexOf(post_id) == -1 && disLikedPosts.indexOf(post_id) == -1" >

<span style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
  <font-awesome-icon
  :icon= "['far','thumbs-down']"
  style="transform:scalex(-1)"
  @click="postReact('dislike',post_id)"/>
</span>

<span style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
  <font-awesome-icon
  :icon="['far','thumbs-up']"
  @click="postReact('like',post_id)"/>
</span>

</p>
<p class="text-center"
v-if="likedPosts.indexOf(post_id) !== -1 && disLikedPosts.indexOf(post_id) == -1">

<span
style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
  <font-awesome-icon
  :icon= "['far','thumbs-down']"
  style="transform:scalex(-1)"
  @click="postReact('dislike',post_id)"/>

</span>

<span style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
  <font-awesome-icon
  :icon="['fas','thumbs-up']"
  @click="postReact('like',post_id)"/></span>

</p>
<p class="text-center"
v-if="likedPosts.indexOf(post_id) == -1 && disLikedPosts.indexOf(post_id) !== -1">

<span style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
  <font-awesome-icon
  :icon= "['fas','thumbs-down']"
  style="transform:scalex(-1)"
  @click="postReact('dislike',post_id)"/>
</span>

<span style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
  <font-awesome-icon
  :icon="['far','thumbs-up']"
  @click="postReact('like',post_id)"/></span>

</p>
<h3>{{post_id}}</h3>
</div>

</template>

<script>
export default {
  props:['post_id'],
  computed:{
    likedPosts(){
      return this.$store.getters.likedPosts;

  },
  disLikedPosts(){
    return this.$store.getters.disLikedPosts;
  }},

  methods:{

            postReact(react,postId){
              if (react == 'like') {
                console.log(1);
                this.$store.commit('addToLikedPosts',postId);

              }
              if (react == 'dislike') {
                console.log(-1);
                this.$store.commit('addToDisLikedPosts',postId);

                }

              axios.post('/api/timeline/react',{
                post_id:postId,
                action:react
              },

              {
                headers:{
                  "Authorization":`Bearer ${this.$store.state.userToken}`,
                }})

              .then((response)=>{
                if (response.data.result == 'like') {
                    console.log(response.data);
                    this.$store.commit('updatePost',{id:postId,updatedPost:response.data.updated_post});


    }

                if (response.data.result == 'dislike') {
                console.log(response.data);
                this.$store.commit('updatePost',{id:postId,updatedPost:response.data.updated_post});

                }

                if (response.data.result == null) {

                console.log(response.data);
                this.$store.commit('updatePost',{id:postId,updatedPost:response.data.updated_post});
                this.$store.commit('noAction',postId);

                }
              })
              .catch((error)=>{
                console.log(error);
                console.log(error.response);
              })
            }
  }

}
</script>

<style>
</style>
