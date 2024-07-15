<template>
  <div id="maincontent">
    <h1 class="page-title">
      <div class="pre-tag">
        <span>Articles Type</span>
        <span>And Tag</span>
      </div>
      <div class="header-tag">
        <span>
          {{typeName}}
        </span>
        <span>
          {{tagName}}
        </span>
      </div>
    </h1>
    <header class="page-header-top-nav">

      <SelectType
        :optionInfoArr="typeTagInfo"
        :optionDefault="typeSelected"
        @typeChange="changeTag"
      />

      <div class="select-navigator">
        <select
          class="custom-select"
          v-model="tagSelected"
        >
          <option
            v-for="option in tagInfo"
            :key="option.id"
            :value="option.id"
          >{{option.name}}</option>

        </select>
      </div>

      <div class="number-sorting">
        <span>{{articleNum}}&nbsp;&nbsp;Articles</span>
        <button
          class="sorting-button"
          @click="sorting"
        >筛选</button>

      </div>
    </header>

    <Articles />
  </div>

</template>

<script>
import Articles from "../components/index/articles.vue";
import SelectType from "../components/common/selectType.vue";
import SelectTag from "../components/common/selectTag.vue";
import typeTagInfo from "../utils/json/type.json";
// import { Button } from "ant-design-vue";
import { API } from "../utils/api/apiConfig.js";
import { debounce } from "../utils/tool/Closure.js";
export default {
  asyncData({ store, route }) {
    // 服务端获取异步数据
    // const { typeId, tagId } = route.query;
    // if (!typeId || !tagId) return;
    // console.log(route.query, "route.query");
    // return store.dispatch("fetchArticleListByTypeAndTag", route.query);
  },
  components: {
    SelectType,
    SelectTag,
    Articles,
    // Button,
  },
  created() {
    console.log("this.$route", this.$route);
    // 初始化
    const { typeId = "-1", tagId = "-1" } = this.$route.query;
    console.log("初始化分类和标签", typeId, tagId);
    const index = this.typeTagInfo.findIndex((tagInfo) => {
      return tagInfo.id === typeId;
    });
    console.log("indexindexindex", index);
    this.typeSelected = typeId;
    this.tagInfo = typeTagInfo[index].tagInfo;
    this.tagSelected = tagId;

    console.log(
      this.typeSelected,
      this.tagSelected,
      this.tagInfo,
      this.tagInfoArr
    );
    this.articleListByTypeAndTag = this.$store.state.articleListByTypeAndTag;
  },
  computed: {
    articleNum() {
      return this.$store.state.articleListByTypeAndTag.length;
    },
    tagInfoArr() {
      return this.tagInfo;
    },
    typeName() {
      return this.typeTagInfo.find((typeInfo) => {
        return typeInfo.id === this.typeSelected;
      }).name;
    },
    tagName() {
      return this.tagInfo.find((tag) => {
        return tag.id === this.tagSelected;
      }).name;
    },
  },
  data() {
    return {
      articlesSorted: [],
      typeTagInfo,
      tagInfo: undefined,
      tagSelected: undefined,
      typeSelected: undefined,
      articleListByType: "",
      articleListByTypeAndTag: "",
    };
  },

  methods: {
    /**
     * @Description typeId控制tagInfo的展示，需要通过typeId检索(数组下标)对应的tagInfo
     */
    changeTag(typeId) {
      console.log("类型", typeId, typeof typeId);
      const index = this.typeTagInfo.findIndex((tagInfo) => {
        return tagInfo.id === typeId;
      });
      console.log("indexindexindex", index);
      this.tagInfo = typeTagInfo[index].tagInfo;
      this.typeSelected = typeId;
      this.tagSelected = typeTagInfo[index].tagInfo[0].id;
      console.log(
        "类型和分类id",
        this.typeSelected,
        this.tagSelected,
        this.tagInfo
      );
    },
    sorting: debounce(function () {
      console.log(
        "根据类别和标签进行筛选",
        this.typeSelected,
        this.tagSelected
      );
      const typeId = this.typeSelected,
        tagId = this.tagSelected;
      if (typeId === "-1" && tagId === "-1") {
        this.axios.get(API.getArticleListByTypeAndTag).then((res) => {
          this.$store.state.articleListByTypeAndTag = res.data;
          console.log("type 和 tag 两个都要全查", res.data);
        });
      } else if (typeId === "-1" && tagId !== "-1") {
        // 暂无此查询
        console.log("查 tag 全部");
      } else if (typeId !== "-1" && tagId === "-1") {
        this.axios
          .get(API.getArticleListByType, {
            params: {
              typeId: typeId,
            },
          })
          .then((res) => {
            this.$store.state.articleListByTypeAndTag = res.data;
            console.log(res.data, "查 type 全部");
          });
      } else {
        this.axios
          .get(API.getArticleListByTypeAndTag, {
            params: {
              typeId: typeId,
              tagId: tagId,
            },
          })
          .then((res) => {
            this.$store.state.articleListByTypeAndTag = res.data;
            console.log(res.data, "type 和 tag 都有值");
          });
      }
    }),
  },
};
</script>

<style scoped>
.page-header-top-nav {
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  background: rgba(0, 0, 0, 0.33);
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.select-navigator {
  margin-left: 2rem;
}
.page-title {
  /* font-size: clamp(1.2rem, 1rem + 3.5vw, 4rem); */
  font-size: clamp(1rem, 1rem + 3vw, 3.8rem);
  text-transform: uppercase;
  margin-top: 3rem;
  line-height: 3rem;
  text-shadow: 0 3px 3pxrgba (0, 0, 0, 0.5);
}
h1 {
  font-family: MD Primer Bold, Rubik, Lato, Lucida Grande, Lucida Sans Unicode,
    Tahoma, Sans-Serif;
  font-style: normal;
  font-size: clamp(2rem, 2rem + 1.2vw, 3rem);
  font-weight: 700;
  color: #fff;
}
.pre-tag {
  font-size: 1rem;
  color: #ffdfc7;
}
.header-tag {
  text-transform: uppercase;
  white-space: nowrap;
}
.custom-select {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  margin: 0;
  border: 0;
  border-radius: 8px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #000;
  /* background-image: url(images/arrow-down.svg); */
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.custom-select:focus,
.custom-select:hover {
  border-color: #777;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  outline: none;
}
/* .number-sorting {
  position: absolute;
  color: #fff;
  font-size: 16px;
  right: 1rem;
} */
.sorting-button {
  border: 0;
  background: 0;
  padding: 0;
  color: #fff;
  border-left: 2px solid #a7a7a7;
  padding-left: 1rem;
}
.sorting-button:hover {
  cursor: pointer;
  /* box-shadow: 0 0 1px 3px rgb(59 153 252 / 70%); */
  color: rgb(59 153 252 / 70%);
}
.sorting-button:focus {
  color: rgb(59 153 252 / 70%);
}
@media (min-width: 600px) {
  .number-sorting {
    position: absolute;
    font-size: 1rem;
    color: #fff;
    right: 1rem;
  }
}
@media (max-width: 600px) {
  .number-sorting {
    position: absolute;
    font-size: 1rem;
    color: #fff;
    left: 1rem;
    top: 5rem;
  }
}
</style>