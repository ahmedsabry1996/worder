<template>

  <v-container grid-list-xs>
  <v-content v-if="showProfile">
  <v-layout row wrap>
      <v-flex xs12 offset-xs0 md4 offset-md4>
        <v-card dark max-width="320" style="margin:0 auto;">

          <!-- profile image -->
          <v-img
          v-if="showProfile.profile.avatar"
          :src="`/storage/avatars/${showProfile.profile.avatar}`" :alt="showProfile.profile.display_name"
          height="200" >
        </v-img>

          <!-- user name -->
          <v-card-title primary-title>
            <h1>{{showProfile.name}}</h1>
          </v-card-title>

          <!-- display name -->
          <div class="text-xs-center">
            <h2>{{showProfile.profile.display_name}}</h2>
          </div>

          <!-- country -->
          <div class="text-xs-center">
              <h3>
                <bdi>
                {{$t('from')}} : <b>{{countries [showProfile.profile.country_id-1]}}</b>
              </bdi>
              </h3>
          </div>

          <!-- description -->
          <div class="text-xs-center">
              <h4>
                <bdi>
                {{$t('about')}}: {{showProfile.profile.description}}
            </bdi>
              </h4>
          </div>

          <!-- Num of fans -->
          <div class="text-xs-center mt-2" v-if="currentUserProfile.user_id != showProfile.profile.user_id ">
            <p>
            <bdi>
                <b>{{followersNum}}</b>
                {{$t('followers')}}
              </bdi>
            </p>
          <p>
              <bdi>
                <b>{{followingNum}}</b>
                {{$t('following')}}
              </bdi>
          </p>
          </div>

          <!-- My fans -->
        <div v-else class="text-xs-center">
          <p>
          <bdi>
              <b>{{myFollowersNum}}</b>
              {{$t('followers')}}
            </bdi>
          </p>
          <p>
            <bdi>
              <b>{{myFollowingNum}}</b>
              {{$t('following')}}
            </bdi>
          </p>
        </div>

        <!-- is following -->
        <div class="text-xs-center"
         v-if="currentUserProfile.user_id !== showProfile.profile.user_id ">
          <template v-if="isFollow">
            <v-btn round small class="error white--text" @click="follow(showProfile.id,'unfollow')">
                {{$t('unfollow')}}
            </v-btn>
          </template>
          <template v-else>
            <v-btn round small class="success white--text" @click="follow(showProfile.id,'follow')">
              {{$t('follow')}}
            </v-btn>
          </template>
        </div>


        <!-- my profile buttons -->
          <div class="text-xs-center" v-if="currentUserProfile.user_id == showProfile.profile.user_id ">
              <v-btn round small class="success white--text" data-toggle="modal" @click="fans" >
                  <b>{{$t('fans')}}</b>
              </v-btn>
              <v-btn round small class="warning black--text" @click="updateProfile">
                  <b >{{$t('editprofile')}}</b>
              </v-btn>
              </button>
              <v-btn round small class="error white--text" @click="updateAuthData">
                  <b> {{$t('editauth')}}</b>
              </v-btn>
          </div>


            <!-- user faviorite topics -->
          <div class="text-xs-center">
            <template v-for="topic in showProfile.topics">
            <v-btn round small class="primary white--text">
              <b>                  {{topics[topic.id]['topic']}}
</b>
            </v-btn>

          </template>
         </div>
        </v-card>
      </v-flex>

  <div class="container" v-if="showProfile.profile">
      <div class="text-xs-center">
        <div style="margin: 0 auto !important;left: -30px;position: relative;">
          <!-- show user posts -->
          <template v-if="currentUserProfile.user_id !== showProfile.profile.user_id ">
      <div class="post text-xs-center" v-for="(post,index) in posts">
          <div class="avatar">
            <v-avatar
              size="55"
              class="#005f5b">
              <img
              @click="ShowProfile(post.user.profile.display_name)"
              :src="`/storage/avatars/${showProfile.profile.avatar}`"
              :alt="showProfile.profile.display_name">
            </v-avatar>

          </div>
          <div class="post-publisher mt-2">
              <h5 class="white--text">by <b>{{showProfile.profile.display_name}}</b></h5>
          </div>
          <div class="post-content">
              <p style="overflow-wrap:break-word;">
                <b class="white--text">
                  <bdi>
                    {{post.post}}

                  </bdi>
                </b>
              </p>
          </div>

          <div  v-if="post.image">
            <v-img
            style="margin:0 auto"
            width="320"
            :src="`/storage/posts_images/${post.image}`"
            class="grey lighten-2">
        </v-img>

          </div>


          <div class="delete-post">

          </div>

          <div class="post-react">

          <p class="text-center" v-if="likedPosts.indexOf(post.id) == -1 && disLikedPosts.indexOf(post.id) == -1" >

            <span style="position:relative;font-size:20pt ;color:#FF004F;margin: auto 14px;cursor:pointer;top:3px">
              <font-awesome-icon
              :icon= "['far','thumbs-down']"  style="transform:scalex(-1)" @click="postReact('dislike',post.id,index)"/>
            </span>

            <span style="font-size:20pt ;color:#18DEFF;margin: auto 14px;cursor:pointer;">
              <font-awesome-icon :icon="['far','thumbs-up']" @click="postReact('like',post.id,index)"/></span>

          </p>
          <p class="text-center" v-if="likedPosts.indexOf(post.id) !== -1 && disLikedPosts.indexOf(post.id) == -1">

            <span style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
              <font-awesome-icon
              :icon= "['far','thumbs-down']"  style="transform:scalex(-1)" @click="postReact('dislike',post.id,index)"/>
            </span>

            <span style="font-size:20pt ;color:#18DEFF;margin: auto 14px;cursor:pointer;">
              <font-awesome-icon  :icon="['fas','thumbs-up']" @click="postReact('like',post.id,index)"/></span>

          </p>
          <p class="text-center" v-if="likedPosts.indexOf(post.id) == -1 && disLikedPosts.indexOf(post.id) !== -1">

            <span style="position:relative;font-size:20pt ;color:#EA003A;margin: auto 14px;cursor:pointer;top:3px">
              <font-awesome-icon
              :icon= "['fas','thumbs-down']"  style="transform:scalex(-1)"@click="postReact('dislike',post.id,index)"/>
            </span>

            <span style="font-size:20pt ;color:#18DEFF;margin: auto 14px;cursor:pointer;">
              <font-awesome-icon :icon="['far','thumbs-up']" @click="postReact('like',post.id,index)"/></span>

          </p>


                    </div>
                    <div class="post-react-number">
                      <p class="text-center">

                        <span v-if="post.dislikes_counter" style="position:relative;font-size:10pt ;color:#fff;margin: auto 14px;cursor:pointer;">
                          {{ post.dislikes_counter.count  }}
                        </span>

                        <span v-else style="position:relative;font-size:10pt ;color:#fff;margin: auto 14px;cursor:pointer;top:3px">
                            0
                          </span>


                        <span v-if="post.likes_counter" style="font-size:10pt ;color:#fff;margin: auto 14px;cursor:pointer;">

                          {{post.likes_counter.count }}

                    </span>

                        <span v-else style="font-size:10pt ;color:#fff;margin: auto 14px;cursor:pointer;">

                              0
                        </span>

                      </p>

                    </div>

          <div class="post-date">
              <p style="color:white">

                <b>
                {{ post.created_at | getDateForHumans }}

                </b>

              </p>
          </div>
          <div class="post-topic">
              <p class="white--text">
                  <b>  {{topics[post.topic_id -1 ]['id']}}</b>
              </p>
          </div>
          <hr>
      </div>

</template>

<!-- MY PROFILE posts-->
            <template v-if="currentUserProfile.user_id == showProfile.profile.user_id">
  <div class="text-xs-center post" v-for="(post,index) in posts" >

    <div class="avatar">
      <v-avatar
        size="55"
        class="#005f5b">
        <img
        @click="ShowProfile(post.user.profile.display_name)"
        :src="`/storage/avatars/${userProfile.avatar}`"
        :alt="showProfile.profile.display_name">
      </v-avatar>

    </div>
    <div class="post-content mt-3">
  <p style="white-space:pre-line;font-weight: bold;" class="white--text">
  <bdi>
    {{post.post}}
  </bdi>
  </p>
    </div>

              <template  v-if="post.image">
                <v-img
                style="margin:0 auto;"
                width="320"
                :src="`/storage/posts_images/${post.image}`"
                class="grey lighten-2">
            </v-img>

          </template>

    <div class="post-time white--text">
      {{post.created_at | getDateForHumans}}
    </div>
    <div class="post-topic white--text">
        <i style="">{{topics [post.topic_id - 1]['topic']}}</i>
    </div>

    <div class="post-react" v-if="post.user.profile.user_id == currentUserProfile.user_id">

    <p class="text-center">

      <span style="position:relative;font-size:20pt ;color:#FF004F;margin: auto 14px;cursor:pointer;top:3px" @click="showDisLikers(post.id)">
        <font-awesome-icon
        :icon= "['fas','thumbs-down']"  style="transform:scalex(-1)" />

      </span>
      <span style="cursor:pointer;font-size:15pt;color:#fff;width:10px;margin:0 auto" @click="deletePost(post.id,index)">
         <font-awesome-icon :icon="['fas', 'trash-alt']" />
      </span>

      <span  @click="showLikers(post.id)" style="font-size:20pt ;color:#18DEFF;margin: auto 14px;cursor:pointer;">
        <font-awesome-icon :icon="['fas','thumbs-up']" /></span>

    </p>
    <div class="post-react-number">
      <p class="text-center">

        <span v-if="post.dislikes_counter" style="position:relative;font-size:10pt ;color:#ffffff;margin: auto 14px;cursor:pointer;">
          {{ post.dislikes_counter.count  }}
        </span>

        <span v-else style="position:relative;font-size:10pt ;color:#ffffff;margin: auto 14px;cursor:pointer;top:3px">
            0
          </span>


        <span v-if="post.likes_counter" style="font-size:10pt ;color:#ffffff;margin: auto 14px;cursor:pointer;">

          {{post.likes_counter.count }}

    </span>

        <span v-else style="font-size:10pt ;color:#ffffff;margin: auto 14px;cursor:pointer;">

              0
        </span>

      </p>

    </div>
  </div>


  <hr>
  </div>
            </template>
    </div>
  </div>

  <!-- likers  -->
  <sweet-modal :title="$t('likers')" :enable-mobile-fullscreen="false" ref="likers" width="400" overlay-theme="dark">

      <div style="overflow-y:scroll;height:300px" @scroll="loadMoreLikers">

        <v-list two-line>
          <template v-for="liker in postLikers">

              <v-list-tile>

            <v-list-tile-avatar>
              <img
              @click="ShowProfile(liker.profile.display_name)"
              :src="`/storage/avatars/${liker.profile.avatar}`" :alt="liker.profile.display_name">
            </v-list-tile-avatar>

              <v-list-tile-content
                @click="ShowProfile(liker.profile.display_name)">
                <v-list-tile-title>
                      {{liker.name}}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{liker.profile.display_name}}
                    </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <template v-if="myFollowingIds.indexOf(liker.profile.user_id) == -1">
                  <v-btn  class="success white--text" round small @click="follow(liker.profile.user_id,'follow')">
                    follow
                  </v-btn>


                  </template>
                <template v-else>
                  <v-btn  class="error white--text" round small @click="follow(liker.profile.user_id,'unfollow')">
                    unfollow
                  </v-btn>
                </template>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>


      </div>
  </sweet-modal>

<!-- dislikers -->
  <sweet-modal :title="$t('dislikers')" :enable-mobile-fullscreen="false" ref="dislikers" width="400" overlay-theme="dark">

      <div style="overflow-y:scroll;height:300px" @scroll="loadMoreDisLikers">
        <v-list two-line>
          <template v-for="disliker in postDislikers">

              <v-list-tile>

            <v-list-tile-avatar>
              <img
                @click="ShowProfile(disliker.profile.display_name)"
              :src="`/storage/avatars/${disliker.profile.avatar}`" :alt="disliker.profile.display_name">
            </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title   @click="ShowProfile(disliker.profile.display_name)">
                      {{disliker.name}}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{disliker.profile.display_name}}
                    </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <template v-if="myFollowingIds.indexOf(disliker.profile.user_id) == -1">
                  <v-btn  class="success white--text" round small @click="follow(disliker.profile.user_id,'follow')">
                    follow
                  </v-btn>


                  </template>
                <template v-else>
                  <v-btn  class="error white--text" round small @click="follow(disliker.profile.user_id,'unfollow')">
                    unfollow
                  </v-btn>
                </template>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>

      </div>
  </sweet-modal>


  <!-- followers -->
  <sweet-modal ref="fans" min-width="320" max-width="400"  width="400" overlay-theme="dark" :enable-mobile-fullscreen="false">
  	<sweet-modal-tab :title="$t('followers')" id="tab1">
    <template v-if="myFollowers">
      <div class="followers" ref="followers_modal" @scroll="loadMoreFollowers">

        <v-list two-line>
          <template v-for="follower in myFollowers">

              <v-list-tile>

            <v-list-tile-avatar>
              <img
                @click="ShowProfile(follower.profile.display_name)"
              :src="`/storage/avatars/${follower.profile.avatar}`" :alt="follower.profile.display_name">
            </v-list-tile-avatar>

              <v-list-tile-content   @click="ShowProfile(follower.profile.display_name)">
                <v-list-tile-title>
                      {{follower.name}}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{follower.profile.display_name}}
                    </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <template v-if="myFollowingIds.indexOf(follower.profile.user_id) == -1">
                  <v-btn  class="success white--text" round small @click="follow(follower.profile.user_id,'follow')">
                    follow
                  </v-btn>


                  </template>
                <template v-else>
                  <v-btn  class="error white--text" round small @click="follow(follower.profile.user_id,'unfollow')">
                    unfollow
                  </v-btn>
                </template>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>

      </div>
    </template>
    <template v-else>
      <h4>please wait ... </h4>
    </template>
    </sweet-modal-tab>
  	<sweet-modal-tab :title="$t('following')" id="tab2">
      <template v-if="myFollowing">

        <div class="following" ref="following_modal" @scroll="loadMoreFollowing">
          <template v-for="following in myFollowing">
                  <v-list two-line>
                    <template v-for="follower in myFollowers">

                        <v-list-tile>

                      <v-list-tile-avatar>
                        <img
                          @click="ShowProfile(following.profile.display_name)"
                        :src="`/storage/avatars/${following.profile.avatar}`" :alt="following.profile.display_name">
                      </v-list-tile-avatar>

                        <v-list-tile-content   @click="ShowProfile(following.profile.display_name)">
                          <v-list-tile-title>
                                {{following.name}}
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                {{following.profile.display_name}}
                              </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <template v-if="myFollowingIds.indexOf(following.profile.user_id) == -1">
                            <v-btn  class="success white--text" round small @click="follow(following.profile.user_id,'follow')">
                              follow
                            </v-btn>


                            </template>
                          <template v-else>
                            <v-btn  class="error white--text" round small @click="follow(following.profile.user_id,'unfollow')">
                              unfollow
                            </v-btn>
                          </template>
                        </v-list-tile-action>
                      </v-list-tile>
                    </template>
                  </v-list>
                </template>
        </div>
      </template>
      <template v-else>
        <h4>please wait ... </h4>
      </template>
    </sweet-modal-tab>
  </sweet-modal>

</div>

  </v-layout>
</v-content>
</v-container>

</template>

<script>
import axios from 'axios';
import Ad from './../ads/Ad.vue';
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

        displayName:this.$route.params.dName,
        currentUserDisplayName : this.$store.state.authentication.currentUserProfile.display_name,
        postId:null,

      };
  },
  watch:{
    '$route'(to,from){

          this.$refs.fans.close();
          this.$refs.likers.close();
          this.$refs.dislikers.close();
      this.$router.push(`/${to.params.dName}`);
      this.$store.dispatch('showProfile',to.params.dName);

    }
  },
  mounted(){

      this.loadMorePosts();
      console.log(`${this.$route.params.dName} show profile`);


  },
  created(){
    console.log(this.$route);
    this.$store.dispatch('reactedPosts');
    this.$store.dispatch('myFollowingIds');

    this.$store.dispatch('showProfile',this.displayName)
    .then((response)=>{
      console.log('show profile');
    })
    .catch((errors)=>{
      console.log(this.displayName);
    })

    if (this.$route.params.dName == this.$store.state.authentication.currentUserProfile.display_name) {
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
    postLikers(){
      return this.$store.getters.postLikers;
    },
    postDislikers(){
      return this.$store.getters.postDislikers;
    },
    followersNum(){
        return  this.$store.getters.followersNum;
    },
    followingNum(){
      return  this.$store.getters.followingNum;
    },
    myFollowersNum(){
      return this.$store.getters.myFollowersNum;
    },
    myFollowingNum(){
      return  this.$store.getters.myFollowingNum;
    },
    currentUserProfile(){
      return this.$store.getters.currentUserProfile;
    },
    topics(){
         return this.$t('topics');
    },

    userProfile(){
      return  this.$store.getters.currentUserProfile;
    },
    myFollowers(){
      return  this.$store.getters.myFollowersProfiles;
    },
    myFollowing(){
      return  this.$store.getters.myFollowingProfiles;
    },
    myFollowingIds(){
      return this.$store.getters.myFollowingIds;
    }
  },

  methods:{

    getMyFans(){

        let followers = this.$store.state.following.myFollowersProfiles.length;
        let following = this.$store.state.following.myFollowersProfiles.length;
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
          this.$store.dispatch('loadMoreFollowers')
      }
    },

    loadMoreFollowing(e){
      let elHeight = e.target.clientHeight;

      let elscrollHeight = e.target.scrollHeight;

      let elScrollTop = e.target.scrollTop;

      if ((elHeight+elScrollTop) - elscrollHeight == 0) {
        this.$store.dispatch('loadMoreFollowing')
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

    loadMorePosts(){
                window.onscroll = () =>{
              let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight  === (document.documentElement.offsetHeight );

              if (bottomOfWindow) {
                this.$store.dispatch('loadMoreProfilePosts',{
                'userId':this.$store.state.profile.currentProfile.id});
                }
                }

              },

    follow(followed_id,action){

      this.$store.dispatch('toggleFollow',{followed_id:followed_id,action:action});
      this.$store.commit('toggleIsFollow');
    },

    ShowProfile(displayName){
      this.$router.push(`/${displayName}`);
    },

    postReact(react,postId,postIndex){
          this.$store.dispatch('postReact',{
                                  react:react,
                                  postId:postId,
                                  routeName:this.$route.name});
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

    updateProfile(){
    this.$router.push('update-profile');
  },

    updateAuthData(){

    this.$router.push('update-auth');

  },

    showLikers(id){

      this.postId = id;
      this.$store.dispatch('showLikers',{postId:id})
      this.$refs.likers.open();
      console.log(this.postId);

  },

    loadMoreLikers(e){



        let elHeight = e.target.clientHeight;

        let elscrollHeight = e.target.scrollHeight;

        let elScrollTop = e.target.scrollTop;

        if ((elHeight+elScrollTop) - elscrollHeight == 0) {
          console.log(this.postId);
            this.$store.dispatch('loadMoreLikers',{postId:this.postId})

        }
  },

    showDisLikers(id){


      this.postId = id;
      this.$store.dispatch('showDisLikers',{postId:id});
      this.$refs.dislikers.open();
      console.log(this.postId);
    },

    loadMoreDisLikers(e){



        let elHeight = e.target.clientHeight;

        let elscrollHeight = e.target.scrollHeight;

        let elScrollTop = e.target.scrollTop;

        if ((elHeight+elScrollTop) - elscrollHeight == 0) {
            this.$store.dispatch('loadMoreDisLikers',{postId:this.postId})
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
  height: 300px !important;
  overflow-y: scroll !important;
}

</style>
