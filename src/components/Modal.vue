<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modalId: {
    type: String,
    default: 'modalId',
  },
  modalTitle: {
    type: String,
    default: 'Modal Title',
  },
  sucessBtn: {
    type: String,
    default: 'Save',
  },
});

defineEmits(['modalSuccessClick']);
</script>

<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}Label`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`${modalId}Label`">{{ modalTitle }}</h5>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-success" @click="$emit('modalSuccessClick')">{{ sucessBtn }}</button>
        </div>
      </div>
    </div>
  </div>
</template>