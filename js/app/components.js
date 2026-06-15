// app/components.js

async function loadComponent(id, file) {
  try {
    const res = await fetch(file);

    if (!res.ok) throw new Error(`Gagal load ${file}`);

    const html = await res.text();

    const el = document.getElementById(id);
    if (!el) throw new Error(`Element ${id} tidak ditemukan`);

    el.innerHTML = html;

  } catch (err) {
    alert(err.message);
    // console.log(err.message);
  }
}

const COMPONENTS = [
  ["login", "./partials/login.html"],
  ["header", "./partials/header.html"],
  ["sidebar", "./partials/sidebar.html"],
  ["sidebar-content", "./partials/sidebar-content.html"],
  ["main", "./partials/main.html"],
  ["summary", "./partials/summary.html"]
];

export async function loadAppComponents() {
  await Promise.allSettled(
    COMPONENTS.map(([id, file]) =>
      loadComponent(id, file)
    )
  );
}