// Admin dashboard - Quản lý tài khoản, sản phẩm, đơn hàng, thống kê doanh thu
// Dữ liệu tài khoản mặc định
const accountData = [
  {id: 1, avatar: 'https://i.pravatar.cc/40?img=12', username:'admin', email:'admin@shop36s.com', phone:'0912345678', addr:'Hà Nội', joined:'2024-03-01', status:'Activated'},
  {id: 2, avatar:'https://i.pravatar.cc/40?img=7', username:'manager', email:'manager@shop36s.com', phone:'0987654321', addr:'Hồ Chí Minh', joined:'2024-03-05',status:'Not Activated'},
  {id: 3, avatar:'https://i.pravatar.cc/40?img=21', username:'sales01', email:'sales01@shop36s.com', phone:'0901122334', addr:'Đà Nẵng', joined:'2024-04-12',status:'Activated'}
];

// Quản lý tài khoản
let accounts = [];
let editingAccountId = null;

// Tải tài khoản từ localStorage
function initAccounts() {
  const stored = localStorage.getItem('shop36_accounts');
  if (stored) {
    accounts = JSON.parse(stored);
  } else {
    accounts = JSON.parse(JSON.stringify(accountData));
    saveAccounts();
  }
}

function saveAccounts() {
  localStorage.setItem('shop36_accounts', JSON.stringify(accounts));
}

function getNextAccountId() {
  return accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
}

function getTodayDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

// Hàm kiểm tra dữ liệu
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10,11}$/.test(phone.replace(/\D/g, ''));
}

function validateAccountForm() {
  const fields = ['username', 'email', 'phone', 'address', 'status'];
  const errors = {};
  let isValid = true;

  document.querySelectorAll('.form-group .error-text').forEach(el => {
    el.classList.remove('show');
  });

  const username = document.getElementById('form-username').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const phone = document.getElementById('form-phone').value.trim();
  const address = document.getElementById('form-address').value.trim();
  const status = document.getElementById('form-status').value.trim();

  if (!username) {
    errors['username'] = 'Tên tài khoản không được để trống';
    isValid = false;
  }

  if (!editingAccountId && accounts.some(a => a.username.toLowerCase() === username.toLowerCase())) {
    errors['username'] = 'Tên tài khoản này đã tồn tại';
    isValid = false;
  }

  if (!email) {
    errors['email'] = 'Email không được để trống';
    isValid = false;
  } else if (!validateEmail(email)) {
    errors['email'] = 'Email không đúng định dạng';
    isValid = false;
  }

  if (!editingAccountId && accounts.some(a => a.email.toLowerCase() === email.toLowerCase())) {
    errors['email'] = 'Email này đã được sử dụng';
    isValid = false;
  }

  if (!phone) {
    errors['phone'] = 'Điện thoại không được để trống';
    isValid = false;
  } else if (!validatePhone(phone)) {
    errors['phone'] = 'Số điện thoại phải là 10-11 chữ số';
    isValid = false;
  }

  if (!address) {
    errors['address'] = 'Địa chỉ không được để trống';
    isValid = false;
  }

  if (!status) {
    errors['status'] = 'Trạng thái không được để trống';
    isValid = false;
  }

  if (!isValid) {
    Object.keys(errors).forEach(fieldName => {
      let elementId = 'form-' + fieldName;
      const input = document.getElementById(elementId);
      if (input) {
        const errorText = input.parentElement.querySelector('.error-text');
        if (errorText) {
          errorText.textContent = errors[fieldName];
          errorText.classList.add('show');
        }
      }
    });
  }

  return isValid;
}

// Quản lý modal tài khoản
function openAccountModal(accountId = null) {
  editingAccountId = accountId;
  const modal = document.getElementById('account-modal');
  const form = document.getElementById('account-form');
  const modalTitle = document.getElementById('modal-title');

  form.reset();
  document.querySelectorAll('.form-group .error-text').forEach(el => {
    el.classList.remove('show');
  });

  if (accountId) {
    const account = accounts.find(a => a.id === accountId);
    if (!account) return;

    modalTitle.textContent = 'Chỉnh sửa tài khoản';
    document.getElementById('form-username').value = account.username;
    document.getElementById('form-email').value = account.email;
    document.getElementById('form-phone').value = account.phone;
    document.getElementById('form-address').value = account.addr;
    document.getElementById('form-status').value = account.status;
    document.getElementById('form-avatar').value = account.avatar;
  } else {
    modalTitle.textContent = 'Thêm tài khoản mới';
    document.getElementById('form-avatar').value = 'https://i.pravatar.cc/40?img=' + Math.floor(Math.random() * 70);
  }

  modal.classList.add('active');
}

function closeAccountModal() {
  const modal = document.getElementById('account-modal');
  modal.classList.remove('active');
  editingAccountId = null;
}

function setupAccountFormHandlers() {
  const accountForm = document.getElementById('account-form');
  const formCancel = document.getElementById('form-cancel');
  const accountModal = document.getElementById('account-modal');

  if (!accountForm || !formCancel || !accountModal) return;

  accountForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateAccountForm()) return;

    const username = document.getElementById('form-username').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const address = document.getElementById('form-address').value.trim();
    const status = document.getElementById('form-status').value.trim();
    const avatar = document.getElementById('form-avatar').value.trim() || 'https://i.pravatar.cc/40?img=' + Math.floor(Math.random() * 70);

    if (editingAccountId) {
      const account = accounts.find(a => a.id === editingAccountId);
      if (account) {
        account.username = username;
        account.email = email;
        account.phone = phone;
        account.addr = address;
        account.status = status;
        account.avatar = avatar;
      }
    } else {
      const newAccount = {
        id: getNextAccountId(),
        avatar: avatar,
        username: username,
        email: email,
        phone: phone,
        addr: address,
        joined: getTodayDate(),
        status: status
      };
      accounts.push(newAccount);
    }

    saveAccounts();
    renderAccountTable();
    closeAccountModal();
    alert(editingAccountId ? 'Cập nhật tài khoản thành công!' : 'Thêm tài khoản thành công!');
  });

  formCancel.addEventListener('click', closeAccountModal);

  accountModal.addEventListener('click', (e) => {
    if (e.target.id === 'account-modal') {
      closeAccountModal();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAccountFormHandlers);
} else {
  setTimeout(setupAccountFormHandlers, 100);
}

// Xóa tài khoản
function deleteAccount(accountId) {
  if (confirm('Bạn có chắc muốn xóa tài khoản này?')) {
    accounts = accounts.filter(a => a.id !== accountId);
    saveAccounts();
    renderAccountTable();
    alert('Xóa tài khoản thành công!');
  }
}

// Hiển thị bảng tài khoản
function renderAccountTable() {
  const tbody = document.querySelector('#accounts-table tbody');
  tbody.innerHTML = '';
  accounts.forEach(acc => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${acc.id}</td>
      <td><img src="${acc.avatar}" alt="avatar" style="width:40px;height:40px;border-radius:50%;"/></td>
      <td>${acc.username}</td>
      <td>${acc.email}</td>
      <td>${acc.phone}</td>
      <td>${acc.addr}</td>
      <td>${acc.joined}</td>
      <td><span class="badge ${acc.status === 'Activated' ? 'active' : 'deactive'}">${acc.status}</span></td>
      <td class="action-buttons">
        <button class="btn-edit" data-id="${acc.id}" title="Sửa" style="cursor:pointer;border:none;background:none;">✏</button>
        <button class="btn-delete" data-id="${acc.id}" title="Xóa" style="cursor:pointer;border:none;background:none;">🗑</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const id = parseInt(this.getAttribute('data-id'));
      openAccountModal(id);
    });
  });

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const id = parseInt(this.getAttribute('data-id'));
      deleteAccount(id);
    });
  });
}

function loadAccounts(){
  renderAccountTable();
}

// Quản lý sản phẩm
let adminProducts = [];

function initProducts() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    try {
      adminProducts = JSON.parse(storedProducts);
    } catch (e) {
      adminProducts = [];
    }
  }

  if (!adminProducts || adminProducts.length === 0) {
    if (window.products && Array.isArray(window.products)) {
      adminProducts = JSON.parse(JSON.stringify(window.products));
    } else {
      adminProducts = [];
    }
  }

  saveProducts();
}

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(adminProducts));
}

function getNextProductId() {
  return adminProducts.length > 0 ? Math.max(...adminProducts.map((p) => p.id)) + 1 : 1;
}

let productSearchQuery = '';
let productFilterField = 'all';
let currentProductPage = 1;
const productsPerPage = 15;

function formatDate(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function getFilteredProducts() {
  const q = productSearchQuery.trim().toLowerCase();
  if (!q) return adminProducts;
  return adminProducts.filter((p) => {
    const name = (p.name || '').toLowerCase();
    const sku = (p.code || '').toLowerCase();
    const brand = (p.brand || '').toLowerCase();

    if (productFilterField === 'name') return name.includes(q);
    if (productFilterField === 'code') return sku.includes(q);
    if (productFilterField === 'brand') return brand.includes(q);
    return name.includes(q) || sku.includes(q) || brand.includes(q);
  });
}

function renderPagination(totalPages, currentPage) {
  const container = document.getElementById('products-pagination');
  if (!container) return;

  container.innerHTML = '';
  if (totalPages <= 1) return;

  const createBtn = (text, disabled, onClick, active = false) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = 'pagination-btn';
    if (active) btn.classList.add('active');
    if (disabled) btn.disabled = true;
    btn.addEventListener('click', onClick);
    return btn;
  };

  container.appendChild(createBtn('<< Prev', currentPage === 1, () => {
    currentProductPage = Math.max(1, currentProductPage - 1);
    renderProducts();
  }));

  for (let i = 1; i <= totalPages; i++) {
    container.appendChild(createBtn(i, false, () => {
      currentProductPage = i;
      renderProducts();
    }, i === currentPage));
  }

  container.appendChild(createBtn('Next >>', currentPage === totalPages, () => {
    currentProductPage = Math.min(totalPages, currentProductPage + 1);
    renderProducts();
  }));
}

function renderProducts() {
  const tbody = document.querySelector('#products-table tbody');
  if (!tbody) return;

  const filtered = getFilteredProducts();
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / productsPerPage));
  currentProductPage = Math.min(currentProductPage, totalPages);

  tbody.innerHTML = '';

  if (totalItems === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="8" style="text-align:center;">Không tìm thấy sản phẩm.</td>';
    tbody.appendChild(tr);
    renderPagination(0, 0);
    return;
  }

  const start = (currentProductPage - 1) * productsPerPage;
  const pageProducts = filtered.slice(start, start + productsPerPage);

  pageProducts.forEach((p) => {
    const status = (Number(p.quantity) > 0) ? 'Còn hàng' : 'Hết hàng';
    const badgeClass = status === 'Còn hàng' ? 'badge stock' : 'badge soldout';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.id}</td>
      <td><img src="${p.image || ''}" alt="${p.name || ''}" style="width:50px;height:50px;border-radius:8px;object-fit:cover;"/></td>
      <td>${p.code || ''}</td>
      <td>${p.name || ''}</td>
      <td>${p.brand || ''}</td>
      <td>${p.created ? formatDate(p.created) : ''}</td>
      <td><span class="${badgeClass}">${status}</span></td>
      <td class="action-buttons">
        <button class="btn-edit-product" data-id="${p.id}" title="Sửa" style="border:none;background:transparent;cursor:pointer">✏️</button>
        <button class="btn-delete-product" data-id="${p.id}" title="Xóa" style="border:none;background:transparent;cursor:pointer">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  tbody.querySelectorAll('.btn-edit-product').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id, 10);
      openProductModal(id);
    });
  });

  tbody.querySelectorAll('.btn-delete-product').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id, 10);
      deleteProduct(id);
    });
  });

  renderPagination(totalPages, currentProductPage);
}

function loadProducts() {
  initProducts();
  renderProducts();
}

let editingProductId = null;

function openProductModal(productId = null) {
  const modal = document.getElementById('product-modal');
  const title = document.getElementById('product-modal-title');
  const form = document.getElementById('product-form');
  if (!modal || !title || !form) return;

  editingProductId = productId;
  form.reset();
  document.querySelectorAll('#product-form .error-text').forEach((el) => el.classList.remove('show'));

  if (productId) {
    const product = adminProducts.find((p) => p.id === productId);
    if (!product) return;
    title.textContent = 'Chỉnh sửa sản phẩm';
    document.getElementById('p-name').value = product.name || '';
    document.getElementById('p-sku').value = product.code || '';
    document.getElementById('p-brand').value = product.brand || '';
    document.getElementById('p-image').value = product.image || '';
    document.getElementById('p-quantity').value = product.quantity != null ? product.quantity : 0;
  } else {
    title.textContent = 'Thêm sản phẩm mới';
  }

  modal.style.display = 'flex';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.style.display = 'none';
  editingProductId = null;
}

function setStatusByQuantity(product) {
  if ((Number(product.quantity) || 0) > 0) {
    product.status = 'Còn hàng';
  } else {
    product.status = 'Hết hàng';
  }
}

document.getElementById('product-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('p-name').value.trim();
  const code = document.getElementById('p-sku').value.trim();
  const brand = document.getElementById('p-brand').value.trim();
  const image = document.getElementById('p-image').value.trim();
  const quantity = Number(document.getElementById('p-quantity').value);

  if (!name || !code || !brand || !image || Number.isNaN(quantity)) {
    if (!name) document.querySelector('#p-name + .error-text').textContent = 'Bắt buộc';
    if (!code) document.querySelector('#p-sku + .error-text').textContent = 'Bắt buộc';
    if (!brand) document.querySelector('#p-brand + .error-text').textContent = 'Bắt buộc';
    if (!image) document.querySelector('#p-image + .error-text').textContent = 'Bắt buộc';
    if (Number.isNaN(quantity)) document.querySelector('#p-quantity + .error-text').textContent = 'Số lượng không hợp lệ';
    document.querySelectorAll('#product-form .error-text').forEach((el) => { if (el.textContent) el.classList.add('show'); });
    return;
  }

  const now = new Date();
  const created = now.toISOString();

  if (editingProductId) {
    const existing = adminProducts.find((p) => p.id === editingProductId);
    if (existing) {
      existing.name = name;
      existing.code = code;
      existing.brand = brand;
      existing.image = image;
      existing.quantity = quantity;
      setStatusByQuantity(existing);
    }
  } else {
    const newP = {
      id: getNextProductId(),
      name,
      code,
      brand,
      image,
      quantity,
      created,
      status: quantity > 0 ? 'Còn hàng' : 'Hết hàng'
    };
    adminProducts.push(newP);
  }

  saveProducts();
  renderProducts();
  closeProductModal();
});

document.getElementById('product-cancel')?.addEventListener('click', closeProductModal);
document.getElementById('product-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'product-modal') closeProductModal();
});

document.getElementById('new-product')?.addEventListener('click', () => openProductModal());
document.getElementById('refresh-products')?.addEventListener('click', () => {
  productSearchQuery = '';
  document.getElementById('product-search').value = '';
  currentProductPage = 1;
  renderProducts();
});

document.getElementById('product-search')?.addEventListener('input', (e) => {
  productSearchQuery = e.target.value;
  currentProductPage = 1;
  renderProducts();
});

document.getElementById('product-filter-field')?.addEventListener('change', (e) => {
  productFilterField = e.target.value;
  currentProductPage = 1;
  renderProducts();
});

// Dữ liệu doanh số bán
const salesData = {
  2024: {
    3: [
      {id:1, code:'#PSO61843', name:'iPhone 13 Pro 128GB', color:'Blue', order:'#PSO61843', date:'31/3/2024', qty:5, priceIn:30490000, priceOut:31490000, revenue:157450000, profit:5000000},
      {id:2, code:'#PSO61843', name:'iPhone 13 Pro Max 128GB', color:'Black', order:'#PSO61843', date:'31/3/2024', qty:2, priceIn:33990000, priceOut:35990000, revenue:71980000, profit:4000000}
    ]
  }
};

function formatCurrency(num){
  return new Intl.NumberFormat('vi-VN').format(num)+'đ';
}

function isAdminLoggedIn(){
  return localStorage.getItem('authUser') === 'admin';
}

function setAdminLoggedIn(){
  localStorage.setItem('authUser', 'admin');
}

function clearAdminLoggedIn(){
  localStorage.removeItem('authUser');
}

// Quản lý đơn hàng
let adminOrders = [];
let orderFilterStatus = 'all';
let orderSearchQuery = '';

function updateDashboardStats() {
  document.getElementById('dashboard-users-count').textContent = accounts.length;
  document.getElementById('dashboard-products-count').textContent = adminProducts.length;
  document.getElementById('dashboard-orders-count').textContent = adminOrders.length;

  const confirmedOrders = adminOrders.filter(o => o.status === 'Confirmed').length;
  const deliveredOrders = adminOrders.filter(o => o.status === 'Delivered').length;
  const totalStatusRevenue = adminOrders
    .filter(o => o.status === 'Confirmed')
    .reduce((sum, o) => sum + getOrderTotal(o), 0);
  const totalStatusProfit = adminOrders
    .filter(o => o.status === 'Confirmed')
    .reduce((sum, o) => sum + getOrderProfit(o), 0);

  document.getElementById('dashboard-confirmed-count').textContent = confirmedOrders;
  document.getElementById('dashboard-delivered-count').textContent = deliveredOrders;
  document.getElementById('dashboard-revenue-total').textContent = formatCurrency(totalStatusRevenue);
  document.getElementById('dashboard-profit-total').textContent = formatCurrency(totalStatusProfit);

  renderDashboardCharts();
}

function renderDashboardCharts() {
  const year = Number(document.getElementById('sales-year')?.value || new Date().getFullYear());
  const monthlyTotals = Array.from({ length: 12 }, () => 0);
  adminOrders
    .filter(o => o.status === 'Confirmed')
    .forEach(o => {
      const d = new Date(o.created);
      if (!isNaN(d.getTime()) && d.getFullYear() === year) {
        monthlyTotals[d.getMonth()] += getOrderTotal(o);
      }
    });

  const maxVal = Math.max(...monthlyTotals, 1);
  const points = monthlyTotals.map((val, i) => {
    const x = 40 + (i * 32);
    const y = 200 - (val / maxVal) * 160;
    return `${x},${y}`;
  });

  const pointElements = points.map((pt, i) => {
    const [x, y] = pt.split(',').map(Number);
    return `<circle cx="${x}" cy="${y}" r="3" fill="#3498db"/>`;
  }).join('');

  const polylinePoints = points.join(' ');

  const labelElements = Array.from({ length: 12 }, (_, i) => {
    const x = 40 + (i * 32);
    return `<text x="${x}" y="230" text-anchor="middle" font-size="9" fill="#999">${i + 1}</text>`;
  }).join('');

  const axis = `
    <line x1="40" y1="40" x2="40" y2="200" stroke="#e5e7eb" stroke-width="2"/>
    <line x1="40" y1="200" x2="380" y2="200" stroke="#e5e7eb" stroke-width="2"/>
  `;

  const dataFill = `
    <polygon points="${polylinePoints} 380,200 40,200" fill="#5eb3d6" opacity="0.2" />
    <polyline points="${polylinePoints}" fill="none" stroke="#3498db" stroke-width="2" />
    ${pointElements}
  `;

  document.getElementById('dashboard-sales-axis').innerHTML = axis;
  document.getElementById('dashboard-sales-data').innerHTML = dataFill;
  document.getElementById('dashboard-sales-labels').innerHTML = labelElements;

  const statusCounts = adminOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const statusColors = {
    Pending: '#f39c12',
    Confirmed: '#3498db',
    Shipping: '#9b59b6',
    Delivered: '#2ecc71',
    Cancelled: '#e74c3c'
  };

  const totalStatus = Object.values(statusCounts).reduce((a,b)=>a+b,0) || 1;
  let statusOffset = 0;
  const statusSegments = Object.keys(statusCounts).map(status => {
    const count = statusCounts[status];
    const pct = count / totalStatus;
    const length = pct * (Math.PI * 2 * 60);
    const arclength = length;
    const dasharray = `${(arclength).toFixed(2)} ${(Math.PI * 2 * 60).toFixed(2)}`;
    const offset = statusOffset;
    statusOffset += arclength;
    return `<circle cx="70" cy="100" r="60" fill="none" stroke="${statusColors[status]||'#777'}" stroke-width="20" transform="rotate(-90 70 100)" stroke-dasharray="${dasharray}" stroke-dashoffset="-${offset.toFixed(2)}"/>`;
  }).join('');

  const legendItems = Object.keys(statusCounts).map((status, idx) => {
    const color = statusColors[status] || '#777';
    return `<g transform="translate(160, ${25 + idx*20})"><circle cx="0" cy="0" r="4" fill="${color}"/><text x="10" y="4" font-size="10" fill="#333">${status} (${statusCounts[status]})</text></g>`;
  }).join('');

  document.getElementById('dashboard-status-segments').innerHTML = statusSegments;
  document.getElementById('dashboard-status-legend').innerHTML = legendItems;
}

function showAdminShell(){
  const adminShell = document.getElementById('admin-shell');
  if (adminShell) {
    adminShell.style.display = 'grid';
  }
  initAccounts();
  initProducts();
  initOrders();

  const salesYearSelect = document.getElementById('sales-year');
  if (salesYearSelect) {
    const confirmedYears = Array.from(new Set(adminOrders
      .filter(o => o.status === 'Confirmed')
      .map(o => new Date(o.created).getFullYear())
      .filter(y => !isNaN(y))));
    if (confirmedYears.length > 0) {
      const latestYear = Math.max(...confirmedYears);
      salesYearSelect.value = String(latestYear);
    } else {
      salesYearSelect.value = String(new Date().getFullYear());
    }
  }

  loadAccounts(); loadProducts(); loadOrders(); updateDashboardStats(); loadSales();
}

if(!isAdminLoggedIn()){
  window.location.href = 'index.html';
} else {
  showAdminShell();
}

const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', ()=>{
    const u=document.getElementById('login-username').value.trim();
    const p=document.getElementById('login-password').value.trim();
    if(u==='admin' && p==='123'){
      setAdminLoggedIn();
      showAdminShell();
    } else {
      const errorEl = document.getElementById('login-error');
      if (errorEl) errorEl.style.display='block';
    }
  });
}

const menuButtons=document.querySelectorAll('#sidebar-nav button');
menuButtons.forEach(btn=>btn.addEventListener('click', ()=>{
  menuButtons.forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  const panel=btn.dataset.panel;
  document.querySelectorAll('.panel').forEach(p=>p.style.display='none');
  document.getElementById(panel+'-panel').style.display='block';
  document.getElementById('current-breadcrumb').textContent=btn.textContent;
}));

const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    clearAdminLoggedIn();
    window.location.href = 'index.html';
  });
}

document.getElementById('sidebar-search')?.addEventListener('input', (e)=>{
  const term=e.target.value.trim().toLowerCase();
  menuButtons.forEach(btn=>{
    const text=btn.textContent.toLowerCase();
    btn.style.display=text.includes(term)?'block':'none';
  });
});

function loadOrders() {
  initOrders();
  renderOrders();
}

function openOrderModal() {
  const modal = document.getElementById('order-modal');
  const form = document.getElementById('order-form');
  if (!modal || !form) return;
  form.reset();
  modal.style.display = 'flex';
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (!modal) return;
  modal.style.display = 'none';
}

function parseOrderItems(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const items = [];
  for (const line of lines) {
    const parts = line.split('-').map(p=>p.trim());
    if (parts.length < 3) continue;

    let name = parts[0];
    let qty = Number(parts[1]);
    let unitPrice = Number(parts[2]);
    let brand = null;
    let productId = null;

    if (adminProducts && adminProducts.length && parts.length === 3) {
      const maybeProduct = adminProducts.find(p => p.code?.toLowerCase() === name.toLowerCase() || p.id?.toString() === name);
      if (maybeProduct) {
        productId = maybeProduct.id;
        brand = maybeProduct.brand;
        name = maybeProduct.name;
        unitPrice = Number(unitPrice) || Number(maybeProduct.price) || Number(maybeProduct.unitPrice) || unitPrice;
      }
    }

    if (parts.length >= 4) {
      brand = parts[3] || brand;
    }

    if (!name || !qty || !unitPrice) continue;
    items.push({productId, name, qty, unitPrice, cost: Math.round(unitPrice * 0.85), brand});
  }
  return items;
}

function addOrderFromForm() {
  const customer = document.getElementById('o-customer').value.trim();
  const email = document.getElementById('o-email').value.trim();
  const phone = document.getElementById('o-phone').value.trim();
  const payment = document.getElementById('o-payment').value;
  const itemsText = document.getElementById('o-items').value.trim();

  if (!customer || !email || !phone || !itemsText) {
    alert('Vui lòng nhập đầy đủ thông tin đơn hàng.');
    return;
  }

  const items = parseOrderItems(itemsText);
  if (!items.length) {
    alert('Vui lòng nhập ít nhất 1 sản phẩm hợp lệ.');
    return;
  }

  const newOrder = {
    id: getNextOrderId(),
    code: `ORD-${new Date().getTime()}`,
    account: 'admin',
    customer,
    email,
    phone,
    payment,
    created: new Date().toISOString().split('T')[0],
    status: 'Pending',
    items
  };

  adminOrders.unshift(newOrder);
  saveOrders();
  renderOrders();
  renderSales();
  closeOrderModal();
}

function initOrders() {
  const stored = localStorage.getItem('shop36_orders');
  const defaultOrders = [
    {id:1,code:'ORD-202501',account:'admin',customer:'Trần Văn A',email:'a@example.com',phone:'0912345678',payment:'COD',created:'2025-01-03',status:'Delivered',items:[{productId:1,name:'iPhone 15 Pro',qty:2,unitPrice:42990000,cost:39990000}]},
    {id:2,code:'ORD-202502',account:'manager',customer:'Nguyễn Thị B',email:'b@example.com',phone:'0987123456',payment:'VC',created:'2025-01-05',status:'Shipping',items:[{productId:4,name:'Galaxy S23 Ultra',qty:1,unitPrice:25490000,cost:22490000}]},
    {id:3,code:'ORD-202503',account:'sales01',customer:'Lê Thị C',email:'c@example.com',phone:'0977888999',payment:'ATM',created:'2025-01-10',status:'Pending',items:[{productId:2,name:'iPhone 15 Pro Max',qty:1,unitPrice:48990000,cost:44990000},{productId:7,name:'Samsung A54',qty:2,unitPrice:10490000,cost:8990000}]},
    {id:4,code:'ORD-202504',account:'admin',customer:'Ngô Văn D',email:'d@example.com',phone:'0901234567',payment:'COD',created:'2025-01-15',status:'Confirmed',items:[{productId:3,name:'iPhone 15',qty:1,unitPrice:32990000,cost:29990000}]},
    {id:5,code:'ORD-202505',account:'manager',customer:'Phạm Thị E',email:'e@example.com',phone:'0912345000',payment:'ATM',created:'2025-02-02',status:'Confirmed',items:[{productId:6,name:'Xiaomi 14',qty:2,unitPrice:14990000,cost:12990000}]},
    {id:6,code:'ORD-202506',account:'sales01',customer:'Lưu Văn F',email:'f@example.com',phone:'0923456789',payment:'VC',created:'2025-02-11',status:'Cancelled',items:[{productId:8,name:'Samsung A54',qty:3,unitPrice:10490000,cost:8990000}]},
    {id:7,code:'ORD-202507',account:'admin',customer:'Vũ Thị G',email:'g@example.com',phone:'0934567890',payment:'COD',created:'2025-03-01',status:'Confirmed',items:[{productId:10,name:'iPhone 14 Pro',qty:1,unitPrice:37990000,cost:34990000}]},
    {id:8,code:'ORD-202508',account:'manager',customer:'Bùi Văn H',email:'h@example.com',phone:'0945678901',payment:'ATM',created:'2025-03-10',status:'Delivered',items:[{productId:5,name:'Samsung S23',qty:2,unitPrice:21990000,cost:18990000}]},
    {id:9,code:'ORD-202509',account:'sales01',customer:'Đặng Thị I',email:'i@example.com',phone:'0956789012',payment:'VC',created:'2025-03-20',status:'Confirmed',items:[{productId:9,name:'Xiaomi 13',qty:1,unitPrice:12990000,cost:10990000}]},
    {id:10,code:'ORD-202510',account:'admin',customer:'Trương Văn K',email:'k@example.com',phone:'0967890123',payment:'COD',created:'2025-04-01',status:'Pending',items:[{productId:11,name:'iPhone 15 Plus',qty:1,unitPrice:37990000,cost:34990000}]}
  ];

  if (stored) {
    try {
      adminOrders = JSON.parse(stored);
    } catch (e) {
      adminOrders = [];
    }
  }

  if (!adminOrders || adminOrders.length === 0) {
    adminOrders = [...defaultOrders];
    saveOrders();
    return;
  }

  if (adminOrders.length < defaultOrders.length) {
    const existingIds = new Set(adminOrders.map(o => o.id));
    defaultOrders.forEach(o => {
      if (!existingIds.has(o.id)) {
        adminOrders.push(o);
      }
    });
  }

  adminOrders.sort((a, b) => a.id - b.id);
  saveOrders();
}

function saveOrders() {
  localStorage.setItem('shop36_orders', JSON.stringify(adminOrders));
}

function getNextOrderId() {
  return adminOrders.length > 0 ? Math.max(...adminOrders.map((o) => o.id)) + 1 : 1;
}

function getOrderTotal(order) {
  return order.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.unitPrice)), 0);
}

function getOrderProfit(order) {
  return order.items.reduce((sum, item) => sum + (Number(item.qty) * (Number(item.unitPrice) - Number(item.cost || 0))), 0);
}

function renderOrders() {
  const tbody = document.querySelector('#orders-table tbody');
  if (!tbody) return;

  let filtered = adminOrders;
  const q = orderSearchQuery.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(o =>
      o.code.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.account.toLowerCase().includes(q) ||
      o.phone.toLowerCase().includes(q)
    );
  }
  if (orderFilterStatus !== 'all') {
    filtered = filtered.filter(o => o.status === orderFilterStatus);
  }

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="11" style="text-align:center;">Không tìm thấy đơn hàng.</td>';
    tbody.appendChild(tr);
    return;
  }

  filtered.forEach((order) => {
    const total = getOrderTotal(order);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.code}</td>
      <td>${order.account}</td>
      <td>${order.customer}</td>
      <td>${order.email}</td>
      <td>${order.phone}</td>
      <td>${order.payment}</td>
      <td>${order.created}</td>
      <td><span class="badge ${order.status==='Delivered'?'active':order.status==='Cancelled'?'deactive':'badge'}">${order.status}</span></td>
      <td>${formatCurrency(total)}</td>
      <td class="action-buttons">
        <button class="btn-order-view" data-id="${order.id}" title="Xem chi tiết" style="border:none;background:none;cursor:pointer">👁</button>
        <select class="order-status-select" data-id="${order.id}" style="border:1px solid #ccc;border-radius:6px;padding:2px 6px;">
          <option value="Pending" ${order.status==='Pending'?'selected':''}>Pending</option>
          <option value="Confirmed" ${order.status==='Confirmed'?'selected':''}>Confirmed</option>
          <option value="Shipping" ${order.status==='Shipping'?'selected':''}>Shipping</option>
          <option value="Delivered" ${order.status==='Delivered'?'selected':''}>Delivered</option>
          <option value="Cancelled" ${order.status==='Cancelled'?'selected':''}>Cancelled</option>
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-order-view').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const order = adminOrders.find(o => o.id === id);
      if (!order) return;
      const lines = order.items.map(i => `${i.name} x${i.qty} => ${formatCurrency(i.qty * i.unitPrice)}`).join('\n');
      alert(
        `Đơn ${order.code} (${order.status})\nKhách: ${order.customer} \nEmail: ${order.email} \nSĐT: ${order.phone}\nThanh toán: ${order.payment}\nTạo: ${order.created}\n\nDanh sách sản phẩm:\n${lines}\n\nTổng: ${formatCurrency(getOrderTotal(order))} \nLợi nhuận: ${formatCurrency(getOrderProfit(order))}`
      );
    });
  });

  tbody.querySelectorAll('.order-status-select').forEach(select => {
    select.addEventListener('change', () => {
      const id = Number(select.dataset.id);
      const order = adminOrders.find(o => o.id === id);
      if (!order) return;
      order.status = select.value;
      saveOrders();
      renderOrders();
      renderSales();
    });
  });

  updateDashboardStats();
}

document.getElementById('new-order')?.addEventListener('click', ()=>openOrderModal());
document.getElementById('order-cancel')?.addEventListener('click', ()=>closeOrderModal());
document.getElementById('order-form')?.addEventListener('submit', (e)=>{e.preventDefault();addOrderFromForm();});
document.getElementById('order-search')?.addEventListener('input', (e)=>{orderSearchQuery=e.target.value;renderOrders();});
document.getElementById('order-status-filter')?.addEventListener('change', (e)=>{orderFilterStatus=e.target.value;renderOrders();});

function renderSales(){
  const year=Number(document.getElementById('sales-year').value || new Date().getFullYear());
  const month=Number(document.getElementById('sales-month').value || 0);
  const allOrders=adminOrders.filter(o=>{const d=new Date(o.created);if(isNaN(d.getTime()))return false;if(d.getFullYear()!==year)return false;if(month!==0&&d.getMonth()+1!==month)return false;return o.status==='Confirmed';});
  const totalRevenue=allOrders.reduce((sum,o)=>sum+getOrderTotal(o),0);
  const totalProfit=allOrders.reduce((sum,o)=>sum+getOrderProfit(o),0);
  const totalOrders=allOrders.length;
  const totalProducts=allOrders.reduce((sum,o)=>sum+o.items.reduce((s,i)=>s+Number(i.qty),0),0);
  const salesRevenueDisplayEl=document.getElementById('sales-revenue-display');
  if(salesRevenueDisplayEl)salesRevenueDisplayEl.innerText=formatCurrency(totalRevenue).replace('đ','').trim();
  const totalRevenueEl=document.getElementById('total-revenue');
  if(totalRevenueEl)totalRevenueEl.innerText=formatCurrency(totalRevenue).replace('đ','').trim();
  const totalProfitEl=document.getElementById('total-profit');
  if(totalProfitEl)totalProfitEl.innerText=formatCurrency(totalProfit).replace('đ','').trim();
  const statCards=document.querySelectorAll('.stat-card');
  if(statCards&&statCards[0])statCards[0].querySelector('div').innerText=totalOrders;
  if(statCards&&statCards[1])statCards[1].querySelector('div').innerText=totalProducts;
  const monthLabel=month===0?'Cả năm':`Tháng ${month}`;
  document.querySelector('#sales-chart-title').innerText=`Biểu Đồ Kinh Doanh ${monthLabel} Năm ${year}`;
  document.getElementById('sales-table-title').innerText=`Danh Sách Sản Phẩm Xuất Kho ${monthLabel} Năm ${year}`;
  const brandVolume={};
  const brandRevenue={};
  const brandProfit={};
  allOrders.forEach(o=>{o.items.forEach(item=>{let brand=item.brand||null;if(!brand&&item.productId){brand=adminProducts.find(p=>p.id===item.productId)?.brand||null;}if(!brand&&item.name){const found=adminProducts.find(p=>p.name?.toLowerCase()===item.name.toLowerCase());if(found)brand=found.brand;}brand=brand||'Khác';const qty=Number(item.qty)||0;const revenue=Number(item.qty)*Number(item.unitPrice);const profit=Number(item.qty)*(Number(item.unitPrice)-Number(item.cost||0));brandVolume[brand]=(brandVolume[brand]||0)+qty;brandRevenue[brand]=(brandRevenue[brand]||0)+revenue;brandProfit[brand]=(brandProfit[brand]||0)+profit;});});
  const colorPalette=['#3498db','#e74c3c','#f1c40f','#2ecc71','#9b59b6','#e67e22','#1abc9c','#34495e'];
  const renderBrandDonut=(segmentGroupId,legendId,dataMap,total)=>{const segmentGroup=document.getElementById(segmentGroupId);const legend=document.getElementById(legendId);if(!segmentGroup||!legend)return;segmentGroup.innerHTML='';legend.innerHTML='';if(!total||Object.keys(dataMap).length===0){legend.innerHTML='<div style="color:#999;">Không có dữ liệu</div>';return;}const entries=Object.entries(dataMap).filter(([,value])=>value>0).sort((a,b)=>b[1]-a[1]);if(entries.length===0)return;let offset=0;entries.forEach(([brand,value],index)=>{const pct=Math.round((value/total)*100);const usedLength=(pct/100)*314;const color=colorPalette[index%colorPalette.length];const arc=document.createElementNS('http://www.w3.org/2000/svg','circle');arc.setAttribute('cx','100');arc.setAttribute('cy','100');arc.setAttribute('r','50');arc.setAttribute('fill','none');arc.setAttribute('stroke',color);arc.setAttribute('stroke-width','25');arc.setAttribute('transform','rotate(-90 100 100)');arc.setAttribute('stroke-dasharray',`${usedLength.toFixed(2)} 314`);arc.setAttribute('stroke-dashoffset',`${offset.toFixed(2)}`);segmentGroup.appendChild(arc);const legendItem=document.createElement('div');legendItem.style='display:flex;align-items:center;gap:8px;margin-bottom:4px;';legendItem.innerHTML=`<span style="width:12px;height:12px;border-radius:50%;background:${color};display:inline-block;"></span>${brand} - ${pct}%`;legend.appendChild(legendItem);offset-=usedLength;});};const totalBrandVolume=Object.values(brandVolume).reduce((a,b)=>a+b,0);const totalBrandRevenue=Object.values(brandRevenue).reduce((a,b)=>a+b,0);const totalBrandProfit=Object.values(brandProfit).reduce((a,b)=>a+b,0);renderBrandDonut('chart-sales-brand-segments','chart-sales-brand-legend',brandVolume,totalBrandVolume);renderBrandDonut('chart-sales-profit-segments','chart-sales-profit-legend',brandProfit,totalBrandProfit);const chartSvg=document.getElementById('sales-trend-chart');if(chartSvg){const totalsByDay={};allOrders.forEach(order=>{const d=new Date(order.created);if(isNaN(d.getTime()))return;const key=`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;totalsByDay[key]=(totalsByDay[key]||0)+getOrderTotal(order);});const sortedDays=Object.keys(totalsByDay).sort((a,b)=>{const[da,ma]=a.split('/').map(Number);const[db,mb]=b.split('/').map(Number);if(ma!==mb)return ma-mb;return da-db;});const maxValue=sortedDays.length?Math.max(...sortedDays.map(day=>totalsByDay[day])):1;const points=[];const labels=[];const chartW=730;const chartH=220;sortedDays.forEach((day,idx)=>{const x=50+(idx/Math.max(1,sortedDays.length-1))*chartW;const y=260-(totalsByDay[day]/maxValue)*(chartH-30);points.push(`${x},${y}`);labels.push(`<text x="${x}" y="285" text-anchor="middle" font-size="10" fill="#999">${day}</text>`);});const shade=sortedDays.length?`<polygon points="${points.join(' ')} ${points[points.length-1].split(',')[0]},260 ${points[0].split(',')[0]},260" fill="#5eb3d6" opacity="0.15" /><polyline points="${points.join(' ')}" stroke="#2980b9" stroke-width="3" fill="none"/>`:'<text x="400" y="150" text-anchor="middle" fill="#999">Không có dữ liệu</text>';chartSvg.querySelector('#sales-chart-data').innerHTML=shade;chartSvg.querySelector('#sales-chart-labels').innerHTML=labels.join('');}const tbody=document.getElementById('sales-table-body');tbody.innerHTML='';const productMap={};allOrders.forEach(o=>{o.items.forEach(item=>{const key=`${item.productId||item.name}_${item.unitPrice}`;if(!productMap[key]){productMap[key]={...item,quantity:0,revenue:0,profit:0};}productMap[key].quantity+=Number(item.qty);productMap[key].revenue+=Number(item.qty)*Number(item.unitPrice);productMap[key].profit+=Number(item.qty)*(Number(item.unitPrice)-Number(item.cost||0));});});const products=Object.values(productMap);products.forEach((item,idx)=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${idx+1}</td><td>${item.productId||'-'}</td><td>${item.name}</td><td>${item.color||'-'}</td><td>${item.order||'-'}</td><td>${allOrders.length>0?allOrders[0].created:'-'}</td><td>${item.quantity}</td><td style="color:#999;">${formatCurrency(item.cost||0)}</td><td style="color:#e74c3c;">${formatCurrency(item.unitPrice)}</td><td style="color:#27ae60;font-weight:700;">${formatCurrency(item.revenue)}</td><td style="color:#2980b9;font-weight:700;">${formatCurrency(item.profit)}</td>`;tbody.appendChild(tr);});
}

function loadSales(){
  renderSales();
}

const orderRefreshButton=document.getElementById('refresh-orders');
if(orderRefreshButton)orderRefreshButton.addEventListener('click',()=>{orderSearchQuery='';orderFilterStatus='all';document.getElementById('order-search').value='';document.getElementById('order-status-filter').value='all';renderOrders();});

const salesYearSelect=document.getElementById('sales-year');
if(salesYearSelect){salesYearSelect.addEventListener('change',renderSales);}
const salesMonthSelect=document.getElementById('sales-month');
if(salesMonthSelect){salesMonthSelect.addEventListener('change',renderSales);}

const newAccountBtn=document.getElementById('new-account');
if(newAccountBtn)newAccountBtn.addEventListener('click',()=>openAccountModal());

const refreshAccountsBtn=document.getElementById('refresh-accounts');
if(refreshAccountsBtn)refreshAccountsBtn.addEventListener('click',loadAccounts);

setupAccountFormHandlers();
