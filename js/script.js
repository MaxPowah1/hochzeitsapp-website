document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------
     Burger-Menü zur Steuerung der mobilen Navigation
  --------------------------- */
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileNav  = document.querySelector(".mobile-nav");

  function closeMobileNav() {
    mobileNav.classList.remove("active");
  }

  if (burgerMenu && mobileNav) {
    burgerMenu.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });

    // Schließe das mobile Menü, wenn ein Link geklickt wird
    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMobileNav);
    });

    // Schließe das mobile Menü, wenn außerhalb des Menüs getippt wird
    document.addEventListener("click", (e) => {
      if (mobileNav.classList.contains("active")
          && !mobileNav.contains(e.target)
          && !burgerMenu.contains(e.target)) {
        closeMobileNav();
      }
    });

    // Schließe das mobile Menü bei einem Swipe nach links
    let touchStartX = 0;
    document.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    document.addEventListener("touchend", e => {
      if (mobileNav.classList.contains("active")
          && (touchStartX - e.changedTouches[0].screenX > 50)) {
        closeMobileNav();
      }
    });
  }

  /* ---------------------------
     Modal-Funktionalität für Screenshots
  --------------------------- */
  const modal      = document.getElementById("image-modal");
  if (modal) {
    const modalImg   = document.getElementById("modal-img");
    const modalClose = document.querySelector(".modal-close");
    document.querySelectorAll(".screen-item img").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src        = img.getAttribute("data-img");
      });
    });

    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  /* ---------------------------
     Dynamische Verlinkung für WhatsApp und Telegram
  --------------------------- */
  const encodedNumber = "NDkxNTIyMTM1OTUzMg==";
  const phoneNumber   = atob(encodedNumber);

  const whatsappLink = document.querySelector(".whatsapp-link");
  if (whatsappLink) {
    whatsappLink.href = "https://wa.me/" + phoneNumber + "?text=Hallo%20HochzeitsApp-Team";
  }

  const telegramLink = document.querySelector(".telegram-link");
  if (telegramLink) {
    telegramLink.href = "https://t.me/+" + phoneNumber;
  }

  /* ---------------------------
     Slide-in Effekt für Section-Content
  --------------------------- */
  const inners = document.querySelectorAll('.section-inner');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  inners.forEach(inner => observer.observe(inner));

  /* ---------------------------
     Editor-Link Gate: nur auf großen Displays + Querformat
  --------------------------- */
  (function(){
    // Konservative Schwellen für ~10" Tablet quer
    const MIN_W = 1024; // min. Viewport-Breite
    const MIN_H = 650;  // min. Viewport-Höhe

    const container   = document.querySelector(".editor-container");
    const editorLinks = document.querySelectorAll("a.editor-link");
    const blocker     = document.getElementById("editor-blocker"); // optionales Popup-HTML (falls eingebaut)
    const closeBtn    = document.getElementById("eb-close");

    function allowed() {
      const w = window.innerWidth, h = window.innerHeight;
      const landscape = w >= h;
      return (landscape && w >= MIN_W && h >= MIN_H);
    }

    function updateVisibility() {
      if (!container) return;
      container.style.display = allowed() ? "block" : "none";
    }

    function showPopup() {
      // Wenn ein spezielles Popup (#editor-blocker) existiert → anzeigen,
      // ansonsten kurzer, unaufdringlicher Fallback-Alert.
      if (blocker) {
        blocker.hidden = false;
        document.documentElement.style.overflow = "hidden"; // Scroll sperren
      } else {
        alert("Der Editor ist für Smartphones nicht optimiert. Bitte nutze ein größeres Display im Querformat (Tablet oder Desktop).");
      }
    }

    function hidePopup() {
      if (!blocker) return;
      blocker.hidden = true;
      document.documentElement.style.overflow = "";
    }

    // Klicks auf ALLE Editor-Links abfangen (auch in der Timeline)
    editorLinks.forEach(a => {
      a.addEventListener("click", (ev) => {
        if (!allowed()) {
          ev.preventDefault();
          showPopup();
        }
      });
    });

    // Popup schließen (falls vorhanden)
    closeBtn?.addEventListener("click", hidePopup);
    blocker?.addEventListener("click", (e) => {
      if (e.target === blocker) hidePopup(); // Klick auf den Backdrop schließt
    });

    // Reagieren auf Resize/Rotation
    window.addEventListener("resize", updateVisibility);
    window.addEventListener("orientationchange", updateVisibility);

    // Initial
    updateVisibility();
  })();

  /* ---------------------------
     Datenschutzerklärung Popup (toggle + close impressum)
  --------------------------- */
  const datenschutzLink  = document.getElementById("datenschutz-link");
  const datenschutzPopup = document.getElementById("datenschutz-popup");
  const impressumPopup   = document.getElementById("impressum-popup");

  if (datenschutzLink && datenschutzPopup) {
    datenschutzLink.addEventListener("click", e => {
      e.preventDefault();
      const isOpen = datenschutzPopup.style.display === "block";
      // toggle this one
      datenschutzPopup.style.display = isOpen ? "none" : "block";
      // if opening, ensure the other is closed
      if (!isOpen && impressumPopup) {
        impressumPopup.style.display = "none";
      }
    });
  }

  /* ---------------------------
     Impressum Popup (toggle + close datenschutz)
  --------------------------- */
  const impressumLink  = document.getElementById("impressum-link");
  // reuse datenschutzPopup from above

  if (impressumLink && impressumPopup) {
    impressumLink.addEventListener("click", e => {
      e.preventDefault();
      const isOpen = impressumPopup.style.display === "block";
      // toggle this one
      impressumPopup.style.display = isOpen ? "none" : "block";
      // if opening, ensure the other is closed
      if (!isOpen && datenschutzPopup) {
        datenschutzPopup.style.display = "none";
      }
    });
  }

  /* ---------------------------
     Klick außerhalb schließen (beide Popups)
  --------------------------- */
  document.addEventListener("click", e => {
    const openDat = datenschutzPopup && datenschutzPopup.style.display === "block";
    const openImp = impressumPopup   && impressumPopup.style.display   === "block";
    const clickedInside =
         (datenschutzPopup && datenschutzPopup.contains(e.target)) ||
         (impressumPopup   && impressumPopup.contains(e.target))   ||
         (datenschutzLink  && datenschutzLink.contains(e.target))  ||
         (impressumLink    && impressumLink.contains(e.target));
    if ((openDat || openImp) && !clickedInside) {
      if (openDat) datenschutzPopup.style.display = "none";
      if (openImp) impressumPopup.style.display   = "none";
    }
  });

});
