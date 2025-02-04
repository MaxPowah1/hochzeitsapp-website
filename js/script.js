// script.js

// Du kannst hier beliebiges JavaScript einfügen, z.B. Smooth Scrolling:
document.addEventListener("DOMContentLoaded", function () {
  // Beispiel: Smooth Scroll für interne Links
  const links = document.querySelectorAll('a[href^="#"]');
  for (let link of links) {
    link.addEventListener("click", function (e) {
      const targetID = this.getAttribute("href").substring(1);
      const targetElem = document.getElementById(targetID);
      if (targetElem) {
        e.preventDefault();
        window.scrollTo({
          top: targetElem.offsetTop - 80, // ggf. Navbar-Höhe berücksichtigen
          behavior: "smooth",
        });
      }
    });
  }

  // Event-Listener für das Öffnen der Bootstrap-Modal mit größerem Bild
  const imageModal = document.getElementById("imageModal");
  imageModal.addEventListener("show.bs.modal", function (event) {
    // Das Element, das die Modal getriggert hat (das geklickte Bild)
    const trigger = event.relatedTarget;
    // Nimm das im "data-img" hinterlegte Bild
    const imgSrc = trigger.getAttribute("data-img");
    // Finde das Bild-Tag im Modal und setze dort die Source
    const modalImage = imageModal.querySelector("#modalImage");
    modalImage.src = imgSrc;
  });
});
