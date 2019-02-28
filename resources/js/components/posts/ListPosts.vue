<template>


    <div v-if="perfectUser">

    <div class="text-xs-center" v-if="posts.length == 0">
      <v-icon color="white">fas fa-circle-notch fa-spin</v-icon>
    </div>

          <div class="mt-2 text-xs-center" v-for="(post,index) in posts" :key="post.id">
          <!-- publisher avatar -->
          <v-avatar
            size="55"
            class="#005f5b">
            <img
            @click="ShowProfile(post.user.profile.display_name)"
            :src="`/storage/avatars/${post.user.profile.avatar}`"
            :alt="post.user.name">
          </v-avatar>


          <!-- post publisher -->
          <div class="post-publisher mt-3 italic" @click="ShowProfile(post.user.profile.display_name)">
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

            <router-link :to="{ name: 'post', params: {postId:post.id} }" tag="p" class="white--text display-1">
                <b>

                  <p color="white--text ">
                      {{ post.post | subsetPost }}
                          </p>
                </b>
              </router-link>
          </div>

          <div  v-if="post.image">
            <v-img
            :src="`/storage/posts_images/${post.image}`"
            class="grey lighten-2"
            @click="showPost(post.id)">
        </v-img>

            <!-- <img  alt="img" width="400" height="400" class="img-rounded" style="box-shadow:0px 4px 7px  #000;margin:10px">
          -->
          </div>

          <!-- React to post -->


        <div class="post-react">
          <React :post_id="post.id"/>

        </div>

        <!-- number of reactions -->

        <div class="post-react-number">
          <p class="text-center">

            <span v-if="post.dislikes_counter"
            style="position:relative;font-size:10pt ;color:#F4EEEC;margin: auto 14px;cursor:pointer;">
              {{post.dislikes_counter.count | numeral('0 a')}}
            </span>

            <span v-else
            style="position:relative;font-size:10pt ;color:#F4EEEC;margin: auto 14px;cursor:pointer;top:3px">
                0
              </span>


            <span v-if="post.likes_counter"
            style="font-size:10pt ;color:#F4EEEC;margin: auto 14px;cursor:pointer;">

                    {{post.likes_counter.count | numeral('0 a')}}

            </span>

            <span v-else
            style="font-size:10pt ;color:#F4EEEC;margin: auto 14px;cursor:pointer;">
                  0
            </span>

          </p>
        </div>

        <!-- date of post -->
        <div class="post-date">
              <b>
              {{ post.created_at | getDateForHumans }}
              </b>
        </div>

        <!-- post topic -->
        <div class="post-topic" v-if="post.topic">
            <p class="text-primary" style="opacity:.8">
                <b>  {{post.topic.topic}}</b>
            </p>
        </div>
        <v-divider></v-divider>
  </div>


  </div>
</div>
</template>

<script>

var moment = require('moment');

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
          this.$router.push({ name: 'post', params: { postId: postId } })
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

</style>
