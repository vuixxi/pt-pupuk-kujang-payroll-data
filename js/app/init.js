import { loadAppComponents } from "./components.js";
import { getAppData } from "./../services/loader.js";

import { security } from "./../features/auth/login.js";

import { handleDropDown } from "./../features/period/dropdown.js";
import { handleMain } from "./../features/payroll/mainTable.js";
import { getData, setupSummaryToggle } from "./../features/payroll/summaryTable.js";

import { initSidebar } from "./../features/sidebar/index.js";

import { initFooterVersion } from "./../features/ui/footerVersion.js";
import { modal } from "./../features/ui/modal/index.js";

async function startApp() {
  try {
    await loadAppComponents();

    const appData = await getAppData();
    if (!appData) return;

    const { data, period, workerMap, jobMap } = appData;
    initApp(data, period, workerMap, jobMap);
    
  } catch (error) {
    console.error("Gagal memuat aplikasi:", error);
    modal.error("Gagal memuat komponen aplikasi. Halaman akan dimuat ulang.")
    window.location.reload();
  }
}


function initApp(data, period, workerMap, jobMap) {
  
  security(jobMap);
  
  getData(data, period, workerMap, jobMap);
  handleDropDown(data, period, workerMap, jobMap);
  
  initSidebar(jobMap);
  
  handleMain(data, period, workerMap, jobMap);
  setupSummaryToggle();
  
  initFooterVersion();
}

document.addEventListener("DOMContentLoaded", () => {
  startApp();
});