document.addEventListener("DOMContentLoaded", () => {
    /* Burger-Menü zur Steuerung der mobilen Navigation */
    const burgerMenu = document.querySelector(".burger-menu");
    const mobileNav = document.querySelector(".mobile-nav");

    function closeMobileNav() {
        mobileNav.classList.remove("active");
    }

    if (burgerMenu) {
        burgerMenu.addEventListener("click", () => {
            mobileNav.classList.toggle("active");
        });

        // Schließe das mobile Menü, wenn ein Link geklickt wird
        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileNav);
        });

        // Schließe das mobile Menü, wenn außerhalb des Menüs getippt wird
        document.addEventListener("click", (event) => {
            if (mobileNav.classList.contains("active") && !mobileNav.contains(event.target) && !burgerMenu.contains(event.target)) {
                closeMobileNav();
            }
        });

        // Schließe das mobile Menü bei einem Swipe nach links
        let touchStartX = 0;
        document.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        document.addEventListener("touchend", (e) => {
            if (mobileNav.classList.contains("active") && (touchStartX - e.changedTouches[0].screenX > 50)) {
                closeMobileNav();
            }
        });
    }

    /* Modal-Funktionalität für Screenshots */
    const modal = document.getElementById("image-modal");
    if (modal) {
        const modalImg = document.getElementById("modal-img");
        const modalClose = document.querySelector(".modal-close");
        document.querySelectorAll(".screen-item img").forEach(img => {
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
    }

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
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    inners.forEach(inner => {
        sectionObserver.observe(inner);
    });

    /* Verhindere Editor-Zugriff auf Smartphones */
    function isMobileDevice() {
        return window.innerWidth < 768;
    }

    const editorLink = document.querySelector(".editor-container");
    if (editorLink && isMobileDevice()) {
        editorLink.style.display = "none";
    }

    if (window.location.pathname.includes("editor.html") && isMobileDevice()) {
        alert("The editor is not available on smartphones.");
        window.location.href = "index.html"; // Weiterleitung zur Startseite
    }

    /* =========================== */
    /* PayPal Smart Payment Button */
    /* =========================== */

    function getTotalAmount() {
        let totalText = document.getElementById("total-price").textContent;
        return parseFloat(totalText.replace("€", "").trim());
    }

    if (document.getElementById("paypal-button-container")) {
        const paypalScript = document.createElement("script");
        paypalScript.src = "https://www.paypal.com/sdk/js?client-id=AS8CTzbNN0TnN1lwGxs_VRroGLV8B_pKIShgmi1og8jrj-AbmiAnHBGDCeIqCYO9YCifHeukLRz8znEc&currency=EUR";
        paypalScript.onload = () => {
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: getTotalAmount().toFixed(2) // Use dynamically calculated total
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        console.log('Transaction completed by ' + details.payer.name.given_name);

                        // Collect form data
                        const formData = {
                            name: document.getElementById("name").value,
                            mobile: document.getElementById("mobile").value,
                            email: document.getElementById("email").value,
                            address: document.getElementById("address").value,
                            city: document.getElementById("city").value,
                            state: document.getElementById("state").value,
                            zip: document.getElementById("zip").value,
                            orderId: details.id,
                            payerEmail: details.payer.email_address,
                            amount: details.purchase_units[0].amount.value,
                            status: details.status
                        };

                        // Send payment and customer details to server
                        fetch('/hochzeitsapp-website/php/process-payment.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData)
                        })
                        .then(response => response.json())
                        .then(data => console.log('Server Response:', data))
                        .catch(error => console.error('Error:', error));
                    });
                }
            }).render('#paypal-button-container');
        };
        document.body.appendChild(paypalScript);
    }
});
