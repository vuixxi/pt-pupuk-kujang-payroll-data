import { handleSidebar } from "./sidebar/index.js";

const AudioSystem = (function () {
  let bg = document.querySelector('.audio-system__bg');
  
  function playBg() {
    if (bg && bg.paused) {
      bg.volume = 0.5;
      bg.play().catch(err => console.log(err));
    }
  }
  
  return { playBg };
})();


export function security() {
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
  let container = document.querySelector(".container");
  let security = document.querySelector(".security");
  
  document.body.classList.remove("body--overflow");
  container.classList.remove("container--security");
  security.classList.add("security--hidden");
  
  setTimeout(function() {
    security.style.visibility = "hidden";
    security.style.display = "none";
  }, 3000);
  
  AudioSystem.playBg();
  handleSidebar();
}




// jalankan function saat load
