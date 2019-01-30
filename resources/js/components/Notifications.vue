<template >

    <li class="dropdown hidden-xs" >
    <a class="dropdown-toggle" data-toggle="dropdown" @click="getNotifications">
      <span  v-if="!unreadNotifications">
            <font-awesome-icon
            :icon= "['fas','bell']" style="transform:scale(1.5);color:green" />
  </span>
  <span v-if="unreadNotifications">
                  <font-awesome-icon
                  :icon= "['fas','bell']" style="transform:scale(1.5);color:red"/>
  </span>
  </a>

        <ul class="dropdown-menu text-center" @scroll="loadMoreNotifications">
          <li v-for="notification in notifications" class="text-center">
            <template v-if="notification.type !== 'App\\Notifications\\NewFollower'" class="text-center">

              <router-link :to="{ name: 'post', params: { postId : notification.data.post_id} }">
              <p class="notification text-center">
                <router-link :to="`/${notification.data.reacter_display_name}`">

                      <img :src="`/storage/avatars/${notification.data.profile_avatar}`" :alt="`${notification.data.reacter_display_name}`"
                       width="40" height="40" class="img-circle"  style="z-index:2000">
                     </router-link>
                     <router-link :to="{ name: 'post', params: { postId : notification.data.post_id} }">

                        <b style="font-style:italic">{{notification.data.reacter_display_name}}</b> {{notification.data.message}}
                        <i style="opacity:.5">{{notification.created_at | getDateForHumans}}</i>
                      </router-link>

              </p>
              </router-link>

          </template>
          <template v-else>
            <router-link :to="`/${notification.data.follower_display_name}`">
      <p>

              <img :src="`/storage/avatars/${notification.data.avatar}`" :alt="`${notification.data.follower_display_name}`"
               width="40" height="40" class="img-circle"  style="z-index:2000">

                <b>{{notification.data.follower_display_name}}</b> {{notification.data.message}}

      </p>
            </router-link>

          </template>
            </li>
        </ul>
  </li>
</template>

<script>
import axios from 'axios';
import Echo from "laravel-echo";
import Pusher from "pusher-js";
var moment = require('moment');

export default {
      data(){
  return {

    loading:false,
    offset:0
    }

  },

  computed:{
    notifications(){
      return this.$store.getters.notifications;
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
    isVerified(){
      return this.$store.getters.isVerified;
    },
    hasProfile(){
      return this.$store.getters.hasProfile;
    },

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
      //this.inter =  window.setInterval(function () {
      if (this.isLoggedIn && this.hasProfile && this.isVerified ) {
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
                Authorization: 'Bearer ' + localStorage.getItem("access_token")
            },
        },

     });

       let decoded = self.jwt_decode(localStorage.getItem("access_token"));
       window.Echo.private(`App.User.${decoded.sub}`)
       .notification((Notification) => {
         console.log();
         self.notificationSound();
         self.$store.commit('unreadNotifications');

       });

       window.Echo.channel('trend')
               .listen('.newTrend', function() {
                 axios.post('/api/trend/update',{},{
                   headers:{
                     Authorization:`Bearer ${localStorage.getItem('access_token')}`
                   }
                 }).then((response)=>{
      console.log(response.data);

      self.notificationSound();
      localStorage.setItem('trend',(response.data.trend.top_words))
      self.$store.commit('topTen');
                 })
                 .catch((errors)=>{
                   console.log(errors);
                   console.log(errors.response);
                 })
                   });

  //      clearInterval(self.inter);
      }


//    }, 1000);

    },

    loadMoreNotifications(e){

    let elHeight = e.target.clientHeight;

    let elscrollHeight = e.target.scrollHeight;

    let elScrollTop = e.target.scrollTop;

    if ((elHeight+elScrollTop) - elscrollHeight == 0) {

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

      return moment(value).locale("tr").subtract(-2, 'hours').fromNow();
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
.dropdown-menu {
  min-height: 300px;
  max-height: 300px;
	overflow-y: scroll;
}
</style>
