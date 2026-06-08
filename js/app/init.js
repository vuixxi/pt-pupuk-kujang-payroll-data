import { security } from "./../ui/security.js";
import { getAppData } from "./../data/loader.js";
import { handleSidebar, handleContent, handleContentClose } from "./../ui/sidebar/index.js";
import { initCalculatorTabs, initCalculator } from "./../ui/sidebar/calculator.js";
import { handleFeedback } from "./../ui/sidebar/feedback.js";
import { handleReport } from "./../ui/sidebar/report.js";
import { getData, setupSummaryToggle } from "./../ui/summaryTable.js";
import { handleDropDown } from "./../ui/dropdown.js";
import { handleMain } from "./../ui/mainTable.js";

async function startApp() {
  const appData = await getAppData();

  if (!appData) return;

  const { data, period, workerMap, jobMap } = appData;

  initApp(data, period, workerMap, jobMap);
}

startApp();


function initApp(data, period, workerMap, jobMap) {
  
  security();
  
  getData(data, period, workerMap, jobMap);
  handleDropDown(data, period, workerMap, jobMap);
  
  handleSidebar();
  handleContent();
  handleContentClose();
  const calculate = initCalculator();
  initCalculatorTabs(calculate);
  handleFeedback();
  handleReport();

  handleMain(data, period, workerMap, jobMap);
  setupSummaryToggle();
}
