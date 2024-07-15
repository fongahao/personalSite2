<template>
  <div class="search-box">
    <input
      class="search-txt"
      type="text"
      placeholder="想搜啥?"
    >
    <a
      href=""
      class="search-btn"
    >
      <!-- <img src="/img/2.png" /> -->
    </a>
  </div>

</template>

<script>
export default {};
</script>

<style scoped>
.search-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  border-radius: 40px;
  padding: 10px;
  background: #2f3648;
}

.search-box:hover > .search-txt {
  width: 200px;
  padding: 0 6px;
}

.search-box:hover > .search-btn {
  background: white;
}

.search-btn {
  color: #e84118;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
}

img {
  height: 30px;
  width: 30px;
}
</style>