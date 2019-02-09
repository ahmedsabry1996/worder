<template>
  <div class="container">
    <div class="row" >
      <form @submit.prevent="createPost">
          <div class="form-group">
            <textarea v-model.trim="post" class="form-control" placeholder="wirte what in your mind :)">
            </textarea>
          </div>
          <div class="form-group">
            <div class="col-md-4">
                  <select  v-model="topic">
                        <option   value="" selected disabled >  {{$t('choosetopic')}} </option>
                        <option  v-for="(topic,index) in currentUserTopics" :value="topic.id"> {{topics[topic.id - 1]}}</option>
                  </select>
            </div>
            <div class="col-md-4">
              <button type="submit" class="btn btn-primary" :disabled="post.length === 0 || wordsNumber > 100 || !topic ">
                    {{$t('publish')}}
              </button>
              <p>{{wordsNumber}}</p>
            </div>
            <div class="col-md-4">
              {{wordsCounter}} / 100
            </div>
          </div>

      </form>
    </div>
    <hr>
    <div class="timeline text-center">
      <h1 style="opacity:0;font-size:1px">ddd</h1>
      <div class="row">
    </div>

    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      post:'',
      topic:'',
      wordsNumber:0,
      writtenPost :'',

    }
  },
  mounted(){
    console.log('create a new post');
  },
  computed:{
    wordsCounter(){

      if (this.post.length === 0) {

        return   this.wordsNumber = 0

      }

      let post = this.post;

      let words = this.post.split(' ').length;

      return this.wordsNumber = words;

    },

    topics(){
      return this.$store.getters.topics;
    } ,

    currentUserTopics(){
      return this.$store.getters.currentUserTopics;
    }
  },
  methods:{
      createPost(){
        console.log(typeof(this.topic));
          this.$store.dispatch('createPost',{
            post:this.post,
            topic:this.topic
          })
          .then(()=>{
            this.post = '';
            this.topic = '';
            this.$toastr.s(this.$t('postdone'));


          })
          .catch(()=>{

            swal({
              title:"Error",
              text:this.$t('postfail'),
              icon:"error"
            });
            console.log("errors");

          })
      },

      userProfile(){
        return this.$store.getters.currentUserProfile;
      },

      getTopics(index){
        return this.$store.getters.topics[index - 1];
      }
  }

}
</script>
<style scoped>

  textarea{
    resize: none;
    height: 110px;
  }

.post-content{
  white-space: pre-line;

}
</style>
