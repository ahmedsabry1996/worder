<template >
<div>

          <v-list dark subheader>
          <v-subheader>{{$t('allTopics')}}</v-subheader>
          <template v-for="(topic,index) in topics">
              <v-list-tile
                :key="topic.id"
                avatar
                ripple
                router
                :to="`/topic/${topic.en}`"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ topic.topic }}</v-list-tile-title>
                </v-list-tile-content>

              </v-list-tile>
              <v-divider
                v-if="index + 1 < topics.length"
              ></v-divider>
            </template>
          </v-list>
</div>
</template>

<script>
export default {
  computed:{
    topics(){
        return this.$t('topics').reverse();
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
