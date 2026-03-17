let noticeInterval = null;
let noticeQueue = [];
let lastEmployee = null;

function getData(data, period, workerMap) {
  const tbody = document.querySelector(".summary tbody");
  const tfoot = document.querySelector(".summary tfoot");
  const tDateTitle = document.querySelector(".summary .summary__table-date-title");
  const tDate = document.querySelector(".summary .summary__table-date");

  const entries = data[period].data;

  // HEADER
  tDateTitle.setAttribute("colspan", entries.length);

  tDate.innerHTML = entries
    .map(item => `
      <th class="${item.paid ? "paid" : ""}">
        ${formatShortDate(item.date)}
      </th>
    `)
    .join("");

  // BODY & FOOTER
  const groupedData = createGroupedData(data, period, workerMap);

  tbody.innerHTML = createSummaryTableBodyRow(groupedData, entries);
  tfoot.innerHTML = createSummaryTableFootRow(groupedData, entries);

  initSalaryNotice(groupedData);
}

function createGroupedData(data, period, workerMap) {

  const { loanPerWorker, loanWorkers } = data[period];
  const entries = data[period].data;

  const allWorkers = [...new Set(entries.flatMap(item => item.workers))];

  return allWorkers.map(workerId => {

    const perEntry = entries.map(item => {

      const salary = calculateDailySalary(item);

      return item.workers.includes(workerId)
        ? salary.dailySalaryPerWorker
        : 0;

    });

    const totalSalary = perEntry.reduce((a, b) => a + b, 0);

    const loan = loanWorkers.includes(workerId)
      ? loanPerWorker
      : 0;

    const paidAmount = perEntry.reduce((sum, val, i) => {
      return entries[i].paid ? sum + val : sum;
    }, 0);

    const netSalary = totalSalary - loan - paidAmount;

    return {
      id: workerId,
      name: workerMap[workerId] || "Unknown",
      salaries: perEntry,
      totalSalary,
      loan,
      paidAmount,
      netSalary
    };

  });
}

function createSummaryTableBodyRow(groupedData, entries) {
  return groupedData
    .map((worker, index) => {

      const salaryCells = worker.salaries
        .map((val, i) => `
          <td style="color:${entries[i].paid ? "#1B5E20" : "inherit"}">
            ${formatNumber(val)}
          </td>
        `)
        .join("");

      const paidAmount = worker.salaries.reduce((sum, val, i) => {
        return entries[i].paid ? sum + val : sum;
      }, 0);

      const unpaidAmount = worker.totalSalary - paidAmount;
      const netSalary = worker.netSalary;

      return `
        <tr>
          <td>${index + 1}</td>
          <td>${worker.name}</td>

          ${salaryCells}

          <td style="background:#BBDEFB">
            <strong>${formatNumber(worker.totalSalary)}</strong>
          </td>

          <td style="background:#C8E6C9">
            <strong>${formatNumber(paidAmount)}</strong>
          </td>

          <td style="background:#FFCDD2">
            <strong>${formatNumber(unpaidAmount)}</strong>
          </td>

          <td style="background:#FFE0B2">
            <strong>${formatNumber(worker.loan)}</strong>
          </td>

          <td style="background:#FFF9C4">
            <strong>${formatNumber(netSalary)}</strong>
          </td>
        </tr>
      `;
    })
    .join("");
}

function createSummaryTableFootRow(groupedData, entries) {
  if (!groupedData.length) return "";

  const colCount = groupedData[0].salaries.length;

  const columnTotals = Array.from(
    { length: colCount },
    (_, colIdx) =>
      groupedData.reduce(
        (sum, worker) => sum + worker.salaries[colIdx],
        0
      )
  );

  const totalPaid = groupedData.reduce((sum, worker) => {
    const paid = worker.salaries.reduce((s, val, i) => {
      return entries[i].paid ? s + val : s;
    }, 0);

    return sum + paid;
  }, 0);

  const grandTotal = columnTotals.reduce((a, b) => a + b, 0);
  const totalLoan = groupedData.reduce((a, w) => a + w.loan, 0);

  const totalUnpaid = grandTotal - totalPaid;
  const totalNetSalary = grandTotal - totalLoan - totalPaid;

  const totalCells = columnTotals
    .map((val, i) => `
      <td class="${entries[i].paid ? "paid" : ""}">
        <strong>${formatNumber(val)}</strong>
      </td>
    `)
    .join("");

  return `
    <tr>
      <td colspan="2" align="right">
        <strong>Total</strong>
      </td>

      ${totalCells}

      <td><strong>${formatNumber(grandTotal)}</strong></td>
      <td><strong>${formatNumber(totalPaid)}</strong></td>
      <td><strong>${formatNumber(totalUnpaid)}</strong></td>
      <td><strong>${formatNumber(totalLoan)}</strong></td>
      <td><strong>${formatNumber(totalNetSalary)}</strong></td>
    </tr>
  `;
}

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