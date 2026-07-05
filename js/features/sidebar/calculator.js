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
  
  let currentResult = 0;
  initCalculatorList(() => currentResult);
  
  renderCalculateTab(jobMap);
  activateFirstTab();

  function calculate() {
    const job = Number(jobInput.value);
    const worker = Number(workerInput.value);
    const activeJob = getActiveJob(jobMap);
    
    currentResult = calculateResult(job, worker, activeJob);
    renderCalculatorOutput(output, currentResult);
    
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












function initCalculatorList(getCurrentResult) {
  const calculations = [];

  const addButton = document.querySelector(".calculator__input-add");
  const resetButton = document.querySelector(".calculator__reset");

  addButton.addEventListener("click", () => {
    const result = getCurrentResult();
  
    if (!result) return;
  
    calculations.push({
      id: Date.now(),
      result
    });
  
    renderCalculationList(calculations);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("calculator__delete")) return;

    const id = Number(e.target.dataset.id);

    const index = calculations.findIndex(item => item.id === id);

    if (index !== -1) {
      calculations.splice(index, 1);
      renderCalculationList(calculations);
    }
  });

  resetButton.addEventListener("click", () => {
    calculations.length = 0;
    renderCalculationList(calculations);
  });
}

function renderCalculationList(calculations) {
  const list = document.querySelector(".calculator__list-main");
  const total = document.querySelector(".calculator__total");

  list.innerHTML = calculations.map(item => `
    <div class="calculator__list-item">
      <input
        type="text"
        class="u-input"
        value="${formatNumber(item.result)}"
        disabled
      >
      <button
        class="calculator__delete u-button"
        data-id="${item.id}">
        Hapus
      </button>
    </div>
  `).join("");

  const sum = calculations.reduce((acc, item) => acc + item.result, 0);
  total.textContent = formatNumber(sum);
}