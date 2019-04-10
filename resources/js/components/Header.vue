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
      <v-list class="ml-2" background-color="#08343e">
        <template v-if="results.length == 0">
          <p>            no results
</p>
        </template>
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
    <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              dark
              small
              v-on="on" >
              <b>{{$t('tongue')}}</b>
           <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in languages"
              :key="index"
              @click="changeLanguage(item.code)"
           >
              <v-list-tile-title>{{ item.language }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
  </v-menu>
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


      <v-flex xs12 v-if="currentRoute">
        <div class="text-xs-center pa-0">

        <img src="/logo.png" alt="Worder" width="100">
        <h1 class="white--text text-uppercase">{{$t('reach')}}</h1>
      </div>

        <div class="text-xs-center">
          <v-btn
          medium
          color="#282e33"
          class="white--text"
          @click="selectedComponent = 'login'">
          <b>{{$t('login')}}</b>
         </v-btn>

          <v-btn
          medium
          color="#005F5B"
          class="white--text"
          @click="selectedComponent = 'signup'">
          <b>{{$t('signup')}}</b>
        </v-btn>
        <v-menu offset-y lazy dark>
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  v-on="on" >
                  <b>
                         {{$t('tongue')}}
</b>
                   <v-icon>arrow_drop_down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in languages"
                  :key="index"
                  @click="changeLanguage(item.code)"
               >
                  <v-list-tile-title >{{ item.language }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
   </v-menu>

        </div>
      </v-flex>
        <template v-if="isHome">
        <component :is="selectedComponent">
        </component>
      </template>
    </v-layout>


  </v-container>
  <div class="hidden-md-and-up" v-if="isLoggedIn">
  <v-bottom-nav
  app
  inset
  :value="showBottomNav"
  color="white"
  min-width="320">

    <v-btn
      class="hidden-sm-only"
      small
      router
      to="/me/notifications"
      color="#112f41"
      flat>
      <v-icon>notifications</v-icon>
    </v-btn>


    <v-btn
    router
      small
      to="/me/suggest"
      color="#112f41"
      flat>
      <v-icon>fiber_new</v-icon>
    </v-btn>
    <v-btn
      color="#112f41"
      flat
      small
      router
  :to="`/${currentUserProfile.display_name}`">
      <v-icon>inbox</v-icon>
    </v-btn>

    <v-btn
      color="#112f41"
      flat
      small
      router
      to="/me/trend"
      >
      <v-icon>trending_up</v-icon>
    </v-btn>

    <v-btn
      color="#112f41"
      flat
      small

      router
      to="/"
      >
      <v-icon>home</v-icon>
    </v-btn>
  </v-bottom-nav>
  </div>
  </v-content>

  </div>
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
              languages:[
                {'language':'العربية','code':'ar'},
                {'language':'Türkçe','code':'tr'},
                {'language':'English','code':'en'},
              ],
              selectedLanguage:'',
              selectedComponent:'login',
              loading:false,
              keyword:'',
              showResults:false,
              results:[],
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


            currenLocale(){
                return  this.$store.getters.appLang;
              },

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
              console.log(this.results);
            },
            selectedLanguage(newlang){
                Vue.i18n.set(newlang);
                this.$store.commit('changeLanguage',newlang);
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
              window.location.href =  "http://127.0.0.1:8000";

          },
          changeLanguage(language){
            if (this.isLoggedIn) {
              if (this.currentUserProfile.locale != this.currenLocale) {
                alert(language)
              this.$store.dispatch('updateLocale',{
                id:this.currentUser.id,
                locale:language});
                }
            }
            this.$store.commit('changeLanguage',language);
            Vue.i18n.set(language);
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
