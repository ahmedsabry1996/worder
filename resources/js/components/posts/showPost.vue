<template>
  <div>
    <div v-if="!post" class="text-center">
      <img :src="`/storage/avatars/loader.gif`" alt="loading" width="100" height="100">
    </div>
    <div class="post text-center" v-if="post">

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

    <!-- likers -->
    <sweet-modal :enable-mobile-fullscreen="false" ref="likers" width="320" overlay-theme="dark">

        <div style="overflow-y:scroll;height:120px" @scroll="loadMoreLikers">

        <div class="likers" v-for="liker in postLikers">
            <p @click="openProfile(liker.profile.display_name)" tag="p" style="cursor:pointer">
            <img :src="`/storage/avatars/${liker.profile.avatar}`" :alt="liker.name" width="40" height="40" class="img-rounded">
            <b>{{liker.name}}</b>
            <br>
            <i style="opacity:.5;position:relative">{{liker.profile.display_name}}</i>
          </p>

        </div>

        </div>
    </sweet-modal>

    <!-- dislikers -->
      <sweet-modal :enable-mobile-fullscreen="false" :title="$t('dislikers')" ref="dislikers" width="320" overlay-theme="dark">

          <div style="overflow-y:scroll;height:120px" @scroll="loadMoreDisLikers">
          
          <div class="likers" v-for="disliker in postDislikers">
              <p @click="openProfile(disliker.profile.display_name)"  style="cursor:pointer">
              <img :src="`/storage/avatars/${disliker.profile.avatar}`" :alt="disliker.name" width="40" height="40" class="img-rounded">
              <b>{{disliker.name}}</b>
              <br>
              <i style="opacity:.5;position:relative">{{disliker.profile.display_name}}</i>
            </p>

          </div>

          </div>
      </sweet-modal>



</div>

</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import axios from 'axios';
var moment = require('moment');
import React from './React.vue';

export default {
  data(){
    return {
        publisher:null,

    }
  },
  components:{
      React,
      SweetModal,
      SweetModalTab

  },
  computed:{
    post(){
      return this.$store.getters.post;

    },
    likesNum(){
      return this.$store.getters.likesNum;

    },
    dislikesNum(){
      return this.$store.getters.dislikesNum;

    },
    postLikers(){
      return this.$store.getters.postLikers;
    },
    postDislikers(){
      return this.$store.getters.postDislikers;
    },
    likedPosts(){
      return this.$store.getters.likedPosts;

  },
    disLikedPosts(){
    return this.$store.getters.disLikedPosts;
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
    const self = this;
    this.$store.dispatch('reactedPosts');
    this.$store.dispatch('showSinglePost',this.$route.params.postId)
    .then((response)=>{
      console.log('ok man');
    })
    .catch((errors)=>{
      this.$router.push('/');
    })
  },
  methods:{
     goToAnotherPost(){

           this.likersOffset = 0 ;
           this.dislikerOffset = 0;
           this.$store.dispatch('showSinglePost',this.$route.params.postId)
           .then((response)=>{
             console.log('ok ok');
           })
           .catch((errors)=>{
             this.$router.push('/');
           })
;
     },
     showLikers(id){
       this.$refs.likers.open();
       this.$store.dispatch('showLikers',{postId:id});

     },
     loadMoreLikers(e){


           let elHeight = e.target.clientHeight;

           let elscrollHeight = e.target.scrollHeight;

           let elScrollTop = e.target.scrollTop;

           if ((elHeight+elScrollTop) - elscrollHeight == 0) {

             console.log('end of likers');
             this.$store.dispatch('loadMoreLikers',{postId:this.$route.params.postId});

                       }
     },

     showDisLikers(id){
       this.$refs.dislikers.open();
       this.$store.dispatch('showDisLikers',{postId:id})
        },

     loadMoreDisLikers(e){



           let elHeight = e.target.clientHeight;

           let elscrollHeight = e.target.scrollHeight;

           let elScrollTop = e.target.scrollTop;

           if ((elHeight+elScrollTop) - elscrollHeight == 0) {

                     console.log('end of dislikers');

             this.$store.dispatch('loadMoreDisLikers',{postId:this.$route.params.postId});

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
.likers, .dislikers {
	position: relative;
	padding: 20px;
	height: 155px;
	overflow: scroll;
}
.likers a{
    text-decoration: none;

}
</style>
