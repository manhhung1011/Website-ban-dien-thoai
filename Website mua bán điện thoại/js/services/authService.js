/**
 * authService.js - Quản lý xác thực người dùng
 */

const AuthService = {
  // Hằng số
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: '123',

  // ===== LOGIN/LOGOUT =====
  login(username, password) {
    if (username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD) {
      TaskService.setAuthUser('admin');
      return { success: true, isAdmin: true, message: 'Đăng nhập admin thành công' };
    }

    TaskService.setAuthUser(username);
    return { success: true, isAdmin: false, message: 'Đăng nhập thành công' };
  },

  logout() {
    TaskService.removeAuthUser();
    return { success: true, message: 'Đã đăng xuất thành công' };
  },

  // ===== CHECK AUTH =====
  getCurrentUser() {
    return TaskService.getAuthUser();
  },

  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  isAdmin() {
    return this.getCurrentUser() === 'admin';
  },

  // ===== UI UPDATES =====
  updateAuthUI() {
    const userNameEl = document.getElementById('user-name');
    const logoutAction = document.getElementById('logout-action');
    const loginAction = document.getElementById('login-action');
    const currentUser = this.getCurrentUser();

    // Cập nhật tên người dùng
    if (userNameEl) {
      userNameEl.textContent = currentUser || 'Tài khoản';
    }

    // Cập nhật hiển thị menu
    if (logoutAction) {
      logoutAction.hidden = !this.isLoggedIn();
    }
    if (loginAction) {
      loginAction.hidden = this.isLoggedIn();
    }
  }
};
