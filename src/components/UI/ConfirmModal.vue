<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="confirm" class="confirm-delete-btn">Підтвердити</button>
      <button @click="cancel" class="cancel-btn">Відміна</button>
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
.confirm-delete-btn {
  background-color: #658bd2; /* Змінюємо колір фону при наведенні */
  color: #fff; /* Білий колір тексту */
  padding: 10px 20px; /* Внутрішні відступи */
  border: none; /* Без рамки */
  border-radius: 5px; /* Закруглені кути */
  cursor: pointer; /* Змінює форму курсора при наведенні */
  font-size: 16px; /* Розмір шрифту */
  transition: background-color 0.3s ease; /* Плавний перехід для зміни кольору фону */
  margin-right: 20px;
}

.confirm-delete-btn:hover {
  background-color: #177de5; /* Червоний колір */

}
.modal-content {
  background: white;
  padding: 50px;
  border-radius: 8px;
}
/* Стиль для кнопки відміни */
.cancel-btn {
  background-color: #ddd; /* Світло-сірий колір */
  color: #333; /* Темно-сірий колір тексту */
  padding: 10px 20px; /* Внутрішні відступи */
  border: none; /* Без рамки */
  border-radius: 5px; /* Закруглені кути */
  cursor: pointer; /* Змінює форму курсора при наведенні */
  font-size: 16px; /* Розмір шрифту */
  transition: background-color 0.3s ease; /* Плавний перехід для зміни кольору фону */
}

.cancel-btn:hover {
  background-color: #ccc; /* Змінюємо колір фону при наведенні */
}

</style>