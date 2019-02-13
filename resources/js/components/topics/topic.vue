<template>
<div class="container-fluid">

  <div class=" text-center" v-if="!noTopicPosts">
    <h2>{{this.$route.params.topic}}</h2>
    <list-posts :posts="posts"></list-posts>
  </div>

  <div v-else>
      <h1>no posts</h1>
      <h1>come on later</h1>
  </div>
</div>
</template>

<script>

import ListPosts from '../posts/ListPosts.vue';



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
