
// =======================
// STATE (GLOBAL)
// =======================
let noticeInterval = null;
let noticeQueue = [];
let lastEmployee = null;


// =======================
// CONTROLLER
// =======================
function getData(data, period, workerMap, jobMap) {
  // ambil elemen tabel summary
  const tbody = document.querySelector(".summary tbody");
  const tfoot = document.querySelector(".summary tfoot");
  const tDateTitle = document.querySelector(".summary .summary__table-date-title");
  const tDate = document.querySelector(".summary .summary__table-date");

  // ambil data harian periode aktif
  const entries = data[period].data;

  // LOGIC
  const groupedData = createGroupedData(data, period, workerMap, jobMap);

  // UI RENDER
  renderDateHeader(tDateTitle, tDate, entries);
  tbody.innerHTML = createSummaryTableBodyRow(groupedData, entries);
  tfoot.innerHTML = createSummaryTableFootRow(groupedData, entries);

  // jalankan notifikasi gaji
  initSalaryNotice(groupedData);
}


// =======================
// LOGIC (PURE)
// =======================
function createGroupedData(data, period, workerMap, jobMap) {

  // ambil data pinjaman dan entries
  const { loanPerWorker, loanWorkers } = data[period];
  const entries = data[period].data;

  // ambil semua worker unik
  const allWorkers = [...new Set(entries.flatMap(item => item.workers))];

  // mapping tiap worker
  return allWorkers.map(workerId => {

    const perEntry = calculateWorkerEntries(entries, workerId, jobMap);

    // total semua gaji
    const totalSalary = sum(perEntry);

    // cek apakah kena kasbon
    const loan = loanWorkers.includes(workerId) ? loanPerWorker : 0;

    // hitung yang sudah dibayar
    const paidAmount = calculatePaidAmount(perEntry, entries);

    // hitung sisa bersih
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


// =======================
// LOGIC HELPERS
// =======================
function calculateWorkerEntries(entries, workerId, jobMap) {
  return entries.map(item => {
    const salary = calculateDailySalary(item, jobMap);
    return item.workers.includes(workerId)
      ? salary.dailySalaryPerWorker
      : 0;
  });
}

function calculatePaidAmount(perEntry, entries) {
  return perEntry.reduce((sum, val, i) => {
    return entries[i].paid ? sum + val : sum;
  }, 0);
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}


// =======================
// UI (RENDER)
// =======================
function renderDateHeader(tDateTitle, tDate, entries) {

  // set colspan sesuai jumlah tanggal
  tDateTitle.setAttribute("colspan", entries.length);

  // render header tanggal
  tDate.innerHTML = entries
    .map(item =>
      `<th class="${item.paid ? "paid" : ""}">
        ${formatShortDate(item.date)}
      </th>`
    )
    .join("");
}


// =======================
// UI (TABLE BODY)
// =======================
function createSummaryTableBodyRow(groupedData, entries) {

  // render baris untuk tiap worker
  return groupedData.map((worker, index) => {

      const salaryCells = renderSalaryCells(worker.salaries, entries);

      const paidAmount = calculatePaidAmount(worker.salaries, entries);
      const unpaidAmount = worker.totalSalary - paidAmount;
      const netSalary = worker.netSalary;

      return `
        <tr>
          <td>${index + 1}</td>
          <td>${worker.name}</td>

          ${salaryCells}

          <td>
            <strong>${formatNumber(worker.totalSalary)}</strong>
          </td>

          <td>
            <strong>${formatNumber(paidAmount)}</strong>
          </td>

          <td>
            <strong>${formatNumber(unpaidAmount)}</strong>
          </td>

          <td>
            <strong>${formatNumber(worker.loan)}</strong>
          </td>

          <td>
            <strong>${formatNumber(netSalary)}</strong>
          </td>
        </tr>
      `;
    })
    .join("");
}


// =======================
// UI (TABLE FOOTER)
// =======================
function createSummaryTableFootRow(groupedData, entries) {

  // kalau tidak ada data, kosongkan
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
    return sum + calculatePaidAmount(worker.salaries, entries);
  }, 0);

  const grandTotal = sum(columnTotals);
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


// =======================
// UI HELPERS
// =======================
function renderSalaryCells(salaries, entries) {
  return salaries
    .map((val, i) => `
      <td style="color:${entries[i].paid ? "#1B5E20" : "inherit"}">
        ${formatNumber(val)}
      </td>
    `)
    .join("");
}


// =======================
// UI INTERACTION
// =======================
function setupSummaryToggle() {

  // ambil elemen summary dan tombol toggle
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
