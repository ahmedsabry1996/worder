<template>
  <div class="container-fluid">

          <div class="col-md-3  suggest">
                  <suggested-people></suggested-people>
          </div>

          <div class="text-center col-md-6">
              <list-posts class="text-center" :posts="timelinePosts"></list-posts>
          </div>

      <div class="col-md-3 text-center">
            <topics></topics>
        </ul>
      </div>

      <tooltip class="text-center totool"/>


    </div>
</template>

<script>
import SuggestedPeople from './Suggestpeople.vue';
import ListPosts from './posts/ListPosts';
import Topics from './Topics.vue';

import Ad from './Ad.vue';

export default {

  data(){
      return {
        offset:0,
        followingOffset:0,
      }
  },
  components:{
    SuggestedPeople,
    Ad,
    ListPosts,
    Topics,

  },
  mounted(){
    console.log(this.$route);
    if (localStorage.getItem('access_token') != null && this.$route.path == '/') {

      this.$store.commit('truncateTimeline');
      this.$store.dispatch('timeline');
      this.loadMore();

    }


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
.totool{
  font-weight: bold;
  border: 1px solid #ddd;
  border-radius: 7px;
}
</style>
