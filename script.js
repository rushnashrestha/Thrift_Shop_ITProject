const products = [
    {
        id: 1,
        title: "Olive Color Men Shirt",
        description: "Wore only 1 time and is in a good condition.",
        price: 850,
        image: "img/2.png"
    },
    {
        id: 2,
        title: "Red Dress",
        description: "Wore only 1 time and is in a good condition.",
        price: 1000,
        image: "img/red_d.png"
    },
    {
        id: 3,
        title: "Jordan Shoes",
        description: "Wore only 3 times and is in a good condition.",
        price: 2500,
        image: "img/1.png"
    },
    {
        id: 4,
        title: "Shorts",
        description: "It is new, never wore before and is in a good condition.",
        price: 650,
        image: "img/shorts.png"
    },
    {
        id: 5,
        title: "Sierra Brown Pant",
        description: "Wore only 1 time and is in a good condition.",
        price: 900,
        image: "img/sierra_pant.png"
    },
    {
        id: 6,
        title: "Yellow Hoodie",
        description: "Wore only 2 time and is in a good condition.",
        price: 1200,
        image: "img/7.png"
    },
];

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Get the product list and elements
const productList = document.getElementById('productList');
const cartItemsElement = document.getElementById('cartItem');
const cartTotalElement = document.getElementById('cartTotal');

// Store cart items in local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render product on page
function renderProducts() {
    productList.innerHTML = products.map(
        (product) => `
        <div class="product">
          <img src="${product.image}" alt="">
          <div class="product-info">
            <span class="product-title">${product.title}</span>
            <h5>${product.description}</h5>
            <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <h4 class="product-price">Rs.${product.price}</h4>
            <a href="#" class="add-to-cart" data-id="${product.id}"><i class="fa-solid fa-cart-shopping"></i></a>
          </div>
        </div>
      `
    ).join("");

      // Add to cart event listeners
      const addToCartButtons = document.getElementsByClassName('add-to-cart');
      for (let i = 0; i < addToCartButtons.length; i++) {
          const addToCartButton = addToCartButtons[i];
          addToCartButton.addEventListener('click', addToCart);
      }
  }
  
  // Add to Cart
  function addToCart(event) {
      event.preventDefault(); // Prevent default link behavior
  
      const productId = parseInt(event.currentTarget.dataset.id);
      const product = products.find((product) => product.id === productId);
  
      if (product) {
          // If Product already in cart
          const existingItem = cart.find((item) => item.id === productId);
  
          if (existingItem) {
              existingItem.quantity++;
          } else {
              const cartItem = {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
              };
              cart.push(cartItem);
          }
  
          // Render cart items and update local storage
          renderCartItems();
          saveToLocalStorage();
      }
  }
  
  // Render Cart Items
  function renderCartItems() {
      cartItemsElement.innerHTML = cart.map(
          (item) => `
          <div class="cart-item">
              <img src="${item.image}" alt="${item.title}">
              <div class="cart-item-info">
                  <h2 class="cart-item-title">${item.title}</h2>
                  <input class="cart-item-quantity" type="number" name="" min="1" value="${item.quantity}" data-id="${item.id}">
              </div>
              <h2 class="cart-item-price">$${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
          </div>
          `
      ).join("");
  
      // Remove from cart event listeners
      const removeButtons = document.getElementsByClassName('remove-from-cart');
      for (let i = 0; i < removeButtons.length; i++) {
          const removeButton = removeButtons[i];
          removeButton.addEventListener('click', removeFromCart);
      }
  }
  
  // Remove from Cart
  function removeFromCart(event) {
      const productId = parseInt(event.currentTarget.dataset.id);
      cart = cart.filter((item) => item.id !== productId);
  
      // Render cart items and update local storage
      renderCartItems();
      saveToLocalStorage();
  }
  
  // Save to Local Storage
  function saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Check if on Cart Page
  if (window.location.pathname.includes("cart.html")) {
      renderCartItems();
  } else {
      renderProducts();
  }

// Call the renderProducts function
renderProducts();
renderCartItems();