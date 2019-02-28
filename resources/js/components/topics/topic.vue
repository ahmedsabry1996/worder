<template>

  <v-content>
    <v-container grid-list-lg>
      <v-layout hidden-sm-and-down row wrap>
        <v-flex  md3>
          <suggested-people></suggested-people>
        </v-flex>

        <v-flex md6>

          <template v-if="!noTopicPosts">

            <h1 class="white--text display-3 text-xs-center">{{this.$route.params.topic}}</h1>
            <list-posts :posts="posts"></list-posts>

          </template>

          <template v-else>
            <div class="text-xs-center white--text">

              <h1>no posts</h1>
              <h1>come on later</h1>
            </div>
          </template>
        </v-flex>

        <v-flex md3>
          <trend></trend>
          <br />
          <topics></topics>
        </v-flex>

</v-layout>
</v-container>
</v-content>
</template>

<script>

import ListPosts from '../posts/ListPosts.vue';

import SuggestedPeople from './../Suggestpeople.vue';
import Topics from './../topics/Topics.vue';
import Trend from './../trend/Trend.vue';



export default {

    data(){
        return {
        }
    },
    computed:{
        posts(){
          return  this.$store.getters.topicPosts;
        },
        noTopicPosts(){
          return this.$store.getters.noTopicPosts;
        }
    },
    mounted(){
        this.loadMore();
    },
    created(){
      this.$store.dispatch('reactedPosts');
          this.getTopicPosts();
    },
    components:{
      ListPosts,
      SuggestedPeople,
      Topics,
      Trend
    },
    watch:{
      '$route'(to,from){

        this.getTopicPosts();
      }
    },
    methods:{

      getTopicPosts(){
        this.$store.dispatch('fillTopicPosts',{topic:this.$route.params.topic});
      },
      loadMore(){


              window.onscroll = () =>{


            let endOfPage = (document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight) );

            if (endOfPage) {
              if (!!localStorage.getItem('access_token') && this.$route.name == 'topic') {
                  this.morePosts();

            }
            }

              }

      },

      morePosts(){
        this.$store.dispatch('loadMoreTopicPosts',
                            {topic:this.$route.params.topic})



              }

    }
}
</script>

<style scoped>

</style>
