const products = [
  { id: 1, name: "Laptop", price: 799.99 },
  { id: 2, name: "Headphones", price: 199.99 },
  { id: 3, name: "Smartphone", price: 599.99 },
];

const cart = [];

function formatPrice(value) {
  return value.toFixed(2);
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${formatPrice(item.price)}`;
    cartList.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = formatPrice(total);
  cartCount.textContent = cart.length;
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function renderProducts() {
  const container = document.getElementById("products");
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${formatPrice(product.price)}</p>
      <button>Add to Cart</button>
    `;
    div.querySelector("button").addEventListener("click", () => addToCart(product));
    container.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
