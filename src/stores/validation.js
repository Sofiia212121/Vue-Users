import { defineStore } from "pinia";

export const useValidationStore = defineStore("validation", {
  state: () => ({
    validationErrors: {},
  }),

  actions: {
    setErrors(errors) {
      this.validationErrors = errors;
    },

    clearErrors() {
      this.validationErrors = {};
    },
  },
});
