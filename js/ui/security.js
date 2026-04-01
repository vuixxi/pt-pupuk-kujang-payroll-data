function security() {
  // ambil tombol login
  const btn = document.querySelector(".section__button");

  btn.addEventListener("click", function () {

    const pass1 = getInputValue("pass1");
    const pass2 = getInputValue("pass2");

    const status = validateLogin(pass1, pass2);

    handleLoginResult(status);
  });
}

// =======================
// LOGIC (PURE)
// =======================
function validateLogin(username, password) {

  if (!username || !password) {
    return "EMPTY";
  }

  if (username === "Hannachan" && password === "Asynchronous") {
    return "SUCCESS";
  }

  return "INVALID";
}


// =======================
// CONTROLLER
// =======================
function handleLoginResult(status) {

  if (status === "EMPTY") {
    showAlert("Harap masukkan Username atau Password!");
    return;
  }

  if (status === "SUCCESS") {
    openApp();
    return;
  }

  showAlert("Username atau Password salah!");
}


// =======================
// UI
// =======================
function getInputValue(id) {
  return document.getElementById(id).value;
}

function showAlert(message) {
  alert(message);
}

function openApp() {
  document.body.classList.remove("body--overflow");
  document.querySelector(".container").classList.remove("container--security");
  document.querySelector(".security").classList.add("security--hidden");
}


// jalankan function saat load
security();