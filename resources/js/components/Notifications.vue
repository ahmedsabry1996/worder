<template >
<div>
  <div class="mmd hidden-sm-and-up" @scroll="loadMoreNotifications">
  <v-list two-line dark>
    <template v-for="(notification,index) in notifications">
          <v-list-tile router :to="`/${notification.data.url}`"  :key="index">

            <v-avatar color="#282e33">
              <v-icon color="#fff">notifications</v-icon>
   </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <bdi>

              {{notification.data.message}}
            </bdi>

            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{notification.data.created_at.date | getDateForHumans}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
  </template>
  </v-list>
  </div>
<v-menu class="hidden-xs-only" left offset-x width="200" :full-width="true">
  <v-btn slot="activator" @click="getNotifications" flat
  class="white--text mt-3"  icon>
  <v-avatar>
    <v-icon :color="notificationColor">notifications</v-icon>
  </v-avatar>

  </v-btn>
  <div class="mm" @scroll="loadMoreNotifications">

  <v-list two-line>
    <v-list-tile router :to="`/${notification.data.url}`" v-for="(notification,index) in notifications" :key="index">
      <v-list-tile-avatar>

      <v-avatar color="#282e33">
        <v-icon color="#fff">notifications</v-icon>
</v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
          <bdi>
            {{notification.data.message}}
          </bdi>
         </v-list-tile-title>
            <v-list-tile-sub-title>
              {{notification.data.created_at.date | getDateForHumans}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
    </v-list-tile>
  </v-list>
</div>
</v-menu>

</div>

</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import Echo from "laravel-echo";
import Pusher from "pusher-js";
var moment = require('moment');

export default {
      data(){
  return {
    showMenu:false,
    loading:false,
    offset:0,
    color:'white',
    pos1:0
    }

  },
  beforeRouteLeave (to, from, next) {
      this.$store.commit('showBottomNav');
      next()
  },
  computed:{
    currentUserProfile(){
        return this.$store.getters.currentUserProfile;
    },
    notifications(){
      return this.$store.getters.notifications;
    },
    notificationColor(){
      if (this.$store.getters.unreadNotifications) {
          return 'red';
      }
      else{
        return 'green';
      }
    },
    appLang(){
      return this.$store.getters.appLang;
    },
    unreadNotifications(){
        return this.$store.getters.unreadNotifications;

    },
    isLoggedIn(){
    return  this.$store.getters.isLoggedIn;
  },
    userToken(){
      return  this.$store.getters.userToken;

    },

    broadcastNotifications(){
      return this.$store.getters.broadcastNotifications;
    },

  },
  created(){
    this.loadMore();
    this.getNotifications();

  },
  mounted(){
    this.listen();
    this.$store.commit('showBottomNav');
  },
  methods:{
    loadMore(){
      const self = this;
            window.onscroll = function() {
              if (self.$router.param !=null) {

              let pos2 = window.innerHeight ;
              if (self.pos1 > pos2) {
                self.$store.commit('showBottomNav');
              }
              if (self.pos1 < pos2) {
                self.$store.commit('hideBottomNav');
              }
              self.pos1 = pos2;
            }
  }
},
    notificationSound(){
      var audio = new Audio(`http://127.0.0.1:8000/sounds/noti.ogg`);
      audio.play();
},
    getNotifications(){

          if (this.isLoggedIn) {
            this.$store.commit('showBottomNav');
            if (this.currentUserProfile.locale != this.appLang) {
                if (this.appLang == null) {
                  this.$store.dispatch('updateLocale',{
                    id:this.currentUserProfile.user_id,
                    locale:'en'});
                }
                else{
                  this.$store.dispatch('updateLocale',{
                    id:this.currentUserProfile.user_id,
                    locale:this.appLang});
                }

            }

            if (this.notifications.length === 0) {
                this.offset = 0;
              this.$store.dispatch('getNotifications');

            }
            this.$store.commit('markAsRead');

          }

    },
    listen(){
      const self = this ;
      if (self.isLoggedIn ) {
        window.Echo = new Echo({
         broadcaster: 'pusher',
         key: 'mykey',
         cluster: 'eu',
         encrypted: false,
         wsHost: window.location.hostname,
         wsPort: 6001,
         disableStats: true,
         auth: {
            headers: {
                Authorization: 'Bearer ' + this.$store.state.authentication.userToken
            },
        },

     });

       let decoded = self.jwt_decode(this.$store.state.authentication.userToken);
       window.Echo.private(`App.User.${decoded.sub}`)
       .notification((Notification) => {
          var newNotification = new Object();
          newNotification.data = {
            icon:Notification.icon,
            message:Notification.message,
            url:Notification.url,
            created_at:Notification.created_at,
          };
          console.log(newNotification);
         console.log(Notification);
         self.notificationSound();
         self.$store.commit('unreadNotifications');
         self.$store.commit('instantNotfication',newNotification)

       });

       window.Echo.channel('trend')
               .listen('.newTrend', function() {
                 axios.post('/api/trend/update',{},{
                   headers:{
                     Authorization:`Bearer ${self.$store.state.authentication.userToken}`
                   }
                 }).then((response)=>{
      console.log(response.data);

      self.notificationSound();
      self.$store.commit('topTen',{trend:response.data.trend.top_words});
                 })
                 .catch((errors)=>{
                   console.log(errors);
                   console.log(errors.response);
                 })
                   });

      }



    },

    loadMoreNotifications(e){
    let elHeight = e.target.clientHeight;

    let elscrollHeight = e.target.scrollHeight;

    let elScrollTop = e.target.scrollTop;

    if ((elHeight+elScrollTop) - elscrollHeight == 0) {

        this.offset +=10;
      this.$store.dispatch('loadMoreNotifications',{offset:this.offset});
      this.$store.commit('hideBottomNav');

      }
      else{
        this.$store.commit('showBottomNav');

      }
  },

    jwt_decode(token){

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        console.log('ddd');
        return JSON.parse(window.atob(base64));

    },

  },
  filters:{
    getDateForHumans(value){

      return moment(value).locale(Vue.i18n.locale()).subtract(-2, 'hours').fromNow();
    },
    highlightUsername(val){
      if (val.includes('start')) {
        return val.split(' ')[0];
      }

    }
  }
}
</script>

<style scoped>
.mm{
  width:400px !important;
  margin: 0 auto !important;
  height: 300px !important;
  max-height:300px !important;
  background-color:#fff !important;
  overflow:scroll;
  }
.mmd{
  margin:0 auto;
  width:100% !important;
  height: 100% !important;
  max-height:100% !important;
  background-color:#002d37 !important;
  overflow:scroll;
  position: absolute;
  top:58px;
  bottom:0;
  left:0;
  right:0
  }
</style>
