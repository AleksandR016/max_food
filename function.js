// Функция для переключения статуса корзины
function toggleCardStatus() {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');

    // Проверяем, есть ли элементы в корзине
    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none'); // Если есть, скрываем сообщение о пустой корзине
    } else {
        cartEmptyBadge.classList.remove('none'); // Если нет, показываем сообщение о пустой корзине
    }
}

// Функция для добавления товара в корзину
document.addEventListener('DOMContentLoaded', function() {
    const cartWrapper = document.querySelector('.cart-wrapper');

    window.addEventListener('click', function(event) {
        // Проверяем, нажали ли на кнопку "Добавить в корзину"
        if (event.target.hasAttribute('data-cart')) {
            console.log('Нажали на кнопку "Добавить в корзину"');

            const card = event.target.closest('.card');

            // Проверяем, найден ли элемент card
            if (!card) {
                console.error('Card not found');
                return;
            }

            // Извлекаем информацию о продукте
            const imgElement = card.querySelector('.product-img');
            const titleElement = card.querySelector('.item-title');
            const itemsInBoxElement = card.querySelector('[data-items-in-box]');
            const weightElement = card.querySelector('.price__weight');
            const priceElement = card.querySelector('.price__currency');
            const counterElement = card.querySelector('[data-counter]');

            const productInfo = {
                id: card.dataset.id,
                imgSrc: imgElement ? imgElement.getAttribute('src') : '',
                title: titleElement ? titleElement.innerText : '',
                itemsInBox: itemsInBoxElement ? itemsInBoxElement.innerText : '',
                weight: weightElement ? weightElement.innerText : '',
                price: priceElement ? priceElement.innerText : '',
                counter: parseInt(counterElement ? counterElement.innerText : '1', 10) // получаем количество
            };

            // Проверяем, существует ли уже элемент в корзине
            const existingCartItem = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
            if (existingCartItem) {
                const existingCounterElement = existingCartItem.querySelector('[data-counter]');
                existingCounterElement.innerText = parseInt(existingCounterElement.innerText) + productInfo.counter; // обновляем количество
            } else {
                // Если товар в корзине отсутствует, создаем новый элемент
                const cartItemHTML = `
                    <div class="col-md-6">
                        <div class="card mb-4" data-id="${productInfo.id}">
                            <img class="product-img" src="${productInfo.imgSrc}" alt="${productInfo.title}">
                            <div class="card-body text-center">
                                <h4 class="item-title">${productInfo.title}</h4>
                                <p><small class="text-muted">${productInfo.itemsInBox}</small></p>
                                <div class="details-wrapper">
                                    <div class="items counter-wrapper">
                                        <div class="items__control" data-action="minus">-</div>
                                        <div class="items__current" data-counter="">${productInfo.counter}</div>
                                        <div class="items__control" data-action="plus">+</div>
                                    </div>
                                    <div class="price">
                                        <div class="price__weight">${productInfo.weight}</div>
                                        <div class="price__currency">${productInfo.price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
            }

            // Обновляем количество в карточке товара
            card.querySelector('[data-counter]').innerText = '1';

            // Вызываем функции для обновления статуса и расчета общей стоимости корзины
            toggleCardStatus();
            calcCartPrice();
        }
    });
});

// Функция для расчета общей стоимости корзины
function calcCartPrice() {
    let totalCartPrice = 0; // Сбрасываем общую сумму корзины
    const cartItems = document.querySelectorAll('.cart-wrapper .card'); // Находим все товары в корзине

    cartItems.forEach(item => {
        const amountEl = item.querySelector('[data-counter]'); // Элемент с количеством товара
        const priceEl = item.querySelector('.price__currency'); // Элемент с ценой товара

        if (amountEl && priceEl) {
            // Убираем точки и пробелы, преобразуем в число
            const amount = parseFloat(amountEl.innerText.replace(/\./g, '').replace(/[^0-9]/g, '')); // Получаем количество
            const price = parseFloat(priceEl.innerText.replace(/\./g, '').replace(/[^0-9]/g, '')); // Получаем цену

            console.log(`Количество: ${amount}, Цена: ${price}`); // Отладочное сообщение

            // Проверяем, чтобы значения были валидными
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

// Функция для переключения статуса корзины (проверка на пустоту)
function toggleCardStatus() {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');

    // Проверяем, есть ли элементы в корзине
    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none'); // Если есть, скрываем сообщение о пустой корзине
    } else {
        cartEmptyBadge.classList.remove('none'); // Если нет, показываем сообщение о пустой корзине
    }
}
