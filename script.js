// Catálogo Completo
const products = [
    { id: 1, name: "Camiseta Basic Premium", price: 79.90, category: "masculino", type: "clothing", tag: "NOVIDADE", rating: 4.9, reviews: 32, colors: ["#000000", "#FFFFFF", "#808080"], img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Vestido Midi Elegance", price: 159.90, category: "feminino", type: "clothing", tag: "MAIS VENDIDO", rating: 5.0, reviews: 48, colors: ["#000000", "#808080"], img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Tênis Casual Sport", price: 219.90, category: "calcados", type: "shoes", tag: "NOVIDADE", rating: 4.8, reviews: 19, colors: ["#FFFFFF", "#000000"], img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Calça Jeans Slim", price: 129.90, category: "masculino", type: "clothing", tag: "", rating: 4.7, reviews: 15, colors: ["#1B365D", "#000000"], img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Jaqueta Couro Sintético", price: 249.90, category: "feminino", type: "clothing", tag: "ÚLTIMAS UNIDADES", rating: 4.9, reviews: 27, colors: ["#000000"], img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Sandália Salto Bloco", price: 139.90, category: "calcados", type: "shoes", tag: "", rating: 4.6, reviews: 11, colors: ["#000000", "#D2B48C"], img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Bermuda Chino Casual", price: 89.90, category: "masculino", type: "clothing", tag: "", rating: 4.8, reviews: 22, colors: ["#F5F5DC", "#000000"], img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Blusa Tricot Primavera", price: 119.90, category: "feminino", type: "clothing", tag: "NOVIDADE", rating: 4.9, reviews: 14, colors: ["#FFFFFF", "#000000"], img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80" },
    { id: 9, name: "Bolsa de Couro Crossbody", price: 149.90, category: "acessorios", type: "clothing", tag: "MAIS VENDIDO", rating: 5.0, reviews: 53, colors: ["#000000", "#8B4513"], img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80" },
    { id: 10, name: "Óculos de Sol Classic", price: 69.90, category: "acessorios", type: "clothing", tag: "", rating: 4.7, reviews: 18, colors: ["#000000"], img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80" },
    { id: 11, name: "Cinto de Couro Fivela", price: 49.90, category: "acessorios", type: "clothing", tag: "", rating: 4.5, reviews: 9, colors: ["#000000"], img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80" },
    { id: 12, name: "Sapato Social Modern", price: 189.90, category: "calcados", type: "shoes", tag: "", rating: 4.8, reviews: 16, colors: ["#000000"], img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80" }
];

// Dados para Notificação de Prova Social Flutuante
const recentSales = [
    { name: "Juliana S.", city: "Ipatinga", product: "Vestido Midi Elegance" },
    { name: "Lucas M.", city: "Coronel Fabriciano", product: "Camiseta Basic Premium" },
    { name: "Carla T.", city: "Timóteo", product: "Bolsa de Couro Crossbody" },
    { name: "Fernanda R.", city: "Ipatinga", product: "Sandália Salto Bloco" }
];

let cart = [];
let selectedColors = {};
let currentCategory = 'todos';
let discountRate = 0;

function renderProducts(items = products) {
    const grid = document.getElementById('productGrid');
    const count = document.getElementById('productCount');
    if (!grid) return;

    count.innerText = `${items.length} produto(s) encontrado(s)`;

    grid.innerHTML = items.map(p => {
        const sizes = p.type === 'shoes' 
            ? ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43'] 
            : ['P', 'M', 'G', 'GG'];

        const installment = (p.price / 3).toFixed(2).replace('.', ',');

        return `
            <div class="product-card">
                ${p.tag ? `<span class="badge-tag">${p.tag}</span>` : ''}
                <div class="product-image-wrapper">
                    <img src="${p.img}" class="product-image" alt="${p.name}">
                </div>
                <div class="product-info">
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i> <strong>${p.rating}</strong> <span>(${p.reviews})</span>
                    </div>
                    <span class="product-category">${p.category}</span>
                    <h4 class="product-name">${p.name}</h4>
                    <span class="product-price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                    <span class="installment">ou 3x de R$ ${installment}</span>
                    
                    <div class="product-options">
                        <div class="option-header">
                            <span class="option-label" style="font-size:0.75rem;">Tam:</span>
                            <button class="size-guide-btn" onclick="openSizeGuide()">Tabela de Medidas</button>
                        </div>
                        <div class="option-group">
                            <select id="size-${p.id}" class="size-select">
                                <option value="">Selecione o tamanho</option>
                                ${sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
                            </select>
                        </div>
                        <div class="option-group" style="margin-top:4px;">
                            <span class="option-label">Cor:</span>
                            <div class="color-dots">
                                ${p.colors.map(c => `
                                    <div class="color-dot" 
                                         style="background-color: ${c}" 
                                         onclick="selectColor(${p.id}, '${c}', this)"></div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <button class="btn-add-cart" onclick="addToCart(${p.id})">
                        ADICIONAR À SACOLA
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function filterCategory(category, element) {
    currentCategory = category;
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    filterProducts();
}

function filterProducts() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    let filtered = products.filter(p => {
        const matchesCategory = currentCategory === 'todos' || p.category === currentCategory;
        const matchesSearch = p.name.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
    });

    const sortValue = document.getElementById('sortSelect').value;
    filtered = sortList(filtered, sortValue);

    renderProducts(filtered);
}

function sortProducts(criteria) {
    filterProducts();
}

function sortList(list, criteria) {
    if (criteria === 'menor-preco') {
        return list.sort((a, b) => a.price - b.price);
    } else if (criteria === 'maior-preco') {
        return list.sort((a, b) => b.price - a.price);
    } else if (criteria === 'nome') {
        return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
}

function selectColor(productId, color, element) {
    selectedColors[productId] = color;
    const parent = element.parentElement;
    parent.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('selected'));
    element.classList.add('selected');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const sizeSelect = document.getElementById(`size-${productId}`);
    const selectedSize = sizeSelect.value;
    const selectedColor = selectedColors[productId];

    if (!selectedSize) {
        alert("Por favor, selecione o TAMANHO.");
        return;
    }
    if (!selectedColor) {
        alert("Por favor, selecione a COR.");
        return;
    }

    cart.push({
        ...product,
        size: selectedSize,
        color: selectedColor
    });

    updateCart();
    showToast("Produto adicionado à sacola!");
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2500);
}

function applyCoupon() {
    const code = document.getElementById('couponCode').value.trim().toUpperCase();
    if (code === 'PRIMEIRA10') {
        discountRate = 0.10;
        showToast("Cupom de 10% aplicado!");
        updateCart();
    } else {
        alert("Cupom inválido!");
    }
}

function updateCart() {
    document.getElementById('cartBadge').innerText = cart.length;
    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartBody.innerHTML = "<p style='font-size:0.85rem; color:#666;'>Sua sacola está vazia.</p>";
        cartTotal.innerText = "R$ 0,00";
        updateShippingBar(0);
        return;
    }

    let rawTotal = 0;
    cartBody.innerHTML = cart.map((item, index) => {
        rawTotal += item.price;
        return `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>Tam: ${item.size}</small><br>
                    <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <button onclick="removeFromCart(${index})" style="border:none; background:none; color:#000; cursor:pointer;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
    }).join('');

    const finalTotal = rawTotal * (1 - discountRate);
    if (discountRate > 0) {
        cartTotal.innerHTML = `<s style="font-size:0.8rem; color:#888;">R$ ${rawTotal.toFixed(2).replace('.', ',')}</s> R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
    } else {
        cartTotal.innerText = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
    }

    updateShippingBar(rawTotal);
}

function updateShippingBar(total) {
    const freeShippingGoal = 250;
    const msg = document.getElementById('shippingMsg');
    const fill = document.getElementById('shippingProgress');

    if (total >= freeShippingGoal) {
        msg.innerHTML = "<strong>PARABÉNS!</strong> Você ganhou <strong>FRETE GRÁTIS</strong>!";
        fill.style.width = "100%";
    } else {
        const remaining = freeShippingGoal - total;
        const percentage = (total / freeShippingGoal) * 100;
        msg.innerHTML = `Faltam R$ ${remaining.toFixed(2).replace('.', ',')} para <strong>FRETE GRÁTIS</strong>`;
        fill.style.width = `${percentage}%`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function toggleDeliveryType(value) {
    const addressFields = document.getElementById('addressFields');
    if (value === 'entrega') {
        addressFields.classList.add('active');
    } else {
        addressFields.classList.remove('active');
    }
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }

    const name = document.getElementById('custName').value.trim();
    const payment = document.getElementById('custPayment').value;
    const deliveryType = document.getElementById('deliveryType').value;

    if (!name) {
        alert("Por favor, informe seu Nome.");
        return;
    }

    let deliveryDetails = "";
    if (deliveryType === 'entrega') {
        const street = document.getElementById('custStreet').value.trim();
        const number = document.getElementById('custNumber').value.trim();

        if (!street || !number) {
            alert("Por favor, preencha o Endereço para entrega.");
            return;
        }
        deliveryDetails = `*Tipo:* Entrega em Casa\n*Endereço:* ${street}, Nº/Bairro: ${number}`;
    } else {
        deliveryDetails = `*Tipo:* Retirada na Loja (Av. 28 de Abril, 328, Ipatinga - MG)`;
    }

    let message = `*NOVO PEDIDO - PINTOU NOVIDADES*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Pagamento:* ${payment}\n`;
    message += `${deliveryDetails}\n\n`;
    message += `*ITENS:* \n`;

    let subtotal = 0;
    cart.forEach((item, i) => {
        message += `${i+1}. ${item.name} | Tam: ${item.size} | R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
        subtotal += item.price;
    });

    const total = subtotal * (1 - discountRate);

    if (discountRate > 0) {
        message += `\n*Desconto Aplicado:* 10% (PRIMEIRA10)`;
    }
    message += `\n*TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}`;

    const phone = "5531999999999"; 
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// Prova Social Flutuante (Loop a cada 12 segundos)
function startSalesPopup() {
    const pop = document.getElementById('salesPop');
    const popText = document.getElementById('salesPopText');
    let index = 0;

    setInterval(() => {
        const sale = recentSales[index];
        popText.innerHTML = `<strong>${sale.name}</strong> de ${sale.city} comprou <strong>${sale.product}</strong>`;
        pop.classList.add('active');

        setTimeout(() => {
            pop.classList.remove('active');
        }, 4000);

        index = (index + 1) % recentSales.length;
    }, 12000);
}

function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    answer.classList.toggle('active');
    if (answer.classList.contains('active')) {
        icon.className = 'fa-solid fa-minus';
    } else {
        icon.className = 'fa-solid fa-plus';
    }
}

function openAccountModal() { document.getElementById('accountModal').classList.add('active'); }
function closeAccountModal() { document.getElementById('accountModal').classList.remove('active'); }

function openSizeGuide() { document.getElementById('sizeGuideModal').classList.add('active'); }
function closeSizeGuide() { document.getElementById('sizeGuideModal').classList.remove('active'); }

document.addEventListener('DOMContentLoaded', () => { 
    renderProducts(); 
    setTimeout(startSalesPopup, 4000);
});
