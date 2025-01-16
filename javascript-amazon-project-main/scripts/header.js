import cart from "../data/cart-class.js";

export function loadHeader() {
  let headerHTML = `
    <div class="amazon-header-left-section">
      <a href="amazon.html" class="header-link">
        <img class="amazon-logo"
          src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
          src="images/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="amazon-header-middle-section">
      <input class="search-bar js-search-bar" type="text" placeholder="Search">

      <button class="search-button js-search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>
    </div>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity js-cart-quantity"></div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  `;

  document.querySelector('.js-amazon-header').innerHTML = headerHTML;

  const cartQuantity = cart.updateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`;
  
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchString = (document.querySelector('.js-search-bar').value).toLowerCase();
    window.location.href = `amazon.html?search=${searchString}`;
  })

  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const searchString = (document.querySelector('.js-search-bar').value).toLowerCase();
      window.location.href = `amazon.html?search=${searchString}`;
    }
  })
}

export default loadHeader;
