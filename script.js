/**
 * Script Portofolio – Vicky Ardiansyah
 * Mengelola smooth scroll, animasi fade-up, dan form kontak.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. Smooth Scroll ke section Skills ──
  const btnAction = document.getElementById("btn-action");
  if (btnAction) {
    btnAction.addEventListener("click", () => {
      document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
    });
  }

  // ── 2. Smooth Scroll untuk semua link navigasi ──
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ── 3. Animasi Fade-Up (IntersectionObserver) ──
  const fadeElements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 120);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  fadeElements.forEach((el) => observer.observe(el));

  // ── 4. Navbar: highlight link aktif saat scroll ──
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = "";
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.style.color = "var(--accent)";
            }
          });
        }
      });
    },
    { threshold: 0.5 },
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  // ── 5. Penanganan Formulir Kontak ──
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Log ke konsol (simulasi)
      console.log("Pesan masuk:");
      console.log(`Nama    : ${name}`);
      console.log(`Email   : ${email}`);
      console.log(`Pesan   : ${message}`);

      // Feedback ke pengguna
      const btn = document.getElementById("btn-send");
      const originalText = btn.textContent;
      btn.textContent = "✓ Pesan Terkirim!";
      btn.style.background = "#16a34a";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }
});
