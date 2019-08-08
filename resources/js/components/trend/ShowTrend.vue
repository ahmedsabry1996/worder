<template>

    <v-container grid-list-lg>
      <v-layout  row wrap>
        <v-flex xs12>
          <create-post></create-post>
        </v-flex>
        <v-flex xs12>
            <v-card color="#282e33">
              <v-card-title primary-title>
                <h4 class="white--text">
                  Trend Sponser
                </h4>
              </v-card-title>
              <div  class="aa  text-xs-center">
                  <h1 class="text-xs-center white--text">

                    I Am A Sponser
                  </h1>

                  <v-card-actions >
                  <v-btn flat dark medium @click="ads">be a sponser</v-btn>
                </v-card-actions>
              </div>
            </v-card>
        </v-flex>
        <v-flex xs12>
          <h1 class="yellow--text text-xs-center">
            <bdi>
              #{{this.$route.query.trend}}
            </bdi>
          </h1>
        </v-flex>
        <v-flex md3 class="hidden-xs-only">
          <suggested-people></suggested-people>
        </v-flex>

        <v-flex md6 xs12>
          <div class="text-xs-center">
          <list-posts :posts="posts"></list-posts>
          </div>
        </v-flex>

        <v-flex md3 class="hidden-xs-only">
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
import createPost from './../posts/Createpost.vue';
export default {
  components:{
    createPost,
    ListPosts,
    SuggestedPeople,
    Topics,
    Trend,
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
    console.log('show trend loaded');
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
    },
    ads(){
      alert('InshaAllah after one months every thing will be Ok')
    }

  }
}
</script>

<style scoped>
.aa{
  height:100px;
  padding: 0px;
}
</style>
