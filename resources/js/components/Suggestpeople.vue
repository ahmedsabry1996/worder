<template>
    <v-list two-line dark>
       <template v-for="(perosn,index) in suggestPeople">
         <v-list-tile
           avatar>
           <v-list-tile-avatar>
             <img @click="ShowProfile(perosn.display_name)"
             :src="`/storage/avatars/${perosn.avatar}`" :alt="`${perosn.display_name}`">
           </v-list-tile-avatar>

           <v-list-tile-content>
             <v-list-tile-title v-html="perosn.user.name"></v-list-tile-title>
             <v-list-tile-sub-title v-html="perosn.display_name"></v-list-tile-sub-title>
           </v-list-tile-content>
           <v-list-tile-action>
             <template v-if="getFollowing.indexOf(perosn.user.id) == -1">

                 <v-btn round color="success" @click="follow(perosn.user.id,'follow')" small>
                      {{$t('follow')}}
                 </v-btn>
             </template>
             <template v-else>

               <v-btn round small color="error" @click="follow(perosn.user.id,'unfollow')">
                 {{$t('unfollow')}}

               </v-btn>
             </template>
           </v-list-tile-action>
         </v-list-tile>
         <v-divider  v-if="index+1 < suggestPeople.length"></v-divider>
       </template>
     </v-list>
</template>

<script>
export default {


    computed:{

        getFollowing(){
          return this.$store.getters.myFollowingIds;
        },
        suggestPeople(){
          return this.$store.getters.suggestedPeople;
        },
        isLoggedIn(){
          return this.$store.getters.isLoggedIn;
        },
        perfectUser(){
            if (this.$store.getters.isLoggedIn && this.$store.getters.hasProfile=="1" && this.$store.getters.isVerified =="1") {
              return true;
            }
        }
    },
    created(){

            if (this.perfectUser) {
                if (this.suggestPeople.length === 0) {
                  this.$store.dispatch('suggestPeople');
                }
            }
    },
    mounted(){


      if (this.perfectUser) {
          this.refreshSuggestedAutomatically();
      }
    },
    methods:{
      follow(followed_id,action){

        this.$store.dispatch('toggleFollow',{followed_id:followed_id,action:action});

      },
        refreshSuggestedAutomatically(){
          const self = this ;
            setInterval(()=>{
              self.$store.commit('shuffleSuggested')
            },300000)
        },
        refreshSuggested(){
          this.$store.commit('shuffleSuggested')
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
