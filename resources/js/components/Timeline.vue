<template>
    <v-container grid-list-lg>
    <v-layout row wrap v-if="isLoggedIn">
      <v-flex xs12 md12>
        <create-post></create-post>
      </v-flex>
      <v-flex hidden-sm-and-down md3>
        <keep-alive>
        <suggested-people></suggested-people>
      </keep-alive>
      </v-flex>
      <v-flex xs11 md6 class="scroll-timeline">
          <div>
        <template v-if="timelinePosts.length > 0">
        <list-posts class="text-xs-center" :posts="timelinePosts"></list-posts>
        <div class="text-xs-center" v-if="isLoadingMoreTimeline">
        <v-icon color="white">fas fa-circle-notch fa-spin</v-icon>

        </div>
      </template>
      <template v-else>
          <h1 class=" text-xs-center white--text">{{$t('followSome')}}</h1>
      </template>
      <infinite-loading :distance="1000" @infinite="toendpage"   
      spinner="waveDots">

</infinite-loading>

      </div>
      </v-flex>

      <v-flex md3 hidden-sm-and-down>
        <trend></trend>
        <br />
        <topics></topics>
      </v-flex>
        <v-flex xs12>

        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import ListPosts from './posts/ListPosts';
import createPost from './posts/Createpost.vue';
import SuggestedPeople from './Suggestpeople.vue';
import Topics from './topics/Topics.vue';
import Trend from './trend/Trend.vue';
import VueDa from 'vue-data-loading';

export default {

  data(){
      return {
        offset:0,
        pos1:0,
      }
  },
  components:{
    ListPosts,
    createPost,
    SuggestedPeople,
    Topics,
    Trend,
  },

  computed:{
      isLoggedIn(){
        return this.$store.getters.isLoggedIn;
      },
      timelinePosts(){
        return this.$store.getters.posts;
      },
      isLoadingMoreTimeline(){
        return this.$store.getters.isLoadingMoreTimeline;
      },
      userFollowings(){
        return this.$store.getters.myFollowingIds.length;
      }

  },
  created(){

    window.scrollTo(0,0);

    if (this.isLoggedIn) {
      this.isLoading = true;
      this.$store.dispatch('reactedPosts');
      this.$store.dispatch('myFollowingIds');
    }
  },

  mounted(){

  if (this.isLoggedIn) {
      this.$store.dispatch('timeline');
    }
    this.mountedComp = true;
  },
  methods:{
    toendpage($state){
      this.$store.dispatch('loadMorePosts').then((response)=>{
            $state.loaded();
      })
      .catch((errors)=>{
        alert('error in loading posts');
        console.log(errors.response.data)
        console.log(errors)
      })
      

},  
    showPost(postId){
      this.$router.push(`post/${postId}`)
    },
    loadMore(){
      const self = this;
        //     window.onscroll = function() {

        //   let endOfPage = (document.documentElement.scrollTop + window.innerHeight  == (document.documentElement.offsetHeight) );

        //   if (endOfPage) {
        //     if (self.isLoggedIn && self.$route.name == null) {
        //       self.$store.dispatch('loadMorePosts');
        //       self.$store.commit('hideBottomNav');
        //     window.scrollTo(0,document.documentElement.offsetHeight - 580);

        //   }
        //   }


        // }

          },
  },


}
</script>

<style scoped>
.container{
  height: 100%;
}
.scroll-timeline{
  overflow: hidden;
}
</style>
