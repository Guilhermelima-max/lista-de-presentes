// FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "lista-de-presentes-4307d.firebaseapp.com",
  databaseURL: "https://lista-de-presentes-4307d-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// CONTAGEM
const targetDate = new Date("2026-04-14T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;
}

setInterval(updateCountdown, 1000);

// COMPRAR
function comprar(id) {
  const nome = document.getElementById("nome").value.trim();

  if (!nome) {
    alert("Digite seu nome antes!");
    return;
  }

  // CONFIRMAÇÃO
  const confirmar = confirm("Tem certeza que deseja escolher este presente?");

  if (!confirmar) return;

  const ref = db.ref("presentes/" + id);

  ref.once("value", snap => {
    if (!snap.exists()) {
      ref.set({ compradoPor: nome });
      alert("Presente reservado com sucesso! 🎉");
    } else {
      alert("Esse presente já foi escolhido!");
    }
  });
}

// ATUALIZA
db.ref("presentes").on("value", snap => {
  const data = snap.val() || {};

  document.querySelectorAll(".gift").forEach(div => {
    const id = div.dataset.id;
    const btn = div.querySelector("button");

    if (data[id]) {
      btn.innerText = "Escolhido por " + data[id].compradoPor;
      btn.disabled = true;
    } else {
      btn.innerText = "Escolher Presente";
      btn.disabled = false;
    }
  });
});