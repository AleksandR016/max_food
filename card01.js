document.addEventListener('DOMContentLoaded', function() {
    const cartWrapper = document.querySelector('.cart-wrapper');

    window.addEventListener('click', function(event) {
        if (event.target.hasAttribute('data-cart')) {
            console.log('Нажали на кнопку "Добавить в корзину"');

            const card = event.target.closest('.card');

            // Проверяем, найден ли элемент card
            if (!card) {
                console.error('Card not found');
                return;
            }

            const imgElement = card.querySelector('.product-img');
            const titleElement = card.querySelector('.item-title');
            const itemsInBoxElement = card.querySelector('.data-items-in-box');
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
                counter: parseInt(counterElement ? counterElement.innerText : '1', 10) // используем parseInt для количества
            };

            // Проверяем, существует ли уже элемент в корзине
            const existingCartItem = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
            if (existingCartItem) {
                const existingCounterElement = existingCartItem.querySelector('[data-counter]');
                existingCounterElement.innerText = parseInt(existingCounterElement.innerText) + productInfo.counter; // обновляем количество
                return;
            }

            const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`)

            if(itemInCart){
                const counterElement = itemInCart.querySelector('[data-counter]')
                counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
            }else{

            



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
            `

            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
            }

            card.querySelector('[data-counter]').innerText = '1';
        };
        
        toggleCardStatus();

        calcCartPrice();
    });
});
