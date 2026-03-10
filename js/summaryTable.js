
let noticeInterval = null;
let noticeQueue = [];
let lastEmployee = null;

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
  // tDate.innerHTML = entries
  //   .map(item => `<th>${item.shortDate}</th>`)
  //   .join("");
  tDate.innerHTML = entries
    .map(item => `
      <th class="${item.paid ? 'paid' : ''}">
        ${item.shortDate}
      </th>
    `)
    .join("");

  // BODY & FOOTER
  const groupedData = createGroupedData(data, period);
  tbody.innerHTML = createSummaryTableBodyRow(groupedData, entries);
  tfoot.innerHTML = createSummaryTableFootRow(groupedData, entries);
  initSalaryNotice(groupedData);
}

/* =========================
   GROUP DATA (INDEX BASED)
========================= */

// function createGroupedData(data, period) {
//   const { loanPerWorker, loanWorkers } = data[period];
//   const entries = data[period].data;
//   const allWorkers = [...new Set(entries.flatMap(item => item.workers))];

//   return allWorkers.map(worker => {
//     const perEntry = entries.map(item => {
//       const salary = calculateDailySalary(item);
//       return item.workers.includes(worker)
//         ? salary.dailySalaryPerWorker
//         : 0;
//     });

//     const totalSalary = perEntry.reduce((a, b) => a + b, 0);
//     const loan = loanWorkers.includes(worker) ? loanPerWorker : 0;

//     return {
//       name: worker,
//       salaries: perEntry, // ⬅️ INDEX = KOLOM
//       totalSalary,
//       loan,
//       netSalary: totalSalary - loan
//     };
//   });
// }

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

    const paidAmount = perEntry.reduce((sum, val, i) => {
      return entries[i].paid ? sum + val : sum;
    }, 0);

    const netSalary = totalSalary - loan - paidAmount;

    return {
      name: worker,
      salaries: perEntry,
      totalSalary,
      loan,
      paidAmount,
      netSalary
    };
  });
}


/* =========================
   BODY
========================= */
function createSummaryTableBodyRow(groupedData, entries) {
  return groupedData.map((worker, index) => {

    const salaryCells = worker.salaries
      .map((val, i) => `
        <td style="color:${entries[i].paid ? '#1B5E20' : 'inherit'}">
          ${formatNumber(val)}
        </td>
      `)
      .join("");

    const paidAmount = worker.salaries.reduce((sum, val, i) => {
      return entries[i].paid ? sum + val : sum;
    }, 0);

    const netSalary = worker.netSalary;
    // const netSalary = worker.totalSalary - worker.loan - paidAmount;

    return `
      <tr>
        <td>${index + 1}</td>
        <td>${worker.name}</td>
        ${salaryCells}
        <td style="background:#FFCDD2"><strong>${formatNumber(worker.totalSalary)}</strong></td>
        <td style="background:#FFF9C4"><strong>${formatNumber(worker.loan)}</strong></td>
        <td style="background:#C8E6C9"><strong>${formatNumber(paidAmount)}</strong></td>
        <td style="background:#BBDEFB"><strong>${formatNumber(netSalary)}</strong></td>
      </tr>
    `;
  }).join("");
}
/* =========================
   FOOTER (INDEX SAFE)
========================= */
function createSummaryTableFootRow(groupedData, entries) {
  if (!groupedData.length) return "";

  const colCount = groupedData[0].salaries.length;

  const columnTotals = Array.from({ length: colCount }, (_, colIdx) =>
    groupedData.reduce((sum, worker) => sum + worker.salaries[colIdx], 0)
  );

  const totalPaid = groupedData.reduce((sum, worker) => {
    const paid = worker.salaries.reduce((s, val, i) => {
      return entries[i].paid ? s + val : s;
    }, 0);
    return sum + paid;
  }, 0);

  const grandTotal = columnTotals.reduce((a, b) => a + b, 0);
  const totalLoan = groupedData.reduce((a, w) => a + w.loan, 0);

  // PERBAIKAN DI SINI
  const totalNetSalary = grandTotal - totalLoan - totalPaid;

  const totalCells = columnTotals
    .map((val, i) => `
      <td class="${entries[i].paid ? 'paid' : ''}">
        <strong>${formatNumber(val)}</strong>
      </td>
    `)
    .join("");

  return `
    <tr>
      <td colspan="2" align="right"><strong>Total</strong></td>
      ${totalCells}
      <td><strong>${formatNumber(grandTotal)}</strong></td>
      <td><strong>${formatNumber(totalLoan)}</strong></td>
      <td><strong>${formatNumber(totalPaid)}</strong></td>
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
  let hidden = true;

  summaryToggleBtn.addEventListener("click", () => {
    hidden = !hidden;
    summary.classList.toggle("summary--hidden");
    summaryToggleBtn.textContent = hidden
      ? "Tampilkan Data Pekerja"
      : "Sembunyikan Data Pekerja";
  });
}



