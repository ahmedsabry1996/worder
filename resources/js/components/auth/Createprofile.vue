<template>
<v-content>
    </div>
  <v-container grid-list-xl>

    <v-layout row wrap>
      <v-flex xs12 md4 offset-md1 style="text-overflow: ellipsis;">

        <v-form @submit.prevent="createProfile">

          <div  id="file-container" color="#e1f7e6" class="text-xs-center" style="height:200px !important;" >
            <v-icon class="mt-5" color="white" size="70px">
              add_a_photo
            </v-icon>
            <input id="file" type="file" @change="handleFile" style="opacity:0">
          </div>


    <v-tooltip right>

          <v-text-field
            slot="activator"
            solo
            v-model="displayName"
            :label="$t('displayname')">
            </v-text-field>
            <span>{{$t('displayName')}}</span>

          </v-tooltip>
          <p><b class="error--text" v-if="errors.display_name">{{errors.display_name[0]}}</b></p>

          <!-- GENDER -->
        <v-radio-group v-model="selectedGender" class="white--text">
            <div slot="label" style="color:#f7dde3">
              <h3>{{$t('gender')}}</h3>
            </div>

          <template v-for="(gender,index) in gender">
               <v-radio
                 color="#f7dde3"
                :value="index+1">
                <div slot="label" style="color:#f7dde3">
                  {{gender}}
                </div>
               </v-radio>
             </template>
      </v-radio-group>
      <p><b class="error--text" v-if="errors.gender_id">{{$t('gendererror')}}</b></p>

<!-- COUNTRY -->
      <v-select
              :items="countries"
                :label="$t('country')"
                v-model="selectedCountry"
                solo
               search-input>
               </v-select>
               <p><b class="error--text" v-if="errors.country_id">{{$t('countryerror')}}</b></p>

<!-- TOPICS -->
               <v-select
                 :items="topics"
                   item-text="topic"
                   item-value="id"
                   v-model="selectedTopics"
                  :label="$t('selectfavtopics')"
                  multiple
                  chips
                  solo
               ></v-select>
 <p><b class="error--text" v-if="errors.topics">{{$t('selectfavtopics')}}</b></p>
 <!-- BIRTHDAY  -->
               <v-dialog
       ref="dialog"
       v-model="modal"
       :return-value.sync="bdate"
       persistent
       lazy
       full-width
       width="290px"
     >


       <v-text-field
         solo
         slot="activator"
         v-model="bdate"
         :label="$t('birthday')"
         prepend-inner-icon="date_range"
         readonly
           color="white"

       ></v-text-field>
       <v-date-picker :reactive="true" locale="ar" v-model="bdate" scrollable>
         <v-spacer></v-spacer>
         <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
         <v-btn flat color="primary" @click="$refs.dialog.save(bdate)">OK</v-btn>
       </v-date-picker>
     </v-dialog>


<p><b class="error--text" v-if="errors.birth_date">{{errors.birth_date[0]}}</b></p>

<!--DESCRIPTION  -->
     <v-textarea
no-resize
          :label="$t('description')"
            solo
            v-model="description"

          ></v-textarea>
<b>{{writtenDescription}}/25 words</b>
    <p class="error--text" v-if="!checkDescription"><b>{{$t('descriptionerror')}}</b> </p>
            <p class="error--text" v-if="errors.description"><b>{{errors.description[0]}}</b> </p>
          <div class="text-xs-center">

        <v-btn
          @click="createProfile"
          color="primary"
          round
          :loading="loading"
        >
        {{$t('create')}}
      </v-btn>
    </div>
        </v-form>
      </v-flex>
      <!-- SIMULATE -->
      <v-flex sm4 hidden-xs-only offset-sm2>
        <v-card dark max-width="320" height="600" max-height="620">
          <v-img
            v-if="avatar==null"
          :src="`/storage/avatars/avatar_default.jpg`"
            height="200"
        ></v-img>
        <template  v-if="avatar != null">

          <v-img
          :src="avatar"
          height="225"
        ></v-img>
        <div class="text-xs-center">
          <v-tooltip right>
        <v-btn small slot="activator" color="error" icon @click="removeSelectedAvatar">
            <v-icon>
              close
            </v-icon>
        </v-btn>
        <b>{{$t('remove')}}</b>
      </v-tooltip>
      </div>
      </template>


        <div class="text-sm-center">
          <h1>{{username}}</h1>
          <h2 class="yellow--text"><i>{{displayName}}</i></h2>
          <h3>{{gender[selectedGender-1]}}</h3>
            <bdi>
              <h4>
              <b>{{$t('from')}} : </b>
            {{selectedCountry}}</h4>
   </bdi>
        </div>

        <div class="text-sm-center" v-if="selectedTopics.length > 0">
          <h4>{{$t('favtopics')}}</h4>
          <template v-for="topic in selectedTopics">
          <v-btn  small round color="success">
            {{topics[topic-1].topic}}
          </v-btn>
        </template>

       </div>
       <div class="text-sm-center" style="  overflow:hidden;text-overflow: ellipsis;">
         <bdi>
           <p style="white-space: pre-line;"><b>{{$t('about')}} : </b> {{description}}</p>
     </bdi>

       </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
    </v-content>
</template>


<script>
import axios from 'axios';
export default {
mounted(){
    console.log('create profile loaded');
},
      data(){
                return {
                  loading:false,
                  modal: false,
                  displayName:'',
                  avatar:null,
                  gender:['male','female'],
                  selectedGender:null,
                  selectedCountry:null,
                  selectedTopics:[],
                  bdate: new Date().toISOString().substr(0, 10),
                landscape: false,
                reactive: true,
                  description:'',
                  writtenDescription:0,
                  errors:[],
                  loading:false
                }
},

computed:{
  countries(){
    return  this.$store.getters.countries;
  },
  topics(){
    return this.$t('topics');
  },
  username(){
      return   this.$store.getters.currentUser.name;
      },

      userCountry(){
         if ( this.$store.getters.countries.indexOf(this.selectedCountry) != -1) {
          return this.$store.getters.countries.indexOf(this.selectedCountry) + 1
         }
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
    this.loading = true;
    axios.post("/api/create-profile/"+this.$store.state.authentication.userId,
      {
        "avatar":this.avatar,
        "user_id":this.$store.state.authentication.userId,
        "display_name":this.displayName,
        "gender_id":this.selectedGender,
        "topics":this.selectedTopics,
        "birth_date":this.bdate,
        "country_id":this.userCountry,
        "description":this.description,
        "email":this.$store.getters.email,
        "password":this.$store.getters.passowrd
      },{
        headers:{
          "Authorization":`Bearer ${this.$store.state.authentication.userToken}`
        }
      })
      .then((response)=>{
        this.loading = false;

        swal({
          "title":"WOW!",
          "text":this.$t('welcome'),
          "icon":"success"
        })

        this.errors = [];

        this.$store.commit('createProfile',{
          profile:response.data.profile,
          currentUserTopics:response.data.topics,
          token:response.data.access_token,
        });

        if (!!response.data.trend) {

          localStorage.setItem('trend',(response.data.trend.top_words));

        }


        this.$store.commit("topTen",{trend:response.data.trend.top_words});


        this.$router.push('/');

      })
      .catch((error)=>{
        this.loading = false;

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
#file{
	opacity: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
#file-container {
  width:200px;
  margin: 7px auto;
	height: 200px !important;
	position: relative;
  background-color:#002d37;

  }
  </style>
