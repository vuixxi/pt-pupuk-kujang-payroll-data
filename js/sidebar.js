function parseHash() {
  return location.hash.replace(/^#/, "").split("#").filter(Boolean);
}

function handleSidebar() {
  const header = document.querySelector(".header");
  const headerDropdownTitle = document.querySelector(".header .header__dropdown-title");
  const headerMenuButton = document.querySelector(".header__menu-button");
  const sidebar = document.querySelector(".sidebar");
  const sidebarBlackscreen = document.querySelector(".sidebar-blackscreen");

  if (!header || !sidebar) return;

  const headerHeight = header.getBoundingClientRect().height;
  sidebar.style.width = `${sidebar.getBoundingClientRect().width * 1.5}px`;
  sidebar.style.top = `${headerHeight}px`;
  sidebarBlackscreen.style.top = `${headerHeight}px`;

  // MENU BUTTON: next / prev
  headerMenuButton.addEventListener("click", function (e) {
    const parts = parseHash();

    if (parts[0] === "menu") {
      e.preventDefault();
      history.back(); // sama seperti BACK Android
    }
  });

  function renderSidebar() {
    const parts = parseHash();

    if (parts[0] === "menu") {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function openMenu() {
    headerDropdownTitle?.setAttribute("disabled", true);
    headerMenuButton.classList.add("header__menu-button--active");
    sidebar.classList.remove("sidebar--hidden");
    sidebarBlackscreen.classList.remove("sidebar-blackscreen--hidden");
  }

  function closeMenu() {
    headerDropdownTitle?.removeAttribute("disabled");
    headerMenuButton.classList.remove("header__menu-button--active");
    sidebar.classList.add("sidebar--hidden");
    sidebarBlackscreen.classList.add("sidebar-blackscreen--hidden");
  }

  window.addEventListener("hashchange", renderSidebar);
  window.addEventListener("load", renderSidebar);
}

function handleContent() {
  const container = document.querySelector(".sidebar-content");
  const titleEl = document.querySelector(".sidebar-content__title");

  if (!container) return;

  function renderContent() {
    const parts = parseHash();
    let page = "home";

    // #menu#page
    if (parts.length === 2 && parts[0] === "menu") {
      page = parts[1];
    }

    // #page (tanpa menu)
    if (parts.length === 1 && parts[0] !== "menu") {
      page = parts[0];
    }

    // hide all
    const pages = container.querySelectorAll("[data-page]");
    pages.forEach(p => p.style.display = "none");

    const active = container.querySelector(`[data-page="${page}"]`);
    if (active) {
      setTitle(page);
      container.classList.remove("sidebar-content--hidden");
      active.style.display = "block";
    } else {
      container.classList.add("sidebar-content--hidden");
    }
    
  }

  function setTitle(page) {
    const link = document.querySelector(
      `.sidebar__link[href="#menu#${page}"]`
    );

    if (link && link.dataset.title) {
      titleEl.textContent = link.dataset.title;
    } else {
      titleEl.textContent = "";
    }
  }

  window.addEventListener("hashchange", renderContent);
  window.addEventListener("load", renderContent);
}

function handleContentClose() {
  const closeBtn = document.querySelector(".sidebar-content__close");
  if (!closeBtn) return;

  closeBtn.addEventListener("click", function () {
    const parts = parseHash();

    // dari #menu#page → #menu (TANPA nambah history)
    if (parts.length === 2 && parts[0] === "menu") {
      // dari #menu → index
      history.back();
    }
  });
}








/*
function formulaCalculator() {
  const RATE = {
      "produksi": 45 * 80,
      "muat": 110000,
      "bongkar": 120000,
      "angkut cacahan lembut": 400,
      "stapel cacahan": 800,
      "stapel coa": 400,
      "stapel produksi": 400,
      "salin": 680,
      "salin timbang": 680
  };
  
}

function delegationCalculator() {
  const calculatorTab = document.querySelectorAll(".calculator .calculator__tab");
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("calculator__tab")) {
      calculatorTab.forEach(function(tab) {
        tab.classList.remove("u-button--active");
        tab.disabled = false;
      });
      e.target.classList.add("u-button--active");
      e.target.disabled = true;
    }
  });
}

delegationCalculator();

function handleCalculator() {
  const jobInput = document.querySelector(".calculator__input-job");
  const workerInput = document.querySelector(".calculator__input-worker");
  const output = document.querySelector(".calculator__output");
  
  function calculate() {
    const job = Number(jobInput.value);
    const worker = Number(workerInput.value);

    if (!job || !worker) {
      output.innerText = 0;
      return;
    }
    
    let formula = 45 * 80;
    const result = (job * formula) / worker;
    output.innerText = formatNumber(result);
  }

  jobInput.addEventListener("input", calculate);
  workerInput.addEventListener("input", calculate);
}

handleCalculator();
*/

// ==============================
// DATA RATE
// ==============================
const RATE = {
  produksi: 45 * 80,
  muat: 110000,
  bongkar: 120000,
  "angkut cacahan lembut": 400,
  "stapel cacahan": 800,
  "stapel coa": 400,
  "stapel produksi": 400,
  salin: 680,
  "salin timbang": 680
};

// ==============================
// HELPER
// ==============================
function getActiveRate() {
  const activeTab = document.querySelector(".calculator__tab.u-button--active");
  if (!activeTab) return 0;

  const key = activeTab.innerText.toLowerCase();
  return RATE[key] || 0;
}

// ==============================
// TAB DELEGATION
// ==============================
function initCalculatorTabs(calculateCallback) {
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("calculator__tab")) return;

    document.querySelectorAll(".calculator__tab").forEach(tab => {
      tab.classList.remove("u-button--active");
      tab.disabled = false;
    });

    e.target.classList.add("u-button--active");
    e.target.disabled = true;

    calculateCallback();
  });
}

// ==============================
// CALCULATOR CORE
// ==============================
function initCalculator() {
  const jobInput = document.querySelector(".calculator__input-job");
  const workerInput = document.querySelector(".calculator__input-worker");
  const output = document.querySelector(".calculator__output");

  function calculate() {
    const job = Number(jobInput.value);
    const worker = Number(workerInput.value);
    const rate = getActiveRate();

    if (!job || !worker || !rate) {
      output.innerText = "0";
      return;
    }

    const result = (job * rate) / worker;
    output.innerText = formatNumber(result);
  }

  jobInput.addEventListener("input", calculate);
  workerInput.addEventListener("input", calculate);

  return calculate;
}

// ==============================
// INIT
// ==============================
const calculate = initCalculator();
initCalculatorTabs(calculate);
