const intro = document.getElementById("intro");
const wordmark = document.getElementById("wordmark");
const skipBtn = document.getElementById("skipIntro");

const TEXT = "History Leaks";

function buildLetters() {
  wordmark.innerHTML = "";

  for (const ch of TEXT) {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = ch === " " ? "\u00A0" : ch;

    // scatter settings (tweak for more/less “exploded” look)
    const x = (Math.random() * 280 - 140).toFixed(0) + "px";
    const y = (Math.random() * 200 - 100).toFixed(0) + "px";
    const r = (Math.random() * 36 - 18).toFixed(0) + "deg";

    span.style.setProperty("--x", x);
    span.style.setProperty("--y", y);
    span.style.setProperty("--r", r);

    wordmark.appendChild(span);
  }
}

function finishIntro() {
  intro.classList.add("is-done");
  intro.setAttribute("aria-hidden", "true");
}

function playIntro() {
  const letters = Array.from(wordmark.querySelectorAll(".letter"));

  letters.forEach((el, i) => {
    setTimeout(() => el.classList.add("in"), 70 * i);
  });

  // after it settles, fade out the overlay
  const totalTime = 70 * letters.length + 900 + 350;
  setTimeout(finishIntro, totalTime);
}

skipBtn.addEventListener("click", finishIntro);

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Respect reduced motion
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

buildLetters();
if (reducedMotion) {
  finishIntro();
} else {
  playIntro();
}
