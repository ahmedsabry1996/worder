<template>
<v-content>

  <v-toolbar class="hidden-md-and-up" app color="#005556">
    <v-toolbar-title  class="white--text" >
        <img @click="goHome" src="/logo.png" alt="worder" width="40" class="mr-3 mt-2">
    </v-toolbar-title>
    <v-menu offset-y v-if="isLoggedIn">
      <v-text-field flat
      dark
      class="mt-2"
      color="white"
      :placeholder="$t('search')"
      prepend-inner-icon="search"
      v-model="keyword"
      slot="activator">
      </v-text-field>
      <v-list class="ml-2" v-if="results.length > 0" background-color="#08343e">
        <template v-for="result in results">

          <v-list-tile avatar router :to="`/${result.profile.display_name}`">
            <v-list-tile-avatar>
              <img :src="`/storage/avatars/${result.profile.avatar}`" :alt="result.name">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{result.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{result.profile.display_name}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>


  </v-toolbar>
<v-toolbar app color="#005556" class="hidden-xs-only" v-if="isLoggedIn">
    <v-toolbar-title  class="white--text" >
        <img @click="goHome" src="/logo.png" alt="worder" width="60" class="ml-4 mt-2">
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-and-down white--text">
    <v-menu offset-y>
      <v-text-field flat
      dark
      class="mt-2"
      color="white"
      :placeholder="$t('search')"
      prepend-inner-icon="search"
      v-model="keyword"
      slot="activator">
      </v-text-field>
      <v-list class="ml-2" v-if="results.length > 0" background-color="#08343e">
        <template v-for="result in results">

          <v-list-tile avatar router :to="`/${result.profile.display_name}`">
            <v-list-tile-avatar>
              <img :src="`/storage/avatars/${result.profile.avatar}`" :alt="result.name">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{result.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{result.profile.display_name}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>

      <notifications left></notifications>


      <v-btn  flat router  class="white--text" :to="`/${currentUserProfile.display_name}`">
        {{$t('profile')}}
         <span>
      </span>
    </v-btn>
    <v-btn flat router class="white--text" @click="logout">
      <b>      {{$t('logout')}}
</b>
    </v-btn>

    </v-toolbar-items>

</v-toolbar>

    </div>

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
    <li class="list-group-item"  v-if="results.length == 5">
      <a href="#" >see more</a>
    </li>
  </ul>
  <v-container grid-list-md v-if="!isLoggedIn">
    <v-layout row wrap>

      <v-flex xs12 text-xs-center>
        <h1 class="white--text">{{$t('welcome')}}</h1>
      </v-flex>
      <v-flex xs12 v-if="currentRoute">
        <div class="text-xs-center">
          <v-btn
          large
          round
          class="indigo white--text"
          @click="selectedComponent = 'login'">
          <b>{{$t('login')}}</b>
         </v-btn>

          <v-btn
          large
          round
          class="indigo white--text"
          @click="selectedComponent = 'signup'">
          <b>{{$t('signup')}}</b>
        </v-btn>

        </div>
      </v-flex>
        <template v-if="isHome">

        <component :is="selectedComponent">
        </component>
      </template>
    </v-layout>


  </v-container>
  <div class="hidden-md-and-up" v-if="isLoggedIn">
<v-content>

  <v-bottom-nav
  app
  :value="showBottomNav"
 color="white"
    >

    <v-btn
      router
      to="/me/notifications"
      color="#112f41"
      flat>
      <span>{{$t('notifications')}}</span>
      <v-icon>notifications</v-icon>
    </v-btn>


    <v-btn
    router
      to="/me/suggest"
      color="#112f41"
      flat>
      <span>{{$t('people')}}</span>
      <v-icon>fiber_new</v-icon>
    </v-btn>
    <v-btn
      color="#112f41"
      flat
      router
  :to="`/${currentUserProfile.display_name}`"
    >
      <span>{{$t('profile')}}</span>

      <v-icon>inbox</v-icon>
    </v-btn>

    <v-btn
      color="#112f41"
      flat
      router
      to="/"
      >
      <span>{{$t('home')}}</span>
      <v-icon>home</v-icon>
    </v-btn>



  </v-bottom-nav>
</v-content>

  </div>
  </v-content>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import Notifications from './Notifications.vue'
    import Login from './auth/Login.vue'
    import Signup from './auth/Signup.vue'
  export default {
      data(){
          return {
              selectedComponent:'login',
              loading:false,
              keyword:'',
              showResults:false,
              results:[]
          }
      },

        mounted() {
          console.log('Header loaded');
        },
        components:{
          Notifications,
          Login,
          Signup,
        },
        computed:{
            showBottomNav(){
                return  this.$store.getters.showBottomNav;
            },
          isLoggedIn(){

            return  this.$store.getters.isLoggedIn;

          },


          isHome(){
            return this.$route.name == null
          },
        currentUser(){
            return this.$store.getters.currentUser;
        },

        currentUserProfile(){
            return this.$store.getters.currentUserProfile;
        },
        trend(){
            return this.$store.getters.topTen ;

        },
        currentRoute(){
          return this.$route.name == null ;
        }
        },
        watch:{
            keyword(val){
              if (val.length > 0) {
                this.search(val);
              }
              else {
                this.results = [];
              }
              }
        },
        methods:{

          goHome(){
            this.$router.push('/');

          },
            goTo(display_name){
                this.$router.push(`/${display_name}`);
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
              "Authorization":`Bearer ${this.$store.state.authentication.userToken}`
            }
          }).
          then((response)=>{
              this.results = response.data.results;
          })
          .catch((errors)=>{
            console.log(errors);
            console.log(errors.response);
          })
          },

          logout(){
              this.$store.commit('logout');
              localStorage.clear();
              window.location.href =  "http://127.0.0.1:8000";

          },
          setIt(){

            Vue.i18n.set('ar');
          }
        },

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
