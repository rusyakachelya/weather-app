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

.preloader-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.preloader {
  border: 4px solid #3498db; /* Колір для країв preloader (змінюйте за потребою) */
  border-top: 4px solid transparent; /* Залишаємо верхній край transparent, щоб уникнути кута в центрі */
  border-radius: 50%; /* Круглий preloader */
  width: 40px; /* Ширина preloader */
  height: 40px; /* Висота preloader */
  animation: spin 1s linear infinite; /* Анімація обертання */
  margin: 90px auto ; /* Центруємо по горизонталі та вертикалі */

}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>