import {localStorageSettter} from './../../../localstorage';
export default{

    signup(context,credionals){

    return new Promise ((resolve,reject)=>{

        axios.post("/api/auth/signup",credionals)
        .then((response)=>{

          console.log(response.data);

          localStorageSettter('current_user',JSON.stringify(response.data.user))
          localStorageSettter('access_token',response.data.access_token.accessToken);
          localStorageSettter('verification_code',response.data.verification_code);
          localStorageSettter('user_id',response.data.user.id);
          context.commit('signupSuccess');
          resolve();

        })
        .catch((errors)=>{

            console.log(errors.response);
            console.log(errors.response.data.errors);
            context.commit('signupFails',errors.response.data.errors);
            reject();
        })
    })
  },

  //for signup
    confrimEmail(context){
        let userId = (context.state.currentUser).id;
            axios.post("/api/auth/verify/"+userId)
            .then((response)=>{
              console.log(response);
              localStorageSettter("user_id",userId);
              localStorageSettter("is_verified",1);
              context.commit('verified');

            })
            .catch((errors)=>{
              console.log(errors.response);
            });

  },

  //the 3rd condition in login
    sendVerificationCode(context,email,token){

            return new Promise(function(resolve, reject) {
              axios.post("/api/auth/sendcode",{
                email,
              },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              .then((response)=>{
                console.log(response.data);
                localStorageSettter('verification_code',response.data.verification_code);
                context.commit('signupSuccess');
                resolve()
              })

              .catch((errors)=>{
                console.log(errors.response);
              })
            });
        },

    accountCreated(context){

          localStorage.removeItem('verification_code');
          localStorage.setItem('has_profile',"1");
          context.commit('accountCreated');
  },
}
