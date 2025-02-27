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

// Toggle cart dropdown
document.addEventListener("DOMContentLoaded", function () {
  const cartBtn = document.querySelector(".cart-btn");
  const cartContent = document.querySelector(".cart-content");

  cartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    cartContent.style.display =
      cartContent.style.display === "block" ? "none" : "block";
  });

  // Close cart dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.matches(".cart-btn")) {
      cartContent.style.display = "none";
    }
  });
});

// Render products on page load
document.addEventListener("DOMContentLoaded", renderProducts);
