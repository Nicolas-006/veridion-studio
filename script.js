window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    
    setTimeout(() => {
        loader.classList.add("loader-hidden");
        document.body.classList.remove("loading");
    }, 1500);
});

document.addEventListener("DOMContentLoaded", () => {
    // --- ANIMACIONES AL HACER SCROLL ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });

    // --- HEADER DINÁMICO ---
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("shrink", window.scrollY > 50);
    });

    // --- MENÚ MÓVIL ---
    const toggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    
    if (toggle) {
        toggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Cerrar menú al hacer click en links
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", () => navMenu.classList.remove("active"));
    });

    // --- FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    const responseMsg = document.getElementById('form-response');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    responseMsg.textContent = "¡Gracias! Tu mensaje ha sido enviado.";
                    responseMsg.style.display = "block";
                    responseMsg.style.color = "#166534";
                    responseMsg.style.backgroundColor = "#dcfce7";
                    contactForm.reset();
                } else {
                    throw new Error();
                }
            } catch (error) {
                responseMsg.textContent = "Error al enviar. Intenta de nuevo.";
                responseMsg.style.display = "block";
                responseMsg.style.color = "#991b1b";
                responseMsg.style.backgroundColor = "#fee2e2";
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    // --- PREGUNTAS FRECUENTES (FAQ) ---
    const faqColumn = document.querySelector('.faq-column');

if (faqColumn) {
    faqColumn.addEventListener('click', (e) => {
        const item = e.target.closest('.faq-item');
        
        if (item) {
            console.log("Click detectado en:", item);
            
            if (window.innerWidth <= 1024) {
                const isActive = item.classList.contains('active');

                document.querySelectorAll('.faq-item').forEach(el => {
                    el.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            }
        }
    });
}

// --- MOVIMIENTO DE SLIDER (Puede ir fuera del DOMContentLoaded) ---
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const viewport = document.querySelector('.slider-viewport');

if (slider && prevBtn && nextBtn) {
    const scrollAmount = 380;

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    const updateGradients = () => {
        const scrollLeft = slider.scrollLeft;
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        if (scrollLeft <= 5) {
            viewport.className = 'slider-viewport mask-right';
        } else if (scrollLeft >= maxScroll - 5) {
            viewport.className = 'slider-viewport mask-left';
        } else {
            viewport.className = 'slider-viewport mask-both';
        }
    };

    slider.addEventListener('scroll', updateGradients);
    window.addEventListener('load', updateGradients);
}});