<template>
  <div>
      <Header/>
      <div v-if="!isLoggedIn">
        <router-view></router-view>
      </div>
      <div v-if="perfectUser">
        <div v-if="currentRoute.path=='/'" class="col-md-12">
        <create-post></create-post>
        </div>

        <div class="col-md-3 suggest">
          <template v-if="!profileRoutes">

                <suggested-people></suggested-people>
      </template>

        </div>
        <template v-if="currentRoute.path == '/'">
          <div class="col-md-6">
            <time-line></time-line>

          </div>
          </template>
        <template v-else>
          <template v-if="profileRoutes">
            <div class="col-md-12">
              <router-view></router-view>
            </div>
          </template>

          <template v-else>
            <div class="col-md-6">
              <router-view></router-view>
            </div>
          </template>
        </template>


      <div class="col-md-3 text-center" v-if="!profileRoutes">

          <template>
            <trend></trend>
            <topics></topics>
            </template>
      </div>

      </div>
<tooltip class="text-center totool"/>

  </div>
</template>

<script>

  import Header from './Header.vue';
  import createPost from './posts/Createpost.vue';
  import TimeLine from './Timeline.vue';
  import VueProgressBar from 'vue-progressbar';
  import SuggestedPeople from './Suggestpeople.vue';
  import ListPosts from './posts/ListPosts';
  import Topics from './Topics.vue';
  import Ad from './Ad.vue';
  import Trend from './Trend.vue';


    export default {
      created () {
        window.scrollTo(0,0); 
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
                return this.$store.getters.isLoggedIn == true &&
                      this.$store.getters.isVerified == "1" &&
                      this.$store.getters.hasProfile == "1";
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
</style>
