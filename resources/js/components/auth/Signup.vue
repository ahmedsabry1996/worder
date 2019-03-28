<template>
    <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
      </v-flex>
      <v-flex xs12  md4 offset-md4  class="pa-3">
        <template v-if="!verificationCode">

          <!-- Default signup form -->
            <v-form @submit.prevent="signup">
              <v-text-field
              autofocus
                solo
                :label="$t('name')"
                v-model="name"
                  color="indigo"

              ></v-text-field>

              <template v-if="signupErrors">
              <p class="white--text" v-if="signupErrors.name">
                <b>{{signupErrors.name[0]}}</b>
              </p>
              </template>

              <v-text-field

              class="t"


                :label="$t('email')"
                  v-model="email"
 solo
              ></v-text-field>

                                <template v-if="signupErrors">
                                <p class="white--text" v-if="signupErrors.email">
                                  <b>{{signupErrors.email[0]}}</b>
                                </p>
                                </template>
                      <v-text-field
                      class="t"



                        :label="$t('password')"
                          type="password"
                         v-model="password"
                         solo
                      ></v-text-field>
                      <template v-if="signupErrors">
                      <p class="white--text" v-if="signupErrors.password">
                        <b>  {{signupErrors.password[0]}}
                        </b>
                      </p>
                      </template>
              <v-text-field
              class="t"

                 :label="$t('repeatpass')"
                   type="password"
                 v-model="passwordConfirm" solo
              ></v-text-field>

              <div class="text-xs-center">

                              <v-btn round color="primary" @click="signup" :loading="signupLoading">
                                    {{$t('signup')}}
                              </v-btn>
              </div>
            </v-form>


        </template>


            <template v-if="verificationCode">

              <v-form @submit.prevent="verify" light>
                <div class="text-xs-center">
                    <h1 class="white--text"><bdi>{{$t('emailcheck')}}</bdi></h1>
                    <br />
                    <label>
                        <h3>
                        <bdi class="white--text">{{$t('codesent')}} : <b class="green--text">{{currentUser.email}}</b></bdi>
</h3>
                    </label>

                </div>
                <br />
                <v-text-field


                    v-model="code"
                    :label="this.$t('code')"
                      solo

                ></v-text-field>

                <div class="text-xs-center">

                  <v-btn color="primary" round
                  :loading="signupLoading"
                   @click="verify">
                  {{$t('create')}}
                    </v-btn>

                      <v-btn @click="logout" round color="error">
                          {{$t('exit')}}
                      </v-btn>

                </div>
              </v-form>
            </template>
            </v-flex>
            </v-layout>
            </v-container>
</v-content>

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
    currentUser(){
      return this.$store.getters.currentUser;
    }

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

          this.$store.commit('userCredionals',{email:this.email,password:this.password});
          this.email = this.currentUser.email;
          this.signupLoading = false;
          swal({
            title:this.$t('done'),
            text:this.$t('emailcheck'),
            icon:"success"
          });
        })
        .catch(()=>{

          this.signupLoading = false;
          swal({
            title:this.$t('error'),
            text:this.$t('signupfail'),
            icon:"error"
          });
        })
    },

          verify(){
            this.signupLoading = true;
            console.log(this.signupLoading);
            if (this.code == this.verificationCode) {
                this.$router.push('/create-profile');
                this.$store.dispatch('confrimEmail');

            }
            else{

                this.signupLoading = false;
                console.log(this.signupLoading);
              swal({
                title:this.$t('error'),
                text:this.$t('codeerror'),
                icon:"warning"
              });
            }
        },

                  logout(){
                      localStorage.clear();
                      this.$store.commit('logout');
                      window.location.href =  "http://127.0.0.1:8000";

                  }

  }
}
</script>

<style scoped>
#codde{
  color:green !important
}
</style>
