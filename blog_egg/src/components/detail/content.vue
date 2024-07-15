<template>
  <Row
    type="flex"
    justify="center"
  >
    <!-- 
    xs: < 576px; 
    sm: >= 576px; 
    md: >= 768px;  
    lg: >= 992px;
    xl: >= 1200px;
    xxl: >= 1600px;
  -->

    <Col
      :xs="0"
      :sm="0"
      :md="0"
      :lg="5"
      :xl="6"
      :xxl="4"
    >
    <Affix :offset-top="10">
      <nav class="catalog">
        <div class="catalog-title">目录</div>
        <div
          class="catalog-body"
          v-html="catalog"
        >
        </div>
      </nav>

    </Affix>
    </Col>
    <Col
      :xs="23"
      :sm="23"
      :md="23"
      :lg="17"
      :xl="16"
      :xxl="12"
    >
    <div class="article">
      <div
        class="article-content"
        v-html='htmlString'
      ></div>
    </div>

    </Col>
  </Row>
</template>



<script>
// import { DatePicker } from "ant-design-vue";

import { Affix, Row, Col } from "ant-design-vue";
import { marked } from "marked";

// import hljs from "highlight.js";
// import "highlight.js/styles/monokai-sublime.css";
import "../../styles/components/content.css";
import toToc from "../../utils/toToc.js";

export default {
  data() {
    return {
      articleContent: "",
      htmlString: "",
      catalog: "",
    };
  },
  components: {
    // DatePicker,
    Affix,
    Row,
    Col,
  },
  // 客户端生命周期
  mounted() {
    // console.log(hljs, "这是hljshljshljshljs");
    try {
      hljs.highlightAll();
      // hljs.configure.ignoreUnescapedHTML = true;
      // console.log(
      //   "articleDetails",
      //   this.$store.state.articleDetails.article_content
      // );
      this.articleContent = this.$store.state.articleDetails.article_content;
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        smartLists: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartypants: false,
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
      });
      // 将Markdown语法编译成html字符串
      const htmlString = marked(this.articleContent);

      // 文章内容和目录
      const article = this.getToc(htmlString);
      this.catalog = article.catalog;
      this.htmlString = article.content;
    } catch (e) {
      console.log(e, "错错误");
    }
  },
  // 服务端生命周期
  created() {},
  methods: {
    /**
     * @description 匹配文章中 h? 标签
     * @param htmlString 文章内容
     */
    getToc(htmlString) {
      let content = htmlString;
      console.log("文章内容：", "\n", content);
      // 1. 提取出标题：Array
      const reg = new RegExp("<h[1-6].+?</h[1-6]>", "g");
      const tocs = content.match(reg);
      console.log("提取出标题：", "\n", tocs);
      // const tocs = content.match(/<h[1-6].+?<\/h[1-6]>/g);
      // const tocs = content.match(/(?<=\<h[1-6]).*?(?=\<\/h[1-6]>)/g);
      // console.log("html字符串", htmlString);
      // const tocs = content.match(/^<h[1-6].*?\/h[1-6]>$/g);

      // 2. 从标题数组中提取 标题 和 内容
      tocs &&
        tocs.forEach((item, index) => {
          console.log("匹配源:", item);
          // 2.1 提取标题
          let regLabel = new RegExp("h([1-6])?");
          let labelH = item.match(regLabel);
          console.log("2.1 提取具体标题:", labelH);

          // let regContent = new RegExp("(?<=\\>).*?(?=\\<)"); // 匹配内容 safari 不支持零宽断言
          let regContent = new RegExp("(<h?[\\w]+[^>]*>)(.[^<]*)?"); // 匹配内容 safari 不支持零宽断言

          // 2.2 提取内容
          // let label = new RegExp("<h.*?>");
          // let label = new RegExp("(<h?[\\w]+[^>]*>)(.[^<]*)?");
          // let labelChange = item.match(label);
          let contentH = item.match(regContent);
          // contentH[0].replace(">", "");
          console.log("2.2 提取内容:", contentH[2], "\n", );
          // let labelH = item.match(/h([1-6])?/);
          // let contentH = item.match(/(?<=\>).*?(?=\<)/);

          let toc =
            // `<div name='toc-title' id='${index}'>${item} </div>`;
            `<${labelH[0]} title="${contentH[2]}" id="${index}">${contentH[2]}</${labelH[0]}>`;
          console.log(
            `<${labelH[0]} title="${contentH[2]}" id="${index}">${contentH[2]}</${labelH[0]}>`
          );
          content = content.replace(item, toc);
          // var preg = new RegExp("(?<=>)(.|\\s)*?(?=<\\/?\\w+[^<]*>)", "g");
          // var preg = new RegExp("(</?[\\w]+[^>]*>)(.[^<]*)?", "g");
          // console.log(
          //   "匹配标签和内容",
          //   "\n",
          //   item,
          //   "\n",
          //   labelH,
          //   "\n",
          //   contentH,
          //   "\n",
          //   regLabel,
          //   "\n",
          //   regContent
          // );
        });
      const catalog = tocs && toToc(tocs);
      console.log(
        "目录目录目录",
        "\n",
        //  content,
        "\n",
        catalog
      );

      return { content, catalog };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/views/tocs.scss";
// @import "../../utils/highlight/monokai-sublime.min.css";

.article {
  margin-top: 1rem;
  margin-left: 1rem;
}


.article-content {
  padding: 2rem;
  // background-color: #e6e6e6;
  box-shadow: 0.01rem 0.01rem 0.01rem #c8c8c8, -0.01rem -0.01rem 0.01rem #c8c8c8;
  border-radius: 1rem;
  background-color: #fff;
}
</style>