import { useValidationStore } from "@/stores/validation";

export default {
  mounted(el, binding) {
    const validationStore = useValidationStore();
    const field = binding.value;

    updateValidation(el, validationStore.validationErrors[field]);

    const stopWatch = validationStore.$onAction(({ name, args }) => {
      if (name === "setErrors") {
        const [errors] = args;
        if (errors && errors[field]) {
          updateValidation(el, errors[field]);
        }
      } else if (name === "clearErrors") {
        updateValidation(el, null);
      }
    });

    el.__stopValidationWatcher__ = stopWatch;
  },
  updated(el, binding) {
    const validationStore = useValidationStore();
    const field = binding.value;

    updateValidation(el, validationStore.validationErrors[field]);
  },
  unmounted(el) {
    if (el.__stopValidationWatcher__) {
      el.__stopValidationWatcher__();
    }
  },
};

function updateValidation(el, errors) {
  el.classList.toggle("is-invalid", !!errors?.length);

  const errorBlock = el.parentNode.querySelector(".invalid-feedback");
  if (errorBlock) {
    el.parentNode.removeChild(errorBlock);
  }

  if (errors?.length) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback";
    errorDiv.innerHTML = errors.join("<br>");
    el.parentNode.appendChild(errorDiv);
  }
}
