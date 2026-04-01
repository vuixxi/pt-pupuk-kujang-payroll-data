// =======================
// LOGIC (PURE)
// =======================
function isFeedbackValid(criticism, suggestion) {
  return !!(criticism && suggestion);
}


// =======================
// CONTROLLER
// =======================
function handleFeedback() {
  const criticismInput = document.querySelector("#criticism");
  const suggestionInput = document.querySelector("#suggestion");
  const feedbackButton = document.querySelector(".feedback__button");

  function checkInput() {
    const criticism = criticismInput.value.trim();
    const suggestion = suggestionInput.value.trim();

    feedbackButton.disabled = !isFeedbackValid(criticism, suggestion);
  }

  criticismInput.addEventListener("input", checkInput);
  suggestionInput.addEventListener("input", checkInput);

  feedbackButton.addEventListener("click", function () {
    showAlert("Kritik dan Saran anda telah terkirim!");
    resetFeedbackForm(criticismInput, suggestionInput, feedbackButton);
  });

  feedbackButton.disabled = true;
}


// =======================
// UI
// =======================
function resetFeedbackForm(criticismInput, suggestionInput, button) {
  criticismInput.value = "";
  suggestionInput.value = "";
  button.disabled = true;
}