// function getData(data, period) {
//   const tbody = document.querySelector(".summary tbody");
//   const tfoot = document.querySelector(".summary tfoot");
//   const tDateTitle = document.querySelector(".summary .summary__table-date-title");
//   const tDate = document.querySelector(".summary .summary__table-date");
   
//   tDateTitle.setAttribute("colspan", data[period].data.length);
//   tDate.innerHTML = data[period].data.map((item) => `<th>${item.shortDate}</th>`).join("");
//   tbody.innerHTML = createSummaryTableBodyRow(data, period);
//   tfoot.innerHTML = createSummaryTableFootRow(data, period);
   
// }

// function createGroupedData(data, period) {
//   const { loanPerWorker, loanWorkers } = data[period];
//   const allWorkers = [...new Set(data[period].data.flatMap(item => item.workers))];
//   const allEntries = [...data[period].data];
   
//   const result = allWorkers.map(worker => {
      
//       const dataPerDay = allEntries.map(item => {
//         const salary = calculateDailySalary(item);
//         const isWorking = item.workers.includes(worker);
         
//         return {
//             shortDate: item.shortDate,
//             dailySalaryPerWorker: isWorking ? salary.dailySalaryPerWorker : 0,
//             dailyTotalSalary: isWorking ? salary.dailyTotalSalary : 0
//         };
//       });
      
//       const totalSalary = dataPerDay.reduce((acc, cur) => acc + cur.dailySalaryPerWorker, 0);
//       const loan = loanWorkers.includes(worker) ? loanPerWorker : 0;
//       const netSalary = totalSalary - loan;
      
//       return {
//         name: worker,
//         totalSalary,
//         loan,
//         netSalary,
//         data: dataPerDay
//       };
//   });
   
//   return result;
// }

// function createSummaryTableBodyRow(data, period, tbody) {
//   const groupedData = createGroupedData(data, period);
//   console.log(groupedData);
   
//   return groupedData.map((worker, index) => {
//       const dailySalaryPerWorker = worker.data.map(item => `<td>${formatNumber(item.dailySalaryPerWorker)}</td>`).join("");
      
//       const totalSalary = worker.totalSalary;
//       const loan = worker.loan;
//       const netSalary = worker.netSalary;
      
//       return `
//         <tr>
//             <td>${index + 1}</td>
//             <td>${worker.name}</td>
//             ${dailySalaryPerWorker}
//             <td style="background-color:#FFCDD2;"><strong>${formatNumber(totalSalary)}</strong></td>
//             <td style="background-color:#C8E6C9;"><strong>${formatNumber(loan)}</strong></td>
//             <td style="background-color:#BBDEFB;"><strong>${formatNumber(netSalary)}</strong></td>
//         </tr>
//       `;
//   }).join("");
// }

// function createSummaryTableFootRow(data, period) {
//   const groupedData = createGroupedData(data, period);
//   const allDates = data[period].data.map(item => item.shortDate);
   
//   const dailyTotals = allDates.map(date => {
//       return groupedData.reduce((acc, worker) => {
//         const dayData = worker.data.find(d => d.shortDate === date);
//         return acc + (dayData ? dayData.dailySalaryPerWorker : 0);
//       }, 0);
//   });
   
//   const grandTotal = dailyTotals.reduce((a, b) => a + b, 0);
//   const totalLoan = groupedData.reduce((a, w) => a + w.loan, 0);
//   const totalNetSalary = groupedData.reduce((a, w) => a + w.netSalary, 0);
//   const dailyCells = dailyTotals.map(total => `<td><strong>${formatNumber(total)}</strong></td>`).join("");
   
//   return `
//       <tr>
//         <td colspan="2" align="right"><strong>Total</strong></td>
//         ${dailyCells}
//         <td><strong>${formatNumber(grandTotal)}</strong></td>
//         <td><strong>${formatNumber(totalLoan)}</strong></td>
//         <td><strong>${formatNumber(totalNetSalary)}</strong></td>
//       </tr>`;
// }

// function setupSummaryToggle() {
//   const summary = document.querySelector(".summary");
//   const summaryToggleBtn = document.querySelector(".summary-toggle__btn");
//   let dataToggle = false;
   
//   summaryToggleBtn.addEventListener("click", () => {
//       let txtContent = dataToggle ? "Tampilkan Data Pekerja" : "Sembunyikan Data Pekerja";
//       dataToggle = !dataToggle;
      
//       summary.classList.toggle("summary--hidden");
//       summaryToggleBtn.textContent = txtContent;
//   });
// }


/* =========================
   MAIN RENDER
========================= */

function getData(data, period) {
  const tbody = document.querySelector(".summary tbody");
  const tfoot = document.querySelector(".summary tfoot");
  const tDateTitle = document.querySelector(".summary .summary__table-date-title");
  const tDate = document.querySelector(".summary .summary__table-date");

  const entries = data[period].data;

  // HEADER
  tDateTitle.setAttribute("colspan", entries.length);
  tDate.innerHTML = entries
    .map(item => `<th>${item.shortDate}</th>`)
    .join("");

  // BODY & FOOTER
  const groupedData = createGroupedData(data, period);

  tbody.innerHTML = createSummaryTableBodyRow(groupedData);
  tfoot.innerHTML = createSummaryTableFootRow(groupedData);
}

/* =========================
   GROUP DATA (INDEX BASED)
========================= */

function createGroupedData(data, period) {
  const { loanPerWorker, loanWorkers } = data[period];
  const entries = data[period].data;
  const allWorkers = [...new Set(entries.flatMap(item => item.workers))];

  return allWorkers.map(worker => {
    const perEntry = entries.map(item => {
      const salary = calculateDailySalary(item);
      return item.workers.includes(worker)
        ? salary.dailySalaryPerWorker
        : 0;
    });

    const totalSalary = perEntry.reduce((a, b) => a + b, 0);
    const loan = loanWorkers.includes(worker) ? loanPerWorker : 0;

    return {
      name: worker,
      salaries: perEntry, // ⬅️ INDEX = KOLOM
      totalSalary,
      loan,
      netSalary: totalSalary - loan
    };
  });
}

/* =========================
   BODY
========================= */

function createSummaryTableBodyRow(groupedData) {
  return groupedData.map((worker, index) => {
    const salaryCells = worker.salaries
      .map(val => `<td>${formatNumber(val)}</td>`)
      .join("");

    return `
      <tr>
        <td>${index + 1}</td>
        <td>${worker.name}</td>
        ${salaryCells}
        <td style="background:#FFCDD2"><strong>${formatNumber(worker.totalSalary)}</strong></td>
        <td style="background:#C8E6C9"><strong>${formatNumber(worker.loan)}</strong></td>
        <td style="background:#BBDEFB"><strong>${formatNumber(worker.netSalary)}</strong></td>
      </tr>
    `;
  }).join("");
}

/* =========================
   FOOTER (INDEX SAFE)
========================= */

function createSummaryTableFootRow(groupedData) {
  if (!groupedData.length) return "";

  const colCount = groupedData[0].salaries.length;

  const columnTotals = Array.from({ length: colCount }, (_, colIdx) =>
    groupedData.reduce((sum, worker) => sum + worker.salaries[colIdx], 0)
  );

  const grandTotal = columnTotals.reduce((a, b) => a + b, 0);
  const totalLoan = groupedData.reduce((a, w) => a + w.loan, 0);
  const totalNetSalary = groupedData.reduce((a, w) => a + w.netSalary, 0);

  const totalCells = columnTotals
    .map(val => `<td><strong>${formatNumber(val)}</strong></td>`)
    .join("");

  return `
    <tr>
      <td colspan="2" align="right"><strong>Total</strong></td>
      ${totalCells}
      <td><strong>${formatNumber(grandTotal)}</strong></td>
      <td><strong>${formatNumber(totalLoan)}</strong></td>
      <td><strong>${formatNumber(totalNetSalary)}</strong></td>
    </tr>
  `;
}

/* =========================
   TOGGLE
========================= */

function setupSummaryToggle() {
  const summary = document.querySelector(".summary");
  const summaryToggleBtn = document.querySelector(".summary-toggle__btn");
  let hidden = false;

  summaryToggleBtn.addEventListener("click", () => {
    hidden = !hidden;
    summary.classList.toggle("summary--hidden");
    summaryToggleBtn.textContent = hidden
      ? "Tampilkan Data Pekerja"
      : "Sembunyikan Data Pekerja";
  });
}