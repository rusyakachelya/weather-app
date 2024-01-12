
<template>
  <div class="custom-input">
    <input
        type="text"
        :value="value"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown.enter="handleEnter"
    />

  </div>
</template>

<script>
export default {
  props: {
    value: String,
    autocomplete: String,
    placeholder: String,
    customClass: String
  },
  methods: {
    handleEnter() {
      this.$emit("enter");
    },
  },
};
</script>

<style scoped>
.custom-input {
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  color: #777;
  width: 423px;
  border: 1px solid #abadb3;
  padding: 2px;
  font-size: 14px;
  line-height: 20px;
  height: 25px;
  border-radius: 3px;
  outline: 0;
}
</style>
