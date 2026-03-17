function handleMain(data, period, workerMap) {
   const tbody = document.querySelector(".main tbody");
   const tfoot = document.querySelector(".main tfoot");

   const totals = calculateTotals(data, period);

   tbody.innerHTML = createTableBodyRow(data, period, workerMap);
   workerListSelection();
   tfoot.innerHTML = createTableFootRow(totals);
}

function createTableBodyRow(data, period, workerMap) {
   return data[period].data.map((item, index) => {

      const { dailyTotalSalary, dailySalaryPerWorker } =
         calculateDailySalary(item);

      const myWorkers = item.workers
         .map(id => `<span>${workerMap[id] || "Unknown"}</span>`)
         .join(", ");

      return `
         <tr>
            <td>${index + 1}</td>
            <td>${formatDisplayDate(item.date)}</td>
            <td>${item.job}</td>
            <td>${item.totalProduction} ${item.type}</td>

            <td class="main__table-workers">
               <div class="main__table-workers-title">
                  ${item.workers.length} Orang
               </div>

               <div class="main__table-workers-list main__table-workers-list--hidden">
                  ${myWorkers}
               </div>
            </td>

            <td class="main__status ${item.paid ? 'main__status-paid' : 'main__status-unpaid'}">
               <span style="background-color:${item.paid ? '#81C784' : '#EF9A9A'};"></span>
            </td>

            <td style="background-color:#BBDEFB;">
               <strong>${formatNumber(dailyTotalSalary)}</strong>
            </td>

            <td style="background-color:#FFF9C4;">
               <strong>${formatNumber(dailySalaryPerWorker)}</strong>
            </td>
         </tr>
      `;
   }).join("");
}

function createTableFootRow(totals) {
   return `
      <tr>
         <td colspan="6" align="right"><strong>Gaji Total</strong></td>
         <td><strong>${formatNumber(totals.totalSalary)}</strong></td>
         <td><strong>${formatNumber(totals.totalSalaryPerWorker)}</strong></td>
      </tr>

      <tr>
         <td colspan="6" align="right"><strong>Sudah Dibayar</strong></td>
         <td><strong>${formatNumber(totals.paidTotalSalary)}</strong></td>
         <td><strong>${formatNumber(totals.paidSalaryPerWorker)}</strong></td>
      </tr>

      <tr>
         <td colspan="6" align="right"><strong>Belum Dibayar</strong></td>
         <td><strong>${formatNumber(totals.unpaidTotalSalary)}</strong></td>
         <td><strong>${formatNumber(totals.unpaidSalaryPerWorker)}</strong></td>
      </tr>

      <tr>
         <td colspan="6" align="right"><strong>Kasbon</strong></td>
         <td><strong>${formatNumber(totals.totalLoan)}</strong></td>
         <td><strong>${formatNumber(totals.loanPerWorker)}</strong></td>
      </tr>

      <tr>
         <td colspan="6" align="right"><strong>Sisa Total</strong></td>
         <td><strong>${formatNumber(totals.netTotalSalary)}</strong></td>
         <td><strong>${formatNumber(totals.netSalaryPerWorker)}</strong></td>
      </tr>
   `;
}

function calculateDailySalary(item) {

   let dailyTotalSalary = 0;
   let dailySalaryPerWorker = 0;

   const RATE = {
      "produksi": 3600,
      "muat": 110000,
      "bongkar": 120000,
      "angkut cacahan lembut": 450,
      "stapel cacahan": 900,
      "stapel coa": 450,
      "stapel produksi": 450,
      "salin": 765,
      "salin timbang": 200000
   };

   dailyTotalSalary = item.totalProduction * (RATE[item.job.toLowerCase()] || 0);
   dailySalaryPerWorker = item.workers.length
      ? dailyTotalSalary / item.workers.length
      : 0;

   return {
      dailyTotalSalary,
      dailySalaryPerWorker
   };
}

function calculateTotals(data, period) {

   let totals = {
      totalSalary: 0,
      totalSalaryPerWorker: 0,
      paidTotalSalary: 0,
      paidSalaryPerWorker: 0,
      unpaidTotalSalary: 0,
      unpaidSalaryPerWorker: 0,
      loanPerWorker: 0,
      totalLoan: 0,
      netTotalSalary: 0,
      netSalaryPerWorker: 0
   };

   data[period].data.forEach(item => {

      const { dailyTotalSalary, dailySalaryPerWorker } =
         calculateDailySalary(item);

      totals.totalSalary += dailyTotalSalary;
      totals.totalSalaryPerWorker += dailySalaryPerWorker;

      if (item.paid) {
         totals.paidTotalSalary += dailyTotalSalary;
         totals.paidSalaryPerWorker += dailySalaryPerWorker;
      }
   });

   totals.loanPerWorker = data[period].loanPerWorker;
   totals.totalLoan = totals.loanPerWorker * data[period].loanWorkers.length;

   totals.unpaidTotalSalary = totals.totalSalary - totals.paidTotalSalary;
   totals.unpaidSalaryPerWorker =
      totals.totalSalaryPerWorker - totals.paidSalaryPerWorker;

   totals.netTotalSalary =
      totals.totalSalary - totals.totalLoan - totals.paidTotalSalary;

   totals.netSalaryPerWorker =
      totals.totalSalaryPerWorker - totals.loanPerWorker - totals.paidSalaryPerWorker;

   return totals;
}