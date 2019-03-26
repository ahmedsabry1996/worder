<template>
<v-content>
<v-toolbar app color="#005556" class="hidden-xs-only" v-if="perfectUser">
    <v-toolbar-title  class="white--text" >
      <v-btn small flat router to="/" class="white--text headline"> Worder</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-and-down white--text">
    <v-menu offset-y>
      <v-text-field flat
      dark
      class="mt-2"
      :placeholder="$t('search')"
      prepend-icon="search"
      v-model="keyword"
      slot="activator"

            ></v-text-field>


      <v-list class="ml-2" v-if="results.length > 0">
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


      <v-btn  flat router  class="white--text" :to="`/${currentUserProfile.display_name}`">profile <span>
      </span>
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
      <v-flex xs12>
        <div class="text-xs-center">

          <v-btn round 
          class="primary white--text"
          @click="selectedComponent = 'login'">
          login
         </v-btn>

          <v-btn
          round
          class="primary white--text"
          @click="selectedComponent = 'signup'">
          signup
        </v-btn>

        </div>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <component :is="selectedComponent">
        </component>
      </v-flex>
    </v-layout>
  </v-container>
</v-content>
</template>

<script>
    import axios from 'axios';
    import Notifications from './Notifications.vue'
    import Login from './auth/Login.vue'
    import Signup from './auth/Signup.vue'
  export default {
      data(){
          return {
              selectedComponent:'signup',
              loading:false,
              keyword:'',
              showResults:false,
              results:[]
          }
      },


        mounted() {


        },
        components:{
          Notifications,
          Login,
          Signup,
        },
        computed:{

          isLoggedIn(){

            return  this.$store.getters.isLoggedIn;

          },
          needProfile(){
          return this.$store.getters.isVerified == "1" && this.$store.getters.hasProfile == "0"

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
        trend(){
            return this.$store.getters.topTen ;

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
              "Authorization":`Bearer ${localStorage.getItem('access_token')}`
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

          logout(){
              localStorage.clear();
              this.$store.commit('logout');
              window.location.href =  "http://127.0.0.1:8000";

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
