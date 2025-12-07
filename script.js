// Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
    burger.addEventListener('click', function() {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновление счетчика корзины
function updateCartCounter() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Сохранение корзины
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

// Открытие/закрытие модального окна корзины
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.modal-close');
const checkoutBtn = document.getElementById('checkout');

// Открытие корзины
if (cartBtn) {
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'flex';
        renderCart();
    });
}

// Закрытие корзины
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
}

// Клик вне модального окна
window.addEventListener('click', function(e) {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Оформление заказа
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`✅ Заказ оформлен!\n\nИтого: ${total} ₽\n\nСпасибо за покупку! Мы свяжемся с вами для подтверждения.`);
        
        cart = [];
        saveCart();
        cartModal.style.display = 'none';
        renderCart();
    });
}

// Отображение корзины
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    if (!cartItems || !totalPrice) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Корзина пуста</p>';
        totalPrice.textContent = '0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        html += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${item.price} ₽ × ${item.quantity}</p>
                <button onclick="removeFromCart(${index})" class="btn-remove">Удалить</button>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    totalPrice.textContent = total;
}

// Удаление из корзины
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
});

// Функция для добавления товара в корзину (вызывается из catalog.js)
window.addToCart = function(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    saveCart();
    
    // Показываем уведомление
    showNotification(`Товар "${productName}" добавлен в корзину!`);
    
    return true;
}

// Функция показа уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Добавляем анимацию
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}
// Обработка формы обратной связи
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = this.querySelector('input[type="text"]').value;
            const email = this.
querySelector('input[type="email"]').value;
            
            // Показываем сообщение об успехе
            alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами по email: ${email}`);
            
            // Сбрасываем форму
            this.reset();
        });
        
        // Маска для телефона
        const phoneInput = document.getElementById('phone-input');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                }
                e.target.value = value.substring(0, 18);
            });
        }
