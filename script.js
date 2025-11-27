const navItems = document.querySelectorAll('.nav-item');
const topRightIcon = document.querySelector('.right-icon'); 
const pageContent = document.getElementById('page-content');
let currentKortBillede = 'forside.png';
let currentKontrolGif = 'kontrol.gif'; // standard GIF

// Opret tekst overlay én gang globalt
let tekstOverlay = document.createElement('div');
tekstOverlay.className = 'tekst-overlay';
tekstOverlay.style.fontSize = '10px';
tekstOverlay.style.color = '#141e30';
tekstOverlay.style.position = 'absolute';
tekstOverlay.style.top = '533px';
tekstOverlay.style.left = '161px';
tekstOverlay.style.zIndex = '10';
tekstOverlay.style.fontWeight = '200';
tekstOverlay.style.pointerEvents = 'none';

// Funktion til at opdatere dato og tid
function opdaterDatoTid() {
  const now = new Date();
  const dag = now.getDate();
  const månedNavne = [
    'januar', 'februar', 'marts', 'april', 'maj', 'juni',
    'juli', 'august', 'september', 'oktober', 'november', 'december'
  ];
  const måned = månedNavne[now.getMonth()];
  const år = now.getFullYear();
  let timer = now.getHours();
  let minutter = now.getMinutes();
  if (minutter < 10) minutter = '0' + minutter;
  tekstOverlay.textContent = `${dag} ${måned} ${år} kl. ${timer}:${minutter}`;
}

opdaterDatoTid();
setInterval(opdaterDatoTid, 60000);

// Sider
const pages = {
  "Kort": function() {
    document.querySelector('.top-bar').style.display = 'flex';
    pageContent.innerHTML = '';
    const img = document.createElement('img');
    img.src = currentKortBillede;
    img.alt = 'Kort billede';
    img.className = 'kort-billede';
    pageContent.appendChild(img);
    pageContent.appendChild(tekstOverlay);
    tekstOverlay.style.display = 'block';
  },

  "Kortinfo": function() {
    document.querySelector('.top-bar').style.display = 'flex';
    pageContent.innerHTML = '';
    const img = document.createElement('img');
    img.src = 'info.png';
    img.alt = 'Info billede';
    img.className = 'info-billede';
    pageContent.appendChild(img);
  },

"Scan": function() {
  pageContent.innerHTML = '';
  
  // Skjul topbaren
  document.querySelector('.top-bar').style.display = 'none';
  
  // Opret og vis billede
  const img = document.createElement('img');
  img.src = 'scanbillede.png'; // ← brug dit eget billede her
  img.alt = 'Scan billede';
  img.className = 'scan-billede';
  pageContent.appendChild(img);

  tekstOverlay.style.display = 'none';
},


  // Kontrol viser nu en dynamisk GIF
  "Kontrol": function() {
    document.querySelector('.top-bar').style.display = 'flex';
    pageContent.innerHTML = '';
    const gif = document.createElement('img');
    gif.src = currentKontrolGif; // viser den valgte GIF
    gif.alt = 'Kontrol animation';
    gif.className = 'kort-billede';
    pageContent.appendChild(gif);
    tekstOverlay.style.display = 'none';
  },

  // Indstillinger vælger nu både kort og kontrol-GIF
  "Indstillinger": function() {
    document.querySelector('.top-bar').style.display = 'flex';
    pageContent.innerHTML = `
      <p>Vælg hvilket kort der skal vises:</p>
      <button class="billede-valg" data-billede="id1.png" data-gif="kontrol1.gif">Id Frue</button>
      <button class="billede-valg" data-billede="id2.png" data-gif="kontrol2.gif">Id Philip</button>
      <button class="billede-valg" data-billede="id3.png" data-gif="kontrol3.gif">Id Maack</button>
      <button class="billede-valg" data-billede="id4.png" data-gif="kontrol4.gif">Id Fake (Maack)</button>
    `;
    tekstOverlay.style.display = 'none';

    // Håndter klik på knapperne
    document.querySelectorAll('.billede-valg').forEach(btn => {
      btn.addEventListener('click', () => {
        currentKortBillede = btn.getAttribute('data-billede');
        currentKontrolGif = btn.getAttribute('data-gif');
        alert('Kort og kontrol-animation ændret! Gå tilbage til "Kort" eller "Kontrol" for at se det.');
      });
    });
  }
};

// Menu klik
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const page = item.getAttribute('data-page');
    pages[page]();
  });
});

// Start med Kort
pages["Kort"]();

// Klik på de tre prikker åbner "Indstillinger"
topRightIcon.addEventListener('click', () => {
  navItems.forEach(i => i.classList.remove('active'));
  pages["Indstillinger"]();
});
