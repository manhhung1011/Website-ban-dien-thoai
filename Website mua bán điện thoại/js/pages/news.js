/**
 * news.js - Xử lý logic trang Tin Tức
 * Bao gồm: banner carousel, load bài viết, load sản phẩm
 */

// ===== KHỞI TẠO TRANG =====
document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo carousel banner (BannerCarousel được define trong modules/bannerCarousel.js)
  new BannerCarousel('banner-carousel-left');
  new BannerCarousel('banner-carousel-right');

  // ===== TẢI BÀI VIẾT NỔI BẬT =====
  if (typeof articles !== 'undefined' && articles.length > 0) {
    const featuredArticle = articles[0];
    document.getElementById('featured-img').src = featuredArticle.image;
    document.getElementById('featured-title').textContent = featuredArticle.title;
    document.getElementById('featured-excerpt').textContent = featuredArticle.excerpt;
    document.getElementById('featured-date').textContent = featuredArticle.date;
  }

  // ===== TẢI CÁC BÀI VIẾT KHÁC =====
  if (typeof articles !== 'undefined' && articles.length > 1) {
    const otherArticlesContainer = document.getElementById('other-articles');
    otherArticlesContainer.innerHTML = '';
    
    articles.slice(1).forEach(article => {
      const html = `
        <div class="news-card">
          <div class="news-card-image">
            <img src="${article.image}" alt="${article.title}">
          </div>
          <div class="news-card-content">
            <div class="news-card-date">👤 ${article.author} | ${article.date}</div>
            <h3 class="news-card-title">${article.title}</h3>
            <p class="news-card-excerpt">${article.excerpt}</p>
            <a href="#" class="news-card-link">Xem chi tiết →</a>
          </div>
        </div>
      `;
      otherArticlesContainer.innerHTML += html;
    });
  }

  // ===== TẢI SẢN PHẨM MỚI NHẤT =====
  if (typeof products !== 'undefined' && products.length > 0) {
    const latestProductsContainer = document.getElementById('latest-products');
    latestProductsContainer.innerHTML = '';
    
    // Lấy các sản phẩm theo ID: 1, 2, 4, 16
    const productIds = [1, 2, 4, 16];
    const selectedProducts = productIds
      .map(id => products.find(p => p.id === id))
      .filter(p => p);
    
    selectedProducts.forEach(product => {
      const stars = '★'.repeat(Math.round(product.rating || 5)) + '☆'.repeat(5 - Math.round(product.rating || 5));
      const html = `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'" style="cursor: pointer;">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">${stars} (${product.reviews || 0})</div>
            <div class="product-prices">
              <span class="product-price">${product.price.toLocaleString('vi-VN')}₫</span>
              <span class="product-original">${product.original_price ? product.original_price.toLocaleString('vi-VN') + '₫' : ''}</span>
            </div>
          </div>
        </div>
      `;
      latestProductsContainer.innerHTML += html;
    });
  }
});
