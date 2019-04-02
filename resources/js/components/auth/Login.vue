<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
      </v-flex>
    <v-flex xs12 md4 offset-md4 class="pa-4">
      <!-- Login fields -->
      <v-card color="#002d37" class="mt-5">
      <template v-if="!forgetPassword">

        <v-form @submit.prevent="login">
          <div class="pa-4">

          <v-text-field
            color="white--text"
            v-model="email"
            :placeholder="$t('email')"
            solo
            autofocus>
            </v-text-field>
          <v-text-field
            type="password"
            color="white--text"
            v-model="password"
            :placeholder="$t('password')"
            solo
          ></v-text-field>
          <div class="text-xs-center">

          <v-btn round color="primary" @click="login">{{$t('login')}}</v-btn>
          <v-btn round v-if="!forgetPassword" color="warning" @click="resetPassword">{{$t('forgetpassword')}}</v-btn>


        </div>
      </div>
        </v-form>
      </div>
        </template>

<!-- Foreget password -->
<template v-if="forgetPassword && !hasEmail">
<v-form @submit.prevent="verifyEmail">
      <div class="pa-3">

    <v-text-field
      :label="$t('email' )"
        v-model="email"
      solo
    ></v-text-field>
    <div class="text-xs-center">
      <v-btn round color="primary" @click="verifyEmail" :loading="loading">{{$t('verify')}}
</v-btn>
<v-btn round type="button" @click="cancelPassowrd" color="error" v-if="forgetPassword">
  {{$t('cancel')}}
</v-btn>
    </div>
  </div>

</v-form>
</template>

<!-- Verify code  -->
<template v-if="hasEmail && !correctValidationCode">

  <v-form @submit.prevent="verifyCode">
    <div class="pa-3">
    <label for="confirm_code" class="white--text">{{$t('codesent')}}  <b class="e1f7e6">{{email}}</b> </label>
    <v-text-field
       v-model="confirmationCode"
         solo

    ></v-text-field>
    <div class="text-xs-center">

    <v-btn :loading="loading" type="button" @click="verifyCode" color="primary" round>
        {{$t('verify')}}
    </v-btn>

            <v-btn round type="button" @click="cancelPassowrd" color="error" v-if="forgetPassword">
              {{$t('cancel')}}
            </v-btn>
  </div>
</div>

</v-form>
</template>

<!-- Reenter new password -->
<template v-if="correctValidationCode && hasEmail">
    <h3>create new password</h3>
  <v-form @submit.prevent="createNewPassword">
    <div class="pa-3">

    <v-text-field
      :hint="$t('newpassword')"
        type="password"
      v-model="password"
        solo

    ></v-text-field>

    <v-text-field
      :hint="$t('repeatpass')"
        v-model="passwordConfirmation"
        solo
    ></v-text-field>
    <div class="text-xs-center">

      <v-btn color="primary"type="button"  :loading="loading" @click="createNewPassword" round>
        {{$t('create')}}
      </v-btn>

    </div>
  </div>


  </v-form>
</template>
<!-- CANCEL button -->

</v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
    console.log('login loaded');
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


              this.$store.commit("loginSuccess",{
                currentUser:response.data.user,
                currentUserProfile:response.data.profile,
                currentUserTopics:response.data.topics,
                token:response.data.access_token,
                userId:response.data.user.id,
                hasProfile:1,
                isVerified:1,
              });
              this.$store.commit("topTen",{trend:response.data.trend.top_words});
              this.$router.push('/');



        }).catch((errors)=>{
          this.loading = false ;
          swal({
            title:this.$t('error'),
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
          title:this.$t('done'),
          text:this.$t('emailcheck'),
          icon:"success"
        });
      })
      .catch((errors)=>{
        this.loading  = false;
        swal({
          title:this.$t('error'),
          text:this.$t('emailnotexist'),
          icon:"error",
        });
        console.log(errors);
        console.log(errors.response);
      })
    },
    verifyCode(){
      if (this.confirmationCode == this.emailedCode) {

          this.correctValidationCode = true;
          this.password = '';

      }
      else{

          this.loading = false;
        swal({
          title:this.$t('error'),
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
            title:this.$t('done'),
            "text":this.$t('passworderror'),
            "icon":"warning"
          })
        }
      }
      else{
        this.loading = false;

        swal({
          title:this.$t('error'),
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
