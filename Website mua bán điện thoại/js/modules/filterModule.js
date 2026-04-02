/**
 * filterModule.js - Xử lý lọc, tìm kiếm, sắp xếp sản phẩm
 */

const FilterModule = {
  // ===== STATE =====
  state: {
    category: null,
    brands: ['all'],
    sortType: 'popular',
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 16,
    filteredProducts: []
  },

  // ===== UTILITIES =====
  debounce(fn, wait = 250) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  },

  setActive(elements, className, predicate) {
    elements.forEach((el) => el.classList.toggle(className, predicate(el)));
  },

  // ===== FILTER LOGIC =====
  applyAllFilters() {
    let result = ProductService.getAllProducts();

    // 1) Search theo tên
    const q = ProductService.normalizeText(this.state.searchQuery);
    if (q) {
      result = result.filter(p => ProductService.normalizeText(p.name).includes(q));
    }

    // 2) Filter theo category
    result = ProductService.filterByCategory(result, this.state.category);

    // 3) Filter theo brand
    result = ProductService.filterByBrand(result, this.state.brands);

    // 4) Sort / Promo filter
    if (this.state.sortType === 'promo') {
      result = ProductService.filterByPromo(result);
    } else {
      result = ProductService.sortProducts(result, this.state.sortType);
    }

    this.state.filteredProducts = result;
    this.state.currentPage = 1;

    return result;
  },

  // ===== CATEGORY FILTER =====
  setCategory(category) {
    if (this.state.category === category) {
      this.state.category = null;
    } else {
      this.state.category = category;
    }
  },

  // ===== BRAND FILTER =====
  setBrand(brand) {
    if (brand === 'all') {
      this.state.brands = ['all'];
    } else {
      if (this.state.brands.includes('all')) {
        this.state.brands = [];
      }

      if (this.state.brands.includes(brand)) {
        this.state.brands = this.state.brands.filter(b => b !== brand);
      } else {
        this.state.brands.push(brand);
      }

      if (this.state.brands.length === 0) {
        this.state.brands = ['all'];
      }
    }
  },

  // ===== SORT =====
  setSort(sortType) {
    this.state.sortType = sortType;
  },

  // ===== SEARCH =====
  setSearchQuery(query) {
    this.state.searchQuery = query;
  },

  getSearchSuggestions(query) {
    const q = ProductService.normalizeText(query);
    if (!q) return [];

    return ProductService.getAllProducts().filter(p => {
      const name = ProductService.normalizeText(p.name || '');
      const desc = ProductService.normalizeText(p.detail?.description || '');
      return name.includes(q) || desc.includes(q);
    }).slice(0, 8);
  },

  // ===== PAGINATION =====
  setCurrentPage(page) {
    this.state.currentPage = page;
  },

  getTotalPages() {
    return Math.ceil(this.state.filteredProducts.length / this.state.itemsPerPage);
  },

  getCurrentPageProducts() {
    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const endIndex = startIndex + this.state.itemsPerPage;
    return this.state.filteredProducts.slice(startIndex, endIndex);
  },

  // ===== RESET =====
  resetFilters() {
    this.state.category = null;
    this.state.brands = ['all'];
    this.state.sortType = 'popular';
    this.state.searchQuery = '';
    this.state.currentPage = 1;
  }
};
