<template>
  <div class="new-articles">
    <div class="articles-grid">
      <article
        class="article-card"
        v-for="(article,index) in articleList"
        :key="index"
      >
        <div class="article-article">

          <header>
            <div class="article-tags">
              <a :href="'/articleList?typeId=' + article.typeId + '&' + 'tagId=' + article.tagId">
                <!-- <a :href="'/articleList/' + article.typeName + '/' + article.tagName"> -->
                <div>
                  {{article.typeName}}
                </div>
                <div>
                  {{ article.tagName }}
                </div>
              </a>

            </div>
            <h2>
              <a :href="'/detail?id=' + article.id">
                {{article.title}}
              </a>
            </h2>
          </header>

          <p class="article-introduce">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{article.introduce}}
          </p>

          <time :datetime="article.addTime">
            <!-- <Icon type="schedule" />&nbsp;发表于&nbsp;{{FormatDateExecTime(article.addTime)}} -->
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-shijian"></use>
            </svg>
            发表于&nbsp;{{FormatDateExecTime(article.addTime)}}
          </time>
        </div>
      </article>
    </div>

  </div>
</template>


<script>
// import { Icon } from "ant-design-vue";
// import "../../utils/iconfont/iconfont.js";
export default {
  // 服务端获取异步数据
  asyncData({ store, route }) {
    return store.dispatch("fetchArticleListByTypeAndTag", route.query);
  },
  // props: {
  // articlesSorted: Array,
  // },
  components: {
    // Icon,
  },
  mounted() {
    // this.articleList = this.$store.state.articleListByTypeAndTag;
    console.log(
      "articles组件文章信息",
      this.$store.state.articleListByTypeAndTag
    );
    // this.articleList = this.$store.state.articleList;
    // console.log("articleList", this.$store.state.articleList);
  },
  computed: {
    articleList() {
      return this.$store.state.articleListByTypeAndTag;
    },
  },
  methods: {
    FormatDateExecTime(date) {
      // console.log("时间格式化", date.match(/\d{4}-\d{1,2}-\d{1,2}/g));
      return date.match(/\d{4}-\d{1,2}-\d{1,2}/g)[0];
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: MD Primer Bold, Rubik, Lato, Lucida Grande, Lucida Sans Unicode,
    Tahoma, Sans-Serif;
  margin: 1rem 0;
  /* color: #fff; */
  color: #111;
  /* color: #e6e6e6; */
  /* color: #d9d9d9; */
  font-weight: 800;
}
/* 
  grid 
  grid-template-columns:
  grid-template-rows
  列宽 行高
*/

.articles-grid {
  display: grid;
  /* 列自动填充，网络单元列宽最小300px,最大 1fr */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--gap, 2rem);
}
.article-card {
  /* background: #cccccc; */
  /* background: #ffdfc7; */
  background: #fff;
  color: #474747;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  -webkit-filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.24));
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.24));
  display: flex;
  flex-direction: column;
}
.article-article {
  padding: 2rem;
  /* color: #ffdfc7; */
  /* color: #fff; */
}
.article-tags {
  font-family: MD Primer Bold, Rubik, Lato, Lucida Grande, Lucida Sans Unicode,
    Tahoma, Sans-Serif;
  display: inline-block;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  color: #ff7a18;
  font-size: 0.5rem;
  /* -webkit-margin-end: 0.66rem;
  margin-inline-end: 0.66rem; */
  /* position: absolute;
  bottom: 1.5rem;
  left: 1.5rem; */
}
.article-tags a :nth-child(1),
.article-tags a :nth-child(2) {
  font-size: 0.8rem;
}
.article-introduce {
  min-height: 6rem;
  line-height: 1.4rem;
  max-height: 12.8rem;
  overflow: hidden;
  display: -webkit-box;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 3rem;

  /* color: #fff; */
  /* color: #d9d9d9; */
  color: #111;

  /*设置子元素排列方式*/
  -webkit-box-orient: vertical;
  /*设置显示的行数，多出的部分会显示为...*/
  -webkit-line-clamp: 8;
  text-overflow: ellipsis;
}
time {
  color: #111;
}
.icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>