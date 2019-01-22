<template>

  <div class="container">

    <template v-if="!verificationCode">

        <form @submit.prevent="signup">

            <div class="form-group">
              <label>{{$t('name')}}</label>
              <input type="text" class="form-control"  placeholder="name" v-model="name">
            </div>
            <div class="form-group">
              <label>{{$t('email')}}</label>
              <input type="text" class="form-control"  placeholder="email" v-model="email">
              <template v-if="signupErrors">
              <p class="text-danger" v-if="signupErrors.email">
                <b>{{signupErrors.email[0]}}</b>
              </p>
              </template>
            </div>
            <div class="form-group">
              <label>{{$t('password')}}</label>
              <input type="text" class="form-control"  placeholder="pass****" v-model="password">
              <template v-if="signupErrors">
              <p class="text-danger" v-if="signupErrors.password">
                <b>  {{signupErrors.password[0]}}
                </b>
              </p>
              </template>
            </div>
            <div class="form-group">
              <label>{{$t('repeatpass')}}</label>
              <input type="text" class="form-control"  placeholder="confrim pass****" v-model="passwordConfirm">
            </div>
            <div class="form-group" v-if="!signupLoading">
              <button type="button" class="btn btn-default" @click="signup" >
                  {{$t('signup')}}
              </button>

            </div>
            <template v-if="signupLoading" class="text-center">
              <p ><b>{{$t('loading')}}</b><br>
                  <img src="/storage/avatars/loader.gif"  width="100" >
              </p>



            </template>
        </form>


    </template>
    <template v-else>

      <form @submit.prevent="verify">
        <div class="text-center">
            <h3><bdi>{{$t('emailcheck')}}</bdi></h3>
        </div>
        <div class="form-group">
          <label>
            <bdi>{{$t('codesent')}} : {{email}}</bdi>
          </label>
          <input type="text" :placeholder="this.$t('code')" class="form-control" v-model="code">

        </div>

          <div class="form-group">

            <button type="submit" class="btn btn-ingo">
                  {{$t('create')}}
            </button>
          </div>

      </form>
    </template>
  </div>
</template>

<script>
var email = localStorage.getItem('email') == null ? '' : localStorage.getItem('email');
export default {

  mounted(){
    console.log("signup mounted");
  },

  data(){
    return {
      name:'',
      email:email,
      password:'',
      passwordConfirm:'',
      code:'',
      signupLoading:false,

    }
  },
  computed:{
    verificationCode(){
      return this.$store.getters.verificationCode;
    },
    signupErrors(){
      return this.$store.getters.signupErrors;
    },


  },
  methods:{

    signup(){
        this.signupLoading = true;
        this.$store.dispatch('signup',{
          name:this.name,
          email:this.email,
          password:this.password,
          password_confirmation:this.passwordConfirm,
          original_password:this.password
        })
        .then(()=>{
          swal({
            title:"Done!",
            text:this.$t('emailcheck'),
            icon:"success"
          });
          localStorage.setItem('email',this.email);
          localStorage.setItem('password',this.password);
          this.$store.commit('userCredionals')
        })
        .catch((errors)=>{
          swal({
            title:"Error!",
            text:this.$t('signupfail'),
            icon:"error"
          });
          console.log(errors.response);
          this.signupLoading = false;
        })
    },

          verify(){
            if (this.code == this.$store.getters.verificationCode) {
                localStorage.setItem('user_id',this.$store.getters.currentUser.id);
                this.$store.dispatch('confrimEmail');
                this.$router.push('create-profile');

            }
            else{
              swal({
                title:"Error!",
                text:this.$t('codeerror'),
                icon:"warning"
              });
            }
        }
  }
}
</script>

<style scoped>
</style>
