function calcCartPrice() {
    let totalCartPrice = 0; // Сбрасываем общую сумму корзины
    const cartItems = document.querySelectorAll('.cart-wrapper .card');

    cartItems.forEach(item => {
        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('.price__currency');

        if (amountEl && priceEl) {
            // Убираем точки и пробелы, преобразуем в число
            const amount = parseFloat(amountEl.innerText.replace(/\./g, '').replace(/[^0-9]/g, ''));
            const price = parseFloat(priceEl.innerText.replace(/\./g, '').replace(/[^0-9]/g, ''));

            console.log(`Количество: ${amount}, Цена: ${price}`); // Отладочное сообщение

            if (!isNaN(amount) && !isNaN(price)) {
                const itemTotalPrice = amount * price; // Общая стоимость текущего товара
                totalCartPrice += itemTotalPrice; // Добавляем стоимость текущего товара к общей
            }
        }
    });

    const deliveryCost = 10000; // Фиксированная стоимость доставки
    totalCartPrice += deliveryCost; // Добавляем стоимость доставки к общей

    // Обновление отображаемой суммы в интерфейсе
    document.querySelector('.total-price').innerText = `${totalCartPrice.toLocaleString()} UZS (включая доставку: ${deliveryCost.toLocaleString()} UZS)`;
}
