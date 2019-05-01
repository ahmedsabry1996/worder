<template>
    <v-container grid-list-md>
      <v-content>
        <h1 v-if="adminHomeRoute" class="text-xs-center white--text">Hi, <span class="text-uppercase yellow--text">{{currentUser.name}}</span></h1>
        <h2 v-if="adminHomeRoute" class="text-xs-center white--text">Have a good day <v-icon color="red">local_florist</v-icon> </h2>
      <v-toolbar color="#005f5b" dark app>
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Worder Admin panel</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat router to="/">app</v-btn>
      <v-btn flat @click="logout">logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
        <v-layout row wrap>
            <v-flex xs12>
              <router-view></router-view>
            </v-flex>
            <v-navigation-drawer v-model="drawer" app dark >
     <v-list class="pa-1">
       <v-list-tile>
          <v-list-tile-action>

         <v-list-tile-content>
           <v-list-tile-title>Admin Panel</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile-action>
       </v-list-tile>
     </v-list>

     <v-list class="pt-0" dense>
       <v-divider></v-divider>

       <v-list-tile v-if="isSudo" router :to="{name:'list-admin'}">
         <v-list-tile-action>
           <v-icon>dashboard</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Admins</v-list-tile-title>

         </v-list-tile-content>
       </v-list-tile>
       <v-list-tile v-if="isPostReviewer" router to="/admin/dashboard/list-admins">
         <v-list-tile-action>
           <v-icon>credit_card</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Posts</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
       <v-list-tile v-if="isProfileReviewer" router to="/">
         <v-list-tile-action>
           <v-icon>description</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Profiles</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
       <v-list-tile v-if="isAdsReviewer" routet to="/">
         <v-list-tile-action>
           <v-icon>label</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Ads</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
     </v-list>
   </v-navigation-drawer>
    </v-layout>
  </v-content>
    </v-container>

</template>

<script>
export default {
  data(){
    return{
        drawer:false,
    }
  },
  computed:{
    isSudo(){
      return this.$store.getters.roleId == 1;
    },

    isPostReviewer(){
      return this.$store.getters.roleId  == 1 || this.$store.getters.roleId  == 2 ;
    },

    isAdsReviewer(){
      return this.$store.getters.roleId  == 1 || this.$store.getters.roleId  == 3 ;
    },

    isProfileReviewer(){
      return this.$store.getters.roleId  == 1 || this.$store.getters.roleId  == 4 ;

    },
    currentUser(){
      return this.$store.getters.currentUser;
    },
    adminHomeRoute(){
      return this.$route.name == "home-admin";
    }

  },
  methods:{
    logout(){

      this.$store.commit('logoutNotifications');
      this.$store.commit('logoutSuggest');
      this.$store.commit('logoutTrend');
      this.$store.commit('logoutPosts');
      this.$store.commit('logoutProfile');
      this.$store.commit('logoutFollowing');
      this.$store.commit('logoutTopics');
      this.$store.commit('logoutAuth');
      this.$store.commit('logoutTimeline');
      this.$store.commit('logoutAdmin');
      this.$router.push('/');
      window.location.href = window.location.origin;
    },
  }
}
</script>

<style scoped>
</style>
