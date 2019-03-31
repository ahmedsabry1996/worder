<template>
<v-container grid-list-md>
  <v-layout row wrap>
    <v-flex xs12 sm4 offset-sm4>
      <h2>{{verificationCode}}</h2>
      <v-card color="#002d37" class="mt-5">
  <v-form @submit.prevent="verifyCode">
    <div class="pa-4">

      <v-text-field
        label="label"
        solo
        autofocus
        v-model="code"
      ></v-text-field>
      <div class="text-xs-center">

      <v-btn round type="button" color="primary" @click="verifyCode">
          verify
      </v-btn>
      <v-btn color="error" @click="cancel">cancel</v-btn>
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

        code:'',
    }
  },
  computed:{
    verificationCode(){
      return this.$store.getters.verificationCode;
    }
  },
  methods:{

      verifyCode(){
        if (this.verificationCode == this.code) {
            this.$store.dispatch('signup')
            .then((response)=>{
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
            text:this.$t('signupfail'),
            icon:"error"
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
