// Giỏ hàng - Logic xử lý giỏ hàng

// Giữ trạng thái checkbox đã chọn ngay cả khi render lại
const CartPageState = {
  selectedKeys: new Set(),
};

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsEl = document.getElementById('cart-items');
  const selectAllCheckbox = document.getElementById('select-all');
  const backBtn = document.getElementById('back-btn');
  const checkoutBtn = document.getElementById('checkout-btn');

  const nf = new Intl.NumberFormat('vi-VN');
  const formatCurrency = (num) => `${nf.format(num)}đ`;

  const getItems = () => CartService.getItems();
  const setItems = (items) => CartService.setItems(items);

  function syncSelectAll(items) {
    if (!items.length) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
      return;
    }

    const selectedCount = items.filter(item => CartPageState.selectedKeys.has(item.uniqueKey)).length;
    selectAllCheckbox.checked = selectedCount === items.length;
    selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < items.length;
  }

  function updateSummary() {
    const items = getItems();
    const selectedItems = items.filter(item => CartPageState.selectedKeys.has(item.uniqueKey));

    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const savings = selectedItems.reduce((sum, item) => {
      const discount = (item.oldPrice || 0) - item.price;
      return sum + discount * item.qty;
    }, 0);

    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('savings').textContent = formatCurrency(savings);
    document.getElementById('total').textContent = formatCurrency(subtotal);
  }

  function renderCart() {
    const items = getItems();
    cartItemsEl.innerHTML = '';

    if (items.length === 0) {
      cartItemsEl.innerHTML = '<div class="cart-empty">Giỏ hàng của bạn trống. Tiếp tục mua sắm!</div>';
      checkoutBtn.disabled = true;
      CartService.updateCartCount();
      syncSelectAll(items);
      updateSummary();
      return;
    }

    checkoutBtn.disabled = false;

    if (CartPageState.selectedKeys.size === 0) {
      items.forEach(item => CartPageState.selectedKeys.add(item.uniqueKey));
    }

    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'cart-item';

      row.innerHTML = `
        <input type="checkbox" class="item-checkbox" data-key="${item.uniqueKey}" ${CartPageState.selectedKeys.has(item.uniqueKey) ? 'checked' : ''} />
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <div class="cart-item-info">
          <div class="cart-item-name">
            ${item.name}
            ${item.color ? `<span style="display: inline-block; margin-left: 8px; padding: 2px 8px; background: #f0f0f0; border-radius: 4px; font-size: 11px; color: #666; font-weight: normal;">Màu: <strong>${item.color}</strong></span>` : ''}
          </div>
          <div class="cart-item-price">
            ${formatCurrency(item.price)}
            ${item.oldPrice ? `<del>${formatCurrency(item.oldPrice)}</del>` : ''}
          </div>
        </div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn qty-decrease">−</button>
          <input type="number" class="cart-qty-input qty-input" value="${item.qty}" min="1" />
          <button class="cart-qty-btn qty-increase">+</button>
          <button class="cart-remove-btn">🗑</button>
        </div>
      `;

      const checkbox = row.querySelector('.item-checkbox');
      const qtyDecrease = row.querySelector('.qty-decrease');
      const qtyIncrease = row.querySelector('.qty-increase');
      const qtyInput = row.querySelector('.qty-input');
      const removeBtn = row.querySelector('.cart-remove-btn');

      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          CartPageState.selectedKeys.add(item.uniqueKey);
        } else {
          CartPageState.selectedKeys.delete(item.uniqueKey);
        }
        syncSelectAll(items);
        updateSummary();
      });

      const onQtyChange = (newQty) => {
        const sanitizedQty = Math.max(1, newQty);
        if (item.qty !== sanitizedQty) {
          item.qty = sanitizedQty;
          CartService.updateItemQty(item.uniqueKey, sanitizedQty);
          CartService.updateCartCount();
          updateCartUI();
        }
      };

      qtyDecrease.addEventListener('click', () => onQtyChange(item.qty - 1));
      qtyIncrease.addEventListener('click', () => onQtyChange(item.qty + 1));

      qtyInput.addEventListener('change', (e) => {
        onQtyChange(Number(e.target.value) || 1);
      });

      removeBtn.addEventListener('click', () => {
        CartService.removeItem(item.uniqueKey);
        CartPageState.selectedKeys.delete(item.uniqueKey);
        CartService.updateCartCount();
        UIService.showToast('Đã xóa sản phẩm khỏi giỏ hàng');
        updateCartUI();
      });

      cartItemsEl.appendChild(row);
    });

    syncSelectAll(items);
    updateSummary();
  }

  function updateCartUI() {
    renderCart();
    updateSummary();
  }

  selectAllCheckbox.addEventListener('change', () => {
    const items = getItems();
    if (selectAllCheckbox.checked) {
      items.forEach(item => CartPageState.selectedKeys.add(item.uniqueKey));
    } else {
      CartPageState.selectedKeys.clear();
    }
    document.querySelectorAll('.item-checkbox').forEach(cb => (cb.checked = selectAllCheckbox.checked));
    updateSummary();
  });

  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  checkoutBtn.addEventListener('click', () => {
    const selectedItems = getItems().filter(item => CartPageState.selectedKeys.has(item.uniqueKey));
    if (selectedItems.length > 0) {
      UIService.showToast('Chuyển đến trang thanh toán...');
    } else {
      UIService.showToast('Vui lòng chọn sản phẩm');
    }
  });

  CartService.updateCartCount();
  CartService.updateCartCountDisplay();
  renderCart();
  updateSummary();
});
