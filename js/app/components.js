const COMPONENTS = [
  ["login", "./partials/login.html"],
  ["header", "./partials/header.html"],
  ["sidebar", "./partials/sidebar.html"],
  ["sidebar-content", "./partials/sidebar-content.html"],
  ["main", "./partials/main.html"],
  ["summary", "./partials/summary.html"]
];


// export async function loadAppComponents() {
//   try {
//     await Promise.all(
//       COMPONENTS.map(([id, file]) =>
//         loadComponent(id, file)
//       )
//     );

//     await waitForRender();

//   } catch (err) {
//     alert(err.message);
//     throw err;
//   }
// }

export async function loadAppComponents() {
  await Promise.all(
    COMPONENTS.map(([id, file]) =>
      loadComponent(id, file)
    )
  );

  await waitForRender();
}

async function loadComponent(id, file) {
  const res = await fetch(file);

  if (!res.ok) {
    throw new Error(`
      Partial "${id}" gagal dimuat.
      File: ${file}
      Status: ${res.status}
    `);
  }

  const html = await res.text();

  const el = document.getElementById(id);

  if (!el) {
    throw new Error(`Element ${id} tidak ditemukan`);
  }

  el.innerHTML = html;
}



function waitForRender() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}