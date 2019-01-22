<template>
<div>
    <nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
      <li class="dropdown visible-xs" id="xs" v-if="perfectUser"  @click="getNotifications">
      <a class="dropdown-toggle" data-toggle="dropdown">
      <span  v-if="!unreadNotifications">
        <font-awesome-icon
        :icon= "['fas','bell']" style="transform:scale(1.5);color:green" />
      </span>
      <span v-if="unreadNotifications">
              <font-awesome-icon
              :icon= "['fas','bell']" style="transform:scale(1.5);color:red"/>
      </span>
      </a>
      <ul class="dropdown-menu" @scroll="loadMoreNotifications">
        <li v-for="notification in notifications" class="text-center">
          <template v-if="notification.type !== 'App\\Notifications\\NewFollower'" class="text-center">
              <router-link :to="{ name: 'post', params: {postId:notification.data.post_id} }">
            <p class="notification text-center">
              <router-link :to="`/${notification.data.reacter_display_name}`">

                    <img :src="`/storage/avatars/${notification.data.profile_avatar}`" :alt="`${notification.data.reacter_display_name}`"
                     width="40" height="40" class="img-circle"  style="z-index:2000">
                   </router-link>
                   <router-link :to="`post/${notification.data.post_id}`">

                      <b style="font-style:italic">{{notification.data.reacter_display_name}}</b> {{notification.data.message}}
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

      <div class="navbar-header">

        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

      </div>

      <form @submit.prevent="showMore()" v-if="perfectUser" class="visible-xs navbar-form navbar-right">
   <div class="form-group">
     <input type="text" class="form-control" v-model="keyword" :placeholder="$t('search')">
   </div>
   <ul class="list-group results visible-xs">

     <li class="list-group-item" v-for="result in results" style="height:60px;" @click="showResults = false;results = null;keyword='';goTo(result.profile.display_name)">
       <p>
       <img class="img-rounded" style="" :src="`/storage/avatars/${result.profile.avatar}`" :alt="result.name" width="30" height="30">
       <router-link style="padding:10px" :to="`/${result.profile.display_name}`">
         {{result.name}}
       </router-link>
       <br>
       <i style="opacity:.5;color:#000;text-align:right" class="text-center">{{result.profile.display_name}}</i>
     </p>
   </li>
   <li class="list-group-item " v-if="results.length == 5">
     <a  href="#">see more</a>
   </li>
   </ul>
 </form>


    <div class="collapse navbar-collapse" id="navbar">
        <ul class="nav navbar-nav">
          <li class="active"><router-link to="/"> <b>Worder</b> </router-link></li>

        </ul>
        <ul class="nav navbar-nav navbar-right">
          <template v-if="!isLoggedIn">
          <li><router-link to = "/login"> <b>{{$t('login')}}</b> </router-link></li>
          <li><router-link to= "/signup"> <b>{{$t('signup')}}</b> </router-link></li>
          </template>
          <template v-if="perfectUser">


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

            <router-link :to="{ name: 'post', params: {postId:notification.data.post_id} }">
            <p class="notification text-center">
              <router-link :to="`/${notification.data.reacter_display_name}`">

                    <img :src="`/storage/avatars/${notification.data.profile_avatar}`" :alt="`${notification.data.reacter_display_name}`"
                     width="40" height="40" class="img-circle"  style="z-index:2000">
                   </router-link>
                   <router-link :to="{ name: 'post', params: {postId:notification.data.post_id} }">

                      <b style="font-style:italic">{{notification.data.reacter_display_name}}</b> {{notification.data.message}}
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
            <li><a @click.prevent="logout" style="cursor:pointer"> <b>{{$t('logout')}}</b> </a></li>
            <li><router-link :to="`/${currentUserProfile.display_name}`"> <b>{{currentUserProfile.display_name}}</b> </router-link></li>
          </template>
          <li v-if="needProfile"><router-link  to="/create-profile"> <b>  {{$t('createprofile')}}</b> </router-link></li>

          <template v-if="cotinueSignup">
            <li><router-link to= "/signup"> <b>  {{$t('continuesignup')}}</b> </router-link></li>
          </template>
          <template v-if="cotinueSignup || needProfile">
            <li><button @click.prevent="logout" class="btn btn-default"> <b>  {{$t('exit')}}</b> </button></li>

          </template>
        </ul>
        <form @submit.prevent="showMore()" v-if="perfectUser" class="hidden-xs navbar-form navbar-right col-md-pull-3 col-md-12" >
     <div class="form-group">
       <input type="text" class="form-control" v-model="keyword" :placeholder="$t('search')" @focus="showResults = true" @blur="hideResults">
     </div>
   </form>
      </div>
    </div>
  </nav>
  <ul class="list-group col-md-3 col-md-offset-7 results-md" id="results-md" v-if="showResults && results.length > 0" >
      <li class="list-group-item" v-for="result in results" style="height:60px;" @click="showResults = false;results = [];keyword='';goTo(result.profile.display_name)">
        <p>
        <img class="img-rounded" style="" :src="`/storage/avatars/${result.profile.avatar}`" :alt="result.name" width="30" height="30">
        <router-link style="padding:10px" :to="`/${result.profile.display_name}`">
          {{result.name}}
        </router-link>
        <br>
        <i style="opacity:.5;color:#000;text-align:right" class="text-center">{{result.profile.display_name}}</i>
      </p>
    </li>
    <li class="list-group-item" @click="seeMore" v-if="results.length == 5">
      <a href="#" >see more</a>
    </li>
  </ul>
</div>
</template>

<script>
    import axios from 'axios';
    import Echo from "laravel-echo";
    import Pusher from "pusher-js";

  export default {
      data(){
          return {
              notificationOffset:100,
              toggleDropdown:false,
              notivar:false,
              logged:false,
              keyword:'',
              showResults:false,
              results:[]
          }
      },


        mounted() {

          this.listen();
        },
        computed:{
          isLoggedIn(){

            return  this.$store.getters.isLoggedIn;
          },
          needProfile(){
          return this.$store.state.isVerified == 1 && this.$store.state.hasProfile == 0 && this.$route.path!=='/create-profile';

        },
        perfectUser(){
            return this.$store.getters.isLoggedIn == true && this.$store.getters.isVerified == "1" && this.$store.getters.hasProfile == "1";
        },
        cotinueSignup(){
            return this.$store.getters.isLoggedIn == true && this.$store.getters.isVerified == "0" && this.$store.getters.hasProfile == "0";
        },

        currentUser(){
            return this.$store.getters.currentUser;
        },

        currentUserProfile(){
            return this.$store.getters.currentUserProfile;
        },
        notifications(){
          return this.$store.getters.notifications;
        },
        unreadNotifications(){
          return this.$store.getters.unreadNotifications;
        },
        trend:{
          get(){
            return this.$store.getters.trend ;

          },
          set(){
              return null;
          }
        }
        },
        watch:{
            keyword(val){
              console.log("new  val = "  + val);
              if (val.length > 0) {
                this.search(val);
              }
              else {
                this.results = [];
              }
              }
        },
        methods:{

            notificationSound(){
              var audio = new Audio(`http://127.0.0.1:8000/sounds/noti.ogg`);
              audio.play();

            },
            goTo(display_name){
                this.$router.push(`/${display_name}`);
            },
            seeMore(){
              alert(2341);
            },
            hideResults(e){

            const self = this;
            setTimeout(function () {
            self.showResults = false;
            self.results = [];

          }, 250);
            },
          search(val){
            axios.post("/api/timeline/search",{
              word:val
            },
          {
            headers:{
              "Authorization":`Bearer ${this.$store.state.userToken}`
            }
          }).
          then((response)=>{
              console.log(response.data.results);
              this.results = response.data.results;
          })
          .catch((errors)=>{
            console.log(errors);
            console.log(errors.response);
          })
          },
          getNotifications(){

            this.toggleDropdown = !this.toggleDropdown;

              if (this.toggleDropdown) {

                if (this.$store.state.isLoggedIn) {
                  this.$store.dispatch('getNotifications');
                }
              }

          },
          trend(){

          },
        listen(){
          const self = this ;
          this.inter =  window.setInterval(function () {
          if (localStorage.getItem('access_token') && localStorage.getItem('is_verified') == "1" && localStorage.getItem('has_profile') == 1  ) {
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
           .notification((e) => {
             console.log(e);
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
          let trend = localStorage.setItem('trend',response.data.trend.top_words);
          self.$store.commit('trend');
          self.$store.commit('newTrend');
                     })
                     .catch((errors)=>{
                       console.log(errors);
                       console.log(errors.response);
                     })
                       });

            clearInterval(self.inter);
          }


        }, 1000);

   }   ,

   jwt_decode(token){

            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            console.log('ddd');
            return JSON.parse(window.atob(base64));

   },

              loadMoreNotifications(e){

              let elHeight = e.target.clientHeight;

              let elscrollHeight = e.target.scrollHeight;

              let elScrollTop = e.target.scrollTop;

              if ((elHeight+elScrollTop) - elscrollHeight == 0) {

                  axios.post('/api/timeline/load-more-notifications',{
                    offset:this.notificationOffset
                  },{
                    headers:{
                      "Authorization":`Bearer ${this.$store.state.userToken}`
                    }
                  })
                  .then((response)=>{
                    this.$store.commit('PushToNotificatiosn',response.data.notifications);
                    console.log(response.data.notifications);
                    this.notificationOffset +=100;
                    console.log(this.notificationOffset);
                  })
                  .catch((errors)=>{
                    console.log(errors);
                    console.log(errors.response);
                  })
              }
            },
          logout(){
              localStorage.clear();
              this.$store.commit('logout');
            //  alert('logged out');
          }
        },
        filters:{
          highlightUsername(val){
            if (val.includes('start')) {
              return val.split(' ')[0];
            }

          }
        }
    }
</script>
<style scoped>
a{
  cursor: pointer;
  font-weight: bold
}
a.notification{
  text-decoration: none;
}
a.notification:hover{
  background-color: #ddd;
  text-decoration: none;

}
.dropdown-menu {
	height: 204px;
	z-index: 20000;
  overflow-y: scroll;
  word-break: break-all;
}
#xs {
	position: relative;
	top: 36px;
}
p.notification a{
  color: #000;
  font-weight: 400;
}
p.notification a:hover{
  text-decoration: none
}

.results-md {
	position: absolute;
	z-index: 200000;
	 top: 46px;
	left: -280px;

}
.results-md li {
  cursor: pointer;
  color:#fff;
  font-weight: bold;
}
.results-md li a{
  color: #000;

  text-overflow: ellipsis;
  text-decoration: none;
}
.results-md li i {
	opacity: 0.5;
	color: rgb(0, 0, 0);
}

</style>
