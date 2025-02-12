document.addEventListener("DOMContentLoaded", () => {
  /* Burger-Menü zur Steuerung der mobilen Navigation */
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileNav = document.querySelector(".mobile-nav");

  function closeMobileNav() {
    mobileNav.classList.remove("active");
  }

  burgerMenu.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // Schließe das mobile Menü, wenn ein Link geklickt wird
  const mobileNavLinks = mobileNav.querySelectorAll("a");
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMobileNav();
    });
  });

  // Schließe das mobile Menü, wenn außerhalb des Menüs getippt wird
  document.addEventListener("click", (event) => {
    if (
      mobileNav.classList.contains("active") &&
      !mobileNav.contains(event.target) &&
      !burgerMenu.contains(event.target)
    ) {
      closeMobileNav();
    }
  });

  // Schließe das mobile Menü bei einem Swipe nach links
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (mobileNav.classList.contains("active") && (touchStartX - touchEndX > 50)) {
      closeMobileNav();
    }
  });

  /* Modal-Funktionalität für Screenshots */
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalClose = document.querySelector(".modal-close");
  const screenItems = document.querySelectorAll(".screen-item img");

  screenItems.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.getAttribute("data-img");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  /* Dynamische Verlinkung für WhatsApp und Telegram */
  const encodedNumber = "NDkxNTIyMTM1OTUzMg==";
  const phoneNumber = atob(encodedNumber);
  const whatsappLink = document.querySelector(".whatsapp-link");
  if (whatsappLink) {
    whatsappLink.href = "https://wa.me/" + phoneNumber + "?text=Hallo%20HochzeitsApp-Team";
  }
  const telegramLink = document.querySelector(".telegram-link");
  if (telegramLink) {
    telegramLink.href = "https://t.me/+" + phoneNumber;
  }

  /* Slide-in Effekt für den inneren Content der Sections */
  const inners = document.querySelectorAll('.section-inner');
  const observerOptions = {
    threshold: 0.2
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  inners.forEach(inner => {
    sectionObserver.observe(inner);
  });
});
