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
  mounted(){
    this.$store.dispatch('timeline');
    this.loadMore();
  },
  computed:{
          timelinePosts(){
        return this.$store.getters.timeline;
      },

  },
  methods:{
    showPost(postId){
      this.$router.push(`post/${postId}`)
    },
    loadMore(){

            window.onscroll = () =>{


          let endOfPage = (document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight) );

          if (endOfPage) {
            if (!!localStorage.getItem('access_token') && this.$route.path == '/') {
              alert();
            this.offset +=100;
            this.followingOffset +=100;
            this.$store.dispatch('loadMore',{"url":'timeline/load-more',
                                              "offset":this.offset,
                                              "following_offset":this.followingOffset
                                                });


          }
          }

            }

          },
  },


}
</script>

<style scoped>
</style>
