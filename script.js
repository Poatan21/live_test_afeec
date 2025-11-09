// --------------------- SEARCH FUNCTION ---------------------
function searchProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const name = product.querySelector('h3').textContent.toLowerCase();
    product.style.display = name.includes(input) ? 'block' : 'none';
  });
}

// --------------------- CATEGORY FILTER ---------------------
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.getAttribute('data-category');
    filterCategory(category);
  });
});

function filterCategory(category) {
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    const match = category === 'all' || product.dataset.category === category;
    product.style.display = match ? 'block' : 'none';
  });
}

// --------------------- CART ---------------------
let cart = [];

function addToCart(name, price, img) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1, img });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount'); // badge on icon
  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>₱${item.price.toLocaleString()}</p>
          <div class="quantity">
            <button onclick="decreaseQty(${index})">-</button>
            <input type="text" value="${item.qty}" readonly>
            <button onclick="increaseQty(${index})">+</button>
          </div>
        </div>
        <button onclick="removeItem(${index})" class="remove-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = count > 0 ? count : '';
}

function increaseQty(index) {
  cart[index].qty++;
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// --------------------- CART MODAL ---------------------
function openCartModal() {
  document.getElementById('cartModal').style.display = 'flex';
}

function closeCartModal() {
  document.getElementById('cartModal').style.display = 'none';
}

const cartIcon = document.getElementById('cartIcon');
if (cartIcon) cartIcon.addEventListener('click', openCartModal);

const closeCartBtn = document.querySelector('.close-cart');
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartModal);

// --------------------- PRODUCT MODAL ---------------------
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const likeBtn = document.getElementById("likeBtn");
const closeModal = document.querySelector(".close-modal");

let currentIndex = 0;
let productImages = [];

// Sample products
const sampleProducts = [
  { name: "Crux Noir Shoes", price: 5899, desc: "High-top boots made from faux leather and heavily adorned with chains, studs, and cross charms for a bold and rebellious style.", images: ["https://i.imgur.com/iaGPxTM.jpg"] },
  { name: "Fearless Socks", price: 219, desc: "Bold and impactful, these socks often incorporate a strong logo, a graphic design, or a motivational text. They are built to stand out and make a statement", images: ["product2.jpg"] },
  { name: "Summer Croptop", price: 399, desc: "Lightweight croptop perfect for warm days.", images: ["product3.jpg"] },
  { name: "Street Jacket", price: 1299, desc: "Trendy street jacket for a bold look.", images: ["product4.jpg"] }
];

// Open product modal
document.querySelectorAll(".product").forEach((product, index) => {
  product.addEventListener("click", (e) => {
    e.stopPropagation();
    const item = sampleProducts[index % sampleProducts.length];
    modal.style.display = "flex";
    productImages = item.images;
    currentIndex = 0;
    modalImg.src = productImages[currentIndex];
    modalName.textContent = item.name;
    modalPrice.textContent = `₱${item.price.toLocaleString()}`;
    modalDesc.textContent = item.desc;
  });
});

// Close modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// Image navigation
document.querySelector(".next-btn").onclick = () => {
  currentIndex = (currentIndex + 1) % productImages.length;
  modalImg.src = productImages[currentIndex];
};
document.querySelector(".prev-btn").onclick = () => {
  currentIndex = (currentIndex - 1 + productImages.length) % productImages.length;
  modalImg.src = productImages[currentIndex];
};

// Like button
likeBtn.addEventListener("click", () => likeBtn.classList.toggle("liked"));
