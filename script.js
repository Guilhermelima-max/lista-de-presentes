 const firebaseConfig = {
        apiKey: "AIzaSyCoLP8aR-3HBTSPyd6wdTTulh5TzDu4hVo",
        authDomain: "lista-de-presentes-4307d.firebaseapp.com",
        databaseURL: "https://lista-de-presentes-4307d-default-rtdb.firebaseio.com/",
        projectId: "lista-de-presentes-4307d",
        storageBucket: "lista-de-presentes-4307d.firebasestorage.app",
        messagingSenderId: "384956406814",
        appId: "1:384956406814:web:cac946253cbed6f563620f"
      };
      firebase.initializeApp(firebaseConfig);
      const db = firebase.database();
  
      function comprar(id) {
        const nome = document.getElementById('nome').value.trim();
        if (!nome) {
          alert("Digite seu nome antes de escolher um presente!");
          return;
        }
        const ref = db.ref('presentes/' + id);
        ref.once('value', snapshot => {
          if (!snapshot.exists()) {
            ref.set({ compradoPor: nome });
          } else {
            alert("Esse presente já foi escolhido!");
          }
        });
      }
  
      db.ref('presentes').on('value', snapshot => {
        const presentes = snapshot.val() || {};
        document.querySelectorAll('.gift').forEach(div => {
          const itemId = div.getAttribute('data-id');
          const botao = div.querySelector('button');
          if (presentes[itemId]) {
            botao.textContent = "Já comprado por " + presentes[itemId].compradoPor;
            botao.disabled = true;
          } else {
            botao.textContent = "Comprar";
            botao.disabled = false;
          }
        });
      });