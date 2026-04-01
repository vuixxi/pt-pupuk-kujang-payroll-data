function initSalaryNotice(groupedData){

  // ambil nama dan gaji bersih tiap worker
  const employees = groupedData.map(w => ({
    name: w.name,
    salary: w.netSalary
  }));

  const noticeText = document.querySelector(".js-notice-text");

  // reset antrian dan data terakhir
  noticeQueue = [];
  lastEmployee = null;

  // hentikan interval sebelumnya jika ada
  if (noticeInterval) {
    clearInterval(noticeInterval);
  }

  // jalankan pertama kali
  runNotice(employees, noticeText);

  // ulangi setiap 5 detik
  noticeInterval = setInterval(() => {
    runNotice(employees, noticeText);
  }, 5000);
}


// =======================
// CONTROLLER
// =======================
function runNotice(employees, noticeText){

  hideNotice(noticeText);

  setTimeout(() => {

    const emp = getNextEmployee(employees);
    const amount = generateRandomAmount(emp.salary);
    const text = formatNoticeText(emp.name, amount);

    showNotice(noticeText, text);

  }, 1000);
}


// =======================
// LOGIC (PURE)
// =======================
function shuffle(array){
  const arr = [...array];

  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function getNextEmployee(employees){

  if(noticeQueue.length === 0){

    do{
      noticeQueue = shuffle(employees);
    }
    while(lastEmployee && noticeQueue[0].name === lastEmployee.name);

  }

  const emp = noticeQueue.shift();
  lastEmployee = emp;

  return emp;
}

function generateRandomAmount(baseSalary){
  const multiplier = (Math.floor(Math.random() * 10) + 1) * 10;
  // return baseSalary * multiplier;
  return baseSalary;
}

function formatNoticeText(name, amount){
  return `${name} telah berhasil WD sebesar Rp. ${formatNumber(amount)}`;
}


// =======================
// UI
// =======================
function hideNotice(el){
  el.classList.add("is-hidden");
}

function showNotice(el, text){
  el.textContent = text;
  el.classList.remove("is-hidden");
}