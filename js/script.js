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
});
