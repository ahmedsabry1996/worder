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
  }
},

  methods:{

            postReact(react,postId){
                this.$store.dispatch('postReact',{react:react,postId:postId});
      }
  }

}
</script>

<style>
</style>
