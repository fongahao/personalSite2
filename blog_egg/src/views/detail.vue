<template>
  <div>
    <Content />
  </div>
</template>

<script>
import Content from "../components/detail/content.vue";

export default {
  asyncData({ store, route }) {
    console.log("route.query.id", route.query.id);
    return store.dispatch("fetchDetailData", route.query.id); // 服务端获取异步数据
  },
  components: {
    Content,
  },
};
</script>

<style scoped>

</style>
 