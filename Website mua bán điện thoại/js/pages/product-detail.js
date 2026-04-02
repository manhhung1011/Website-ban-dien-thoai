// product-detail.js - Logic xử lý trang chi tiết sản phẩm

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'), 10);
  const product = window.products?.find(p => p.id === id);

  const detailContainer = document.getElementById('detail-content');

  if (!product) {
    detailContainer.innerHTML =
      '<h1 style="color:red;">Sản phẩm không tồn tại!</h1><a href="index.html">Quay về trang chủ</a>';
    return;
  }

  const nf = new Intl.NumberFormat('vi-VN');
  const formatCurrency = (num) => `${nf.format(num)}đ`;

  // Breadcrumb
  const bc = document.createElement('nav');
  bc.id = 'breadcrumb';
  bc.className = 'breadcrumb';
  bc.innerHTML = `
    <a href="index.html">Trang chủ</a> <span>/</span>
    <span>${String(product.brand || '').toUpperCase()}</span> <span>/</span>
    <span>${product.name}</span>
  `;
  detailContainer.appendChild(bc);

  // pd-header
  const pdHeader = document.createElement('div');
  pdHeader.className = 'pd-header';
  pdHeader.innerHTML = `<h1 class="pd-title">${product.name} | Chính hãng VNA</h1><div class="pd-rating">★★★★☆ (128)</div>`;
  detailContainer.appendChild(pdHeader);

  // Actions
  const pdActions = document.createElement('nav');
  pdActions.className = 'pd-actions-links';
  pdActions.innerHTML = `
    <button type="button" onclick="UIService.showToast('Yêu thích')">❤️ Yêu thích</button>
    <button type="button" onclick="UIService.showToast('Hỏi đáp')">💬 Hỏi đáp</button>
    <button type="button" onclick="document.getElementById('pd-specs')?.scrollIntoView({behavior:'smooth'})">📋 Thông số</button>
    <button type="button" onclick="UIService.showToast('So sánh')">⚖️ So sánh</button>
  `;
  detailContainer.appendChild(pdActions);

  // pd-main
  const pdMain = document.createElement('div');
  pdMain.className = 'pd-main';

  let thumbImages = product.detail?.thumbnails || [product.image, product.image, product.image, product.image];

  pdMain.innerHTML = `
    <div class="pd-left">
      <div class="pd-media" id="media-container">
        <div class="pd-video" id="video-container">
          <iframe
            src="${(() => {
              const raw = product.detail?.videoUrl || 'https://www.youtube.com/embed/keYat4iSYAQ';
              let embedUrl;
              if (/youtube\.com\/watch\?v=/.test(raw)) {
                embedUrl = raw.replace('watch?v=', 'embed/').split('&')[0];
              } else if (/youtu\.be\//.test(raw)) {
                const id = raw.split('/').pop().split('?')[0];
                embedUrl = `https://www.youtube.com/embed/${id}`;
              } else {
                embedUrl = raw;
              }
              return embedUrl;
            })()}"
            allowfullscreen
            title="Video ${product.name}"
          ></iframe>
        </div>

        <div class="pd-image" id="image-container">
          <img id="main-image" src="${thumbImages[0]}" alt="${product.name}" />
        </div>
      </div>

      <div class="pd-thumbs" id="thumbs-container">
        <button class="pd-thumb is-active" type="button" data-index="0" data-type="video" aria-label="Video">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f5f5, #e8e8e8); border-radius: 6px;">
            <span style="font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">▶️</span>
          </div>
        </button>
        ${thumbImages
          .map((img, index) =>
            `<button class="pd-thumb" type="button" data-index="${index + 1}" data-type="image" aria-label="Ảnh ${index + 1}">
              <img src="${img}" alt="${product.name} - ${index + 1}" />
            </button>`
          )
          .join('')}
      </div>
    </div>

    <div class="pd-right">
      <div class="pd-price-box">
        <div>
          <div>Giá bán</div>
          <div class="pd-price">${formatCurrency(product.price)}</div>
          ${product.oldPrice ? `<del>${formatCurrency(product.oldPrice)}</del>` : ''}
        </div>

        <div>
          <div>Trả góp 0%</div>
          <div class="pd-price pd-price-installment">${formatCurrency(product.price / 12)}<small>/tháng</small></div>
        </div>
      </div>

      <div class="pd-add-cart-box">
        <button type="button" class="pd-add-cart-btn" onclick="window.addToCart(${product.id})" aria-label="Thêm vào giỏ hàng">🛒 Thêm vào giỏ hàng</button>
        <button type="button" class="pd-buy-btn" onclick="window.buyNow(${product.id})">Mua ngay</button>
      </div>

      <div class="pd-options">
        <div class="pd-option-group">
          <label>Màu sắc</label>
          ${(product.detail?.colors || ['Trắng', 'Đen', 'Xanh'])
            .map((color, index) =>
              `<button type="button" class="${index === 0 ? 'selected' : ''}" data-color="${color}">${color}</button>`
            )
            .join('')}
        </div>
      </div>

      <div class="pd-credit"><strong>TRẢ GÓP 0%</strong> - Trả trước 0đ - Lãi suất 0% trong 12 tháng. Áp dụng theo chương trình, hỗ trợ ngân hàng.</div>
    </div>
  `;
  detailContainer.appendChild(pdMain);

  // Description
  const pdDesc = document.createElement('section');
  pdDesc.id = 'pd-description';
  pdDesc.className = 'pd-description';
  pdDesc.innerHTML = `
    <h2>Mô tả ${product.name}</h2>
    <p>${
      product.detail?.description ||
      `${product.name} là smartphone chính hãng từ ${String(product.brand || '').toUpperCase()}, thiết kế đẹp, hiệu năng ổn định, phù hợp nhiều nhu cầu.`
    }</p>
  `;
  detailContainer.appendChild(pdDesc);

  // Specs
  const pdSpecs = document.createElement('section');
  pdSpecs.id = 'pd-specs';
  pdSpecs.className = 'pd-specs';

  const specsLines = (product.detail?.specs || `${product.screen || ''}\n${product.storage || ''}`)
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  let specsHTML = '<dl>';
  for (let i = 0; i < specsLines.length; i += 2) {
    specsHTML += `<dt>${specsLines[i] || ''}</dt><dd>${specsLines[i + 1] || ''}</dd>`;
  }
  specsHTML += '</dl>';

  pdSpecs.innerHTML = `<h2>Thông số kỹ thuật</h2>${specsHTML}`;
  detailContainer.appendChild(pdSpecs);

  // Bottom bar
  const pdBottom = document.createElement('div');
  pdBottom.className = 'pd-bottom-bar';
  pdBottom.innerHTML = `
    <img id="pd-bottom-img" src="${product.image}" alt="${product.name}" />
    <div class="pd-bottom-info">
      <div id="pd-bottom-name" class="pd-bottom-name">${product.name}</div>
      <div class="pd-bottom-price">${formatCurrency(product.price)}</div>
    </div>
    <button type="button" class="pd-cart-btn" onclick="window.addToCart(${product.id})">🛒</button>
    <button type="button" class="pd-buy-btn" onclick="window.buyNow(${product.id})">Mua ngay</button>
  `;
  document.body.appendChild(pdBottom);

  // Remove loading
  document.getElementById('loading')?.remove();

  const mainImage = document.getElementById('main-image');
  const videoContainer = document.getElementById('video-container');
  const imageContainer = document.getElementById('image-container');
  const pdTitleEl = document.querySelector('.pd-title');

  if (mainImage) {
    mainImage.style.cursor = 'zoom-in';
    mainImage.addEventListener('click', () => {
      window.open(mainImage.src, '_blank');
    });
  }

  const normalizeColorName = (str) =>
    String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[-]/g, '')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');

  const colorThumbnailsSrc = product.detail?.colorThumbnails || {};
  const colorThumbnailsMap = Object.fromEntries(
    Object.entries(colorThumbnailsSrc).map(([color, list]) => [normalizeColorName(color), list])
  );

  const defaultThumbnails = Array.isArray(product.detail?.thumbnails) && product.detail.thumbnails.length > 0
    ? [...product.detail.thumbnails]
    : [product.image, product.image, product.image, product.image];

  let currentColor = product.detail?.colors?.[0] || '';
  thumbImages = colorThumbnailsMap[normalizeColorName(currentColor)] || defaultThumbnails;
  let thumbElements = [];
  let currentIndex = 0; // 0=video, 1..n=image

  const renderThumbnails = () => {
    const thumbsContainer = document.getElementById('thumbs-container');
    if (!thumbsContainer) return;

    thumbsContainer.innerHTML = `
      <button class="pd-thumb is-active" type="button" data-index="0" data-type="video" aria-label="Video">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f5f5, #e8e8e8); border-radius: 6px;">
          <span style="font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">▶️</span>
        </div>
      </button>
      ${thumbImages
        .map((img, index) =>
          `<button class="pd-thumb" type="button" data-index="${index + 1}" data-type="image" aria-label="Ảnh ${index + 1}">
            <img src="${img}" alt="${product.name} - ${currentColor} ${index + 1}" />
          </button>`
        )
        .join('')}
    `;

    thumbElements = Array.from(thumbsContainer.querySelectorAll('.pd-thumb'));

    thumbElements.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        updateMedia(index);
      });
    });

    updateMedia(0);
  };

  const updateMedia = (index) => {
    const totalItems = thumbElements.length || 1;

    if (index < 0) index = totalItems - 1;
    if (index >= totalItems) index = 0;
    currentIndex = index;

    thumbElements.forEach((thumb, i) => {
      thumb.classList.toggle('is-active', i === index);
    });

    if (index === 0) {
      videoContainer.classList.remove('hidden');
      imageContainer.classList.remove('shown');
    } else {
      const imageIndex = index - 1;
      mainImage.src = thumbImages[imageIndex] || defaultThumbnails[0];
      videoContainer.classList.add('hidden');
      imageContainer.classList.add('shown');
    }
  };

  const setColorThumbnails = (color) => {
    const key = normalizeColorName(color);
    thumbImages = colorThumbnailsMap[key] || defaultThumbnails;
    currentColor = color;

    // Lưu màu sắc được chọn vào global window object để addToCart có thể sử dụng
    window.selectedProductColor = color;

    if (pdTitleEl) {
      pdTitleEl.textContent = `${product.name} | Chính hãng VNA - ${color}`;
    }

    renderThumbnails();
  };

  // Color selection
  const colorButtons = document.querySelectorAll('.pd-option-group button[data-color]');
  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      colorButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      setColorThumbnails(btn.dataset.color);
    });
  });

  // Initial render
  renderThumbnails();
});
