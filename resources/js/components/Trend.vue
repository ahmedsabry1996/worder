<template>
  <div class="">
    <div>

    <h4 v-if="!newTrend">
      <b>Trend</b>
    </h4>
<transition name="bounce" leave-active-class="hide">

      <h4 v-if="newTrend" class="new-trend" @mouseover="newTrendOff" >
        <b >new trend</b>
      </h4>
</transition>
      </div>
    <ul class="list-group" @mouseover="newTrendOff">
        <li v-for="(value,key) in trend" :key="key"   class="list-group-item">

          <router-link  :to="`/trend/${key}`" class="text-left trend-link" exact>
              {{key}}
          </router-link>

     <span class="badge">written in {{value | numeral('0.0a') }} posts</span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {

          computed:{
              trend(){
                return this.$store.getters.trend;
              },
              newTrend(){
                return this.$store.getters.newTrend;

              }
          },

          methods:{
              newTrendOff(){
                this.$store.commit('newTrendOff');
              }

          }
}
</script>

<style scoped>
a.router-link-active{
  color: crimson;
  font-weight: bolder;
  font-size: 20px;
  font-style: italic;
}
.trend-link{
  font-size: 18px;
}
.new-trend{
  color: green;
  font-size: 20px;
  text-transform: uppercase;

}
</style>
