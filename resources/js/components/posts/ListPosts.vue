<template>

<div v-if="isLoggedIn">

    <div class="text-xs-center" v-if="posts.length == 0">
      <v-icon color="white">fas fa-circle-notch fa-spin</v-icon>
    </div>
    <v-dialog
      v-model="reportDialoge"
      max-width="500px"
      transition="dialog-transition">
      <v-card color="#002d37" class="white--text">
        <v-card-title >
          {{$t('report')}}
        </v-card-title>
        <v-card-text>
          <div class="text-xs-center">
          <h3>{{$t('whyReport')}}</h3>
          <h2>{{reportedPostId}}</h2>
        </div>
        </v-card-text>
        <div class="text-xs-center options white--text pa-3">
            <v-radio-group v-model.lazy="reason" class="white--text">
                <template v-for="reason in reasons">
                <v-radio dark class="white--text" :label="reason" :value="reason"></v-radio>
              </template>
            </v-radio-group>
            <v-textarea
                    solo
                    dark
                    no-resize
                    v-model.lazy="note"
                    :label="$t('notes')"
            ></v-textarea>
        </div>
        <div class="text-xs-center">
            <v-btn @click="doReport" round color="error" :disabled="!(!!reason)">{{$t('report')}}</v-btn>
        </div>
      </v-card>
    </v-dialog>
          <div class="mt-2" v-for="(post,index) in posts">
            <div class="text-xs-left" :key="post.id">

            <v-btn icon flat small color="white" @click="report(post.id)">
              <v-icon>report</v-icon>
            </v-btn>
          </div>
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
            <v-avatar color="#112f41" @click="ShowProfile(post.user.profile.display_name)">
     <span class="white--text headline">
       {{post.user.name.charAt(0).toUpperCase()}}
     </span>
          </v-avatar>
          </template>

          <!-- post publisher -->
          <div class="post-publisher mt-3" @click="ShowProfile(post.user.profile.display_name)">
              <h4 style="cursor:pointer" class="white--text">

                <span style="position: relative;top: -2px;" v-if="post.user.profile.is_verified == 0">
                  <v-tooltip left color="success">

                  <b slot="activator">
        <v-icon size="medium" color="success">check_circle</v-icon>
                </b>
                <b class="white--text">verified user</b>
              </v-tooltip>

              </span>
                 <b class="yellow--text">{{post.user.profile.display_name}}</b>
              </h4>
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

  <v-snackbar
    v-model="snackbar"
      bottom
    :timeout="1501"
    color="white"
    >
    <b class=" indigo--text"  >
  {{$t('done')}}
     </b>
    <v-btn
      color="indigo"
      flat
      @click="snackbar = false">
    <bdi>
      {{$t('done')}}
    </bdi>
    </v-btn>
  </v-snackbar>

  </div>

</div>

</template>

<script>

var moment = require('moment');

import Vue from 'vue';
import axios from 'axios';
import React from './React.vue';
export default {
  data(){
      return {
          reportedPostId:'',
          reportDialoge:false,
          snackbar:false,
          reason:'',
          note:'',
      }
  },
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
      reasons(){
          return this.$t('reportReasons');
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

      report(id){
        this.reportedPostId = id;
        this.reportDialoge = true;
      },
      doReport(){
        this.$store.dispatch('report',{
          postId:this.reportedPostId,
          reason:this.reason,
          notes:this.note
        })
        .then((response)=>{
            this.$store.commit('removeFromTimeline',{id:this.reportedPostId})
            this.reportDialoge = false;
            this.snackbar =true;
            this.reason = '';
            this.note = '';
        })
        .catch((error)=>{
          console.log(error.response);
          this.reportDialoge = false;

        })
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
