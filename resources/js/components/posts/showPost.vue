<template>
  <div>
    <pre>{{likedPosts}}</pre>
    <pre>{{disLikedPosts}}</pre>
    <div v-if="!post" class="text-center">
      <img :src="`/storage/avatars/loader.gif`" alt="loading" width="100" height="100">
    </div>
    <div class="post text-center" v-else="post">

        <div class="avatar">
                <img  :src="`/storage/avatars/${post.user.profile.avatar}`" width='60' height="60" :alt="post.user_id" class="img-circle">
        </div>
        <div class="post-publisher">
            <h5>by <b>{{post.user.profile.display_name}}</b></h5>
        </div>
        <div class="post-content">
            <p style="font-size:33px;overflow-wrap:break-word;">
              <b>
                <bdi>

                  "
                  {{post.post}}
                  "
                </bdi>
              </b>
            </p>
        </div>
        <div class="delete-post">

        </div>
        <div class="post-react" v-if="post.user.profile.user_id == currentUserProfile.user_id">

        <p class="text-center">

          <span data-toggle="modal" data-target="#dislikers" style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px" @click="showDisLikers(post.id)">
            <font-awesome-icon
            :icon= "['far','thumbs-down']"  style="transform:scalex(-1)" />

          </span>

          <span data-toggle="modal" data-target="#likers"  @click="showLikers(post.id)" style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
            <font-awesome-icon :icon="['far','thumbs-up']" /></span>

        </p>
                  </div>

                  <div class="post-react" v-if="post.user.profile.user_id != currentUserProfile.user_id">
                      <React :post_id="post.id"/>


                            </div>
                  <div class="post-react-number">
                    <p class="text-center">

                      <span v-if="post.dislikes_counter" style="position:relative;font-size:10pt ;color:#EA003A;margin: auto 14px;cursor:pointer;">
                        {{ post.dislikes_counter.count  }}
                      </span>

                      <span v-else style="position:relative;font-size:10pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
                          0
                        </span>


                      <span v-if="post.likes_counter" style="font-size:10pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">

                        {{post.likes_counter.count }}

                  </span>

                      <span v-else style="font-size:10pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">

                            0
                      </span>

                    </p>

                  </div>
        <div class="post-date">
            <p style="opacity:.7;color:blue">

              <b>
              {{ post.created_at | getDateForHumans }}

              </b>

            </p>
        </div>
        <div class="post-topic">
            <p class="text-primary" style="opacity:.8">
                <b>  {{topics[post.topic_id - 1] }}</b>
            </p>
        </div>
        <hr>
    </div>

        <div class="modal fade" id="likers" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title text-center">

                  <span style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
                    Likers

                    <font-awesome-icon  :icon="['fas','thumbs-up']" @click="postReact('like',((post.id)))"/></span>

                </h4>
              </div>
              <div class="modal-body" v-if="likers.length > 0" @scroll="loadMoreLikers">
                <div class="likers" v-for="liker in likers">
                    <router-link :to="`/${liker.profile.display_name}`" tag="p" style="cursor:pointer">
                    <img :src="`/storage/avatars/${liker.profile.avatar}`" :alt="liker.name" width="40" height="40" class="img-rounded">
                    <b>{{liker.name}}</b>
                    <br>
                    <i style="opacity:.5;position:relative;left">{{liker.profile.display_name}}</i>
    </router-link>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-primary">ok</button>
              </div>
            </div>
          </div>
        </div>



            <div class="modal fade" id="dislikers" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center">

                      <span style="font-size:20pt ;color:#EA003A;cursor:pointer;">
                        Dislikers
                        <font-awesome-icon
                        :icon= "['fas','thumbs-down']"  style="transform:scalex(-1)" />

                      </span>
                    </h4>
                  </div>
                  <div class="modal-body" v-if="dislikers.length > 0" @scroll="loadMoreDisLikers">
                    <div class="likers" v-for="disliker in dislikers">
                        <router-link :to="`/${disliker.profile.display_name}`" tag="p" style="cursor:pointer">
                        <img :src="`/storage/avatars/${disliker.profile.avatar}`" :alt="disliker.name" width="40" height="40" class="img-rounded">
                        <b>{{disliker.name}}</b>
                        <br>
                        <i style="opacity:.5;position:relative;left">{{disliker.profile.display_name}}</i>
        </router-link>

                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-primary">ok</button>
                  </div>
                </div>
              </div>
            </div>
</div>

</template>

<script>
import axios from 'axios';
var moment = require('moment');
import React from './React.vue';

export default {
  data(){
    return {
        publisher:null,
        likersOffset:0,
        dislikerOffset:0,
        likers:[],
        dislikers:[]
    }
  },
  components:{
      React,
  },
  computed:{
    likedPosts(){
      return this.$store.getters.likedPosts;

  },
  disLikedPosts(){
    return this.$store.getters.disLikedPosts;
  },
    post(){
      if (!!this.$store.getters.post) {
        return this.$store.getters.post;
      }
    },
    topics(){
      return this.$store.getters.topics;
    },

    currentUserProfile(){
      return this.$store.getters.currentUserProfile;
    }
  },
  watch:{
    '$route'(to,from){
      this.$router.push({name:"post",params:{postId:to.params.postId}})
      this.goToAnotherPost();
    }
  },
  created(){

    this.$store.dispatch('showSinglePost',this.$route.params.postId);
  },
  methods:{
     goToAnotherPost(){

           this.likersOffset = 0 ;
           this.dislikerOffset = 0;
           this.$store.dispatch('showSinglePost',this.$route.params.postId);
     },
     showLikers(id){

       axios.post('/api/post/likers',{
         offset:this.likersOffset,
         post_id:id
       },{
         headers:{
           "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
         }
       })
       .then((response)=>{

         this.likers = response.data.likers;
       })
       .catch((errors)=>{
          console.log(errors);
          console.log(errors.response);
       })
     },
     loadMoreLikers(e){



           let elHeight = e.target.clientHeight;

           let elscrollHeight = e.target.scrollHeight;

           let elScrollTop = e.target.scrollTop;

           if ((elHeight+elScrollTop) - elscrollHeight == 0) {
             this.likersOffset +=100;
             axios.post('/api/post/likers',{
               offset:this.likersOffset,
               post_id:this.$route.params.postId
             },{
               headers:{
                 "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
               }
             })
             .then((response)=>{

                response.data.likers.map((val)=>{
                  this.likers.push(val);
                });
             })
             .catch((errors)=>{
                console.log(errors);
                console.log(errors.response);
             })

           }
     },

     showDisLikers(id){

       axios.post('/api/post/dislikers',{
         offset:this.dislikersOffset,
         post_id:id
       },{
         headers:{
           "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
         }
       })
       .then((response)=>{
         if (response.data.dislikers.length > 0) {

           this.dislikers = response.data.dislikers;

         }
       })
       .catch((errors)=>{
          console.log(errors);
          console.log(errors.response);
       })
     },

     loadMoreDisLikers(e){



           let elHeight = e.target.clientHeight;

           let elscrollHeight = e.target.scrollHeight;

           let elScrollTop = e.target.scrollTop;

           if ((elHeight+elScrollTop) - elscrollHeight == 0) {
             this.dislikerOffset +=100;
             axios.post('/api/post/dislikers',{
               offset:this.dislikerOffset,
               post_id:this.$route.params.postId
             },{
               headers:{
                 "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
               }
             })
             .then((response)=>{

                response.data.dislikers.map((val)=>{
                  this.dislikers.push(val);
                });
             })
             .catch((errors)=>{
                console.log(errors);
                console.log(errors.response);
             })

           }
     },

  },
  filters:{
        getDateForHumans(value){

          return moment(value).locale("ar").subtract(-2, 'hours').fromNow();
        }
  },

}
</script>

<style scoped>
.modal-body {
	position: relative;
	padding: 20px;
	height: 155px;
	overflow: scroll;
}
.likers a{
    text-decoration: none;

}
</style>
