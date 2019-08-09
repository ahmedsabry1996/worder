<template>

  <v-content>
    <v-container grid-list-lg>

      <v-layout hidden-sm-and-down row wrap>
        <v-flex xs12>
          <create-post></create-post>
        </v-flex>
        <v-flex  md3>
          <suggested-people></suggested-people>
        </v-flex>

        <v-flex md6>

          <div v-show="!noTopicPosts" class="text-xs-center">
            <list-posts :posts="posts"></list-posts>

      <infinite-loading :distance="1000" @infinite="morePosts"   
      spinner="waveDots"></infinite-loading>
          </div>

          <div v-show="noTopicPosts">
            <div class="text-xs-center white--text">

              <h1>no posts</h1>
              <h1>come on later</h1>
            </div>
          </div>
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
import CreatePost from '../posts/Createpost.vue';
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
        },
        topics(){
          return this.$t('topics');
        },
        currentTopic(){
          return this.$t('topics').filter((val,index)=>{
                return val.en == this.$route.params.topic ;
          });
        }
    },
    mounted(){
        console.log('topic loaded');
    },
    created(){
      this.$store.dispatch('reactedPosts');
          this.getTopicPosts();
    },
    components:{
      CreatePost,
      ListPosts,
      SuggestedPeople,
      Topics,
      Trend,

    },
    watch:{
      '$route'(to,from){

        this.getTopicPosts();
      }
    },
    methods:{

      getTopicPosts(){
        this.$store.dispatch('fillTopicPosts',
        {topic:this.$route.params.topic})
        .then((response)=>{
          console.log(7);
        })
        .catch((error)=>{
          console.log(error.response);
        });
      },
      loadMore(){


              window.onscroll = () =>{


            let endOfPage = (document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight) );

            if (endOfPage) {
              if (!!this.$store.state.authentication.userToken && this.$route.name == 'topic') {
                  this.morePosts();
            }
            }

              }

      },

      morePosts($state){
        this.$store.dispatch('loadMoreTopicPosts',
                            {topic:this.$route.params.topic,id:this.currentTopic[0]['id']}).then((response)=>{
                              $state.loaded();
                              if(response.data.posts.length > 0 ){
                                      $state.loaded();

                              }
                              else{
                                    $state.complete();
                              }
                            })
                            .catch((error)=>{
                                alert('error in topic posts loading');
                            })



              }

    }
}
</script>

<style scoped>

</style>
