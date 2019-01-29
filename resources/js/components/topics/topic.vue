<template>
<div class="container-fluid">


  <div class=" text-center">
    <h2>{{this.$route.params.topic}}</h2>
    <list-posts :posts="posts"></list-posts>
  </div>

</div>
</template>

<script>

import ListPosts from '../posts/ListPosts.vue';



export default {

    data(){
        return {
          offset:0
        }
    },
    computed:{
        posts(){
          return  this.$store.getters.topicPosts;
        }
    },
    mounted(){
        this.loadMore();
    },
    created(){
          this.getTopicPosts();
    },
    components:{
      ListPosts,
    },
    watch:{
      '$route'(to,from){

          this.offset = 0;
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
              //alert(!!localStorage.getItem('access_token'));
              if (!!localStorage.getItem('access_token') && this.$route.name == 'topic') {
                  this.morePosts();

            }
            }

              }

      },

      morePosts(){

          this.offset +=100;
        this.$store.dispatch('loadMoreTopicPosts',
                            {topic:this.$route.params.topic
                              ,offset:this.offset})



              }

    }
}
</script>

<style scoped>

</style>
