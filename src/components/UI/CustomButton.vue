<template>
  <button @click="handleClick" :class="buttonClass" :disabled="isDisabled">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: "Click me",
    },
    buttonClass: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
button {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
