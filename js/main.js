// ========== MENÚ MOBILE ==========
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = mobileMenu.classList.contains('hidden') ? 'false' : 'true';
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
}

// ========== TESTIMONIALES ==========
const testimonials = [
    {
        image: "assets/imagenes/cliente1.png",
        text: "Calidad de productos increible",
        name: "Olivia Romero",
        role: "Cliente frecuente",
        stars: 5
    },
    {
        image: "assets/imagenes/cliente2.png",
        text: "Servicio rápido y productos de excelente calidad.",
        name: "Luis Hernández",
        role: "Comprador verificado",
        stars: 4
    },
    {
        image: "assets/imagenes/cliente3.png",
        text: "La mejor tienda de electrónica que he probado.",
        name: "Ana Gómez",
        role: "Cliente frecuente",
        stars: 5
    },
    {
        image: "assets/imagenes/cliente4.png",
        text: "Productos de una exelente calidad.",
        name: "Juan Carlos",
        role: "Cliente frecuente",
        stars: 4
    },
    {
        image: "assets/imagenes/cliente5.png",
        text: "Una de las mejores tiendas de productos electronicos.",
        name: "Edgar Ruiz",
        role: "Cliente frecuente",
        stars: 5
    }
];

let current = 0;

const img = document.getElementById("testimonial-image");
const text = document.getElementById("testimonial-text");
const nameT = document.getElementById("testimonial-name");
const role = document.getElementById("testimonial-role");
const starsContainer = document.getElementById("testimonial-stars");

function loadTestimonial(index) {
    const t = testimonials[index];
    img.src = t.image;
    text.textContent = t.text;
    nameT.textContent = t.name;
    role.textContent = t.role;

    starsContainer.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        starsContainer.innerHTML += i < t.stars
            ? '<i class="fas fa-star"></i>'
            : '<i class="far fa-star"></i>';
    }
}

document.getElementById("next-testimonial").onclick = () => {
    current = (current + 1) % testimonials.length;
    loadTestimonial(current);
};

document.getElementById("prev-testimonial").onclick = () => {
    current = (current - 1 + testimonials.length) % testimonials.length;
    loadTestimonial(current);
};

setInterval(() => {
    current = (current + 1) % testimonials.length;
    loadTestimonial(current);
}, 5000);

loadTestimonial(current);

// ========== FAQ ==========
const faqButtons = document.querySelectorAll(".faq-btn");
faqButtons.forEach(btn => {
    btn.onclick = () => {
        // Obtener el contenido: del botón -> h3 (parentElement) -> div siguiente (nextElementSibling)
        const content = btn.parentElement.nextElementSibling;
        const icon = btn.querySelector("i");
        const expanded = btn.getAttribute("aria-expanded") === "true";

        // Cerrar todos los FAQs
        faqButtons.forEach(b => {
            b.parentElement.nextElementSibling.classList.add("hidden");
            b.querySelector("i").classList.remove("rotate-180");
            b.setAttribute("aria-expanded", "false");
        });

        // Abrir el FAQ clickeado si estaba cerrado
        if (!expanded) {
            content.classList.remove("hidden");
            icon.classList.add("rotate-180");
            btn.setAttribute("aria-expanded", "true");
        }
    };
});

// ========== PLANES ==========
function obtenerPlan(nombrePlan) {
    const toast = document.getElementById('toast');
    toast.textContent = `¡Plan ${nombrePlan} obtenido!`;

    toast.classList.remove('hidden');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('opacity-100');
    }, 2000);
}

// ========== MODAL DE REGISTRO ==========
const btnsComenzar = document.querySelectorAll('#btnComenzar');
const modal = document.getElementById('modalRegistro');
const cerrar = document.getElementById('cerrarModal');
const btnCrear = document.getElementById('btnCrearCuenta');
const inputNombre = document.getElementById('inputNombre');
const inputCorreo = document.getElementById('inputCorreo');

// Abrir modal - funciona para ambos botones (desktop y mobile)
if (btnsComenzar.length > 0 && modal) {
    btnsComenzar.forEach(btn => {
        btn.addEventListener('click', () => modal.classList.remove('hidden'));
    });
}

// Cerrar modal
if (cerrar && modal) {
    cerrar.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', e => { if(e.target === modal) modal.classList.add('hidden'); });
}

// Crear cuenta
if (btnCrear) {
    btnCrear.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
        const correo = inputCorreo.value.trim();

        if(nombre === "" || correo === "") {
            alert("Por favor completa todos los campos.");
            return;
        }

        const usuario = { nombre, correo };
        localStorage.setItem('usuario', JSON.stringify(usuario));

        alert(`¡Cuenta creada!\nNombre: ${nombre}\nCorreo: ${correo}`);
        inputNombre.value = "";
        inputCorreo.value = "";
        modal.classList.add('hidden');
    });
}