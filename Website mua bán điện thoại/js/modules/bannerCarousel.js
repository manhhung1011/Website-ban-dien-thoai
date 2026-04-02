/**
 * bannerCarousel.js - Module quản lý banner carousel
 * Được sử dụng bởi index.html và news.html
 */

/**
 * Lớp BannerCarousel - Quản lý carousel banner tự động chuyển
 */
class BannerCarousel {
  constructor(carouselId) {
    this.carouselEl = document.getElementById(carouselId);
    this.track = document.getElementById(`carousel-track-${carouselId.split('-')[2]}`);
    this.prevBtn = document.getElementById(`carousel-prev-${carouselId.split('-')[2]}`);
    this.nextBtn = document.getElementById(`carousel-next-${carouselId.split('-')[2]}`);
    this.dotsContainer = document.getElementById(`carousel-dots-${carouselId.split('-')[2]}`);
    
    // Trạng thái carousel
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 giây
    
    if (this.track) {
      this.slides = this.track.querySelectorAll('.carousel-slide');
      this.init();
    }
  }

  // Khởi tạo carousel
  init() {
    this.renderDots();
    this.attachEvents();
    this.startAutoPlay();
  }

  // Render các dấu chấm phân trang
  renderDots() {
    this.dotsContainer.innerHTML = '';
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  // Cập nhật trạng thái dấu chấm
  updateDots() {
    this.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  // Chuyển đến slide cụ thể
  goToSlide(index) {
    this.currentIndex = index;
    this.updateTrack();
    this.updateDots();
    this.resetAutoPlay();
  }

  // Slide tiếp theo
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateTrack();
    this.updateDots();
    this.resetAutoPlay();
  }

  // Slide trước đó
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateTrack();
    this.updateDots();
    this.resetAutoPlay();
  }

  // Cập nhật vị trí track
  updateTrack() {
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;
  }

  // Bắt đầu phát tự động
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
  }

  // Đặt lại phát tự động
  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  // Gán event listeners
  attachEvents() {
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    
    // Dừng phát khi hover, tiếp tục khi ra
    this.carouselEl?.addEventListener('mouseenter', () => clearInterval(this.autoPlayInterval));
    this.carouselEl?.addEventListener('mouseleave', () => this.startAutoPlay());
  }
}
