<template>
    <v-container grid-list-md>
      <v-toolbar color="#005f5b" dark>
    <v-toolbar-side-icon @click="drawer = true"></v-toolbar-side-icon>
    <v-toolbar-title>Worder Admin panel</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat router to="/">app</v-btn>
      <v-btn flat>logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
        <v-layout row wrap>
            <v-flex xs12>
              <router-view></router-view>
            </v-flex>
            <v-navigation-drawer v-model="drawer" app temporary dark>
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

       <v-list-tile router :to="{name:'list-admin'}">
         <v-list-tile-action>
           <v-icon>thumb_up</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Admins</v-list-tile-title>

         </v-list-tile-content>
       </v-list-tile>
       <v-list-tile router to="/admin/dashboard/list-admins">
         <v-list-tile-action>
           <v-icon>thumb_up</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Posts</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
       <v-list-tile router to="/">
         <v-list-tile-action>
           <v-icon>thumb_up</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Profiles</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
       <v-list-tile routet to="/">
         <v-list-tile-action>
           <v-icon>thumb_up</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Ads</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
     </v-list>
   </v-navigation-drawer>
    </v-layout>
    </v-container>

</template>

<script>
export default {
  data(){
    return{
        drawer:false,
    }
  },
  methods:{
    toHome(){
      alert();
    }
  }
}
</script>

<style scoped>
</style>
