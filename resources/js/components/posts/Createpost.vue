<template>
  <v-content>
    <v-textarea
      label="what happens"
      v-model.trim="post"
      no-resize
      dark
      outline
      :dir="`rtl`"
    ></v-textarea>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <div class="text-xs-center text-sm-center mt-2">
        <h3 :class="wordsCounterColor">{{wordsCounter}} / 100
</h3>
        </div>
      </v-flex>
      <v-flex xs12 sm2>
        <v-tooltip bottom>
        <div slot="activator" class="mt-1 text-xs-center primary" id="upload">
          <v-icon class="mt-1" color="white">
            add_a_photo
          </v-icon>
          <input type="file" id="file" @change="HandlePostImage"/>
        </div>
        <span>add photo</span>
      </v-tooltip>
      </v-flex>
      <v-flex xs12 sm3>
        <div class="text-xs-center mt-1">
          <v-btn color="success" @click="createPost" :disabled="post.length === 0 || wordsNumber > 100 || !topic ">
            {{$t('publish')}} <v-icon  right color="white">done</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs12 sm2>
        <div id="topic" class="text-xs-center text-sm-right mb-0">
        <v-select
          dark
          :items="topics"
          item-text="topic"
          item-value="id"
          v-model="topic"
          :label="$t('choosetopic')"
        ></v-select>
      </div>
      </v-flex>
      <v-flex xs12 v-if="image" md12>
        <div style="text-xs-center">
        <v-img
        style="margin:0 auto;"
        :src="image"
        alt="..."
        width="200"
        >
        </v-img>
          <div class="text-xs-center">

        <v-btn
        style="margin:0 auto;"
        icon
        flat
        color="white"
        @click="removeImage">
          <v-icon>close</v-icon>
        </v-btn>
      </div>
      </div>
      </v-flex>
    </v-layout>
     <v-divider dark></v-divider>
    <v-snackbar
      v-model="snackbar"
        bottom
      :timeout="1501"
      >
      <b>
         {{$t('postdone')}}
       </b>
      <v-btn
        color="success"
        flat
        @click="snackbar = false">
      <bdi>
        {{$t('done')}}
      </bdi>
      </v-btn>
</v-snackbar>
</v-content>

</template>

<script>

export default {
  data(){
    return {
      snackbar:false,
      post:'',
      image:null,
      topic:11,
      wordsNumber:0,
      writtenPost :'',
      wordsCounterColor : 'white--text'
    }
  },
  watch:{
      wordsNumber(d,e){
          if (d > 80) {
            this.wordsCounterColor = 'yellow--text';
          }
          if (d > 100) {
            this.wordsCounterColor = 'red--text';
          }
      }
  },
  mounted(){
    console.log('create a new post');
  },
  computed:{
    wordsCounter(){
      if (this.post.length === 0) {
      return  this.wordsNumber = 0
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
    removeImage(){
      this.image = null;
    },
    HandlePostImage(e){



          var fr  = new FileReader();

          fr.readAsDataURL(e.target.files[0]);

          const imgs = ['image/jpeg','image/png','image/jpg'];

          let imgType = e.target.files[0].type;

          if (imgs.indexOf(imgType) == -1) {
            this.image =null;
              swal({
                "title":"Error",
                "text":this.$t('avatarerror'),
                "icon":"error"
              });
          }
          else{
            fr.onload = (e) => {

                  this.image = e.target.result
            }

          }


    },
      createPost(){
          this.$store.dispatch('createPost',{
            post:this.post,
            topic:this.topic,
            image:this.image,
          })
          .then(()=>{
            this.post = '';
            this.topic = 11;
            this.image = null;
            this.snackbar=true;
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
#topic {
	position: relative;
	top: -10px;
}
#upload {
	width: 82px;
	height: 35px;
  margin:0 auto;
}
#file {
	opacity: 0;
	position: relative;
	width: 100%;
	height: 100%;
	left: 0;
  top: -30px;
	right: 0;
	bottom: 0;
}
</style>
