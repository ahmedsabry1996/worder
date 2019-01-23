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
          posts:[],
          offset:0
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

          this.posts = [];
          this.offset = 0;
        this.getTopicPosts();
      }
    },
    methods:{

      getTopicPosts(){
          let currentTopic = this.$route.params.topic;
          let id =this.$store.state.topics.indexOf(currentTopic)+1;

        axios.post(`/api/topic/show`,{
          topic_id:id
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        }).
        then((response)=>{

          this.posts = response.data.posts;
          this.posts =  Array.from(new Set(this.posts));
          this.$store.commit('addToLikedPosts',response.data.liked_posts);
          this.$store.commit('addToDisLikedPosts',response.data.disliked_posts);
          console.log(response.data.posts);

        }).
        catch((error)=>{

          console.log(error);
          console.log(error.response.data);

        })
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

          let currentTopic = this.$route.params.topic;
          let id =this.$store.state.topics.indexOf(currentTopic)+1;
          this.offset +=100;
          axios.post('/api/topic/load-more',{
            offset:this.offset,
            topic_id : id
          },{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('access_token')}`
            }
          })
          .then((response)=>{

            this.posts = this.posts.concat(response.data.posts);
            this.posts =  Array.from(new Set(this.posts));
            this.$store.commit('addToLikedPosts',response.data.liked_posts);
            this.$store.commit('addToDisLikedPosts',response.data.disliked_posts);
          })
          .catch((error)=>{
            console.log(error.response);
          })
      }

    }
}
</script>

<style scoped>

</style>
