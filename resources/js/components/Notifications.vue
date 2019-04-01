<template >
<div>
  <div class="mmd hidden-sm-and-up" @scroll="loadMoreNotifications">
  <v-list two-line dark>
    <template v-for="(notification,index) in notifications">
          <v-list-tile router :to="`/${notification.data.url}`"  :key="index">
      <v-list-tile-avatar>
            <img :src="`/storage/avatars/${notification.data.icon}`">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{notification.data.message}}</v-list-tile-title>
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
  <v-btn slot="activator" @click="getNotifications" flat class="white--text mt-3"  icon>
    <v-icon :color="color">
      notifications
    </v-icon>
  </v-btn>
  <div class="mm" @scroll="loadMoreNotifications">

  <v-list two-line>
    <v-list-tile router :to="notification.data.url" v-for="(notification,index) in notifications" :key="index">
      <v-list-tile-avatar>
            <img :src="`/storage/avatars/${notification.data.icon}`">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{notification.data.message}}</v-list-tile-title>
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
    }

  },

  computed:{
    notifications(){
      return this.$store.getters.notifications;
    },
    unreadNotifications(){
        if (!this.$store.getters.unreadNotifications) {
            return  this.color =  'white';
        }
        else{
        return   this.color = 'error';
      }

    },
    isLoggedIn(){
    return  this.$store.getters.isLoggedIn;
  },
    userToken(){
      return  this.$store.getters.userToken;

    },

    broadcastNotifications(){
      return this.$store.getters.broadcastNotifications;
    }

  },

  mounted(){
    this.listen();

  },
  methods:{
    notificationSound(){
      var audio = new Audio(`http://127.0.0.1:8000/sounds/noti.ogg`);
      audio.play();
},
    getNotifications(){

          if (this.isLoggedIn) {
            if (this.notifications.length === 0) {
                this.offset = 0;
              this.$store.dispatch('getNotifications');

            }

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
      console.log(454545);
        this.offset +=10;
      this.$store.dispatch('loadMoreNotifications',{offset:this.offset})
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

      return moment(value).locale("ar").subtract(-2, 'hours').fromNow();
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
  width:300px !important;
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
