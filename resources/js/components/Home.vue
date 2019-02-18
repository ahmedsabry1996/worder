<template>
    <v-app class="app">

      <Header/>

      <v-container grid-list-md>

      <template v-if="!isLoggedIn">
        
        <router-view></router-view>
      </template>

      <template v-if="perfectUser">
        <template v-if="currentRoute.path=='/'">
          <v-flex xs12>
            <create-post></create-post>
          </v-flex>
      </template>

        <template >
          <v-flex md3 class="suggest">
          <template v-if="!profileRoutes">
                <suggested-people></suggested-people>
      </template>
</v-flex>
    </template>

          <template v-if="profileRoutes">
            <v-flex md12>

              <router-view></router-view>
            </v-flex>
          </template>

          <template v-else>
            <v-flex md6>
              <router-view></router-view>
            </v-flex>
          </template>


      <template v-if="!profileRoutes">

          <v-flex md3>
            <trend></trend>
            <topics></topics>
          </v-flex>
      </template>
    </template>
      <template v-if="needProfile">
        <router-view></router-view>
      </template>
      <template v-if="needVerify">
        <router-view></router-view>
      </template>

<tooltip class="text-center totool"/>

      </v-container>
</v-app>
</template>

<script>

  import Header from './Header.vue';
  import createPost from './posts/Createpost.vue';
  import TimeLine from './Timeline.vue';
  import VueProgressBar from 'vue-progressbar';
  import SuggestedPeople from './Suggestpeople.vue';
  import ListPosts from './posts/ListPosts';
  import Topics from './topics/Topics.vue';
  import Ad from './ads/Ad.vue';
  import Trend from './trend/Trend.vue';


    export default {
      created () {
            this.$Progress.start()
            this.$router.beforeEach((to, from, next) => {
            this.$Progress.start()
            next()
  })

  this.$router.afterEach((to, from) => {
    this.$Progress.finish()
  })
},
        mounted() {


              this.$Progress.finish();
        },

        methods:{

        },

        components:{
          Header,
          createPost,
          TimeLine,
          SuggestedPeople,
          Topics,
          Trend
        },
        computed:{
            isLoggedIn(){
              return this.$store.getters.isLoggedIn;

            },
            perfectUser(){
                return (this.$store.getters.isLoggedIn == true &&
                      this.$store.getters.isVerified == "1" &&
                      this.$store.getters.hasProfile == "1");
            },
          needProfile(){
            return (this.$store.getters.isVerified == "1"
             && this.$store.getters.hasProfile == "0");
          },
          needVerify(){
            if (this.$store.getters.isVerified == "0"
    && this.$store.getters.hasProfile == "0"
   && !!this.$store.getters.verificationCode && this.$store.getters.isLoggedIn){
    return true;
    }
          },
          currentRoute(){
          return this.$route ;
          },


          profileRoutes(){
            if (this.$route.name) {
              return this.$route.name.includes('-profile');
            }
            return  false;
          },

          numOfFollowers(){
            return this.$store.getters.follower;
          },
          numOfFollowing(){

              return this.$store.getters.following;
          }

        },



    }
</script>
<style>
body{
  overflow-x: hidden;
}

.totool{
  font-weight: bold;
  border: 1px solid #ddd;
  border-radius: 7px;
}
.app{

 background-image: radial-gradient(circle, #005f5b, #005556, #004c50, #004249, #003942, #06353f, #0c313b, #102d37, #182d36, #1e2d36, #242e34, #282e33) !important;
     font-family: 'Ubuntu', sans-serif;
}

</style>
