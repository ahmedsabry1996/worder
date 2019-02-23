<template>
<v-content>
<v-toolbar app color="#005556" class="hidden-xs-only" v-if="perfectUser">
    <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon>
    <v-toolbar-title router to="/" class="white--text" >Worder</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-and-down white--text">

      <notifications left></notifications>


      <v-btn  flat router  class="white--text" :to="`/${currentUserProfile.display_name}`">profile <span>
        <v-icon>arrow_drop_down</v-icon>
      </span>
    </v-btn>

    </v-toolbar-items>

</v-toolbar>
    <!-- <nav class="navbar navbar-default" role="navigation" v-if="isLoggedIn">
    <div class="container-fluid">


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

            <li><router-link :to="`/${currentUserProfile.display_name}`"> <b>{{currentUserProfile.display_name}}</b> </router-link></li>
            <li><a @click.prevent="logout" style="cursor:pointer"> <b>{{$t('logout')}}</b> </a></li>
          </template>
          <template v-if="needProfile">
            <li v-if="needProfile"><router-link  to="/create-profile"> <b>  {{$t('createprofile')}}</b> </router-link></li>
            <li><a @click.prevent="logout"> <b>  {{$t('exit')}}</b> </a></li>

          </template>

          <template v-if="cotinueSignup">
            <li><router-link to= "/signup"> <b>  {{$t('continuesignup')}}</b> </router-link></li>
          </template>
        </ul>
        <form @submit.prevent="showMore()" v-if="perfectUser" class="hidden-xs navbar-form navbar-right col-md-pull-3 col-md-12" >
     <div class="form-group">
       <input type="text" class="form-control" v-model="keyword" :placeholder="$t('search')" @focus="showResults = true" @blur="hideResults">
     </div>
   </form>
      </div>
    </div>
  </nav> -->
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
      <v-flex xs6 class="text-xs-center">
        <v-btn large flat color="white" router to="/login">{{$t('login')}}</v-btn>
      </v-flex>
      <v-flex xs6 class="text-xs-center">
        <v-btn large flat color="white" router to="/signup">{{$t('signup')}}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-content>
</template>

<script>
    import axios from 'axios';
    import Notifications from './Notifications.vue'
  export default {
      data(){
          return {
              loading:false,
              toggleDropdown:false,
              notivar:false,
              logged:false,
              keyword:'',
              showResults:false,
              results:[]
          }
      },


        mounted() {


        },
        components:{
          Notifications,
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
