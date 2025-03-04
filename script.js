const API_URL = "http://localhost:5000/api";

// Initialize Swiper Carousel
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
  },
});

// Sample product data
const products = [
  {
    id: 1,
    name: "Men's T-Shirt",
    price: 499,
    image: "tshirt1.jpg",
  },
  {
    id: 2,
    name: "Women's Dress",
    price: 799,
    image: "womens dress.jpg",
  },
  {
    id: 3,
    name: "Sneakers",
    price: 1299,
    image: "sneakers.jpg",
  },
];

// Cart data
let cart = [];

// Function to render products
function renderProducts() {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = products
    .map(
      (product) => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `
    )
    .join("");
}

// Function to add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCartUI();
  alert(`Added ${product.name} to cart!`);
}

// Function to update the cart UI
function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");

  // Clear previous items
  cartItems.innerHTML = "";

  // Add new items
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <p>${item.name} - ₹${item.price}</p>
    `;
    cartItems.appendChild(cartItem);
  });

  // Update cart count
  cartCount.textContent = cart.length;
}

// Show login form
function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
}

// Show register form
function showRegister() {
  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

// Register user
async function register() {
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    alert("Registration successful!");
  } else {
    alert(data.msg || "Registration failed");
  }
}

// Login user
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    alert("Login successful!");
  } else {
    alert(data.msg || "Login failed");
  }
}

// Render products on page load
document.addEventListener("DOMContentLoaded", renderProducts);
