<template>
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
</template>

<script>
export default {
  props: {
    optionInfo: Array,
    optionSelected: String,
  },
  data() {
    return {
      tagInfo: this.optionInfo,
      tagSelected: this.optionSelected,
    };
  },
  created() {
    console.log();
  },
  watch: {
    tagInfo() {
      console.log("监听tagInfo", this.tagInfo);
    },
  },
};
</script>

<style>
</style>