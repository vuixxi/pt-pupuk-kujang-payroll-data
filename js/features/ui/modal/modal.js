// export function showModal({ title, message, onConfirm, onCancel }) {
//   const modal = document.createElement("div");
//   modal.className = "modal-overlay";

//   modal.innerHTML = `
//     <div class="modal">
//       <h3 class="modal__title">${title}</h3>
//       <p class="modal__message">${message}</p>
//       <div class="modal__actions">
//         <button class="modal__cancel-btn u-button">Cancel</button>
//         <button class="modal__confirm-btn u-button">OK</button>
//       </div>
//     </div>
//   `;

//   document.body.appendChild(modal);

//   modal.querySelector(".modal__cancel-btn").onclick = () => {
//     modal.remove();
//     onCancel?.();
//   };

//   modal.querySelector(".modal__confirm-btn").onclick = () => {
//     modal.remove();
//     onConfirm?.();
//   };
// }

import { icons } from "./icons.js";

let activeModal = null;
let activeCloseModal = null;
let isClosingFromHistory = false;

window.addEventListener("popstate", () => {
  if (!activeModal || !activeCloseModal) return;

  isClosingFromHistory = true;

  const isConfirm = activeModal.__type === "confirm";

  if (isConfirm) {
    activeModal.__onCancel?.();
  }

  activeCloseModal(false);
});

export function showModal({
  type = "success",
  title = "",
  message = "",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm = null,
  onCancel = null,
}) {
  if (activeModal) {
    activeCloseModal?.(false);
  }
  
  document.body.style.overflow = "hidden";
  
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const isConfirm = type === "confirm";

  overlay.innerHTML = `
    <div class="modal modal--${type}">
      <div class="modal__icon u-icon">
        ${icons[type] || "ℹ️"}
      </div>

      <h3 class="modal__title">
        ${title}
      </h3>

      <p class="modal__message">
        ${message}
      </p>

      <div class="modal__actions">
        ${
          isConfirm
            ? `<button class="modal__btn modal__btn--secondary u-button u-button-secondary">${cancelText}</button>`
            : ""
        }

        <button class="modal__btn modal__btn--primary u-button u-button-primary">
          ${confirmText}
        </button>
      </div>
    </div>
  `;

  overlay.__type = type;
  overlay.__onCancel = onCancel;

  document.body.appendChild(overlay);

  activeModal = overlay;

  history.pushState(
    {
      modal: true,
      timestamp: Date.now(),
    },
    "",
    location.href
  );

  const handleEsc = (e) => {
    if (e.key !== "Escape") return;

    if (isConfirm) {
      onCancel?.();
    }

    closeModal();
  };

  document.addEventListener("keydown", handleEsc);

  const closeModal = (updateHistory = true) => {
    if (!activeModal) return;
    
    document.body.style.overflow = "";
    overlay.classList.add("closing");

    document.removeEventListener("keydown", handleEsc);

    overlay.addEventListener("animationend", () => {
        overlay.remove();

        if (activeModal === overlay) {
          activeModal = null;
          activeCloseModal = null;
        }
      },
      { once: true }
    );

    if (
      updateHistory &&
      !isClosingFromHistory &&
      history.state?.modal
    ) {
      history.back();
    }

    isClosingFromHistory = false;
  };

  activeCloseModal = closeModal;

  overlay.addEventListener("click", (e) => {
    if (e.target !== overlay) return;

    if (isConfirm) {
      onCancel?.();
    }

    closeModal();
  });

  const primaryBtn = overlay.querySelector(".modal__btn--primary");

  primaryBtn.addEventListener("click", () => {
    onConfirm?.();
    closeModal();
  });

  if (isConfirm) {
    const secondaryBtn = overlay.querySelector(".modal__btn--secondary");

    secondaryBtn.addEventListener("click", () => {
      onCancel?.();
      closeModal();
    });
  }
}