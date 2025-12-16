const myLink = "json/data.json";

async function loadData() {
  try {
    const res = await fetch(myLink);
    const json = await res.json();
    
    // data TETAP ARRAY (seperti dulu)
    const data = [];
    
    for (const p of json.periods) {
      const r = await fetch(`json/${p.file}`);
      const d = await r.json();
      data.push(d);
    }
    
    // period TETAP LOGIKA LAMA
    const period = data.length - 1;
    
    getData(data, period);
    handleDropDown(data, period);
    handleMain(data, period);
    setupSummaryToggle();
    
  } catch (err) {
    console.error("Promise Catch:", err);
  }
}

loadData();