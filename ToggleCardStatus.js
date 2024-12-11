// Функция для переключения статуса корзины
function toggleCardStatus() {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');

    // Проверяем, есть ли элементы в корзине
    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none');
    } else {
        cartEmptyBadge.classList.remove('none');
    }
}


