<template>
<div>
  <form @submit.prevent="uploadId" >
    <div class="form-group">
      <label>{{$t('verifyprofilereq')}}</label>
      <input type="file" class="form-control" style="padding:0;" @change="handleFile">
        <p class="help-block">{{$t('supportedtypes')}}</p>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success">
          {{$t('upload')}}
      </button>
    </div>
  </form>
  <div class="uploaded-img" v-if="uploadedImage" style="width:100%">
      <img :src="uploadedImage" alt="Oops try again" width="250" style="margin:0 auto;" class="img-rounded">
  </div>
</div>
</template>

<script>
export default {
data(){
  return {
      uploadedImage:null
  }
},
methods:{
  uploadId(){
      axios.post('/api/auth/verify-profile',{
        uploaded_image:this.uploadedImage,
        user_id:localStorage.getItem('user_id')
      },{
        headers:{
          Authorization:`Bearer ${this.$store.state.authentication.userToken}`
        }
      })
      .then((response)=>{
        swal({
          "title":this.$t('done'),
          "text":this.$t('profileverificationreview'),
          "icon":"success"
        });
      })
      .catch((errors)=>{
        swal({
          "title":this.$t('oops'),
          "text":this.$t('uploadingerror'),
          "icon":"error"
        });
        console.log(errors.response);
      })
  },
  handleFile(e){

     const fr  = new FileReader();

     const img = e.target.files[0];

     let type = img.type;

     let name = img.name;

     fr.readAsDataURL(e.target.files[0]);

     const imgs = ['image/jpeg','image/png','image/jpg'];
     if (imgs.indexOf(type) != -1) {
       fr.onload = (e) => {

             this.uploadedImage= e.target.result;
       }

     }
     else{
       swal({
         "title":this.$t('error'),
         "text":this.$t('unsupportedtype'),
         "icon":"error"
       });
       this.uploadedImage = null;
     }

  }

}

}
</script>

<style scoped>
</style>
