<template>
  <div class="chosen-articles">
    <div class="chosen-articles-header">
      <h2 class="header-card-title">最新文章</h2>
      <p class="header-card-sponsor">
        Powered by
        <br>
        fongahao
      </p>
    </div>
    <div class="mini-card-grid">
      <article
        class="mini-card"
        v-for="(item,index) in articleList"
        :key="index"
      >
        <time :datetime="item.addTime">
          <!-- <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-shijian"></use>
          </svg> -->
          Time:&nbsp;{{FormatDateExecTime(item.addTime)}}
          <!-- <Icon type="schedule" /> -->
        </time>
        <h3 class="mini-card-title">
          <a :href="'/detail?id=' + item.id"> {{item.title}} </a>
        </h3>
        <p class="mini-card-introduce"> {{item.introduce}} </p>
        <div class="tags">
          <a :href="'/articleList?typeId=' + item.typeId + '&' + 'tagId=' + item.tagId">
            <div>
              {{item.typeName}}
            </div>
            <div>
              {{ item.tagName }}
            </div>
          </a>

        </div>
      </article>
    </div>
  </div>
</template>

<script>
// import { Icon } from "ant-design-vue";
export default {
  // 服务端获取异步数据
  asyncData({ store }) {
    // const limit = "10"
    return store.dispatch("fetchArticleList");
  },
  data() {
    return {
      articleList: "",
    };
  },
  components: {
    // Icon,
  },
  mounted() {
    this.articleList = this.$store.state.articleList;
    console.log("最新文章", this.articleList);
  },
  methods: {
    FormatDateExecTime(date) {
      let reg = new RegExp("\\d{4}-\\d{1,2}-\\d{1,2}", "g");
      // return date.match(/\d{4}-\d{1,2}-\d{1,2}/g)[0];
      return date.match(reg)[0];
    },
  },
};
</script>

<style scoped src="../../styles/components/chosenArticles.css">
</style>