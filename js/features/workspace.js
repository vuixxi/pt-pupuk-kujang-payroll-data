// export function initWorkspace(jobMap) {
//   console.log(jobMap);
//   openWorkspace();
// }

export function initWorkspace(jobMap) {
  const tbody = document.querySelector(".workspace__table tbody");

  tbody.innerHTML = "";

  Object.values(jobMap).forEach((job, index) => {
    tbody.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${index + 1}</td>
        <td>${job.name}</td>
        <td>${job.unit}</td>
        <td>${job.rate.toLocaleString("id-ID")}</td>
        <td>${job.type}</td>
      </tr>
      `
    );
  });
}