<template>
<v-container grid-list-md>
  <v-layout row wrap>
    <v-flex xs12>
        <div class="text-xs-center">

      <img  src="/logo.png" alt="worder" width="120" class="mt-2">
    </div>

      <h3 class="white--text text-xs-center">
        <bdi>
        {{$t('codesent')}}
        <span class="yellow--text">{{email}}</span>
        {{verificationCode}}

      </bdi>
    </h3>
    </v-flex>
    <v-flex xs12 sm4 offset-sm4>
      <v-card color="#002d37" class="mt-5">
  <v-form @submit.prevent="verifyCode">
    <div class="pa-4">
      <v-text-field
        :label="$t('code')"
        solo
        autofocus
        v-model="code"
      ></v-text-field>
      <div class="text-xs-center">

      <v-btn round type="button" color="primary" @click="verifyCode">
          {{$t('verify')}}
      </v-btn>
      <v-btn round color="error" @click="cancel">
        {{$t('cancel')}}

      </v-btn>
    </div>
  </div>

  </v-form>

  </v-card>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
export default {
  data(){
    return {
      email: this.$store.state.authentication.email,
        code:'',
    }
  },
  mounted(){
    console.log('Verify email loaded');
  },
  computed:{
    verificationCode(){
      return this.$store.getters.verificationCode;
    },

  },
  methods:{

      verifyCode(){
        if (this.verificationCode == this.code) {
            this.$store.dispatch('signup')
            .then((response)=>{
              this.$store.commit('cancelEmailVerification');
              this.$store.commit('readyToCreateProfile');
              this.$router.push('/create-profile');
              })
            .catch((error)=>{
              console.log(error);
              console.log(error.response);
              alert('error in verification.');
            })
        }
        else{
          swal({
            title:this.$t('error'),
            text:this.$t('codeerror'),
            icon:'error'
          });

        }
    },

    cancel(){
      this.$store.commit('cancelEmailVerification');
      this.$router.push('/')
    }


  }
}
</script>

<style lang="css">
</style>
