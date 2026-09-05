/**
 * AgriConnect - Core Marketplace Platform Engine
 * Professional, clean farm-to-table platform
 */

// Configuration
const SUPABASE_URL = "https://ogkorvydmlgwifhnnmjz.supabase.co/rest/v1";
const SUPABASE_KEY = "sb_publishable_c8UFr2fVf7J-s0TsD0IYwQ_XIlg2-KY";

// Embedded fallback seed data so the system works immediately & offline
const SEED_DATA = {
  categories: [
    { id: "cat-veg", name: "Vegetables", slug: "vegetables" },
    { id: "cat-fruit", name: "Fruits", slug: "fruits" },
    { id: "cat-rice", name: "Rice & Grains", slug: "rice-grains" },
    { id: "cat-fish", name: "Fish & Seafood", slug: "fish-seafood" },
    { id: "cat-root", name: "Root Crops", slug: "root-crops" },
    { id: "cat-poultry", name: "Poultry & Eggs", slug: "poultry-eggs" },
    { id: "cat-coco", name: "Coconut Products", slug: "coconut-products" },
    { id: "cat-herb", name: "Herbs & Spices", slug: "herbs-spices" }
  ],
  farmers: [
    {
      id: "farmer-ramon",
      full_name: "Mang Ramon Dela Cruz",
      farm_name: "Dela Cruz Family Farm",
      city: "La Trinidad",
      province: "Benguet",
      bio: "Third-generation highland vegetable farmer cultivating crisp greens without harmful synthetic chemicals.",
      rating: 4.9,
      reviewsCount: 38,
      verified: true,
      specialty: "Highland Greens & Root Crops",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200"
    },
    {
      id: "farmer-nena",
      full_name: "Aling Nena Bautista",
      farm_name: "Bautista Rice Fields",
      city: "Cabanatuan",
      province: "Nueva Ecija",
      bio: "Harvesting, drying, and milling premium Sinandomeng and Dinorado rice from our family farm every season.",
      rating: 5.0,
      reviewsCount: 42,
      verified: true,
      specialty: "Aromatic Fragrant & Everyday Rice",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"
    },
    {
      id: "farmer-jun",
      full_name: "Kuya Jun Villanueva",
      farm_name: "Villanueva Mango Orchard",
      city: "Jordan",
      province: "Guimaras",
      bio: "World-famous sweet Guimaras carabao mangoes picked at peak ripeness right from our fertile island orchards.",
      rating: 4.9,
      reviewsCount: 51,
      verified: true,
      specialty: "Guimaras Carabao Mangoes",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200"
    },
    {
      id: "farmer-marites",
      full_name: "Ate Marites Sarmiento",
      farm_name: "Sarmiento Coastal Catch",
      city: "Navotas",
      province: "Metro Manila",
      bio: "Daily fresh catch straight from local fishing boats. Cleaned, iced, and dispatched within hours of port arrival.",
      rating: 4.8,
      reviewsCount: 29,
      verified: true,
      specialty: "Fresh Bangus, Tilapia & Shrimp",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"
    },
    {
      id: "farmer-berting",
      full_name: "Tatay Berting Lopez",
      farm_name: "Lopez Coconut & Root Farm",
      city: "Lucban",
      province: "Quezon",
      bio: "Fresh coconut water, cold-pressed virgin coconut oil, cassava, and sweet purple camote from Mount Banahaw.",
      rating: 4.9,
      reviewsCount: 34,
      verified: true,
      specialty: "Cold-Pressed VCO & Mountain Roots",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
    },
    {
      id: "farmer-cora",
      full_name: "Nanay Cora Aquino",
      farm_name: "Aquino Poultry Yard",
      city: "Silang",
      province: "Cavite",
      bio: "Pasture-raised free-range native chicken and morning-laid brown eggs from the breezy highlands of Silang.",
      rating: 4.8,
      reviewsCount: 26,
      verified: true,
      specialty: "Free-Range Poultry & Fresh Eggs",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200"
    }
  ]
};

// Global App State
window.AgriState = {
  products: [],
  categories: SEED_DATA.categories,
  farmers: SEED_DATA.farmers,
  cart: JSON.parse(localStorage.getItem('agri_cart') || '[]'),
  orders: JSON.parse(localStorage.getItem('agri_orders') || '[]'),
  currentCategory: 'all',
  currentFarmerFilter: null,
  currentLocation: 'all',
  searchQuery: '',
  maxPrice: 3000,
  inStockOnly: true,
  sortBy: 'newest',
  currentMode: localStorage.getItem('agri_mode') || 'buyer'
};

// Icons (Reusable Clean SVGs)
const ICONS = {
  mapPin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  package: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>`,
  shoppingBag: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
};

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  initUIListeners();
  updateCartBadge();
  await loadInitialData();
  renderCategories();
  renderProducts();
  renderFarmers();
  renderOrderTrackingList();
});

// Load products from Supabase or fallback
async function loadInitialData() {
  try {
    const res = await fetch(`${SUPABASE_URL}/products?select=*,categories(id,name,slug),profiles:farmer_id(full_name,farm_name,city,province,avatar_url)&is_active=eq.true&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        window.AgriState.products = data.map(normalizeProduct);
        return;
      }
    }
  } catch (e) {
    console.warn('Live query unavailable, running with cached data:', e);
  }

  loadSeedProducts();
}

function normalizeProduct(p) {
  return {
    id: p.id,
    name: p.name,
    category_id: p.category_id,
    category_name: p.categories?.name || 'Produce',
    price: Number(p.price),
    unit: p.unit || 'kg',
    quantity: p.quantity ?? 50,
    is_available: p.is_available ?? true,
    image_url: p.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    farmer_name: p.profiles?.farm_name || p.profiles?.full_name || 'Local Farm',
    farmer_id: p.farmer_id,
    city: p.city || 'Benguet',
    province: p.province || 'Philippines',
    description: p.description || 'Fresh, high-quality local farm harvest.',
    rating: (4.7 + (Math.random() * 0.3)).toFixed(1),
    reviews_count: Math.floor(10 + Math.random() * 40)
  };
}

function loadSeedProducts() {
  window.AgriState.products = [
    {
      id: "prod-1",
      name: "Baguio Beans",
      category_name: "Vegetables",
      price: 95,
      unit: "kg",
      quantity: 60,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=800",
      farmer_name: "Dela Cruz Family Farm",
      farmer_id: "farmer-ramon",
      city: "La Trinidad",
      province: "Benguet",
      description: "Crisp, sweet highland baguio beans harvested at high altitude in Benguet.",
      rating: "4.9",
      reviews_count: 32
    },
    {
      id: "prod-2",
      name: "Highland Cabbage",
      category_name: "Vegetables",
      price: 70,
      unit: "kg",
      quantity: 120,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800",
      farmer_name: "Dela Cruz Family Farm",
      farmer_id: "farmer-ramon",
      city: "La Trinidad",
      province: "Benguet",
      description: "Firm, sweet cabbage heads grown in the cool mountain climate of Benguet.",
      rating: "4.8",
      reviews_count: 27
    },
    {
      id: "prod-3",
      name: "Guimaras Carabao Mangoes",
      category_name: "Fruits",
      price: 180,
      unit: "kg",
      quantity: 85,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800",
      farmer_name: "Villanueva Mango Orchard",
      farmer_id: "farmer-jun",
      city: "Jordan",
      province: "Guimaras",
      description: "Certified sweet Guimaras carabao mangoes. Golden, fragrant, and fiberless.",
      rating: "5.0",
      reviews_count: 48
    },
    {
      id: "prod-4",
      name: "Sinandomeng Rice (50kg Sack)",
      category_name: "Rice & Grains",
      price: 2450,
      unit: "sack",
      quantity: 40,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800",
      farmer_name: "Bautista Rice Fields",
      farmer_id: "farmer-nena",
      city: "Cabanatuan",
      province: "Nueva Ecija",
      description: "Soft and aromatic everyday rice milled directly from Nueva Ecija paddy fields.",
      rating: "4.9",
      reviews_count: 54
    },
    {
      id: "prod-5",
      name: "Dinorado Fragrant Rice",
      category_name: "Rice & Grains",
      price: 62,
      unit: "kg",
      quantity: 150,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
      farmer_name: "Bautista Rice Fields",
      farmer_id: "farmer-nena",
      city: "Cabanatuan",
      province: "Nueva Ecija",
      description: "Natural fragrance and soft, fluffy cooked texture. Direct from Nueva Ecija.",
      rating: "4.9",
      reviews_count: 36
    },
    {
      id: "prod-6",
      name: "Fresh Dagupan Bangus (Milkfish)",
      category_name: "Fish & Seafood",
      price: 210,
      unit: "kg",
      quantity: 45,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1534943441045-104938a140f6?w=800",
      farmer_name: "Sarmiento Coastal Catch",
      farmer_id: "farmer-marites",
      city: "Navotas",
      province: "Metro Manila",
      description: "Fresh daily catch milkfish with thick belly fat and tender meat.",
      rating: "4.8",
      reviews_count: 31
    },
    {
      id: "prod-7",
      name: "Live Suahe (White Shrimp)",
      category_name: "Fish & Seafood",
      price: 420,
      unit: "kg",
      quantity: 25,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800",
      farmer_name: "Sarmiento Coastal Catch",
      farmer_id: "farmer-marites",
      city: "Navotas",
      province: "Metro Manila",
      description: "Sweet white shrimp harvested early morning. Ideal for sinigang or garlic butter.",
      rating: "4.9",
      reviews_count: 22
    },
    {
      id: "prod-8",
      name: "Fresh Farm Eggs (30-pc Tray)",
      category_name: "Poultry & Eggs",
      price: 260,
      unit: "tray",
      quantity: 70,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800",
      farmer_name: "Aquino Poultry Yard",
      farmer_id: "farmer-cora",
      city: "Silang",
      province: "Cavite",
      description: "Grade-A large farm-fresh eggs from healthy, grain-fed hens. Bright golden yolks.",
      rating: "4.9",
      reviews_count: 40
    },
    {
      id: "prod-9",
      name: "Free-Range Native Chicken",
      category_name: "Poultry & Eggs",
      price: 330,
      unit: "kg",
      quantity: 18,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800",
      farmer_name: "Aquino Poultry Yard",
      farmer_id: "farmer-cora",
      city: "Silang",
      province: "Cavite",
      description: "Pasture-raised native chicken with deep, authentic flavor.",
      rating: "4.8",
      reviews_count: 19
    },
    {
      id: "prod-10",
      name: "Sweet Corn (Mais)",
      category_name: "Rice & Grains",
      price: 20,
      unit: "piece",
      quantity: 300,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800",
      farmer_name: "Bautista Rice Fields",
      farmer_id: "farmer-nena",
      city: "Cabanatuan",
      province: "Nueva Ecija",
      description: "Tender, juicy yellow sweet corn freshly picked from the field.",
      rating: "4.7",
      reviews_count: 29
    },
    {
      id: "prod-11",
      name: "Native Ginger (Luya)",
      category_name: "Herbs & Spices",
      price: 120,
      unit: "kg",
      quantity: 35,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800",
      farmer_name: "Dela Cruz Family Farm",
      farmer_id: "farmer-ramon",
      city: "La Trinidad",
      province: "Benguet",
      description: "Aromatic native ginger rhizomes. Excellent for traditional cooking and tea.",
      rating: "4.9",
      reviews_count: 24
    },
    {
      id: "prod-12",
      name: "Cold-Pressed Virgin Coconut Oil (500ml)",
      category_name: "Coconut Products",
      price: 320,
      unit: "bottle",
      quantity: 50,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
      farmer_name: "Lopez Coconut & Root Farm",
      farmer_id: "farmer-berting",
      city: "Lucban",
      province: "Quezon",
      description: "100% pure raw virgin coconut oil, cold extracted without heat or chemicals.",
      rating: "5.0",
      reviews_count: 37
    },
    {
      id: "prod-13",
      name: "Fresh Buko (Young Coconut)",
      category_name: "Coconut Products",
      price: 45,
      unit: "piece",
      quantity: 120,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1544378730-8b5104b18790?w=800",
      farmer_name: "Lopez Coconut & Root Farm",
      farmer_id: "farmer-berting",
      city: "Lucban",
      province: "Quezon",
      description: "Sweet coconut water and tender meat freshly picked from Lucban groves.",
      rating: "4.8",
      reviews_count: 28
    },
    {
      id: "prod-14",
      name: "Sweet Purple Camote (Sweet Potato)",
      category_name: "Root Crops",
      price: 55,
      unit: "kg",
      quantity: 90,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800",
      farmer_name: "Lopez Coconut & Root Farm",
      farmer_id: "farmer-berting",
      city: "Lucban",
      province: "Quezon",
      description: "Naturally sweet and firm purple sweet potatoes from volcanic foothills.",
      rating: "4.7",
      reviews_count: 18
    },
    {
      id: "prod-15",
      name: "Fresh Benguet Carrots",
      category_name: "Vegetables",
      price: 85,
      unit: "kg",
      quantity: 75,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?w=800",
      farmer_name: "Dela Cruz Family Farm",
      farmer_id: "farmer-ramon",
      city: "La Trinidad",
      province: "Benguet",
      description: "Sweet, crunchy, soil-washed highland carrots packed with freshness.",
      rating: "4.9",
      reviews_count: 33
    },
    {
      id: "prod-16",
      name: "Fresh Ripe Tomatoes (Kamatis)",
      category_name: "Vegetables",
      price: 60,
      unit: "kg",
      quantity: 110,
      is_available: true,
      image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800",
      farmer_name: "Aquino Poultry Yard",
      farmer_id: "farmer-cora",
      city: "Silang",
      province: "Cavite",
      description: "Firm, juicy, vine-ripened tomatoes harvested at perfect color.",
      rating: "4.8",
      reviews_count: 25
    }
  ];
}

// Render Categories Chips (No Emojis)
function renderCategories() {
  const container = document.getElementById('categoryChips');
  if (!container) return;

  let html = `
    <button class="category-chip ${window.AgriState.currentCategory === 'all' ? 'active' : ''}" onclick="setCategory('all')">
      All Products
    </button>
  `;

  const counts = {};
  window.AgriState.products.forEach(p => {
    counts[p.category_name] = (counts[p.category_name] || 0) + 1;
  });

  const uniqueCats = Array.from(new Set(window.AgriState.products.map(p => p.category_name)));
  uniqueCats.forEach(cat => {
    const isActive = window.AgriState.currentCategory === cat ? 'active' : '';
    const count = counts[cat] || 0;
    html += `
      <button class="category-chip ${isActive}" onclick="setCategory('${cat}')">
        ${cat} <span style="font-size: 0.75rem; opacity: 0.75; margin-left: 2px;">(${count})</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

// Render Products Catalog with Clean Design
function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countLabel = document.getElementById('productsCountLabel');
  const banner = document.getElementById('activeFarmerBanner');
  if (!container) return;

  // Filter
  let list = window.AgriState.products.filter(p => {
    if (window.AgriState.currentCategory !== 'all' && p.category_name !== window.AgriState.currentCategory) {
      return false;
    }
    if (window.AgriState.currentFarmerFilter && p.farmer_id !== window.AgriState.currentFarmerFilter && p.farmer_name !== window.AgriState.currentFarmerFilter) {
      return false;
    }
    if (window.AgriState.currentLocation !== 'all') {
      const locMatch = (p.province + ' ' + p.city).toLowerCase();
      if (!locMatch.includes(window.AgriState.currentLocation.toLowerCase())) {
        return false;
      }
    }
    if (window.AgriState.searchQuery.trim()) {
      const q = window.AgriState.searchQuery.toLowerCase();
      const match = (p.name + ' ' + p.category_name + ' ' + p.farmer_name + ' ' + p.city + ' ' + p.province + ' ' + p.description).toLowerCase();
      if (!match.includes(q)) return false;
    }
    if (p.price > window.AgriState.maxPrice) {
      return false;
    }
    if (window.AgriState.inStockOnly && (!p.is_available || p.quantity <= 0)) {
      return false;
    }
    return true;
  });

  // Sort
  if (window.AgriState.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (window.AgriState.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (window.AgriState.sortBy === 'rating') {
    list.sort((a, b) => Number(b.rating) - Number(a.rating));
  }

  // Banner
  if (banner) {
    if (window.AgriState.currentFarmerFilter) {
      banner.style.display = 'flex';
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <span style="font-weight: 600;">Farm:</span> <span>${window.AgriState.currentFarmerFilter}</span>
        </div>
        <button onclick="clearFarmerFilter()" style="background: none; border: 1px solid currentColor; padding: 0.2rem 0.65rem; border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: 600;">
          Clear Filter
        </button>
      `;
    } else {
      banner.style.display = 'none';
    }
  }

  if (countLabel) {
    countLabel.textContent = `Showing ${list.length} item(s)`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3.5rem 1rem; background: #ffffff; border-radius: var(--radius-md); border: 1px dashed var(--border-strong);">
        <h4 style="font-size: 1.15rem; font-weight: 700;">No products found</h4>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.35rem; max-width: 400px; margin-left: auto; margin-right: auto;">
          Try broadening your search term or adjusting category and price filters.
        </p>
        <button onclick="resetAllFilters()" class="btn-secondary" style="margin-top: 1.25rem;">
          Reset Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="product-card" id="card-${p.id}">
      <div class="product-img-wrap" onclick="openProductModal('${p.id}')" style="cursor: pointer;">
        <img src="${p.image_url}" alt="${p.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'">
        <span class="category-badge">${p.category_name}</span>
        <span class="stock-badge ${p.quantity <= 15 ? 'low' : ''}">
          ${p.quantity > 0 ? `${p.quantity} ${p.unit} in stock` : 'Sold out'}
        </span>
      </div>

      <div style="padding: 1.15rem; display: flex; flex-direction: column; flex: 1;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.3rem;">
          <button onclick="filterByFarmer('${p.farmer_name}')" style="background: none; border: none; padding: 0; color: var(--text-muted); font-size: 0.8rem; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;" title="Filter by farm">
            ${ICONS.mapPin} ${p.city}, ${p.province}
          </button>
          <div style="font-size: 0.775rem; font-weight: 600; color: #b45309; display: flex; align-items: center; gap: 0.25rem;">
            ${ICONS.star} ${p.rating}
          </div>
        </div>

        <h3 onclick="openProductModal('${p.id}')" style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); cursor: pointer; line-height: 1.35; margin-bottom: 0.35rem;">
          ${p.name}
        </h3>

        <div style="font-size: 0.8rem; color: var(--primary); font-weight: 600; margin-bottom: 0.5rem;">
          ${p.farmer_name}
        </div>

        <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 0.85rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.45;">
          ${p.description}
        </p>

        <div style="margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div class="price-tag">
              ₱${p.price.toLocaleString()}
            </div>
            <span class="unit-tag">/ ${p.unit}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <button onclick="openProductModal('${p.id}')" class="btn-secondary" style="padding: 0.45rem 0.75rem; font-size: 0.8rem;">
              View
            </button>
            <button onclick="addToCart('${p.id}', 1)" class="btn-primary" style="padding: 0.45rem 0.85rem; font-size: 0.8rem;">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Farmer Cards
function renderFarmers() {
  const container = document.getElementById('farmersGrid');
  if (!container) return;

  container.innerHTML = window.AgriState.farmers.map(f => `
    <div style="background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); padding: 1.35rem; box-shadow: var(--shadow-card); transition: var(--transition);">
      <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.85rem;">
        <img src="${f.avatar}" alt="${f.full_name}" style="width: 52px; height: 52px; border-radius: 9999px; object-fit: cover; border: 1px solid var(--border-strong);">
        <div>
          <div style="display: flex; align-items: center; gap: 0.3rem;">
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin: 0;">${f.full_name}</h4>
            <span style="color: var(--primary); font-size: 0.85rem;" title="Verified Grower">${ICONS.check}</span>
          </div>
          <div style="font-size: 0.825rem; font-weight: 600; color: var(--primary);">${f.farm_name}</div>
          <div style="font-size: 0.775rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.2rem;">
            ${ICONS.mapPin} ${f.city}, ${f.province}
          </div>
        </div>
      </div>

      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.85rem;">
        ${f.bio}
      </p>

      <div style="background: var(--bg-subtle); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.775rem;">
        <strong style="color: var(--text-main);">Specialty:</strong> ${f.specialty}
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
        <div style="font-size: 0.8rem; font-weight: 600; color: #b45309; display: flex; align-items: center; gap: 0.25rem;">
          ${ICONS.star} ${f.rating} <span style="color: var(--text-muted); font-weight: 400;">(${f.reviewsCount} reviews)</span>
        </div>
        <button onclick="filterByFarmer('${f.farm_name}')" class="btn-secondary" style="font-size: 0.775rem; padding: 0.35rem 0.75rem;">
          View Products
        </button>
      </div>
    </div>
  `).join('');
}

// Product Modal
function openProductModal(productId) {
  const p = window.AgriState.products.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById('productModal');
  const modalBody = document.getElementById('productModalBody');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="border-radius: var(--radius-md); overflow: hidden; background: #f1f5f9; position: relative;">
          <img src="${p.image_url}" alt="${p.name}" style="width: 100%; height: 280px; object-fit: cover;">
          <span class="category-badge" style="top: 12px; left: 12px;">${p.category_name}</span>
        </div>

        <div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">
              Direct Farm Produce
            </span>
            <div style="font-size: 0.825rem; font-weight: 600; color: #b45309; display: flex; align-items: center; gap: 0.25rem;">
              ${ICONS.star} ${p.rating} (${p.reviews_count} reviews)
            </div>
          </div>

          <h2 style="font-size: 1.45rem; font-weight: 800; margin-top: 0.25rem; color: var(--text-main); line-height: 1.25;">
            ${p.name}
          </h2>

          <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 0.75rem; margin: 0.85rem 0; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">${p.farmer_name}</div>
              <div style="font-size: 0.775rem; color: var(--text-muted);">${p.city}, ${p.province}</div>
            </div>
            <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">Verified Grower</span>
          </div>

          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">
            ${p.description}
          </p>

          <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 1rem;">
            <span class="price-tag" style="font-size: 1.75rem;">
              ₱${p.price.toLocaleString()}
            </span>
            <span class="unit-tag" style="font-size: 0.9rem;">
              per ${p.unit}
            </span>
            <span style="margin-left: auto; font-size: 0.8rem; font-weight: 600; color: var(--primary);">
              ${p.quantity} ${p.unit} available
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="display: inline-flex; align-items: center; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); overflow: hidden;">
              <button onclick="adjustModalQty(-1)" style="padding: 0.5rem 0.85rem; background: var(--bg-subtle); border: none; font-weight: 700; cursor: pointer;">-</button>
              <input id="modalQtyInput" type="number" value="1" min="1" max="${p.quantity}" style="width: 45px; text-align: center; border: none; font-weight: 700; font-size: 0.9rem;" readonly>
              <button onclick="adjustModalQty(1, ${p.quantity})" style="padding: 0.5rem 0.85rem; background: var(--bg-subtle); border: none; font-weight: 700; cursor: pointer;">+</button>
            </div>

            <button onclick="addToCartFromModal('${p.id}')" class="btn-primary" style="flex: 1; padding: 0.65rem 1.25rem;">
              Add to Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('open');
}

function adjustModalQty(delta, max = 99) {
  const input = document.getElementById('modalQtyInput');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > max) val = max;
  input.value = val;
}

function addToCartFromModal(productId) {
  const input = document.getElementById('modalQtyInput');
  const qty = input ? parseInt(input.value) || 1 : 1;
  addToCart(productId, qty);
  closeProductModal();
}

// Shopping Cart Functions
function addToCart(productId, quantity = 1) {
  const p = window.AgriState.products.find(item => item.id === productId);
  if (!p) return;

  const existing = window.AgriState.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
    if (existing.quantity > p.quantity) existing.quantity = p.quantity;
  } else {
    window.AgriState.cart.push({
      id: p.id,
      name: p.name,
      price: p.price,
      unit: p.unit,
      farmer_name: p.farmer_name,
      image_url: p.image_url,
      quantity: quantity,
      max_quantity: p.quantity
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`Added ${quantity} ${p.unit} of ${p.name} to cart`);
}

function updateCartQuantity(productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = window.AgriState.cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.min(newQty, item.max_quantity);
    saveCart();
    renderCartDrawer();
  }
}

function removeFromCart(productId) {
  window.AgriState.cart = window.AgriState.cart.filter(i => i.id !== productId);
  saveCart();
  renderCartDrawer();
  updateCartBadge();
  showToast(`Item removed from basket`);
}

function saveCart() {
  localStorage.setItem('agri_cart', JSON.stringify(window.AgriState.cart));
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = window.AgriState.cart.reduce((sum, item) => sum + item.quantity, 0);
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

function toggleCart(open = true) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (!drawer || !backdrop) return;

  if (open) {
    renderCartDrawer();
    drawer.classList.add('open');
    backdrop.classList.add('open');
  } else {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (!container) return;

  if (window.AgriState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
        <div style="width: 44px; height: 44px; margin: 0 auto 0.75rem; border-radius: var(--radius-sm); background: var(--bg-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-light);">
          ${ICONS.package}
        </div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main);">Your basket is empty</h4>
        <p style="font-size: 0.825rem; margin-top: 0.35rem;">Add produce from the marketplace to proceed with an order.</p>
        <button onclick="toggleCart(false)" class="btn-primary" style="margin-top: 1.25rem;">
          Explore Marketplace
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₱0.00';
    if (totalEl) totalEl.textContent = '₱0.00';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  let subtotal = 0;
  container.innerHTML = window.AgriState.cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div style="display: flex; gap: 0.85rem; padding: 0.85rem 0; border-bottom: 1px solid var(--border-subtle); align-items: center;">
        <img src="${item.image_url}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: var(--radius-sm); object-fit: cover;">
        <div style="flex: 1;">
          <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.1rem;">${item.name}</h5>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.35rem;">${item.farmer_name}</div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: inline-flex; align-items: center; border: 1px solid var(--border-strong); border-radius: var(--radius-sm);">
              <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})" style="padding: 0.15rem 0.5rem; border: none; background: none; cursor: pointer; font-weight: 700;">-</button>
              <span style="font-size: 0.8rem; font-weight: 700; padding: 0 0.3rem;">${item.quantity} ${item.unit}</span>
              <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})" style="padding: 0.15rem 0.5rem; border: none; background: none; cursor: pointer; font-weight: 700;">+</button>
            </div>
            <div style="font-weight: 700; color: var(--primary-deep); font-size: 0.9rem;">
              ₱${itemTotal.toLocaleString()}
            </div>
          </div>
        </div>
        <button onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: var(--text-light); cursor: pointer; padding: 0.25rem; font-size: 1rem;" title="Remove">✕</button>
      </div>
    `;
  }).join('');

  const deliveryFee = 95;
  if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toLocaleString()}`;
  if (totalEl) totalEl.textContent = `₱${(subtotal + deliveryFee).toLocaleString()}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}

// Checkout Modal
function openCheckoutModal() {
  if (window.AgriState.cart.length === 0) return;
  toggleCart(false);

  const modal = document.getElementById('checkoutModal');
  const summaryEl = document.getElementById('checkoutSummary');
  if (!modal) return;

  const subtotal = window.AgriState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const delivery = 95;
  const total = subtotal + delivery;

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 0.85rem; font-size: 0.85rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span>Items (${window.AgriState.cart.length}):</span>
          <strong>₱${subtotal.toLocaleString()}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span>Scheduled Cold Delivery:</span>
          <strong>₱${delivery.toLocaleString()}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-strong); padding-top: 0.45rem; font-size: 1rem; color: var(--primary-deep);">
          <strong>Total to Pay:</strong>
          <strong>₱${total.toLocaleString()}</strong>
        </div>
      </div>
    `;
  }

  modal.classList.add('open');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('open');
}

// Submit Order
async function submitOrder(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing Order...';
  }

  const formData = new FormData(form);
  const orderId = 'AGRI-' + Math.floor(100000 + Math.random() * 900000);
  const subtotal = window.AgriState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const fulfillment = formData.get('fulfillment') || 'delivery';
  const deliveryFee = fulfillment === 'delivery' ? 95 : 0;

  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
    items: [...window.AgriState.cart],
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    total: subtotal + deliveryFee,
    fulfillment: fulfillment,
    customerName: formData.get('fullName'),
    phone: formData.get('phone'),
    address: formData.get('address') + ', ' + formData.get('city') + ', ' + formData.get('province'),
    paymentMethod: formData.get('paymentMethod'),
    status: 'Order Confirmed'
  };

  window.AgriState.orders.unshift(newOrder);
  localStorage.setItem('agri_orders', JSON.stringify(window.AgriState.orders));

  window.AgriState.cart = [];
  saveCart();
  updateCartBadge();

  closeCheckoutModal();
  showOrderSuccessModal(newOrder);
  renderOrderTrackingList();
}

function showOrderSuccessModal(order) {
  const modal = document.getElementById('orderSuccessModal');
  const body = document.getElementById('orderSuccessBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="text-align: center; padding: 0.5rem 0;">
      <div style="width: 48px; height: 48px; border-radius: 9999px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;">
        ${ICONS.check}
      </div>
      <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-main);">Order Confirmed</h3>
      <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem;">
        Your order has been routed to the farm for harvesting and preparation.
      </p>

      <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 1rem; margin: 1.25rem 0; text-align: left; font-size: 0.85rem;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem; margin-bottom: 0.4rem;">
          <span style="color: var(--text-muted);">Order Reference:</span>
          <strong style="color: var(--primary-deep); font-family: monospace;">${order.id}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
          <span style="color: var(--text-muted);">Fulfillment:</span>
          <span style="text-transform: capitalize;">${order.fulfillment}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
          <span style="color: var(--text-muted);">Payment Mode:</span>
          <span style="text-transform: uppercase;">${order.paymentMethod}</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.4rem; font-size: 0.95rem;">
          <strong>Total:</strong>
          <strong style="color: var(--primary-deep);">₱${order.total.toLocaleString()}</strong>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <button onclick="closeSuccessModal(); scrollToSection('orderTracker');" class="btn-primary" style="flex: 1;">
          View Tracking Details
        </button>
        <button onclick="closeSuccessModal();" class="btn-secondary">
          Continue Shopping
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeSuccessModal() {
  const modal = document.getElementById('orderSuccessModal');
  if (modal) modal.classList.remove('open');
}

// Order Tracking List Renderer (Clean progress dots)
function renderOrderTrackingList() {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  if (window.AgriState.orders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main);">No active orders</h4>
        <p style="font-size: 0.825rem; margin-top: 0.25rem;">Your placed orders and fulfillment status will appear here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = window.AgriState.orders.map(order => `
    <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1rem; box-shadow: var(--shadow-sm);">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.65rem; margin-bottom: 0.85rem;">
        <div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Order ID</span>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--primary-deep); font-family: monospace;">${order.id}</h4>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.75rem; color: var(--text-muted);">Date:</span>
          <div style="font-weight: 600; font-size: 0.85rem;">${order.date}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin: 1rem 0; text-align: center;">
        <div>
          <div style="width: 24px; height: 24px; border-radius: 9999px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; margin: 0 auto 0.25rem;">1</div>
          <span style="font-size: 0.75rem; font-weight: 600;">Confirmed</span>
        </div>
        <div>
          <div style="width: 24px; height: 24px; border-radius: 9999px; background: #d97706; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; margin: 0 auto 0.25rem;">2</div>
          <span style="font-size: 0.75rem; font-weight: 600;">Harvesting</span>
        </div>
        <div>
          <div style="width: 24px; height: 24px; border-radius: 9999px; background: var(--bg-subtle); color: var(--text-light); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; margin: 0 auto 0.25rem;">3</div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">In Transit</span>
        </div>
        <div>
          <div style="width: 24px; height: 24px; border-radius: 9999px; background: var(--bg-subtle); color: var(--text-light); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; margin: 0 auto 0.25rem;">4</div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Delivered</span>
        </div>
      </div>

      <div style="background: var(--bg-subtle); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
        <span>${order.items.length} item(s) • Total: <strong>₱${order.total.toLocaleString()}</strong></span>
        <span style="color: var(--primary); font-weight: 600;">${order.status}</span>
      </div>
    </div>
  `).join('');
}

// Farmer Listing Portal
function openSellHarvestModal() {
  const modal = document.getElementById('sellHarvestModal');
  if (modal) modal.classList.add('open');
}

function closeSellHarvestModal() {
  const modal = document.getElementById('sellHarvestModal');
  if (modal) modal.classList.remove('open');
}

function runAIPricingAssistant() {
  const cropInput = document.getElementById('sellCropName');
  const priceInput = document.getElementById('sellPrice');
  const adviceEl = document.getElementById('aiPriceAdvice');
  if (!cropInput || !adviceEl) return;

  const crop = cropInput.value.trim().toLowerCase();
  let suggested = { min: 70, max: 120, unit: 'kg', tip: 'Current high seasonal demand across Luzon.' };

  if (crop.includes('mango') || crop.includes('mangga')) {
    suggested = { min: 160, max: 210, unit: 'kg', tip: 'Sweet grade-A mangoes command premium pricing.' };
  } else if (crop.includes('rice') || crop.includes('bigas')) {
    suggested = { min: 2300, max: 2600, unit: 'sack (50kg)', tip: 'Stable farmgate prices; direct wholesale to consumers.' };
  } else if (crop.includes('cabbage') || crop.includes('bean') || crop.includes('baguio')) {
    suggested = { min: 65, max: 110, unit: 'kg', tip: 'Benguet highland supply is steady; fair direct-to-buyer rate.' };
  } else if (crop.includes('bangus') || crop.includes('fish') || crop.includes('tilapia')) {
    suggested = { min: 180, max: 240, unit: 'kg', tip: 'Daily market rates in Navotas support this price range.' };
  } else if (crop.includes('egg') || crop.includes('itlog')) {
    suggested = { min: 240, max: 280, unit: 'tray (30s)', tip: 'Consistent household demand.' };
  }

  adviceEl.style.display = 'block';
  adviceEl.innerHTML = `
    <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.8rem; color: #92400e;">
      <strong>Market Price Recommendation:</strong><br>
      Estimated Range: <strong>₱${suggested.min} – ₱${suggested.max} per ${suggested.unit}</strong><br>
      <em>Note: ${suggested.tip}</em>
      <div style="margin-top: 0.35rem;">
        <button type="button" onclick="applySuggestedPrice(${suggested.min})" style="background: #d97706; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.725rem; font-weight: 700; cursor: pointer;">
          Set ₱${suggested.min}
        </button>
      </div>
    </div>
  `;
}

function applySuggestedPrice(price) {
  const priceInput = document.getElementById('sellPrice');
  if (priceInput) priceInput.value = price;
}

function submitNewListing(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const newProd = {
    id: 'prod-' + Date.now(),
    name: formData.get('cropName'),
    category_name: formData.get('category'),
    price: Number(formData.get('price')),
    unit: formData.get('unit'),
    quantity: Number(formData.get('quantity')),
    is_available: true,
    image_url: formData.get('imageUrl') || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    farmer_name: formData.get('farmName') || 'Local Farm',
    farmer_id: 'custom-farmer',
    city: formData.get('city'),
    province: formData.get('province'),
    description: formData.get('description'),
    rating: '5.0',
    reviews_count: 1
  };

  window.AgriState.products.unshift(newProd);
  closeSellHarvestModal();
  form.reset();

  renderCategories();
  renderProducts();
  showToast(`Listing "${newProd.name}" is now active in the marketplace`);
  scrollToSection('marketplace');
}

// Filter Handlers
function setCategory(cat) {
  window.AgriState.currentCategory = cat;
  renderCategories();
  renderProducts();
}

function filterByFarmer(farmerName) {
  window.AgriState.currentFarmerFilter = farmerName;
  renderProducts();
  scrollToSection('marketplace');
}

function clearFarmerFilter() {
  window.AgriState.currentFarmerFilter = null;
  renderProducts();
}

function resetAllFilters() {
  window.AgriState.currentCategory = 'all';
  window.AgriState.currentFarmerFilter = null;
  window.AgriState.currentLocation = 'all';
  window.AgriState.searchQuery = '';
  window.AgriState.maxPrice = 3000;
  window.AgriState.inStockOnly = true;
  window.AgriState.sortBy = 'newest';

  const s = document.getElementById('searchInput');
  if (s) s.value = '';
  const heroS = document.getElementById('heroSearchInput');
  if (heroS) heroS.value = '';
  const pr = document.getElementById('priceRange');
  if (pr) pr.value = 3000;
  const locSel = document.getElementById('locationSelect');
  if (locSel) locSel.value = 'all';

  renderCategories();
  renderProducts();
}

function setSort(sortBy) {
  window.AgriState.sortBy = sortBy;
  renderProducts();
}

function toggleMode(mode) {
  window.AgriState.currentMode = mode;
  localStorage.setItem('agri_mode', mode);
  const badge = document.getElementById('userModeBadge');
  if (badge) {
    badge.textContent = mode === 'farmer' ? 'Farmer View' : 'Buyer View';
  }
  showToast(`Switched to ${mode === 'farmer' ? 'Farmer' : 'Buyer'} View`);
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="color: #22c55e;">${ICONS.check}</span> <div>${msg}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function initUIListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      window.AgriState.searchQuery = e.target.value;
      renderProducts();
    });
  }

  const heroSearchInput = document.getElementById('heroSearchInput');
  if (heroSearchInput) {
    heroSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        window.AgriState.searchQuery = heroSearchInput.value;
        renderProducts();
        scrollToSection('marketplace');
      }
    });
  }

  const priceRange = document.getElementById('priceRange');
  const priceDisplay = document.getElementById('priceRangeDisplay');
  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      window.AgriState.maxPrice = Number(e.target.value);
      if (priceDisplay) priceDisplay.textContent = `₱${Number(e.target.value).toLocaleString()}`;
      renderProducts();
    });
  }
}
