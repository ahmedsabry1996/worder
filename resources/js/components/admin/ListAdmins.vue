<template>
<v-container grid-list-md>
  <v-layout row wrap>
      <v-flex xs12>
        <h1 class="white--text text-xs-center">All Admins</h1>
      </v-flex>
      <v-flex xs12>
          <v-btn @click="modal=true" color="primary" round>add one <v-icon>add</v-icon></v-btn>
          <v-dialog
            v-model="modal"
             :overlay="false"
            max-width="500px"
            transition="dialog-transition"
          >
          <v-card dark>
            <v-card-title primary-title>
              Add an admin
            </v-card-title>
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
      <td class="text-xs-center">{{ roles[props.item.role[0]['id']-1]['role'] }}</td>
      <td class="text-xs-center">
        <v-btn round small v-if="roleId < props.item.id" @click="deleteAdmin(props.item.id)"color="error">delete</v-btn>
        <v-btn round small @click="editAdmin(props.item.id)"color="primary">edit</v-btn></td>
    </template>
          </v-data-table>
            <v-dialog
              v-model="editadmindialoge"
              :overlay="true"
              max-width="500px"
              transition="dialog-transition"
            >
            <v-card v-if="editadmindialoge">
              <v-card-title primary-title color="indigo">
                Edit  Admin : {{name}}
              </v-card-title>
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
                  <v-btn @click="applyEditAdmin" color="info" small round>save <v-icon>done</v-icon></v-btn>
                </div>
                </v-form>
              </v-card>

            </v-card>
            </v-dialog>
      </v-flex>
      <v-snackbar v-model="adminUpdated">
        <h3>Done !</h3>

        <v-btn flat color="white" @click=" adminUpdated = false">Close</v-btn>
      </v-snackbar>

      <v-snackbar v-model="adminCreated">
        <h3>Done !</h3>
        <v-btn flat color="white" @click=" adminCreated = false">Close</v-btn>
      </v-snackbar>
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
      editadmindialoge:false,
      selectedAdmin:null,
      adminUpdated:false,
      adminCreated:false,
      roles:this.$t('adminRoles'),
        headers:[
          {text:'Name',value:'name',align:'center'},
          {text:'Role',value:'role',align:'center'},
          {text:'Actions',value:'role',align:'center'},

        ]
    };
  },
  computed:{
    admins(){
      return this.$store.getters.admins.reverse();
    },
    roleId(){
      return this.$store.getters.roleId;
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
        this.modal = false;
        this.adminCreated = true;
        this.$store.commit('addAdmin',{admin:response.data.user});
      })
      .catch((error)=>{
        alert('error in createing admin');
        console.log(error);
        console.log(error.response);
      })

    },

    editAdmin(id){
      let index = this.admins.findIndex((val,index)=>{
        return id == val.id ;
      });
      this.selectedAdmin = this.admins[index];
      this.name = this.selectedAdmin.name;
      this.email = this.selectedAdmin.email;
      this.selectedRole = this.selectedAdmin.role[0]['id'];
      this.editadmindialoge = true;
    },
    applyEditAdmin(id){
            this.$store.dispatch('editAdmin',{
              id:this.selectedAdmin.id,
              name:this.name,
              email:this.email,
              password:this.password,
              passwordConfirmation:this.passwordConfirmation
            })
            .then((response)=>{
              this.editadmindialoge = false;
              this.selectedAdmin = null;
              this.adminUpdated = true;

            })
            .catch((error)=>{
              alert('error in updating');
            })


    },
    deleteAdmin(id){
      let index = this.admins.findIndex((val,index)=>{
        return id == val.id ;
      });

        var sure = confirm('Are u sure ?');
        if (sure) {
            this.$store.dispatch('deleteAdmin',{
              id:id,
            })
            .then((response)=>{
                this.adminCreated = true;
                this.$store.commit('deleteAdmin',index);
            })
            .catch((error)=>{
              alert('error in deleteing')
            })
        }
    },
  }

}
</script>

<style scoped>
</style>
