<template>
  <div id="maincontent">
    <ChosenArticles />
    <Articles />
  </div>

</template>

<script>
import ChosenArticles from "../components/index/chosenArticles.vue";
import Articles from "../components/index/articles.vue";
import Search from "../components/common/search.vue";

export default {
  components: {
    // 带有ayncData() 的组件不能异步加载
    // "ChosenArticles": ()=> import("../components/index/chosenArticles.vue"),
    // "Articles": ()=> import("../components/index/articles.vue"),
    // "Search": ()=> import("../components/common/search.vue")
    ChosenArticles,
    Articles,
    Search
  },
};
</script>


<style>
</style>