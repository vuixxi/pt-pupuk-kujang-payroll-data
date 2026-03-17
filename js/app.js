const myLink = "./json/data.json";

async function loadData() {
  try {
    const res = await fetch(myLink);
    const json = await res.json();

    const workersRes = await fetch("./json/workers.json");
    const workersJson = await workersRes.json();

    // map id -> name
    const workerMap = Object.fromEntries(
      workersJson.data.map(w => [w.id, w.name])
    );

    const data = [];

    for (const p of json.periods) {
      const r = await fetch(`json/${p.file}`);
      const d = await r.json();
      data.push(d);
    }

    const period = data.length - 1;

    getData(data, period, workerMap);
    handleDropDown(data, period, workerMap);
    handleSidebar();
    handleContent();
    handleContentClose();

    const calculate = initCalculator();
    initCalculatorTabs(calculate);

    handleFeedback();
    handleReport();

    handleMain(data, period, workerMap); // ⬅️ kirim workerMap

    setupSummaryToggle();

  } catch (err) {
    console.error("Promise Catch:", err);
  }
}

loadData();