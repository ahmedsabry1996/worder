<template>
  <div class="container" v-if="showProfile.profile">
    <h4>{{myFollowingIds}}</h4>
      <div class="row">
      <div class="col-md-6 pc">
        <div class="card">
            <img  :src="`/storage/avatars/${showProfile.profile.avatar}`" :alt="showProfile.profile.display_name"
            style="width:100%">

      <p  v-if="showProfile.profile.is_verified == 1"
            class="text-success" style="font-size:20pt;">
            <b>
              <font-awesome-icon v-popover:tooltip.top="'verified user'" :icon= "['fas','award']"/>
            </b>
      </p>


        <h2>{{showProfile.name}}</h2>

  <p class="title">{{showProfile.profile.display_name}}</p>
  <p>
    <bdi>
      {{$t('from')}} : <b>{{countries [showProfile.profile.country_id-1]}}</b>
    </bdi>
  </p>
  <p style="color:#000;">
    <bdi>
    {{$t('about')}}: {{showProfile.profile.description}}
</bdi>
  </p>
  <div class="num-of-followers">
    <p>
    <bdi>
        <b>{{profileFollowers[0]}}</b>
        {{$t('followers')}}
      </bdi>
    </p>
  <p>
      <bdi>
        <b>{{profileFollowers[1]}}</b>
        {{$t('following')}}
      </bdi>
  </p>

  </div>


  <div class="text-center" v-if="currentUserProfile.user_id !== showProfile.profile.user_id ">
    <template v-if="isFollow">
      <button type="button" class="btn btn-danger" @click="follow(showProfile.id,'unfollow')">
          {{$t('unfollow')}}
      </button>
    </template>
    <template v-else>
      <button type="button" class="btn btn-success" @click="follow(showProfile.id,'follow')">
        {{$t('follow')}}
</button>
    </template>
  </div>
  <div class="text-center" v-if="currentUserProfile.user_id == showProfile.profile.user_id ">
      <button class="btn btn-success" data-toggle="modal" @click="fans" >
          <b style="color:#fff;text-transform:uppercase" >{{$t('fans')}}</b>
      </button>
      <button class="btn btn-warning" @click="updateProfile">
          <b style="color:#000;text-transform:uppercase">{{$t('editprofile')}}</b>
      </button>
      </button>
      <button class="btn btn-danger" @click="updateAuthData">
          <b style="color:#000;text-transform:uppercase"> {{$t('editauth')}}</b>
      </button>
  </div>
  <div class="text-center">
    <button type="button" style="cursor:default;margin:10px" class="topic" v-for="topic in showProfile.topics">
          {{topic.topic}}
    </button>
 </div>

</div>
<div>

<ad></ad>

</div>
</div>

<div class="col-md-6 text-center">

<template v-if="currentUserProfile.user_id !== showProfile.profile.user_id ">
      <div class="post" v-for="(post,index) in posts">
          <div class="avatar">
                  <img  :src="`/storage/avatars/${showProfile.profile.avatar}`" width='60' height="60" :alt="post.user_id" class="img-circle">
          </div>
          <div class="post-publisher">
              <h5>by <b>{{showProfile.profile.display_name}}</b></h5>
          </div>
          <div class="post-content">
              <p style="font-size:33px;overflow-wrap:break-word;">
                <b>
                  <bdi>
                    "
                    {{post.post}}
                    "
                  </bdi>
                </b>
              </p>
          </div>
          <div class="delete-post">

          </div>
          <div class="post-react">

          <p class="text-center" v-if="likedPosts.indexOf(post.id) == -1 && disLikedPosts.indexOf(post.id) == -1" >

            <span style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
              <font-awesome-icon
              :icon= "['far','thumbs-down']"  style="transform:scalex(-1)" @click="postReact('dislike',post.id)"/>
            </span>

            <span style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
              <font-awesome-icon :icon="['far','thumbs-up']" @click="postReact('like',post.id)"/></span>

          </p>
          <p class="text-center" v-if="likedPosts.indexOf(post.id) !== -1 && disLikedPosts.indexOf(post.id) == -1">

            <span style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
              <font-awesome-icon
              :icon= "['far','thumbs-down']"  style="transform:scalex(-1)" @click="postReact('dislike',post.id)"/>
            </span>

            <span style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
              <font-awesome-icon  :icon="['fas','thumbs-up']" @click="postReact('like',post.id)"/></span>

          </p>
          <p class="text-center" v-if="likedPosts.indexOf(post.id) == -1 && disLikedPosts.indexOf(post.id) !== -1">

            <span style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
              <font-awesome-icon
              :icon= "['fas','thumbs-down']"  style="transform:scalex(-1)"@click="postReact('dislike',post.id)"/>
            </span>

            <span style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
              <font-awesome-icon :icon="['far','thumbs-up']" @click="postReact('like',post.id)"/></span>

          </p>


                    </div>
                    <div class="post-react-number">
                      <p class="text-center">

                        <span v-if="post.dislikes_counter" style="position:relative;font-size:10pt ;color:#EA003A;margin: auto 14px;cursor:pointer;">
                          {{ post.dislikes_counter.count  }}
                        </span>

                        <span v-else style="position:relative;font-size:10pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
                            0
                          </span>


                        <span v-if="post.likes_counter" style="font-size:10pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">

                          {{post.likes_counter.count }}

                    </span>

                        <span v-else style="font-size:10pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">

                              0
                        </span>

                      </p>

                    </div>
          <div class="post-date">
              <p style="opacity:.7;color:blue">

                <b>
                {{ post.created_at | getDateForHumans }}

                </b>

              </p>
          </div>
          <div class="post-topic">
              <p class="text-primary" style="opacity:.8">
                  <b>  {{post.topic.topic}}</b>
              </p>
          </div>
          <hr>
      </div>

</template>

<!-- MY PROFILE -->
<template v-if="currentUserProfile.user_id == showProfile.profile.user_id">

  <div class="text-center post" v-for="(post,index) in getMyPosts" >
    <div class="row">

    <div class="avatar">
      <img :src="`/storage/avatars/${userProfile.avatar}`" class="img-circle" width="50" height="50">
    </div>
    <div class="post-content">
  <p style="white-space:pre-line;font-weight: bold;" class="text-center">
  <bdi>  " {{post.post}} "
  </bdi>
  </p>
    </div>
    <div class="post-time" style="opacity:.6">
      {{post.created_at | getDateForHumans}}
    </div>
    <div class="post-topic">
      <i style="opacity:.6">{{topics [post.topic_id - 1]}}</i>
    </div>
    <div class="post-react" v-if="post.user.profile.user_id == currentUserProfile.user_id">

    <p class="text-center">

      <span style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px" @click="showDisLikers(post.id)">
        <font-awesome-icon
        :icon= "['far','thumbs-down']"  style="transform:scalex(-1)" />

      </span>
      <span style="cursor:pointer;font-size:15pt;color:#AB1600;width:10px;margin:0 auto" @click="deletePost(post.id,index)">
         <font-awesome-icon :icon="['fas', 'trash-alt']" />
      </span>

      <span  @click="showLikers(post.id)" style="font-size:20pt ;color:#192FDD;margin: auto 14px;cursor:pointer;">
        <font-awesome-icon :icon="['far','thumbs-up']" /></span>

    </p>
  </div>

  </div>

  <hr>
  </div>
</template>
    </div>
  </div>

  <!-- likers  -->
  <sweet-modal :enable-mobile-fullscreen="false" ref="likers" width="320" overlay-theme="dark">

      <div style="overflow-y:scroll;height:120px" @scroll="loadMoreLikers">

      <div class="likers" v-for="liker in likers">
          <p @click="openProfile(liker.profile.display_name)" tag="p" style="cursor:pointer">
          <img :src="`/storage/avatars/${liker.profile.avatar}`" :alt="liker.name" width="40" height="40" class="img-rounded">
          <b>{{liker.name}}</b>
          <br>
          <i style="opacity:.5;position:relative">{{liker.profile.display_name}}</i>
        </p>

      </div>

      </div>
  </sweet-modal>

<!-- dislikers -->
  <sweet-modal :enable-mobile-fullscreen="false" :title="$t('dislikers')" ref="dislikers" width="320" overlay-theme="dark">

      <div style="overflow-y:scroll;height:120px" @scroll="loadMoreDisLikers">

      <div class="likers" v-for="disliker in dislikers">
          <p @click="openProfile(disliker.profile.display_name)"  style="cursor:pointer">
          <img :src="`/storage/avatars/${disliker.profile.avatar}`" :alt="disliker.name" width="40" height="40" class="img-rounded">
          <b>{{disliker.name}}</b>
          <br>
          <i style="opacity:.5;position:relative">{{disliker.profile.display_name}}</i>
        </p>

      </div>

      </div>
  </sweet-modal>


  <!-- followers -->
  <sweet-modal ref="fans"  width="320" overlay-theme="dark" :enable-mobile-fullscreen="false">
  	<sweet-modal-tab :title="$t('followers')" id="tab1">
    <template v-if="myFollowers">
      <div class="followers" ref="followers_modal" @scroll="loadMoreFollowers">
        <ul>
          <li v-for="follower in myFollowers">
            <p>
              <img @click="openProfile(follower.profile.display_name)" :src="`/storage/avatars/${follower.profile.avatar}`" :alt="follower.profile.display_name" class="img-rounded" width="50" height="50">
              {{follower.name}}
              <br>
              <i @click="openProfile(follower.profile.display_name)" style="opacity:.5;">{{follower.profile.display_name}}</i>

              <template v-if="myFollowingIds.indexOf(follower.profile.user_id) == -1">
                <button type="button" class="btn btn-primary btn-xs" @click="follow(follower.id,'follow')">
                  follow
                </button>


                </template>
              <template v-else>
                <button type="button" class="btn btn-danger btn-xs" @click="follow(follower.id,'unfollow')">
                  unfollow
                </button>
              </template>
              </p>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <h4>please wait ... </h4>
    </template>
    </sweet-modal-tab>
  	<sweet-modal-tab :title="$t('following')" id="tab2">
      <template v-if="myFollowing">
        <div class="following" ref="following_modal" @scroll="loadMoreFollowing">
          <ul>
            <li v-for="following in myFollowing">
              <p>
                <img @click="openProfile(following.profile.display_name)" :src="`/storage/avatars/${following.profile.avatar}`" :alt="following.profile.display_name" class="img-rounded" width="50" height="50">
                {{following.name}}
                <br>
                <i @click="openProfile(following.profile.display_name)" style="opacity:.5;">{{following.profile.display_name}}</i>
                <template v-if="myFollowingIds.indexOf(following.profile.user_id) == -1">
                  <button type="button" class="btn btn-primary btn-xs" @click="follow(following.id,'follow')">
                    follow
                  </button>


                  </template>
                <template v-else>
                  <button type="button" class="btn btn-danger btn-xs" @click="follow(following.id,'unfollow')">
                    unfollow
                  </button>
                </template>
              </p>
            </li>
          </ul>
        </div>
      </template>
      <template v-else>
        <h4>please wait ... </h4>
      </template>
    </sweet-modal-tab>
  </sweet-modal>

</div>


</template>

<script>
import axios from 'axios';
import Ad from './Ad.vue';
import Popover  from 'vue-js-popover';

import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
var moment = require('moment');

export default {

  props: {
    name: 'tooltip',
    width:  180,
    pointer: true,
    event:"hover"
  },
  components:{
    Ad,
    SweetModal,
    SweetModalTab

  },

  data(){
      return {
        offset:10,
        followerOffset:0,
        followingOffset:0,
        displayName:this.$route.params.name,
        newDisp :this.$route.params.name,
        currentUserDisplayName : this.$store.state.authentication.currentUserProfile.display_name,
        showModal:true,
        likers:[],
        dislikers:[]
      };
  },
  watch:{
    '$route'(to,from){
      this.offset = 10;
      //this.newDisp = to.params.name;

      this.$router.push(`/${to.params.name}`);
      this.$store.dispatch('showProfile',to.params.name);

    }
  },
  mounted(){


      this.$store.commit('truncateProfile');
      this.loadreactedPosts();
      this.loadMore();
      this.$store.dispatch('showProfile',this.displayName);
      console.log(`${this.$route.params.name} show profile`);


  },
  created(){
    this.$store.dispatch('showProfile',this.displayName);
    if (this.$route.params.name == this.$store.state.authentication.currentUserProfile.display_name) {
      this.$store.dispatch('showFans');

    }
  },
  computed:{

      showProfile(){

        return this.$store.getters.showProfile;

      },

      isFollow(){
        return this.$store.getters.isFollow;
      },
      countries(){
        return this.$store.getters.countries;
      },
      timeline(){
        return this.$store.getters.timeline;
      },
      likedPosts(){
        return this.$store.getters.likedPosts;
      },

      disLikedPosts(){
        return this.$store.getters.disLikedPosts;
      },
    posts(){
        return this.$store.getters.profilePosts;
    },
    profileFollowers(){
        return  this.$store.getters.profileFollowers;
    },
    currentUserProfile(){
      return this.$store.getters.currentUserProfile;
    },
    topics(){
         return this.$store.getters.topics;
    },
    getMyPosts(){
      return this.$store.getters.myPosts;
    },
    userProfile(){
      return  this.$store.getters.currentUserProfile;
    },
    myFollowers(){
      return  this.$store.getters.myFollowers;
    },
    myFollowing(){
      return  this.$store.getters.myFollowing;
    },
    getFollowers(){
      return this.$store.getters.followers;
    }
    ,getFollowing(){
      return this.$store.getters.following;
    },
    myFollowingIds(){
      return this.$store.state.myFollowingIds;
    }
  },

  methods:{

    getMyFans(){

        let followers = this.$store.state.myFollowers.length;
        let following = this.$store.state.myFollowing.length;
        if (followers === 0 && following === 0) {

          this.$store.dispatch('showFans');
        }
    },
    loadMoreFollowers(e){
      let elHeight = e.target.clientHeight;

      let elscrollHeight = e.target.scrollHeight;

      let elScrollTop = e.target.scrollTop;

      if ((elHeight+elScrollTop) - elscrollHeight == 0) {
        this.followerOffset +=50;

        axios.post('/api/timeline/my-followers',{
          offset:this.followerOffset
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{
          this.$store.commit('fillMyFollowers',response.data.followers);
        })
        .catch((error)=>{
          console.log(error);
          console.log(error.response);
        })
      }
    },
    loadMoreFollowing(e)
    {
      let elHeight = e.target.clientHeight;

      let elscrollHeight = e.target.scrollHeight;

      let elScrollTop = e.target.scrollTop;

      if ((elHeight+elScrollTop) - elscrollHeight == 0) {
        this.followingOffset +=50;

        axios.post('/api/timeline/my-following',{
          offset:this.followingOffset
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response)=>{
          this.$store.commit('fillMyFollowing',response.data.following);
        })
        .catch((error)=>{
          console.log(error);
          console.log(error.response);
        })
      }
    } ,
    fans(){
      this.$refs.fans.open();

      this.getMyFans();
    },
    openProfile(displayName){
        this.$refs.fans.close();
        this.$refs.likers.close();
        this.$refs.dislikers.close();
        this.$router.push(`/${displayName}`);
    },

    gooo(){
    this.$refs.likers.close();
    },
    loadMore(){
                window.onscroll = () =>{
              let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight );

              if (bottomOfWindow) {
                this.$store.dispatch('loadMore',{"url":'user-posts',"offset":this.offset,'userId':this.$store.state.showProfile.id});
                this.offset +=10;
                }
                }

              },

    follow(followed_id,action){

      this.$store.dispatch('toggleFollow',{followed_id:followed_id,action:action});

    },
    ShowProfile(displayName){
      this.$router.push(`/${displayName}`);
    },
    postReact(react,postId){
      if (react == 'like') {
        this.$store.commit('addToLikedPosts',postId);
      }
      else if (react == 'dislike') {
        this.$store.commit('addToDisLikedPosts',postId);
      }

      axios.post('/api/timeline/react',{
        post_id:postId,
        action:react
      },
      {
        headers:{
          "Authorization":`Bearer ${this.$store.state.authentication.userToken}`,

        }
      })
      .then((response)=>{

          console.log("ee",response.data.updated_post);
        if (response.data.result == 'like') {

            console.log(response.data.result);
            this.$store.commit('updatePost',{id:postId,updatedPost:response.data.updated_post});


        }

        if (response.data.result == 'dislike') {

                console.log(response.data.result);
                this.$store.commit('updatePost',{id:postId,updatedPost:response.data.updated_post});

        }

        if (response.data.result == null) {

            console.log(response.data.result);
            this.$store.commit('updatePost',{id:postId,updatedPost:response.data.updated_post});
            this.$store.commit('noAction',postId);

        }
      })
      .catch((error)=>{
        console.log(error);
        console.log(error.response);
      })
    },
    deletePost(postId,postIndex){



                  swal(this.$t('confirmdelete'),{
                    buttons:{
                      cancel:this.$t('cancel'),
                      confirmDelete:{
                        text:this.$t('delete'),
                        value:"Delete"
                      },
                    },

                  }).then((value)=>{

                      switch (value) {
                        case "Delete":

                          this.$store.dispatch('deletePost',{id:postId,index:postIndex});
                          this.$store.commit('deletePost',postIndex);
                          swal(this.$t('done'),this.$t('deletedsuccessfully'),"success");
                        break;

                        default:
                          return ;

                      }
                  })
        },
        myFollow(followed_id,action){
          this.$store.dispatch('toggleFollow',{followed_id:followed_id,action:action});
        },
        loadMoreFans(e){

    let elHeight = e.target.clientHeight;

    let elscrollHeight = e.target.scrollHeight;

    let elScrollTop = e.target.scrollTop;

    if ((elHeight+elScrollTop) - elscrollHeight == 0) {
      this.followerOffset +=10;
      this.$store.dispatch('showFans',this.followerOffset);

    }
  },
  loadreactedPosts(){
    axios.post('/api/user-reacted',null,{
      headers:{
        'Authorization':`Bearer ${this.$store.state.authentication.userToken}`
      }
    })
    .then((response)=>{
      console.log(response.data.posts_liked_by_current_user);
      this.$store.commit('fillLikedPosts',response.data.posts_liked_by_current_user);
      this.$store.commit('fillDisLikedPosts',response.data.posts_disliked_by_current_user);
    })
    .catch((errors)=>{
      console.log(errors);
        console.log(errors.response);
    })
  },
  updateProfile(){
    this.$router.push('update-profile');
  },
  updateAuthData(){

    this.$router.push('update-auth');

  },
  showLikers(id){

    axios.post('/api/post/likers',{
      offset:this.likersOffset,
      post_id:id
    },{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
      }
    })
    .then((response)=>{

      console.log(response.data.likers);
      this.likers = response.data.likers;
      this.$refs.likers.open();
    })
    .catch((errors)=>{
       console.log(errors);
       console.log(errors.response);
    })
  },
  loadMoreLikers(e){



        let elHeight = e.target.clientHeight;

        let elscrollHeight = e.target.scrollHeight;

        let elScrollTop = e.target.scrollTop;

        if ((elHeight+elScrollTop) - elscrollHeight == 0) {
          this.likersOffset +=100;
          axios.post('/api/post/likers',{
            offset:this.likersOffset,
            post_id:this.$route.params.postId
          },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
            }
          })
          .then((response)=>{

             response.data.likers.map((val)=>{
               this.likers.push(val);
             });
          })
          .catch((errors)=>{
             console.log(errors);
             console.log(errors.response);
          })

        }
  },

  showDisLikers(id){

    axios.post('/api/post/dislikers',{
      offset:this.dislikersOffset,
      post_id:id
    },{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
      }
    })
    .then((response)=>{

        this.dislikers = response.data.dislikers;
        this.$refs.dislikers.open();


    })
    .catch((errors)=>{
        alert();
       console.log(errors);
       console.log(errors.response);
    })
  },

  loadMoreDisLikers(e){



        let elHeight = e.target.clientHeight;

        let elscrollHeight = e.target.scrollHeight;

        let elScrollTop = e.target.scrollTop;

        if ((elHeight+elScrollTop) - elscrollHeight == 0) {
          this.dislikerOffset +=100;
          axios.post('/api/post/dislikers',{
            offset:this.dislikerOffset,
            post_id:this.$route.params.postId
          },{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
            }
          })
          .then((response)=>{

             response.data.dislikers.map((val)=>{
               this.dislikers.push(val);
             });
          })
          .catch((errors)=>{
             console.log(errors);
             console.log(errors.response);
          })

        }
  },
  },
  filters:{
        getDateForHumans(value){
          return moment(value).locale("ar").subtract(-2, 'hours').fromNow();
        }
  },


}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}



a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
.topic{
  border: 2px solid #ddd;
  padding: 7px;
  border-radius: 7px;
}
.pc{
  border-right: 2px solid #ddd
}
.modal-body{
  height: 250px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.modal-backdrop {
  position: relative !important;
  z-index: 0 !important;
}

.d{
  font-weight: bold;
  font-size: 12pt;
  background-color: #112F3B !important;
  color:#FAE3D6;
  width:100px !important;
}

.followers,.following{
  height: 100px !important;
  overflow-y: scroll !important;
}

</style>
