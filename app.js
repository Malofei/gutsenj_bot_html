// app.js
// Основная логика веб-приложения

const tg = window.Telegram.WebApp;
tg.expand();

let cart = [];
let currentView = 'main';
let carouselImages = [];
let currentImageIndex = 0;

// ===== КОРЗИНА =====
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (cart.length > 0) {
        badge.textContent = cart.length;
        badge.classList.add('active');
    } else {
        badge.classList.remove('active');
    }
}

function addToCart(id, name, price, priceNum) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        tg.showAlert('❌ Этот товар уже в корзине!');
        return;
    }

    cart.push({ id, name, price, priceNum });
    updateCartBadge();
    tg.showAlert('✅ Товар добавлен в корзину!\n\n' + name + '\n' + price);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartBadge();
    renderCart();
}

function showCart() {
    document.getElementById('mainView').style.display = 'none';
    document.getElementById('productsView').classList.remove('active');
    document.getElementById('productDetailView').classList.remove('active');
    document.getElementById('cartView').classList.add('active');
    document.getElementById('backButton').classList.remove('active');
    currentView = 'cart';
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <p>Корзина пуста</p>
            </div>
            <button class="buy-button" onclick="goBackFromCart()" style="margin-top: 20px;">
                ◀️ Вернуться в магазин
            </button>
        `;
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.priceNum, 0);
    let html = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">№${item.id} - ${item.name}</div>
                <div class="cart-item-price">${item.price}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑️ Удалить</button>
        </div>
    `).join('');

    html += `
        <div class="cart-total">💰 Итого: ${total} руб</div>
        <button class="order-button" id="orderButton" ontouchstart="placeOrder()" onclick="placeOrder()">✅ Оформить заказ (${cart.length} шт)</button>
        <button class="buy-button" onclick="goBackFromCart()" style="background: var(--tg-theme-secondary-bg-color, #f0f0f0); color: var(--tg-theme-text-color, #000); margin-top: 12px; margin-bottom: 60px;">
            ◀️ Вернуться в магазин
        </button>
    `;
    cartItems.innerHTML = html;

    // Прокручиваем вверх
    window.scrollTo(0, 0);
}

async function placeOrder() {
    // Показываем что функция вызвана
    tg.showAlert('🔄 Обработка заказа...');

    if (cart.length === 0) {
        tg.showAlert('❌ Корзина пуста!');
        return;
    }

    try {
        const total = cart.reduce((sum, item) => sum + item.priceNum, 0);
        const itemIds = cart.map(item => item.id).join(',');

        // Проверяем длину данных
        const orderCode = `order_${itemIds}_${total}_${Date.now()}`;

        if (orderCode.length > 500) {
            tg.showAlert('❌ Слишком много товаров в одном заказе!\n\nМаксимум можно заказать 5-6 товаров за раз.\n\nПожалуйста, разделите заказ на несколько частей.');
            return;
        }

        // Кодируем в base64
        const encodedOrder = btoa(orderCode);

        // Открываем бота
        const botUsername = 'gutsenj_bot';
        const deepLink = `https://t.me/${botUsername}?start=${encodedOrder}`;

        tg.openTelegramLink(deepLink);

        // Закрываем приложение через полсекунды
        setTimeout(() => {
            tg.close();
        }, 500);

    } catch (error) {
        tg.showAlert('❌ Ошибка при оформлении заказа!\n\n' + error.message + '\n\nПопробуйте уменьшить количество товаров.');
    }
}

// ===== НАВИГАЦИЯ =====
function showCategory(category) {
    const products = PRODUCTS[category];
    const info = THEME_INFO[category];
    displayProducts(products, info.title, info.info);
}

function showTheme(theme) {
    const themeProducts = getProductsByTheme(theme);
    const themeInfo = THEME_INFO[theme];

    if (!themeInfo) {
        console.error('Theme not found:', theme);
        return;
    }

    displayProducts(themeProducts, themeInfo.title, themeInfo.info);
}

function goBack() {
    if (currentView === 'detail') {
        document.getElementById('mainView').style.display = 'none';
        document.getElementById('productsView').classList.add('active');
        document.getElementById('productDetailView').classList.remove('active');
        document.getElementById('cartView').classList.remove('active');
        currentView = 'products';
    } else {
        document.getElementById('mainView').style.display = 'block';
        document.getElementById('productsView').classList.remove('active');
        document.getElementById('productDetailView').classList.remove('active');
        document.getElementById('cartView').classList.remove('active');
        document.getElementById('backButton').classList.remove('active');
        currentView = 'main';
    }
    window.scrollTo(0, 0);
}

function goBackFromCart() {
    document.getElementById('mainView').style.display = 'block';
    document.getElementById('productsView').classList.remove('active');
    document.getElementById('productDetailView').classList.remove('active');
    document.getElementById('cartView').classList.remove('active');
    currentView = 'main';
    window.scrollTo(0, 0);
}

// ===== ОТОБРАЖЕНИЕ ТОВАРОВ =====
function displayProducts(products, title, info) {
    document.getElementById('mainView').style.display = 'none';
    document.getElementById('cartView').classList.remove('active');
    document.getElementById('productDetailView').classList.remove('active');
    document.getElementById('productsView').classList.add('active');
    document.getElementById('backButton').classList.add('active');
    currentView = 'products';

    let html = `<div class="header"><h1>${title}</h1></div><div class="info-text">${info.replace(/\n/g, '<br>')}</div>`;

    if (!products || products.length === 0) {
        html += '<div class="empty-state"><div class="empty-state-icon">📦</div><p>Товары скоро появятся</p></div>';
    } else {
        products.forEach((product, productIndex) => {
            const carouselId = `carousel-${productIndex}`;
            const dotsId = `dots-${productIndex}`;

            html += `
                <div class="product-card">
                    <div class="product-carousel">
                        <div class="product-carousel-track" id="${carouselId}">
                            ${product.images.map((img, i) => `
                                <img src="${img}" class="product-carousel-image" alt="${product.name} - фото ${i + 1}">
                            `).join('')}
                        </div>
                        <div class="carousel-dots" id="${dotsId}">
                            ${product.images.map((_, i) => `<div class="carousel-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-header">
                            <span class="product-number">№${product.id}</span>
                            <span class="product-price">${product.price}</span>
                        </div>
                        <div class="product-name">${product.name}</div>
                        <button class="buy-button" style="background: #5856d6; margin-bottom: 8px;" onclick="showProductDetail(${product.id})">
                            🖼️ Карточка товара
                        </button>
                        <button class="buy-button" onclick="addToCart(${product.id}, \`${product.name}\`, '${product.price}', ${product.priceNum})">
                            🛒 Добавить в корзину
                        </button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('productsView').innerHTML = html;
    initializeCarousels(products);
    window.scrollTo(0, 0);
}

function initializeCarousels(products) {
    if (!products || products.length === 0) return;

    setTimeout(() => {
        products.forEach((product, productIndex) => {
            const carouselId = `carousel-${productIndex}`;
            const dotsId = `dots-${productIndex}`;
            const carousel = document.getElementById(carouselId);
            const dots = document.getElementById(dotsId);

            if (carousel && dots) {
                carousel.addEventListener('scroll', () => {
                    const scrollLeft = carousel.scrollLeft;
                    const itemWidth = carousel.offsetWidth;
                    const currentIndex = Math.round(scrollLeft / itemWidth);

                    const dotElements = dots.querySelectorAll('.carousel-dot');
                    dotElements.forEach((dot, i) => {
                        dot.classList.toggle('active', i === currentIndex);
                    });
                });
            }
        });
    }, 100);
}

function showProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return;

    document.getElementById('mainView').style.display = 'none';
    document.getElementById('productsView').classList.remove('active');
    document.getElementById('cartView').classList.remove('active');
    document.getElementById('productDetailView').classList.add('active');
    document.getElementById('backButton').classList.add('active');
    currentView = 'detail';

    document.getElementById('productDetailView').innerHTML = `
        <div class="header">
            <h1>${product.name}</h1>
            <p>№${product.id}</p>
        </div>
        <div class="product-detail-images">
            ${product.images.map((img, i) => `<img src="${img}" class="product-detail-image clickable-image" alt="${product.name} - фото ${i + 1}" onclick="openCarousel(${JSON.stringify(product.images)}, ${i})">`).join('')}
        </div>
        <div class="product-card" style="margin-bottom: 80px;">
            <div class="product-info">
                <div class="product-header">
                    <span class="product-number">№${product.id}</span>
                    <span class="product-price">${product.price}</span>
                </div>
                <div class="product-name">${product.name}</div>
                <div style="margin: 12px 0; color: var(--tg-theme-hint-color, #999); font-size: 14px;">
                    📸 Всего фотографий: ${product.images.length}
                </div>
                <button class="buy-button" onclick="addToCart(${product.id}, \`${product.name}\`, '${product.price}', ${product.priceNum})">
                    🛒 Добавить в корзину
                </button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// ===== МОДАЛЬНАЯ КАРУСЕЛЬ =====
function openCarousel(images, startIndex = 0) {
    carouselImages = images;
    currentImageIndex = startIndex;
    updateCarouselImage();
    document.getElementById('carouselModal').classList.add('active');
}

function closeCarousel() {
    document.getElementById('carouselModal').classList.remove('active');
}

function updateCarouselImage() {
    document.getElementById('carouselImage').src = carouselImages[currentImageIndex];
    document.getElementById('carouselCounter').textContent = `${currentImageIndex + 1} / ${carouselImages.length}`;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    updateCarouselImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarouselImage();
}

// Инициализация
updateCartBadge();