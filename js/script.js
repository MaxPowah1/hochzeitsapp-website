document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetID = this.getAttribute("href").substring(1);
      const targetElem = document.getElementById(targetID);
      if (targetElem) {
        e.preventDefault();
        window.scrollTo({
          top: targetElem.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });
  const imageModal = document.getElementById("imageModal");
  if (imageModal) {
    imageModal.addEventListener("show.bs.modal", function (event) {
      const trigger = event.relatedTarget;
      const imgSrc = trigger.getAttribute("data-img");
      const modalImage = imageModal.querySelector("#modalImage");
      modalImage.src = imgSrc;
    });
  }
  const canvas = document.getElementById("heroCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const particles = [];
    const particleCount = 8;
    const colors = ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.7)"];
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
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    };
    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    };
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
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
  const fadeInSections = document.querySelectorAll('.fade-in-section');
  const observerOptions = {
    threshold: 0.2
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  fadeInSections.forEach(section => {
    observer.observe(section);
  });
  const encodedNumber = "NDkxNTIyMTM1OTUzMg==";
  function decodeBase64(str) {
    return atob(str);
  }
  const phoneNumber = decodeBase64(encodedNumber);
  const whatsappLink = document.querySelector("a.whatsapp-link");
  if (whatsappLink) {
    whatsappLink.href = "https://wa.me/" + phoneNumber + "?text=Hallo%20HochzeitsApp-Team";
  }
  const telegramLink = document.querySelector("a.telegram-link");
  if (telegramLink) {
    telegramLink.href = "https://t.me/+" + phoneNumber;
  }
});
