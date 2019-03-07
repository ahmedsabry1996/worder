<template>
  <div class="">

    <v-list two-line subheader dark>
      <v-subheader>Trend</v-subheader>
      <template v-for="(value,key) in topTen">

        <v-list-tile :key="key" router :to="{name:'trend',query:{trend:key}}">
          <v-list-tile-content>
            <v-list-tile-title>{{ key }}</v-list-tile-title>
            <v-list-tile-sub-title>written in {{value | numeral('0.0a') }} posts</v-list-tile-sub-title>
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
