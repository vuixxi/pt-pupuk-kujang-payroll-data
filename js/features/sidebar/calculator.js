import { formatNumber } from "./../../shared/utils/format.js";

// =======================
// LOGIC (PURE)
// =======================
function calculateResult(job, worker, activeJob) {
  if (!activeJob) return 0;

  if (activeJob.type === "per_unit") {
    if (!job || !worker) return 0;

    return (job * activeJob.rate) / worker;
  }

  if (activeJob.type === "per_worker") {
    if (!job) return 0;

    return job * activeJob.rate;
  }

  return 0;
}

function getActiveJob(jobMap) {
  const activeTab = document.querySelector(".calculator__tab.u-button--active");
  
  if (!activeTab) return 0;
  
  const jobId = activeTab.dataset.jobId;
  const activeJob = jobMap[jobId];
  
  return activeJob;
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
  
  renderCalculateTab(jobMap);
  activateFirstTab();

  function calculate() {
    const job = Number(jobInput.value);
    const worker = Number(workerInput.value);
    const activeJob = getActiveJob(jobMap);
    
    const result = calculateResult(job, worker, activeJob);
    renderCalculatorOutput(output, result);
    
  }

  jobInput.addEventListener("input", calculate);
  workerInput.addEventListener("input", calculate);

  return calculate;
}




// =======================
// UI
// =======================
function calculateTab(jobMap) {
  return Object.values(jobMap).map(job =>`<button class="calculator__tab u-button" data-job-id="${job.id}">${job.name}</button>`).join("");
}

function renderCalculateTab(jobMap) {
  document.querySelector(".calculator__navbar").innerHTML = calculateTab(jobMap);
}

function renderCalculatorOutput(output, result) {
  output.innerText = result ? formatNumber(result) : "0";
}

function resetTabs() {
  document.querySelectorAll(".calculator__tab").forEach(tab => {
    tab.classList.remove("u-button--active");
    tab.disabled = false;
  });
}

function activateFirstTab() {
  const firstTab = document.querySelector(".calculator__tab");

  if (!firstTab) return;

  activateTab(firstTab);
}

function activateTab(tab) {
  tab.classList.add("u-button--active");
  tab.disabled = true;
}