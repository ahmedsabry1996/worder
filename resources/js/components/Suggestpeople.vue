<template>
    <v-list two-line dark>
        <v-btn @click="refreshSuggested" flat icon color="white" >
          <v-icon>refresh</v-icon>
        </v-btn>
        <span>refresh</span>
       <template v-for="(person,index) in suggestPeople">
         <v-list-tile
           avatar
          >
           <v-list-tile-avatar>
             <img
             @click="ShowProfile(person.display_name)"
              :src="`/storage/avatars/${person.avatar}`"
              :alt="`${person.display_name}`">
           </v-list-tile-avatar>

           <v-list-tile-content  @click="ShowProfile(person.display_name)">
             <v-list-tile-title v-html="person.user.name"></v-list-tile-title>
             <v-list-tile-sub-title v-html="person.display_name"></v-list-tile-sub-title>
           </v-list-tile-content>
           <v-list-tile-action>
             <template v-if="getFollowing.indexOf(person.user.id) == -1">

                 <v-btn round color="success" @click="follow(person.user.id,'follow')" small>
                      {{$t('follow')}}
                 </v-btn>
             </template>
             <template v-else>

               <v-btn round small color="error" @click="follow(person.user.id,'unfollow')">
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
      
    },
    created(){

            if (this.isLoggedIn) {
                if (this.suggestPeople.length < 100) {
                  this.$store.dispatch('suggestPeople');
                }
            }
    },
    mounted(){


      if (this.isLoggedIn) {
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
