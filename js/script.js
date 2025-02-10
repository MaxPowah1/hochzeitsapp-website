document.addEventListener("DOMContentLoaded", () => {
  /* Burger-Menü zur Steuerung der mobilen Navigation */
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileNav = document.querySelector(".mobile-nav");

  burgerMenu.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
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
});
