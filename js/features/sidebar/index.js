
// =======================
// LOGIC (PURE)
// =======================
function parseHash() {
  return location.hash.replace(/^#/, "").split("#").filter(Boolean);
}

function getPageFromHash(parts) {
  if (parts.length === 2 && parts[0] === "menu") return parts[1];
  if (parts.length === 1 && parts[0] !== "menu") return parts[0];
  return "home";
}

function isMenuOpen(parts) {
  return parts[0] === "menu";
}


// =======================
// SIDEBAR
// =======================
export function handleSidebar() {
  const header = document.querySelector(".header");
  const headerDropdownTitle = document.querySelector(".header .header__dropdown-title");
  const headerMenuButton = document.querySelector(".header__menu-button");
  const sidebar = document.querySelector(".sidebar");
  const sidebarBlackscreen = document.querySelector(".sidebar-blackscreen");

  if (!header || !sidebar) return;

  setupSidebarLayout(header, sidebar, sidebarBlackscreen);

  headerMenuButton.addEventListener("click", function (e) {
    const parts = parseHash();

    if (isMenuOpen(parts)) {
      e.preventDefault();
      history.back();
    }
  });

  function renderSidebar() {
    const parts = parseHash();

    if (isMenuOpen(parts)) {
      openMenu(headerDropdownTitle, headerMenuButton, sidebar, sidebarBlackscreen);
    } else {
      closeMenu(headerDropdownTitle, headerMenuButton, sidebar, sidebarBlackscreen);
    }
  }

  window.addEventListener("hashchange", renderSidebar);
  window.addEventListener("load", renderSidebar);
}


// =======================
// CONTENT
// =======================
export function handleContent() {
  const container = document.querySelector(".sidebar-content");
  const titleEl = document.querySelector(".sidebar-content__title");

  if (!container) return;

  function renderContent() {
    const parts = parseHash();
    const page = getPageFromHash(parts);

    hideAllPages(container);

    const active = container.querySelector(`[data-page="${page}"]`);

    if (active) {
      setTitle(page, titleEl);
      showContent(container, active);
    } else {
      hideContent(container);
    }
  }

  window.addEventListener("hashchange", renderContent);
  window.addEventListener("load", renderContent);
}


// =======================
// CONTENT CLOSE
// =======================
export function handleContentClose() {
  const closeBtn = document.querySelector(".sidebar-content__close");
  if (!closeBtn) return;

  closeBtn.addEventListener("click", function () {
    const parts = parseHash();

    if (isMenuOpen(parts) && parts.length === 2) {
      history.back();
    }
  });
}


// =======================
// UI (SIDEBAR)
// =======================
function setupSidebarLayout(header, sidebar, sidebarBlackscreen) {
  const headerHeight = header.getBoundingClientRect().height;

  sidebar.style.width = `${sidebar.getBoundingClientRect().width * 1.5}px`;
  sidebar.style.top = `${headerHeight}px`;
  sidebarBlackscreen.style.top = `${headerHeight}px`;
}

function openMenu(headerDropdownTitle, headerMenuButton, sidebar, sidebarBlackscreen) {
  headerDropdownTitle?.setAttribute("disabled", true);
  document.body.classList.add("body--overflow");
  headerMenuButton.classList.add("header__menu-button--active");
  sidebar.classList.remove("sidebar--hidden");
  sidebarBlackscreen.classList.remove("sidebar-blackscreen--hidden");
}

function closeMenu(headerDropdownTitle, headerMenuButton, sidebar, sidebarBlackscreen) {
  document.body.classList.remove("body--overflow");
  headerDropdownTitle?.removeAttribute("disabled");
  headerMenuButton.classList.remove("header__menu-button--active");
  sidebar.classList.add("sidebar--hidden");
  sidebarBlackscreen.classList.add("sidebar-blackscreen--hidden");
}


// =======================
// UI (CONTENT)
// =======================
function hideAllPages(container) {
  const pages = container.querySelectorAll("[data-page]");
  pages.forEach(p => p.style.display = "none");
}

function showContent(container, active) {
  container.classList.remove("sidebar-content--hidden");
  active.style.display = "block";
}

function hideContent(container) {
  container.classList.add("sidebar-content--hidden");
}

function setTitle(page, titleEl) {
  const link = document.querySelector(`.sidebar__link[href="#menu#${page}"]`);

  titleEl.textContent = link?.dataset.title || "";
}
