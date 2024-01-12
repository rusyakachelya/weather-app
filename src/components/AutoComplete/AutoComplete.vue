<template>
  <ul class="input-list" v-if="suggestions.length">
    <li v-for="(suggestion, index) in suggestions"
        :key="index" @click="selectSuggestion(suggestion.city)"
        class="input-list__item"
    >
      <strong>{{ suggestion.city }}</strong>,  <span class="suggestion-text">{{ suggestion.country }} {{ suggestion.state }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    suggestions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectSuggestion(city) {
      this.$emit('selectSuggestion', city)
    },
  },
};
</script>

<style scoped>

.input-list__item{
  padding: 5px;
  display: flex;
}

.suggestion-text{
  margin: 0;
}
li{
  font-size: 14px;
  line-height: 22px;
}
li:hover {
  background-color: #6dabf2;
  color: white;
  cursor: pointer;
}

.input-list {
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
  list-style: none;
  width: 417px;
  min-height: 35px;
  overflow-x: hidden;
  position: absolute;
  z-index: 1;
  border: 1px solid #ccc;
  background: white;
  margin: 0 auto;
  top: 44px;
  left: 400px;
  padding: 5px;
  text-align: start;
}
</style>
