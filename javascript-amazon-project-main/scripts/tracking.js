import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import loadHeader from "./header.js";

loadHeader();
loadPage();

async function loadPage() {
  await loadProductsFetch();
  
  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId'); 
  const productId = url.searchParams.get('productId');

  const order = orders.find(order => order.id === orderId);
  const productDetails = order.products.find(product => product.productId === productId);

  const product = getProduct(productId);
  
  const timeString = dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D');

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${timeString}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label js-preparing-label">
        Preparing
      </div>
      <div class="progress-label js-shipped-label">
        Shipped
      </div>
      <div class="progress-label js-delivered-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
  
  const currentTime = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

  let deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
  deliveryProgress = Math.min(Math.max(deliveryProgress, 0), 100);
  deliveryProgress = deliveryProgress.toFixed(2);

  document.querySelector('.js-progress-bar').style.width = `${deliveryProgress}%`

  if (deliveryProgress <= 49) {
    document.querySelector('.js-preparing-label').classList.add('current-status');
  } else if (deliveryProgress > 49 && deliveryProgress < 100) {
    document.querySelector('.js-shipped-label').classList.add('current-status');
  } else {
    document.querySelector('.js-delivered-label').classList.add('current-status');
  }
}