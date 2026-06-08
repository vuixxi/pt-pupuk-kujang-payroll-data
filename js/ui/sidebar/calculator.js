import { formatNumber } from "./../../utils/format.js";

// =======================
// CONSTANT
// =======================
const RATE = {
  "produksi": 3600,
  "muat": 110000,
  "bongkar": 120000,
  "angkut cacahan lembut": 400,
  "stapel cacahan": 800,
  "stapel coa": 400,
  "stapel produksi": 400,
  "salin": 765,
  "salin timbang": 200000
}


// =======================
// LOGIC (PURE)
// =======================
function calculateResult(job, worker, rate) {
  if (!job || !worker || !rate) return 0;
  return (job * rate) / worker;
}

function getActiveRate() {
  const activeTab = document.querySelector(".calculator__tab.u-button--active");
  if (!activeTab) return 0;

  const key = activeTab.innerText.toLowerCase();
  return RATE[key] || 0;
}


// =======================
// CONTROLLER
// =======================
export function initCalculatorTabs(calculateCallback) {
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("calculator__tab")) return;

    resetTabs();
    activateTab(e.target);

    calculateCallback();
  });
}

export function initCalculator() {
  const jobInput = document.querySelector(".calculator__input-job");
  const workerInput = document.querySelector(".calculator__input-worker");
  const output = document.querySelector(".calculator__output");

  function calculate() {
    const job = Number(jobInput.value);
    const worker = Number(workerInput.value);
    const rate = getActiveRate();

    const result = calculateResult(job, worker, rate);
    renderCalculatorOutput(output, result);
  }

  jobInput.addEventListener("input", calculate);
  workerInput.addEventListener("input", calculate);

  return calculate;
}


// =======================
// UI
// =======================
function renderCalculatorOutput(output, result) {
  output.innerText = result ? formatNumber(result) : "0";
}

function resetTabs() {
  document.querySelectorAll(".calculator__tab").forEach(tab => {
    tab.classList.remove("u-button--active");
    tab.disabled = false;
  });
}

function activateTab(tab) {
  tab.classList.add("u-button--active");
  tab.disabled = true;
}