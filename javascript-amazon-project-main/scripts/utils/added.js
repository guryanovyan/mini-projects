const addedMessageTimeouts = {};

export function showAddedMessage(productId) {
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);        
    addedMessage.classList.add('added-to-cart-visible');
  
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
  
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000)
    addedMessageTimeouts[productId] = timeoutId;
}

export default showAddedMessage;