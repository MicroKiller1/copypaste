const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 799.99,
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Headphones",
    category: "Electronics",
    price: 199.99,
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "Coffee Mug",
    category: "Home",
    price: 9.99,
    image: "https://via.placeholder.com/200"
  },
  {
    id: 4,
    name: "Notebook",
    category: "Office",
    price: 4.99,
    image: "https://via.placeholder.com/200"
  }
];

let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
    const product = products.find((p) => p.id === item.id);
    if (!product) return;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${product.name} x${item.qty} - $${formatPrice(product.price * item.qty)}</span>
      <button class="remove" data-id="${product.id}">Remove</button>
    `;
    cartList.appendChild(li);
    total += product.price * item.qty;
  });
  cartTotal.textContent = formatPrice(total);
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  saveCart();
}

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function renderProducts(filter = "") {
  const container = document.getElementById("products");
  container.innerHTML = "";
  const query = filter.toLowerCase();
  products
    .filter((p) => p.name.toLowerCase().includes(query))
    .forEach((product) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${formatPrice(product.price)}</p>
        <button>Add to Cart</button>
      `;
      div.querySelector("button").addEventListener("click", () => addToCart(product.id));
      container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCart();
  document.getElementById("search").addEventListener("input", (e) => {
    renderProducts(e.target.value);
  });
  document.getElementById("cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      const id = parseInt(e.target.getAttribute("data-id"), 10);
      removeFromCart(id);
    }
  });
  document.getElementById("clear-cart").addEventListener("click", clearCart);
});
