<template>

        <!-- suggested -->
        <div class="suggested">

          <h3 style="text-transform:uppercase" class="text-primary text-center">
            <b>{{$t('likeyou')}}</b>
          </h3>

            <div v-for="perosn in suggestPeople">

            <div class="col-md-3">
              <img @click="ShowProfile(perosn.display_name)" :src="`/storage/avatars/${perosn.avatar}`" :alt="`${perosn.display_name}`" class="img-circle" :title="`${perosn.user.name}`" width="55" height="55" style="cursor:pointer">
            </div>

            <div class="col-md-7" style="cursor:pointer" @click="ShowProfile(perosn.display_name)">
                <h4>{{perosn.user.name}}</h4>
                <h5>
                 <i style="opacity:.6">
                   <b>
                 {{perosn.display_name}}
                </b>
                 </i>
               </h5>
               <hr>
            </div>

            <div class="col-md-2">
              <template v-if="getFollowing.indexOf(perosn.user.id) == -1">
                <button style="" type="button" class="btn btn-primary btn-xs" @click="follow(perosn.user.id)">
                        {{$t('follow')}}
                  </button>
              </template>
              <template v-else>

                <button style="" type="button" class="btn btn-danger btn-xs" @click="follow(perosn.user.id)">
                        {{$t('unfollow')}}
                </button>

              </template>

            </div>

          </div>
          <hr>
          </div>


</template>

<script>
export default {


    computed:{
        getFollowers(){
          return this.$stroe.getters.followers;
        },
        getFollowing(){
          return this.$store.getters.following;
        },
        suggestPeople(){
          return this.$store.getters.suggestedPeople;

        }
    },

    mounted(){
      this.$store.dispatch('suggestPeople');
      this.dosuggestPeople();
    },
    methods:{
      follow(followed_id){

        this.$store.dispatch('toggleFollow',followed_id);

      },
        dosuggestPeople(){
            setInterval(()=>{
              this.$store.dispatch('suggestPeople');
            },300000)
        },

    ShowProfile(displayName){
      this.$router.push(`/${displayName}`);
    }

    }

}
</script>

<style scoped>
.suggested{
  margin-top: 17px;

}
</style>
