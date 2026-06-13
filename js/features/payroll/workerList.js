// =======================
// CONTROLLER (ENTRY)
// =======================
export function workerListSelection() {
   const mainTableWorkers = document.querySelectorAll(".main__table-workers");
   const mainTableWorkersLists = document.querySelectorAll(".main__table-workers-list");
   
   mainTableWorkers.forEach(item => {
      item.addEventListener("click", (e) => handleWorkerClick(e, mainTableWorkersLists));
   });
   
   document.addEventListener("click", (e) => handleOutsideClick(e, mainTableWorkersLists));
}


// =======================
// CONTROLLER
// =======================
function handleWorkerClick(e, allLists) {

   if (!e.target.classList.contains("main__table-workers-title")) return;

   const title = e.target;
   const list = title.nextElementSibling;

   const isOpen = !list.classList.contains("main__table-workers-list--hidden");

   closeAllWorkerLists(allLists);

   if (!isOpen) {
      openWorkerList(title, list);
   }

   e.stopPropagation();
}

function handleOutsideClick(e, allLists) {

   const inside = e.target.closest(".main__table-workers-title") ||
                  e.target.closest(".main__table-workers-list");

   if (!inside) {
      closeAllWorkerLists(allLists);
   }
}


// =======================
// UI
// =======================
function openWorkerList(title, list) {
   list.classList.remove("main__table-workers-list--hidden");
   title.classList.add("main__table-workers-title--active");
}

function closeWorkerList(title, list) {
   list.classList.add("main__table-workers-list--hidden");
   title.classList.remove("main__table-workers-title--active");
}

function closeAllWorkerLists(allLists) {
   allLists.forEach(list => list.classList.add("main__table-workers-list--hidden"));

   document
     .querySelectorAll(".main__table-workers-title--active")
     .forEach(title => title.classList.remove("main__table-workers-title--active"));
}