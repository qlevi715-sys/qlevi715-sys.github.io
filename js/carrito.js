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
    modal.addEventListener('click', e => { 
        if(e.target === modal) modal.classList.add('hidden'); 
    });
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

// ========== CARRITO DE COMPRAS ==========
let appliedDiscount = 0;

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        document.getElementById('empty-cart').classList.remove('hidden');
        document.getElementById('cart-content').classList.add('hidden');
        return;
    }

    document.getElementById('empty-cart').classList.add('hidden');
    document.getElementById('cart-content').classList.remove('hidden');

    renderCartItems(cart);
    updateSummary(cart);
}

function renderCartItems(cart) {
    const container = document.getElementById('cart-items');
    container.innerHTML = cart.map(item => `
        <div class="bg-white p-6 rounded-xl shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg" />
            <div class="flex-1 text-center sm:text-left">
                <h3 class="text-lg font-bold text-gray-900">${item.name}</h3>
                <p class="text-gray-600">$${item.price} c/u</p>
            </div>
            <div class="flex items-center gap-3">
                <button 
                    onclick="updateQuantity(${item.id}, -1)" 
                    class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                    <i class="fas fa-minus text-sm"></i>
                </button>
                <span class="font-semibold w-8 text-center">${item.quantity}</span>
                <button 
                    onclick="updateQuantity(${item.id}, 1)" 
                    class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                    <i class="fas fa-plus text-sm"></i>
                </button>
            </div>
            <div class="flex items-center gap-4">
                <p class="font-bold text-lg">$${item.price * item.quantity}</p>
                <button 
                    onclick="removeItem(${item.id})" 
                    class="text-red-500 hover:text-red-700 transition-colors"
                    title="Eliminar producto"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateQuantity(productId, delta) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(productId) {
    if (confirm('¿Eliminar este producto del carrito?')) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart = cart.filter(i => i.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

function updateSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal >= 100 ? 0 : 15;
    const discount = appliedDiscount;
    const total = subtotal + shipping - discount;

    document.getElementById('items-count').textContent = itemsCount;
    document.getElementById('subtotal').textContent = subtotal;
    document.getElementById('discount').textContent = discount;
    document.getElementById('total').textContent = total;

    if (discount > 0) {
        document.getElementById('discount-row').classList.remove('hidden');
    }

    const shippingRow = document.getElementById('shipping-row');
    if (subtotal >= 100) {
        shippingRow.innerHTML = '<span>Envío</span><span class="font-semibold text-green-600">¡GRATIS!</span>';
    } else {
        shippingRow.innerHTML = '<span>Envío</span><span class="font-semibold">$15</span>';
    }
}

//Cupón de descuento
function applyCoupon() {
    const input = document.getElementById('coupon-input');
    const message = document.getElementById('coupon-message');
    const code = input.value.toUpperCase();
    
    const validCoupons = {
        'TECH20': 20,
        'SAVE10': 10,
        'DESCUENTO15': 15
    };

    if (validCoupons[code]) {
        appliedDiscount = validCoupons[code];
        message.textContent = `✓ Cupón aplicado: $${appliedDiscount} de descuento`;
        message.className = 'mt-2 text-sm text-green-600';
        message.classList.remove('hidden');
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        updateSummary(cart);
    } else {
        message.textContent = '✗ Cupón inválido';
        message.className = 'mt-2 text-sm text-red-600';
        message.classList.remove('hidden');
    }
}

function checkout() {
    alert('¡Gracias por tu compra! Serás redirigido al principio.');
    localStorage.removeItem('cart');
    window.location.href = '../index.html';
}

// Cargar carrito al inicio
loadCart();