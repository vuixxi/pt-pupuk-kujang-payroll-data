// function initSalaryNotice(groupedData) {

//   const employees = groupedData.map(w => ({
//     name: w.name,
//     salary: w.netSalary
//   }));

//   const noticeText = document.querySelector(".js-notice-text");

//   let queue = [];
//   let lastEmployee = null;

//   function shuffle(array){
//     const arr = [...array];

//     for(let i = arr.length - 1; i > 0; i--){
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }

//     return arr;
//   }

//   function getNextEmployee(){

//     if(queue.length === 0){

//       do{
//         queue = shuffle(employees);
//       } 
//       while(lastEmployee && queue[0].name === lastEmployee.name);

//     }

//     const emp = queue.shift();
//     lastEmployee = emp;

//     return emp;
//   }

//   function updateNotice(){

//     noticeText.classList.add("is-hidden");

//     setTimeout(() => {

//       const emp = getNextEmployee();

//       noticeText.textContent =
//         `${emp.name} telah WD sebesar ${formatNumber(emp.salary)}`;

//       noticeText.classList.remove("is-hidden");

//     }, 1000);
//   }

//   updateNotice();
//   setInterval(updateNotice, 5000);
// }

function initSalaryNotice(groupedData){

  const employees = groupedData.map(w => ({
    name: w.name,
    salary: w.netSalary
  }));

  const noticeText = document.querySelector(".js-notice-text");

  // reset state
  noticeQueue = [];
  lastEmployee = null;

  // stop interval lama
  if (noticeInterval) {
    clearInterval(noticeInterval);
  }
  
  function shuffle(array){
    const arr = [...array];

    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  function getNextEmployee(){

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

  function updateNotice(){

    noticeText.classList.add("is-hidden");

    setTimeout(() => {
      
      // let r = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      // let r = (Math.floor(Math.random() * 10) + 1) * 10;
      let r = 1;
      
      const emp = getNextEmployee();

      noticeText.textContent =
        `${emp.name} telah berhasil WD sebesar Rp. ${formatNumber(emp.salary * r)}`;

      noticeText.classList.remove("is-hidden");

    }, 1000);
  }

  updateNotice();

  noticeInterval = setInterval(updateNotice, 5000);
}