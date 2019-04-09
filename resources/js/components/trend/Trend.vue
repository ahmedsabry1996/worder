<template>
  <div class="">
    <h1 class="text-xs-center hidden-md-and-up white--text">{{$t('trend')}}</h1>
          <div @scroll="loadMore" class="trend-phone hidden-sm-and-up">

    <v-list two-line subheader dark>
      <v-subheader>{{$t('trend')}}</v-subheader>
      <template v-for="(value,key) in topTen">

        <v-list-tile :key="key" router :to="{name:'trend',query:{trend:key}}">
          <v-list-tile-content>
            <v-list-tile-title>
              <bdi>
                {{ key }}
                </bdi>
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <bdi>
                {{value | numeral('0a') }} posts

              </bdi>
            </v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>
        <v-divider></v-divider>
      </template>
    </v-list>
  </div>

    <v-list two-line subheader dark class="hidden-xs-only">
      <v-subheader>{{$t('trend')}}</v-subheader>
      <template v-for="(value,key) in topTen">

        <v-list-tile :key="key" router :to="{name:'trend',query:{trend:key}}">
          <v-list-tile-content>
            <v-list-tile-title>
              <bdi>
                {{ key }}
                </bdi>
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <bdi>
                {{value | numeral('0a') }} posts

              </bdi>
            </v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>
        <v-divider></v-divider>
      </template>
    </v-list>
  </div>


</template>

<script>
export default {
  data(){
    return {
        pos1:0,
    }
  },
  created(){
      console.log('trend list loaded');
  },
  mounted(){

  },
          computed:{
              topTen(){
                return this.$store.getters.topTen;
              },

          },
          methods:{
            loadMore(e){
              this.$store.commit('hideBottomNav');

              let elHeight = e.target.clientHeight;

              let elscrollHeight = e.target.scrollHeight;

              let elScrollTop = e.target.scrollTop;

              if ((elHeight+elScrollTop) - elscrollHeight == 0) {
                this.$store.commit('hideBottomNav');
                }
                else{
                  this.$store.commit('showBottomNav');
                }

                  },
          }

}
</script>

<style scoped>
.trend-phone{
  position: absolute;
  width:100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: scroll;
}
</style>
