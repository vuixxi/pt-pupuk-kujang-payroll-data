function handleDropDown(data, period) {
   const mainTitle = document.querySelector(".main .main__title");
   const headerDropdown = document.querySelector(".header .header__dropdown");
   const headerDropdownTitle = document.querySelector(".header .header__dropdown-title");
   const headerDropdownMenu = document.querySelector(".header .header__dropdown-menu");
   
   headerDropdownTitle.textContent = data[period].period;
   mainTitle.innerHTML = `Data Pekerjaan PT PUPUK KUJANG ${data[period].period}`;
   headerDropdownMenu.innerHTML = renderDropdownMenu(data, period);
   setupDropdownToggle(headerDropdownTitle, headerDropdownMenu);
   setupMenuDelegation(headerDropdown, headerDropdownTitle, headerDropdownMenu);
   
   const headerDropdownItems = document.querySelectorAll(".header .header__dropdown-item");
   setupDropdownSelection(data, period, headerDropdownMenu, headerDropdownItems, headerDropdownTitle, mainTitle);
   
   headerDropdownItems[period].classList.add("header__dropdown-item--active");
}

function renderDropdownMenu(data, period) {
   return data.map((item, index) => `
      <button type="button" class="header__dropdown-item u-button" data-period="${index}">${item.period}</button>
   `).join("");
}

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

function setupDropdownSelection(data, period, headerDropdownMenu, headerDropdownItems, headerDropdownTitle, mainTitle) {
   headerDropdownMenu.addEventListener("click", (e) => {
      if (e.target.classList.contains("header__dropdown-item")) {
         
         headerDropdownItems.forEach(btn => {
            btn.classList.remove("header__dropdown-item--active");
         });
         
         e.target.classList.add("header__dropdown-item--active");
         
         const newPeriod = +e.target.dataset.period;
         
         headerDropdownTitle.textContent = data[newPeriod].period;
         mainTitle.innerHTML = `Data Pekerjaan PT PUPUK KUJANG ${data[newPeriod].period}`;
         
         handleMain(data, newPeriod);
         getData(data, newPeriod);
      }
   });
}
