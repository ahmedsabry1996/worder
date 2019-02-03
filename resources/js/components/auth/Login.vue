<template>
  <div class="login" id="wrapper">
    <div class="container">

  <form @submit.prevent="login" v-if="!forgetPassword">
    <div class="form-group">
      <label for="Email">{{$t('email')}}</label>
      <input type="text" class="form-control" v-model="email" id="Email" placeholder="Your Email">
    </div>
    <div class="form-group">
      <label for="passowrd">{{$t('password')}}</label>
      <input type="password" class="form-control" v-model="password" id="password" placeholder="password">
    </div>
    <div class="form-group">
      <label for="remember_me"> {{$t('rememberme')}} :
      <input type="checkbox" value="true" id="remember_me" v-model="rememberMe">
      </label>
    </div>
    <div class="form-group">
      <template v-if="!loading">
      <button type="submit" class="btn btn-default">
          {{$t('login')}}
      </button>
    </template>
    <template v-else>
      <p ><b>{{$t('loading')}}</b><br>
    <img src="/storage/avatars/loader.gif"  width="100" >
</p>
    </template>
    </div>
  </form>

  <form @submit.prevent="verifyEmail" v-if="forgetPassword && !hasEmail">
    <div class="form-group">
      <label for="email">{{$t('enteremail' )}} :</label>
      <input type="email" class="form-control" id="email" v-model="email"/>

    </div>
    <div class="form-group">
      <template v-if="!loading">
        <button type="submit" class="btn btn-success">
          {{$t('verify')}}
        </button>
      </template>

      <template v-else>
        <p ><b>{{$t('loading')}}</b><br>
    <img src="/storage/avatars/loader.gif"  width="100" >
</p>
      </template>
    </div>
  </form>
  <form @submit.prevent="verifyCode" v-if="hasEmail && !correctValidationCode">
  <div class="form-group">
    <label for="confirm_code">{{$t('codesent')}} : <b>{{email}}</b> </label>
    <input type="text" class="form-control" id="confirm_code" v-model="confirmationCode" placeholder="enter the emailed code">

  </div>
<div class="form-group">
  <template v-if="!loading">
  <button type="submit" class="btn btn-info">
      {{$t('verify')}}
  </button>
  </template>
  <template v-else>
    <p ><b>{{$t('loading')}}</b><br>
    <img src="/storage/avatars/loader.gif"  width="100" >
</p>
  </template>
</div>
</form>
  <form @submit.prevent="createNewPassword" v-if="correctValidationCode && hasEmail">
    <div class="form-group">
      <label for="new_password">{{$t('newpassword')}} : </label>
      <input type="password" class="form-control" id="new_password" v-model="password">
    </div>
    <div class="form-group">
      <label for="conifrm_passowrd">
        {{$t('repeatpass')}}
      </label>
      <input type="password" class="form-control" id="confirm_password" v-model="passwordConfirmation" placeholder="confirm password">
    </div>
    <div class="form-group">
      <template v-if="!loading">
        <button type="submit" class="btn btn-default">
            {{$t('create')}}
        </button>
      </template>
      <template v-else>
        <p ><b>{{$t('loading')}}</b><br>
    <img src="/storage/avatars/loader.gif"  width="100" >
</p>
      </template>
    </div>
  </form>
  <div>

        <button v-if="!forgetPassword" class="btn btn-warning" type="button" id="foreget_passowrd" v-on:click="resetPassword">
          <b>            {{$t('forgetpassword')}}
</b>
        </button>
    <button type="button" v-if="forgetPassword" class="btn btn-danger" @click="cancelPassowrd">
        {{$t('cancel')}}
    </button>
  </div>

</div>
</div>
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

            localStorage.setItem('trend',(response.data.trend.top_words));
            localStorage.setItem('current_user',JSON.stringify(response.data.user));
            localStorage.setItem('current_user_profile',JSON.stringify(response.data.profile));
            localStorage.setItem('current_user_topics',JSON.stringify(response.data.topics));
            localStorage.setItem('access_token',response.data.access_token);
            localStorage.setItem('user_id',response.data.user.id);
            localStorage.setItem('has_profile',response.data.user.has_profile);
            localStorage.setItem('is_verified',response.data.user.is_verified);

            if (response.data.user.is_verified == 1 && response.data.user.has_profile == 1) {

              this.$store.commit("loginSuccess",response.data.user.notifications);
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
