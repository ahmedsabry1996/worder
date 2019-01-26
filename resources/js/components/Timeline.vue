<template>
  <div>

        <list-posts class="text-center" :posts.sync="timelinePosts"></list-posts>
    </div>
</template>

<script>
import ListPosts from './posts/ListPosts';

export default {

  data(){
      return {
        offset:0,
        followingOffset:0,
      }
  },
  components:{
    ListPosts,
  },
  created(){
    this.$store.dispatch('reactedPosts');
  },
  mounted(){

    this.$store.dispatch('timeline');

    this.loadMore();
  },
  computed:{
          timelinePosts(){
        return this.$store.getters.posts;
      },

  },
  methods:{
    showPost(postId){
      this.$router.push(`post/${postId}`)
    },
    loadMore(){

            window.onscroll = () => {


          let endOfPage = (document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight) );

          if (endOfPage) {
            if (!!localStorage.getItem('access_token') && this.$route.path == '/') {
            this.offset +=100;
            this.followingOffset +=100;
            this.$store.dispatch('loadMorePosts',{"offset":this.offset});
          }
          }}

          },
  },


}
</script>

<style scoped>
</style>
