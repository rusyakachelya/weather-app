<template>
  <div v-if="isVisible" class="modal-container">
    <div class="modal">
      <div class="modal-body">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import {preventBodyScroll} from "@/helpers/scrollControl";

export default {
  data() {
    return {
      isVisible: false,
      message: "",
      delay: 2000
    };
  },
  methods: {
    showNotification(message) {
      this.message = message;
      this.isVisible = true;
      preventBodyScroll(true)
      setTimeout(() => {
        this.hideNotification();
      }, this.delay);
    },
    hideNotification() {
      this.isVisible = false;
      preventBodyScroll(false)
    },

  },
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  z-index: 999;
  text-align: center;
}

.modal {
  background-color: transparent;
}

.modal-body {
  padding: 10px;
}
</style>
