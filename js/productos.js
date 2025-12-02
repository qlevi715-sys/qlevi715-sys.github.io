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
const btnComenzarDesktop = document.getElementById('btnComenzarDesktop');
const btnComenzarMobile = document.getElementById('btnComenzarMobile');
const modal = document.getElementById('modalRegistro');
const cerrar = document.getElementById('cerrarModal');
const btnCrear = document.getElementById('btnCrearCuenta');
const inputNombre = document.getElementById('inputNombre');
const inputCorreo = document.getElementById('inputCorreo');

[btnComenzarDesktop, btnComenzarMobile].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => modal.classList.remove('hidden'));
    }
});

if (cerrar && modal) {
    cerrar.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', e => { 
        if(e.target === modal) modal.classList.add('hidden'); 
    });
}

if (btnCrear) {
    btnCrear.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
        const correo = inputCorreo.value.trim();

        if(nombre === "" || correo === "") {
            alert("Por favor completa todos los campos.");
            return;
        }

        alert(`¡Cuenta creada!\nNombre: ${nombre}\nCorreo: ${correo}`);
        inputNombre.value = "";
        inputCorreo.value = "";
        modal.classList.add('hidden');
    });
}

// ========== PRODUCTOS ==========
const products = [
    { id: 1, name: "Laptop Gamer RTX 4060", price: 1200, rating: 4.5, category: "computing", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop" },
    { id: 2, name: "Audífonos Inalámbricos Pro", price: 80, rating: 4.7, category: "audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
    { id: 3, name: "Teclado Mecánico Inalambrico", price: 100, rating: 4.4, category: "computing", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop" },
    { id: 4, name: "Altavoz Bluetooth Portátil", price: 60, rating: 4.3, category: "audio", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop" },
    { id: 5, name: "Smartphone 5G 256GB", price: 900, rating: 4.6, category: "electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop" },
    { id: 6, name: "Monitor 27\" 4K 144Hz", price: 350, rating: 4.5, category: "computing", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop" },
    { id: 7, name: "Auriculares Gaming 7.1", price: 95, rating: 4.6, category: "audio", image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop" },
    { id: 8, name: "PC Gamer Completa", price: 1800, rating: 4.8, category: "computing", image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop" },
    { id: 9, name: "Audífonos Cancelación Ruido", price: 150, rating: 4.7, category: "audio", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop" },
    { id: 10, name: "Mouse 16000DPI", price: 65, rating: 4.4, category: "computing", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop" },
    { id: 11, name: "Tablet Pro 12.9\" 5G", price: 850, rating: 4.5, category: "electronics", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop" },
    { id: 12, name: "Soundbar 5.1 Dolby Atmos", price: 280, rating: 4.6, category: "audio", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop" },
    { id: 13, name: "Laptop Ultrabook i7", price: 1100, rating: 4.5, category: "computing", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop" },
    { id: 14, name: "Auriculares Deportivos IPX7", price: 55, rating: 4.3, category: "audio", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop" },
    { id: 15, name: "Pc Gamer", price: 3500, rating: 4.7, category: "computing", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop" },
    { id: 16, name: "Smartwatch Ultra GPS", price: 420, rating: 4.6, category: "electronics", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop" },
    { id: 17, name: "Micrófono Streaming USB", price: 110, rating: 4.5, category: "audio", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop" },
    { id: 18, name: "Webcam 4K HDR", price: 150, rating: 4.4, category: "computing", image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=400&fit=crop" },
    { id: 19, name: "Cámara Acción 60fps", price: 380, rating: 4.7, category: "electronics", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop" },
    { id: 20, name: "Estación de Carga Inalámbrica", price: 45, rating: 4.2, category: "electronics", image: "https://images.unsplash.com/photo-1603674554159-b62f6febbce5?w=400&h=400&fit=crop" }
];

// ========== RENDERIZAR PRODUCTOS ==========
function renderProducts(category = 'all') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    grid.innerHTML = filtered.map(product => `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105">
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover" />
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${product.name}</h3>
                <div class="flex items-center gap-1 mb-3">
                    ${[...Array(5)].map((_, i) => `<i class="fas fa-star ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}"></i>`).join('')}
                    <span class="text-sm text-gray-600 ml-1">(${product.rating})</span>
                </div>
                <span class="text-3xl font-bold text-gray-900 mb-4 block">$${product.price}</span>
                <button onclick="addToCart(${product.id})" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    <i class="fas fa-shopping-cart mr-2"></i> Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// ========== AGREGAR AL CARRITO CON LOCALSTORAGE ==========
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Obtener carrito actual
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Agregar producto
    cart.push(product);

    // Guardar carrito
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('¡Producto agregado al carrito!');
}

// ========== FILTROS ==========
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
            b.classList.remove('bg-blue-600', 'text-white');
            b.classList.add('bg-gray-200', 'text-gray-700');
        });

        btn.classList.remove('bg-gray-200', 'text-gray-700');
        btn.classList.add('bg-blue-600', 'text-white');

        renderProducts(btn.dataset.category);
    });
});

// ========== RENDER INICIAL ==========
renderProducts();
