/**
 * productService.js - Quản lý dữ liệu sản phẩm
 */

const ProductService = {
  // ===== GET PRODUCTS =====
  getAllProducts() {
    return window.products || [];
  },

  getProductById(id) {
    return this.getAllProducts().find(p => p.id === id);
  },

  // ===== SEARCH & FILTER =====
  removeVietnameseTones(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  },

  normalizeText(str) {
    return this.removeVietnameseTones(String(str || '').toLowerCase().trim());
  },

  searchByName(query) {
    const q = this.normalizeText(query);
    if (!q) return this.getAllProducts();

    return this.getAllProducts().filter(p => {
      const name = this.normalizeText(p.name || '');
      const desc = this.normalizeText(p.detail?.description || '');
      return name.includes(q) || desc.includes(q);
    });
  },

  filterByCategory(products, category) {
    if (!category) return products;
    return products.filter(p => 
      Array.isArray(p.categories) && p.categories.includes(category)
    );
  },

  filterByBrand(products, brands) {
    if (!brands || brands.includes('all')) return products;
    return products.filter(p => brands.includes(p.brand));
  },

  filterByPromo(products) {
    return products.filter(p => (p.discount || 0) > 0);
  },

  sortProducts(products, sortType) {
    const sorted = [...products];

    switch(sortType) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        // Giữ nguyên thứ tự
        break;
    }

    return sorted;
  },

  // ===== FORMAT =====
  formatCurrency(num) {
    const nf = new Intl.NumberFormat('vi-VN');
    return `${nf.format(num)}đ`;
  },

  createProductCard(product) {
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
        ${this.formatCurrency(product.price)}
        ${product.oldPrice ? `<del>${this.formatCurrency(product.oldPrice)}</del>` : ''}
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
};
