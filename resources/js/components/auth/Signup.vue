<template>


    <v-container grid-list-md >
    <v-layout>
      <v-flex xs12 md4 offset-md4 class="pa-3">
        <template v-if="!verificationCode">

          <!-- Default signup form -->
            <v-form @submit.prevent="signup">
              <v-text-field

                background-color="#112f41"
                solo-inverted
                :label="$t('name')"
                v-model="name"
              ></v-text-field>

              <template v-if="signupErrors">
              <p class="white--text" v-if="signupErrors.name">
                <b>{{signupErrors.name[0]}}</b>
              </p>
              </template>

              <v-text-field
              background-color="#112f41"


                :label="$t('email')"
                  v-model="email"
 solo-inverted
              ></v-text-field>

                                <template v-if="signupErrors">
                                <p class="white--text" v-if="signupErrors.email">
                                  <b>{{signupErrors.email[0]}}</b>
                                </p>
                                </template>
                      <v-text-field
                      background-color="#112f41"


                        :label="$t('password')" v-model="password" solo-inverted
                      ></v-text-field>
                      <template v-if="signupErrors">
                      <p class="white--text" v-if="signupErrors.password">
                        <b>  {{signupErrors.password[0]}}
                        </b>
                      </p>
                      </template>
              <v-text-field
              background-color="#112f41"


                 :label="$t('repeatpass')" v-model="passwordConfirm" solo-inverted
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
                        <bdi class="white--text">{{$t('codesent')}} : <b class="green--text">{{email}}</b></bdi>
</h3>
                    </label>

                </div>
                <br />
                <v-text-field

                background-color="#112f41"
                    v-model="code"
                    :label="this.$t('code')"
                      solo-inverted

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

          localStorage.setItem('email',this.email);
          localStorage.setItem('password',this.password);
          this.$store.commit('userCredionals');
          this.signupLoading = false;
          swal({
            title:"Done!",
            text:this.$t('emailcheck'),
            icon:"success"
          });
        })
        .catch(()=>{

          this.signupLoading = false;
          swal({
            title:"Error!qq",
            text:this.$t('signupfail'),
            icon:"error"
          });
        })
    },

          verify(){
            this.signupLoading = true;
            console.log(this.signupLoading);
            if (this.code == this.$store.getters.verificationCode) {
                localStorage.setItem('user_id',this.currentUser.id);
                this.$store.dispatch('confrimEmail');
                this.$router.push('create-profile');

            }
            else{

                this.signupLoading = false;
                console.log(this.signupLoading);
              swal({
                title:"Error!",
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
