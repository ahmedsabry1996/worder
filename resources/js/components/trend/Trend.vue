<template>
  <div class="">

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


</template>

<script>
export default {

          computed:{
              topTen(){
                return this.$store.getters.topTen;
              },

          },

}
</script>

<style scoped>

</style>
