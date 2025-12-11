function handleMain(data, period) {
   const tbody = document.querySelector(".main tbody");
   const tfoot = document.querySelector(".main tfoot");
   const totals = calculateTotals(data, period);
   tbody.innerHTML = createTableBodyRow(data, period, tbody);
   workerListSelection();
   tfoot.innerHTML = createTableFootRow(totals);
}

function createTableBodyRow(data, period, tbody) {
   return data[period].data.map((item, index) => {
      const {dailyTotalSalary, dailySalaryPerWorker} = calculateDailySalary(item);
      
      const myWorkers = item.workers.map(worker => `<span>${worker}</span>`).join(", ");
      
      return `
         <tr>
            <td>${index + 1}</td>
            <td>${item.date}</td>
            <td>${item.job}</td>
            <td>${item.totalProduction} ${item.type}</td>
            <td class="main__table-workers">
               <div class="main__table-workers-title">${item.workers.length} Orang</div>
               <div class="main__table-workers-list main__table-workers-list--hidden">${myWorkers}</div>
            </td>
            <td style="background-color:#FFCDD2;"><strong>${formatNumber(dailyTotalSalary)}</strong></td>
            <td style="background-color:#BBDEFB;"><strong>${formatNumber(dailySalaryPerWorker)}</strong></td>
         </tr>
   `}).join("");
}

function createTableFootRow(totals) {
   return `
         <tr>
            <td colspan="5" align="right"><strong>Gaji Total</strong></td>
            <td><strong>${formatNumber(totals.totalSalary)}</strong></td>
            <td><strong>${formatNumber(totals.totalSalaryPerWorker)}</strong></td>
         </tr>
         <tr>
            <td colspan="5" align="right"><strong>Kasbon</strong></td>
            <td><strong>${formatNumber(totals.totalLoan)}</strong></td>
            <td><strong>${formatNumber(totals.loanPerWorker)}</strong></td>
         </tr>
         <tr>
            <td colspan="5" align="right"><strong>Sisa Total</strong></td>
            <td><strong>${formatNumber(totals.netTotalSalary)}</strong></td>
            <td><strong>${formatNumber(totals.netSalaryPerWorker)}</strong></td>
         </tr>
   `;
}

function calculateDailySalary(item) {
   let dailyTotalSalary = 0;
   let dailySalaryPerWorker = 0;
   const RATE = {
      "produksi": 45 * 80,
      "muat": 110000,
      "bongkar": 120000,
      "angkut cacahan lembut": 400,
      "stapel cacahan": 400,
      "stapel coa": 400
   };
   
   dailyTotalSalary = item.totalProduction * (RATE[item.job.toLowerCase()] || 0);
   dailySalaryPerWorker = dailyTotalSalary / item.workers.length;
   
   return {dailyTotalSalary, dailySalaryPerWorker};
}

function calculateTotals(data, period) {
   let totals = {
      totalSalary: 0,
      totalSalaryPerWorker: 0,
      loanPerWorker: 0,
      totalLoan: 0,
      netTotalSalary: 0,
      netSalaryPerWorker: 0
   }
   
   data[period].data.forEach(item => {
      const {dailyTotalSalary, dailySalaryPerWorker} = calculateDailySalary(item);
      totals.totalSalary += dailyTotalSalary;
      totals.totalSalaryPerWorker += dailySalaryPerWorker;
   });
   
   totals.loanPerWorker = data[period].loanPerWorker;
   totals.totalLoan = totals.loanPerWorker * data[period].loanWorkers.length;
   totals.netTotalSalary = totals.totalSalary - totals.totalLoan;
   totals.netSalaryPerWorker = totals.totalSalaryPerWorker - totals.loanPerWorker;
   
   return totals;
}
