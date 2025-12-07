// ФИЛЬТРАЦИЯ ТОВАРОВ
document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const categoryFilter = document.getElementById('category-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const allProducts = document.querySelectorAll('.product-card');
    
    // Функция фильтрации
    function filterProducts() {
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        
        allProducts.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            
            if (selectedCategory === 'all') {
                product.style.display = 'block';
            } else if (productCategory === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    // Обработчики событий
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            if (categoryFilter) {
                categoryFilter.value = 'all';
                filterProducts();
            }
        });
    }
    
    // ОБРАБОТКА КНОПОК "В КОРЗИНУ"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseInt(this.getAttribute('data-price'));
            
            // Добавляем в корзину через функцию из script.js
            if (window.addToCart && typeof window.addToCart === 'function') {
                const success = window.addToCart(productId, productName, productPrice);
                
                if (success) {
                    // Анимация кнопки
                    animateAddToCartButton(this);
                }
            } else {
                // Резервный вариант, если функция не доступна
                addToCartLocal(productId, productName, productPrice, this);
            }
        });
    });
    
    // Функция анимации кнопки
    function animateAddToCartButton(button) {
        const originalText = button.textContent;
        const originalBg = button.style.backgroundColor;
        
        button.textContent = '✓ Добавлено';
        button.style.backgroundColor = '#4CAF50';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBg;
            button.disabled = false;
        }, 1500);
    }
    
    // Резервная функция добавления в корзину
    function addToCartLocal(productId, productName, productPrice, button) {
        // Получаем текущую корзину
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Проверяем, есть ли товар уже в корзине
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
        
        // Сохраняем корзину
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Обновляем счетчик
        updateCartCounter();
        
        // Анимация кнопки
        animateAddToCartButton(button);
        
        // Показываем уведомление
        showNotification(`Товар "${productName}" добавлен в корзину!`);
        
        return true;
    }
    
    // Функция обновления счетчика корзины
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
const cartCount = document.getElementById('cart-count');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }
    
    // Функция показа уведомления
    function showNotification(message) {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Добавляем стили
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
        
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    }
    
    // Обновляем счетчик при загрузке
    updateCartCounter();
});
