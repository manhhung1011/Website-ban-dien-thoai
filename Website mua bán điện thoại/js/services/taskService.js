/**
 * taskService.js - Quản lý LocalStorage
 * Xử lý tất cả các thao tác lưu/lấy dữ liệu từ localStorage
 */

const TaskService = {
  // ===== CART =====
  getCartItems() {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  },

  setCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  },

  getCartCount() {
    return parseInt(localStorage.getItem('cartCount') || '0', 10) || 0;
  },

  setCartCount(count) {
    localStorage.setItem('cartCount', count);
  },

  incrementCartCount() {
    const count = this.getCartCount() + 1;
    this.setCartCount(count);
    return count;
  },

  // ===== AUTH =====
  getAuthUser() {
    return localStorage.getItem('authUser');
  },

  setAuthUser(name) {
    localStorage.setItem('authUser', name);
  },

  removeAuthUser() {
    localStorage.removeItem('authUser');
  },

  isAdmin() {
    return this.getAuthUser() === 'admin';
  },

  // ===== GENERIC =====
  set(key, value) {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  },

  get(key) {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
