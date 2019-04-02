<template>

    <div class="">
      <div class="mmd hidden-sm-and-up">
        <v-list two-line dark>
          <template v-for="(person,index) in allSuggesstion">
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

      </div>
      <v-list two-line dark class="hidden-xs-only">
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

   </div>

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
        allSuggesstion(){
          return this.$store.getters.allSuggesstion;
        }

    },
    created(){

            if (this.isLoggedIn) {
                if (this.allSuggesstion.length < 100) {
                  this.$store.dispatch('suggestPeople');
                }
            }
    },
    mounted(){

      console.log('suggest loaded');
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
.mmd{
  margin:0 auto;
  width:100% !important;
  height: 100% !important;
  max-height:100% !important;
  background-color:#002d37 !important;
  overflow:scroll;
  position: absolute;
  top:58px;
  bottom:0;
  left:0;
  right:0
  }
</style>
