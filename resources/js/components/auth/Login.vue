<template>
  <v-content>
    <v-layout row wrap>
    <v-flex xs12 md4 offset-md4 >
      <!-- Login fields -->
      <template v-if="!forgetPassword">
        <v-form  @submit.prevent="login">
          <v-text-field

          background-color="#112f41"
            color="white--text"
            v-model="email"
            :label="$t('email')"
            solo-inverted
              autofocus

          ></v-text-field>
          <v-text-field
          background-color="#112f41"

            type="password"
            color="white--text"
            v-model="password"
            :label="$t('password')"
            solo-inverted
          ></v-text-field>
          <div class="text-xs-center">

          <v-btn round color="primary" @click="login">{{$t('login')}}</v-btn>
          <v-btn round v-if="!forgetPassword" color="warning" @click="resetPassword">{{$t('forgetpassword')}}</v-btn>


        </div>
        </v-form>
        </template>

<!-- Foreget password -->
<template v-if="forgetPassword && !hasEmail">
<v-form @submit.prevent="verifyEmail">

    <v-text-field
      :label="$t('email' )"
        v-model="email"
      solo-inverted
    ></v-text-field>
    <div class="text-xs-center">
      <v-btn round color="primary" @click="verifyEmail" :loading="loading">{{$t('verify')}}
</v-btn>
    </div>
</v-form>
</template>

<!-- Verify code  -->
<template v-if="hasEmail && !correctValidationCode">

  <v-form @submit.prevent="verifyCode">
    <label for="confirm_code">{{$t('codesent')}} : <b class="white--text">{{email}}</b> </label>
    <v-text-field
       v-model="confirmationCode"
         solo-inverted

    ></v-text-field>
    <div class="text-xs-center">

    <v-btn :loading="loading" @click="verifyCode" color="primary" round>
        {{$t('verify')}}
    </v-btn>
  </div>

</v-form>
</template>

<!-- Reenter new password -->
<template v-if="correctValidationCode && hasEmail">
  <v-form @submit.prevent="createNewPassword">
    <v-text-field
      :hint="$t('newpassword')"
        type="password"
      v-model="password"
        solo-inverted

    ></v-text-field>

    <v-text-field
      :hint="$t('repeatpass')"
        v-model="passwordConfirmation"
        solo-inverted
    ></v-text-field>
    <div class="text-xs-center">

      <v-btn color="primary" :loading="loading" @click="createNewPassword" round>
        {{$t('create')}}
      </v-btn>
    </div>


  </v-form>
</template>
<!-- CANCEL button -->
<div class="text-xs-center">

  <v-btn round @click="cancelPassowrd" color="error" v-if="forgetPassword">
    {{$t('cancel')}}
  </v-btn>
</div>
      </v-flex>
    </v-layout>
</v-content>
</template>

<script>
const Swal = require('sweetalert2');
import axios from 'axios';
export default {
  data(){
    return {
      loading:false,
      email:'',
      password:'',
      passwordConfirmation:'',
      rememberMe:false,
      forgetPassword:false,
      hasEmail:false,
      correctValidationCode:false,
      confirmationCode:'',
      emailedCode : null,
      userId :null,
      newPassword:null
    }
  },
  mounted(){

  },
  computed:{

  },
  methods:{
    login(){

        this.loading = true;
        axios.post("/api/auth/login",{
          email:this.email,
          password:this.password,
          remember_me:this.rememberMe
        }).then((response)=>{
            console.log(response.data.user);
            if (!!response.data.trend) {

              localStorage.setItem('trend',(response.data.trend.top_words));
            }

            localStorage.setItem('current_user',JSON.stringify(response.data.user));
            localStorage.setItem('current_user_profile',JSON.stringify(response.data.profile));
            localStorage.setItem('current_user_topics',JSON.stringify(response.data.topics));
            localStorage.setItem('access_token',response.data.access_token);
            localStorage.setItem('user_id',response.data.user.id);
            localStorage.setItem('has_profile',response.data.user.has_profile);
            localStorage.setItem('is_verified',response.data.user.is_verified);

            if (response.data.user.is_verified == 1 && response.data.user.has_profile == 1) {

              this.$store.commit("loginSuccess");
              this.$store.commit("topTen");
              this.$router.push('/');

              console.log("perfect user!");
            }

            if(response.data.user.is_verified == 1 && response.data.user.has_profile === 0){

                this.$store.commit('needProfile');
                this.$router.push('/create-profile');
                console.log('verified but has no profile');
            }

            if(response.data.user.is_verified === 0 && response.data.user.has_profile === 0){
                this.$store.dispatch('sendVerificationCode',response.data.user.email)
                .then(()=>{
                  localStorage.setItem('email',response.data.user.email);
                  this.$router.push('/signup');

                });

                console.log('need to verify account');

            }



        }).catch((errors)=>{
          this.loading = false ;
          swal({
            title:'Login Error',
            text:this.$t('loginfail'),
            icon:'error'
          });
          console.log(errors);
          console.log(errors.response);
        })
    }
    ,
    resetPassword(){
      this.forgetPassword = !this.forgetPassword;
    },
    verifyEmail(){
      this.loading = true;
      axios.post("/api/verify-email",{
        email:this.email
      })
      .then((response)=>{
        this.loading  = false;
        this.hasEmail = true;
        this.userId = response.data.user.id;
        this.emailedCode = response.data.verification_code;
        swal({
          title:"Done",
          text:this.$t('emailcheck'),
          icon:"success"
        });
      })
      .catch((errors)=>{
        this.loading  = false;
        swal({
          title:"Oops!",
          text:this.$t('emailnotexist'),
          icon:"error",
        });
        console.log(errors);
        console.log(errors.response);
      })
    },
    verifyCode(){
      if (this.confirmationCode == this.emailedCode) {

          this.correctValidationCode = true
      }
      else{

          this.loading = false;
        swal({
          title:"Error",
          text:this.$t('codeerror'),
          icon:"error"
        });
      }

    }
    ,
    createNewPassword(){

      if (this.password.length >= 6 ) {
          if (this.password === this.passwordConfirmation) {
              this.newPassword = this.password;

          this.loading = true;
            axios.post('/api/auth/reset-password',{
              "password":this.password,
              "password_confirmation":this.passwordConfirmation,
              "user_id":this.userId
            })
            .then((response)=>{
              this.login();
            })
            .catch((errors)=>{
              this.loading = false;

                console.log(errors);
                console.log(errors.response);
            })
          }
        else{
          this.loading = false;

          swal({
            'title':"Error",
            "text":this.$t('passworderror'),
            "icon":"warning"
          })
        }
      }
      else{
        this.loading = false;

        swal({
          "title":"warning",
          "text":this.$t('passwordlength'),
          "icon":"warning"
        })
      }
    }
    ,
    cancelPassowrd(){
      this.loading = false;
      this.forgetPassword=false;
      this.hasEmail=false;
      this.correctValidationCode=false;
      this.confirmationCode='';
      this.emailedCode = null;
      this.userId =null;
      this.newPassword=null;
    }
  }
}
</script>

<style scoped>




h1{
    color: #000;
    letter-spacing: 2px;
    margin-bottom: 20px;
    font-family: 'Montserrat';
    font-weight: 900;

}




</style>
