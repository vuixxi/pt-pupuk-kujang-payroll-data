function workerListSelection() {
   const mainTableWorkers = document.querySelectorAll(".main__table-workers");
   const mainTableWorkersLists = document.querySelectorAll(".main__table-workers-list");
   
   mainTableWorkers.forEach(item => {
      item.addEventListener("click", (e) => handleWorkerClick(e, mainTableWorkersLists));
   });
   
   document.addEventListener("click", (e) => handleOutsideClick(e, mainTableWorkersLists));
}

function handleWorkerClick(e, allLists) {
   if (!e.target.classList.contains("main__table-workers-title")) return;
   
   const currentTitle = e.target;
   const currentList = currentTitle.nextElementSibling;
   const isOpen = !currentList.classList.contains("main__table-workers-list--hidden");
   
   closeAllWorkerLists(allLists);
   
   if (!isOpen) {
      openWorkerList(currentTitle, currentList);
   } else {
      closeWorkerList(currentTitle, currentList);
   }
   
   // Stop bubbling supaya klik ini gak kena event document
   e.stopPropagation();
}

function handleOutsideClick(e, allLists) {
   const clickedInsideTitle = e.target.closest(".main__table-workers-title");
   const clickedInsideList = e.target.closest(".main__table-workers-list");
   
   if (!clickedInsideTitle && !clickedInsideList) {
      closeAllWorkerLists(allLists);
   }
}

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
   document.querySelectorAll(".main__table-workers-title--active").forEach(title => title.classList.remove("main__table-workers-title--active"));
}
