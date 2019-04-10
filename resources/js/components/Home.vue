<template>
    <v-app class="app">
      <Header/>

        <router-view></router-view>
        <template v-if="homePage">
          <keep-alive>
            <time-line></time-line>
          </keep-alive>
        </template>
</v-app>
</template>

<script>

  import Header from './Header.vue';
  import TimeLine from './Timeline.vue';
  import VueProgressBar from 'vue-progressbar';
  import ListPosts from './posts/ListPosts';

  import Ad from './ads/Ad.vue';


    export default {
      created () {
            this.$Progress.start()
            this.$router.beforeEach((to, from, next) => {
            this.$Progress.start();
            next();
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
          TimeLine,

        },
        computed:{
            isLoggedIn(){
              return this.$store.getters.isLoggedIn;

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
          },
          homePage(){
            if (this.isLoggedIn) {

              return   this.$route.name == null;
            }
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
     background-attachment: fixed !important;
}

</style>
