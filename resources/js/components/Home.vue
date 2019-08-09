<template>
    <v-app class="app">
      <Header/>
        <router-view></router-view>
        <template v-if="homePage">
            <time-line></time-line>
        </template>
</v-app>
</template>

<script>

  import Header from './Header.vue';
  import TimeLine from './Timeline.vue';
  import ListPosts from './posts/ListPosts';
  import Ad from './ads/Ad.vue';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ easing: 'ease-in-out', speed: 3000 });

    export default {

      created () {
        window.scrollTo(0,0)
      this.$router.beforeEach((to, from, next) => {
            //start load
                NProgress.start();
                next();
              NProgress.done();

  })

  this.$router.afterEach((to, from) => {

      //END LOAD
              window.scrollTo(0,0)
              NProgress.done();

})
},
        mounted() {

              //end load
                  NProgress.done();

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
          },


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
