<template>
<div class="conainer">
    <div class="text-center">
      <h2>check ur inbox and isert the code below</h2>
    </div>
    <form @submit.prevent="verify">
      <input type="text" placeholder="CODE" v-model="code" class="form-control">
      <input type="submit"  value="confirm">
    </form>
</div>
</template>

<script>
export default {
  data(){
    return {

        code:'',
        writtenCode:''
    }
  },
  methods:{

      verify(){
        setTimeout(()=>{this.$store.dispatch('confrimEmail',this.code)
            .then(()=>{
                swal({
                  title:"Job Done",
                  text:"Account Verified !",
                  icon:"success"
                });
                this.$router.push('/');
            })},500)

    }

  }
}
</script>

<style lang="css">
</style>
