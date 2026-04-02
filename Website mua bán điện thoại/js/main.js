/**
 * main.js - Khởi tạo ứng dụng chính
 * Xử lý event listeners và khởi tạo các module
 */

// ===== GLOBAL FUNCTIONS (để tương thích ngược) =====
window.addToCart = function(productId) {
  if (!AuthService.isLoggedIn()) {
    UIService.showToast('Bạn cần đăng nhập để thực hiện thao tác');
    return;
  }

  const product = ProductService.getProductById(productId);
  const selectedColor = window.selectedProductColor || 'Trắng';

  CartService.addItem(productId, product, selectedColor);
  CartService.incrementCount();
  CartService.updateCartCountDisplay();

  const name = product ? product.name : 'Sản phẩm';
  UIService.showToast(`Thêm vào giỏ hàng thành công – ${name} (${selectedColor})`);
};

window.buyNow = function(productId) {
  if (!AuthService.isLoggedIn()) {
    UIService.showToast('Bạn cần đăng nhập để thực hiện thao tác');
    return;
  }
  alert('Chuyển đến thanh toán');
};

// ===== DISPLAY FUNCTIONS =====
function displayProducts(productsArray) {
  const productListEl = document.getElementById('product-list');
  if (!productListEl) return;

  productListEl.innerHTML = '';

  if (!productsArray || productsArray.length === 0) {
    productListEl.innerHTML = '<div class="no-products">Không có sản phẩm.</div>';
    UIService.showPagination(false);
    return;
  }

  displayProductsPage(productsArray);
}

function displayProductsPage(productsArray, shouldScroll = false) {
  const productListEl = document.getElementById('product-list');
  if (!productListEl) return;

  productListEl.innerHTML = '';

  if (!productsArray || productsArray.length === 0) {
    productListEl.innerHTML = '<div class="no-products">Không có sản phẩm.</div>';
    UIService.showPagination(false);
    return;
  }

  const totalPages = FilterModule.getTotalPages();
  const pageProducts = FilterModule.getCurrentPageProducts();

  // Hiển thị sản phẩm
  const fragment = document.createDocumentFragment();
  pageProducts.forEach(p => fragment.appendChild(ProductService.createProductCard(p)));
  productListEl.appendChild(fragment);

  // Hiển thị phân trang
  if (totalPages <= 1) {
    UIService.showPagination(false);
  } else {
    UIService.showPagination(true);
    UIService.updatePaginationButtons({
      totalPages,
      currentPage: FilterModule.state.currentPage,
      onPrevClick: () => {
        if (FilterModule.state.currentPage > 1) {
          FilterModule.setCurrentPage(FilterModule.state.currentPage - 1);
          displayProductsPage(productsArray, true);
        }
      },
      onNextClick: () => {
        if (FilterModule.state.currentPage < totalPages) {
          FilterModule.setCurrentPage(FilterModule.state.currentPage + 1);
          displayProductsPage(productsArray, true);
        }
      },
      onPageClick: (page) => {
        FilterModule.setCurrentPage(page);
        displayProductsPage(productsArray, true);
      }
    });
  }

  if (shouldScroll) {
    UIService.scrollToElement(productListEl, true);
  }
}

// ===== SEARCH SUGGESTIONS =====
function renderSearchSuggestions(query) {
  const suggestionEl = document.getElementById('search-suggestions');
  if (!suggestionEl) return;

  const suggestions = FilterModule.getSearchSuggestions(query);

  if (ProductService.normalizeText(query) === '') {
    UIService.hideSearchSuggestions();
    return;
  }

  if (suggestions.length === 0) {
    UIService.showSearchSuggestions('<div class="search-suggestion-item search-suggestion-empty">Không có sản phẩm phù hợp</div>');
    return;
  }

  const html = suggestions.map(p => `
    <div class="search-suggestion-item" role="button" tabindex="0" data-product-id="${p.id}">
      ${p.name.length > 50 ? p.name.slice(0, 50) + '...' : p.name}
    </div>
  `).join('');

  UIService.showSearchSuggestions(html);

  Array.from(suggestionEl.querySelectorAll('.search-suggestion-item')).forEach(item => {
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const pid = Number(item.dataset.productId);
      const product = ProductService.getProductById(pid);
      const searchInputEl = document.getElementById('search-input');
      if (product && searchInputEl) {
        searchInputEl.value = product.name;
        FilterModule.setSearchQuery(product.name);
        const filtered = FilterModule.applyAllFilters();
        displayProducts(filtered);
      }
      UIService.hideSearchSuggestions();
    });
  });
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  // ===== AUTH SETUP =====
  AuthService.updateAuthUI();

  const userBtn = document.getElementById('user-btn');
  const userMenu = document.getElementById('user-menu');
  const authBackdrop = document.getElementById('auth-modal-backdrop');
  const authLoginBtn = document.getElementById('auth-login-btn');
  const authPhoneInput = document.getElementById('auth-phone');
  const authPasswordInput = document.getElementById('auth-password');
  const authRegister = document.getElementById('auth-register');
  const authGoogleBtn = document.getElementById('auth-google-btn');
  const authZaloBtn = document.getElementById('auth-zalo-btn');

  // Toggle menu người dùng
  if (userBtn) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      UIService.toggleUserMenu();
    });
  }

  // Nhấp bên ngoài để đóng menu người dùng
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu') && !e.target.closest('#user-btn')) {
      UIService.closeUserMenu();
    }
  });

  // Hành động menu người dùng
  if (userMenu) {
    const loginAction = userMenu.querySelector('#login-action');
    const logoutAction = userMenu.querySelector('#logout-action');

    if (loginAction) {
      loginAction.addEventListener('click', () => {
        if (authBackdrop) {
          UIService.openAuthModal();
        } else {
          window.location.href = 'admin.html';
        }
      });
    }

    if (logoutAction) {
      logoutAction.addEventListener('click', () => {
        AuthService.logout();
        UIService.closeUserMenu();
        UIService.showToast('Đã đăng xuất thành công');
        UIService.openAuthModal();
      });
    }
  }

  // Modal xác thực
  if (authBackdrop && authLoginBtn) {
    authBackdrop.addEventListener('click', (e) => {
      if (e.target === authBackdrop) {
        UIService.closeAuthModal();
      }
    });

    authLoginBtn.addEventListener('click', () => {
      const user = authPhoneInput?.value?.trim();
      const password = authPasswordInput?.value?.trim();

      if (!user || !password) {
        UIService.showToast('Vui lòng điền tài khoản và mật khẩu');
        return;
      }

      const result = AuthService.login(user, password);
      UIService.showToast(result.message);

      if (result.success) {
        AuthService.updateAuthUI();
        setTimeout(() => {
          if (result.isAdmin) {
            window.location.href = 'admin.html';
          } else {
            UIService.closeAuthModal();
          }
        }, 220);
      }
    });

    authRegister && authRegister.addEventListener('click', (e) => {
      e.preventDefault();
      UIService.showToast('Chuyển đến giao diện đăng ký (chưa thực hiện)');
    });

    authGoogleBtn && authGoogleBtn.addEventListener('click', () => {
      UIService.showToast('Đăng nhập Google (tính năng demo)');
    });

    authZaloBtn && authZaloBtn.addEventListener('click', () => {
      UIService.showToast('Đăng nhập Zalo (tính năng demo)');
    });
  }

  // ===== PRODUCT LIST PAGE SETUP =====
  const productListEl = document.getElementById('product-list');
  if (!productListEl) {
    // Trang detail hoặc admin không cần setup filter
    CartService.updateCartCountDisplay();
    UIService.initHeaderScroll();
    return;
  }

  // Lấy các phần tử lọc
  const searchInputEl = document.getElementById('search-input');
  const demandItems = Array.from(document.querySelectorAll('.demand-item'));
  const brandButtons = Array.from(document.querySelectorAll('.brand-btn'));
  const sortButtons = Array.from(document.querySelectorAll('.sort-btn'));

  // ===== HỖ TRỢ CẬP NHẬT UI =====
  function updateFilterUI() {
    FilterModule.setActive(demandItems, 'demand-active', item =>
      item.dataset.category === FilterModule.state.category
    );

    FilterModule.setActive(brandButtons, 'brand-active', btn =>
      FilterModule.state.brands.includes(btn.dataset.brand)
    );

    FilterModule.setActive(sortButtons, 'active', btn =>
      btn.dataset.sort === FilterModule.state.sortType
    );
  }

  // ===== LỌC NHU CẦU =====
  demandItems.forEach(item => {
    item.addEventListener('click', (e) => {
      FilterModule.setCategory(e.currentTarget.dataset.category);
      updateFilterUI();
      const filtered = FilterModule.applyAllFilters();
      displayProducts(filtered);
    });
  });

  // ===== LỌC HÃNG =====
  brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      FilterModule.setBrand(btn.dataset.brand);
      updateFilterUI();
      const filtered = FilterModule.applyAllFilters();
      displayProducts(filtered);
    });
  });

  // ===== LỌC SẮP XẾP =====
  sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      FilterModule.setSort(btn.dataset.sort);
      updateFilterUI();
      const filtered = FilterModule.applyAllFilters();
      displayProducts(filtered);
    });
  });

  // ===== TÌM KIẾM =====
  if (searchInputEl) {
    const debouncedSearch = FilterModule.debounce((query) => {
      FilterModule.setSearchQuery(query);
      const filtered = FilterModule.applyAllFilters();
      displayProducts(filtered);
      renderSearchSuggestions(query);
    }, 180);

    searchInputEl.addEventListener('input', (e) => {
      debouncedSearch(e.target.value || '');
    });

    searchInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        UIService.hideSearchSuggestions();
      }
    });

    searchInputEl.addEventListener('blur', () => {
      setTimeout(() => UIService.hideSearchSuggestions(), 120);
    });

    searchInputEl.addEventListener('focus', () => {
      renderSearchSuggestions(searchInputEl.value || '');
    });
  }

  // ===== ĐẶT LẠI LOGO =====
  const logoReset = document.getElementById('logo-reset');
  if (logoReset) {
    logoReset.addEventListener('click', () => {
      FilterModule.resetFilters();
      updateFilterUI();

      if (searchInputEl) {
        searchInputEl.value = '';
      }

      UIService.hideSearchSuggestions();
      displayProducts(ProductService.getAllProducts());
      UIService.scrollToTop();
    });
  }

  // ===== NÚT CUỘN LÊN ĐẦU =====
  const scrollTopBtn = document.getElementById('btn-scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      UIService.scrollToTop();
    });
  }

  // ===== HIỆU ỨNG CUỘN HEADER =====
  UIService.initHeaderScroll();

  // ===== HIỂN THỊ BAN ĐẦU =====
  CartService.updateCartCountDisplay();
  updateFilterUI();
  const filtered = FilterModule.applyAllFilters();
  displayProducts(filtered);
});
