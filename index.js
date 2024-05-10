// Get references to the necessary elements
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

// Sample data for cart items
const cartItems = [
  { id: 1, name: 'Product 1', price: 9.99, quantity: 1, liked: false },
  { id: 2, name: 'Product 2', price: 14.99, quantity: 2, liked: true },
  { id: 3, name: 'Product 3', price: 19.99, quantity: 1, liked: false },
];

// Function to render the cart items
function renderCartItems() {
  cartItemsEl.innerHTML = '';
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const cartItemEl = document.createElement('li');
    cartItemEl.classList.add('cart-item');

    const cartItemInfoEl = document.createElement('div');
    cartItemInfoEl.classList.add('cart-item-info');

    const cartItemNameEl = document.createElement('h3');
    cartItemNameEl.textContent = item.name;

    const cartItemPriceEl = document.createElement('span');
    cartItemPriceEl.classList.add('cart-item-price');
    cartItemPriceEl.textContent = `$${item.price.toFixed(2)}`;

    const cartItemActionsEl = document.createElement('div');
    cartItemActionsEl.classList.add('cart-item-actions');

    const decrementBtn = document.createElement('button');
    decrementBtn.textContent = '-';
    decrementBtn.addEventListener('click', () => decrementQuantity(item.id));

    const quantityEl = document.createElement('span');
    quantityEl.textContent = item.quantity;

    const incrementBtn = document.createElement('button');
    incrementBtn.textContent = '+';
    incrementBtn.addEventListener('click', () => incrementQuantity(item.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteItem(item.id));

    const likeBtnEl = document.createElement('button');
    likeBtnEl.classList.add('like-btn');
    likeBtnEl.innerHTML = '<i class="fa-regular fa-heart"></i>';
    if (item.liked) {
      likeBtnEl.classList.add('liked');
      likeBtnEl.innerHTML = '<i class="fa-solid fa-heart"></i>';
    }
    likeBtnEl.addEventListener('click', () => toggleLike(item.id));

    cartItemActionsEl.appendChild(decrementBtn);
    cartItemActionsEl.appendChild(quantityEl);
    cartItemActionsEl.appendChild(incrementBtn);
    cartItemActionsEl.appendChild(deleteBtn);
    cartItemActionsEl.appendChild(likeBtnEl);

    cartItemInfoEl.appendChild(cartItemNameEl);
    cartItemInfoEl.appendChild(cartItemPriceEl);

    cartItemEl.appendChild(cartItemInfoEl);
    cartItemEl.appendChild(cartItemActionsEl);

    cartItemsEl.appendChild(cartItemEl);

    totalPrice += item.price * item.quantity;
  });

  totalPriceEl.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to increment item quantity
function incrementQuantity(itemId) {
  const item = cartItems.find((item) => item.id === itemId);
  item.quantity++;
  renderCartItems();
}

// Function to decrement item quantity
function decrementQuantity(itemId) {
  const item = cartItems.find((item) => item.id === itemId);
  if (item.quantity > 1) {
    item.quantity--;
    renderCartItems();
  }
}

// Function to delete an item from the cart
function deleteItem(itemId) {
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    renderCartItems();
  }
}

// Function to toggle item like status
function toggleLike(itemId) {
  const item = cartItems.find((item) => item.id === itemId);
  item.liked = !item.liked;
  renderCartItems();
}

// Initial render of the cart items
renderCartItems();
