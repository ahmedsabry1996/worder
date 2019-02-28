<template>

    <v-container grid-list-lg>
      <v-layout hidden-sm-and-down row wrap>
        <v-flex md3>
          <suggested-people></suggested-people>
        </v-flex>

        <v-flex md6>
          <list-posts :posts="posts"></list-posts>

        </v-flex>

        <v-flex md3>
          <trend></trend>
          <br>
          <topics></topics>
        </v-flex>
      </v-layout>
    </v-container>

</template>

<script>

import ListPosts from './../posts/ListPosts.vue';
import SuggestedPeople from './../Suggestpeople.vue';
import Topics from './../topics/Topics.vue';
import Trend from './../trend/Trend.vue';

export default {
  components:{
    ListPosts,
    SuggestedPeople,
    Topics,
    Trend
  },
  data(){
    return {
      offset:0
    }
  },
  computed:{
    posts(){
      return this.$store.getters.trendPosts;
    }
  },
  created(){
    this.getTrendPosts();
    this.$store.dispatch('reactedPosts');

  },
  mounted(){
    this.loadMore();
  },
  watch:{
    '$route'(to,from){
      this.offset = 0;
      this.getTrendPosts();
    }

  },
  methods:{
    getTrendPosts(){
      this.$store.dispatch('showTrendPosts',{word:this.$route.params.trend});
    },
    loadMore(){


            window.onscroll = () =>{


          let endOfPage = (document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight) );

          if (endOfPage) {

            if (!!localStorage.getItem('access_token') && this.$route.name == 'trend') {
                this.morePosts();

          }
          }

            }

    },
    morePosts(){

        this.offset +=100;
        this.$store.dispatch('loadMoreTrendPosts',{offset:this.offset,
                                                  word:this.$route.params.trend})
    }

  }
}
</script>

<style scoped>
</style>
