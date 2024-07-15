<template>
  <div class="wrapper">
    <Header />
    <div class="page-wrap">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/common/header.vue";
import Footer from "./components/common/footer.vue";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  margin: 0 auto;
}

.page-wrap {
  min-height: calc(100% - 30rem);
  margin-bottom: 10rem;
}
</style>