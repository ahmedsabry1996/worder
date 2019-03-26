<template>
  <v-content class="container">
    <v-container grid-list-md v-if="isLoggedIn">
      <v-layout row wrap>
        <v-flex xs12 md4 offset-md4>
    <v-tabs
      v-model="currentTab"
      dark
      slider-color="green">
      <v-tab href="#email">
        edit email
      </v-tab>
      <v-tab href="#password">
        edit password
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
        <v-tab-item value="email">

          <template  v-if="!verificationCode">
            <v-text-field
            type="email"
            v-model="email"
            autocomplete="off"
            @keyup.enter="updateEmail"
            :placeholder="$t('newemail')"
            solo
            :hint="`${$t('currentemail')} : ${currentUser.email}`"
            ></v-text-field>

            <template v-if="errors">
              <p class="error--text" v-if="errors.email"><b>{{errors.email}}</b></p>
              <p class="error--text" v-if="errors.send_code"><b>{{errors.send_code}}</b></p>
            </template>
            <div class="text-xs-center">

            <v-btn round :loading="loading" round class="white--text success"  @click="updateEmail">
                {{$t('save')}}
            </v-btn>

          </div>

          </template>

    <template v-if="verificationCode">
      <p class="green--text">{{$t('codesent')}} : <b>{{email}}</b> </p>
      <v-text-field
        solo
        :hint="$t('code')"
        @keyup.enter="changeEmail"
        v-model="code"
        :placeholder="$t('code')">
      </v-text-field>
      <template v-if="errors">
        <p class="error--text" v-if="errors.code"><b>{{errors.code}}</b></p>
      </template>
      <div class="text-xs-center">
      <v-btn round :loading="loading" class="success white--text"  @click="changeEmail">
          {{$t('donebtn')}}
      </v-btn>
    </div>
    </template>
        </v-tab-item>

        <v-tab-item value="password">
          <template v-if="!oldPasswordTrue">
            <v-text-field solo
              type="password"
              :placeholder="`enter ${$t('currentpass')}`"
              :label="$t('currentpass')"
              v-model="password"
                @keyup.enter="isCorrectPassword"
            ></v-text-field>
            <template v-if="errors">
                  <p class="error--text" v-if="errors.errorOldPassword"><b>{{errors.errorOldPassword}}</b></p>
            </template>
            <div class="text-xs-center">

            <v-btn :loading="loading"round class="white indigo--text" @click="forgetPasswrd" style="cursor:pointer;">
              {{$t('forgetpassword')}}
            </v-btn>
            <v-btn :loading="loading"round  @click="isCorrectPassword" class="success white--text">
                {{$t('donebtn')}}
            </v-btn>
          </div>
          </template>

                  <template class="form-group" v-if="correctOldPassowrd">
                      <input type="text" class="hide">
                    <v-text-field solo
                    type="password"
                    v-model="newPassowrd"
                    :placeholder="$t('newpassword')">
                    </v-text-field>
                    <br>
                    <v-text-field solo
                          type="password"
                          @keyup.enter="changePassword"
                          v-model="confirmPassword"
                          :placeholder="$t('repeatpass')"
                    ></v-text-field>

                    <template v-if="errors">
                          <p class="error--text" v-if="errors.passwordLength"><b>{{errors.passwordLength}}</b></p>
                          <p class="error--text" v-if="errors.passwordmatch"><b>{{errors.passwordmatch}}</b></p>
                    </template>
                    <div class="text-xs-center">

                    <v-btn :loading="loading"round  @click="changePassword" class="success white--text">
                      {{$t('save')}}

                    </v-btn>
                    <v-btn :loading="loading"round  class="warning black--text" @click="reset">
                      {{$t('cancel')}}
                    </v-btn>
                  </div>
                  </template>

                  <template v-if="verificationCode">

                    <p class="white--text text-xs-center">
                        <bdi>

                      {{$t('codesent')}}  <b>{{currentUser.email}}</b>
                      {{$t('entersentcode')}}
                    </bdi>
                  </p>


                    <v-text-field solo
                    @keyup.enter="checkCode"
                     v-model="code"
                     :placeholder="$t('code')"
                    ></v-text-field>
                  <template v-if="errors">
                        <p class="error--text" v-if="errors.code"><b>{{errors.code}}</b></p>
                  </template>
                  <div class="text-xs-center">

                    <v-btn :loading="loading"round @click="checkCode" round class="success white--text">
                        {{$t('donebtn')}}
                    </v-btn>

                  </div>
                </template>
        </v-tab-item>
        <v-tab-item>
          <!-- Insh'Allah
          verify user profil after reaching 10M
  <div id="verify-profile" class="tab-pane fade" >
    <verify-profile></verify-profile>
  </div>

            <br>
            <button type="button" class="btn btn-danger" @click="goHome">
                {{$t('cancel')}}
            </button>
           -->
        </v-tab-item>
    </v-tabs-items>






            </v-flex>
    </v-layout>
  </v-container>

</v-content>
</template>

<script>
  import VerifyProfile from './../profile/VerifyProfile.vue';

  export default {
    components:{
      VerifyProfile
    },
data(){
  return {
    currentTab:'email',
    loading:false,
    email:'',
    password:'',
    correctOldPassowrd:false,
    newPassowrd:'',
    confirmPassword:'',
    verificationCode:null,
    code:'',
    isForgetPassword:false,
    errors:[],

  }


},

computed:{
  currentUser(){
    return this.$store.getters.currentUser;
  },
  isLoggedIn(){
    return this.$store.getters.isLoggedIn;
  },
  oldPasswordTrue(){
    if (this.correctOldPassowrd || this.verificationCode) {
        return true;
    }
    return false;
  }
},
methods:{

  goHome(){
    this.$router.push('/');
  },

  updateEmail(){
      const currentUserEmail= this.$store.state.authentication.currentUser.email;
    if (this.email != currentUserEmail && this.email.length > 0) {
        this.loading = true;
        axios.post('/api/update-email',{
          email:this.email,
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{
          this.loading = false;
          console.log(response.data);
          this.verificationCode = response.data.sent_code;
          this.errors = null;
        })
        .catch((errors)=>{
          console.log(errors.response);
          console.log(errors.response.data.errors);
          this.loading = false;

          this.errors = errors.response.data.errors;
        })
    }

  },

  changeEmail(){
      if (this.verificationCode == this.code) {
        this.loading = true;

        axios.post('/api/change-email',{
          sent_code:this.verificationCode,
          code:this.code,
          email:this.email,
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        }).then((response)=>{
          this.reset();
          this.loading = false;

          localStorage.setItem('current_user',JSON.stringify(response.data.updated_user));
          localStorage.setItem('email',this.email);
          this.$store.commit('updateUser');
          this.$store.commit('updateEmail');
          swal({
            "title":this.$t('done'),
            "text":this.$t('emailupdated'),
            "icon":"success"
          });
        })
        .catch((errors)=>{
          console.log(errors.response);
             console.log(errors.response.data.errors);

             this.loading = false;

          this.errors = errors.response.data.errors;

        })
    }
    else{
      this.loading = false;

      this.errors = {code:'error in inserted code'}
    }
  },

  forgetPasswrd(){
    const currentUserEmail= this.$store.state.authentication.currentUser.email;

    let sendVerificationCode = confirm(`${this.$t('sendto')} ${currentUserEmail} ?`);
    if (sendVerificationCode) {
      this.loading = true;

      this.isForgetPassword = true;
      axios.post('/api/auth/sendcode',{
        email:currentUserEmail
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{
        this.loading = false;

        console.log(response.data);
        this.verificationCode = response.data.verification_code;
        this.errors = null;

      })
      .catch((errors)=>{
        this.loading = false;

        this.errors = errors.response.data.errors;
        console.log(errors.response.data.errors);

      })
    }
  },

  isCorrectPassword(){
    const currentUserPassword =this.$store.state.authentication.currentUser.original_password;
    if (this.password == currentUserPassword) {
        this.correctOldPassowrd = true;
    }
    else{
      this.errors = {'errorOldPassword':this.$t('currentpasserror')}
    }

  },

  changePassword(){
    const currentUserPassword =this.$store.state.authentication.currentUser.original_password;

    if (this.correctOldPassowrd) {
      if (this.newPassowrd.length >= 6 && this.confirmPassword.length >=6) {

        if (this.newPassowrd == this.confirmPassword) {
          this.loading = true;


                axios.post('/api/auth/reset-password',{
                  password:this.newPassowrd,
                  password_confirmation:this.confirmPassword,
                  user_id:localStorage.getItem('user_id')
                },{
                  headers:{
                    Authorization:`Bearer ${localStorage.getItem('access_token')}`
                  }
                })
                .then((response)=>{
                  this.reset();
                  this.loading = false;
                  console.log(response.data);
                  localStorage.setItem('current_user',JSON.stringify(response.data.updated_user));
                  this.$store.commit('updateUser');
                  this.errors = null;
                  swal({
                    "title":this.$t('done'),
                    "text":this.$t('passwordupdated'),
                    "icon":"success"
                  });

                })
                .catch((errors)=>{
                  this.loading = false;

                  console.log(errors);
                  console.log(errors.response);
                  console.log(errors.response.data.errors);

                  this.errors = errors.response.data.errors;


                })

        }
        else{
            this.errors = {'passwordmatch':this.$t('passwordmatch')}
          }
      }
      else{
        this.errors = {'passwordLength':this.$t('passwordLength')}
      }
    }
    else{
      alert('refresh');
    }
  }
,
  checkCode(){
    if (this.code == this.verificationCode) {
      this.correctOldPassowrd = true;
      this.verificationCode = null;
    }
    else{
      swal({
        title:this.$t('error'),
        text:this.$t('codeerror'),
        icon:'error'

      });
    }
  },

  reset(){
    this.email='';
    this.password='';
    this.correctOldPassowrd=false;
    this.newPassowrd='';
    this.confirmPassword='';
    this.verificationCode=null;
    this.code='';
    this.isForgetPassword=false;
    this.errors=[];

  }
}

}
</script>

<style scoped>
</style>
