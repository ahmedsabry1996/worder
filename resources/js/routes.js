import Vue from 'vue';
import Vuex from 'vuex';
import storeData from './store';
import Timeline from './components/Timeline.vue';
//import Notifications from './components/Notifications.vue';
//import Test from './components/Test.vue';
//import Veifyemail from './components/auth/Veifyemail.vue';

const Veifyemail = resolve =>{
  require.ensure(['./components/auth/Veifyemail.vue'],()=>{
    resolve(require('./components/auth/Veifyemail.vue'))
  })
}
const Notifications = resolve =>{
  require.ensure(['./components/Notifications.vue'],()=>{
    resolve(require('./components/Notifications.vue'))
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
const Suggest = resolve =>{
  require.ensure(['./components/Suggestpeople.vue'],()=>{
    resolve(require('./components/Suggestpeople.vue'));
  })
}


const Trend = resolve =>{
  require.ensure(['./components/trend/ShowTrend.vue'],()=>{
    resolve(require('./components/trend/ShowTrend.vue'));
  });
}

const ListTrend = resolve =>{
  require.ensure(['./components/trend/Trend.vue'],()=>{
    resolve(require('./components/trend/Trend.vue'));
  });
}
const HomeAdmin = resolve =>{
  require.ensure(['./components/admin/Home.vue'],()=>{
    resolve(require('./components/admin/Home.vue'));
  });
}
const ListAdmins = resolve =>{
  require.ensure(['./components/admin/ListAdmins.vue'],()=>{
    resolve(require('./components/admin/ListAdmins.vue'));
  });
}


Vue.use(Vuex);
const store = new Vuex.Store(storeData);


export const routes = [
  {
    path:'/verify-email',
    component:Veifyemail,
    name:'verify-email',
    meta:{
  requireVerificationCode:true,

    },
  },
  {
    path:'/create-profile',
    component:Createprofile,
    name:"create-profile",
    meta:{
      readyToCreateProfile:true
    }
  },
  {
    path:'/update-profile',
    component:UpdateProfile,
    name:"update-profile",
    meta:{
  requireAuth:true,

    },
  },
  {
    path:'/update-auth',
    component:UpdateAuth,
    name:"upade-auth-profile",
    meta:{
  requireAuth:true,

    },
  },
  {
    path:"/:dName",
    component:Showprofile,
    name:"show-profile",
    meta:{
      requireAuth:true,
    },
  },
  {
    path:"/post/:postId",
    component:Post,
    name:"post",
    meta:{
  requireAuth:true,

    },
  },
  {
    path:"/topic/:topic",
    component:Topic,
    name:"topic",
    meta:{
  requireAuth:true,

    },
  },
  {
    path:"/trend/show/",
    component:Trend,
    name:"trend",
    meta:{
  requireAuth:true,

    },
  },
  {
    path:"/me/notifications",
    component:Notifications,
    name:"notification",
    meta:{
  requireAuth:true,
    },
  },
  {
    path:'/me/trend',
    component:ListTrend,
    name:'list-trend',
    meta:{
  requireAuth:true,
    },
  },
  {
    path:"/me/suggest",
    component:Suggest,
    name:"suggest",
    meta:{
  requireAuth:true,
    },
  },

  {
    path:"/admin/dashboard/",
    component:HomeAdmin,
    name:"home-admin",
    meta:{
      hasRole:true,
    },
    children:[
      {
        path:'list-admins/',
        component:ListAdmins,
        name:'list-admin',
        meta:{
          isSuperAdmin:true
        }
      }
    ]
  }


]
