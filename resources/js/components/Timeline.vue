<template>
  <div>
        <list-posts class="text-center" :posts.sync="timelinePosts"></list-posts>
        <div class="text-center" v-if="isLoadingMoreTimeline">

          <img src="/storage/avatars/loader.gif" alt="loading">

        </div>
    </div>
</template>

<script>
import ListPosts from './posts/ListPosts';

export default {

  data(){
      return {
        offset:0,
      }
  },
  components:{
    ListPosts,
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
            self.offset +=27;
            self.$store.dispatch('loadMorePosts',{"offset":self.offset})

          }
          }}

          },
  },


}
</script>

<style scoped>
</style>
