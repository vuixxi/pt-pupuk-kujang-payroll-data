function security() {
  const btn = document.querySelector(".section__button");

  btn.addEventListener("click", function () {
    const pass1 = document.getElementById("pass1").value;
    const pass2 = document.getElementById("pass2").value;

    if (!pass1 || !pass2) {
      alert("Isi dipit lah cokkk!");
    } else if (Number(pass1) === 140 && Number(pass2) === 1) {
      document.body.classList.remove("body--overflow");
      document.querySelector(".container").classList.remove("container--security");
      document.querySelector(".security").classList.add("security--hidden");
    } else {
      alert("Salah bjir! coba inget inget >_<");
    }
  });
}

// jalankan function
security();