// app/components.js

async function loadComponent(id, file) {
  const res = await fetch(file);

  if (!res.ok) {
    throw new Error(`Gagal memuat ${file}`);
  }

  const html = await res.text();

  document.getElementById(id).innerHTML = html;
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
  await Promise.all(
    COMPONENTS.map(([id, file]) =>
      loadComponent(id, file)
    )
  );
}