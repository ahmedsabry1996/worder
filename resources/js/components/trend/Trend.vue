<template>
  <div class="">
    <!-- <div>

    <h4>
      <b>Trend</b>
    </h4>

      </div>
    <ul class="list-group">

        <li v-for="(value,key) in topTen" :key="key"   class="list-group-item">

          <router-link  :to="`/trend/${key}`" class="text-left trend-link" exact>
              <bdi>              {{key}}
</bdi>
          </router-link>

     <span class="badge">written in {{value | numeral('0.0a') }} posts</span>
        </li>
    </ul> -->
    <v-list two-line subheader dark>
      <v-subheader>Trend</v-subheader>
      <template v-for="(value,key) in topTen">

        <v-list-tile :key="key" router :to="`/trend/${key}`">
          <v-list-tile-content>
            <v-list-tile-title>{{ key }}</v-list-tile-title>
            <v-list-tile-sub-title>written in {{value | numeral('0.0a') }} posts</v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>

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
