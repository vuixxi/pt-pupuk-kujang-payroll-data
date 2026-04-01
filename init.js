import { getAppData } from "../data/loader.js";

async function startApp() {
  const appData = await getAppData();

  if (!appData) return;

  const { data, period, workerMap, jobMap } = appData;

  initApp(data, period, workerMap, jobMap);
}

startApp();


function initApp(data, period, workerMap, jobMap) {
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

