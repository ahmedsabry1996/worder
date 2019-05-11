<template>
  <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="white--text text-xs-center text-uppercase">list posts</h1>
        </v-flex>
        <v-dialog
          v-model="showPost"
          scrollable
          :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
        <v-card dark>
          <div class="pa-5 text-xs-center" v-if="!!selectedPost">
            <h3>
              {{selectedPost.post.post}}
            </h3>
            <div  v-if="selectedPost.post.image" class="text-xs-center">
              <img
              width="320"
              :src="`/storage/posts_images/${selectedPost.post.image}`"
              class="grey lighten-2"
              @click="showPost(post.id)"/>
            </div>
          </div>
        </v-card>
        </v-dialog>
        <v-flex xs12>
          <v-data-table
            dark
            :headers="headers"
            :items="posts"
            hide-actions
            v-if="!!posts"
          >
          <template v-slot:items="props">
      <td class="text-xs-center">
        <v-btn color="indigo" @click="DisplayPost(props.item.post_id)" small round dark>show post</v-btn>

      </td>
      <td class="text-xs-center">{{ props.item.reports_num }}</td>
      <td class="text-xs-center">
        <v-btn color="primary" small round @click="stopReports(props.item.post_id)">stop reports</v-btn>
        <v-btn color="error" small round @click="removePost(props.item.post_id)">remove the post</v-btn>
        </td>
    </template>
          </v-data-table>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {

  data(){
    return {
      showPost:false,
      posts:null,
      selectedPost:null,
      headers:[
        {text:"show",value:"id",align:"centre"},
        {text:"NO.reporsts",value:"reports_num",align:"center"},
        {text:"Actions",value:"id",align:"centre"},],

    };
  },
  created(){
    this.$store.dispatch('fetchReportedPosts')
    .then((response)=>{
        console.log(response.data);
        this.posts = response.data.posts;
    })
    .catch((error)=>{
      console.log(error);
      console.log(error.response);
    })
  },

  methods:{
    DisplayPost(postId){

        let index = this.posts.findIndex((val,ind)=>{
            return  val.post_id == postId;
        });

      this.selectedPost = this.posts[index];

      this.showPost = true;
    },
    stopReports(postId){

        this.$store.dispatch('stopReports',{postId})
        .then((response)=>{
          let index = this.posts.findIndex((val,ind)=>{
            return  val.post_id == postId;
          });
          console.log(response.data);

          this.posts.splice(index,1);

        })
        .catch((error)=>{
          alert('error in stoping');
          console.log(error);
          console.log(error.response);
        })
    },
    removePost(postId){

        let sure = confirm('Are u sure ?');
        if (sure) {

      this.$store.dispatch('removePost',{postId})
      .then((response)=>{
        let index = this.posts.findIndex((val,ind)=>{
          return  val.post_id == postId;
        });
        this.posts.splice(index,1);

      })
      .catch((error)=>{
        alert('error in delt')
        console.log(error);
        console.log(error.response);
      })
    }

    },

  }
}
</script>

<style scoped>
</style>
