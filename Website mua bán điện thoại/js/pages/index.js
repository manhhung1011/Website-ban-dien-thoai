/**
 * index.js - Xử lý logic trang Chủ
 * Banner carousel initialization
 */

// ===== KHỞI TẠO TRANG =====
document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo carousel banner (BannerCarousel được define trong modules/bannerCarousel.js)
  new BannerCarousel('banner-carousel-left');
  new BannerCarousel('banner-carousel-right');
});
