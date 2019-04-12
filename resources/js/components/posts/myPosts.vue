<template>

  <div class="container">

<div class="text-center post" v-for="(post,index) in getMyPosts" >
  <div class="row">

  <div class="avatar">
    <img :src="`/storage/avatars/${userProfile.avatar}`" class="img-circle" width="50" height="50">
  </div>
  <div class="post-content">
<p style="white-space:pre-line;font-weight: bold;" class="text-center">
<bdi>  " {{post.post}} "
</bdi>
</p>
  </div>
  <div class="post-time" style="opacity:.6">
    {{post.created_at | formatDate}}
  </div>
  <div class="post-topic">
    <i style="opacity:.6">{{topics [post.topic_id - 1]}}</i>
  </div>
  <div class="delete-post">
        <p style="cursor:pointer;font-size:15pt;color:#AB1600;width:10px;margin:0 auto" @click="deletePost(post.id,index)">
           <font-awesome-icon :icon="['fas', 'trash-alt']" />
        </p>
  </div>
</div>

<hr>
</div>

</div>
</template>

<script>
var moment = require('moment');
export default {
  data(){
    return {
    }
  },
  mounted(){
      console.log(this.$route.path);
      this.$store.dispatch('myPosts');
  },
  computed:{
    userProfile(){
      return  this.$store.getters.currentUserProfile;
    },
    topics(){
         return this.$store.getters.topics;
    },
    getMyPosts(){
      return this.$store.state.myPosts;
    }

  },
  methods:{

    deletePost(postId,postIndex){



              swal("Confirm Delete ?",{
                buttons:{
                  cancel:"cancel",
                  confirmDelete:{
                    text:"Delete",
                    value:"Delete"
                  },
                },

              }).then((value)=>{

                  switch (value) {
                    case "Delete":

                      this.$store.dispatch('deletePost',{id:postId,index:postIndex});
                      this.$store.commit('deletePost',postIndex);
                      swal("Done","Deleted successfully","success");
                    break;

                    default:
                      return ;

                  }
              })
    },


  },
  filters:{

      formatDate:function (value) {

          return moment(value).locale("ar").subtract(-2, 'hours').fromNow();
      }
  }

}
</script>

<style lang="css">
</style>
