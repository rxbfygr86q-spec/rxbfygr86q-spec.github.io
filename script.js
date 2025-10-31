const navItems = document.querySelectorAll('.nav-item');
const pageContent = document.getElementById('page-content');
let currentKortBillede = 'forside.png';

// Opret tekst overlay én gang globalt
let tekstOverlay = document.createElement('div');
tekstOverlay.className = 'tekst-overlay';
tekstOverlay.style.fontSize = '10px';  // juster størrelse
tekstOverlay.style.color = '#141e30';    // tekstfarve
tekstOverlay.style.position = 'absolute';
tekstOverlay.style.top = '533px';       // afstand fra toppen
tekstOverlay.style.left = '161px';      // afstand fra venstre
tekstOverlay.style.zIndex = '10';
tekstOverlay.style.fontWeight = '200'; // mindre tyk tekst
tekstOverlay.style.pointerEvents = 'none'; // så man ikke kan klikke på det

// Funktion til at opdatere dato og tid
function opdaterDatoTid() {
    const now = new Date();

    const dag = now.getDate();
    const månedNavne = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];
    const måned = månedNavne[now.getMonth()];
    const år = now.getFullYear();

    let timer = now.getHours();
    let minutter = now.getMinutes();
    if (minutter < 10) minutter = '0' + minutter;

    tekstOverlay.textContent = `${dag} ${måned} ${år} kl. ${timer}:${minutter}`;
}

// Opdater straks og hvert minut
opdaterDatoTid();
setInterval(opdaterDatoTid, 60000);

// Sider
const pages = {
  "Kort": function() {
    pageContent.innerHTML = ''; // ryd alt
    const img = document.createElement('img');
    img.src = currentKortBillede;
    img.alt = 'Kort billede';
    img.className = 'kort-billede';
    pageContent.appendChild(img);

    // Tilføj overlay
    pageContent.appendChild(tekstOverlay);
    tekstOverlay.style.display = 'block';
  },

"Kortinfo": function() {
  pageContent.innerHTML = '';
  const img = document.createElement('img');
  img.src = 'info.png';
  img.alt = 'Info billede';
  img.className = 'info-billede'; // <-- her giver vi det en unik klasse
  pageContent.appendChild(img);
}
,


  "Scan": function() {
    pageContent.innerHTML = '<p>Her kan du bruge Scan-funktionen.</p>';
    tekstOverlay.style.display = 'none';
  },

  "Kontrol": function() {
    pageContent.innerHTML = `
      <p>Vælg hvilket kort der skal vises:</p>
      <button class="billede-valg" data-billede="id1.png">Id Frue</button>
      <button class="billede-valg" data-billede="id2.png">Id Fake (Frue)</button>
      <button class="billede-valg" data-billede="id3.png">Id Maack</button>
      <button class="billede-valg" data-billede="id4.png">Id Fake (Maack)</button>
    `;
    tekstOverlay.style.display = 'none';

    document.querySelectorAll('.billede-valg').forEach(btn => {
      btn.addEventListener('click', () => {
        currentKortBillede = btn.getAttribute('data-billede');
        alert('Kortbillede ændret! Gå tilbage til "Kort" for at se det.');
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


