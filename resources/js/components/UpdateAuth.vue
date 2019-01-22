<template >

  <div class="container" >
    <div class="row" v-if="isLoggedIn">
      <h2 class="text-center">update data</h2>
      <div class="col-md-4 col-md-push-4">
        <p></p>
        <ul class="nav nav-pills nav-justified">

          <li @click="reset" class="active"><a data-toggle="pill" href="#email">{{$t('email')}}</a></li>
          <li @click="reset"><a data-toggle="pill" href="#password">{{$t('password')}}</a></li>
          <li @click="reset"><a data-toggle="pill" href="#verify-profile">{{$t('verifyprofile')}}</a></li>

        </ul>

        <div class="tab-content">
          <div id="email" class="tab-pane fade in active">
            <h3></h3>


              <div class="form-group" v-if="!verificationCode">
                <label for="eamil">{{$t('currentemail')}} : {{currentUser.email}} </label>
                <input type="email" v-model="email" autocomplete="off" @keyup.enter="updateEmail" class="form-control" id="Email" :placeholder="$t('newemail')">
                <br>
                <div v-if="errors">
                  <p class="text-danger" v-if="errors.email"><b>{{errors.email}}</b></p>
                  <p class="text-danger" v-if="errors.send_code"><b>{{errors.send_code}}</b></p>
                </div>
                <button type="button"  class="btn btn-success"  @click="updateEmail">
                    {{$t('save')}}
                </button>
              </div>

              <div class="form-group" v-if="verificationCode">
                <p class="text-success">{{$t('codesent')}} : <b>{{email}}</b> </p>
                <input type="text" class="form-control" @keyup.enter="changeEmail" v-model="code" :placeholder="$t('code')">
                <br>
                <div v-if="errors">
                  <p class="text-danger" v-if="errors.code"><b>{{errors.code}}</b></p>
                </div>
                <button type="button"  class="btn btn-success"  @click="changeEmail">
                    {{$t('donebtn')}}
                </button>
              </div>

          </div>
          <div id="password" class="tab-pane fade" >
            <h3></h3>
                <div class="form-group" v-if="!oldPasswordTrue">
                  <label>{{$t('currentpass')}}</label>
                  <input type="text" class="hide" >
                  <input type="password" :placeholder="`enter ${$t('currentpass')}`" @keyup.enter="isCorrectPassword" autocomplete="new-password" v-model="password" class="form-control" >
                  <div v-if="errors">
                        <p class="text-danger" v-if="errors.errorOldPassword"><b>{{errors.errorOldPassword}}</b></p>
                  </div>
                  <p class="help-block" @click="forgetPasswrd" style="cursor:pointer;">
                    {{$t('forgetpassword')}}
                    </p>
                  <button type="button" @click="isCorrectPassword" class="btn btn-success">
                      {{$t('donebtn')}}
                  </button>
                </div>

                <div class="form-group" v-if="correctOldPassowrd">
                    <input type="text" class="hide">
                  <input type="password" v-model="newPassowrd" class="form-control" :placeholder="$t('newpassword')">
                  <br>
                  <input type="password" @keyup.enter="changePassword" v-model="confirmPassword" :placeholder="$t('repeatpass')" class="form-control">

                  <div v-if="errors">
                        <p class="text-danger" v-if="errors.passwordLength"><b>{{errors.passwordLength}}</b></p>
                        <p class="text-danger" v-if="errors.passwordmatch"><b>{{errors.passwordmatch}}</b></p>
                  </div>
                  <button type="button" @click="changePassword" class="btn btn-success">
                      save
                  </button>
                  <button type="button" class="btn btn-warning" @click="reset">
                    Cancel
                  </button>

                  </div>
                  <div v-if="verificationCode">

                  <div class="form-group">
                    <p class="text-success">{{$t('codesent')}} : <b>{{currentUser.email}}</b>
                      {{$t('entersentcode')}}</p>

                    <input type="text" @keyup.enter="checkCode" v-model="code" class="form-control" :placeholder="$t('codesent')">
                  </div>

                  <div v-if="errors">
                        <p class="text-danger" v-if="errors.code"><b>{{errors.code}}</b></p>
                  </div>
                  <div class="form-group">
                    <button @click="checkCode" type="button" class="btn btn-success">
                        {{$t('donebtn')}}
                    </button>
                  </div>

                </div>
          </div>

<!-- verify profile -->
<div id="verify-profile" class="tab-pane fade" >
  <verify-profile></verify-profile>
</div>

          <br>
          <button type="button" class="btn btn-danger" @click="goHome">
              {{$t('cancel')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VerifyProfile from './VerifyProfile.vue';

  export default {
    components:{
      VerifyProfile
    },
data(){
  return {
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
      const currentUserEmail= this.$store.state.currentUser.email;
    if (this.email != currentUserEmail && this.email.length > 0) {
        axios.post('/api/update-email',{
          email:this.email,
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{
          console.log(response.data);
          this.verificationCode = response.data.sent_code;
          this.errors = null;
        })
        .catch((errors)=>{
          console.log(errors.response);
          console.log(errors.response.data.errors);

          this.errors = errors.response.data.errors;
        })
    }

  },

  changeEmail(){
      if (this.verificationCode == this.code) {

        axios.post('/api/change-email',{
          sent_code:this.verificationCode,
          code:this.code,
          email:this.email,
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        }).then((response)=>{
          localStorage.setItem('current_user',JSON.stringify(response.data.updated_user));
          this.$store.commit('updateUser');
          swal({
            "title":this.$t('done'),
            "text":this.$t('emailupdated'),
            "icon":"success"
          });
        })
        .catch((errors)=>{
          console.log(errors.response);
             console.log(errors.response.data.errors);


          this.errors = errors.response.data.errors;

        })
    }
    else{
      this.errors = {code:'error in inserted code'}
    }
  },
  forgetPasswrd(){
    const currentUserEmail= this.$store.state.currentUser.email;

    let sendVerificationCode = confirm(`${this.$t('sendto')} ${currentUserEmail} ?`);
    if (sendVerificationCode) {
      this.isForgetPassword = true;
      axios.post('/api/auth/sendcode',{
        email:currentUserEmail
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response)=>{
        console.log(response.data);
        this.verificationCode = response.data.verification_code;
        this.errors = null;

      })
      .catch((errors)=>{
        this.errors = errors.response.data.errors;
        console.log(errors.response.data.errors);

      })
    }
  },

  isCorrectPassword(){
    const currentUserPassword =this.$store.state.currentUser.original_password;
    if (this.password == currentUserPassword) {
        this.correctOldPassowrd = true;
    }
    else{
      this.errors = {'errorOldPassword':this.$t('currentpasserror')}
    }

  },

  changePassword(){
    const currentUserPassword =this.$store.state.currentUser.original_password;

    if (this.correctOldPassowrd) {
      if (this.newPassowrd.length >= 6 && this.confirmPassword.length >=6) {

        if (this.newPassowrd == this.confirmPassword) {


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
