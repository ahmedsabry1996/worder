<template>

    <v-container grid-list-lg>
      <v-layout hidden-sm-and-down row wrap>
        <v-flex xs12>
          <h1 class="white--text text-xs-center">
            <bdi>
              {{this.$route.query.trend}}

            </bdi>
          </h1>
        </v-flex>
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
      this.$store.dispatch('showTrendPosts',{word:this.$route.query.trend});
    },
    loadMore(){


            window.onscroll = () =>{


          let endOfPage = (document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight) );

          if (endOfPage) {

            if (!!this.$store.state.authentication.userToken && this.$route.name == 'trend') {
                this.morePosts();

          }
          }

            }

    },
    morePosts(){

        this.offset +=100;
        this.$store.dispatch('loadMoreTrendPosts',{offset:this.offset,
                                                  word:this.$route.query.trend})
    }

  }
}
</script>

<style scoped>
</style>
