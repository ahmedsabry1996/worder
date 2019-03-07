import Vue from 'vue';
import Vuex from 'vuex';
import storeData from './store';
import Timeline from './components/Timeline.vue'
//import Test from './components/Test.vue';
import Veifyemail from './components/auth/Veifyemail.vue';

const Login = resolve =>{
  require.ensure(['./components/auth/Login.vue'],()=>{
    resolve(require('./components/auth/Login.vue'))
  })
}

const Signup = resolve =>{
  require.ensure(['./components/auth/Signup.vue'],()=>{
    resolve(require('./components/auth/Signup.vue'))
  })
}
const Topic = resolve =>{
  require.ensure(['./components/topics/topic.vue'],()=>{
    resolve(require('./components/topics/topic.vue'))
  })
}

const Post = resolve =>{
  require.ensure(['./components/posts/showPost.vue'],()=>{
    resolve(require('./components/posts/showPost.vue'))
  })
}

const Createprofile = resolve =>{
  require.ensure(['./components/auth/Createprofile.vue'],()=>{
    resolve(require('./components/auth/Createprofile.vue'))
  })
}
const Showprofile = resolve =>{
  require.ensure(['./components/profile/ShowProfile.vue'],()=>{
    resolve(require('./components/profile/ShowProfile.vue'))
  })
}
const UpdateProfile = resolve =>{
  require.ensure(['./components/profile/UpdateProfile.vue'],()=>{
    resolve(require('./components/profile/UpdateProfile.vue'))
  })
}
const UpdateAuth = resolve =>{
  require.ensure(['./components/auth/UpdateAuth.vue'],()=>{
    resolve(require('./components/auth/UpdateAuth.vue'));
  })
}


const Trend = resolve =>{
  require.ensure(['./components/trend/ShowTrend.vue'],()=>{
    resolve(require('./components/trend/ShowTrend.vue'));
  })
}


Vue.use(Vuex);
const store = new Vuex.Store(storeData);


export const routes = [

  {
      path:'/',
      component:Timeline,
      name:'root'
  },
  {
    path:'/signup',
    component:Signup,
    name:"signup",
    beforeEnter:((to,from,next)=>{
      if(!store.getters.isLoggedIn || (store.getters.verificationCode && store.getters.isLoggedIn == true)){
              next();
            }
            else{
              next('/');
            }

    })
  },
  {
    path:'/login',
    component:Login,
    name:"login",
    beforeEnter:((to,from,next)=>{
        if(!store.getters.isLoggedIn){
          next()
        }
        else{
          next('/')
        }
    })
  },
  {
    path:'/create-profile',
    component:Createprofile,
    name:"create-profile",
    beforeEnter:((to,from,next)=>{
      if (from.path == '/signup' || (store.state.authentication.hasProfile == 0 && store.state.authentication.isVerified == 1) ) {
            next();
      }

      else{
        console.log(from);
        next('/');
      }
    })
  },
  {
    path:'/update-profile',
    component:UpdateProfile,
    name:"update-profile"
  },
  {
    path:'/update-auth',
    component:UpdateAuth,
    name:"upade-auth-profile"
  },
  {
    path:"/:dName",
    component:Showprofile,
    name:"show-profile"
  },
  {
    path:"/post/:postId",
    component:Post,
    name:"post"
  },
  {
    path:"/topic/:topic",
    component:Topic,
    name:"topic",
  },
  {


    path:"/trend/show/",
    component:Trend,
    name:"trend"
  }


]
