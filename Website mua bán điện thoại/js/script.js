// js/script.js

// Giỏ hàng toàn cục (truy cập được từ cả index và product-detail)
window.cartCount = parseInt(localStorage.getItem('cartCount') || '0', 10) || 0;

function getCartItems() {
  const items = localStorage.getItem('cartItems');
  return items ? JSON.parse(items) : [];
}

function setCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

function updateCartCountDisplay() {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = window.cartCount;
  }
  localStorage.setItem('cartCount', window.cartCount);
}

function showToast(message, duration = 2200) {
  const wrapper = document.getElementById('toast-wrapper') || (function() {
    const el = document.createElement('div');
    el.id = 'toast-wrapper';
    el.className = 'toast-wrapper';
    document.body.appendChild(el);
    return el;
  })();

  const toast = document.createElement('div');
  toast.className = 'toast-alert';
  toast.textContent = message;
  wrapper.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    setTimeout(() => toast.remove(), 200);
  }, duration);
}

window.addToCart = function (productId) {
  if (!getAuthUser()) {
    showToast('Bạn cần đăng nhập để thực hiện thao tác');
    return;
  }
  window.cartCount += 1;
  updateCartCountDisplay();
  const product = window.products?.find((p) => p.id === productId);
  
  const items = getCartItems();
  const selectedColor = window.selectedProductColor || 'Trắng';
  const uniqueKey = `${productId}_${selectedColor}`;
  const existingItem = items.find(item => item.uniqueKey === uniqueKey);
  
  // Get image by color
  let productImage = product?.image || '';
  if (product?.detail?.colorThumbnails) {
    const colorThumbnails = product.detail.colorThumbnails;
    // Find matching color (case-insensitive)
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
      name: product?.name || 'Sản phẩm',
      color: selectedColor,
      price: product?.price || 0,
      oldPrice: product?.oldPrice || 0,
      image: productImage,
      qty: 1
    });
  }
  
  setCartItems(items);
  const name = product ? product.name : 'Sản phẩm';
  showToast(`Thêm vào giỏ hàng thành công – ${name} (${selectedColor})`);
}

window.buyNow = function (productId) {
  if (!getAuthUser()) {
    showToast('Bạn cần đăng nhập để thực hiện thao tác');
    return;
  }
  // Logic mua ngay ở đây, ví dụ chuyển đến trang thanh toán
  alert('Chuyển đến thanh toán');
};

updateCartCountDisplay();

function getAuthUser() {
  return localStorage.getItem('authUser');
}

function setAuthUser(name) {
  localStorage.setItem('authUser', name);
  updateAuthUI();
}

function clearAuthUser() {
  localStorage.removeItem('authUser');
  updateAuthUI();
}

function updateAuthUI() {
  const userNameEl = document.getElementById('user-name');
  const userMenu = document.getElementById('user-menu');
  const name = getAuthUser() || 'Tài khoản';

  if (userNameEl) {
    userNameEl.textContent = name;
  }
  if (!userMenu) {
    return;
  }

  const loginAction = userMenu.querySelector('#login-action');
  const logoutAction = userMenu.querySelector('#logout-action');

  if (getAuthUser()) {
    if (loginAction) loginAction.hidden = true;
    if (logoutAction) logoutAction.hidden = false;
  } else {
    if (loginAction) loginAction.hidden = false;
    if (logoutAction) logoutAction.hidden = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const userBtn = document.getElementById('user-btn');
  const userNameEl = document.getElementById('user-name');
  const userMenu = document.getElementById('user-menu');
  const authBackdrop = document.getElementById('auth-modal-backdrop');
  const authLoginBtn = document.getElementById('auth-login-btn');
  const authPhoneInput = document.getElementById('auth-phone');
  const authPasswordInput = document.getElementById('auth-password');
  const authRegister = document.getElementById('auth-register');
  const authGoogleBtn = document.getElementById('auth-google-btn');
  const authZaloBtn = document.getElementById('auth-zalo-btn');

  updateAuthUI();

  if (userBtn) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (userMenu) {
        userMenu.hidden = !userMenu.hidden;
      }
    });
  }

  window.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu') && !e.target.closest('#user-btn')) {
      if (userMenu) userMenu.hidden = true;
    }
  });

  if (userMenu) {
    const loginAction = userMenu.querySelector('#login-action');
    const logoutAction = userMenu.querySelector('#logout-action');

    if (loginAction) {
      loginAction.addEventListener('click', () => {
        if (authBackdrop) {
          authBackdrop.classList.add('active');
        } else {
          window.location.href = 'admin.html';
        }
      });
    }

    if (logoutAction) {
      logoutAction.addEventListener('click', () => {
        clearAuthUser();
        userMenu.hidden = true;
        showToast('Đã đăng xuất thành công');
        if (authBackdrop) authBackdrop.classList.add('active');
      });
    }
  }

  if (authBackdrop && authLoginBtn) {
    const closeAuthModal = () => authBackdrop.classList.remove('active');

    authBackdrop.addEventListener('click', (e) => {
      if (e.target === authBackdrop) {
        closeAuthModal();
      }
    });

    authLoginBtn.addEventListener('click', () => {
      const user = authPhoneInput?.value?.trim();
      const password = authPasswordInput?.value?.trim();

      if (!user || !password) {
        showToast('Vui lòng điền tài khoản và mật khẩu');
        return;
      }

      if (user === 'admin' && password === '123') {
        showToast('Đăng nhập admin thành công');
        setAuthUser('admin');
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 220);
        return;
      }

      setAuthUser(user);
      closeAuthModal();
      showToast('Đăng nhập thành công');
    });

    authRegister && authRegister.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Chuyển đến giao diện đăng ký (chưa thực hiện)');
    });

    authGoogleBtn && authGoogleBtn.addEventListener('click', () => {
      showToast('Đăng nhập Google (tính năng demo)');
    });

    authZaloBtn && authZaloBtn.addEventListener('click', () => {
      showToast('Đăng nhập Zalo (tính năng demo)');
    });
  }

  const productListEl = document.getElementById('product-list');

  // Nếu không phải trang hiển thị danh sách sản phẩm thì skip logic lọc/hiển thị sản phẩm
  if (!productListEl) {
    return; // trang chi tiết không cần chạy applyFilters/displayProducts
  }

  const searchInputEl = document.getElementById('search-input');
  const demandItems = Array.from(document.querySelectorAll('.demand-item'));
  const brandButtons = Array.from(document.querySelectorAll('.brand-btn'));
  const sortButtons = Array.from(document.querySelectorAll('.sort-btn'));

  const nf = new Intl.NumberFormat('vi-VN');
  const formatCurrency = (num) => `${nf.format(num)}đ`;

  // ---------- Helpers ----------
  // Bỏ dấu tiếng Việt + chuẩn hoá để search "iphone" vẫn ra "iPhone"
  function removeVietnameseTones(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  function normalizeText(str) {
    return removeVietnameseTones(String(str || '').toLowerCase().trim());
  }

  function debounce(fn, wait = 250) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  const setActive = (elements, className, predicate) => {
    elements.forEach((el) => el.classList.toggle(className, predicate(el)));
  };

  const setActiveBrand = () => {
    setActive(brandButtons, 'brand-active', (btn) => {
      const b = btn.dataset.brand;
      return currentBrands.includes(b);
    });
  };

  const setActiveSort = (sort) => {
    setActive(sortButtons, 'active', (btn) => btn.dataset.sort === sort);
  };

  const setActiveDemand = (category) => {
    setActive(demandItems, 'demand-active', (item) => item.dataset.category === category);
  };

  // ---------- State ----------
  let currentCategory = null;   // nhu cầu
  let currentBrands = ['all'];  // hãng (multi-select)
  let currentSort = 'popular';  // sắp xếp / lọc khuyến mãi
  let searchQuery = '';         // search theo tên
  
  // Pagination state
  let currentPage = 1;
  let itemsPerPage = 50; // Hiển thị toàn bộ danh sách sản phẩm trong data/product.js
  let totalProducts = [];  // Store filtered products for pagination

  // ---------- Render ----------
  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';

    card.innerHTML = `
      <div class="product-labels">
        ${product.discount > 0 ? `<span class="discount-label">Giảm ${product.discount}%</span>` : ''}
        ${product.installment ? `<span class="installment-label">Trả góp 0%</span>` : ''}
      </div>
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">
        ${formatCurrency(product.price)}
        ${product.oldPrice ? `<del>${formatCurrency(product.oldPrice)}</del>` : ''}
      </p>
      <p class="info">${product.screen} | ${product.storage}</p>
      <div class="product-card-footer">
        <button type="button" class="product-add-cart-btn" aria-label="Thêm vào giỏ hàng">🛒 Thêm vào giỏ hàng</button>
      </div>
    `;

    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.2s';
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
    card.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `product-detail.html?id=${product.id}`;
    });

    const addCartBtn = card.querySelector('.product-add-cart-btn');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.addToCart(product.id);
      });
    }

    return card;
  }

  function displayProducts(productsArray) {
    productListEl.innerHTML = '';

    if (!productsArray || productsArray.length === 0) {
      productListEl.innerHTML = '<div class="no-products">Không có sản phẩm.</div>';
      renderPaginationButtons([]);
      return;
    }

    totalProducts = productsArray;
    currentPage = 1;
    displayProductsPage(productsArray);
  }

  function displayProductsPage(productsArray, shouldScroll = false) {
    productListEl.innerHTML = '';

    if (!productsArray || productsArray.length === 0) {
      productListEl.innerHTML = '<div class="no-products">Không có sản phẩm.</div>';
      renderPaginationButtons([]);
      return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(productsArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = productsArray.slice(startIndex, endIndex);

    // Display products for current page
    const fragment = document.createDocumentFragment();
    pageProducts.forEach((p) => fragment.appendChild(createProductCard(p)));
    productListEl.appendChild(fragment);

    // Render pagination buttons
    renderPaginationButtons(productsArray, totalPages);

    // Scroll to top of product list only when pagination is clicked
    if (shouldScroll) {
      productListEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function renderPaginationButtons(productsArray, totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const paginationPrev = document.getElementById('pagination-prev');
    const paginationNext = document.getElementById('pagination-next');

    if (!paginationContainer) return;

    const actualTotalPages = totalPages || Math.ceil((productsArray?.length || 0) / itemsPerPage);

    // Hide pagination if only 1 page
    if (actualTotalPages <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }

    paginationContainer.style.display = 'flex';

    // Clear and render page numbers
    paginationNumbers.innerHTML = '';

    // Previous button
    if (paginationPrev) {
      paginationPrev.disabled = currentPage === 1;
      paginationPrev.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          displayProductsPage(productsArray, true);
        }
      };
    }

    // Page number buttons with ellipsis
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(actualTotalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page button
    if (startPage > 1) {
      const btn1 = document.createElement('button');
      btn1.className = 'pagination-number';
      btn1.textContent = '1';
      btn1.onclick = () => {
        currentPage = 1;
        displayProductsPage(productsArray, true);
      };
      paginationNumbers.appendChild(btn1);

      if (startPage > 2) {
        const ellipsis = document.createElement('div');
        ellipsis.className = 'pagination-number ellipsis';
        ellipsis.textContent = '...';
        paginationNumbers.appendChild(ellipsis);
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      const btn = document.createElement('button');
      btn.className = 'pagination-number' + (i === currentPage ? ' active' : '');
      btn.textContent = i;
      btn.onclick = () => {
        currentPage = i;
        displayProductsPage(productsArray, true);
      };
      paginationNumbers.appendChild(btn);
    }

    // Last page button
    if (endPage < actualTotalPages) {
      if (endPage < actualTotalPages - 1) {
        const ellipsis = document.createElement('div');
        ellipsis.className = 'pagination-number ellipsis';
        ellipsis.textContent = '...';
        paginationNumbers.appendChild(ellipsis);
      }

      const btnLast = document.createElement('button');
      btnLast.className = 'pagination-number';
      btnLast.textContent = actualTotalPages;
      btnLast.onclick = () => {
        currentPage = actualTotalPages;
        displayProductsPage(productsArray, true);
      };
      paginationNumbers.appendChild(btnLast);
    }

    // Next button
    if (paginationNext) {
      paginationNext.disabled = currentPage === actualTotalPages;
      paginationNext.onclick = () => {
        if (currentPage < actualTotalPages) {
          currentPage++;
          displayProductsPage(productsArray, true);
        }
      };
    }
  }

  function applyFilters() {
    let result = window.products || [];

    // 1) Search theo tên (accent-insensitive)
    const q = normalizeText(searchQuery);
    if (q) {
      result = result.filter((p) => normalizeText(p.name).includes(q));
    }

    // 2) Filter theo nhu cầu (category)
    if (currentCategory) {
      result = result.filter(
        (p) => Array.isArray(p.categories) && p.categories.includes(currentCategory)
      );
    }

    // 3) Filter theo hãng (brand)
    if (!currentBrands.includes('all')) {
      result = result.filter((p) => currentBrands.includes(p.brand));
    }

    // 4) Sort / Promo
    if (currentSort === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (currentSort === 'promo') {
      result = result.filter((p) => (p.discount || 0) > 0);
    }
    // popular: giữ nguyên

    // Reset to page 1 when filters change
    currentPage = 1;
    totalProducts = result;
    displayProductsPage(result);
  }

  // ---------- Events ----------
  // Demand: cho phép toggle (click lại để bỏ chọn)
  demandItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;

      if (currentCategory === category) {
        currentCategory = null;     // toggle off
      } else {
        currentCategory = category; // set
      }

      setActiveDemand(currentCategory);
      applyFilters();
    });
  });

  // Multi-select brand filter (click thêm, click lại bỏ; All reset)
  brandButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const brand = btn.dataset.brand;

      if (brand === 'all') {
        currentBrands = ['all'];
      } else {
        if (currentBrands.includes('all')) {
          currentBrands = [];
        }

        if (currentBrands.includes(brand)) {
          currentBrands = currentBrands.filter((b) => b !== brand);
        } else {
          currentBrands.push(brand);
        }

        if (currentBrands.length === 0) {
          currentBrands = ['all'];
        }
      }

      setActiveBrand();
      applyFilters();
    });
  });

  // Sort
  sortButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentSort = btn.dataset.sort;
      setActiveSort(currentSort);
      applyFilters();
    });
  });

  // Search suggestions + input (debounce để mượt)
  const searchSuggestions = document.getElementById('search-suggestions');

  function renderSearchSuggestions(query) {
    if (!searchSuggestions) return;

    const q = normalizeText(query);
    if (!q) {
      searchSuggestions.hidden = true;
      searchSuggestions.innerHTML = '';
      return;
    }

    const matches = (window.products || []).filter((p) => {
      const name = normalizeText(p.name || '');
      const desc = normalizeText(p.detail?.description || '');
      return name.includes(q) || desc.includes(q);
    });

    if (matches.length === 0) {
      searchSuggestions.innerHTML = '<div class="search-suggestion-item search-suggestion-empty">Không có sản phẩm phù hợp</div>';
      searchSuggestions.hidden = false;
      return;
    }

    const html = matches.slice(0, 8).map((p) => `
      <div class="search-suggestion-item" role="button" tabindex="0" data-product-id="${p.id}">
        ${p.name.length > 50 ? p.name.slice(0, 50) + '...' : p.name}
      </div>
    `).join('');

    searchSuggestions.innerHTML = html;
    searchSuggestions.hidden = false;

    Array.from(searchSuggestions.querySelectorAll('.search-suggestion-item')).forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const pid = Number(item.dataset.productId);
        const product = (window.products || []).find((p) => p.id === pid);
        if (product) {
          if (searchInputEl) searchInputEl.value = product.name;
          searchQuery = product.name;
          applyFilters();
        }
        searchSuggestions.hidden = true;
      });
    });
  }

  if (searchInputEl) {
    searchInputEl.addEventListener('input', debounce((e) => {
      searchQuery = e.target.value || '';
      applyFilters();
      renderSearchSuggestions(searchQuery);
    }, 180));

    searchInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (searchSuggestions) searchSuggestions.hidden = true;
      }
    });

    searchInputEl.addEventListener('blur', () => {
      setTimeout(() => {
        if (searchSuggestions) searchSuggestions.hidden = true;
      }, 120);
    });

    searchInputEl.addEventListener('focus', () => {
      renderSearchSuggestions(searchInputEl.value || '');
    });
  }

  // Logo reset: reset tất cả (brand/category/sort/search) + scroll lên đầu
  const logoReset = document.getElementById('logo-reset');
  if (logoReset) {
    logoReset.addEventListener('click', () => {
      currentCategory = null;
      currentBrands = ['all'];
      currentSort = 'popular';
      searchQuery = '';
      currentPage = 1;

      setActiveDemand(null);
      setActiveBrand();
      setActiveSort('popular');

      if (searchInputEl) searchInputEl.value = '';

      if (searchSuggestions) {
        searchSuggestions.hidden = true;
        searchSuggestions.innerHTML = '';
      }

      displayProducts(window.products || []);
      
      // Scroll lên đầu trang
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('btn-scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Sticky header scroll effect
  const mainHeader = document.querySelector('.main-header');
  let ticking = false;
  
  function updateHeader() {
    if (window.scrollY > 10) {
      mainHeader.classList.add('header-scrolled');
    } else {
      mainHeader.classList.remove('header-scrolled');
    }
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });

  // Initial load
  setActiveDemand(null);
  setActiveBrand();
  setActiveSort('popular');
  displayProducts(window.products || []);
});
