<template>
<div class="container-fluid">
  <h1>{{this.$route.params}}</h1>
  <div class="col-md-3">
    <suggest-people></suggest-people>
  </div>

  <div class="col-md-6 text-center">
    <h2>Trend</h2>
    <list-posts :posts="posts"></list-posts>

  </div>

  <div class="col-md-3">
      <Topics class="text-center"/>
  </div>

</div>
</template>

<script>

import ListPosts from './posts/ListPosts.vue';
import SuggestPeople from './Suggestpeople.vue';
import Topics from './Topics.vue';

export default {
  components:{
    Topics,
    SuggestPeople,
    ListPosts
  },
  data(){
    return {
      posts:[],
      offset:0
    }
  },
  mounted(){
    this.getTrendPosts();
    this.loadMore();
  },
  watch:{
    '$route'(to,from){
      this.posts = [];
      this.offset = 0;
      this.getTrendPosts();
    }

  },
  methods:{
    getTrendPosts(){

      axios.post('/api/trend/posts',{
        word:this.$route.params.word
      }
      ,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{
        console.log(response.data);
          this.posts = response.data.posts;
          this.posts =  Array.from(new Set(this.posts));
          this.$store.commit('addToLikedPosts',response.data.liked_posts);
          this.$store.commit('addToDisLikedPosts',response.data.disliked_posts);
      })
      .catch((error)=>{
        console.log(error.response);
      })
    },
    loadMore(){


            window.onscroll = () =>{


          let endOfPage = (document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight) );

          if (endOfPage) {
            //alert(!!localStorage.getItem('access_token'));
            if (!!localStorage.getItem('access_token') && this.$route.name == 'trend') {
                this.morePosts();

          }
          }

            }

    },
    morePosts(){

        this.offset +=100;
        axios.post('/api/trend/load-more',{
          offset:this.offset,
          word : this.$route.params.word
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
