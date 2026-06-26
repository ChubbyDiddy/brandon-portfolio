const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const typingText = document.getElementById("typingText");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const fadeItems = document.querySelectorAll(".fade-in");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("portfolioTheme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  } else {
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    localStorage.setItem("portfolioTheme", isLight ? "light" : "dark");
  });
}

const words = ["responsive websites", "JavaScript projects", "React applications", "clean user experiences"];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, letterIndex - 1);
    letterIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, letterIndex + 1);
    letterIndex++;
  }

  if (!isDeleting && letterIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 45 : 90);
}

typeEffect();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

fadeItems.forEach((item) => observer.observe(item));
