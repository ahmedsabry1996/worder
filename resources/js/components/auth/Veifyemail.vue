<template>
<v-container grid-list-md>
  <v-layout row wrap>
    <v-flex xs12 sm4 offset-sm4>
      <h2>{{verificationCode}}</h2>
  <v-form @submit.prevent="verifyCode">
      <v-text-field
        label="label"
        solo-inverted
        autofocus
        v-model="code"
      ></v-text-field>
      <div class="text-xs-center">

      <v-btn round type="button" color="primary" @click="verifyCode">
          verify
      </v-btn>
    </div>
  </v-form>
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


  }
}
</script>

<style lang="css">
</style>
