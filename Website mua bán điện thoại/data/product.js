const products = [
  {
    id: 1,
    name: "iPhone 15 128GB | Chính hãng",
    price: 18990000,
    oldPrice: 19990000,
    screen: "6.1 inches",
    storage: "128 GB",
    discount: 5,
    installment: true,
    image: "img/banner/products/iphone-15-xanh-thumb-600x600.jpg",
    brand: "apple",
    categories: ['5g', 'camera', 'ai'],
    detail: {
      videoUrl: "https://www.youtube.com/watch?v=Gg_ncsRWboo",
      thumbnails: [
        "img/banner/thumbnails/vn_iphone_15_pink_pdp_image_position-3_design_detail_2.webp",
        "img/banner/thumbnails/vn1b93_1_2 (1).webp",
        "img/banner/thumbnails/vn_iphone_15_pink_pdp_image_position-6_dynamic_island_2.webp",
        "img/banner/thumbnails/vn_iphone_15_pink_pdp_image_position-7_features_specs_2.webp"
      ],
      colorThumbnails: {
        "Xanh dương": [
          "img/banner/products/iphone-15-xanh-thumb-600x600.jpg",
          "img/banner/thumbnails/vn_iphone_15_pink_pdp_image_position-6_dynamic_island_2.webp",
          "img/banner/thumbnails/vn_iphone_15_pink_pdp_image_position-7_features_specs_2.webp"
        ],
        "Đen": [
          "img/banner/thumbnails/iphone-15-128-gbden (1).webp"
        ],
        "Hồng": [
          "img/banner/thumbnails/iphone-15-hong.webp",
          "img/banner/thumbnails/vn_iphone_15_pink_pdp_image_position-2_design_2.webp"
        ],
        "Vàng": [
          "img/banner/thumbnails/iphone-15-128gb-vang.webp"
        ]
      },
      colors: ["Xanh dương", "Đen", "Hồng", "Vàng"],
      description: "iPhone 15 mang đến thiết kế tuyệt vời với A17 Pro chip, camera 48MP, và pin siêu bền.",
      specs: "Chip: A17 Pro | RAM: 8GB | Camera: 48MP + 12MP | Pin: 3349mAh"
    }
  },
  {
    id: 2,
    name: "iPhone 15 Pro 256GB | Chính hãng",
    price: 27990000,
    oldPrice: 29990000,
    screen: "6.1 inches",
    storage: "256 GB",
    discount: 7,
    installment: true,
    image: "img/banner/products/iphone-15-pro-max_2__5_2_1_1_1_1.webp",
    brand: "apple",
    categories: ['5g', 'camera', 'ai', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/watch?v=keYat4iSYAQ",
      thumbnails: [
        "img/banner/products/iphone-15-pro-max_2__5_2_1_1_1_1.webp",
        "img/banner/products/iphone-15-pro-max_2__5_2_1_1_1_1.webp",
        "img/banner/products/iphone-15-pro-max_2__5_2_1_1_1_1.webp",
        "img/banner/products/iphone-15-pro-max_2__5_2_1_1_1_1.webp"
      ],
      colors: ["Bạc", "Đen", "Vàng", "Hồng"],
      description: "iPhone 15 Pro - Chiếc máy chuyên nghiệp với A17 Pro, camera Pro có zoom quang học 5x.",
      specs: "Chip: A17 Pro | RAM: 8GB | Camera: 48MP Pro | Pin: 3274mAh"
    }
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max 512GB | Chính hãng",
    price: 33990000,
    oldPrice: 35990000,
    screen: "6.7 inches",
    storage: "512 GB",
    discount: 6,
    installment: true,
    image: "img/banner/products/1672788603.jpeg",
    brand: "apple",
    categories: ['5g', 'camera', 'ai', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/EvkUJhhZ6nM",
      thumbnails: [
        "img/banner/products/1672788603.jpeg",
        "img/banner/products/1672788603.jpeg",
        "img/banner/products/1672788603.jpeg",
        "img/banner/products/1672788603.jpeg"
      ],
      colors: ["Bạc Tự Nhiên", "Đen Không Gian", "Vàng Titan", "Hồng Hạt Chanh"],
      description: "iPhone 15 Pro Max - Kích thước màn hình lớn nhất với công nghệ camera tiên tiến.",
      specs: "Chip: A17 Pro | RAM: 8GB | Camera: 48MP + 12MP Tele | Pin: 4441mAh"
    }
  },
  {
    id: 4,
    name: "iPhone 14 128GB | Chính hãng",
    price: 15990000,
    oldPrice: 17990000,
    screen: "6.1 inches",
    storage: "128 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/2022_10_28_638025679601008898_iPhone 14 (13).webp",
    brand: "apple",
    categories: ['5g', 'camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/kJQlGVHNyXY",
      thumbnails: [
        "img/banner/products/2022_10_28_638025679601008898_iPhone 14 (13).webp",
        "img/banner/products/2022_10_28_638025679601008898_iPhone 14 (13).webp",
        "img/banner/products/2022_10_28_638025679601008898_iPhone 14 (13).webp",
        "img/banner/products/2022_10_28_638025679601008898_iPhone 14 (13).webp"
      ],
      colors: ["Đỏ", "Xanh", "Đen", "Bạc", "Vàng"],
      description: "iPhone 14 với A15 Bionic, camera 12MP kép và tính năng Night Mode tuyệt vời.",
      specs: "Chip: A15 Bionic | RAM: 6GB | Camera: 12MP kép | Pin: 3279mAh"
    }
  },
  {
    id: 5,
    name: "iPhone 14 Pro 256GB | Chính hãng",
    price: 23990000,
    oldPrice: 26990000,
    screen: "6.1 inches",
    storage: "256 GB",
    discount: 11,
    installment: true,
    image: "img/banner/products/iphone-14-pro-256gb.webp",
    brand: "apple",
    categories: ['5g', 'camera', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/pAe8nKXNgkE",
      thumbnails: [
        "img/banner/products/iphone-14-pro-256gb.webp",
        "img/banner/products/iphone-14-pro-256gb.webp",
        "img/banner/products/iphone-14-pro-256gb.webp",
        "img/banner/products/iphone-14-pro-256gb.webp"
      ],
      colors: ["Bạn Không Gian", "Bạc", "Vàng", "Hồng"],
      description: "iPhone 14 Pro - Dòng Pro với A16 Bionic, camera Pro 48MP, và Always On display.",
      specs: "Chip: A16 Bionic | RAM: 6GB | Camera: 48MP Pro | Pin: 3200mAh"
    }
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 256GB",
    price: 20990000,
    oldPrice: 22990000,
    screen: "6.2 inches",
    storage: "256 GB",
    discount: 8,
    installment: true,
    image: "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
    brand: "samsung",
    categories: ['5g', 'ai', 'camera', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/u7QSnyM0EAo",
      thumbnails: [
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp"
      ],
      colors: ["Xám", "Đen", "Bạc", "Vàng"],
      description: "Samsung Galaxy S24 với Snapdragon 8 Gen 3, camera AI thông minh, và display AMOLED tuyệt vời.",
      specs: "Chip: Snapdragon 8 Gen 3 | RAM: 12GB | Camera: 50MP + 10MP | Pin: 4000mAh"
    }
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Plus 256GB",
    price: 23990000,
    oldPrice: 26990000,
    screen: "6.7 inches",
    storage: "256 GB",
    discount: 11,
    installment: true,
    image: "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
    brand: "samsung",
    categories: ['5g', 'ai', 'camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/u7QSnyM0EAo",
      thumbnails: [
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp"
      ],
      colors: ["Xám", "Đen", "Bạc"],
      description: "Galaxy S24+ với màn hình lớn 6.7 inch, pin khỏe và hiệu năng cao.",
      specs: "Chip: Snapdragon 8 Gen 3 | RAM: 12GB | Camera: 50MP | Pin: 4900mAh"
    }
  },
  {
    id: 8,
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 30990000,
    oldPrice: 33990000,
    screen: "6.8 inches",
    storage: "512 GB",
    discount: 9,
    installment: true,
    image: "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
    brand: "samsung",
    categories: ['5g', 'ai', 'camera', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/u7QSnyM0EAo",
      thumbnails: [
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp",
        "img/banner/products/samsung-galaxy-s26-ultra-1.webp"
      ],
      colors: ["Xám Phantom", "Đen Phantom", "Bạc Phantom"],
      description: "Galaxy S24 Ultra - Thiết bị flagship với zoom 10x, stylus tích hợp, và camera 200MP.",
      specs: "Chip: Snapdragon 8 Gen 3 | RAM: 12GB | Camera: 200MP | Pin: 5000mAh"
    }
  },
  {
    id: 9,
    name: "Samsung Galaxy S23 FE 128GB",
    price: 13990000,
    oldPrice: 15990000,
    screen: "6.4 inches",
    storage: "128 GB",
    discount: 12,
    installment: true,
    image: "img/banner/products/samsung-galaxy-s23-fe_6__1_2.webp",
    brand: "samsung",
    categories: ['5g'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/u7QSnyM0EAo",
      thumbnails: [
        "img/banner/products/samsung-galaxy-s23-fe_6__1_2.webp",
        "img/banner/products/samsung-galaxy-s23-fe_6__1_2.webp",
        "img/banner/products/samsung-galaxy-s23-fe_6__1_2.webp",
        "img/banner/products/samsung-galaxy-s23-fe_6__1_2.webp"
      ],
      colors: ["Xám", "Đen", "Trắng"],
      description: "Galaxy S23 FE - Phiên bản giá rẻ với hiệu năng tốt và camera chất lượng.",
      specs: "Chip: Snapdragon 8 Gen 1 | RAM: 8GB | Camera: 50MP | Pin: 4500mAh"
    }
  },
  {
    id: 10,
    name: "Samsung Galaxy A55 256GB",
    price: 10990000,
    oldPrice: 11990000,
    screen: "6.6 inches",
    storage: "256 GB",
    discount: 8,
    installment: true,
    image: "img/banner/products/samsung-galaxy-a55-5g-blue-thumb-600x600.jpg",
    brand: "samsung",
    categories: ['5g'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/u7QSnyM0EAo",
      thumbnails: [
        "img/banner/products/samsung-galaxy-a55-5g-blue-thumb-600x600.jpg",
        "img/banner/products/samsung-galaxy-a55-5g-blue-thumb-600x600.jpg",
        "img/banner/products/samsung-galaxy-a55-5g-blue-thumb-600x600.jpg",
        "img/banner/products/samsung-galaxy-a55-5g-blue-thumb-600x600.jpg"
      ],
      colors: ["Xanh Dương", "Đen", "Bạc", "Vàng"],
      description: "Galaxy A55 - Máy giá tốt với RAM 8GB, camera 50MP và pin 5000mAh.",
      specs: "Chip: Exynos 1480 | RAM: 8GB | Camera: 50MP | Pin: 5000mAh"
    }
  },
  {
    id: 11,
    name: "Xiaomi 14 256GB",
    price: 17990000,
    oldPrice: 19990000,
    screen: "6.36 inches",
    storage: "256 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/xiaomi-14-white-thumbnew-600x600.jpg",
    brand: "xiaomi",
    categories: ['5g', 'camera', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/xiaomi-14-white-thumbnew-600x600.jpg", "img/banner/products/xiaomi-14-white-thumbnew-600x600.jpg"],
      colors: ["Trắng", "Đen"],
      description: "Xiaomi 14 với Snapdragon 8 Gen 3, camera Leica 50MP và màn hình LTPO OLED.",
      specs: "Chip: Snapdragon 8 Gen 3 | RAM: 12GB | Camera: Leica 50MP | Pin: 4610mAh"
    }
  },
  {
    id: 12,
    name: "Xiaomi Redmi Note 13 256GB",
    price: 5990000,
    oldPrice: 6990000,
    screen: "6.67 inches",
    storage: "256 GB",
    discount: 14,
    installment: true,
    image: "img/banner/products/xiaomi-redmi-note-13-purple-thumb-600x600-1-600x600.jpg",
    brand: "xiaomi",
    categories: ['camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/xiaomi-redmi-note-13-purple-thumb-600x600-1-600x600.jpg"],
      colors: ["Tím", "Đen"],
      description: "Redmi Note 13 giá rẻ với camera 108MP và pin 5000mAh.",
      specs: "Chip: Dimensity 7200 Ultra | RAM: 8GB | Camera: 108MP | Pin: 5000mAh"
    }
  },
  {
    id: 13,
    name: "OPPO Find N3 Flip",
    price: 24990000,
    oldPrice: 27990000,
    screen: "6.8 inches",
    storage: "256 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/oppo-find-n3-flip_5__1_1.webp",
    brand: "oppo",
    categories: ['fold', 'camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/oppo-find-n3-flip_5__1_1.webp"],
      colors: ["Tím", "Xanh"],
      description: "OPPO Find N3 Flip - Điện thoại gập với camera 50MP và màn hình cover sáng.",
      specs: "Chip: Dimensity 9200 | RAM: 16GB | Camera: 50MP | Pin: 4300mAh"
    }
  },
  {
    id: 14,
    name: "OPPO Reno 11",
    price: 9990000,
    oldPrice: 11990000,
    screen: "6.7 inches",
    storage: "256 GB",
    discount: 17,
    installment: true,
    image: "img/banner/products/oppo-reno-11-xanh-thumb-600x600.jpg",
    brand: "oppo",
    categories: ['camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/oppo-reno-11-xanh-thumb-600x600.jpg"],
      colors: ["Xanh", "Đen"],
      description: "OPPO Reno 11 với camera selfie 50MP và thiết kế mỏng nhẹ.",
      specs: "Chip: Dimensity 8200 | RAM: 8GB | Camera: 50MP | Pin: 4800mAh"
    }
  },
  {
    id: 15,
    name: "Vivo V30 5G",
    price: 10990000,
    oldPrice: 12990000,
    screen: "6.78 inches",
    storage: "256 GB",
    discount: 15,
    installment: true,
    image: "img/banner/products/dien-thoai-vivo-v30-5g_2_.webp",
    brand: "vivo",
    categories: ['5g', 'camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/dien-thoai-vivo-v30-5g_2_.webp"],
      colors: ["Xanh", "Vàng"],
      description: "Vivo V30 với camera Aura Light độc quyền và chip Dimensity 8200.",
      specs: "Chip: Dimensity 8200 | RAM: 12GB | Camera: 50MP Aura | Pin: 5000mAh"
    }
  },
  {
    id: 16,
    name: "Vivo X100 Pro",
    price: 24990000,
    oldPrice: 27990000,
    screen: "6.78 inches",
    storage: "256 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/dien-thoai-vivo-x100-pro_1__2.webp",
    brand: "vivo",
    categories: ['5g', 'camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/dien-thoai-vivo-x100-pro_1__2.webp"],
      colors: ["Đen", "Vàng"],
      description: "Vivo X100 Pro - Camera Zeiss 50MP 1 inch sensor, Dimensity 9300.",
      specs: "Chip: Dimensity 9300 | RAM: 16GB | Camera: Zeiss 50MP 1\" | Pin: 5400mAh"
    }
  },
  {
    id: 17,
    name: "OnePlus 12",
    price: 18990000,
    oldPrice: 20990000,
    screen: "6.82 inches",
    storage: "256 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/oneplus-12.webp",
    brand: "oneplus",
    categories: ['5g', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/oneplus-12.webp"],
      colors: ["Xanh", "Đen"],
      description: "OnePlus 12 với Snapdragon 8 Gen 3, sạc 100W siêu nhanh.",
      specs: "Chip: Snapdragon 8 Gen 3 | RAM: 16GB | Camera: Hasselblad | Pin: 5400mAh"
    }
  },
  {
    id: 18,
    name: "Nothing Phone (2a)+",
    price: 8990000,
    oldPrice: 9990000,
    screen: "6.7 inches",
    storage: "256 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/dien-thoai-nothing-phone-2a-plus_1_.webp",
    brand: "nothing",
    categories: ['design'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/dien-thoai-nothing-phone-2a-plus_1_.webp"],
      colors: ["Trắng", "Đen"],
      description: "Nothing Phone 2a+ với thiết kế Glyph độc đáo và Dimensity 7350 Pro.",
      specs: "Chip: Dimensity 7350 Pro | RAM: 12GB | Camera: 50MP | Pin: 5000mAh"
    }
  },
  {
    id: 19,
    name: "Honor Magic 6 Pro",
    price: 22990000,
    oldPrice: 25990000,
    screen: "6.8 inches",
    storage: "512 GB",
    discount: 11,
    installment: true,
    image: "img/banner/products/honor-magic-6-pro-17.webp",
    brand: "honor",
    categories: ['5g', 'camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/honor-magic-6-pro-17.webp"],
      colors: ["Xanh", "Trắng"],
      description: "Honor Magic 6 Pro với camera 180MP và pin silicon-carbon siêu bền.",
      specs: "Chip: Snapdragon 8 Gen 3 | RAM: 16GB | Camera: 180MP | Pin: 5600mAh"
    }
  },
  {
    id: 20,
    name: "ZTE Nubia Z60 Ultra",
    price: 18990000,
    oldPrice: 20990000,
    screen: "6.8 inches",
    storage: "256 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/zte-nubia-z60-ultra_1_.webp",
    brand: "zte",
    categories: ['game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/zte-nubia-z60-ultra_1_.webp"],
      colors: ["Đen", "Trắng"],
      description: "Nubia Z60 Ultra - Gaming phone với Snapdragon 8 Gen 3 và tản nhiệt mạnh.",
      specs: "Chip: Snapdragon 8 Gen 3 | RAM: 16GB | Camera: 50MP | Pin: 6000mAh"
    }
  },
  {
    id: 21,
    name: "Sony Xperia 1 V",
    price: 29990000,
    oldPrice: 32990000,
    screen: "6.5 inches 4K",
    storage: "512 GB",
    discount: 9,
    installment: true,
    image: "img/banner/products/sony-xperia-1-v-chinh-hang-viettablet.webp",
    brand: "sony",
    categories: ['camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/sony-xperia-1-v-chinh-hang-viettablet.webp"],
      colors: ["Đen"],
      description: "Sony Xperia 1 V - Chuyên gia nhiếp ảnh với ống kính Zeiss và màn 4K 120Hz.",
      specs: "Chip: Snapdragon 8 Gen 2 | RAM: 12GB | Camera: Zeiss 48MP | Pin: 5000mAh"
    }
  },
  {
    id: 22,
    name: "Xiaomi Mix Fold 3",
    price: 31990000,
    oldPrice: 34990000,
    screen: "8.03 inches gập",
    storage: "512 GB",
    discount: 8,
    installment: true,
    image: "img/banner/products/xiaomi-mix-fold-3-den-van-carbon.jpg.webp",
    brand: "xiaomi",
    categories: ['fold'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/xiaomi-mix-fold-3-den-van-carbon.jpg.webp"],
      colors: ["Carbon"],
      description: "Xiaomi Mix Fold 3 - Gập mỏng 5.2mm, Leica camera và Snapdragon 8 Gen 2.",
      specs: "Chip: Snapdragon 8 Gen 2 | RAM: 16GB | Camera: Leica | Pin: 4800mAh"
    }
  },
  {
    id: 23,
    name: "Samsung Galaxy Z Fold 5",
    price: 38990000,
    oldPrice: 42990000,
    screen: "7.6 inches gập",
    storage: "1TB",
    discount: 9,
    installment: true,
    image: "img/banner/products/galaxy-z-fold-5-xam-1_1__2_3_2.webp",
    brand: "samsung",
    categories: ['fold', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/galaxy-z-fold-5-xam-1_1__2_3_2.webp"],
      colors: ["Xám"],
      description: "Galaxy Z Fold 5 - Đa nhiệm với màn hình gập lớn và S Pen hỗ trợ.",
      specs: "Chip: Snapdragon 8 Gen 2 | RAM: 12GB | Camera: 50MP | Pin: 4400mAh"
    }
  },
  {
    id: 24,
    name: "Samsung Galaxy Z Flip 5",
    price: 22990000,
    oldPrice: 25990000,
    screen: "6.7 inches gập",
    storage: "256 GB",
    discount: 11,
    installment: true,
    image: "img/banner/products/galaxy-z-flip-xanh-2_1_1_1_1_1.webp",
    brand: "samsung",
    categories: ['fold'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/galaxy-z-flip-xanh-2_1_1_1_1_1.webp"],
      colors: ["Xanh", "Tím", "Vàng"],
      description: "Galaxy Z Flip 5 - Gập nhỏ gọn với màn hình cover 3.4 inch lớn hơn.",
      specs: "Chip: Snapdragon 8 Gen 2 | RAM: 8GB | Camera: 12MP | Pin: 3700mAh"
    }
  },
  {
    id: 25,
    name: "Samsung Galaxy A35",
    price: 7990000,
    oldPrice: 8990000,
    screen: "6.6 inches",
    storage: "128 GB",
    discount: 11,
    installment: true,
    image: "img/banner/products/samsung-galaxy-a35_8__2.webp",
    brand: "samsung",
    categories: ['basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/samsung-galaxy-a35_8__2.webp"],
      colors: ["Xanh", "Đen", "Vàng"],
      description: "Galaxy A35 giá rẻ với camera 50MP và IP67 chống nước.",
      specs: "Chip: Exynos 1380 | RAM: 8GB | Camera: 50MP | Pin: 5000mAh"
    }
  },
  {
    id: 26,
    name: "iPhone 13 128GB",
    price: 12990000,
    oldPrice: 14990000,
    screen: "6.1 inches",
    storage: "128 GB",
    discount: 13,
    installment: true,
    image: "img/banner/products/iphone-13_2_2.webp",
    brand: "apple",
    categories: ['camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/iphone-13_2_2.webp"],
      colors: ["Xanh", "Đỏ", "Trắng"],
      description: "iPhone 13 với A15 Bionic và camera Cinematic mode.",
      specs: "Chip: A15 Bionic | RAM: 4GB | Camera: 12MP kép | Pin: 3240mAh"
    }
  },
  {
    id: 27,
    name: "iPhone 13 Pro 256GB",
    price: 20990000,
    oldPrice: 23990000,
    screen: "6.1 inches",
    storage: "256 GB",
    discount: 12,
    installment: true,
    image: "img/banner/products/iphone-13-pro-256gb-cu-dep_2_.png",
    brand: "apple",
    categories: ['camera', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/iphone-13-pro-256gb-cu-dep_2_.png"],
      colors: ["Xanh lá", "Vàng", "Bạc"],
      description: "iPhone 13 Pro với ProMotion 120Hz và camera ProRes video.",
      specs: "Chip: A15 Bionic | RAM: 6GB | Camera: 12MP Pro | Pin: 3095mAh"
    }
  },
  {
    id: 28,
    name: "iPhone 12 128GB",
    price: 10990000,
    oldPrice: 12990000,
    screen: "6.1 inches",
    storage: "128 GB",
    discount: 15,
    installment: true,
    image: "img/banner/products/iphone-12-xanh-duong-new-600x600-200x200-1_7_1.jpg",
    brand: "apple",
    categories: ['basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/iphone-12-xanh-duong-new-600x600-200x200-1_7_1.jpg"],
      colors: ["Xanh dương", "Trắng", "Đen", "Xanh lá", "Đỏ"],
      description: "iPhone 12 - Thiết kế vuông vức với MagSafe và 5G.",
      specs: "Chip: A14 Bionic | RAM: 4GB | Camera: 12MP kép | Pin: 2815mAh"
    }
  },
  {
    id: 29,
    name: "iPhone 12 Pro 256GB",
    price: 17990000,
    oldPrice: 19990000,
    screen: "6.1 inches",
    storage: "256 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/iphone-12-pro-xam-new-600x600-600x600.jpg",
    brand: "apple",
    categories: ['camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/iphone-12-pro-xam-new-600x600-600x600.jpg"],
      colors: ["Xám", "Vàng", "Bạc"],
      description: "iPhone 12 Pro với LiDAR scanner và thép không gỉ.",
      specs: "Chip: A14 Bionic | RAM: 6GB | Camera: LiDAR Pro | Pin: 2815mAh"
    }
  },
  {
    id: 30,
    name: "Samsung Galaxy S23 Ultra",
    price: 25990000,
    oldPrice: 28990000,
    screen: "6.8 inches",
    storage: "256 GB",
    discount: 10,
    installment: true,
    image: "img/banner/products/s23-ultra-tim_6_2_1_2.webp",
    brand: "samsung",
    categories: ['5g', 'camera', 'game'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/s23-ultra-tim_6_2_1_2.webp"],
      colors: ["Tím", "Xanh", "Đen"],
      description: "Galaxy S23 Ultra với S Pen và camera 200MP zoom 100x.",
      specs: "Chip: Snapdragon 8 Gen 2 | RAM: 12GB | Camera: 200MP | Pin: 5000mAh"
    }
  },
  {
    id: 31,
    name: "Samsung Galaxy S23+",
    price: 18990000,
    oldPrice: 21990000,
    screen: "6.6 inches",
    storage: "256 GB",
    discount: 14,
    installment: true,
    image: "img/banner/products/samsung-galaxy-s23-plus-600x600.jpg",
    brand: "samsung",
    categories: ['5g'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/samsung-galaxy-s23-plus-600x600.jpg"],
      colors: ["Trắng", "Đen", "Xanh"],
      description: "Galaxy S23+ với màn hình lớn và pin khủng 4700mAh.",
      specs: "Chip: Snapdragon 8 Gen 2 | RAM: 8GB | Camera: 50MP | Pin: 4700mAh"
    }
  },
  {
    id: 32,
    name: "Samsung Galaxy S23",
    price: 15990000,
    oldPrice: 18990000,
    screen: "6.1 inches",
    storage: "256 GB",
    discount: 16,
    installment: true,
    image: "img/banner/products/s23-ultra-xanh_2_1_2_2.png",
    brand: "samsung",
    categories: ['5g'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/s23-ultra-xanh_2_1_2_2.png"],
      colors: ["Xanh", "Trắng", "Tím"],
      description: "Galaxy S23 nhỏ gọn với hiệu năng flagship.",
      specs: "Chip: Snapdragon 8 Gen 2 | RAM: 8GB | Camera: 50MP | Pin: 3900mAh"
    }
  },
  {
    id: 33,
    name: "Nokia G42 5G",
    price: 4990000,
    oldPrice: 5990000,
    screen: "6.56 inches",
    storage: "128 GB",
    discount: 17,
    installment: true,
    image: "img/banner/products/nokia-g42-5g-duchuymobile.jpg",
    brand: "nokia",
    categories: ['basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/nokia-g42-5g-duchuymobile.jpg"],
      colors: ["Xanh", "Đen"],
      description: "Nokia G42 giá rẻ bền bỉ với 3 camera 50MP.",
      specs: "Chip: Snapdragon 480+ | RAM: 4GB | Camera: 50MP triple | Pin: 5000mAh"
    }
  },
  {
    id: 34,
    name: "Realme Narzo 60 5G",
    price: 6990000,
    oldPrice: 7990000,
    screen: "6.6 inches",
    storage: "128 GB",
    discount: 13,
    installment: true,
    image: "img/banner/products/realme-narzo-60-5g-1-400x400.jpg",
    brand: "realme",
    categories: ['5g', 'pin'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/realme-narzo-60-5g-1-400x400.jpg"],
      colors: ["Xám"],
      description: "Realme Narzo 60 với Dimensity 7050 và pin 5000mAh.",
      specs: "Chip: Dimensity 7050 | RAM: 8GB | Camera: 64MP | Pin: 5000mAh"
    }
  },
  {
    id: 35,
    name: "Infinix Zero 30",
    price: 7490000,
    oldPrice: 8490000,
    screen: "6.78 inches",
    storage: "256 GB",
    discount: 12,
    installment: true,
    image: "img/banner/products/infinix-zero-30_3_.png",
    brand: "infinix",
    categories: ['camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/infinix-zero-30_3_.png"],
      colors: ["Xanh"],
      description: "Infinix Zero 30 với camera selfie 50MP 4K.",
      specs: "Chip: Dimensity 8020 | RAM: 8GB | Camera: 108MP | Pin: 5000mAh"
    }
  },
  {
    id: 36,
    name: "Tecno Camon 20",
    price: 5990000,
    oldPrice: 6990000,
    screen: "6.67 inches",
    storage: "256 GB",
    discount: 14,
    installment: true,
    image: "img/banner/products/tecno-camon-20-2.webp",
    brand: "tecno",
    categories: ['camera'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/tecno-camon-20-2.webp"],
      colors: ["Xanh"],
      description: "Tecno Camon 20 chuyên camera với 64MP.",
      specs: "Chip: Helio G85 | RAM: 8GB | Camera: 64MP | Pin: 5000mAh"
    }
  },
  {
    id: 37,
    name: "Itel S23",
    price: 2990000,
    oldPrice: 3990000,
    screen: "6.6 inches",
    storage: "128 GB",
    discount: 25,
    installment: true,
    image: "img/banner/products/itel-s23-2.webp",
    brand: "itel",
    categories: ['basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/itel-s23-2.webp"],
      colors: ["Xanh", "Đen"],
      description: "Itel S23 giá siêu rẻ pin 5000mAh.",
      specs: "Chip: Unisoc T606 | RAM: 4GB | Camera: 50MP | Pin: 5000mAh"
    }
  },
  {
    id: 38,
    name: "Nokia C32",
    price: 2490000,
    oldPrice: 2990000,
    screen: "6.5 inches",
    storage: "64 GB",
    discount: 17,
    installment: true,
    image: "img/banner/products/nokia-c32_1_2.webp",
    brand: "nokia",
    categories: ['pin', 'basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/nokia-c32_1_2.webp"],
      colors: ["Xanh"],
      description: "Nokia C32 bền bỉ giá rẻ.",
      specs: "Chip: Unisoc SC9863A | RAM: 4GB | Camera: 50MP | Pin: 5000mAh"
    }
  },
  {
    id: 39,
    name: "Infinix Smart 8 HD",
    price: 2290000,
    oldPrice: 2790000,
    screen: "6.6 inches",
    storage: "64 GB",
    discount: 18,
    installment: true,
    image: "img/banner/products/57511-infinix-smart-8-hd-1.jpg",
    brand: "infinix",
    categories: ['pin', 'basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/57511-infinix-smart-8-hd-1.jpg"],
      colors: ["Đen"],
      description: "Infinix Smart 8 HD siêu tiết kiệm.",
      specs: "Chip: Unisoc T606 | RAM: 3GB | Camera: 13MP | Pin: 5000mAh"
    }
  },
  {
    id: 40,
    name: "iPhone SE (2022)",
    price: 9990000,
    oldPrice: 11990000,
    screen: "4.7 inches",
    storage: "128 GB",
    discount: 17,
    installment: true,
    image: "img/banner/products/iphone-se-black-600x600.jpeg",
    brand: "apple",
    categories: ['basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/iphone-se-black-600x600.jpeg"],
      colors: ["Đen", "Trắng"],
      description: "iPhone SE nhỏ gọn với A15 Bionic mạnh mẽ.",
      specs: "Chip: A15 Bionic | RAM: 4GB | Camera: 12MP | Pin: 2018mAh"
    }
  },
  {
    id: 41,
    name: "Samsung Galaxy A15",
    price: 3990000,
    oldPrice: 4490000,
    screen: "6.5 inches",
    storage: "128 GB",
    discount: 11,
    installment: true,
    image: "img/banner/products/samsung-galaxy-a35_8__2.webp",
    brand: "samsung",
    categories: ['pin', 'basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/samsung-galaxy-a35_8__2.webp"],
      colors: ["Xanh", "Đen", "Vàng"],
      description: "Galaxy A15 giá rẻ pin khủng.",
      specs: "Chip: Helio G99 | RAM: 6GB | Camera: 50MP | Pin: 5000mAh"
    }
  },
  {
    id: 42,
    name: "Xiaomi Redmi Note 12",
    price: 4490000,
    oldPrice: 5490000,
    screen: "6.67 inches",
    storage: "128 GB",
    discount: 18,
    installment: true,
    image: "img/banner/products/xiaomi-redmi-note-13-purple-thumb-600x600-1-600x600.jpg",
    brand: "xiaomi",
    categories: ['pin', 'basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/xiaomi-redmi-note-13-purple-thumb-600x600-1-600x600.jpg"],
      colors: ["Xanh"],
      description: "Redmi Note 12 camera 200MP giá tốt.",
      specs: "Chip: Snapdragon 685 | RAM: 8GB | Camera: 200MP | Pin: 5000mAh"
    }
  },
  {
    id: 43,
    name: "OPPO A98 5G",
    price: 6990000,
    oldPrice: 7990000,
    screen: "6.72 inches",
    storage: "256 GB",
    discount: 13,
    installment: true,
    image: "img/banner/products/oppo-reno-11-xanh-thumb-600x600.jpg",
    brand: "oppo",
    categories: ['5g'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/oppo-reno-11-xanh-thumb-600x600.jpg"],
      colors: ["Xanh"],
      description: "OPPO A98 với sạc nhanh 67W.",
      specs: "Chip: Snapdragon 695 | RAM: 8GB | Camera: 64MP | Pin: 5000mAh"
    }
  },
  {
    id: 44,
    name: "Realme C67",
    price: 3990000,
    oldPrice: 4990000,
    screen: "6.72 inches",
    storage: "128 GB",
    discount: 20,
    installment: true,
    image: "img/banner/products/realme-narzo-60-5g-1-400x400.jpg",
    brand: "realme",
    categories: ['pin', 'basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/realme-narzo-60-5g-1-400x400.jpg"],
      colors: ["Đen"],
      description: "Realme C67 camera 108MP giá rẻ.",
      specs: "Chip: Snapdragon 685 | RAM: 8GB | Camera: 108MP | Pin: 5000mAh"
    }
  },
  {
    id: 45,
    name: "Infinix Hot 40",
    price: 3490000,
    oldPrice: 3990000,
    screen: "6.78 inches",
    storage: "128 GB",
    discount: 13,
    installment: true,
    image: "img/banner/products/infinix-zero-30_3_.png",
    brand: "infinix",
    categories: ['basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/infinix-zero-30_3_.png"],
      colors: ["Xanh"],
      description: "Infinix Hot 40 pin 5000mAh 33W.",
      specs: "Chip: Helio G88 | RAM: 8GB | Camera: 50MP | Pin: 5000mAh"
    }
  },
  {
    id: 46,
    name: "Nokia G22",
    price: 3490000,
    oldPrice: 3990000,
    screen: "6.5 inches",
    storage: "64 GB",
    discount: 13,
    installment: true,
    image: "img/banner/products/nokia-g42-5g-duchuymobile.jpg",
    brand: "nokia",
    categories: ['pin', 'basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/nokia-g42-5g-duchuymobile.jpg"],
      colors: ["Xanh"],
      description: "Nokia G22 bền bỉ thay pin dễ dàng.",
      specs: "Chip: Helio G85 | RAM: 4GB | Camera: 50MP | Pin: 5050mAh"
    }
  },
  {
    id: 47,
    name: "Tecno Spark 20",
    
    "price": 2990000,
    oldPrice: 3490000,
    screen: "6.6 inches",
    storage: "64 GB",
    discount: 14,
    installment: true,
    image: "img/banner/products/tecno-camon-20-2.webp",
    brand: "tecno",
    categories: ['basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/tecno-camon-20-2.webp"],
      colors: ["Xanh"],
      description: "Tecno Spark 20 siêu rẻ pin lớn.",
      specs: "Chip: Unisoc T606 | RAM: 4GB | Camera: 50MP | Pin: 5000mAh"
    }
  },
  {
    id: 48,
    name: "Itel A70",
    price: 1990000,
    oldPrice: 2490000,
    screen: "6.6 inches",
    storage: "64 GB",
    discount: 20,
    installment: true,
    image: "img/banner/products/itel-s23-2.webp",
    brand: "itel",
    categories: ['basic'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/itel-s23-2.webp"],
      colors: ["Xanh"],
      description: "Itel A70 giá cực rẻ.",
      specs: "Chip: Unisoc SC9862A | RAM: 2GB | Camera: 8MP | Pin: 4000mAh"
    }
  },
  {
    id: 49,
    name: "Nokia 105 (2023)",
    price: 599000,
    oldPrice: 699000,
    screen: "1.8 inches",
    storage: "4 MB",
    discount: 14,
    installment: false,
    image: "img/banner/products/nokia-c32_1_2.webp",
    brand: "nokia",
    categories: ['featurephone'],
    detail: {
      videoUrl: "",
      thumbnails: ["img/banner/products/nokia-c32_1_2.webp"],
      colors: ["Xanh"],
      description: "Nokia 105 cơ bản bền bỉ pin 1 tháng.",
      specs: "Pin: 1 tháng | FM Radio | Đèn pin"
    }
  },
  {
    id: 50,
    name: "iPhone 17 Pro Max (Coming soon)",
    price: 39990000,
    oldPrice: 0,
    screen: "6.9 inches",
    storage: "1TB",
    discount: 0,
    installment: true,
    image: "img/banner/products/iphone-17-pro-max-10.png",
    brand: "apple",
    categories: ['comingsoon'],
    detail: {
      videoUrl: "https://www.youtube.com/embed/abc123",
      thumbnails: ["img/banner/products/iphone-17-pro-max-10.png"],
      colors: ["Titan mới"],
      description: "iPhone 17 Pro Max - Flagship 2025 với A19 và camera under-display.",
      specs: "Chip: A19 | RAM: 16GB | Camera: 48MP periscope | Pin: 4800mAh"
    }
  }
];

window.products = products;

