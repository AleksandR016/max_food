window.addEventListener('click', function(event) {
    let counter;

    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        const counterWrapper = event.target.closest('.counter-wrapper');

        if (counterWrapper) {
            counter = counterWrapper.querySelector('[data-counter]');
        }

        if (event.target.dataset.action === 'plus') {
            if (counter) {
                counter.innerText = parseInt(counter.innerText) + 1;
                
            }
        } 

        if (event.target.dataset.action === 'minus') {
            if (counter && parseInt(counter.innerText) > 1) {
                counter.innerText = --counter.innerText;
            } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) ===1) {

                (event.target.closest('.card.mb-4').remove())
                    toggleCardStatus();
                
                
            }
        }
    }
});
