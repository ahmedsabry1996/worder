<template>
<div class="">
<hr>
    <div class="simple-ads hidden-xs">
    <h2>ads for one month</h2>
  </div>

    <div class="simple-ad-xs visible-xs">
    <h2>ads for one month</h2>
  </div>
  <hr>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
.simple-ads{
  cursor: pointer;
  width: 300px;
  height: 300px;
  background-color: crimson;
  color:#000;
  text-align: center;
  padding: 80px;
  margin: 0 auto;
  border: 2px solid #000;
  border-radius: 4px;
}
.simple-ad-xs{
  width:100%;
  background-color: crimson;
  color:#000;
  text-align: center;
  padding: 80px;
  margin: 0 auto;
  border: 2px solid #000;
  border-radius: 4px;
}
</style>
