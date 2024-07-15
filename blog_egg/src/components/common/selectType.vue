<template>
  <div class="select-dropdown">
    <div class="select-navigator">
      <select
        class="custom-select"
        v-model="optionSelected"
      >
        <option
          v-for="option in optionInfo"
          :key="option.id"
          :value="option.id"
        >{{option.name}}</option>

      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    optionInfoArr: Array,
    optionDefault: String,
  },
  data() {
    return {
      optionInfo: this.optionInfoArr,
      optionSelected: this.optionDefault,
    };
  },
  watch: {
    optionSelected(newType) {
      // const id = String(Number(newType) + 1);
      this.$emit("typeChange", newType);
    },
  },
};
</script>

<style scoped>
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
</style>