# Cấu Trúc Module JavaScript - Shop36

## Giới thiệu

Dự án được tổ chức theo mô hình **Service-oriented** để tăng khả năng bảo trì, mở rộng và kiểm tra. Các module được tách biệt theo chức năng, sử dụng pattern module để tránh global pollution.

## 📁 Cấu Trúc Thư Mục

```
Website mua bán điện thoại/
├── index.html                    # Trang chủ - danh sách sản phẩm
├── product-detail.html           # Chi tiết sản phẩm
├── cart.html                     # Giỏ hàng
├── admin.html                    # Quản lý admin
├── news.html                     # Tin tức
├── about.html                    # Giới thiệu
├── contact.html                  # Liên hệ
├── ARCHITECTURE.md               # Tài liệu kiến trúc (file này)
├── README.md                     # Tài liệu dự án
├── STRUCTURE.md                  # Tài liệu cấu trúc
├── css/
│   ├── style.css                 # CSS chính (header, nav, layout)
│   ├── footer.css                # CSS footer
│   └── pages/                    # CSS từng trang
│       ├── about.css
│       ├── admin.css
│       ├── cart.css
│       ├── contact.css
│       ├── news.css
│       └── product-detail.css
├── data/
│   ├── articles.js               # Dữ liệu bài viết
│   ├── product-detail.js         # Dữ liệu chi tiết sản phẩm
│   ├── product.js                # Dữ liệu sản phẩm chính
│   └── product.js.backup         # Backup dữ liệu
├── img/
│   └── banner/
│       ├── news/                 # Banner tin tức
│       ├── products/             # Banner sản phẩm
│       └── thumbnails/           # Thumbnails
├── js/
│   ├── main.js                   # Khởi tạo ứng dụng chính
│   ├── modules/
│   │   ├── bannerCarousel.js     # Module carousel banner
│   │   └── filterModule.js       # Module lọc/tìm kiếm/sắp xếp
│   ├── pages/
│   │   ├── index.js              # Logic trang chủ
│   │   ├── product-detail.js     # Logic chi tiết sản phẩm
│   │   ├── cart.js               # Logic giỏ hàng
│   │   ├── admin.js              # Logic admin
│   │   ├── news.js               # Logic tin tức
│   │   ├── about.js              # Logic giới thiệu
│   │   └── contact.js            # Logic liên hệ
│   └── services/
│       ├── taskService.js        # Quản lý localStorage
│       ├── authService.js        # Quản lý xác thực
│       ├── cartService.js        # Quản lý giỏ hàng
│       ├── uiService.js          # Quản lý UI (toast, modal)
│       └── productService.js     # Quản lý dữ liệu sản phẩm
```

## 🔧 Chi Tiết Các Module

### 1. **Services** (`js/services/`)

#### `taskService.js` - Quản lý LocalStorage
- `get(key)` / `set(key, value)` / `remove(key)` / `clear()`
- `getCartItems()` / `setCartItems(items)`
- `getCartCount()` / `setCartCount(count)`
- `getAuthUser()` / `setAuthUser(user)` / `removeAuthUser()`

**Sử dụng:**
```javascript
TaskService.setAuthUser({name: 'John', role: 'admin'});
const user = TaskService.getAuthUser();
```

#### `authService.js` - Xác thực & UI Auth
- `login(username, password)` - Đăng nhập
- `logout()` - Đăng xuất
- `getCurrentUser()` - Lấy user hiện tại
- `isLoggedIn()` - Kiểm tra đã đăng nhập
- `isAdmin()` - Kiểm tra quyền admin
- `updateAuthUI()` - Cập nhật giao diện auth

**Sử dụng:**
```javascript
AuthService.login('admin', '123');
if (AuthService.isLoggedIn()) {
  // Hiển thị menu user
}
```

#### `cartService.js` - Giỏ Hàng
- `addItem(productId, product, color)` - Thêm sản phẩm
- `removeItem(uniqueKey)` - Xóa sản phẩm
- `updateItemQty(uniqueKey, qty)` - Cập nhật số lượng
- `clearCart()` - Xóa toàn bộ giỏ
- `getCount()` / `setCount(count)` - Lấy/set số lượng
- `getTotalPrice()` / `getTotalOldPrice()` - Tính tổng giá
- `updateCartCountDisplay()` - Cập nhật hiển thị số lượng

**Sử dụng:**
```javascript
CartService.addItem(1, product, 'Trắng');
const total = CartService.getTotalPrice();
```

#### `uiService.js` - Quản lý UI
**Toast:**
- `showToast(message, duration)` - Hiển thị thông báo

**Modal Auth:**
- `openAuthModal()` / `closeAuthModal()` / `toggleAuthModal()`

**User Menu:**
- `toggleUserMenu()` / `closeUserMenu()`

**Search Suggestions:**
- `showSearchSuggestions(html)` / `hideSearchSuggestions()`

**Pagination:**
- `showPagination(show)` / `updatePaginationButtons(config)`

**Scroll:**
- `scrollToTop(smooth)` / `scrollToElement(element, smooth)`

**Header Effects:**
- `initHeaderScroll()` - Khởi tạo hiệu ứng header

**Sử dụng:**
```javascript
UIService.showToast('Thành công!');
UIService.openAuthModal();
```

#### `productService.js` - Sản Phẩm
- `getAllProducts()` - Lấy tất cả sản phẩm
- `getProductById(id)` - Lấy sản phẩm theo ID
- `searchByName(query)` - Tìm kiếm theo tên
- `filterByCategory(products, category)` - Lọc theo category
- `filterByBrand(products, brands)` - Lọc theo brand
- `filterByPromo(products)` - Lọc khuyến mãi
- `sortProducts(products, sortType)` - Sắp xếp
- `formatCurrency(num)` - Định dạng tiền tệ
- `createProductCard(product)` - Tạo card sản phẩm

**Sử dụng:**
```javascript
const products = ProductService.getAllProducts();
const card = ProductService.createProductCard(product);
```

### 2. **Modules** (`js/modules/`)

#### `filterModule.js` - Xử lý Lọc & Tìm Kiếm
**State:**
- `state.category` - Category hiện tại
- `state.brands` - Brands đã chọn
- `state.sortType` - Kiểu sắp xếp
- `state.searchQuery` - Từ khóa tìm kiếm
- `state.currentPage` - Trang hiện tại
- `state.itemsPerPage` - Số item/trang
- `state.filteredProducts` - Danh sách đã lọc

**Phương thức:**
- `applyAllFilters()` - Áp dụng tất cả bộ lọc
- `setCategory(category)` / `setBrand(brand)` / `setSort(sortType)`
- `setSearchQuery(query)` / `getSearchSuggestions(query)`
- `setCurrentPage(page)` / `getCurrentPageProducts()` / `getTotalPages()`
- `resetFilters()` - Reset tất cả

**Sử dụng:**
```javascript
FilterModule.setBrand('apple');
const filtered = FilterModule.applyAllFilters();
```

#### `bannerCarousel.js` - Carousel Banner
- `initCarousel(carouselId, config)` - Khởi tạo carousel
- `createDots(carouselId, slideCount)` - Tạo dots
- `updateDots(carouselId, activeIndex)` - Cập nhật dots
- `startAutoSlide(carouselId, interval)` - Tự động chuyển
- `stopAutoSlide(carouselId)` - Dừng tự động

**Sử dụng:**
```javascript
BannerCarousel.initCarousel('banner-carousel-left', {
  autoSlide: true,
  interval: 3000
});
```

### 3. **Pages** (`js/pages/`)

#### `index.js` - Logic Trang Chủ
- Khởi tạo banner carousel
- Bind events cho brand buttons, demand items, sort buttons
- Xử lý search input và suggestions
- Hiển thị sản phẩm ban đầu

#### `product-detail.js` - Logic Chi Tiết Sản Phẩm
- Hiển thị thông tin sản phẩm
- Quản lý gallery ảnh/video
- Xử lý chọn màu sắc
- Bind events cho thumbnails, arrows
- Cập nhật bottom bar

#### `cart.js` - Logic Giỏ Hàng
- Hiển thị danh sách sản phẩm trong giỏ
- Xử lý select all / individual items
- Cập nhật quantity, xóa items
- Tính toán tổng giá
- Validation checkout

#### `admin.js` - Logic Admin
- Hiển thị danh sách users
- CRUD operations cho users
- Toggle user status
- Search/filter users

#### `news.js` - Logic Tin Tức
- Hiển thị danh sách bài viết
- Pagination cho tin tức
- Search/filter bài viết

#### `about.js` - Logic Giới Thiệu
- Hiển thị nội dung giới thiệu
- Có thể có form liên hệ

#### `contact.js` - Logic Liên Hệ
- Xử lý form liên hệ
- Validation form
- Submit form

### 4. **Main** (`js/main.js`)
- Khởi tạo ứng dụng
- Bind global event listeners
- Hiển thị sản phẩm ban đầu
- Xử lý search global

**Global Functions:**
- `window.addToCart(productId)` - Thêm vào giỏ
- `window.buyNow(productId)` - Mua ngay

## 🚀 Cách Sử Dụng

### Trong HTML:
```html
<!-- Data -->
<script src="data/product.js"></script>

<!-- Services -->
<script src="js/services/taskService.js"></script>
<script src="js/services/authService.js"></script>
<script src="js/services/cartService.js"></script>
<script src="js/services/uiService.js"></script>
<script src="js/services/productService.js"></script>

<!-- Modules -->
<script src="js/modules/filterModule.js"></script>
<script src="js/modules/bannerCarousel.js"></script>

<!-- Main App -->
<script src="js/main.js"></script>

<!-- Page Script -->
<script src="js/pages/index.js"></script>
```

### Thứ Tự Load Scripts:
1. **Data** (`data/product.js`)
2. **Services** (theo thứ tự phụ thuộc)
3. **Modules** (sau services)
4. **Main** (`main.js`)
5. **Page Scripts** (cuối cùng)

## ✅ Lợi Ích Cấu Trúc

1. **Separation of Concerns** - Mỗi file có trách nhiệm riêng
2. **Maintainability** - Dễ sửa đổi, debug
3. **Scalability** - Thêm feature mới dễ dàng
4. **Testability** - Có thể test từng module độc lập
5. **Reusability** - Services dùng chung cho nhiều pages
6. **Performance** - Load scripts theo thứ tự tối ưu

## 📝 Quy Ước Code

- **PascalCase** cho Service/Module names
- **camelCase** cho functions/variables
- **SCREAMING_SNAKE_CASE** cho constants
- Sử dụng `DOMContentLoaded` cho page scripts
- Debounce cho search inputs
- Error handling cho async operations

## 🔄 Phát Triển Tiếp Theo

Nếu cần thêm feature mới:

1. **Storage** → Thêm vào `TaskService`
2. **UI Logic** → Thêm vào `UIService`
3. **Business Logic** → Thêm vào `ProductService` hoặc module mới
4. **Page Logic** → Thêm vào `js/pages/[page].js`
5. **Shared Logic** → Tạo module mới trong `js/modules/`

Cấu trúc này đảm bảo code sạch sẽ, dễ quản lý và phát triển bền vững! 🎉
