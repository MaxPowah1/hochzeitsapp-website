// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Smooth Scrolling für interne Links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetID = this.getAttribute("href").substring(1);
      const targetElem = document.getElementById(targetID);
      if (targetElem) {
        e.preventDefault();
        window.scrollTo({
          top: targetElem.offsetTop - 70, // Abzug, falls die Navbar fixiert sein sollte
          behavior: "smooth"
        });
      }
    });
  });

  // Öffnen der Modal-Ansicht für Screenshots
  const imageModal = document.getElementById("imageModal");
  if (imageModal) {
    imageModal.addEventListener("show.bs.modal", function (event) {
      const trigger = event.relatedTarget;
      const imgSrc = trigger.getAttribute("data-img");
      const modalImage = imageModal.querySelector("#modalImage");
      modalImage.src = imgSrc;
    });
  }

  // === Canvas Animation im Hero-Bereich ===
  const canvas = document.getElementById("heroCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");

    // Größe des Canvas anpassen (ursprüngliche Methode)
    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Partikel-Objekte
    const particles = [];
    const particleCount = 50; // Anzahl der Kreise
    const colors = ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.7)"];

    // Partikel-Konstruktor
    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 3 + 2;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;

      // Reflektion an den Rändern
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    // Partikel initialisieren
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation-Loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }
});
