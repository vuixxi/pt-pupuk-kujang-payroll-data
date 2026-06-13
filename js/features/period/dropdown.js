import { handleMain } from "./../payroll/mainTable.js";
import { getData } from "./../payroll/summaryTable.js";


// =======================
// CONTROLLER (ENTRY)
// =======================
export function handleDropDown(data, period, workerMap, jobMap) {

   // ambil elemen dropdown dan title
   const mainTitle = document.querySelector(".main .main__title");
   const headerDropdown = document.querySelector(".header .header__dropdown");
   const headerDropdownTitle = document.querySelector(".header .header__dropdown-title");
   const headerDropdownMenu = document.querySelector(".header .header__dropdown-menu");

   // init UI
   setDropdownTitle(headerDropdownTitle, mainTitle, data, period);

   // render menu dropdown
   headerDropdownMenu.innerHTML = renderDropdownMenu(data, period);

   // setup interaction
   setupDropdownToggle(headerDropdownTitle, headerDropdownMenu);
   setupMenuDelegation(headerDropdown, headerDropdownTitle, headerDropdownMenu);

   const headerDropdownItems = document.querySelectorAll(".header .header__dropdown-item");

   setupDropdownSelection(
      data,
      period,
      workerMap,
      jobMap,
      headerDropdownMenu,
      headerDropdownItems,
      headerDropdownTitle,
      mainTitle
   );

   // tandai periode aktif
   setActiveDropdownItem(headerDropdownItems, period);
}


// =======================
// UI RENDER
// =======================
function renderDropdownMenu(data, period) {
   return data.map((item, index) => `
      <button type="button" class="header__dropdown-item u-button" data-period="${index}">
         Periode ${item.periodId}
      </button>
   `).join("");
}


// =======================
// CONTROLLER
// =======================
function setupDropdownSelection(
   data,
   period,
   workerMap,
   jobMap,
   headerDropdownMenu,
   headerDropdownItems,
   headerDropdownTitle,
   mainTitle
) {

   headerDropdownMenu.addEventListener("click", (e) => {

      if (!e.target.classList.contains("header__dropdown-item")) return;

      const newPeriod = +e.target.dataset.period;

      // update state UI
      resetActiveItems(headerDropdownItems);
      activateItem(e.target);

      // update title
      setDropdownTitle(headerDropdownTitle, mainTitle, data, newPeriod);

      // update data
      handleMain(data, newPeriod, workerMap, jobMap);
      getData(data, newPeriod, workerMap, jobMap);
   });
}


// =======================
// UI ACTION
// =======================
function setDropdownTitle(headerDropdownTitle, mainTitle, data, period) {
   headerDropdownTitle.textContent = `Periode ${data[period].periodId}`;
   mainTitle.innerHTML = `Data Pekerjaan PT PUPUK KUJANG Periode ${data[period].periodId}`;
}

function setActiveDropdownItem(items, index) {
   if (items[index]) {
      items[index].classList.add("header__dropdown-item--active");
   }
}

function resetActiveItems(items) {
   items.forEach(btn => {
      btn.classList.remove("header__dropdown-item--active");
   });
}

function activateItem(el) {
   el.classList.add("header__dropdown-item--active");
}


// =======================
// UI INTERACTION
// =======================
function setupDropdownToggle(headerDropdownTitle, headerDropdownMenu) {   
   headerDropdownTitle.addEventListener("click", () => {
      headerDropdownTitle.classList.toggle("header__dropdown-title--active");
      headerDropdownMenu.classList.toggle("header__dropdown-menu--hidden");
   });
}

function setupMenuDelegation(headerDropdown, headerDropdownTitle, headerDropdownMenu) {
   document.addEventListener("click", (e) => {
      if (!headerDropdown.contains(e.target)) {
         headerDropdownTitle.classList.remove("header__dropdown-title--active");
         headerDropdownMenu.classList.add("header__dropdown-menu--hidden");
      }
   });
}
