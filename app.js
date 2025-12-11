const myUrl = "https://raw.githubusercontent.com/vuixxi/pt-pupuk-kujang-payroll-data/53461771343a884084593f43d6a5237b85a6ef57/data.json";
const myLink = "json/data.json";

async function loadData() {
   try {
      const res = await fetch(myLink);
      const data = await res.json();
      const period = data.length - 1;
      
      getData(data, period);
      handleDropDown(data, period);
      handleMain(data, period);
      setupSummaryToggle();
      
   } catch (err) {
      console.error('Promise Catch:', err);
   }
}

loadData();