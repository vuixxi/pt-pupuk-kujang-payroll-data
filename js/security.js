function security() {
  const btn = document.querySelector(".section__button");

  btn.addEventListener("click", function () {
    const pass1 = document.getElementById("pass1").value;
    const pass2 = document.getElementById("pass2").value;

    if (!pass1 || !pass2) {
      alert("Harap masukkan Username atau Password!");
    } else if (pass1 === "Hannachan" && pass2 === "Asynchronous") {
      document.body.classList.remove("body--overflow");
      document.querySelector(".container").classList.remove("container--security");
      document.querySelector(".security").classList.add("security--hidden");
    } else {
      alert("Username atau Password salah!");
    }
  });
}

// jalankan function
security();