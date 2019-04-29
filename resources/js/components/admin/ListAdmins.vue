<template>
<v-container grid-list-md>
  <v-layout row wrap>
      <v-flex xs12>
        <h1 class="white--text text-xs-center">List Admins</h1>
      </v-flex>
      <v-flex xs12>
          <v-btn @click="modal=true" color="primary" round>add one <v-icon>add</v-icon></v-btn>
          <v-dialog
            v-model="modal"
              scrollable
             :overlay="false"
            max-width="500px"
            transition="dialog-transition"
          >
          <v-card dark>
            <v-form class="ma-3 pa-3">
              <v-text-field
                label="name"
                  v-model="name"
                outline
              ></v-text-field>
              <v-text-field
                label="email"
                v-model="email"
                outline
              ></v-text-field>
              <v-text-field
                label="password"
                v-model="password"
                outline
              ></v-text-field>
              <v-text-field
                label="confirm"
                v-model="passwordConfirmation"
                outline
              ></v-text-field>
              <v-select
                :items="roles"
                v-model="selectedRole"
                label="role"
                  item-text="role"
                  item-value="id"
                  outline
              ></v-select>
              <div class="text-xs-center">
              <v-btn @click="createAdmin" color="success" small round>create <v-icon>done</v-icon></v-btn>
            </div>
            </v-form>
          </v-card>
          </v-dialog>
      </v-flex>
      <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="admins"
            :search="search"
            hide-actions
            class="elevation-1"
            item-key="id"
            loading="true"
            dark
          >
          <template v-slot:items="props">
      <td class="text-xs-center">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.role[0]['role'] }}</td>
      <td class="text-xs-center"><v-btn round small color="error">delete</v-btn><v-btn round small color="primary">edit</v-btn></td>
    </template>
          </v-data-table>
      </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {

  data(){
    return {
      search:'',
      modal:false,
      name:'',
      email:'',
      password:'',
      passwordConfirmation:'',
      selectedRole:'',

      roles:[
        {role:'sudo',id:1},
        {role:'post reviewer',id:2},
        {role:'profile reviewer',id:3},
        {role:'ads reviewer',id:4},
      ],
        headers:[
          {text:'Name',value:'name',align:'center'},
          {text:'Role',value:'role',align:'center'},
          {text:'Actions',value:'name',align:'center'},

        ]
    };
  },
  computed:{
    admins(){
      return this.$store.getters.admins.reverse();
    }
  },
  created(){
    this.$store.dispatch('fetchAdmins');
  },
  methods:{
    createAdmin(){
      this.$store.dispatch('createAdmin',{
        name:this.name,
        email:this.email,
        password:this.password,
        passwordConfirmation:this.passwordConfirmation,
        role:this.selectedRole
      })
      .then((response)=>{
        this.modal = false
      })
      .catch((error)=>{
        alert('error in createing admin');
        console.log(error);
        console.log(error.response);
      })

    }
  }

}
</script>

<style scoped>
</style>
