export default{


  checkCredetionals(context,data,rootState){
    return new Promise(function(resolve, reject) {
      axios.post('/api/auth/check-credentials',{
        name:data.name,
        email:data.email,
        password:data.password,
        password_confirmation:data.passwordConfirm,
        original_password:data.password,
      })
      .then((response)=>{
        console.log(response.data);
        context.commit('userCredionals',{
          name:data.name,
          email:data.email,
          password:data.password,
        });
        context.commit('verificationCode',{verificationCode:response.data.code})
        resolve(response);
      })
      .catch((error)=>{
        console.log(error.response);
        context.commit('signupFails',error.response.data.errors);

        reject(error);
      })
    });
  },

    signup(context,credionals,rootState){
    return new Promise ((resolve,reject)=>{

        axios.post("/api/auth/signup",{
          name:context.state.name,
          email:context.state.email,
          password:context.state.password,
        })
        .then((response)=>{
          console.log(response.data);
          context.commit('signupSuccess',{
              currentUser:response.data.user,
              userId:response.data.user.id,
          });


          resolve(response);

        })
        .catch((errors)=>{
      
            context.commit('signupFails',errors.response.data.errors);
            reject(errors);
        })
    })
  },

  //for signup
    confrimEmail(context){
        let userId = (context.state.currentUser).id;
            axios.post("/api/auth/verify/"+userId)
            .then((response)=>{
              console.log(response);

              // localStorageSettter("user_id",userId);
              // localStorageSettter("is_verified",1);
              context.commit('verified',{userId,});

            })
            .catch((errors)=>{
              console.log(errors);
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
