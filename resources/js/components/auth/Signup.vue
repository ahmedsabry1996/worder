<template>
    <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12  md4 offset-md4 >
        <template v-if="!verificationCode">
          <v-card color="#005F5B" class="">

          <!-- Default signup form -->
            <v-form @submit.prevent="checkCredetionals">
              <div class="pa-4">
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

                              <v-btn round dark color="#282e33" @click="checkCredetionals" :loading="signupLoading">
                                    {{$t('signup')}}
                              </v-btn>
              </div>

              </div>

            </v-form>
          </v-card>
        </template>

            </v-flex>
            </v-layout>
            </v-container>
</v-content>

</template>

<script>
export default {

  mounted(){
    console.log("signup mounted");

  },

  data(){
    return {
      name:'',
      email:'',
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
    },
    appLang(){
      return  this.$store.getters.appLang;

    }

  },
  methods:{
      checkCredetionals(){
        this.signupLoading = true;
        this.$store.dispatch('checkCredetionals',{
          name:this.name,
          email:this.email,
          password:this.password,
          passwordConfirm:this.passwordConfirm,
          locale:this.appLang
        })
        .then((response)=>{

          this.signupLoading = false;
          this.$router.push('/verify-email');
        })
        .catch((error)=>{
          this.signupLoading = false;
          swal({
            title:this.$t('error'),
            text:this.$t('signupfail'),
            icon:"error"
          });
        })
      },

    signup(){
        this.signupLoading = true;
        this.$store.dispatch('signup',{
          name:this.name,
          email:this.email,
          password:this.password,
          password_confirmation:this.passwordConfirm,
          original_password:this.password,
          locale:this.appLang
        })
        .then(()=>{


          this.email = this.currentUser.email;
          this.signupLoading = false;
          this.$store.commit('userCredionals',
          { name:this.name,
            email:this.email,
            password:this.password});

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
