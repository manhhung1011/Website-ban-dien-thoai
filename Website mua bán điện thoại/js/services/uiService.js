/**
 * uiService.js - Quản lý giao diện người dùng
 */

const UIService = {
  // ===== TOAST NOTIFICATIONS =====
  showToast(message, duration = 2200) {
    const wrapper = document.getElementById('toast-wrapper') || (() => {
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
  },

  // ===== MODAL MANAGEMENT =====
  openAuthModal() {
    const backdrop = document.getElementById('auth-modal-backdrop');
    if (backdrop) {
      backdrop.classList.add('active');
    }
  },

  closeAuthModal() {
    const backdrop = document.getElementById('auth-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
    }
  },

  toggleAuthModal() {
    const backdrop = document.getElementById('auth-modal-backdrop');
    if (backdrop) {
      backdrop.classList.toggle('active');
    }
  },

  // ===== USER MENU =====
  toggleUserMenu() {
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
      userMenu.hidden = !userMenu.hidden;
    }
  },

  closeUserMenu() {
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
      userMenu.hidden = true;
    }
  },

  // ===== SEARCH SUGGESTIONS =====
  showSearchSuggestions(html) {
    const suggestionEl = document.getElementById('search-suggestions');
    if (suggestionEl) {
      suggestionEl.innerHTML = html;
      suggestionEl.hidden = false;
    }
  },

  hideSearchSuggestions() {
    const suggestionEl = document.getElementById('search-suggestions');
    if (suggestionEl) {
      suggestionEl.hidden = true;
      suggestionEl.innerHTML = '';
    }
  },

  // ===== PAGINATION =====
  showPagination(show = true) {
    const container = document.getElementById('pagination-container');
    if (container) {
      container.style.display = show ? 'flex' : 'none';
    }
  },

  updatePaginationButtons(config) {
    const { totalPages, currentPage, onPrevClick, onNextClick, onPageClick } = config;
    const paginationNext = document.getElementById('pagination-next');
    const paginationPrev = document.getElementById('pagination-prev');
    const paginationNumbers = document.getElementById('pagination-numbers');

    if (!paginationNumbers) return;

    // Xóa
    paginationNumbers.innerHTML = '';

    // Nút trang trước
    if (paginationPrev) {
      paginationPrev.disabled = currentPage === 1;
      paginationPrev.onclick = onPrevClick;
    }

    // Hiển thị số trang
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Trang đầu tiên
    if (startPage > 1) {
      const btn1 = document.createElement('button');
      btn1.className = 'pagination-number';
      btn1.textContent = '1';
      btn1.onclick = () => onPageClick(1);
      paginationNumbers.appendChild(btn1);

      if (startPage > 2) {
        const ellipsis = document.createElement('div');
        ellipsis.className = 'pagination-number ellipsis';
        ellipsis.textContent = '...';
        paginationNumbers.appendChild(ellipsis);
      }
    }

    // Số trang
    for (let i = startPage; i <= endPage; i++) {
      const btn = document.createElement('button');
      btn.className = 'pagination-number' + (i === currentPage ? ' active' : '');
      btn.textContent = i;
      btn.onclick = () => onPageClick(i);
      paginationNumbers.appendChild(btn);
    }

    // Trang cuối cùng
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = document.createElement('div');
        ellipsis.className = 'pagination-number ellipsis';
        ellipsis.textContent = '...';
        paginationNumbers.appendChild(ellipsis);
      }

      const btnLast = document.createElement('button');
      btnLast.className = 'pagination-number';
      btnLast.textContent = totalPages;
      btnLast.onclick = () => onPageClick(totalPages);
      paginationNumbers.appendChild(btnLast);
    }

    // Nút trang tiếp
    if (paginationNext) {
      paginationNext.disabled = currentPage === totalPages;
      paginationNext.onclick = onNextClick;
    }
  },

  // ===== SCROLL =====
  scrollToTop(smooth = true) {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  },

  scrollToElement(element, smooth = true) {
    if (element) {
      element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    }
  },

  // ===== HEADER EFFECTS =====
  updateHeaderScroll() {
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
      if (window.scrollY > 10) {
        mainHeader.classList.add('header-scrolled');
      } else {
        mainHeader.classList.remove('header-scrolled');
      }
    }
  },

  initHeaderScroll() {
    let ticking = false;
    
    const update = () => {
      this.updateHeaderScroll();
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }
};
