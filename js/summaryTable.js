function getData(data, period) {
   const tbody = document.querySelector(".summary tbody");
   const tfoot = document.querySelector(".summary tfoot");
   const tDateTitle = document.querySelector(".summary .summary__table-date-title");
   const tDate = document.querySelector(".summary .summary__table-date");
   
   tDateTitle.setAttribute("colspan", data[period].data.length);
   tDate.innerHTML = data[period].data.map((item) => `<th>${item.shortDate}</th>`).join("");
   tbody.innerHTML = createSummaryTableBodyRow(data, period);
   tfoot.innerHTML = createSummaryTableFootRow(data, period);
   
}

function createGroupedData(data, period) {
   const { loanPerWorker, loanWorkers } = data[period];
   const allWorkers = [...new Set(data[period].data.flatMap(item => item.workers))];
   const allEntries = [...data[period].data];
   
   const result = allWorkers.map(worker => {
      
      const dataPerDay = allEntries.map(item => {
         const salary = calculateDailySalary(item);
         const isWorking = item.workers.includes(worker);
         
         return {
            shortDate: item.shortDate,
            dailySalaryPerWorker: isWorking ? salary.dailySalaryPerWorker : 0,
            dailyTotalSalary: isWorking ? salary.dailyTotalSalary : 0
         };
      });
      
      const totalSalary = dataPerDay.reduce((acc, cur) => acc + cur.dailySalaryPerWorker, 0);
      const loan = loanWorkers.includes(worker) ? loanPerWorker : 0;
      const netSalary = totalSalary - loan;
      
      return {
         name: worker,
         totalSalary,
         loan,
         netSalary,
         data: dataPerDay
      };
   });
   
   return result;
}

function createSummaryTableBodyRow(data, period, tbody) {
   const groupedData = createGroupedData(data, period);
   console.log(groupedData);
   
   return groupedData.map((worker, index) => {
      const dailySalaryPerWorker = worker.data.map(item => `<td>${formatNumber(item.dailySalaryPerWorker)}</td>`).join("");
      
      const totalSalary = worker.totalSalary;
      const loan = worker.loan;
      const netSalary = worker.netSalary;
      
      return `
         <tr>
            <td>${index + 1}</td>
            <td>${worker.name}</td>
            ${dailySalaryPerWorker}
            <td style="background-color:#FFCDD2;"><strong>${formatNumber(totalSalary)}</strong></td>
            <td style="background-color:#C8E6C9;"><strong>${formatNumber(loan)}</strong></td>
            <td style="background-color:#BBDEFB;"><strong>${formatNumber(netSalary)}</strong></td>
         </tr>
      `;
   }).join("");
}

function createSummaryTableFootRow(data, period) {
   const groupedData = createGroupedData(data, period);
   const allDates = data[period].data.map(item => item.shortDate);
   
   const dailyTotals = allDates.map(date => {
      return groupedData.reduce((acc, worker) => {
         const dayData = worker.data.find(d => d.shortDate === date);
         return acc + (dayData ? dayData.dailySalaryPerWorker : 0);
      }, 0);
   });
   
   const grandTotal = dailyTotals.reduce((a, b) => a + b, 0);
   const totalLoan = groupedData.reduce((a, w) => a + w.loan, 0);
   const totalNetSalary = groupedData.reduce((a, w) => a + w.netSalary, 0);
   const dailyCells = dailyTotals.map(total => `<td><strong>${formatNumber(total)}</strong></td>`).join("");
   
   return `
      <tr>
         <td colspan="2" align="right"><strong>Total</strong></td>
         ${dailyCells}
         <td><strong>${formatNumber(grandTotal)}</strong></td>
         <td><strong>${formatNumber(totalLoan)}</strong></td>
         <td><strong>${formatNumber(totalNetSalary)}</strong></td>
      </tr>`;
}

function setupSummaryToggle() {
   const summary = document.querySelector(".summary");
   const summaryToggleBtn = document.querySelector(".summary-toggle__btn");
   let dataToggle = false;
   
   summaryToggleBtn.addEventListener("click", () => {
      let txtContent = dataToggle ? "Tampilkan Data Pekerja" : "Sembunyikan Data Pekerja";
      dataToggle = !dataToggle;
      
      summary.classList.toggle("summary--hidden");
      summaryToggleBtn.textContent = txtContent;
   });
}
