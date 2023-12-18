
<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="confirm">Подтвердить</button>
      <button @click="cancel">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    isOpen: Boolean,
    message: String,
    onConfirm: Function,
    onCancel: Function,
  },
  methods: {
    confirm() {
      this.$emit('deleteConfirmed')
    },
    cancel() {
      this.onCancel();
    },
  }
}
</script>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>