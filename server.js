document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Остановить стандартное поведение формы

    const userId = document.getElementById('userId').value; // Убедитесь, что id правильный
    const cartItems = []; // Массив для хранения заказанных товаров

    // Соберите все товары из корзины
    const items = document.querySelectorAll('.cart-wrapper .card'); // Измените селектор на правильный

    items.forEach(item => {
        const itemId = item.getAttribute('data-id'); // Получите ID товара
        const quantity = item.querySelector('[data-counter]').textContent; // Получите количество
        cartItems.push({ itemId, quantity }); // Добавьте товар в массив
    });

    // Отправка данных на сервер
    fetch('add_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, cartItems })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Сеть не отвечает или произошла ошибка.');
        }
        return response.json();
    })
    .then(data => {
        alert('Заказ добавлен: ' + data.message);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});
