<template>

  <div>
    <div v-if="perfectUser">

    <div class="jaja" v-if="posts.length == 0">
        <img src="/storage/avatars/loader.gif" :alt="$t('loading')">
        <h3>{{$t('loading')}}</h3>
    </div>

          <div class="" v-for="(post,index) in posts" :key="index">
          <!-- publisher avatar -->
          <div class="avatar" @click="ShowProfile(post.user.profile.display_name)">
                  <img
                  style="cursor:pointer;"
                  :src="`/storage/avatars/${post.user.profile.avatar}`"
                  :alt="post.user_id"
                  width='45' height="45"  class="img-rounded">
          </div>

          <!-- post publisher -->
          <div class="post-publisher" @click="ShowProfile(post.user.profile.display_name)">
              <h5 style="cursor:default;">
                <span v-if="post.user.profile.is_verified == 1" class="text-success">
                  <b>
            <font-awesome-icon
            v-popover:tooltip.left="'verified user'"
            :icon= "['fas','award']" />

                </b>
              </span>
                 <b>{{post.user.profile.display_name}}</b>
              </h5>
          </div>

          <!-- post content  -->
          <div class="post-content"  style="cursor:pointer;background-color:rgba(0,0,0,.1)">

            <router-link :to="{ name: 'post', params: {postId:post.id} }" tag="p" class="post">
                <b>

                  <bdi>
                    <font-awesome-icon
                    :icon= "['fas','quote-left']"
                    size="xs"
                    style="width:20px;"/>

                    {{ post.post | subsetPost }}

                    <font-awesome-icon
                    :icon= "['fas','quote-left']"
                    style="transform:scalex(-1);width:20px;"
                    size="xs"/>
                  </bdi>

                </b>
              </router-link>
          </div>

          <!-- React to post -->


        <div class="post-react">
          <React :post_id="post.id"/>

        </div>

        <!-- number of reactions -->

        <div class="post-react-number">
          <p class="text-center">

            <span v-if="post.dislikes_counter"
            style="position:relative;font-size:10pt ;color:#EA003A;margin: auto 14px;cursor:pointer;">
              {{post.dislikes_counter.count | numeral('0 a')}}
            </span>

            <span v-else
            style="position:relative;font-size:10pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
                0
              </span>


            <span v-if="post.likes_counter"
            style="font-size:10pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">

                    {{post.likes_counter.count | numeral('0 a')}}

            </span>

            <span v-else
            style="font-size:10pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
                  0
            </span>

          </p>
        </div>

        <!-- date of post -->
        <div class="post-date">
            <p style="opacity:.7;color:blue">
              <b>
              {{ post.created_at | getDateForHumans }}
              </b>
            </p>
        </div>

        <!-- post topic -->
        <div class="post-topic" v-if="post.topic">
            <p class="text-primary" style="opacity:.8">
                <b>  {{post.topic.topic}}</b>
            </p>
        </div>
        <hr>


  </div>


  </div>
</div>
</template>

<script>

var moment = require('moment');

import axios from 'axios';
import React from './React.vue';
export default {

    props:['posts'],
    components:{
      React,
    },
    computed:{
      currentUser(){
          return this.$store.getters.currentUser;
      },

      currentUserProfile(){
          return this.$store.getters.currentUserProfile;
      },
      perfectUser(){
        return this.$store.getters.isVerified =="1" && this.$store.getters.hasProfile=="1";
      }
    },


    methods:{


        showPost(postId){
          this.$router.push(`post/${postId}`)
        },


        ShowProfile(displayName){
          this.$router.push(`/${displayName}`);
        }


    },
    filters:{
          getDateForHumans(value){

            return moment(value).locale("tr").subtract(-2, 'hours').fromNow();
          },

          subsetPost(val){
            let post = val.split(' ');
            if (post.length > 20 ) {
              return post.splice(0,20).join(' ')+' .....';
            }
            else{
              return post.join(' ');
            }
          }
    },


}
</script>

<style scoped>
.post {
	font-size: 25px;
	overflow-wrap: break-word;
	width: 100%;
	height: auto;
	margin: 0 auto;
  padding-left: 8px;
}
</style>
