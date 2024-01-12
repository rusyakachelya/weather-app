<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>{{ warningMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    warningMessage: {
      type: String,
      default: "Попередження",
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #ddd;
  width: 550px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.close {
  color: #aaa;
  float: right;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #333;
}

button {
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

body.modal-open {
  overflow: hidden;
}

@media screen and (max-width: 600px) {
  .modal-content {
    width: 80%;
  }
}
</style>

