let antallVarer = 0;
let penger = 0;
let varePris = 10;

let autoLagPris = 1;
let autoSelgPris = 1;
let autoLagAktiv = false;
let autoSelgAktiv = false;
let autoLagHastighet = 3000;
let autoSelgHastighet = 3000;

let oppgraderingLåst = true;

const varerAntall = document.getElementById("varerAntall");
const sumText = document.getElementById("sum");
const varePerPrisText = document.getElementById("varePerPris");
const oppgrContainer = document.getElementById("oppgrContainer");

function lagVare() {
  antallVarer++;
  varerAntall.textContent = antallVarer;
}

function selgVare() {
  if (antallVarer > 0) {
    antallVarer--;
    penger += varePris;
    varerAntall.textContent = antallVarer;
    sumText.textContent = penger + " kr";
    sjekkOppgradering();
  } else {
    alert("Du har ingen varer å selge!");
  }
}

function økPrisen() {
  varePris++;
  varePerPrisText.textContent = varePris + " kr";
}

function senkPrisen() {
  if (varePris > 1) {
    varePris--;
    varePerPrisText.textContent = varePris + " kr";
  } else {
    alert("Prisen kan ikke være lavere enn 1 kr");
  }
}

function kjopAutoLag() {
  if (penger >= autoLagPris) {
    penger -= autoLagPris;
    sumText.textContent = penger + " kr";

    autoLagPris++;
    document.getElementById("autoLagPris").textContent = autoLagPris + " kr";

    if (!autoLagAktiv) {
      autoLagAktiv = true;
      startAutoLag();
    } else {
      autoLagHastighet = Math.max(autoLagHastighet * 0.9, 500);
    }
  } else {
    alert("Du har ikke nok penger til Auto Lag!");
  }
}

function kjopAutoSelg() {
  if (penger >= autoSelgPris) {
    penger -= autoSelgPris;
    sumText.textContent = penger + " kr";

    autoSelgPris++;
    document.getElementById("autoSelgPris").textContent = autoSelgPris + " kr";

    if (!autoSelgAktiv) {
      autoSelgAktiv = true;
      startAutoSelg();
    } else {
      autoSelgHastighet = Math.max(autoSelgHastighet * 0.9, 500);
    }
  } else {
    alert("Du har ikke nok penger til Auto Selg!");
  }
}

function startAutoLag() {
  setInterval(() => {
    lagVare();
  }, autoLagHastighet);
}

function startAutoSelg() {
  setInterval(() => {
    selgVare();
  }, autoSelgHastighet);
}

function sjekkOppgradering() {
  if (penger >= 100 && oppgraderingLåst) {
    oppgraderingLåst = false;
    visOppgradering();
  }
}

function visOppgradering() {
  oppgrContainer.innerHTML = `
    <button class="oppgrKnapp" onclick="aktiverOppgradering()">KJØP OPPGRADERING (100 kr)</button>
  `;
}

function aktiverOppgradering() {
  if (penger >= 100) {
    penger -= 100;
    varePris += 10;
    sumText.textContent = penger + " kr";
    varePerPrisText.textContent = varePris + " kr";
    oppgrContainer.textContent =
      "Oppgradering aktivert! Varer selges nå for mer!";
  } else {
    alert("Du har ikke nok penger til oppgradering!");
  }
}
