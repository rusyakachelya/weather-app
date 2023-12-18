<template>
  <div v-if="!hasData" class="no-data">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "NoContentBlock",
  props: {
    hasData: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: "Немає даних для відображення.",
    },
  },
}
</script>

<style scoped>
.no-data{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;

}
</style>