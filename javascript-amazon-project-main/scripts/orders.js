import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import cart from "../data/cart-class.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from "./utils/money.js";
import showAddedMessage from "./utils/added.js";
import loadHeader from "./header.js";

loadHeader();
loadPage();

async function loadPage() {
  await loadProductsFetch();

  let ordersHTML = '';

  orders.forEach(order => {
    const timeString = dayjs(order.orderTime).format('MMMM D');    

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${timeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${showProductsListHTML(order)}
        </div>
      </div>
    `;
  });

  function showProductsListHTML(order) {
    let productsListHTML = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);

      const deliveryTime = dayjs(productDetails.estimatedDeliveryTime).format('MMMM D'); 

      productsListHTML += `
        <div class="product-image-container">
            <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryTime}
          </div>
          <div class="product-quantity">
            Quantity: 
            <span class="js-product-quantity-${product.id}">${productDetails.quantity}</span>
          </div>
          <div class="buy-again-container">
            <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
            <span class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </span>
          </div>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;  
    })

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).innerHTML);
      
      cart.addToCart(productId, quantity);
      showAddedMessage(productId);
    })
  })
}