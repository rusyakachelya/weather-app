<template>
  <div v-if="isLoading" class="preloader-container">
    <div class="preloader"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingIndicator",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>


<style scoped>

.preloader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.preloader {
  border: 4px solid #3498db;
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 90px auto;

}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>