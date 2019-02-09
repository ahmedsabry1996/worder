<template>

    <div class="container">
  <!-- pick profile data -->
    <div class="col-md-6 create">
      <form @submit.prevent="createProfile">
          <div class="form-group">
            <label id="file-picker">
            <input type="file" class="form-control" @change="handleFile">
            </label>
          </div>

          <div class="form-group">
            <label>{{$t('displayname')}}</label>
            <input type="text" class="form-control"  v-model="displayName">
            <p><b class="text-danger" v-if="errors.display_name">{{errors.display_name[0]}}</b></p>
          </div>

          <div class="form-group">
            <h3>{{$t('gender')}}</h3>
            <br>
          <template v-for="(gender,index) in gender">
          <label>{{gender}}<input type="radio"  :value="index+1"  id="male" v-model="selectedGender"></label>
          </template>
          <p><b class="text-danger" v-if="errors.gender_id">{{$t('gendererror')}}</b></p>

          </div>

          <div class="form-group">
            <h3 class="text-center">{{$t('selectfavtopics')}}</h3>
          <template v-for="(topic,index) in topics" style="height:60px;width:250px;margin:0 auto;overflow:scroll">
            <label>{{topic}}
            <input type="checkbox"  :value="index+1" v-model="selectedTopics">
            </label>
            <br>
          </template>
          <p><b class="text-danger" v-if="errors.topics">{{$t('selectfavtopics')}}</b></p>

          </div>
          <div class="form-group">
            <label>  {{$t('country')}} : </label>
            <select v-model="selectedCountry">
              <template v-for="(country,index) in countries">
              <option :value="index+1">{{country}}</option>
              </template>
            </select>
            <p><b class="text-danger" v-if="errors.country_id">{{$t('countryerror')}}</b></p>

          </div>
          <div class="form-group">
            <label>{{$t('birthday')}}</label>
            <input type="date" class="form-control" v-model="bdate">
            <p><b class="text-danger" v-if="errors.birth_date">{{errors.birth_date[0]}}</b></p>

          </div>
          <div class="form-group">
            <label>{{$t('description')}}</label>
              <textarea v-model.trim="description" class="form-control"></textarea>
              <b>{{writtenDescription}}/25 words</b>
              <p class="text-danger" v-if="!checkDescription"><b>{{$t('descriptionerror')}}</b> </p>
              <p class="text-danger" v-if="errors.description"><b>{{errors.description[0]}}</b> </p>
          </div>
          <div class="form-group">

            <input type="submit" class="btn btn-primary"  :value="$t('create')">
          </div>
      </form>
    </div>
    <!-- simulate -->
    <div class="col-md-6">

      <div class="card">
      <img :src="`/storage/avatars/avatar_default.jpg`" alt="Ahmed" style="width:100%" v-if="avatar==null">
      <img :src="avatar" alt="Ahmed" style="width:100%" v-else>
      <button type="button" class="btn btn-danger btn-xs" v-if="avatar!==null" @click="removeSelectedAvatar">
          &times;
      </button>
      <h3>{{username}}</h3>
      <p class="title"><i>{{displayName}}</i></p>
      <p>{{gender[selectedGender-1]}}</p>
      <p>From : {{countries[selectedCountry-1]}}</p>
      <div style="margin: 24px 0;" v-if="topics.length > 0">
        <h4 class="text-center">Favorite topics</h4>
        <a href="#" class="btn btn-info" v-for="topic in selectedTopics" style="margin:10px;">{{topics[topic-1]}}</a>
     </div>
     <div class="bdate">
       <p style="white-space: pre-line;">{{description}}
  </p>
     </div>
    </div>

    </div>


    </div>
</template>


<script>
import axios from 'axios';
export default {
mounted(){
    console.log('create profile');
},
data(){
return {
  displayName:'',
  avatar:null,
  gender:['male','female'],
  selectedGender:null,
  selectedCountry:null,
  selectedTopics:[],
  bdate:null,
  description:'',
  writtenDescription:0,
  errors:[]
}
},

computed:{
  countries(){
    return  this.$store.getters.countries;
  },
  topics(){
    return this.$store.getters.topics;
  },
  username(){
      return   this.$store.getters.currentUser.name;
      },

  checkDescription(){
    this.writtenDescription = this.description.split(' ').length;

    if (this.description.split(' ').length > 25) {
    return false;
    }
    if (this.description.length === 0) {
      this.writtenDescription = 0;
      return true;
    }
    else{
        return true;
    }
  }
},
methods:{
removeSelectedAvatar(){
  this.avatar =null;
},

handleFile(e){


    var fr  = new FileReader();

    fr.readAsDataURL(e.target.files[0]);

    const imgs = ['image/jpeg','image/png','image/jpg'];

    let imgType = e.target.files[0].type;

    if (imgs.indexOf(imgType) == -1) {
      this.avatar =null;
        swal({
          "title":"Error",
          "text":this.$t('avatarerror'),
          "icon":"error"
        });
    }
    else{
      fr.onload = (e) => {

            this.avatar = e.target.result
      }

    }


},

createProfile(){

    axios.post("/api/create-profile/"+this.$store.state.authentication.userId,
      {
        "avatar":this.avatar,
        "user_id":this.$store.state.authentication.userId,
        "display_name":this.displayName,
        "gender_id":this.selectedGender,
        "topics":this.selectedTopics,
        "birth_date":this.bdate,
        "country_id":this.selectedCountry,
        "description":this.description,
        "email":this.$store.getters.email,
        "password":this.$store.getters.passowrd
      },{
        headers:{
          "Authorization":`Bearer ${this.$store.state.authentication.userToken}`
        }
      })
      .then((response)=>{

        swal({
          "title":"WOW!",
          "text":this.$t('welcome'),
          "icon":"success"
        })

        this.errors = [];
        localStorage.setItem('has_profile',1);
        localStorage.setItem('current_user_profile',JSON.stringify(response.data.profile));
        localStorage.setItem('current_user_topics',JSON.stringify(response.data.topics));
        localStorage.setItem('trend',(response.data.trend.top_words));


        this.$store.commit('loginSuccess');
        this.$store.commit("topTen");

        console.log('topics');
        console.log(response.data.topics);
        console.log("after_profile");

        this.$router.push('/');

      })
      .catch((error)=>{

        console.log(error);
        console.log(error.response);
        let errorsObj = error.response.data.errors;
        this.errors = errorsObj;

      })

}
}

}

</script>


</script>

<style scoped>
.create{
  border-right: 1px solid #ddd
}
textarea{
  resize: none;
}
#file-picker{
    border: 2px solid #f90;
    width:100px;
    height: 100px;
    border-radius: 20px;

  }
#file-picker > input{
  opacity: 0 !important;
  width: 0
}


.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 320px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>
