<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <CustomButton
          :button-text="$t('modals.confirmModal.buttons.confirm')"
          :button-class="'confirm-delete-btn'"
          @click="confirm"
      />
      <CustomButton
          :button-text="$t('modals.confirmModal.buttons.cancel')"
          :button-class="'cancel-btn'"
          @click="cancel"
      />

    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/UI/CustomButton.vue";

export default {
  name: "ConfirmModal",
  components: {CustomButton},
  data() {
    return {}
  },
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
  background-color: #658bd2;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-right: 20px;
}

.confirm-delete-btn:hover {
  background-color: #177de5;

}

.modal-content {
  background: white;
  padding: 50px;
  border-radius: 8px;
}

.cancel-btn {
  background-color: #ddd;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #ccc;
}

</style>