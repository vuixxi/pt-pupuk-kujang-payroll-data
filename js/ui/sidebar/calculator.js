import { formatNumber } from "./../../utils/format.js";

// =======================
// LOGIC (PURE)
// =======================
function calculateResult(job, worker, rate) {
  if (!job || !worker || !rate) return 0;
  return (job * rate) / worker;
}

function getActiveRate(jobMap) {
  const activeTab = document.querySelector(".calculator__tab.u-button--active");
  if (!activeTab) return 0;
  
  const jobId =activeTab.dataset.jobId;
  
  return jobMap[jobId].rate || 0;
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

export function initCalculator(jobMap) {
  const jobInput = document.querySelector(".calculator__input-job");
  const workerInput = document.querySelector(".calculator__input-worker");
  const output = document.querySelector(".calculator__output");
  
  renderCalculatorTab(jobMap);

  function calculate() {
    const job = Number(jobInput.value);
    const worker = Number(workerInput.value);
    const rate = getActiveRate(jobMap);

    const result = calculateResult(job, worker, rate);
    renderCalculatorOutput(output, result);
  }

  jobInput.addEventListener("input", calculate);
  workerInput.addEventListener("input", calculate);

  return calculate;
}


// new
function renderCalculatorTab(jobMap) {
  let nav = document.querySelector(".calculator__navbar");
  Object.values(jobMap).forEach(job => {
    nav.innerHTML += `<button class="calculator__tab u-button" data-job-id="${job.id}">${job.name}</button>`;
  });
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