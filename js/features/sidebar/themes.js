const themes = [
  { value: "default", label: "Biru" },
  { value: "sky", label: "Biru Langit" },
  { value: "cyan", label: "Biru Toska Muda" },
  { value: "indigo", label: "Nila" },
  { value: "violet", label: "Ungu" },
  { value: "ruby", label: "Merah" },
  { value: "amber", label: "Jingga" },
  { value: "rose", label: "Pink" },
  { value: "emerald", label: "Hijau" },
  { value: "lime", label: "Hijau Limau" },
  { value: "lemon", label: "Kuning Lemon" },
  { value: "gold", label: "Emas" }
];

function getThemeOptionsHTML() {
  return themes.map(t => `
    <div class="theme__item" data-value="${t.value}">
      <div class="theme__icon" data-theme-preview="${t.value}"></div>
      <span class="theme__label">${t.label}</span>
    </div>
  `).join("");
}

function setTheme(value, htmlEl) {
  htmlEl.setAttribute("data-theme", value);
  localStorage.setItem("theme", value);
  document.querySelectorAll(".theme__item").forEach(el => el.classList.remove("active"));
  document.querySelector(`.theme__item[data-value="${value}"]`)?.classList.add("active");
}

function renderThemeOptions(selectEl) {
  selectEl.innerHTML = getThemeOptionsHTML();
}

export function initThemes() {
  const html = document.documentElement;
  const container = document.querySelector(".theme__wrapper");
  
  renderThemeOptions(container);
  
  let savedTheme = localStorage.getItem("theme");
  
  const currentTheme = savedTheme || html.getAttribute("data-theme") || "default";
  setTheme(currentTheme, html);
  
  container.addEventListener("click", (e) => {
    const item = e.target.closest(".theme__item");
    if (!item) return;
    
    let value = item.dataset.value;
    setTheme(value, html);
  });
}