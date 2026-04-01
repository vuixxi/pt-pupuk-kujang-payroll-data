/***********************
 * 🎮 CONTROLLER
 ***********************/
function handleMain(data, period, workerMap, jobMap) {
   // ambil elemen tbody dan tfoot tabel
   const tbody = document.querySelector(".main tbody");
   const tfoot = document.querySelector(".main tfoot");

   // ambil data periode aktif
   const periodData = data[period];

   // hitung total keseluruhan periode
   const totals = calculateTotals(periodData, jobMap);

   // generate HTML (UI)
   const bodyHTML = createTableBodyRows(periodData.data, workerMap, jobMap);
   const footHTML = createTableFootRows(totals);

   // render ke DOM (UI)
   renderTableBody(tbody, bodyHTML);
   renderTableFoot(tfoot, footHTML);

   // aktifkan interaksi list worker (UI behavior)
   workerListSelection();
}

/***********************
 * 🎨 UI (RENDER + DOM)
 ***********************/

// 🔥 tambahan kecil (biar gak langsung innerHTML di controller)
function renderTableBody(tbody, html) {
   tbody.innerHTML = html;
}

function renderTableFoot(tfoot, html) {
   tfoot.innerHTML = html;
}

function createTableBodyRows(items, workerMap, jobMap) {
   // loop setiap data harian dan ubah jadi row HTML
   return items.map((item, index) => {
      // ⚠️ (MASIH CALL LOGIC - nanti bisa di-inject kalau mau lebih clean)
      const { dailyTotalSalary, dailySalaryPerWorker } = calculateDailySalary(item, jobMap);

      // ambil data job berdasarkan id
      const job = jobMap[item.job] || {};

      // ubah daftar worker jadi string HTML
      const myWorkers = item.workers.map(id => `<span>${workerMap[id] || "Unknown"}</span>`).join(", ");

      // return template row tabel
      return `
         <tr>
            <td>${index + 1}</td>
            <td>${formatDisplayDate(item.date)}</td>
            <td>${job.name || "Unknown"}</td>
            <td>${item.totalProduction} ${job.unit || ""}</td>
            <td class="main__table-workers">
              <div class="main__table-workers-title">${item.workers.length} Orang</div>
              <div class="main__table-workers-list main__table-workers-list--hidden">${myWorkers}</div>
            </td>
            <td class="main__status ${item.paid ? 'main__status-paid' : 'main__status-unpaid'}">
               <span style="background-color:${item.paid ? '#81C784' : '#EF9A9A'};"></span>
            </td>
            <td style="background-color:#BBDEFB;"><strong>${formatNumber(dailyTotalSalary)}</strong></td>
            <td style="background-color:#FFF9C4;"><strong>${formatNumber(dailySalaryPerWorker)}</strong></td>
         </tr>
      `;
   }).join(""); // gabungkan semua row jadi satu string
}

function createTableFootRows(totals) {
   // daftar label dan nilai untuk footer tabel
   const rows = [
      ["Gaji Total", totals.totalSalary, totals.totalSalaryPerWorker],
      ["Sudah Dibayar", totals.paidTotalSalary, totals.paidSalaryPerWorker],
      ["Belum Dibayar", totals.unpaidTotalSalary, totals.unpaidSalaryPerWorker],
      ["Kasbon", totals.totalLoan, totals.loanPerWorker],
      ["Sisa Total", totals.netTotalSalary, totals.netSalaryPerWorker]
   ];

   // ubah jadi HTML row footer
   return rows.map(([label, total, perWorker]) => `
      <tr>
         <td colspan="6" align="right"><strong>${label}</strong></td>
         <td><strong>${formatNumber(total)}</strong></td>
         <td><strong>${formatNumber(perWorker)}</strong></td>
      </tr>
   `).join("");
}

/***********************
 * 🧠 LOGIC (PURE FUNCTION)
 ***********************/

function calculateDailySalary(item, jobMap = {}) {
  // ambil data job
  const job = jobMap[item.job] || {};

  // ambil rate dan total produksi
  const rate = job.rate || 0;
  const production = item.totalProduction || 0;

  // hitung total gaji harian
  const dailyTotalSalary = production * rate;

  // bagi rata ke semua worker
  const dailySalaryPerWorker = item.workers.length
    ? dailyTotalSalary / item.workers.length
    : 0;

  // return hasil perhitungan
  return { dailyTotalSalary, dailySalaryPerWorker };
}

function calculateTotals(periodData, jobMap) {
   // inisialisasi semua total
   const totals = {
      totalSalary: 0,
      totalSalaryPerWorker: 0,
      paidTotalSalary: 0,
      paidSalaryPerWorker: 0,
      unpaidTotalSalary: 0,
      unpaidSalaryPerWorker: 0,
      loanPerWorker: periodData.loanPerWorker,
      totalLoan: periodData.loanPerWorker * periodData.loanWorkers.length,
      netTotalSalary: 0,
      netSalaryPerWorker: 0
   };

   // loop semua data harian
   for (const item of periodData.data) {
      const { dailyTotalSalary, dailySalaryPerWorker } = calculateDailySalary(item, jobMap);

      // akumulasi total
      totals.totalSalary += dailyTotalSalary;
      totals.totalSalaryPerWorker += dailySalaryPerWorker;

      // pisahkan yang sudah dibayar
      if (item.paid) {
         totals.paidTotalSalary += dailyTotalSalary;
         totals.paidSalaryPerWorker += dailySalaryPerWorker;
      }
   }

   // hitung yang belum dibayar
   totals.unpaidTotalSalary = totals.totalSalary - totals.paidTotalSalary;
   totals.unpaidSalaryPerWorker = totals.totalSalaryPerWorker - totals.paidSalaryPerWorker;

   // hitung sisa setelah kasbon dan pembayaran
   totals.netTotalSalary = totals.totalSalary - totals.totalLoan - totals.paidTotalSalary;
   totals.netSalaryPerWorker = totals.totalSalaryPerWorker - totals.loanPerWorker - totals.paidSalaryPerWorker;

   return totals;
}

