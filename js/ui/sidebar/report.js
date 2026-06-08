import { showAlert } from "./ui.js";

// =======================
// LOGIC (PURE)
// =======================
function isReportValid(report) {
  return !!report;
}


// =======================
// CONTROLLER
// =======================
export function handleReport() {
  const reportInput = document.querySelector("#reportInput");
  const reportButton = document.querySelector(".report__button");

  function checkInput() {
    const report = reportInput.value.trim();
    reportButton.disabled = !isReportValid(report);
  }

  reportInput.addEventListener("input", checkInput);

  reportButton.addEventListener("click", function () {
    showAlert("Laporan anda telah terkirim!");
    resetReportForm(reportInput, reportButton);
  });

  reportButton.disabled = true;
}


// =======================
// UI
// =======================
function resetReportForm(input, button) {
  input.value = "";
  button.disabled = true;
}