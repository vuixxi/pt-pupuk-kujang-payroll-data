import { showModal } from "./modal.js";

export const modal = {
  success(message, title = "Berhasil") {
    showModal({
      type: "success",
      title,
      message,
    });
  },

  error(message, title = "Error") {
    showModal({
      type: "error",
      title,
      message,
    });
  },

  warning(message, title = "Perhatian") {
    showModal({
      type: "warning",
      title,
      message,
    });
  },

  confirm(message, onConfirm, options = {}) {
    showModal({
      type: "confirm",
      message,
      onConfirm,
      ...options,
    });
  },
};