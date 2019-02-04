<template>
<div class="container-fluid">
  <h1>{{this.$route.params}}</h1>


  <div class="text-center">
    <h2>Trend</h2>
    <list-posts :posts="posts"></list-posts>
  </div>

</div>
</template>

<script>

import ListPosts from './posts/ListPosts.vue';

export default {
  components:{
    ListPosts
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
