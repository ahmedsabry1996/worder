<template>
  <div class="">
    <div>

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
    </ul>
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
