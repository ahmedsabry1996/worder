<template>

  <div class="container" v-if="isLoggedIn">
    <div class="col-md-6">
      <form  role="form" @submit.prevent="updateProfile">

        <div class="form-group">
          <label id="file-picker">
          <input type="file" class="form-control" @change="handleFile">
          </label>
        </div>

      <div class="form-group">
        <label for="name">{{$t('name')}} </label>
        <input type="text" class="form-control" v-model="name" :placeholder="$t('name')">
        <div v-if="errors">

        <p class="text-danger" v-if="errors.name"><b>{{errors.name[0]}}</b> </p>
</div>
      </div>

      <div class="form-group">
        <label for="display_name">{{$t('displayname')}}</label>
        <input type="text" class="form-control" v-model="displayName" :placeholder="$t('displayname')">
        <div v-if="errors">

        <p class="text-danger" v-if="errors.display_name"><b>{{errors.display_name[0]}}</b> </p>
      </div>
      </div>

      <div class="form-group">
        <label for="country">{{$t('country')}}</label>
        <select v-model="selectedCountry">
          <h3>where are you from</h3>
          <template v-for="(country,index) in countries">
          <option :value="index+1">{{country}}</option>
          <div v-if="errors">

          <p class="text-danger" v-if="errors.country_id"><b>{{$t('countryerror')}}</b> </p>
        </div>
          </template>
        </select>
      </div>


      <div class="form-group">
        <label>{{$t('countryerror')}}</label>
        <input type="date" class="form-control" v-model="bdate">
        <div v-if="errors">

        <p class="text-danger" v-if="errors.birth_date"><b>{{errors.birth_date[0]}}</b> </p>
      </div>
      </div>

                <div class="form-group">
                  <h3>{{$t('gender')}}</h3>
                  <br>
                <template v-for="(gender,index) in gender">
                <label>{{gender}}<input type="radio"  :value="index+1"  id="male" v-model="selectedGender"></label>
                </template>
                <div v-if="errors">

                <p><b class="text-danger" v-if="errors.gender_id">{{$t('gendererror')}}</b></p>
              </div>
                </div>
      <div class="form-group">
        <h3 class="text-center">{{$t('selectfavtopics')}}</h3>
      <template v-for="(topic,index) in topics" style="height:60px;width:250px;margin:0 auto;overflow:scroll">
        <label>{{topic}}
        <input type="checkbox"  :value="index+1" v-model="selectedTopics" />
        </label>
        <br>
      </template>
      <div v-if="errors">

      <p class="text-danger" v-if="errors.topics"><b>{{$t('selectfavtopics')}}</b> </p>
</div>

      </div>
      <div class="form-group">
        <label>{{$t('description')}}</label>
          <textarea v-model.trim="description" class="form-control"></textarea>
          <b>{{writtenDescription}}/25 words</b>
          <p class="text-danger" v-if="!checkDescription"><b>{{$t('descriptionerror')}}</b> </p>
            <div v-if="errors">
              <p class="text-danger" v-if="errors.description"><b>{{errors.description[0]}}</b> </p>

            </div>

      </div>

      <div class="form-group">
          <button type="submit" class="btn btn-success">
              {{$t('save')}}
          </button>
          <button type="button" class="btn btn-danger" @click="cancel">
              {{$t('cancel')}}
          </button>
      </div>

      </form>
    </div>

    <div class="col-md-6">

<div class="card">
  <template v-if="avatar">
<img :src="`${avatar}`" :alt="currentUser.name" alt="name" style="width:100%">
</template>
<template v-else>
  <img src="storage/avatars/avatar_default.jpg" :alt="name"  style="width:100%">
</template>
<p><button class="btn btn-danger" @click="removeAvatar">{{$t('remove')}}</button></p>

<h1>{{name}}</h1>
<h2>{{displayName}}</h2>
<p class="title">
  <bdi>

  <b>{{$t('about')}} :</b>{{currentUserProfile.description == null ? 'none'  : description}}

</bdi>
</p>

<p><bdi><b>{{$t('from')}} : </b>{{countries[selectedCountry - 1]}}</bdi></p>

<p><b>{{$t('birthday')}} : </b>{{bdate}}</p>

<h4> <small>{{$t('favtopics')}} </small></h4>

      <button type="button" style="margin:10px" class="btn btn-primary" v-for="topic in selectedTopics">
            {{topics[topic-1]}}
      </button>
</div>
<p>

</p>
</div>
  </div>
</template>

<script>
export default {
  mounted(){
      this.fillUserData()
  },
  data(){
  return {
    name:'',
    displayName:'',
    avatar:`storage/avatars/${this.$store.state.authentication.currentUserProfile.avatar}`,
    avatarState : 'same',
    gender:[this.$t('male'),this.$t('female')],
    topics:this.$store.state.topics,
    countries:this.$store.state.countries,
    selectedGender:null,
    selectedCountry:null,
    selectedTopics:[],
    bdate:null,
    description:'',
    writtenDescription:'',
    errors:null
  }
  },


  computed:{
    username(){
        return   this.$store.getters.currentUser.name;
        },

        isLoggedIn(){
          return this.$store.getters.isLoggedIn;
        },
    currentUser(){
      return this.$store.getters.currentUser;
    },
    currentUserProfile(){
      return this.$store.getters.currentUserProfile;

    },
    currentUserTopics(){

      return this.$store.getters.currentUserTopics.map((val)=>{
            return val.pivot.topic_id;
      });
    },
    checkDescription(){
        if (this.description != null) {

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

  }
  },

  methods:{
    cancel(){
        this.$router.push('/');
    },
    fillUserData(){
      let topics = this.$store.state.authentication.currentUserTopics;
        const topics_id = topics.map((val)=>{
          return val.pivot.topic_id;
        });

        const currentUserProfile = this.$store.state.authentication.currentUserProfile;
        const currentUser = this.$store.state.authentication.currentUser;
        this.selectedTopics = topics_id;
        this.selectedGender = currentUserProfile.gender_id;
        this.selectedCountry = currentUserProfile.country_id;
        this.description = currentUserProfile.description;
        this.name = currentUser.name;
        this.displayName =  currentUserProfile.display_name;
        this.bdate = currentUserProfile.birth_date;

    },

    removeAvatar(){
        this.avatar =null;
        this.avatarState = null;
        console.log(this.avatar);
    },

    handleFile(e){
        var fr  = new FileReader();

        fr.readAsDataURL(e.target.files[0]);

        const imgs = ['image/jpeg','image/png','image/jpg'];

        let imgType = e.target.files[0].type;

        if (imgs.indexOf(imgType) == -1) {
            swal({
              "title":this.$t('oops'),
              "text":this.$t('avatarerror'),
              "icon":"error"
            });
        this.avatar =null;
        }
        else{
          fr.onload = (e) => {

                this.avatar = e.target.result;
                this.avatarState = 'changed';
          }

        }
      console.log("****************** file data **********************");
      console.log(e.target.files[0].name);
      console.log(e.target.files[0].type);
      console.log(e.target.files[0].size);


    },
    updateProfile(){
      console.log(`Bearer ${localStorage.getItem('access_token')}`);
      axios.post('/api/update-profile',{
        "avatar":this.avatar,
        "name":this.name,
        "display_name":this.displayName,
        "gender_id":this.selectedGender,
        "country_id":this.selectedCountry,
        "birth_date":this.bdate,
        "description":this.description,
        "topics":this.selectedTopics,
        "avatar_state":this.avatarState
      },{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('access_token')}`
        },
      }).then((response)=>{

        console.log(response.data);
        localStorage.setItem('current_user',JSON.stringify(response.data.updated_user));
        localStorage.setItem('current_user_profile',JSON.stringify(response.data.updated_profile));
        localStorage.setItem('current_user_topics',JSON.stringify(response.data.updated_topics));
        this.$store.commit('updateProfile');
        swal({
          title:this.$t('done'),
          text:this.$t('profileupdated'),
          icon:"success"
        })
      }).catch((errors)=>{
        swal({
          title:this.$t('error'),
          text:this.$t('profileupdatefailed'),
          icon:"error"
        })
        this.errors = errors.response.data.errors;
      })
    }
  }
}
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



a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>
