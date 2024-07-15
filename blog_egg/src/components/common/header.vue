<template>
  <div class="header">
    <Row
      class="header-row"
      type="flex"
      align="middle"
      justify="center"
    >
      <!-- 左边栏 -->
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
        :sm="6"
        :md="6"
        :lg="5"
        :xl="6"
        :xxl="4"
      >
      <img
        src="../../static/images/avatar.png"
        alt="头像"
        class="avatar"
      >

      </Col>

      <!-- 右边栏 -->
      <Col
        :xs="14"
        :sm="16"
        :md="16"
        :lg="17"
        :xl="16"
        :xxl="12"
      >

      <div class="icons-list">
        <!-- <Button
          v-for="(item,index) in buttonInfo"
          :key="index"
        >
          <a :href="item.url">
            {{item.name}}
          </a>
        </Button> -->
        <button
          v-for="(item,index) in buttonInfo"
          :key="index"
        >
          <a :href="item.url">
            {{item.name}}
          </a>
          <!-- <MenuOutline /> -->
        </button>

      </div>

      </Col>

    </Row>
  </div>

</template>

<script>
// import { Button, Row, Col } from "ant-design-vue";
// import { Button } from "@ant-design/icons";
// import { MenuOutline } from "ant-design-vue";
import { Row, Col } from "ant-design-vue";
// import { Button, Row, Col } from "ant-design-vue";
export default {
  data() {
    return {
      buttonInfo: [
        { url: "/", name: "首页" },
        { url: "/articleList", name: "文章列表" },
        { url: "/about", name: "关于我" },
      ],
    };
  },
  components: {
    // Button,
    // MenuOutline,
    Row,
    Col,
  },
};
</script>

<style scoped>
.header {
  height: 10rem;
  /* margin: 0 auto; */
  /* background-color: #fff; */
  /* --fleck-seed: 35458;
  --fleck-count: 500;
  --fleck-size-base: 1px;
  --fleck-color-1: #262626; */
  border-bottom: 1px solid #676767;
  background-color: #111;
}
.header-row {
  /* max-width: 1600px; */
  height: inherit;
}
.row {
  height: 160px;
}
.row-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  height: inherit;
}
.header-left {
  height: inherit;
}
.avatar {
  display: block;
  margin: 0 auto;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}
.icons-list {
  display: flex;
  justify-content: end;
  /* margin: 0 auto; */
}
.icons-list button {
  color: #fff;
  font-size: 0.68rem;
  font-weight: 500;
  margin-right: 2rem;
  background: rgba(0, 0, 0, 0.33);
  border: 1px solid #fff;
  border-radius: 8%;
  padding: 0.33rem 1rem;
}
</style>