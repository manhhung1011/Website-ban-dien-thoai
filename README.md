# Shop36S - Website bán điện thoại

## 1. Giới thiệu
Shop36S là website bán điện thoại di động mẫu dành cho học tập và demo. Ứng dụng bao gồm:
- Trang danh sách sản phẩm
- Trang thông tin chi tiết sản phẩm
- Giỏ hàng với chức năng thêm/xóa/thay đổi số lượng
- Thanh toán cơ bản (hiển thị thông báo)
- Quản lý tài khoản (Admin)
- Trang tin tức, liên hệ, giới thiệu

## 2. Mục tiêu người dùng

- **Khách hàng**: duyệt sản phẩm, tìm kiếm, thêm sản phẩm vào giỏ, xét thanh toán.
- **Người dùng đăng nhập**: theo dõi giỏ hàng không bị mất sau reload bằng LocalStorage.
- **Quản trị viên**: qua trang `admin.html`, quản lý tài khoản (thêm/sửa/xóa người dùng), xem danh sách.

## 3. Cấu trúc thư mục

- `index.html`, `product-detail.html`, `cart.html`, `admin.html`, `news.html`, `about.html`, `contact.html`
- `css/`: style chính, footer, cart
- `js/`: logic ứng dụng
  - `services/`: TaskService (localStorage), CartService, ProductService, AuthService, UIService
  - `modules/`: filter, banner
  - `pages/`: mỗi trang có file JS riêng (index.js, cart.js, product-detail.js, ...)
- `data/`: dữ liệu tĩnh (sản phẩm, bài viết)
- `img/`: tài sản ảnh

## 4. Chức năng cơ bản

### 4.1 Giỏ hàng
- Thêm sản phẩm (`addToCart`)
- Cập nhật số lượng
- Xóa sản phẩm
- Chọn/xóa chọn từng sản phẩm hoặc tất cả
- Tính `tạm tính`, `tiết kiệm`, `tổng` theo sản phẩm chọn
- Chuyển đến thanh toán (thông báo)

### 4.2 Sản phẩm
- Lọc theo tiêu chí, phân trang
- Tìm kiếm gợi ý
- Trang chi tiết: hiển thị ảnh, giá, màu sắc, mô tả

### 4.3 Tài khoản và bảo mật
- Đăng nhập, đăng xuất (localStorage)
- Giao diện người dùng hiển thị tên
- Trang admin quản lý người dùng, thay đổi trạng thái, xóa

## 5. Hướng dẫn cài đặt và chạy

1. Clone repo
2. Mở `Website mua bán điện thoại/index.html` trong trình duyệt (hoặc dùng server tĩnh)
3. Không cần backend, dữ liệu local

> Gợi ý xài server nhanh: `npx http-server .` hoặc `python -m http.server 8080`.

## 6. Quy ước mã nguồn
- JS đặt trong `js/services`, `js/pages`, `js/modules`.
- Dùng `DOMContentLoaded` để bind event.
- `TaskService` làm việc localStorage, `CartService` tương tác giỏ.
- UI popup toast trong `UIService`

## 7. Cải tiến đã thực hiện
- Tách logic `cart` vào `js/pages/cart.js`, không còn inline JS ở `cart.html`.
- Sửa `select-all` để có chế độ `indeterminate`, dùng `uniqueKey` thay index
- Sử dụng `CartService.updateCartCount` cho số lượng auto cập nhật

## 8. Phạm vi nâng cấp tiếp theo
- Thêm trang thanh toán thực sự
- Sync với API/Backend
- Quản lý đơn hàng, xử lý khuyến mãi
- Đăng nhập/đăng ký thật với OAuth

## 9. Phân chia nhiệm vụ 

1. **Đỗ Mạnh Hùng / Core feature + Kiểm soát chất lượng** 
   - `cart.html`, `js/pages/cart.js`, `js/services/cartService.js`
   - Triển khai các tính năng: select all + indeterminate, update quantity, delete item, cart summary, checkout validation

2. **Đỗ Khánh Ly - Danh sách sản phẩm và bộ lọc**
   - `index.html`, `product-detail.html`, `js/modules/filterModule.js`, `js/pages/index.js`
   - Lọc, tìm kiếm, phân trang, gợi ý

3. **Nguyễn Thị Yến Nhi - Chi tiết sản phẩm và tính năng màu/hệ số**
   - `js/pages/product-detail.js`, `js/services/productService.js`
   - Hiển thị chi tiết, chọn màu, cập nhật giá, gọi `addToCart`

4. **Dương Nguyên Thượng - Tài khoản và Admin**
   - `admin.html`, `js/pages/admin.js`, `js/services/authService.js`, `js/services/taskService.js`
   - Đăng nhập/đăng xuất, CRUD quản lý người dùng

5. **Lê Hoàng Nam - UI, CSS, responsive & truy cập**
   - `css/style.css`, `css/footer.css`, `css/pages/cart.css`
   - Cải thiện layout, responsive mobile, trải nghiệm người dùng

### Ghi chú phân công chung
- Mỗi thành viên vẫn code ở ít nhất 1 tính năng xong kia phải review 1 PR khác.
- Lead vẫn giữ core feature & QA cuối cùng.
- Dùng Git branch: `feature/<mô-tả>` và pull request rõ ràng.


