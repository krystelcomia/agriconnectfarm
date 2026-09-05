/**
 * AgriConnect - Multi-Page Platform Controller
 * Manages Home Analytics & Charts, Marketplace Catalog & Usability Buttons,
 * Farmers Directory & Products for Sale, Interactive Maps & Driving Directions,
 * How It Works Guide, and Order Tracking.
 */

// Configuration
const SUPABASE_URL = "https://ogkorvydmlgwifhnnmjz.supabase.co/rest/v1";
const SUPABASE_KEY = "sb_publishable_c8UFr2fVf7J-s0TsD0IYwQ_XIlg2-KY";

// Embedded seed data
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
      latitude: 16.455,
      longitude: 120.588,
      address: "Sitio Pungayan, La Trinidad, Benguet",
      bio: "Third-generation highland vegetable farmer cultivating crisp greens without harmful synthetic chemicals.",
      rating: 4.9,
      reviewsCount: 38,
      verified: true,
      phone: "+63 917 842 1092",
      pickupHours: "6:00 AM – 3:00 PM (Daily)",
      specialty: "Highland Greens & Root Crops",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400"
    },
    {
      id: "farmer-nena",
      full_name: "Aling Nena Bautista",
      farm_name: "Bautista Rice Fields",
      city: "Cabanatuan",
      province: "Nueva Ecija",
      latitude: 15.486,
      longitude: 120.967,
      address: "Barangay San Isidro, Cabanatuan City, Nueva Ecija",
      bio: "Harvesting, drying, and milling premium Sinandomeng and Dinorado rice from our family farm every season.",
      rating: 5.0,
      reviewsCount: 42,
      verified: true,
      phone: "+63 918 554 9281",
      pickupHours: "7:00 AM – 5:00 PM (Mon-Sat)",
      specialty: "Aromatic Fragrant & Everyday Rice",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
    },
    {
      id: "farmer-jun",
      full_name: "Kuya Jun Villanueva",
      farm_name: "Villanueva Mango Orchard",
      city: "Jordan",
      province: "Guimaras",
      latitude: 10.658,
      longitude: 122.593,
      address: "Barangay Poblacion, Jordan, Guimaras",
      bio: "World-famous sweet Guimaras carabao mangoes picked at peak ripeness right from our fertile island orchards.",
      rating: 4.9,
      reviewsCount: 51,
      verified: true,
      phone: "+63 920 331 4729",
      pickupHours: "8:00 AM – 4:00 PM (Daily)",
      specialty: "Guimaras Carabao Mangoes",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"
    },
    {
      id: "farmer-marites",
      full_name: "Ate Marites Sarmiento",
      farm_name: "Sarmiento Coastal Catch",
      city: "Navotas",
      province: "Metro Manila",
      latitude: 14.669,
      longitude: 120.939,
      address: "Fish Port Complex, North Bay Blvd, Navotas City",
      bio: "Daily fresh catch straight from local fishing boats. Cleaned, iced, and dispatched within hours of port arrival.",
      rating: 4.8,
      reviewsCount: 29,
      verified: true,
      phone: "+63 927 662 8190",
      pickupHours: "4:00 AM – 11:00 AM (Early Catch)",
      specialty: "Fresh Bangus, Tilapia & Shrimp",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
    },
    {
      id: "farmer-berting",
      full_name: "Tatay Berting Lopez",
      farm_name: "Lopez Coconut & Root Farm",
      city: "Lucban",
      province: "Quezon",
      latitude: 14.113,
      longitude: 121.556,
      address: "Barangay Kulapi, Lucban, Quezon",
      bio: "Fresh coconut water, cold-pressed virgin coconut oil, cassava, and sweet purple camote from Mount Banahaw.",
      rating: 4.9,
      reviewsCount: 34,
      verified: true,
      phone: "+63 908 771 2294",
      pickupHours: "7:00 AM – 4:00 PM (Daily)",
      specialty: "Cold-Pressed VCO & Mountain Roots",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
    },
    {
      id: "farmer-cora",
      full_name: "Nanay Cora Aquino",
      farm_name: "Aquino Poultry Yard",
      city: "Silang",
      province: "Cavite",
      latitude: 14.230,
      longitude: 120.974,
      address: "Barangay Biga, Silang, Cavite",
      bio: "Pasture-raised free-range native chicken and morning-laid brown eggs from the breezy highlands of Silang.",
      rating: 4.8,
      reviewsCount: 26,
      verified: true,
      phone: "+63 919 443 8910",
      pickupHours: "7:00 AM – 5:00 PM (Daily)",
      specialty: "Free-Range Poultry & Fresh Eggs",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
    }
  ]
};

// Global App State
window.AgriState = {
  products: [],
  categories: SEED_DATA.categories,
  farmers: SEED_DATA.farmers,
  cart: JSON.parse(localStorage.getItem('agri_cart') || '[]'),
  orders: JSON.parse(localStorage.getItem('agri_orders') || '[]').filter(o => o && o.id !== 'AGRI-849201' && o.id !== 'AGRI-592014'),
  currentCategory: 'all',
  currentFarmerFilter: null,
  currentLocation: 'all',
  searchQuery: '',
  maxPrice: 3000,
  inStockOnly: false,
  sortBy: 'newest',
  currentMode: localStorage.getItem('agri_mode') || 'buyer',
  user: JSON.parse(localStorage.getItem('agri_user') || 'null')
};

// Purge any legacy sample orders from storage
localStorage.setItem('agri_orders', JSON.stringify(window.AgriState.orders));

// Clean SVG Icons
const ICONS = {
  mapPin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  package: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>`,
  navigation: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
  phone: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  initUIListeners();
  updateCartBadge();
  updateAuthUI();
  await loadInitialData();

  // Read URL params (e.g. marketplace.html?category=Fruits or ?farmer=Dela+Cruz)
  const params = new URLSearchParams(window.location.search);
  if (params.get('category')) {
    window.AgriState.currentCategory = params.get('category');
  }
  if (params.get('farmer')) {
    window.AgriState.currentFarmerFilter = params.get('farmer');
  }

  // Page-specific initializers
  if (document.getElementById('homeChartSection')) {
    initHomeCharts();
  }
  if (document.getElementById('productsGrid')) {
    renderCategories();
    renderProducts();
  }
  if (document.getElementById('farmersDirectoryGrid')) {
    renderFarmersDirectory();
  }
  if (document.getElementById('mapContainer')) {
    initInteractiveMap();
  }
  if (document.getElementById('ordersListContainer')) {
    renderOrderTrackingList();
  }
  if (document.getElementById('authPageContainer')) {
    initAuthPage();
  }
});

// Load live data or fallback
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
    console.warn('Using cached agricultural catalog:', e);
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

// -------------------------------------------------------------
// 1. HOME PAGE ANALYTICS & CHARTS
// -------------------------------------------------------------
function initHomeCharts() {
  const ctxPrice = document.getElementById('priceComparisonChart');
  const ctxIncome = document.getElementById('farmerIncomeChart');

  if (ctxPrice && typeof Chart !== 'undefined') {
    new Chart(ctxPrice, {
      type: 'line',
      data: {
        labels: ['Baguio Cabbage', 'Carabao Mango', 'Native Ginger', 'Sweet Corn', 'Fresh Bangus', 'Free-Range Eggs'],
        datasets: [
          {
            label: 'Traditional Middleman Farmgate (₱)',
            data: [28, 75, 45, 8, 110, 160],
            borderColor: '#dc2626',
            backgroundColor: 'rgba(220, 38, 38, 0.08)',
            borderDash: [5, 5],
            tension: 0.35,
            fill: true
          },
          {
            label: 'AgriConnect Direct Farmgate (₱)',
            data: [70, 180, 120, 20, 210, 260],
            borderColor: '#15803d',
            backgroundColor: 'rgba(21, 128, 61, 0.12)',
            tension: 0.35,
            fill: true
          },
          {
            label: 'Metro Manila Supermarket Retail (₱)',
            data: [130, 260, 190, 35, 290, 340],
            borderColor: '#64748b',
            borderDash: [2, 2],
            tension: 0.35,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 14, font: { family: 'Plus Jakarta Sans', size: 12 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ₱${ctx.parsed.y}/unit`
            }
          }
        },
        scales: {
          y: {
            title: { display: true, text: 'Price in Philippine Pesos (₱)', font: { family: 'Plus Jakarta Sans', weight: 'bold' } },
            grid: { color: '#f1f5f9' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  if (ctxIncome && typeof Chart !== 'undefined') {
    new Chart(ctxIncome, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Traditional Net Monthly Income (₱)',
            data: [14200, 13800, 15100, 12900, 14800, 13500, 14100, 15300],
            backgroundColor: '#cbd5e1',
            borderRadius: 6
          },
          {
            label: 'AgriConnect Direct Net Income (₱)',
            data: [26500, 25800, 29200, 27400, 31000, 28900, 32500, 34200],
            backgroundColor: '#15803d',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 14, font: { family: 'Plus Jakarta Sans', size: 12 } } }
        },
        scales: {
          y: {
            title: { display: true, text: 'Net Income (₱)', font: { family: 'Plus Jakarta Sans', weight: 'bold' } },
            grid: { color: '#f1f5f9' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }
}

// -------------------------------------------------------------
// 2. MARKETPLACE CATALOG (Functional Buttons & Filters)
// -------------------------------------------------------------
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

function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countLabel = document.getElementById('productsCountLabel');
  const banner = document.getElementById('activeFarmerBanner');
  if (!container) return;

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

  if (window.AgriState.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (window.AgriState.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (window.AgriState.sortBy === 'rating') {
    list.sort((a, b) => Number(b.rating) - Number(a.rating));
  }

  if (banner) {
    if (window.AgriState.currentFarmerFilter) {
      banner.style.display = 'flex';
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
          <span style="font-weight: 600;">Filtered by Farm:</span> <span>${window.AgriState.currentFarmerFilter}</span>
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
          Try broadening your search term or selecting another category.
        </p>
        <button onclick="resetAllFilters()" class="btn-secondary" style="margin-top: 1.25rem;">
          Reset All Filters
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
          <a href="farmers.html#${p.farmer_id || ''}" style="color: var(--text-muted); font-size: 0.8rem; font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 0.25rem;">
            ${ICONS.mapPin} ${p.city}, ${p.province}
          </a>
          <div style="font-size: 0.775rem; font-weight: 600; color: #b45309; display: flex; align-items: center; gap: 0.25rem;">
            ${ICONS.star} ${p.rating}
          </div>
        </div>

        <h3 onclick="openProductModal('${p.id}')" style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); cursor: pointer; line-height: 1.35; margin-bottom: 0.2rem;">
          ${p.name}
        </h3>

        <a href="farmers.html#${p.farmer_id || ''}" style="font-size: 0.8rem; color: var(--primary); font-weight: 600; margin-bottom: 0.5rem; text-decoration: none;">
          ${p.farmer_name}
        </a>

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

          <!-- Functional Buttons on Product Card -->
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <button onclick="openProductModal('${p.id}')" class="btn-secondary" style="padding: 0.45rem 0.75rem; font-size: 0.8rem;" title="View Details">
              Details
            </button>
            <button onclick="addToCart('${p.id}', 1)" class="btn-primary" style="padding: 0.45rem 0.85rem; font-size: 0.8rem;" title="Add 1 ${p.unit}">
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 3. FARMERS DIRECTORY & PRODUCTS FOR SALE
// -------------------------------------------------------------
function renderFarmersDirectory() {
  const container = document.getElementById('farmersDirectoryGrid');
  if (!container) return;

  container.innerHTML = window.AgriState.farmers.map(f => {
    // Find all products listed by this farmer
    const farmerProducts = window.AgriState.products.filter(p => 
      p.farmer_id === f.id || p.farmer_name === f.farm_name || p.farmer_name === f.full_name
    );

    return `
      <div id="${f.id}" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-card); margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1.5rem;">
          <div style="display: flex; gap: 1.25rem; align-items: center;">
            <img src="${f.avatar}" alt="${f.full_name}" style="width: 80px; height: 80px; border-radius: 9999px; object-fit: cover; border: 2px solid var(--primary);">
            <div>
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-main); margin: 0;">${f.full_name}</h3>
                <span style="color: var(--primary); font-size: 1rem;" title="Verified Philippine Grower">${ICONS.check}</span>
              </div>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--primary); margin-top: 0.15rem;">${f.farm_name}</div>
              <div style="font-size: 0.825rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem; margin-top: 0.25rem;">
                ${ICONS.mapPin} ${f.address || `${f.city}, ${f.province}`}
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem;">
            <div style="font-size: 0.9rem; font-weight: 700; color: #b45309; display: flex; align-items: center; gap: 0.25rem;">
              ${ICONS.star} ${f.rating} <span style="color: var(--text-muted); font-weight: 400; font-size: 0.8rem;">(${f.reviewsCount} verified reviews)</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.35rem;">
              ${ICONS.phone} ${f.phone || 'Direct line'}
            </div>
            <a href="maps.html?lat=${f.latitude}&lng=${f.longitude}&name=${encodeURIComponent(f.farm_name)}" class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem; margin-top: 0.35rem;">
              ${ICONS.navigation} Get Driving Directions
            </a>
          </div>
        </div>

        <div style="padding: 1.25rem 0;">
          <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">
            "${f.bio}"
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.8rem;">
            <span style="background: var(--bg-subtle); padding: 0.35rem 0.75rem; border-radius: var(--radius-sm);">
              <strong>Specialty:</strong> ${f.specialty}
            </span>
            <span style="background: var(--bg-subtle); padding: 0.35rem 0.75rem; border-radius: var(--radius-sm);">
              <strong>Farm Gate Hours:</strong> ${f.pickupHours || '8:00 AM – 5:00 PM'}
            </span>
          </div>
        </div>

        <!-- Products for Sale by this Farmer -->
        <div style="background: var(--bg-page); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 0.5rem; border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); text-transform: uppercase; letter-spacing: 0.03em;">
              Current Harvests for Sale (${farmerProducts.length})
            </h4>
            <span style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">100% Direct Farmgate</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;">
            ${farmerProducts.length > 0 ? farmerProducts.map(p => `
              <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); overflow: hidden; display: flex; flex-direction: column;">
                <img src="${p.image_url}" alt="${p.name}" style="width: 100%; height: 120px; object-fit: cover;">
                <div style="padding: 0.85rem; display: flex; flex-direction: column; flex: 1;">
                  <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--text-main);">${p.name}</h5>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem;">${p.quantity} ${p.unit} in stock</div>
                  <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between;">
                    <span style="font-weight: 800; color: var(--primary-deep); font-size: 1rem;">₱${p.price.toLocaleString()} <span style="font-size: 0.75rem; font-weight: 500; color: var(--text-muted);">/${p.unit}</span></span>
                    <button onclick="addToCart('${p.id}', 1)" class="btn-primary" style="padding: 0.35rem 0.65rem; font-size: 0.775rem;">
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            `).join('') : `
              <div style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.85rem; padding: 1rem 0;">
                Next batch of seasonal crop currently growing in fields.
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// 4. MAPS & DRIVING DIRECTIONS ENGINE
// -------------------------------------------------------------
let mapInstance = null;
let markersLayer = null;

function initInteractiveMap() {
  const mapEl = document.getElementById('mapContainer');
  if (!mapEl || typeof L === 'undefined') return;

  // Center around Central Luzon / Metro Manila
  mapInstance = L.map('mapContainer').setView([14.8, 121.0], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);

  markersLayer = L.layerGroup().addTo(mapInstance);

  // Add farm pins
  window.AgriState.farmers.forEach(f => {
    if (!f.latitude || !f.longitude) return;

    const popupHtml = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 200px; padding: 4px;">
        <div style="font-weight: 800; color: #14532d; font-size: 1rem;">${f.farm_name}</div>
        <div style="font-size: 0.825rem; font-weight: 600; color: #334155; margin-bottom: 4px;">${f.full_name}</div>
        <div style="font-size: 0.775rem; color: #64748b; margin-bottom: 8px;">${f.city}, ${f.province}</div>
        <div style="font-size: 0.75rem; color: #15803d; font-weight: 600; margin-bottom: 8px;">Specialty: ${f.specialty}</div>
        <button onclick="selectFarmForDirections('${f.id}')" style="background: #15803d; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: 700; font-size: 0.775rem; cursor: pointer; width: 100%;">
          Get Driving Directions
        </button>
      </div>
    `;

    L.marker([f.latitude, f.longitude])
      .bindPopup(popupHtml)
      .addTo(markersLayer);
  });

  // Check URL params for pre-selected farm to navigate to
  const params = new URLSearchParams(window.location.search);
  const lat = parseFloat(params.get('lat'));
  const lng = parseFloat(params.get('lng'));
  if (!isNaN(lat) && !isNaN(lng)) {
    mapInstance.setView([lat, lng], 11);
    const targetFarmer = window.AgriState.farmers.find(f => Math.abs(f.latitude - lat) < 0.01);
    if (targetFarmer) {
      selectFarmForDirections(targetFarmer.id);
    }
  }

  renderFarmListSidePanel();
}

function renderFarmListSidePanel() {
  const container = document.getElementById('farmListContainer');
  if (!container) return;

  container.innerHTML = window.AgriState.farmers.map(f => `
    <div onclick="selectFarmForDirections('${f.id}')" class="farm-map-card" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem; cursor: pointer; transition: var(--transition); margin-bottom: 0.75rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--primary-deep); margin: 0;">${f.farm_name}</h4>
          <div style="font-size: 0.8rem; font-weight: 500; color: var(--text-secondary);">${f.full_name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">📍 ${f.city}, ${f.province}</div>
        </div>
        <span style="font-size: 0.75rem; background: var(--primary-light); color: var(--primary-deep); font-weight: 700; padding: 2px 8px; border-radius: 9999px;">
          ★ ${f.rating}
        </span>
      </div>
      <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--primary); font-weight: 600;">
        ${f.specialty}
      </div>
    </div>
  `).join('');
}

function selectFarmForDirections(farmerId) {
  const f = window.AgriState.farmers.find(item => item.id === farmerId);
  if (!f) return;

  if (mapInstance && f.latitude && f.longitude) {
    mapInstance.setView([f.latitude, f.longitude], 12);
  }

  const resultEl = document.getElementById('directionsResultPanel');
  if (!resultEl) return;

  // Approximate distance calculation from Metro Manila (14.5995, 120.9842)
  const manilaLat = 14.5995;
  const manilaLng = 120.9842;
  const distKm = Math.round(calculateDistance(manilaLat, manilaLng, f.latitude, f.longitude));
  const driveHours = (distKm / 55).toFixed(1);

  let routeName = "Standard Expressway Corridor";
  if (f.province === "Benguet") routeName = "NLEX → SCTEX → TPLEX → Marcos Highway / Kennon Rd";
  else if (f.province === "Nueva Ecija") routeName = "NLEX → SCTEX (La Paz / Cabanatuan Exit)";
  else if (f.province === "Cavite") routeName = "SLEX → MCX / CALAX → Aguinaldo Highway";
  else if (f.province === "Quezon") routeName = "SLEX → TR4 / Pan-Philippine Hwy → Lucban";
  else if (f.province === "Metro Manila") routeName = "C-3 / R-10 Harbor Link Coastal Route";
  else if (f.province === "Guimaras") routeName = "Iloilo City Port → Parola Wharf RoRo Ferry (15 mins)";

  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div style="background: #ffffff; border: 1px solid var(--primary-border); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-card);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">Selected Destination</span>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main);">${f.farm_name}</h4>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${f.address}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.85rem;">
        <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm);">
          <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">Estimated Distance:</span>
          <strong style="font-size: 1.1rem; color: var(--text-main);">${distKm} km</strong>
        </div>
        <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm);">
          <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">Est. Driving Time:</span>
          <strong style="font-size: 1.1rem; color: var(--text-main);">${driveHours} hrs</strong>
        </div>
      </div>

      <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">
        <strong>Recommended Expressway Route:</strong><br>
        <span>${routeName}</span>
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <a href="https://www.google.com/maps/dir/?api=1&destination=${f.latitude},${f.longitude}" target="_blank" class="btn-primary" style="flex: 1; text-align: center; justify-content: center; padding: 0.65rem;">
          ${ICONS.navigation} Open in Google Maps / Waze
        </a>
        <a href="marketplace.html?farmer=${encodeURIComponent(f.farm_name)}" class="btn-secondary" style="padding: 0.65rem 0.85rem;">
          View Produce
        </a>
      </div>
    </div>
  `;

  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// -------------------------------------------------------------
// 5. TRACK ORDERS
// -------------------------------------------------------------
function renderOrderTrackingList() {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  const user = window.AgriState.user;
  const orders = window.AgriState.orders || [];

  if (orders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 1.5rem; background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
        <div style="width: 64px; height: 64px; border-radius: 9999px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </div>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.4rem;">
          No Orders Yet
        </h3>
        <p style="font-size: 0.925rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.75rem; line-height: 1.6;">
          You don't have any active orders right now. Explore fresh harvests in our marketplace and start your first purchase directly from verified Philippine farmers!
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <a href="marketplace.html" class="btn-primary" style="padding: 0.7rem 1.5rem; text-decoration: none; font-size: 0.875rem;">
            Start Your First Purchase &rarr;
          </a>
          ${!user ? `
            <a href="auth.html" class="btn-secondary" style="padding: 0.7rem 1.35rem; text-decoration: none; font-size: 0.875rem;">
              Log In / Register
            </a>
          ` : ''}
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const isDelivered = order.status === 'Delivered';
    const isInTransit = order.status === 'In Transit';

    return `
      <div id="order-${order.id}" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-sm); transition: border-color 0.3s ease, box-shadow 0.3s ease;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1rem; gap: 0.5rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Order ID</span>
            <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--primary-deep); font-family: monospace;">${order.id}</h4>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.75rem; color: var(--text-muted);">Status:</span>
            <div style="font-weight: 700; font-size: 0.9rem; color: ${isDelivered ? '#15803d' : isInTransit ? '#d97706' : '#2563eb'};">
              ${order.status}
            </div>
          </div>
        </div>

        <!-- Progress Timeline -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin: 1.25rem 0; text-align: center;">
          <div>
            <div style="width: 28px; height: 28px; border-radius: 9999px; background: #15803d; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; margin: 0 auto 0.25rem;">1</div>
            <span style="font-size: 0.75rem; font-weight: 700;">Confirmed</span>
          </div>
          <div>
            <div style="width: 28px; height: 28px; border-radius: 9999px; background: #15803d; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; margin: 0 auto 0.25rem;">2</div>
            <span style="font-size: 0.75rem; font-weight: 700;">Harvested</span>
          </div>
          <div>
            <div style="width: 28px; height: 28px; border-radius: 9999px; background: ${isInTransit || isDelivered ? '#15803d' : 'var(--bg-subtle)'}; color: ${isInTransit || isDelivered ? '#ffffff' : 'var(--text-light)'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; margin: 0 auto 0.25rem;">3</div>
            <span style="font-size: 0.75rem; font-weight: 700; color: ${isInTransit || isDelivered ? 'inherit' : 'var(--text-muted)'};">In Transit</span>
          </div>
          <div>
            <div style="width: 28px; height: 28px; border-radius: 9999px; background: ${isDelivered ? '#15803d' : 'var(--bg-subtle)'}; color: ${isDelivered ? '#ffffff' : 'var(--text-light)'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; margin: 0 auto 0.25rem;">4</div>
            <span style="font-size: 0.75rem; font-weight: 700; color: ${isDelivered ? 'inherit' : 'var(--text-muted)'};">Delivered</span>
          </div>
        </div>

        <!-- Live Vehicle & Route Details -->
        <div style="background: var(--bg-page); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1rem; margin-bottom: 1rem; font-size: 0.825rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span>Route: <strong>${order.origin || 'Benguet Farm Hub'} → ${order.destination || order.address}</strong></span>
            <span>ETA: <strong>${order.eta || 'Scheduled'}</strong></span>
          </div>
          ${order.driverName ? `
            <div style="color: var(--text-muted); font-size: 0.8rem; border-top: 1px solid var(--border-subtle); padding-top: 0.4rem;">
              Driver: <strong>${order.driverName}</strong> (${order.driverPhone})
            </div>
          ` : ''}
        </div>

        <!-- Items Summary -->
        <div style="font-size: 0.825rem; display: flex; justify-content: space-between; align-items: center;">
          <span>${order.items.length} product(s) ordered • Total: <strong>₱${order.total.toLocaleString()}</strong></span>
          <span style="color: var(--primary); font-weight: 600;">Payment: ${order.paymentMethod}</span>
        </div>
      </div>
    `;
  }).join('');
}

function handleTrackSearch() {
  const input = document.getElementById('trackingSearchInput');
  if (!input) return;
  const query = input.value.trim().toUpperCase();
  if (!query) {
    showToast('Please enter an Order ID to search.');
    return;
  }
  const order = window.AgriState.orders.find(o => o.id.toUpperCase() === query);
  if (order) {
    showToast(`Order found: ${order.id} is currently ${order.status}`);
    const el = document.getElementById(`order-${order.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.borderColor = '#15803d';
      el.style.boxShadow = '0 0 0 3px rgba(21, 128, 61, 0.25)';
      setTimeout(() => {
        el.style.borderColor = 'var(--border-subtle)';
        el.style.boxShadow = 'var(--shadow-sm)';
      }, 3500);
    }
  } else {
    showToast(`No order found with ID "${query}". Browse the marketplace to place your first order.`);
  }
}

// -------------------------------------------------------------
// 6. SHOPPING CART & CHECKOUT
// -------------------------------------------------------------
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
  showToast(`Item removed from cart`);
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
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main);">Your cart is empty</h4>
        <p style="font-size: 0.825rem; margin-top: 0.35rem;">Add fresh harvests from the marketplace to proceed.</p>
        <a href="marketplace.html" class="btn-primary" style="margin-top: 1.25rem;">
          Browse Marketplace
        </a>
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
    status: 'Order Confirmed',
    origin: window.AgriState.cart[0]?.farmer_name || 'Farm Hub',
    destination: formData.get('city')
  };

  window.AgriState.orders.unshift(newOrder);
  localStorage.setItem('agri_orders', JSON.stringify(window.AgriState.orders));

  window.AgriState.cart = [];
  saveCart();
  updateCartBadge();

  closeCheckoutModal();
  showOrderSuccessModal(newOrder);
  if (document.getElementById('ordersListContainer')) {
    renderOrderTrackingList();
  }
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
        Your order has been routed directly to the farm for morning harvest.
      </p>

      <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 1rem; margin: 1.25rem 0; text-align: left; font-size: 0.85rem;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem; margin-bottom: 0.4rem;">
          <span style="color: var(--text-muted);">Tracking Number:</span>
          <strong style="color: var(--primary-deep); font-family: monospace;">${order.id}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
          <span style="color: var(--text-muted);">Destination:</span>
          <span>${order.address}</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.4rem; font-size: 0.95rem;">
          <strong>Total:</strong>
          <strong style="color: var(--primary-deep);">₱${order.total.toLocaleString()}</strong>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <a href="track-orders.html" class="btn-primary" style="flex: 1; text-align: center; justify-content: center;">
          Open Order Tracker
        </a>
        <button onclick="closeSuccessModal();" class="btn-secondary">
          Close
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

// -------------------------------------------------------------
// 7. PRODUCT DETAIL MODAL
// -------------------------------------------------------------
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
              Direct Farm Harvest
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
            <a href="farmers.html#${p.farmer_id || ''}" style="font-size: 0.75rem; color: var(--primary); font-weight: 700; text-decoration: none;">View Farm Profile →</a>
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

// -------------------------------------------------------------
// 8. FARMER LISTING MODAL
// -------------------------------------------------------------
function openSellHarvestModal() {
  const user = window.AgriState.user;
  if (!user) {
    showToast('The "Sell Harvest" feature is only available for registered farmer accounts. Please log in or create a farmer account.');
    setTimeout(() => {
      window.location.href = 'auth.html';
    }, 800);
    return;
  }
  if (user.role !== 'farmer') {
    showToast('You are currently signed in as a Buyer. Only verified Farmer accounts can list produce for sale.');
    return;
  }
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
    suggested = { min: 2300, max: 2600, unit: 'sack (50kg)', tip: 'Direct wholesale to consumers without trader markdown.' };
  } else if (crop.includes('cabbage') || crop.includes('bean') || crop.includes('baguio')) {
    suggested = { min: 65, max: 110, unit: 'kg', tip: 'Benguet highland supply is steady.' };
  } else if (crop.includes('bangus') || crop.includes('fish')) {
    suggested = { min: 180, max: 240, unit: 'kg', tip: 'Daily market rates in Navotas support this range.' };
  } else if (crop.includes('egg') || crop.includes('itlog')) {
    suggested = { min: 240, max: 280, unit: 'tray (30s)', tip: 'Consistent daily household demand.' };
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

  if (document.getElementById('productsGrid')) {
    renderCategories();
    renderProducts();
  }
  showToast(`Listing "${newProd.name}" published successfully`);
}

// -------------------------------------------------------------
// 8. HELPERS & GENERAL LISTENERS
// -------------------------------------------------------------
function setCategory(cat) {
  window.AgriState.currentCategory = cat;
  renderCategories();
  renderProducts();
}

function filterByFarmer(farmerName) {
  window.AgriState.currentFarmerFilter = farmerName;
  if (window.location.pathname.includes('marketplace.html')) {
    renderProducts();
  } else {
    window.location.href = `marketplace.html?farmer=${encodeURIComponent(farmerName)}`;
  }
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
  window.AgriState.inStockOnly = false;
  window.AgriState.sortBy = 'newest';

  const s = document.getElementById('searchInput');
  if (s) s.value = '';
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
  showToast(`Switched to ${mode === 'farmer' ? 'Farmer' : 'Buyer'} Mode`);
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

function toggleMobileNav() {
  const nav = document.getElementById('headerNav');
  if (nav) nav.classList.toggle('mobile-open');
}

function initUIListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      window.AgriState.searchQuery = e.target.value;
      renderProducts();
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

// -------------------------------------------------------------
// 9. AUTHENTICATION (LOG IN & CREATE ACCOUNT)
// -------------------------------------------------------------
function initAuthPage() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode') || params.get('tab');
  if (mode === 'signup' || mode === 'register' || mode === 'create') {
    switchAuthTab('signup');
  } else {
    switchAuthTab('login');
  }
}

function switchAuthTab(tab) {
  const loginTabBtn = document.getElementById('loginTabBtn');
  const signupTabBtn = document.getElementById('signupTabBtn');
  const loginFormSection = document.getElementById('loginFormSection');
  const signupFormSection = document.getElementById('signupFormSection');

  if (!loginFormSection || !signupFormSection) return;

  if (tab === 'signup') {
    if (loginTabBtn) {
      loginTabBtn.classList.remove('active');
      loginTabBtn.style.color = 'var(--text-secondary)';
      loginTabBtn.style.background = 'transparent';
      loginTabBtn.style.boxShadow = 'none';
    }
    if (signupTabBtn) {
      signupTabBtn.classList.add('active');
      signupTabBtn.style.color = 'var(--primary-deep)';
      signupTabBtn.style.background = '#ffffff';
      signupTabBtn.style.boxShadow = 'var(--shadow-sm)';
    }
    loginFormSection.style.display = 'none';
    signupFormSection.style.display = 'block';
  } else {
    if (loginTabBtn) {
      loginTabBtn.classList.add('active');
      loginTabBtn.style.color = 'var(--primary-deep)';
      loginTabBtn.style.background = '#ffffff';
      loginTabBtn.style.boxShadow = 'var(--shadow-sm)';
    }
    if (signupTabBtn) {
      signupTabBtn.classList.remove('active');
      signupTabBtn.style.color = 'var(--text-secondary)';
      signupTabBtn.style.background = 'transparent';
      signupTabBtn.style.boxShadow = 'none';
    }
    loginFormSection.style.display = 'block';
    signupFormSection.style.display = 'none';
  }
}

function setAuthRole(role) {
  const roleInput = document.getElementById('registerRoleInput');
  const buyerCard = document.getElementById('roleCardBuyer');
  const farmerCard = document.getElementById('roleCardFarmer');
  const farmerFields = document.getElementById('farmerExtraFields');

  if (roleInput) roleInput.value = role;

  if (role === 'farmer') {
    if (farmerCard) {
      farmerCard.style.borderColor = 'var(--primary)';
      farmerCard.style.background = 'var(--primary-light)';
    }
    if (buyerCard) {
      buyerCard.style.borderColor = 'var(--border-subtle)';
      buyerCard.style.background = '#ffffff';
    }
    if (farmerFields) farmerFields.style.display = 'block';
  } else {
    if (buyerCard) {
      buyerCard.style.borderColor = 'var(--primary)';
      buyerCard.style.background = 'var(--primary-light)';
    }
    if (farmerCard) {
      farmerCard.style.borderColor = 'var(--border-subtle)';
      farmerCard.style.background = '#ffffff';
    }
    if (farmerFields) farmerFields.style.display = 'none';
  }
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;
  } else {
    input.type = 'password';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value;

  if (!email || !password) {
    showToast('Please enter both email and password.');
    return;
  }

  // Check saved registered users
  const registeredUsers = JSON.parse(localStorage.getItem('agri_users') || '[]');
  let matchedUser = registeredUsers.find(u => u.email.toLowerCase() === email);

  // Pre-seeded accounts fallback for convenience
  if (!matchedUser) {
    if (email.includes('farmer') || email.includes('ramon')) {
      matchedUser = {
        id: 'farmer-ramon',
        full_name: 'Mang Ramon Dela Cruz',
        email: email,
        role: 'farmer',
        farm_name: 'Dela Cruz Family Farm',
        province: 'Benguet',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'
      };
    } else {
      matchedUser = {
        id: 'user-' + Date.now(),
        full_name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
        email: email,
        role: 'buyer',
        avatar: null
      };
    }
  }

  // Persist session
  window.AgriState.user = matchedUser;
  localStorage.setItem('agri_user', JSON.stringify(matchedUser));

  if (matchedUser.role === 'farmer') {
    window.AgriState.currentMode = 'farmer';
    localStorage.setItem('agri_mode', 'farmer');
  }

  updateAuthUI();
  showToast(`Welcome back, ${matchedUser.full_name}!`);

  setTimeout(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect') || (matchedUser.role === 'farmer' ? 'farmers.html' : 'marketplace.html');
    window.location.href = redirectUrl;
  }, 600);
}

// -------------------------------------------------------------
// PASSWORD STRENGTH & REAL-TIME VALIDATION
// -------------------------------------------------------------
function evaluatePasswordStrength(pwd) {
  if (!pwd) {
    return {
      score: 0,
      level: 'none',
      badge: 'Enter password',
      prompt: 'Password must be at least 8 characters long. Mix letters, numbers, and symbols for strong protection.',
      meetsRequirement: false,
      criteria: { length: false, mix: false, symbolOrUpper: false }
    };
  }

  const hasMinLength = pwd.length >= 8;
  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

  const categoriesCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  const hasMix = (hasLower || hasUpper) && hasNumber;
  const hasSymbolOrUpper = hasUpper || hasSpecial;

  // Detect simple repetitive, sequential or dictionary weak passwords
  const isCommonPattern = /^(12345678|password|password1|qwertyuiop|11111111|123456789|admin123|abcdefgh|agriconnect)$/i.test(pwd);
  const isAllNumbers = /^\d+$/.test(pwd);
  const isAllLetters = /^[a-zA-Z]+$/.test(pwd);

  // Less than 8 characters is strictly weak
  if (!hasMinLength) {
    return {
      score: 1,
      level: 'weak',
      badge: 'Too Short (Weak)',
      prompt: `⚠️ Password is too short (${pwd.length}/8 characters). Must be at least 8 characters long.`,
      meetsRequirement: false,
      criteria: { length: false, mix: hasMix, symbolOrUpper: hasSymbolOrUpper }
    };
  }

  // 8+ chars but common pattern, all digits, or only single-case letters without numbers or symbols
  if (isCommonPattern || isAllNumbers || (isAllLetters && categoriesCount < 2) || categoriesCount < 2) {
    return {
      score: 1,
      level: 'weak',
      badge: 'Weak Password',
      prompt: '⚠️ Weak password detected! Avoid simple words or only numbers. Add letters, numbers, or symbols.',
      meetsRequirement: false,
      criteria: { length: true, mix: hasMix, symbolOrUpper: hasSymbolOrUpper }
    };
  }

  // Meets strength requirement (8+ chars and at least 2 categories)
  let score = 2; // Fair/Good
  if (hasMix) score++;
  if (categoriesCount >= 3 || (hasSymbolOrUpper && pwd.length >= 10)) score++;

  if (score === 2) {
    return {
      score: 2,
      level: 'fair',
      badge: 'Fair (Meets Requirement)',
      prompt: '✓ Password meets strength requirement! Add numbers or symbols to make it even stronger.',
      meetsRequirement: true,
      criteria: { length: true, mix: hasMix, symbolOrUpper: hasSymbolOrUpper }
    };
  } else if (score === 3) {
    return {
      score: 3,
      level: 'good',
      badge: 'Good Password',
      prompt: '✓ Good strong password! Meets account security requirements.',
      meetsRequirement: true,
      criteria: { length: true, mix: true, symbolOrUpper: hasSymbolOrUpper }
    };
  } else {
    return {
      score: 4,
      level: 'strong',
      badge: 'Strong Password',
      prompt: '✓ Excellent security! Strong combination of characters.',
      meetsRequirement: true,
      criteria: { length: true, mix: true, symbolOrUpper: true }
    };
  }
}

function handlePasswordInput(pwd) {
  const strength = evaluatePasswordStrength(pwd);
  const badge = document.getElementById('passwordStrengthBadge');
  const promptEl = document.getElementById('passwordPromptMsg');
  const bar1 = document.getElementById('strengthBar1');
  const bar2 = document.getElementById('strengthBar2');
  const bar3 = document.getElementById('strengthBar3');
  const bar4 = document.getElementById('strengthBar4');
  const critLength = document.getElementById('critLength');
  const critMix = document.getElementById('critMix');
  const critSymbol = document.getElementById('critSymbol');
  const pwdInput = document.getElementById('signupPassword');

  if (!badge || !bar1) return;

  const resetBar = (el) => { if (el) el.style.background = 'var(--border-strong)'; };
  resetBar(bar1); resetBar(bar2); resetBar(bar3); resetBar(bar4);

  if (strength.score === 0) {
    badge.textContent = 'Enter password';
    badge.style.color = 'var(--text-muted)';
    if (pwdInput) pwdInput.style.borderColor = 'var(--border-strong)';
  } else if (strength.level === 'weak') {
    badge.textContent = strength.badge;
    badge.style.color = '#ef4444';
    bar1.style.background = '#ef4444';
    if (pwdInput) pwdInput.style.borderColor = '#ef4444';
  } else if (strength.level === 'fair') {
    badge.textContent = strength.badge;
    badge.style.color = '#f59e0b';
    bar1.style.background = '#f59e0b';
    bar2.style.background = '#f59e0b';
    if (pwdInput) pwdInput.style.borderColor = '#f59e0b';
  } else if (strength.level === 'good') {
    badge.textContent = strength.badge;
    badge.style.color = '#16a34a';
    bar1.style.background = '#16a34a';
    bar2.style.background = '#16a34a';
    bar3.style.background = '#16a34a';
    if (pwdInput) pwdInput.style.borderColor = '#16a34a';
  } else if (strength.level === 'strong') {
    badge.textContent = strength.badge;
    badge.style.color = '#15803d';
    bar1.style.background = '#15803d';
    bar2.style.background = '#15803d';
    bar3.style.background = '#15803d';
    bar4.style.background = '#15803d';
    if (pwdInput) pwdInput.style.borderColor = '#15803d';
  }

  if (promptEl) {
    promptEl.textContent = strength.prompt;
    promptEl.style.color = strength.level === 'weak' ? '#dc2626' : (strength.meetsRequirement ? '#15803d' : 'var(--text-secondary)');
  }

  // Update criteria checklist
  const updateCrit = (el, passed) => {
    if (!el) return;
    const icon = el.querySelector('.crit-icon');
    if (passed) {
      el.style.background = '#dcfce7';
      el.style.color = '#166534';
      if (icon) icon.textContent = '✓';
    } else {
      el.style.background = 'rgba(0,0,0,0.04)';
      el.style.color = 'var(--text-muted)';
      if (icon) icon.textContent = '○';
    }
  };

  updateCrit(critLength, strength.criteria.length);
  updateCrit(critMix, strength.criteria.mix);
  updateCrit(critSymbol, strength.criteria.symbolOrUpper);
}

function handleConfirmPasswordInput(confirmPwd) {
  const pwdInput = document.getElementById('signupPassword');
  const confirmInput = document.getElementById('signupConfirmPassword');
  if (!pwdInput || !confirmInput) return;

  if (!confirmPwd) {
    confirmInput.style.borderColor = 'var(--border-strong)';
    return;
  }

  if (confirmPwd === pwdInput.value) {
    confirmInput.style.borderColor = '#15803d';
  } else {
    confirmInput.style.borderColor = '#ef4444';
  }
}

function handleRegister(e) {
  e.preventDefault();
  const form = e.target;
  const fullName = form.fullName.value.trim();
  const email = form.email.value.trim().toLowerCase();
  const phone = form.phone.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  const role = form.role.value || 'buyer';
  const farmName = form.farmName ? form.farmName.value.trim() : '';
  const province = form.province ? form.province.value.trim() : '';
  const specialty = form.specialty ? form.specialty.value.trim() : '';

  if (password !== confirmPassword) {
    showToast('Passwords do not match. Please re-enter.');
    const confirmInput = document.getElementById('signupConfirmPassword');
    if (confirmInput) {
      confirmInput.focus();
      confirmInput.style.borderColor = '#ef4444';
    }
    return;
  }

  if (password.length < 8) {
    showToast('Password must be at least 8 characters long.');
    const pwdInput = document.getElementById('signupPassword');
    if (pwdInput) {
      pwdInput.focus();
      pwdInput.style.borderColor = '#ef4444';
    }
    return;
  }

  const strength = evaluatePasswordStrength(password);
  if (!strength.meetsRequirement) {
    showToast('Weak password detected! Please use at least 8 characters with a combination of letters, numbers, or symbols.');
    const pwdInput = document.getElementById('signupPassword');
    if (pwdInput) {
      pwdInput.focus();
      pwdInput.style.borderColor = '#ef4444';
    }
    return;
  }

  const newUser = {
    id: 'user-' + Date.now(),
    full_name: fullName,
    email: email,
    phone: phone,
    role: role,
    farm_name: farmName || (role === 'farmer' ? `${fullName}'s Farm` : ''),
    province: province || 'Luzon',
    specialty: specialty || 'Fresh Agricultural Produce',
    createdAt: new Date().toISOString()
  };

  // Save to registered list
  const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
  const existingIdx = users.findIndex(u => u.email.toLowerCase() === email);
  if (existingIdx >= 0) {
    users[existingIdx] = newUser;
  } else {
    users.push(newUser);
  }
  localStorage.setItem('agri_users', JSON.stringify(users));

  // If farmer, add to local farmer directory as well
  if (role === 'farmer') {
    const newFarmer = {
      id: newUser.id,
      full_name: newUser.full_name,
      farm_name: newUser.farm_name,
      city: 'Local Municipality',
      province: newUser.province,
      address: `${newUser.province}, Philippines`,
      bio: `Direct farmer partner on AgriConnect specializing in ${newUser.specialty}.`,
      rating: 5.0,
      reviewsCount: 1,
      verified: true,
      phone: newUser.phone,
      pickupHours: '7:00 AM – 4:00 PM (Mon-Sat)',
      specialty: newUser.specialty,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'
    };
    window.AgriState.farmers.unshift(newFarmer);
    window.AgriState.currentMode = 'farmer';
    localStorage.setItem('agri_mode', 'farmer');
  }

  // Persist current session
  window.AgriState.user = newUser;
  localStorage.setItem('agri_user', JSON.stringify(newUser));

  updateAuthUI();
  showToast(`Account created successfully! Welcome, ${newUser.full_name}.`);

  setTimeout(() => {
    window.location.href = role === 'farmer' ? 'farmers.html' : 'marketplace.html';
  }, 700);
}

function loginDemoUser(role) {
  let demoUser;
  if (role === 'farmer') {
    demoUser = {
      id: 'farmer-ramon',
      full_name: 'Mang Ramon Dela Cruz',
      email: 'ramon.delacruz@benguetfarm.ph',
      role: 'farmer',
      farm_name: 'Dela Cruz Family Farm',
      province: 'Benguet',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'
    };
    window.AgriState.currentMode = 'farmer';
    localStorage.setItem('agri_mode', 'farmer');
  } else {
    demoUser = {
      id: 'buyer-juan',
      full_name: 'Juan Dela Cruz',
      email: 'juan.delacruz@consumer.ph',
      role: 'buyer',
      farm_name: '',
      province: 'Metro Manila',
      avatar: null
    };
    window.AgriState.currentMode = 'buyer';
    localStorage.setItem('agri_mode', 'buyer');
  }

  window.AgriState.user = demoUser;
  localStorage.setItem('agri_user', JSON.stringify(demoUser));

  updateAuthUI();
  showToast(`Logged in as ${demoUser.full_name} (${demoUser.role.toUpperCase()})`);

  setTimeout(() => {
    window.location.href = role === 'farmer' ? 'farmers.html' : 'marketplace.html';
  }, 500);
}

function handleLogout() {
  window.AgriState.user = null;
  localStorage.removeItem('agri_user');
  updateAuthUI();
  showToast('You have been signed out.');
  if (window.location.pathname.includes('auth.html')) {
    switchAuthTab('login');
  } else {
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }
}

function updateAuthUI() {
  const container = document.getElementById('userAuthContainer');
  const user = window.AgriState.user;
  const isFarmer = Boolean(user && user.role === 'farmer');

  // Toggle body role classes
  if (document.body) {
    document.body.classList.toggle('is-farmer', isFarmer);
    document.body.classList.toggle('is-buyer', Boolean(user && user.role !== 'farmer'));
  }

  // Toggle "Sell Harvest" buttons (only available once a farmer account is logged in)
  const sellBtns = document.querySelectorAll('.sell-harvest-btn');
  sellBtns.forEach(btn => {
    if (isFarmer) {
      if (btn.classList.contains('sell-harvest-mobile-btn') || btn.classList.contains('sell-harvest-block')) {
        btn.style.setProperty('display', 'block', 'important');
      } else {
        btn.style.setProperty('display', 'inline-flex', 'important');
      }
    } else {
      btn.style.setProperty('display', 'none', 'important');
    }
  });

  if (!container) return;

  if (user && user.full_name) {
    const initials = user.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    container.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <div style="width: 32px; height: 32px; border-radius: 9999px; background: var(--primary); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0; box-shadow: var(--shadow-sm);">
          ${initials}
        </div>
        <div style="display: flex; flex-direction: column; line-height: 1.15; text-align: left;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">${user.full_name}</span>
          <span style="font-size: 0.68rem; color: var(--primary); font-weight: 700; text-transform: uppercase;">${user.role === 'farmer' ? 'Farmer' : 'Buyer'}</span>
        </div>
        <button onclick="handleLogout()" class="btn-secondary" style="font-size: 0.725rem; padding: 0.25rem 0.55rem; border-color: var(--border-subtle);" title="Log out">
          Sign Out
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <a href="auth.html" class="btn-secondary" style="font-size: 0.825rem; padding: 0.45rem 0.85rem; text-decoration: none;">
        Log In / Register
      </a>
    `;
  }
}
