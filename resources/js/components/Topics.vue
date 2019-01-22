<template >
<div>
    <div>
      <trend></trend>
    </div>

    <div>
  <h4>Topics</h4>
  <ul class="list-group">
    <li v-for="(topic,index) in topics" :key="index" class="list-group-item">
      <router-link :to="`/topic/${topic}`" class="topic-link" exact>{{topic}}</router-link>
    </li>
  </ul>

</div>
</div>
</template>

<script>
import Trend from './Trend.vue';
export default {
  components:{
    Trend
  },
  computed:{
    topics(){
        return this.$store.getters.topics;
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
  text-decoration: underline;
}
.topic-link{
  font-size: 18px

}
</style>
