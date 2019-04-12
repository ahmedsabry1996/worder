<template>

<div v-if="isLoggedIn">

    <div class="text-xs-center" v-if="posts.length == 0">
      <v-icon color="white">fas fa-circle-notch fa-spin</v-icon>
    </div>

          <div class="mt-2 text-xs-center" v-for="(post,index) in posts" :key="post.id">
          <!-- publisher avatar -->
          <template v-if="post.user.profile.avatar != null">
          <v-avatar
            size="55"
            class="#005f5b">
            <img
            @click="ShowProfile(post.user.profile.display_name)"
            :src="`/storage/avatars/${post.user.profile.avatar}`"
            :alt="post.user.name">
          </v-avatar>
        </template>

    <template v-else>
            <v-avatar color="#112f41" @click="ShowProfile(post.user.profile.display_name)"
>
     <span class="white--text headline">
       {{post.user.name.charAt(0).toUpperCase()}}
     </span>
          </v-avatar>
          </template>

          <!-- post publisher -->
          <div class="post-publisher mt-3" @click="ShowProfile(post.user.profile.display_name)">
              <h3 style="cursor:default" class="white--text">

                <span style="position: relative;top: -2px;" v-if="post.user.profile.is_verified == 0">
                  <v-tooltip left color="success">

                  <b slot="activator">
        <v-icon size="medium" color="success">check_circle</v-icon>
                </b>
                <b class="white--text">verified user</b>
              </v-tooltip>

              </span>
                 <b>{{post.user.profile.display_name}}</b>
              </h3>
          </div>

          <!-- post content  -->
          <div class="post-content"  style="cursor:pointer">

            <router-link tag="p" :to="{ name: 'post', params: {postId:post.id} }"  class="white--text">
                  <p style="font-size:22pt;font-weight:bold;white-space:pre-line" class="white--text">
                      <bdi>
                        {{ post.post | subsetPost }}

                      </bdi>
                          </p>

              </router-link>
          </div>
          <v-flex xs12>

          <div  v-if="post.image" class="text-xs-center hidden-xs-only">
            <img
            width="320"
            :src="`/storage/posts_images/${post.image}`"
            class="grey lighten-2"
            @click="showPost(post.id)"/>

          </div>

          <div  v-if="post.image" class="ml-1 text-xs-center hidden-sm-and-up">
            <img
            width="300"
            style="margin:0 auto !important;"
            :src="`/storage/posts_images/${post.image}`"
            class="grey lighten-2"
            @click="showPost(post.id)"/>

          </div>
          <!-- React to post -->

          <React :post_id="post.id"/>
        </v-flex>


        <!-- number of reactions -->

        <div class="post-react-number">
          <p class="text-center">

            <span v-if="post.dislikes_counter"
            style="position:relative;font-size:10pt ;color:#fff;margin: auto 14px;cursor:pointer;">
              {{post.dislikes_counter.count | numeral('0 a')}}
            </span>

            <span v-else
            style="position:relative;font-size:10pt ;color:#fff;margin: auto 14px;cursor:pointer;top:3px">
                0
              </span>


            <span v-if="post.likes_counter"
            style="font-size:10pt ;color:#fff;margin: auto 14px;cursor:pointer;">

                    {{post.likes_counter.count | numeral('0 a')}}

            </span>

            <span v-else
            style="font-size:10pt ;color:#fff;margin: auto 14px;cursor:pointer;">
                  0
            </span>

          </p>
        </div>

        <!-- date of post -->
        <div class="post-date white--text">
              <b>
              {{ post.created_at | getDateForHumans }}
              </b>
        </div>

        <!-- post topic -->
        <div class="post-topic white--text" v-if="post.topic">
            <p>
                <b>  {{topics[post.topic.id - 1] ['topic']}}</b>
            </p>
        </div>
        <hr class="white white--text"/>
  </div>


  </div>
</div>

</template>

<script>

var moment = require('moment');

import Vue from 'vue';
import axios from 'axios';
import React from './React.vue';
export default {

    props:{
      posts:{
        type:Array || Object,
      }
    },
    components:{
      React,
    },
    mounted(){
      console.log('list posts loaded');
    },
    computed:{
      currentUser(){
          return this.$store.getters.currentUser;
      },

      currentUserProfile(){
          return this.$store.getters.currentUserProfile;
      },
      isLoggedIn(){
        return this.$store.getters.isLoggedIn;
      },
      topics(){
        return this.$t('topics');
      },
      appLang(){
        return  this.$store.getters.appLang;

      }
    },


    methods:{

      onRefresh(){
          console.log(789);
      },
        showPost(postId){
          this.$router.push({ name: 'post', params: { postId: postId } })
        },


        ShowProfile(displayName){
          this.$router.push(`/${displayName}`);
        }


    },
    filters:{
          getDateForHumans(value){
            return moment(value).locale(Vue.i18n.locale()).subtract(-2, 'hours').fromNow();
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

</style>
