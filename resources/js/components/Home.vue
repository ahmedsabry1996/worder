<template>
  <div class="">
      <Header/>

      <template v-if="perfectUser && currentRoute.path=='/'">

      <create-post></create-post>

    <div class="row">

        <time-line></time-line>

      </div>

      </template>
<router-view>

</router-view>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import createPost from './posts/Createpost.vue';
  import TimeLine from './Timeline.vue';
  import VueProgressBar from 'vue-progressbar'
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

          //console.log(this.route.path);
              this.$Progress.finish();
            console.log('the Home Component mounted.');

        },

        methods:{

        },

        components:{
          Header,
          createPost,
          TimeLine,

        },
        computed:{
            perfectUser(){
                return this.$store.getters.isLoggedIn == true && this.$store.getters.isVerified == "1" && this.$store.getters.hasProfile == "1";
            },

          currentRoute(){
          return this.$route ;
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
</style>
