/**
 * cartService.js - Quản lý giỏ hàng
 */

const CartService = {
  // ===== CART ITEMS MANAGEMENT =====
  getItems() {
    return TaskService.getCartItems();
  },

  setItems(items) {
    TaskService.setCartItems(items);
  },

  addItem(productId, productData, selectedColor = 'Trắng') {
    const items = this.getItems();
    const uniqueKey = `${productId}_${selectedColor}`;
    const existingItem = items.find(item => item.uniqueKey === uniqueKey);

    // Lấy ảnh theo màu sắc
    let productImage = productData?.image || '';
    if (productData?.detail?.colorThumbnails) {
      const colorThumbnails = productData.detail.colorThumbnails;
      for (const [colorName, imageList] of Object.entries(colorThumbnails)) {
        if (colorName === selectedColor || colorName.toLowerCase() === selectedColor.toLowerCase()) {
          if (Array.isArray(imageList) && imageList.length > 0) {
            productImage = imageList[0];
            break;
          }
        }
      }
    }

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      items.push({
        id: productId,
        uniqueKey: uniqueKey,
        name: productData?.name || 'Sản phẩm',
        color: selectedColor,
        price: productData?.price || 0,
        oldPrice: productData?.oldPrice || 0,
        image: productImage,
        qty: 1
      });
    }

    this.setItems(items);
    return items;
  },

  removeItem(uniqueKey) {
    const items = this.getItems();
    const filtered = items.filter(item => item.uniqueKey !== uniqueKey);
    this.setItems(filtered);
    return filtered;
  },

  updateItemQty(uniqueKey, qty) {
    const items = this.getItems();
    const item = items.find(item => item.uniqueKey === uniqueKey);
    if (item) {
      item.qty = Math.max(1, qty);
      this.setItems(items);
    }
    return items;
  },

  clearCart() {
    this.setItems([]);
    this.updateCartCount(0);
  },

  // ===== CART COUNT =====
  getCount() {
    return TaskService.getCartCount();
  },

  setCount(count) {
    TaskService.setCartCount(count);
  },

  incrementCount() {
    return TaskService.incrementCartCount();
  },

  updateCartCount(newCount = null) {
    if (newCount !== null) {
      this.setCount(newCount);
    } else {
      const items = this.getItems();
      const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
      this.setCount(totalQty);
    }
    this.updateCartCountDisplay();
  },

  updateCartCountDisplay() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
      cartCountEl.textContent = this.getCount();
    }
  },

  // ===== CALCULATIONS =====
  getTotalPrice() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  },

  getTotalOldPrice() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + ((item.oldPrice || 0) * item.qty), 0);
  }
};
