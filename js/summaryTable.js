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
  let hidden = true;

  summaryToggleBtn.addEventListener("click", () => {
    hidden = !hidden;
    summary.classList.toggle("summary--hidden");
    summaryToggleBtn.textContent = hidden
      ? "Tampilkan Data Pekerja"
      : "Sembunyikan Data Pekerja";
  });
}



