<template>

  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md12>
        <create-post></create-post>
      </v-flex>
      <v-flex hidden-xs-only md3>
        <suggested-people></suggested-people>
      </v-flex>
      <v-flex xs12 md6>
        <list-posts class="text-center" :posts.sync="timelinePosts"></list-posts>
        <div class="text-center" v-if="isLoadingMoreTimeline">
          <img src="/storage/avatars/loader.gif" alt="loading">
        </div>
      </v-flex>
      <v-flex md3>
        <trend></trend>
        <br />
        <topics></topics>
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

export default {

  data(){
      return {
        offset:0,
      }
  },
  components:{
    ListPosts,
    createPost,
    SuggestedPeople,
    Topics,
    Trend
  },

  computed:{
      isLoggedIn(){
        return this.$store.getters.isLoggedIn;
      },
      perfectUser(){
        if (this.$store.getters.isVerified=="1" && this.$store.getters.hasProfile=="1") {
          return true;
        }
      },
      timelinePosts(){
        return this.$store.getters.posts;
      },
      isLoadingMoreTimeline(){
        return this.$store.getters.isLoadingMoreTimeline;
      }

  },
  created(){
    if (this.perfectUser) {
      this.isLoading = true;
      this.$store.dispatch('reactedPosts');
      this.$store.dispatch('myFollowingIds');
      this.$store.dispatch('timeline');
    }
  },
  mounted(){

    this.loadMore();
  },
  methods:{
    showPost(postId){
      this.$router.push(`post/${postId}`)
    },
    loadMore(){
      const self = this;
            window.onscroll = function() {

          let endOfPage = (document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight) );

          if (endOfPage) {
            if (self.perfectUser && self.$route.name == 'root') {

            window.scrollTo(0,document.documentElement.offsetHeight - 400);
            self.$store.dispatch('loadMorePosts')

          }
          }}

          },
  },


}
</script>

<style scoped>
</style>
