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
  initCartPreview();
  updateAuthUI();
  await loadInitialData();
  initAgriMate();

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
  if (document.getElementById('buyerDashboardView') || document.getElementById('farmerOrdersList')) {
    initDashboard();
  }
  if (document.getElementById('farmerProfilePageContainer') || document.getElementById('profileName')) {
    initProfilePage();
  }
  if (document.getElementById('sellHarvestPageContainer') || document.getElementById('sellHarvestPageForm')) {
    initSellHarvestPage();
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
    category_name: p.categories?.name || 'Product',
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

  try {
    const customListings = JSON.parse(localStorage.getItem('agri_custom_products') || '[]');
    if (Array.isArray(customListings) && customListings.length > 0) {
      window.AgriState.products.unshift(...customListings);
    }
  } catch (e) {
    console.warn('Could not parse custom products', e);
  }
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

function isUserOwnProduct(product) {
  if (!product) return false;
  const user = window.AgriState.user;
  if (!user || user.role !== 'farmer') return false;

  // 1. Check direct farmer_id match or demo alias
  if (product.farmer_id) {
    if (product.farmer_id === user.id) return true;
    if (user.id === 'farmer-ramon' && product.farmer_id === 'farmer-ramon') return true;
  }

  // 2. Check farm name
  if (user.farm_name && product.farmer_name) {
    const uFarm = user.farm_name.toLowerCase().trim();
    const pFarm = product.farmer_name.toLowerCase().trim();
    if (uFarm === pFarm || pFarm.includes(uFarm) || uFarm.includes(pFarm)) return true;
  }

  // 3. Check full name in farmer_name
  if (user.full_name && product.farmer_name) {
    const uName = user.full_name.toLowerCase().trim();
    const pFarm = product.farmer_name.toLowerCase().trim();
    if (pFarm.includes(uName)) return true;
  }

  return false;
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

  container.innerHTML = list.map(p => {
    const isOwn = isUserOwnProduct(p);
    return `
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
            ${isOwn ? `
              <span style="font-size: 0.725rem; font-weight: 700; color: #15803d; background: #dcfce7; border: 1px solid #86efac; border-radius: 9999px; padding: 0.35rem 0.65rem; display: inline-flex; align-items: center; gap: 0.25rem;" title="You are the registered producer of this harvest. Direct producer listings cannot be self-purchased.">
                🌱 Your Harvest
              </span>
            ` : `
              <button onclick="addToCart('${p.id}', 1, this)" class="btn-primary" style="padding: 0.45rem 0.85rem; font-size: 0.8rem;" title="Add 1 ${p.unit}">
                + Add
              </button>
            `}
          </div>
        </div>
      </div>
    </div>
  `}).join('');
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
                    ${isUserOwnProduct(p) ? `
                      <span style="font-size: 0.7rem; font-weight: 700; color: #15803d; background: #dcfce7; border-radius: 4px; padding: 0.25rem 0.5rem;" title="You are the registered producer of this harvest. Farmers cannot purchase their own product.">
                        Your Listing
                      </span>
                    ` : `
                      <button onclick="addToCart('${p.id}', 1, this)" class="btn-primary" style="padding: 0.35rem 0.65rem; font-size: 0.775rem;">
                        + Add
                      </button>
                    `}
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
          View Product
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
  const isFarmer = Boolean(user && user.role === 'farmer');

  // Update Page Headers & Search Placeholder based on Role
  const titleEl = document.getElementById('trackPageTitle');
  const subtitleEl = document.getElementById('trackPageSubtitle');
  const tagEl = document.getElementById('trackPageTag');
  const searchInput = document.getElementById('trackingSearchInput');

  if (isFarmer) {
    if (titleEl) titleEl.textContent = "Track Buyers' Orders";
    if (subtitleEl) subtitleEl.textContent = "Monitor real-time fulfillment, cold-chain transit, and remaining arrival times (in days or minutes) before your farm's harvest reaches each buyer.";
    if (tagEl) tagEl.textContent = "PRODUCER LOGISTICS & BUYER FULFILLMENT";
    if (searchInput) searchInput.placeholder = "Enter Buyer Order ID (e.g. ORD-8491) or Buyer Name";
  } else {
    if (titleEl) titleEl.textContent = "Track Your Farm Orders";
    if (subtitleEl) subtitleEl.textContent = "Follow your harvest from the morning pick in Benguet or Nueva Ecija through temperature-controlled transit directly to your door.";
    if (tagEl) tagEl.textContent = "Cold-Chain Real-Time Monitoring";
    if (searchInput) searchInput.placeholder = "Enter Order ID to track";
  }

  // -----------------------------------------------------------
  // FARMER VIEW: Track Buyers' Orders
  // -----------------------------------------------------------
  if (isFarmer) {
    const orders = getFarmerOrders();

    if (orders.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1.5rem; background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
          <div style="width: 64px; height: 64px; border-radius: 9999px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              <path d="m9 14 2 2 4-4"/>
            </svg>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.4rem;">
            No Buyer Orders Received Yet
          </h3>
          <p style="font-size: 0.925rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.75rem; line-height: 1.6;">
            When buyers order fresh harvests from your farm, their live cold-chain transit and remaining delivery times will appear here!
          </p>
          <a href="sell-harvest.html" class="btn-primary" style="padding: 0.7rem 1.5rem; text-decoration: none; font-size: 0.875rem;">
            Manage Harvest Listings &rarr;
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => {
      const isDelivered = order.status_code === 'delivered' || (order.status || '').toLowerCase().includes('delivered');
      const isInTransit = order.status_code === 'in_transit' || (order.status || '').toLowerCase().includes('transit');
      const step = isDelivered ? 4 : (isInTransit ? 3 : 2);

      // Remaining time display formatting
      let remainingDisplay = order.remaining_time;
      if (!remainingDisplay) {
        if (isDelivered) remainingDisplay = "Delivered to Buyer (0 mins remaining)";
        else if (order.id === 'ORD-8491') remainingDisplay = "45 minutes remaining";
        else if (order.id === 'ORD-8495') remainingDisplay = "2 hours 15 minutes remaining";
        else remainingDisplay = "1 day remaining (Tomorrow)";
      }

      return `
        <div id="order-${order.id}" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.6rem; margin-bottom: 1.75rem; box-shadow: var(--shadow-sm); transition: border-color 0.3s ease, box-shadow 0.3s ease;">
          <!-- Top Row: Order ID, Timestamp, and Live Status Badge -->
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem; margin-bottom: 1rem; gap: 0.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 0.7rem; color: #15803d; background: #dcfce7; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 9999px; text-transform: uppercase;">BUYER ORDER</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Placed: ${order.placed_at || 'Recently'}</span>
              </div>
              <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-deep); font-family: monospace; margin: 0.25rem 0 0;">${order.id}</h4>
            </div>

            <div style="text-align: right;">
              <span style="font-size: 0.725rem; color: var(--text-muted); font-weight: 600;">Status:</span>
              <div style="font-weight: 800; font-size: 0.95rem; color: ${isDelivered ? '#15803d' : isInTransit ? '#b45309' : '#2563eb'};">
                ${isDelivered ? '✓ Delivered to Buyer' : isInTransit ? '🚚 In Cold-Chain Transit' : '⏳ Harvesting & Packing'}
              </div>
            </div>
          </div>

          <!-- PROMINENT REMAINING TIME CALLOUT (In days or minutes) -->
          <div style="background: ${isDelivered ? '#f0fdf4' : '#fefce8'}; border: 1.5px solid ${isDelivered ? '#bbf7d0' : '#fde047'}; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.85rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: ${isDelivered ? '#15803d' : '#ca8a04'}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; box-shadow: 0 2px 8px rgba(0,0,0,0.12); flex-shrink: 0;">
                ${isDelivered ? '✓' : '⏱️'}
              </div>
              <div>
                <div style="font-size: 0.725rem; color: ${isDelivered ? '#166534' : '#854d0e'}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">
                  ${isDelivered ? 'Fulfillment Reached Buyer' : 'Remaining Time Before Reaching Buyer'}
                </div>
                <div style="font-size: 1.35rem; font-weight: 800; color: ${isDelivered ? '#15803d' : '#a16207'}; line-height: 1.2; margin-top: 0.1rem;">
                  ${remainingDisplay}
                </div>
              </div>
            </div>

            <div style="text-align: right;">
              <span style="font-size: 0.725rem; color: var(--text-muted); font-weight: 600;">Expected Arrival at Buyer:</span>
              <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); font-family: monospace;">
                ${order.eta || 'Today, 11:15 AM'}
              </div>
            </div>
          </div>

          <!-- 4-Step Cold-Chain Stepper -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin: 1.25rem 0 1.5rem; text-align: center;">
            <div>
              <div style="width: 32px; height: 32px; border-radius: 9999px; background: #15803d; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; margin: 0 auto 0.35rem;">1</div>
              <span style="font-size: 0.75rem; font-weight: 700; color: #15803d;">Confirmed</span>
            </div>
            <div>
              <div style="width: 32px; height: 32px; border-radius: 9999px; background: ${step >= 2 ? '#15803d' : 'var(--bg-subtle)'}; color: ${step >= 2 ? '#ffffff' : 'var(--text-light)'}; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; margin: 0 auto 0.35rem;">2</div>
              <span style="font-size: 0.75rem; font-weight: 700; color: ${step >= 2 ? '#15803d' : 'var(--text-muted)'};">Harvested</span>
            </div>
            <div>
              <div style="width: 32px; height: 32px; border-radius: 9999px; background: ${step >= 3 ? '#15803d' : 'var(--bg-subtle)'}; color: ${step >= 3 ? '#ffffff' : 'var(--text-light)'}; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; margin: 0 auto 0.35rem;">3</div>
              <span style="font-size: 0.75rem; font-weight: 700; color: ${step >= 3 ? '#15803d' : 'var(--text-muted)'};">In Transit</span>
            </div>
            <div>
              <div style="width: 32px; height: 32px; border-radius: 9999px; background: ${step >= 4 ? '#15803d' : 'var(--bg-subtle)'}; color: ${step >= 4 ? '#ffffff' : 'var(--text-light)'}; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; margin: 0 auto 0.35rem;">4</div>
              <span style="font-size: 0.75rem; font-weight: 700; color: ${step >= 4 ? '#15803d' : 'var(--text-muted)'};">Reached Buyer</span>
            </div>
          </div>

          <!-- Buyer Customer & Transit Information -->
          <div style="background: var(--bg-page); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem 1.15rem; margin-bottom: 1rem; font-size: 0.85rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
            <div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Buyer Customer</div>
              <div style="font-weight: 800; color: var(--text-main); margin-top: 0.15rem;">${order.customer_name}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.1rem;">📞 ${order.customer_phone}</div>
            </div>
            <div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Buyer Shipping Address</div>
              <div style="font-weight: 700; color: var(--text-main); margin-top: 0.15rem;">📍 ${order.delivery_address}</div>
            </div>
            <div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Logistics Routing</div>
              <div style="font-weight: 700; color: var(--text-main); margin-top: 0.15rem;">🚚 ${order.delivery_method || 'AgriConnect Cold-Chain Van'}</div>
              <div style="font-size: 0.75rem; color: #166534; font-weight: 700; margin-top: 0.1rem;">❄️ ${order.temp_c || '4.2°C Temperature Verified'}</div>
            </div>
          </div>

          <!-- Items Ordered & Farmgate Payout -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 0.85rem;">
            <div>
              <div style="font-size: 0.825rem; color: var(--text-main); font-weight: 600;">
                ${(order.items || []).map(i => `<strong>${i.quantity} ${i.unit}</strong> × ${i.name}`).join(' • ')}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
                Direct Farmgate Payout: Guaranteed 100% to farmer with zero middleman deductions.
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="text-align: right;">
                <div style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Direct Farm Payout</div>
                <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary-deep);">₱${(order.total_amount || 0).toLocaleString()}</div>
              </div>

              <div style="display: flex; gap: 0.4rem;">
                ${!isDelivered ? `
                  <button onclick="updateFarmerOrderStatus('${order.id}', 'delivered')" class="btn-primary" style="font-size: 0.775rem; padding: 0.45rem 0.85rem; font-weight: 700;">
                    ✓ Mark Delivered to Buyer
                  </button>
                ` : `
                  <button onclick="updateFarmerOrderStatus('${order.id}', 'in_transit')" class="btn-secondary" style="font-size: 0.75rem; padding: 0.4rem 0.65rem;" title="Re-open transit status">
                    ↺ In Transit
                  </button>
                `}
                <button onclick="openFarmerOrderDetailsModal('${order.id}')" class="btn-secondary" style="font-size: 0.775rem; padding: 0.45rem 0.75rem;">
                  🖨️ Slip / Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    return;
  }

  // -----------------------------------------------------------
  // BUYER / GUEST VIEW: Track Your Farm Orders
  // -----------------------------------------------------------
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

  const user = window.AgriState.user;
  const isFarmer = Boolean(user && user.role === 'farmer');

  if (isFarmer) {
    const orders = getFarmerOrders();
    const order = orders.find(o => o.id.toUpperCase().includes(query) || (o.customer_name && o.customer_name.toUpperCase().includes(query)));
    if (order) {
      showToast(`Found: ${order.id} (${order.customer_name}) • ${order.remaining_time || order.status}`);
      const el = document.getElementById(`order-${order.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.borderColor = '#15803d';
        el.style.boxShadow = '0 0 0 4px rgba(21, 128, 61, 0.35)';
        setTimeout(() => {
          el.style.borderColor = 'var(--border-subtle)';
          el.style.boxShadow = 'var(--shadow-sm)';
        }, 3500);
      }
    } else {
      showToast(`No buyer order found matching "${query}".`);
    }
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
function addToCart(productId, quantity = 1, btnElement = null) {
  const user = window.AgriState.user;
  if (!user) {
    showToast('Please log in to your account before adding items to the cart.');
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.remove('open');
    setTimeout(() => {
      const page = window.location.pathname.split('/').pop() || 'marketplace.html';
      const search = window.location.search || '';
      window.location.href = `auth.html?redirect=${encodeURIComponent(page + search)}`;
    }, 800);
    return;
  }

  const p = window.AgriState.products.find(item => item.id === productId);
  if (!p) return;

  if (isUserOwnProduct(p)) {
    showToast('As a producer, you cannot purchase your own harvest listing.');
    return;
  }

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
  updateCartBadge(true);
  renderCartPreview();
  renderCartDrawer();
  showToast(`Added ${quantity} ${p.unit} of ${p.name} to cart`);

  // Instant visual button feedback if clicked from UI
  if (!btnElement && window.event && window.event.currentTarget) {
    btnElement = window.event.currentTarget;
  }
  if (btnElement && btnElement.tagName === 'BUTTON') {
    const origHtml = btnElement.innerHTML;
    btnElement.innerHTML = `✓ Added`;
    btnElement.style.background = '#15803d';
    btnElement.style.borderColor = '#15803d';
    btnElement.style.color = '#ffffff';
    setTimeout(() => {
      btnElement.innerHTML = origHtml;
      btnElement.style.background = '';
      btnElement.style.borderColor = '';
      btnElement.style.color = '';
    }, 1200);
  }
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
    renderCartPreview();
    updateCartBadge();
  }
}

function removeFromCart(productId) {
  window.AgriState.cart = window.AgriState.cart.filter(i => i.id !== productId);
  saveCart();
  renderCartDrawer();
  renderCartPreview();
  updateCartBadge();
  showToast(`Item removed from cart`);
}

function saveCart() {
  localStorage.setItem('agri_cart', JSON.stringify(window.AgriState.cart));
}

function updateCartBadge(shouldBump = false) {
  const user = window.AgriState.user;
  const isFarmer = Boolean(user && user.role === 'farmer');

  if (isFarmer) {
    const orders = getFarmerOrders();
    const pendingCount = orders.filter(o => o.status_code === 'pending').length;
    const badges = document.querySelectorAll('.cart-badge, .farmer-orders-badge');
    badges.forEach(b => {
      b.textContent = pendingCount;
      b.style.display = pendingCount > 0 ? 'inline-flex' : 'none';
      b.style.background = '#d97706';
      b.style.color = '#ffffff';
      b.title = `${pendingCount} orders pending harvest`;
      if (shouldBump) {
        b.classList.remove('bump');
        void b.offsetWidth;
        b.classList.add('bump');
        setTimeout(() => b.classList.remove('bump'), 300);
      }
    });
    return;
  }

  const badges = document.querySelectorAll('.cart-badge');
  const count = (window.AgriState.cart || []).reduce((sum, item) => sum + item.quantity, 0);
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
    b.style.background = 'var(--primary)';
    b.style.color = '#ffffff';
    if (shouldBump) {
      b.classList.remove('bump');
      void b.offsetWidth;
      b.classList.add('bump');
      setTimeout(() => b.classList.remove('bump'), 300);
    }
  });
}

function toggleCart(open = true) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop') || document.getElementById('drawerBackdrop');
  if (!drawer) return;

  // Close preview popover when drawer toggles
  document.querySelectorAll('.cart-preview-popover.is-visible').forEach(p => p.classList.remove('is-visible'));

  if (open) {
    renderCartDrawer();
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  } else {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }
}

// -------------------------------------------------------------
// FARMER ORDERS DRAWER & QUICK FULFILLMENT CONTROLLER
// -------------------------------------------------------------
let currentFarmerDrawerFilter = 'all';

function toggleFarmerOrdersDrawer(open = true) {
  let drawer = document.getElementById('farmerOrdersDrawer');
  let backdrop = document.getElementById('farmerOrdersBackdrop');

  if (!drawer) {
    drawer = document.createElement('aside');
    drawer.id = 'farmerOrdersDrawer';
    drawer.className = 'farmer-orders-drawer';
    drawer.setAttribute('aria-label', 'Farmer Order Management');

    backdrop = document.createElement('div');
    backdrop.id = 'farmerOrdersBackdrop';
    backdrop.className = 'drawer-backdrop';
    backdrop.onclick = () => toggleFarmerOrdersDrawer(false);

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
  }

  // Close preview popovers
  document.querySelectorAll('.cart-preview-popover.is-visible').forEach(p => p.classList.remove('is-visible'));

  if (open) {
    renderFarmerOrdersDrawer(currentFarmerDrawerFilter);
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  } else {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }
}

function renderFarmerOrdersDrawer(filter = 'all') {
  currentFarmerDrawerFilter = filter;
  const drawer = document.getElementById('farmerOrdersDrawer');
  if (!drawer) return;

  const user = window.AgriState.user || { full_name: 'Mang Ramon Dela Cruz', farm_name: 'Dela Cruz Family Farm' };
  const orders = getFarmerOrders();
  const pendingOrders = orders.filter(o => o.status_code === 'pending');
  const deliveredOrders = orders.filter(o => o.status_code === 'delivered');
  const totalPayout = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

  let filtered = orders;
  if (filter === 'pending') filtered = pendingOrders;
  if (filter === 'delivered') filtered = deliveredOrders;

  drawer.innerHTML = `
    <!-- Header -->
    <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, #14532d 0%, #166534 100%); color: #ffffff;">
      <div style="display: flex; align-items: center; gap: 0.65rem;">
        <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86efac" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            <path d="m9 14 2 2 4-4"/>
          </svg>
        </div>
        <div>
          <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: #ffffff;">Farmer Orders Management</h3>
          <p style="margin: 0.15rem 0 0; font-size: 0.75rem; color: #86efac; opacity: 0.95;">
            ${user.full_name} • ${user.farm_name || 'Dela Cruz Family Farm'}
          </p>
        </div>
      </div>
      <button onclick="toggleFarmerOrdersDrawer(false)" style="background: none; border: none; font-size: 1.6rem; color: #ffffff; cursor: pointer; line-height: 1; padding: 0.2rem 0.5rem;" aria-label="Close Drawer">&times;</button>
    </div>

    <!-- Quick Stats -->
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; padding: 0.85rem 1.25rem; background: var(--bg-page); border-bottom: 1px solid var(--border-subtle); text-align: center;">
      <div style="background: #ffffff; padding: 0.5rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Total Orders</div>
        <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main);">${orders.length}</div>
      </div>
      <div style="background: #fef3c7; padding: 0.5rem; border-radius: 8px; border: 1px solid #fde68a;">
        <div style="font-size: 0.68rem; color: #92400e; font-weight: 700; text-transform: uppercase;">Pending</div>
        <div style="font-size: 1.05rem; font-weight: 800; color: #b45309;">${pendingOrders.length}</div>
      </div>
      <div style="background: #dcfce7; padding: 0.5rem; border-radius: 8px; border: 1px solid #bbf7d0;">
        <div style="font-size: 0.68rem; color: #166534; font-weight: 700; text-transform: uppercase;">Total Payout</div>
        <div style="font-size: 1.05rem; font-weight: 800; color: #15803d;">₱${totalPayout.toLocaleString()}</div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div style="display: flex; gap: 0.4rem; padding: 0.75rem 1.25rem; background: #ffffff; border-bottom: 1px solid var(--border-subtle);">
      <button onclick="renderFarmerOrdersDrawer('all')" class="${filter === 'all' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; flex: 1;">
        All (${orders.length})
      </button>
      <button onclick="renderFarmerOrdersDrawer('pending')" class="${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; flex: 1;">
        Pending (${pendingOrders.length})
      </button>
      <button onclick="renderFarmerOrdersDrawer('delivered')" class="${filter === 'delivered' ? 'btn-primary' : 'btn-secondary'}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; flex: 1;">
        Delivered (${deliveredOrders.length})
      </button>
    </div>

    <!-- Orders List -->
    <div style="flex: 1; overflow-y: auto; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; background: #f8fafc;">
      ${filtered.length === 0 ? `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
          <p style="font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">No orders found in this tab.</p>
          <p style="font-size: 0.8rem; margin: 0;">New incoming orders from buyers will appear here automatically.</p>
        </div>
      ` : filtered.map(o => `
        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 0.65rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <span style="font-weight: 800; font-size: 0.95rem; color: var(--text-main); font-family: monospace;">${o.id}</span>
                <span style="font-size: 0.725rem; color: var(--text-muted);">• ${o.placed_at}</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">
                Buyer: <strong>${o.customer_name}</strong>
              </div>
            </div>
            <span style="font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; ${o.status_code === 'pending' ? 'background: #fef3c7; color: #b45309; border: 1px solid #fde68a;' : 'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;'}">
              ${o.status_code === 'pending' ? '⏳ Pending Harvest' : '✓ Delivered & Paid'}
            </span>
          </div>

          <div style="font-size: 0.775rem; color: var(--text-muted); background: var(--bg-page); padding: 0.5rem 0.65rem; border-radius: 6px; display: flex; flex-direction: column; gap: 0.25rem;">
            <div>📍 <strong>Ship to:</strong> ${o.delivery_address} • 📞 ${o.customer_phone}</div>
            <div>🚚 <strong>Logistics:</strong> ${o.delivery_method}</div>
          </div>

          <div style="border-top: 1px dashed var(--border-subtle); padding-top: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem;">
            ${o.items.map(i => `
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                <span><strong>${i.quantity} ${i.unit}</strong> × ${i.name}</span>
                <span style="color: var(--text-muted);">₱${(i.price * i.quantity).toLocaleString()}</span>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.65rem; margin-top: 0.2rem;">
            <div>
              <div style="font-size: 0.675rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Direct Payout</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary-deep);">₱${o.total_amount.toLocaleString()}</div>
            </div>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              ${o.status_code === 'pending' ? `
                <button onclick="updateFarmerOrderStatus('${o.id}', 'delivered')" class="btn-primary" style="font-size: 0.75rem; padding: 0.4rem 0.75rem; font-weight: 700;">
                  ✓ Mark Delivered
                </button>
              ` : `
                <button onclick="updateFarmerOrderStatus('${o.id}', 'pending')" class="btn-secondary" style="font-size: 0.7rem; padding: 0.35rem 0.55rem; color: var(--text-muted);" title="Re-open order if needed">
                  ↺ Re-open
                </button>
              `}
              <button onclick="openFarmerOrderDetailsModal('${o.id}')" class="btn-secondary" style="font-size: 0.75rem; padding: 0.4rem 0.65rem;" title="View Slip">
                🖨️ Slip
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Footer -->
    <div style="padding: 1rem 1.25rem; border-top: 1px solid var(--border-subtle); background: #ffffff; display: flex; gap: 0.65rem;">
      <a href="dashboard.html" class="btn-primary" style="flex: 1; text-align: center; text-decoration: none; font-size: 0.85rem; padding: 0.65rem;">
        Open Full Dashboard &rarr;
      </a>
      <button onclick="toggleFarmerOrdersDrawer(false)" class="btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1rem;">
        Close
      </button>
    </div>
  `;
}

function openFarmerOrderDetailsModal(orderId) {
  const orders = getFarmerOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  let modal = document.getElementById('farmerReceiptModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'farmerReceiptModal';
    modal.className = 'modal-overlay';
    modal.onclick = function(e) { if (e.target === modal) closeFarmerReceiptModal(); };
    document.body.appendChild(modal);
  }

  const itemsRows = order.items.map(i => `
    <tr>
      <td style="padding: 0.45rem 0; font-weight: 600; color: var(--text-main); font-size: 0.85rem;">
        ${i.name}
      </td>
      <td style="padding: 0.45rem 0; text-align: center; color: var(--text-secondary); font-size: 0.85rem;">
        ${i.quantity} ${i.unit || 'kg'}
      </td>
      <td style="padding: 0.45rem 0; text-align: right; font-weight: 700; color: var(--text-main); font-size: 0.85rem;">
        ₱${((i.price || 0) * (i.quantity || 1)).toLocaleString()}
      </td>
    </tr>
  `).join('');

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 480px; padding: 1.75rem; border-radius: var(--radius-md); background: #ffffff; box-shadow: var(--shadow-modal);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed var(--border-subtle); padding-bottom: 0.85rem; margin-bottom: 1rem;">
        <div>
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary-deep);">Farmer Harvest Dispatch Slip</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Invoice & Packing Sheet • ${order.id}</div>
        </div>
        <button onclick="closeFarmerReceiptModal()" style="background: none; border: none; font-size: 1.4rem; color: var(--text-muted); cursor: pointer;">&times;</button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; font-size: 0.8rem; margin-bottom: 1rem; background: var(--bg-page); padding: 0.75rem; border-radius: 8px;">
        <div>
          <span style="color: var(--text-muted); font-size: 0.725rem;">Date Placed:</span>
          <div style="font-weight: 700;">${order.placed_at}</div>
        </div>
        <div>
          <span style="color: var(--text-muted); font-size: 0.725rem;">Current Status:</span>
          <div style="font-weight: 700; color: ${order.status_code === 'pending' ? '#b45309' : '#15803d'};">
            ${order.status}
          </div>
        </div>
        <div>
          <span style="color: var(--text-muted); font-size: 0.725rem;">Buyer:</span>
          <div style="font-weight: 700;">${order.customer_name}</div>
        </div>
        <div>
          <span style="color: var(--text-muted); font-size: 0.725rem;">Phone:</span>
          <div style="font-weight: 700;">${order.customer_phone}</div>
        </div>
        <div style="grid-column: span 2;">
          <span style="color: var(--text-muted); font-size: 0.725rem;">Shipping Address:</span>
          <div style="font-weight: 700;">${order.delivery_address}</div>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">
            <th style="padding: 0.5rem 0; text-align: left;">Harvest Item</th>
            <th style="padding: 0.5rem 0; text-align: center;">Qty</th>
            <th style="padding: 0.5rem 0; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 800; color: var(--primary-deep); margin-bottom: 1.25rem;">
        <span>Direct Farmgate Payout:</span>
        <span>₱${(order.total_amount || 0).toLocaleString()}</span>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.65rem 0.85rem; font-size: 0.75rem; color: #166534; text-align: center; margin-bottom: 1.25rem;">
        ✓ Guaranteed 100% Payout to Farmer • Zero Middleman Deductions
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <button onclick="window.print()" class="btn-secondary" style="flex: 1; font-size: 0.8rem; padding: 0.55rem;">
          🖨️ Print Packing Slip
        </button>
        ${order.status_code === 'pending' ? `
          <button onclick="updateFarmerOrderStatus('${order.id}', 'delivered'); closeFarmerReceiptModal();" class="btn-primary" style="flex: 1; font-size: 0.8rem; padding: 0.55rem;">
            ✓ Mark as Delivered
          </button>
        ` : `
          <button onclick="closeFarmerReceiptModal()" class="btn-primary" style="flex: 1; font-size: 0.8rem; padding: 0.55rem;">
            Close
          </button>
        `}
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeFarmerReceiptModal() {
  const modal = document.getElementById('farmerReceiptModal');
  if (modal) modal.classList.remove('active');
}

function initCartPreview() {
  const cartBtns = document.querySelectorAll('button[aria-label="View Cart"], button[aria-label="Manage Farmer Orders"], button[onclick*="toggleCart"], button[onclick*="toggleFarmerOrdersDrawer"]');
  if (!cartBtns || cartBtns.length === 0) return;

  cartBtns.forEach(btn => {
    let wrapper = btn.closest('.cart-button-wrap');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'cart-button-wrap';
      btn.parentNode.insertBefore(wrapper, btn);
      wrapper.appendChild(btn);
    }

    let popover = wrapper.querySelector('.cart-preview-popover');
    if (!popover) {
      popover = document.createElement('div');
      popover.className = 'cart-preview-popover';
      popover.setAttribute('role', 'region');
      popover.setAttribute('aria-label', 'Shopping Basket Preview');
      wrapper.appendChild(popover);
    }

    let hideTimer = null;
    const show = () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      renderCartPreview();
      popover.classList.add('is-visible');
    };

    const scheduleHide = () => {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        popover.classList.remove('is-visible');
      }, 200);
    };

    wrapper.addEventListener('mouseenter', show);
    wrapper.addEventListener('mouseleave', scheduleHide);
    wrapper.addEventListener('focusin', show);
    wrapper.addEventListener('focusout', (e) => {
      if (!wrapper.contains(e.relatedTarget)) {
        scheduleHide();
      }
    });

    btn.addEventListener('click', () => {
      popover.classList.remove('is-visible');
    });
  });

  renderCartPreview();
}

function renderCartPreview() {
  const popovers = document.querySelectorAll('.cart-preview-popover');
  if (!popovers || popovers.length === 0) return;

  const user = window.AgriState.user;
  const isFarmer = Boolean(user && user.role === 'farmer');

  if (isFarmer) {
    const orders = getFarmerOrders();
    const pendingOrders = orders.filter(o => o.status_code === 'pending');

    popovers.forEach(popover => {
      popover.innerHTML = `
        <div class="cart-preview-header" style="background: linear-gradient(135deg, #14532d 0%, #166534 100%); color: #ffffff; padding: 0.85rem 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86efac" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              <path d="m9 14 2 2 4-4"/>
            </svg>
            <div>
              <div style="font-weight: 800; font-size: 0.875rem; color: #ffffff; line-height: 1.1;">Farmer Received Orders</div>
              <div style="font-size: 0.7rem; color: #86efac; opacity: 0.9;">${user.farm_name || 'Dela Cruz Family Farm'}</div>
            </div>
          </div>
          <span style="font-size: 0.7rem; font-weight: 800; background: #fef3c7; color: #b45309; padding: 0.2rem 0.55rem; border-radius: 9999px; border: 1px solid #fde68a;">
            ${pendingOrders.length} Pending
          </span>
        </div>

        <div class="cart-preview-items" style="max-height: 310px; overflow-y: auto; padding: 0.65rem 0.85rem; display: flex; flex-direction: column; gap: 0.65rem;">
          ${orders.length === 0 ? `
            <div style="text-align: center; padding: 1.5rem 1rem; color: var(--text-muted); font-size: 0.85rem;">
              No received orders yet.
            </div>
          ` : orders.slice(0, 4).map(o => `
            <div style="background: var(--bg-page); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.65rem 0.75rem; display: flex; flex-direction: column; gap: 0.35rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 800; font-size: 0.825rem; color: var(--text-main); font-family: monospace;">${o.id}</span>
                <span style="font-size: 0.68rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px; ${o.status_code === 'pending' ? 'background: #fef3c7; color: #b45309; border: 1px solid #fde68a;' : 'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;'}">
                  ${o.status_code === 'pending' ? '⏳ Pending Harvest' : '✓ Delivered & Paid'}
                </span>
              </div>
              <div style="font-size: 0.775rem; color: var(--text-secondary); line-height: 1.25;">
                Buyer: <strong>${o.customer_name}</strong> • <span style="color: var(--text-muted);">${o.delivery_address}</span>
              </div>
              <div style="font-size: 0.725rem; color: var(--text-muted);">
                ${o.items.map(i => `${i.quantity} ${i.unit} ${i.name}`).join(', ')}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-subtle); padding-top: 0.35rem; margin-top: 0.15rem;">
                <span style="font-weight: 800; font-size: 0.85rem; color: var(--primary-deep);">₱${o.total_amount.toLocaleString()}</span>
                <div style="display: flex; gap: 0.35rem;">
                  ${o.status_code === 'pending' ? `
                    <button onclick="updateFarmerOrderStatus('${o.id}', 'delivered'); event.stopPropagation();" class="btn-primary" style="font-size: 0.68rem; padding: 0.22rem 0.55rem; border-radius: 4px; font-weight: 700;">
                      ✓ Mark Delivered
                    </button>
                  ` : `
                    <span style="font-size: 0.7rem; color: #166534; font-weight: 800;">✓ Payout Escrowed</span>
                  `}
                  <button onclick="openFarmerOrderDetailsModal('${o.id}'); event.stopPropagation();" class="btn-secondary" style="font-size: 0.68rem; padding: 0.22rem 0.55rem; border-radius: 4px;">
                    Slip / Details
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="padding: 0.75rem 1rem; border-top: 1px solid var(--border-subtle); background: #ffffff; display: flex; gap: 0.5rem;">
          <button onclick="toggleFarmerOrdersDrawer(true)" class="btn-primary" style="flex: 1; font-size: 0.775rem; padding: 0.5rem 0.65rem; text-align: center; font-weight: 700;">
            Manage All Orders (${orders.length}) &rarr;
          </button>
          <a href="dashboard.html" class="btn-secondary" style="font-size: 0.775rem; padding: 0.5rem 0.75rem; text-decoration: none; text-align: center; font-weight: 700;">
            Dashboard
          </a>
        </div>
      `;
    });
    return;
  }

  const cart = window.AgriState.cart || [];
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  popovers.forEach(popover => {
    if (cart.length === 0) {
      popover.innerHTML = `
        <div class="cart-preview-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            ${ICONS.package}
            <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">Shopping Basket</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted); background: var(--bg-subtle); padding: 0.15rem 0.5rem; border-radius: 9999px;">0 items</span>
        </div>
        <div class="cart-preview-items" style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 42px; height: 42px; margin: 0 auto 0.5rem; border-radius: 50%; background: #f0fdf4; display: flex; align-items: center; justify-content: center; color: var(--primary);">
            ${ICONS.package}
          </div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">Your basket is empty</div>
          <p style="font-size: 0.775rem; color: var(--text-muted); margin: 0.25rem 0 0.85rem;">Add fresh harvests directly from local farmers.</p>
          <a href="marketplace.html" class="btn-primary" style="font-size: 0.775rem; padding: 0.35rem 0.85rem; text-decoration: none; display: inline-block;">
            Browse Marketplace
          </a>
        </div>
      `;
      return;
    }

    const itemsHtml = cart.map(item => {
      const lineTotal = item.price * item.quantity;
      return `
        <div style="display: flex; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid var(--border-subtle); align-items: center;">
          <img src="${item.image_url}" alt="${item.name}" style="width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0; border: 1px solid var(--border-subtle);">
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.35rem;">
              <h6 style="font-size: 0.825rem; font-weight: 700; margin: 0; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h6>
              <button onclick="removeFromCart('${item.id}'); event.stopPropagation();" style="background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0 0.2rem; font-size: 0.85rem; line-height: 1;" title="Remove">✕</button>
            </div>
            <div style="font-size: 0.725rem; color: var(--text-muted); margin-bottom: 0.2rem;">${item.farmer_name || 'Direct Farm'}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.775rem;">
              <span style="color: var(--text-secondary); font-weight: 500;">${item.quantity} ${item.unit} × ₱${item.price.toLocaleString()}</span>
              <strong style="color: var(--primary-deep); font-weight: 700;">₱${lineTotal.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      `;
    }).join('');

    popover.innerHTML = `
      <div class="cart-preview-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          ${ICONS.package}
          <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">Shopping Basket</span>
        </div>
        <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary-deep); background: #dcfce7; padding: 0.15rem 0.55rem; border-radius: 9999px;">
          ${itemCount} ${itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div class="cart-preview-items">
        ${itemsHtml}
      </div>

      <div class="cart-preview-footer">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span style="font-size: 0.825rem; color: var(--text-secondary); font-weight: 600;">Subtotal</span>
          <strong style="font-size: 1.05rem; font-weight: 800; color: var(--primary-deep);">₱${subtotal.toLocaleString()}</strong>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
          <button onclick="toggleCart(true); const p = this.closest('.cart-preview-popover'); if(p) p.classList.remove('is-visible');" class="btn-secondary" style="width: 100%; font-size: 0.78rem; padding: 0.45rem 0.5rem; text-align: center;">
            View Full Basket
          </button>
          <button onclick="openCheckoutModal(); const p = this.closest('.cart-preview-popover'); if(p) p.classList.remove('is-visible');" class="btn-primary" style="width: 100%; font-size: 0.78rem; padding: 0.45rem 0.5rem; text-align: center;">
            Checkout
          </button>
        </div>
      </div>
    `;
  });
}

function renderCartDrawer() {
  const container = document.getElementById('cartItemsList') || document.getElementById('cartItemsContainer');
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

function proceedToCheckout() {
  const user = window.AgriState.user;
  if (!user) {
    showToast('Please log in to your account before proceeding to checkout.');
    setTimeout(() => {
      const page = window.location.pathname.split('/').pop() || 'marketplace.html';
      const search = window.location.search || '';
      window.location.href = `auth.html?redirect=${encodeURIComponent(page + search)}`;
    }, 800);
    return;
  }
  openCheckoutModal();
}

function openCheckoutModal() {
  const user = window.AgriState.user;
  if (!user) {
    showToast('Please log in to your account before proceeding to checkout.');
    setTimeout(() => {
      const page = window.location.pathname.split('/').pop() || 'marketplace.html';
      const search = window.location.search || '';
      window.location.href = `auth.html?redirect=${encodeURIComponent(page + search)}`;
    }, 800);
    return;
  }

  if (window.AgriState.cart.length === 0) return;
  toggleCart(false);

  const modal = document.getElementById('checkoutModal');
  if (!modal) {
    window.location.href = 'marketplace.html';
    return;
  }
  const summaryEl = document.getElementById('checkoutSummary');

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
    status_code: 'to_deliver',
    progressStep: 1,
    eta: 'Tomorrow, Morning Dispatch (6:00 AM - 10:00 AM)',
    temperature: 'Cold-Chain Dispatching',
    origin: window.AgriState.cart[0]?.farmer_name || 'Philippine Farm Hub',
    originProvince: 'Direct Farm Partner',
    destination: formData.get('address') + ', ' + formData.get('city'),
    driverName: 'Assigning Cold-Chain Express Van',
    driverPhone: 'Logistics Hotline: +63 917 842 1092'
  };

  window.AgriState.orders.unshift(newOrder);
  localStorage.setItem('agri_orders', JSON.stringify(window.AgriState.orders));
  if (typeof addBuyerOrder === 'function') {
    addBuyerOrder(newOrder);
  }

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

  let modal = document.getElementById('productModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productModal';
    modal.className = 'modal-overlay';
    modal.onclick = function(e) { if (e.target === modal) closeProductModal(); };
    modal.innerHTML = '<div class="modal-content" id="productModalContent"></div>';
    document.body.appendChild(modal);
  }

  const modalBody = document.getElementById('productModalContent') || document.getElementById('productModalBody') || modal.querySelector('.modal-content');
  if (!modalBody) return;

  const isOwn = isUserOwnProduct(p);

  modalBody.innerHTML = `
    <div style="position: relative; padding: 1.5rem;">
      <button type="button" onclick="closeProductModal()" style="position: absolute; top: 1rem; right: 1rem; width: 34px; height: 34px; border-radius: 50%; background: #f1f5f9; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 700; color: var(--text-muted); cursor: pointer; z-index: 20; transition: all 0.15s ease;" title="Close Details" aria-label="Close dialog">&times;</button>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="border-radius: var(--radius-md); overflow: hidden; background: #f1f5f9; position: relative; max-height: 280px;">
          <img src="${p.image_url}" alt="${p.name}" style="width: 100%; height: 260px; object-fit: cover;">
          <span class="category-badge" style="top: 12px; left: 12px; position: absolute; background: rgba(15, 23, 42, 0.85); color: #ffffff; padding: 0.25rem 0.65rem; border-radius: 9999px; font-size: 0.725rem; font-weight: 700; text-transform: uppercase;">${p.category_name}</span>
          <span style="position: absolute; top: 12px; right: 48px; background: #22c55e; color: #ffffff; font-size: 0.7rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 9999px; text-transform: uppercase;">Direct Farmgate</span>
        </div>

        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
            <span style="font-size: 0.775rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em;">
              Direct Producer Harvest
            </span>
            <div style="font-size: 0.825rem; font-weight: 700; color: #b45309; display: flex; align-items: center; gap: 0.25rem;">
              ★ ${p.rating || '5.0'} (${p.reviews_count || 1} reviews)
            </div>
          </div>

          <h2 style="font-size: 1.45rem; font-weight: 800; margin: 0 0 0.5rem; color: var(--text-main); line-height: 1.25;">
            ${p.name}
          </h2>

          <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <div style="font-size: 0.875rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 0.35rem;">
                🌱 ${p.farmer_name}
              </div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.1rem;">${p.city || 'La Trinidad'}, ${p.province || 'Benguet'}</div>
            </div>
            <a href="farmers.html" style="font-size: 0.775rem; color: var(--primary); font-weight: 700; text-decoration: none;">View Farm Profile &rarr;</a>
          </div>

          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem;">
            ${p.description || 'Fresh seasonal harvest direct from our farm fields.'}
          </p>

          <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 1.25rem; border-top: 1px solid var(--border-subtle); padding-top: 0.85rem;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; font-weight: 600;">Direct Farmgate Price</span>
              <div style="display: flex; align-items: baseline; gap: 0.35rem;">
                <span style="font-size: 1.65rem; font-weight: 800; color: #15803d;">₱${p.price.toLocaleString()}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">/ ${p.unit}</span>
              </div>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; font-weight: 600;">Available Stock</span>
              <span style="font-size: 0.95rem; font-weight: 800; color: var(--text-main);">${p.quantity} ${p.unit} in stock</span>
            </div>
          </div>

          ${isOwn ? `
            <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: var(--radius-sm); padding: 0.85rem 1rem; width: 100%; display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="font-size: 0.825rem; color: #166534; font-weight: 700; display: flex; align-items: center; gap: 0.35rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Your Harvest Listing (Farmer Producer)
              </div>
              <p style="font-size: 0.775rem; color: #15803d; margin: 0; line-height: 1.4;">
                As the registered producer of this product, you cannot purchase your own listings on the public marketplace. You can manage inventory from your dashboard.
              </p>
              <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
                <a href="dashboard.html" class="btn-primary" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; text-decoration: none;">
                  Manage in Farmer Dashboard &rarr;
                </a>
              </div>
            </div>
          ` : `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="display: inline-flex; align-items: center; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); overflow: hidden; background: #ffffff;">
                <button type="button" onclick="adjustModalQty(-1)" style="padding: 0.55rem 0.9rem; background: var(--bg-subtle); border: none; font-weight: 700; cursor: pointer; font-size: 1rem;">-</button>
                <input id="modalQtyInput" type="number" value="1" min="1" max="${p.quantity}" style="width: 50px; text-align: center; border: none; font-weight: 700; font-size: 0.95rem;" readonly>
                <button type="button" onclick="adjustModalQty(1, ${p.quantity})" style="padding: 0.55rem 0.9rem; background: var(--bg-subtle); border: none; font-weight: 700; cursor: pointer; font-size: 1rem;">+</button>
              </div>

              <button type="button" onclick="addToCartFromModal('${p.id}')" class="btn-primary" style="flex: 1; padding: 0.75rem 1.25rem; font-size: 0.9rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem;">
                + Add to Basket
              </button>
            </div>
          `}
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
  const user = window.AgriState.user;
  addToCart(productId, qty);
  if (user) {
    closeProductModal();
  }
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
    showToast('You are currently signed in as a Buyer. Only verified Farmer accounts can list product for sale.');
    return;
  }
  window.location.href = 'sell-harvest.html';
}

function closeSellHarvestModal() {
  const modal = document.getElementById('sellHarvestModal');
  if (modal) modal.classList.remove('open');
}

// -------------------------------------------------------------
// 8B. FARMER PROFILE MODAL ("MY PROFILE") - VIEW, EDIT, REQUIREMENTS & EWALLETS
// -------------------------------------------------------------

// Active target wallet ID for specific QR upload
let activeTargetWalletQrId = null;
let stagedNewWalletQr = null;

// Default requirements checklist (pristine unfilled layout with set of distinct requirements)
const DEFAULT_FARMER_REQUIREMENTS = [
  {
    id: 'rsbsa',
    title: 'DA-RSBSA Registration Certificate',
    category: 'Department of Agriculture Accreditation',
    description: 'Official DA-issued RSBSA reference number certifying registered farmer status in the national registry.',
    formats: 'PDF, JPG, PNG • Max 10MB',
    status: 'pending',
    file_name: null,
    uploaded_at: null
  },
  {
    id: 'valid_id',
    title: 'Government-Issued Valid Identification',
    category: 'Identity Verification',
    description: "Primary government ID (PhilSys National ID, UMID, PRC, or Driver's License) with clear photo and signature.",
    formats: 'PDF, JPG, PNG • Max 10MB',
    status: 'pending',
    file_name: null,
    uploaded_at: null
  },
  {
    id: 'barangay_cert',
    title: 'Barangay Farm & Land Occupancy Certification',
    category: 'Land Tenancy & Farm Proof',
    description: 'Certification from Barangay Captain or Agrarian Reform validating cultivation parcel and tenancy rights.',
    formats: 'PDF, JPG, PNG • Max 10MB',
    status: 'pending',
    file_name: null,
    uploaded_at: null
  },
  {
    id: 'gap_cert',
    title: 'Philippine Good Agricultural Practices (PhilGAP) Clearance',
    category: 'Food Safety & Harvest Standards',
    description: 'Bureau of Plant Industry (BPI) food safety compliance and pesticide residue testing protocol.',
    formats: 'PDF, JPG, PNG • Max 10MB',
    status: 'pending',
    file_name: null,
    uploaded_at: null
  },
  {
    id: 'water_test',
    title: 'Agricultural Soil & Irrigation Water Potability Clearance',
    category: 'Laboratory Environmental Testing',
    description: 'Authorized laboratory analysis certification verifying heavy metal safety and irrigation water potability.',
    formats: 'PDF, JPG, PNG • Max 10MB',
    status: 'pending',
    file_name: null,
    uploaded_at: null
  }
];

function getStoredFarmerRequirements() {
  const stored = localStorage.getItem('agri_farmer_requirements');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  return DEFAULT_FARMER_REQUIREMENTS;
}

function saveFarmerRequirements(reqs) {
  localStorage.setItem('agri_farmer_requirements', JSON.stringify(reqs));
}

// Generate realistic SVG QR code for direct payments
function generateRealisticQrSvg(label, number) {
  const cleanNum = (number || '09178421092').replace(/[^0-9]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#ffffff"/>
    <g fill="#0f172a">
      <!-- Top-left Finder -->
      <rect x="15" y="15" width="45" height="45" fill="#0f172a" rx="4"/>
      <rect x="21" y="21" width="33" height="33" fill="#ffffff" rx="2"/>
      <rect x="27" y="27" width="21" height="21" fill="#0f172a" rx="2"/>
      <!-- Top-right Finder -->
      <rect x="140" y="15" width="45" height="45" fill="#0f172a" rx="4"/>
      <rect x="146" y="21" width="33" height="33" fill="#ffffff" rx="2"/>
      <rect x="152" y="27" width="21" height="21" fill="#0f172a" rx="2"/>
      <!-- Bottom-left Finder -->
      <rect x="15" y="140" width="45" height="45" fill="#0f172a" rx="4"/>
      <rect x="21" y="146" width="33" height="33" fill="#ffffff" rx="2"/>
      <rect x="27" y="152" width="21" height="21" fill="#0f172a" rx="2"/>
      <!-- Data modules -->
      <rect x="70" y="20" width="10" height="10"/>
      <rect x="90" y="20" width="10" height="10"/>
      <rect x="110" y="20" width="10" height="10"/>
      <rect x="70" y="40" width="20" height="10"/>
      <rect x="100" y="40" width="10" height="10"/>
      <rect x="120" y="40" width="10" height="10"/>
      <rect x="70" y="70" width="10" height="20"/>
      <rect x="90" y="80" width="20" height="10"/>
      <rect x="120" y="70" width="10" height="10"/>
      <rect x="140" y="70" width="20" height="10"/>
      <rect x="170" y="70" width="10" height="20"/>
      <rect x="20" y="70" width="10" height="10"/>
      <rect x="40" y="70" width="20" height="10"/>
      <rect x="20" y="90" width="20" height="10"/>
      <rect x="50" y="90" width="10" height="20"/>
      <rect x="70" y="100" width="20" height="10"/>
      <rect x="100" y="100" width="10" height="20"/>
      <rect x="120" y="90" width="20" height="10"/>
      <rect x="150" y="90" width="10" height="20"/>
      <rect x="170" y="100" width="10" height="10"/>
      <rect x="20" y="120" width="20" height="10"/>
      <rect x="70" y="120" width="10" height="10"/>
      <rect x="90" y="120" width="20" height="10"/>
      <rect x="120" y="120" width="10" height="20"/>
      <rect x="140" y="120" width="20" height="10"/>
      <rect x="70" y="140" width="20" height="10"/>
      <rect x="100" y="140" width="10" height="10"/>
      <rect x="120" y="150" width="20" height="10"/>
      <rect x="150" y="140" width="10" height="20"/>
      <rect x="170" y="140" width="10" height="10"/>
      <rect x="70" y="160" width="10" height="20"/>
      <rect x="90" y="160" width="20" height="10"/>
      <rect x="120" y="170" width="10" height="10"/>
      <rect x="140" y="170" width="20" height="10"/>
      <rect x="170" y="160" width="10" height="20"/>
    </g>
    <circle cx="100" cy="100" r="16" fill="#15803d"/>
    <text x="100" y="105" fill="#ffffff" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">₱</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Default E-Wallets
const DEFAULT_FARMER_EWALLETS = [
  {
    id: 'ew-gcash-1',
    provider: 'gcash',
    bank_name: 'GCash Wallet',
    badge_bg: '#0284c7',
    badge_letter: 'G',
    account_name: 'Ramon Dela Cruz',
    account_number: '0917-842-1092',
    is_primary: true,
    qr_code: generateRealisticQrSvg('GCash', '0917-842-1092')
  },
  {
    id: 'ew-landbank-1',
    provider: 'landbank',
    bank_name: 'Land Bank of the Philippines',
    badge_bg: '#15803d',
    badge_letter: 'L',
    account_name: 'Ramon Dela Cruz',
    account_number: '1842-9901-4821',
    is_primary: false,
    qr_code: null
  }
];

function getStoredFarmerEWallets() {
  const stored = localStorage.getItem('agri_farmer_ewallets');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  return DEFAULT_FARMER_EWALLETS;
}

function saveFarmerEWallets(wallets) {
  localStorage.setItem('agri_farmer_ewallets', JSON.stringify(wallets));
}

function initProfilePage() {
  const user = window.AgriState.user || {
    role: 'farmer',
    full_name: 'Mang Ramon Dela Cruz',
    farm_name: 'Dela Cruz Family Farm',
    cooperative: 'Benguet Farmers Multi-Purpose Cooperative (BFMPC)',
    phone: '+63 917 842 1092',
    email: 'ramon.delacruz@agriconnect.ph',
    alt_phone: '+63 928 551 8934',
    experience: '18 Years (Highland Agriculture)',
    role_tier: 'Tier-1 Direct Farmgate Supplier',
    address: 'Sitio Pungayan, Barangay Cabanao, La Trinidad, Benguet, Cordillera Administrative Region (CAR), 2601',
    coords: '16.4582° N, 120.5891° E',
    area: '2.8 Hectares (Terraced Mountain Agro-Ecosystem)',
    elevation: '1,450 meters above sea level (MASL)',
    hub: 'Km. 5 Agri-Hub Cold-Chain Facility, La Trinidad',
    crops: 'Baguio Beans, Cabbage, Strawberries, Carrots',
    rating: '★ 4.9 / 5.0',
    fulfillment: '100% On-Time',
    compliance: 'Grade A+'
  };

  const isFarmer = user.role === 'farmer';

  // Populate Header info
  const nameEl = document.getElementById('profileName') || document.getElementById('profileModalName');
  const farmEl = document.getElementById('profileFarm') || document.getElementById('profileModalFarm');
  const avatarEl = document.getElementById('profileAvatar') || document.getElementById('profileModalAvatar');

  if (nameEl) nameEl.textContent = user.full_name || (isFarmer ? 'Mang Ramon Dela Cruz' : 'Juan Dela Cruz');
  if (farmEl) {
    farmEl.textContent = isFarmer
      ? `${user.farm_name || 'Dela Cruz Family Farm'} • ${user.cooperative || 'Benguet Farmers Multi-Purpose Cooperative (BFMPC)'}`
      : `${user.province || 'Metro Manila'} Delivery Hub • Registered AgriConnect Direct Farmgate Buyer`;
  }
  if (avatarEl && user.avatar) avatarEl.src = user.avatar;

  // Header badges & role indicator on profile page
  const idBadge = document.getElementById('profileModalIdBadge');
  if (idBadge) {
    idBadge.textContent = isFarmer ? 'ID: PH-AGRI-8842' : 'ID: BUYER-NCR-4820';
  }

  // Populate View details
  const fields = isFarmer ? [
    ['profileInfoFullName', user.full_name || 'Mang Ramon Dela Cruz'],
    ['profileInfoPhone', user.phone || '+63 917 842 1092'],
    ['profileInfoEmail', user.email || 'ramon.delacruz@agriconnect.ph'],
    ['profileInfoAltPhone', user.alt_phone || '+63 928 551 8934'],
    ['profileInfoCoop', user.cooperative || 'Benguet Farmers Multi-Purpose Coop (BFMPC)'],
    ['profileInfoExperience', user.experience || '18 Years (Highland Agriculture)'],
    ['profileInfoTier', user.role_tier || 'Tier-1 Direct Farmgate Supplier'],
    ['profileInfoAddress', user.address || 'Sitio Pungayan, Barangay Cabanao, La Trinidad, Benguet, Cordillera Administrative Region (CAR), 2601'],
    ['profileInfoCoords', user.coords || '16.4582° N, 120.5891° E'],
    ['profileInfoArea', user.area || '2.8 Hectares (Terraced Mountain Agro-Ecosystem)'],
    ['profileInfoElevation', user.elevation || '1,450 meters above sea level (MASL)'],
    ['profileInfoHub', user.hub || 'Km. 5 Agri-Hub Cold-Chain Facility, La Trinidad'],
    ['profileInfoSpecialization', user.crops || 'Baguio Beans, Cabbage, Strawberries, Carrots'],
    ['profileInfoRating', user.rating || '★ 4.9 / 5.0'],
    ['profileInfoFulfillment', user.fulfillment || '100% On-Time'],
    ['profileInfoCompliance', user.compliance || 'Grade A+']
  ] : [
    ['profileInfoFullName', user.full_name || 'Juan Dela Cruz'],
    ['profileInfoPhone', user.phone || '0917-889-2104'],
    ['profileInfoEmail', user.email || 'juan.delacruz@agriconnect.ph'],
    ['profileInfoAltPhone', user.alt_phone || '0920-551-8930'],
    ['profileInfoCoop', 'AgriConnect Consumer Direct Sourcing Program'],
    ['profileInfoExperience', 'Consumer Account • 2+ Years Farmgate Buyer'],
    ['profileInfoTier', 'Verified Direct Farmgate Buyer'],
    ['profileInfoAddress', user.address || 'Unit 802, Pioneer Woodlands, EDSA cor. Pioneer St., Mandaluyong City, Metro Manila'],
    ['profileInfoCoords', '14.5732° N, 121.0480° E (Delivery Coordinates)'],
    ['profileInfoArea', 'Residential Delivery Zone (Cold-Chain Accessible)'],
    ['profileInfoElevation', '30 meters above sea level (MASL)'],
    ['profileInfoHub', 'Metro Manila Direct Logistics Depot, Mandaluyong'],
    ['profileInfoSpecialization', 'Highland Crisp Vegetables, Dinorado Organic Rice, Fresh Fruits'],
    ['profileInfoRating', '★ 5.0 / 5.0 (Prompt Order Handover)'],
    ['profileInfoFulfillment', '4 Orders Completed'],
    ['profileInfoCompliance', 'Verified Buyer (Level 2)']
  ];

  fields.forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  // Render dynamic components
  renderFarmerRequirements();
  renderFarmerEWallets();
}

function openFarmerProfileModal() {
  const modal = document.getElementById('farmerProfileModal');
  if (modal) {
    initProfilePage();
    modal.classList.add('open');
  } else {
    window.location.href = 'profile.html';
  }
}

function closeFarmerProfileModal() {
  const modal = document.getElementById('farmerProfileModal');
  if (modal) modal.classList.remove('open');
  toggleEditFarmerProfile(false);
}

function toggleEditFarmerProfile(forceOpen) {
  const editContainer = document.getElementById('farmerEditProfileContainer');
  if (!editContainer) return;

  const shouldOpen = forceOpen !== undefined ? forceOpen : editContainer.style.display === 'none';
  if (shouldOpen) {
    const user = window.AgriState.user || {};
    const fnInput = document.getElementById('editProfileFullName');
    const phoneInput = document.getElementById('editProfilePhone');
    const emailInput = document.getElementById('editProfileEmail');
    const altPhoneInput = document.getElementById('editProfileAltPhone');
    const farmInput = document.getElementById('editProfileFarmName');
    const coopInput = document.getElementById('editProfileCoop');
    const addrInput = document.getElementById('editProfileAddress');
    const coordsInput = document.getElementById('editProfileCoords');
    const elevInput = document.getElementById('editProfileElevation');
    const expInput = document.getElementById('editProfileExperience');
    const hubInput = document.getElementById('editProfileHub');
    const specInput = document.getElementById('editProfileSpecialization');

    if (fnInput) fnInput.value = user.full_name || 'Mang Ramon Dela Cruz';
    if (phoneInput) phoneInput.value = user.phone || '+63 917 842 1092';
    if (emailInput) emailInput.value = user.email || 'ramon.delacruz@agriconnect.ph';
    if (altPhoneInput) altPhoneInput.value = user.alt_phone || '+63 928 551 8934';
    if (farmInput) farmInput.value = user.farm_name || 'Dela Cruz Family Farm';
    if (coopInput) coopInput.value = user.cooperative || 'Benguet Farmers Multi-Purpose Coop (BFMPC)';
    if (addrInput) addrInput.value = user.address || 'Sitio Pungayan, Barangay Cabanao, La Trinidad, Benguet, Cordillera Administrative Region (CAR), 2601';
    if (coordsInput) coordsInput.value = user.coords || '16.4582° N, 120.5891° E';
    if (elevInput) elevInput.value = user.elevation || '1,450 meters above sea level (MASL)';
    if (expInput) expInput.value = user.experience || '18 Years (Highland Agriculture)';
    if (hubInput) hubInput.value = user.hub || 'Km. 5 Agri-Hub Cold-Chain Facility, La Trinidad';
    if (specInput) specInput.value = user.crops || 'Baguio Beans, Cabbage, Strawberries, Carrots';

    editContainer.style.display = 'block';
    editContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    editContainer.style.display = 'none';
  }
}

function saveFarmerProfile(e) {
  if (e) e.preventDefault();

  if (!window.AgriState.user) {
    window.AgriState.user = { role: 'farmer' };
  }

  const user = window.AgriState.user;
  const fn = document.getElementById('editProfileFullName')?.value.trim();
  const phone = document.getElementById('editProfilePhone')?.value.trim();
  const email = document.getElementById('editProfileEmail')?.value.trim();
  const altPhone = document.getElementById('editProfileAltPhone')?.value.trim();
  const farm = document.getElementById('editProfileFarmName')?.value.trim();
  const coop = document.getElementById('editProfileCoop')?.value.trim();
  const addr = document.getElementById('editProfileAddress')?.value.trim();
  const coords = document.getElementById('editProfileCoords')?.value.trim();
  const elev = document.getElementById('editProfileElevation')?.value.trim();
  const exp = document.getElementById('editProfileExperience')?.value.trim();
  const hub = document.getElementById('editProfileHub')?.value.trim();
  const spec = document.getElementById('editProfileSpecialization')?.value.trim();

  if (fn) user.full_name = fn;
  if (phone) user.phone = phone;
  if (email) user.email = email;
  if (altPhone) user.alt_phone = altPhone;
  if (farm) user.farm_name = farm;
  if (coop) user.cooperative = coop;
  if (addr) user.address = addr;
  if (coords) user.coords = coords;
  if (elev) user.elevation = elev;
  if (exp) user.experience = exp;
  if (hub) user.hub = hub;
  if (spec) user.crops = spec;

  localStorage.setItem('agri_user', JSON.stringify(user));

  // Sync with Dashboard elements if present
  const welcomeFarmerName = document.getElementById('welcomeFarmerName');
  if (welcomeFarmerName) welcomeFarmerName.textContent = user.full_name;
  const welcomeFarmerFarm = document.getElementById('welcomeFarmerFarm');
  if (welcomeFarmerFarm) welcomeFarmerFarm.textContent = `${user.farm_name || 'Dela Cruz Family Farm'} • Benguet`;

  const farmerGreeting = document.getElementById('farmerGreeting');
  if (farmerGreeting) farmerGreeting.textContent = `Kumusta, ${user.full_name}!`;
  const farmerFarmDetails = document.getElementById('farmerFarmDetails');
  if (farmerFarmDetails) farmerFarmDetails.textContent = `${user.farm_name || 'Dela Cruz Family Farm'} • ${user.address ? user.address.split(',').slice(0, 3).join(',') : 'Sitio Pungayan, La Trinidad, Benguet'}`;

  // Update views
  initProfilePage();
  toggleEditFarmerProfile(false);
  updateAuthUI();

  showToast('Profile and farm information updated successfully!');
}

function handleProfileAvatarUpload(e) {
  if (!e.target.files || !e.target.files[0]) return;
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    if (!window.AgriState.user) window.AgriState.user = { role: 'farmer' };
    window.AgriState.user.avatar = dataUrl;
    localStorage.setItem('agri_user', JSON.stringify(window.AgriState.user));

    const profileAvatar = document.getElementById('profileAvatar') || document.getElementById('profileModalAvatar');
    if (profileAvatar) profileAvatar.src = dataUrl;

    const dashAvatar = document.getElementById('farmerAvatar');
    if (dashAvatar) dashAvatar.src = dataUrl;

    updateAuthUI();
    showToast('Profile photo updated successfully!');
  };

  reader.readAsDataURL(file);
}

function copyGpsCoordinates() {
  const coordsEl = document.getElementById('profileInfoCoords');
  const text = coordsEl ? coordsEl.textContent.trim() : '16.4582° N, 120.5891° E';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('GPS coordinates copied: ' + text);
    }).catch(() => {
      showToast('Coordinates: ' + text);
    });
  } else {
    showToast('Coordinates: ' + text);
  }
}

// -------------------------------------------------------------
// REQUIREMENTS MANAGEMENT (Pristine checklist & dynamic upload)
// -------------------------------------------------------------
function renderFarmerRequirements() {
  const container = document.getElementById('farmerRequirementsList');
  if (!container) return;

  const reqs = getStoredFarmerRequirements();
  container.innerHTML = reqs.map(req => {
    const isPending = req.status === 'pending';
    const isSubmitted = req.status === 'submitted';
    const isApproved = req.status === 'approved';

    let statusBadge = '';
    if (isPending) {
      statusBadge = `<span style="background: #f1f5f9; color: #475569; font-size: 0.725rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 9999px; border: 1px solid #cbd5e1; text-transform: uppercase;">Pending Upload</span>`;
    } else if (isSubmitted) {
      statusBadge = `<span style="background: #eff6ff; color: #1d4ed8; font-size: 0.725rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 9999px; border: 1px solid #bfdbfe; text-transform: uppercase;">● Pending Verification</span>`;
    } else if (isApproved) {
      statusBadge = `<span style="background: #dcfce7; color: #15803d; font-size: 0.725rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 9999px; text-transform: uppercase;">✓ Approved</span>`;
    } else {
      statusBadge = `<span style="background: #fee2e2; color: #b91c1c; font-size: 0.725rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 9999px; text-transform: uppercase;">✕ Disapproved</span>`;
    }

    return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1rem; border-radius: var(--radius-sm); background: #ffffff; border: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 0.75rem; transition: border-color 0.2s;">
        <div style="display: flex; align-items: flex-start; gap: 0.75rem; max-width: 520px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: ${isSubmitted ? '#dbeafe' : '#f0fdf4'}; color: ${isSubmitted ? '#1d4ed8' : '#15803d'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0; margin-top: 0.1rem;">
            ${isSubmitted ? '⏳' : '📋'}
          </div>
          <div>
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.15rem;">
              ${req.category}
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">
              ${req.title}
            </div>
            <div style="font-size: 0.775rem; color: var(--text-secondary); line-height: 1.4;">
              ${req.description}
            </div>
            ${req.file_name ? `
              <div style="font-size: 0.75rem; color: #15803d; font-weight: 700; margin-top: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
                📄 Attached: ${req.file_name} (${req.uploaded_at || 'Just now'})
              </div>
            ` : `
              <div style="font-size: 0.725rem; color: var(--text-muted); margin-top: 0.25rem;">
                Accepted Formats: ${req.formats}
              </div>
            `}
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          ${statusBadge}
          <button type="button" onclick="openRequirementsUploadModal('${req.id}')" class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.75rem; background: #ffffff;">
            ${req.file_name ? 'Re-upload' : 'Upload'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openRequirementsUploadModal(reqId) {
  const modal = document.getElementById('requirementUploadModal');
  if (!modal) return;

  const select = document.getElementById('reqTypeSelect');
  if (select && reqId) {
    select.value = reqId;
  }

  const fileInput = document.getElementById('reqDocFileInput');
  if (fileInput) fileInput.value = '';

  const display = document.getElementById('reqFileNameDisplay');
  if (display) {
    display.textContent = 'Click to browse or drop file here';
    display.style.color = '#15803d';
  }

  modal.classList.add('open');
}

function closeRequirementsUploadModal() {
  const modal = document.getElementById('requirementUploadModal');
  if (modal) modal.classList.remove('open');
}

function handleReqFileSelection(e) {
  const display = document.getElementById('reqFileNameDisplay');
  if (!display) return;

  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    display.textContent = `Selected: ${file.name} (${sizeMb} MB)`;
    display.style.color = '#15803d';
  } else {
    display.textContent = 'Click to browse or drop file here';
  }
}

function submitRequirementUpload(e) {
  if (e) e.preventDefault();

  const select = document.getElementById('reqTypeSelect');
  const fileInput = document.getElementById('reqDocFileInput');
  const notesInput = document.getElementById('reqDocNotes');

  const reqId = select ? select.value : 'rsbsa';
  const file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
  const fileName = file ? file.name : `${reqId.toUpperCase()}_Document_Scan.pdf`;

  const reqs = getStoredFarmerRequirements();
  const targetReq = reqs.find(r => r.id === reqId);
  if (targetReq) {
    targetReq.status = 'submitted';
    targetReq.file_name = fileName;
    targetReq.uploaded_at = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  saveFarmerRequirements(reqs);
  renderFarmerRequirements();
  closeRequirementsUploadModal();

  if (notesInput) notesInput.value = '';
  showToast('Accreditation requirement uploaded and submitted for DA verification!');
}

// -------------------------------------------------------------
// E-WALLETS & QR CODE MANAGEMENT (Direct scan-to-pay payments)
// -------------------------------------------------------------
function renderFarmerEWallets() {
  const grid = document.getElementById('farmerEWalletsGrid');
  if (!grid) return;

  const wallets = getStoredFarmerEWallets();
  grid.innerHTML = wallets.map(w => {
    const hasQr = Boolean(w.qr_code);
    const isCustom = !w.id.startsWith('ew-gcash') && !w.id.startsWith('ew-landbank');
    const badgeBg = w.badge_bg || '#15803d';
    const badgeLetter = (w.bank_name || 'E')[0];

    return `
      <div style="background: #ffffff; border-radius: var(--radius-sm); padding: 1.15rem; border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; box-shadow: var(--shadow-sm);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: ${badgeBg}; color: white; display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 800; flex-shrink: 0;">
                ${badgeLetter}
              </div>
              <div>
                <strong style="font-size: 0.95rem; color: var(--text-main); display: block; line-height: 1.2;">
                  ${w.bank_name}
                </strong>
                <span style="font-size: 0.725rem; color: ${w.is_primary ? '#16a34a' : 'var(--text-muted)'}; font-weight: 700;">
                  ${w.is_primary ? '● Primary Disbursement' : 'Direct Payment Channel'}
                </span>
              </div>
            </div>
            ${w.is_primary ? `<span style="font-size: 0.7rem; background: #dcfce7; color: #166534; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px;">Primary</span>` : (isCustom ? `<button type="button" onclick="deleteFarmerEWallet('${w.id}')" title="Remove Wallet" style="background: none; border: none; color: #ef4444; font-size: 0.9rem; cursor: pointer; padding: 0.2rem;">🗑</button>` : '')}
          </div>

          <div style="font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary); background: var(--bg-subtle); padding: 0.65rem 0.75rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem;">
            <div>Account Name: <strong style="color: var(--text-main);">${w.account_name}</strong></div>
            <div>Account / Mobile: <strong style="color: var(--text-main);">${w.account_number}</strong></div>
          </div>

          <!-- Direct Payment QR Code Area -->
          <div style="border: 1px dashed ${hasQr ? '#86efac' : '#cbd5e1'}; background: ${hasQr ? '#f0fdf4' : '#f8fafc'}; border-radius: var(--radius-sm); padding: 0.65rem 0.75rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              ${hasQr ? `
                <img src="${w.qr_code}" alt="Payment QR" style="width: 44px; height: 44px; object-fit: contain; border-radius: 4px; border: 1px solid #bbf7d0; background: #ffffff; cursor: pointer; padding: 2px;" onclick="viewFullQrCode('${w.id}')" title="Click to view large QR">
                <div>
                  <span style="font-size: 0.75rem; font-weight: 700; color: #15803d; display: block;">QR Code Active</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted);">Direct payments enabled</span>
                </div>
              ` : `
                <div style="width: 44px; height: 44px; border-radius: 4px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                  📱
                </div>
                <div>
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: block;">No QR Code</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted);">Upload to enable scan-to-pay</span>
                </div>
              `}
            </div>

            <div style="display: flex; gap: 0.35rem;">
              ${hasQr ? `
                <button type="button" onclick="viewFullQrCode('${w.id}')" class="btn-secondary" style="font-size: 0.7rem; padding: 0.25rem 0.55rem; background: #ffffff;">
                  View QR
                </button>
              ` : ''}
              <button type="button" onclick="openQrUploadForWallet('${w.id}')" class="btn-secondary" style="font-size: 0.7rem; padding: 0.25rem 0.55rem; background: #ffffff;">
                ${hasQr ? 'Replace' : 'Upload QR'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openAddEWalletModal() {
  const modal = document.getElementById('addEWalletModal');
  if (!modal) return;

  stagedNewWalletQr = null;
  const form = document.getElementById('addEWalletForm');
  if (form) form.reset();

  const previewCont = document.getElementById('newWalletQrPreviewContainer');
  const placeholder = document.getElementById('newWalletQrPlaceholder');
  if (previewCont) previewCont.style.display = 'none';
  if (placeholder) placeholder.style.display = 'block';

  modal.classList.add('open');
}

function closeAddEWalletModal() {
  const modal = document.getElementById('addEWalletModal');
  if (modal) modal.classList.remove('open');
}

function handleQrUploadPreview(e) {
  if (!e.target.files || !e.target.files[0]) return;
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(evt) {
    stagedNewWalletQr = evt.target.result;
    const previewImg = document.getElementById('newWalletQrPreviewImg');
    const previewCont = document.getElementById('newWalletQrPreviewContainer');
    const placeholder = document.getElementById('newWalletQrPlaceholder');

    if (previewImg) previewImg.src = stagedNewWalletQr;
    if (previewCont) previewCont.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  };

  reader.readAsDataURL(file);
}

function saveNewEWallet(e) {
  if (e) e.preventDefault();

  const providerSelect = document.getElementById('newWalletProvider');
  const nameInput = document.getElementById('newWalletAccountName');
  const numInput = document.getElementById('newWalletAccountNumber');

  const provider = providerSelect ? providerSelect.value : 'other';
  const accountName = nameInput ? nameInput.value.trim() : 'Ramon Dela Cruz';
  const accountNumber = numInput ? numInput.value.trim() : '';

  let bankName = 'Other E-Wallet';
  let badgeBg = '#15803d';
  let badgeLetter = 'E';

  switch (provider) {
    case 'gcash':
      bankName = 'GCash Wallet';
      badgeBg = '#0284c7';
      badgeLetter = 'G';
      break;
    case 'maya':
      bankName = 'Maya (PayMaya)';
      badgeBg = '#16a34a';
      badgeLetter = 'M';
      break;
    case 'seabank':
      bankName = 'SeaBank Philippines';
      badgeBg = '#ea580c';
      badgeLetter = 'S';
      break;
    case 'gotyme':
      bankName = 'GoTyme Bank';
      badgeBg = '#0891b2';
      badgeLetter = 'G';
      break;
    case 'landbank':
      bankName = 'Land Bank of the Philippines';
      badgeBg = '#15803d';
      badgeLetter = 'L';
      break;
    case 'bpi':
      bankName = 'Bank of the Philippine Islands (BPI)';
      badgeBg = '#b91c1c';
      badgeLetter = 'B';
      break;
    case 'bdo':
      bankName = 'BDO Unibank';
      badgeBg = '#1e3a8a';
      badgeLetter = 'B';
      break;
    case 'unionbank':
      bankName = 'UnionBank of the Philippines';
      badgeBg = '#d97706';
      badgeLetter = 'U';
      break;
    default:
      bankName = 'Electronic Wallet';
      badgeBg = '#059669';
      badgeLetter = 'W';
  }

  const qrCodeData = stagedNewWalletQr || generateRealisticQrSvg(bankName, accountNumber);

  const newWallet = {
    id: `ew-${Date.now()}`,
    provider: provider,
    bank_name: bankName,
    badge_bg: badgeBg,
    badge_letter: badgeLetter,
    account_name: accountName,
    account_number: accountNumber,
    is_primary: false,
    qr_code: qrCodeData
  };

  const wallets = getStoredFarmerEWallets();
  wallets.push(newWallet);
  saveFarmerEWallets(wallets);

  renderFarmerEWallets();
  closeAddEWalletModal();

  showToast(`Added ${bankName} with direct payment QR support!`);
}

function deleteFarmerEWallet(walletId) {
  let wallets = getStoredFarmerEWallets();
  wallets = wallets.filter(w => w.id !== walletId);
  saveFarmerEWallets(wallets);
  renderFarmerEWallets();
  showToast('Payment channel removed.');
}

function openQrUploadForWallet(walletId) {
  activeTargetWalletQrId = walletId;
  const input = document.getElementById('specificWalletQrFileInput');
  if (input) {
    input.value = '';
    input.click();
  }
}

function handleSpecificWalletQrUpload(e) {
  if (!activeTargetWalletQrId || !e.target.files || !e.target.files[0]) return;
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    const wallets = getStoredFarmerEWallets();
    const wallet = wallets.find(w => w.id === activeTargetWalletQrId);
    if (wallet) {
      wallet.qr_code = dataUrl;
      saveFarmerEWallets(wallets);
      renderFarmerEWallets();
      showToast(`Updated direct payment QR code for ${wallet.bank_name}!`);
    }
  };

  reader.readAsDataURL(file);
}

function viewFullQrCode(walletId) {
  const wallets = getStoredFarmerEWallets();
  const wallet = wallets.find(w => w.id === walletId) || wallets[0];
  if (!wallet) return;

  const modal = document.getElementById('qrCodeViewModal');
  if (!modal) return;

  const badge = document.getElementById('fullQrProviderBadge');
  const title = document.getElementById('fullQrWalletTitle');
  const account = document.getElementById('fullQrWalletAccount');
  const img = document.getElementById('fullQrCodeImg');

  if (badge) badge.textContent = `${wallet.bank_name} Direct QR`;
  if (title) title.textContent = `Scan to Pay ${wallet.account_name}`;
  if (account) account.textContent = `${wallet.bank_name}: ${wallet.account_number}`;
  if (img) img.src = wallet.qr_code || generateRealisticQrSvg(wallet.bank_name, wallet.account_number);

  modal.classList.add('open');
}

function closeFullQrModal() {
  const modal = document.getElementById('qrCodeViewModal');
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

// -------------------------------------------------------------
// 7B. DEDICATED SELL HARVEST PAGE & PRODUCER STUDIO
// -------------------------------------------------------------

let currentAiRecommendedPrice = 85;

function getProductPhotoUrl(cropName, categoryId) {
  const name = (cropName || '').toLowerCase();
  if (name.includes('strawberr') || name.includes('fresa')) {
    return 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800';
  }
  if (name.includes('bean') || name.includes('habichuelas') || name.includes('baguio')) {
    return 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800';
  }
  if (name.includes('cabbage') || name.includes('repolyo')) {
    return 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800';
  }
  if (name.includes('carrot')) {
    return 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800';
  }
  if (name.includes('lettuce') || name.includes('romaine') || name.includes('salad')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800';
  }
  if (name.includes('rice') || name.includes('bigas') || name.includes('palay') || name.includes('dinorado') || name.includes('grain')) {
    return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800';
  }
  if (name.includes('egg') || name.includes('itlog')) {
    return 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800';
  }
  if (name.includes('mango') || name.includes('mangga')) {
    return 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800';
  }
  if (name.includes('tomato') || name.includes('kamatis')) {
    return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800';
  }
  if (name.includes('fish') || name.includes('bangus') || name.includes('tilapia') || name.includes('seafood')) {
    return 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800';
  }
  if (name.includes('coco') || name.includes('niyog')) {
    return 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800';
  }
  if (name.includes('herb') || name.includes('spice') || name.includes('ginger') || name.includes('garlic')) {
    return 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800';
  }

  // Category fallbacks
  switch (categoryId) {
    case 'cat-fruit':
      return 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800';
    case 'cat-rice':
      return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800';
    case 'cat-root':
      return 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800';
    case 'cat-poultry':
      return 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800';
    case 'cat-fish':
      return 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800';
    case 'cat-coco':
      return 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800';
    case 'cat-herb':
      return 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800';
    default:
      return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800';
  }
}

function initSellHarvestPage() {
  const form = document.getElementById('sellHarvestPageForm');
  if (!form) return;

  const user = window.AgriState.user;

  // Set default target harvest / dispatch date to tomorrow
  const dateInput = document.getElementById('pageHarvestDate');
  if (dateInput && !dateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Populate logged-in farmer details
  if (user) {
    const previewFarmer = document.getElementById('previewFarmerName');
    if (previewFarmer) {
      previewFarmer.textContent = user.farm_name || user.full_name || 'Dela Cruz Family Farm';
    }
  }

  // Initial calculation and card synchronization
  handleListingFormInput();
  triggerAiPriceRecommendation(false);
  renderSellHarvestActiveListings();
}

function handleListingFormInput() {
  const cropInput = document.getElementById('pageCropName') || document.getElementById('sellCropName');
  const catSelect = document.getElementById('pageCropCategory') || document.getElementById('sellCategory');
  const unitSelect = document.getElementById('pageCropUnit') || document.getElementById('sellUnit');
  const priceInput = document.getElementById('pageCropPrice') || document.getElementById('sellPrice');
  const qtyInput = document.getElementById('pageCropQuantity') || document.getElementById('sellQuantity');
  const descInput = document.getElementById('pageCropDescription') || document.getElementById('sellDescription');

  const cropName = cropInput ? cropInput.value.trim() : '';
  const categoryVal = catSelect ? catSelect.value : 'cat-veg';
  const categoryText = catSelect && catSelect.options[catSelect.selectedIndex] ? catSelect.options[catSelect.selectedIndex].text : 'Vegetables';
  const unit = unitSelect ? unitSelect.value : 'kg';
  const price = priceInput ? parseFloat(priceInput.value) || 0 : 0;
  const quantity = qtyInput ? parseFloat(qtyInput.value) || 0 : 0;
  const desc = descInput ? descInput.value.trim() : '';

  // Gross payout calculation
  const grossValueDisplay = document.getElementById('batchGrossValueDisplay');
  if (grossValueDisplay) {
    const totalGross = price * quantity;
    grossValueDisplay.textContent = `₱${totalGross.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (100% to producer)`;
  }

  // Synchronize Live Buyer Card Preview
  const previewTitle = document.getElementById('previewCropTitle');
  const previewCategory = document.getElementById('previewCategoryBadge');
  const previewPrice = document.getElementById('previewPriceTag');
  const previewUnit = document.getElementById('previewUnitTag');
  const previewQty = document.getElementById('previewQuantityTag');
  const previewDesc = document.getElementById('previewCropDesc');
  const previewImg = document.getElementById('previewProductImg');

  if (previewTitle) previewTitle.textContent = cropName || 'Highland Product Listing';
  if (previewCategory) previewCategory.textContent = categoryText;
  if (previewPrice) previewPrice.textContent = `₱${price > 0 ? price.toLocaleString() : '85'}`;
  if (previewUnit) previewUnit.textContent = `/ ${unit}`;
  if (previewQty) previewQty.textContent = `${quantity > 0 ? quantity.toLocaleString() : '150'} ${unit.includes('kg') ? 'kg' : unit}`;
  if (previewDesc) previewDesc.textContent = desc || 'Freshly harvested mountain product grown with natural organic compost in Benguet.';
  if (previewImg) previewImg.src = getProductPhotoUrl(cropName, categoryVal);

  // Auto-adapt AI recommendations dynamically
  triggerAiPriceRecommendation(false);
}

function quickFillCrop(name, categoryVal, unit, price, qty, desc) {
  const cropInput = document.getElementById('pageCropName') || document.getElementById('sellCropName');
  const catSelect = document.getElementById('pageCropCategory') || document.getElementById('sellCategory');
  const unitSelect = document.getElementById('pageCropUnit') || document.getElementById('sellUnit');
  const priceInput = document.getElementById('pageCropPrice') || document.getElementById('sellPrice');
  const qtyInput = document.getElementById('pageCropQuantity') || document.getElementById('sellQuantity');
  const descInput = document.getElementById('pageCropDescription') || document.getElementById('sellDescription');

  if (cropInput) cropInput.value = name;
  if (catSelect) catSelect.value = categoryVal;
  if (unitSelect) unitSelect.value = unit;
  if (priceInput) priceInput.value = price;
  if (qtyInput) qtyInput.value = qty;
  if (descInput) descInput.value = desc;

  handleListingFormInput();
  triggerAiPriceRecommendation(true);
}

function triggerAiPriceRecommendation(isManual) {
  const cropInput = document.getElementById('pageCropName') || document.getElementById('sellCropName');
  const catSelect = document.getElementById('pageCropCategory') || document.getElementById('sellCategory');

  const crop = cropInput ? cropInput.value.trim().toLowerCase() : '';
  const categoryVal = catSelect ? catSelect.value : '';

  let advice = {
    cropLabel: 'Highland Vegetables',
    min: 75,
    max: 110,
    recommended: 85,
    unit: 'kg',
    retailAvg: '₱140 – ₱175 / kg',
    advantage: '+35% vs Middleman',
    tip: 'Benguet highland supply is steady. Pricing within the suggested range ensures rapid wholesale reservation.'
  };

  if (crop.includes('strawberr') || crop.includes('fresa')) {
    advice = {
      cropLabel: 'Benguet Strawberries',
      min: 190,
      max: 250,
      recommended: 220,
      unit: 'kg',
      retailAvg: '₱340 – ₱430 / kg',
      advantage: '+48% Direct Value',
      tip: 'High demand from Metro Manila bakeries and consumers. Cold-chain pickup recommended within 4 hours of harvest.'
    };
  } else if (crop.includes('bean') || crop.includes('baguio') || crop.includes('habichuelas')) {
    advice = {
      cropLabel: 'Baguio String Beans',
      min: 70,
      max: 100,
      recommended: 85,
      unit: 'kg',
      retailAvg: '₱135 – ₱165 / kg',
      advantage: '+38% vs Middleman',
      tip: 'Daily restaurant orders in Balintawak and Divisoria are active. Crisp mountain harvest commands top rates.'
    };
  } else if (crop.includes('cabbage') || crop.includes('repolyo')) {
    advice = {
      cropLabel: 'Mountain Green Cabbage',
      min: 45,
      max: 70,
      recommended: 60,
      unit: 'kg',
      retailAvg: '₱85 – ₱120 / kg',
      advantage: '+35% vs Middleman',
      tip: 'Tight-head mountain cabbage has high shipping tolerance. Wholesale buyers frequently order 200kg+ batches.'
    };
  } else if (crop.includes('carrot')) {
    advice = {
      cropLabel: 'Benguet Highland Carrots',
      min: 65,
      max: 95,
      recommended: 75,
      unit: 'kg',
      retailAvg: '₱120 – ₱155 / kg',
      advantage: '+36% vs Middleman',
      tip: 'Pre-washed grade-A carrots are preferred by institutional buyers and supermarkets.'
    };
  } else if (crop.includes('rice') || crop.includes('bigas') || crop.includes('dinorado') || crop.includes('palay')) {
    advice = {
      cropLabel: 'Milled Dinorado Rice',
      min: 2350,
      max: 2650,
      recommended: 2450,
      unit: 'sack (50kg)',
      retailAvg: '₱2,850 – ₱3,300 / sack',
      advantage: '+28% Net Margin',
      tip: 'Direct retail to suburban families without commercial trader markdown captures premium returns.'
    };
  } else if (crop.includes('egg') || crop.includes('itlog')) {
    advice = {
      cropLabel: 'Free-Range Native Eggs',
      min: 230,
      max: 275,
      recommended: 260,
      unit: 'tray (30s)',
      retailAvg: '₱310 – ₱360 / tray',
      advantage: '+30% Producer Return',
      tip: 'Consistent high household demand. Safe pulp egg-trays minimize transit breakage.'
    };
  } else if (crop.includes('mango') || crop.includes('mangga')) {
    advice = {
      cropLabel: 'Sweet Carabao Mangoes',
      min: 150,
      max: 210,
      recommended: 175,
      unit: 'kg',
      retailAvg: '₱240 – ₱300 / kg',
      advantage: '+40% vs Middleman',
      tip: 'Export quality grade-A mangoes achieve instant sell-out from online buyers.'
    };
  } else if (crop.includes('lettuce') || crop.includes('romaine')) {
    advice = {
      cropLabel: 'Hydro / Highland Romaine',
      min: 80,
      max: 130,
      recommended: 95,
      unit: 'kg',
      retailAvg: '₱175 – ₱240 / kg',
      advantage: '+42% vs Middleman',
      tip: 'Metro Manila salad bars and cafes require consistent daily batches. Keep refrigerated.'
    };
  } else if (categoryVal === 'cat-fruit') {
    advice = {
      cropLabel: 'Fresh Philippine Fruits',
      min: 110,
      max: 180,
      recommended: 140,
      unit: 'kg',
      retailAvg: '₱190 – ₱260 / kg',
      advantage: '+36% vs Middleman',
      tip: 'Direct farmgate fruit sales protect ripeness and provide full price transparency.'
    };
  }

  currentAiRecommendedPrice = advice.recommended;

  // Update UI Elements
  const labelEl = document.getElementById('aiAdvisorCropLabel');
  const rangeEl = document.getElementById('aiSuggestedRange');
  const retailEl = document.getElementById('aiRetailAvg');
  const noteEl = document.getElementById('aiAdvisorNote');
  const applyBtn = document.getElementById('applyAiPriceBtn');

  if (labelEl) labelEl.textContent = advice.cropLabel;
  if (rangeEl) rangeEl.textContent = `₱${advice.min} – ₱${advice.max} / ${advice.unit}`;
  if (retailEl) retailEl.textContent = advice.retailAvg;
  if (noteEl) noteEl.textContent = `Tip: ${advice.tip}`;
  if (applyBtn) {
    applyBtn.textContent = `Apply Suggested Price (₱${advice.recommended})`;
  }

  // Also support legacy AI advice card in dashboard if present
  const legacyAdviceEl = document.getElementById('aiPriceAdvice');
  if (legacyAdviceEl) {
    legacyAdviceEl.style.display = 'block';
    legacyAdviceEl.innerHTML = `
      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.8rem; color: #92400e;">
        <strong>Market Price Recommendation:</strong><br>
        Estimated Range: <strong>₱${advice.min} – ₱${advice.max} per ${advice.unit}</strong><br>
        <em>Note: ${advice.tip}</em>
        <div style="margin-top: 0.35rem;">
          <button type="button" onclick="applySuggestedPrice(${advice.recommended})" style="background: #d97706; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.725rem; font-weight: 700; cursor: pointer;">
            Set ₱${advice.recommended}
          </button>
        </div>
      </div>
    `;
  }

  if (isManual) {
    showToast(`AI Market Advisor refreshed rates for ${advice.cropLabel}!`);
  }
}

function applyAiRecommendedPrice() {
  const priceInput = document.getElementById('pageCropPrice') || document.getElementById('sellPrice');
  if (priceInput) {
    priceInput.value = currentAiRecommendedPrice;
    handleListingFormInput();
    showToast(`Applied AI suggested farmgate price: ₱${currentAiRecommendedPrice}`);
  }
}

function applySuggestedPrice(price) {
  const priceInput = document.getElementById('pageCropPrice') || document.getElementById('sellPrice');
  if (priceInput) {
    priceInput.value = price;
    handleListingFormInput();
    showToast(`Applied recommended farmgate price: ₱${price}`);
  }
}

function handlePageHarvestSubmit(e) {
  if (e) e.preventDefault();

  const cropInput = document.getElementById('pageCropName') || document.getElementById('sellCropName');
  const catSelect = document.getElementById('pageCropCategory') || document.getElementById('sellCategory');
  const varietyInput = document.getElementById('pageCropVariety');
  const statusSelect = document.getElementById('pageHarvestStatus');
  const unitSelect = document.getElementById('pageCropUnit') || document.getElementById('sellUnit');
  const priceInput = document.getElementById('pageCropPrice') || document.getElementById('sellPrice');
  const qtyInput = document.getElementById('pageCropQuantity') || document.getElementById('sellQuantity');
  const dateInput = document.getElementById('pageHarvestDate');
  const hubInput = document.getElementById('pageHubLocation');
  const descInput = document.getElementById('pageCropDescription') || document.getElementById('sellDescription');

  const cropName = cropInput ? cropInput.value.trim() : '';
  if (!cropName) {
    showToast('Please enter the crop / product name.');
    if (cropInput) cropInput.focus();
    return;
  }

  const price = priceInput ? parseFloat(priceInput.value) || 0 : 0;
  if (price <= 0) {
    showToast('Please specify a valid farmgate price.');
    if (priceInput) priceInput.focus();
    return;
  }

  const quantity = qtyInput ? parseFloat(qtyInput.value) || 0 : 0;
  if (quantity <= 0) {
    showToast('Please enter the available harvest quantity.');
    if (qtyInput) qtyInput.focus();
    return;
  }

  const categoryVal = catSelect ? catSelect.value : 'cat-veg';
  const categoryText = catSelect && catSelect.options[catSelect.selectedIndex] ? catSelect.options[catSelect.selectedIndex].text : 'Vegetables';
  const unit = unitSelect ? unitSelect.value : 'kg';
  const variety = varietyInput ? varietyInput.value.trim() : '';
  const harvestStatus = statusSelect ? statusSelect.value : 'fresh';
  const harvestDate = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
  const hubLocation = hubInput ? hubInput.value.trim() : 'Km. 5 Agri-Hub Cold-Chain Facility, La Trinidad';
  const desc = descInput && descInput.value.trim() ? descInput.value.trim() : 'Fresh seasonal harvest direct from our farm fields.';

  const user = window.AgriState.user;

  const newProd = {
    id: 'prod-' + Date.now(),
    name: cropName,
    category_name: categoryText,
    category_id: categoryVal,
    price: price,
    unit: unit,
    quantity: quantity,
    variety: variety,
    harvest_status: harvestStatus,
    harvest_date: harvestDate,
    hub_location: hubLocation,
    is_available: true,
    image_url: getProductPhotoUrl(cropName, categoryVal),
    farmer_name: (user && (user.farm_name || user.full_name)) || 'Dela Cruz Family Farm',
    farmer_id: (user && user.id) || 'farmer-ramon',
    city: (user && user.city) || 'La Trinidad',
    province: (user && user.province) || 'Benguet',
    description: desc,
    rating: '5.0',
    reviews_count: 1,
    created_at: new Date().toISOString()
  };

  // Add to active state in memory
  window.AgriState.products.unshift(newProd);

  // Persist to local storage custom listings
  try {
    const customListings = JSON.parse(localStorage.getItem('agri_custom_products') || '[]');
    customListings.unshift(newProd);
    localStorage.setItem('agri_custom_products', JSON.stringify(customListings));
  } catch (err) {
    console.warn('Could not persist custom product listing:', err);
  }

  // Refresh grids if present
  if (document.getElementById('productsGrid')) {
    renderCategories();
    renderProducts();
  }
  if (document.getElementById('farmerProductsGrid')) {
    renderFarmerOwnProducts();
  }

  // Update Sell Harvest Active Catalog List
  renderSellHarvestActiveListings();

  // Show Success Modal
  const successModal = document.getElementById('harvestPublishSuccessModal');
  const successTitle = document.getElementById('successCropTitle');
  const successDetails = document.getElementById('successCropDetails');

  if (successModal) {
    if (successTitle) successTitle.textContent = `${newProd.name} Listed!`;
    if (successDetails) {
      successDetails.innerHTML = `
        Your batch of <strong>${newProd.quantity} ${newProd.unit}</strong> at <strong>₱${newProd.price.toLocaleString()}/${newProd.unit}</strong> is now officially published in the AgriConnect direct-to-consumer catalog.
      `;
    }
    successModal.classList.add('open');
  } else {
    showToast(`Harvest listing "${newProd.name}" published successfully!`);
  }

  // Close legacy modal if open
  closeSellHarvestModal();
}

function submitHarvestListing(e) {
  handlePageHarvestSubmit(e);
}

function handleSellHarvestSubmit(e) {
  handlePageHarvestSubmit(e);
}

function submitNewListing(e) {
  handlePageHarvestSubmit(e);
}

function closePublishSuccessModal() {
  const modal = document.getElementById('harvestPublishSuccessModal');
  if (modal) modal.classList.remove('open');

  const form = document.getElementById('sellHarvestPageForm');
  if (form) {
    form.reset();
    handleListingFormInput();
  }
}

function resetListingForm() {
  setTimeout(() => {
    handleListingFormInput();
    triggerAiPriceRecommendation(false);
  }, 50);
}

function renderSellHarvestActiveListings() {
  const container = document.getElementById('activeFarmerListingsContainer');
  if (!container) return;

  const user = window.AgriState.user;
  let ownProducts = window.AgriState.products.filter(p => isUserOwnProduct(p));
  if (ownProducts.length === 0 && user && user.role === 'farmer') {
    ownProducts = window.AgriState.products.filter(p => p.farmer_id === 'farmer-ramon');
  }
  if (ownProducts.length === 0) {
    ownProducts = window.AgriState.products.slice(0, 3);
  }

  container.innerHTML = ownProducts.slice(0, 4).map(p => `
    <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); background: var(--bg-page); transition: transform 0.15s ease;">
      <img src="${p.image_url}" alt="${p.name}" style="width: 48px; height: 48px; border-radius: 6px; object-fit: cover; flex-shrink: 0;">
      <div style="flex: 1; min-width: 0;">
        <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${p.quantity} ${p.unit} remaining</div>
      </div>
      <div style="text-align: right; flex-shrink: 0;">
        <div style="font-size: 0.9rem; font-weight: 800; color: #15803d;">₱${p.price.toLocaleString()}</div>
        <div style="font-size: 0.675rem; color: var(--text-muted);">/${p.unit}</div>
      </div>
    </div>
  `).join('');
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
    const redirectUrl = params.get('redirect') || 'dashboard.html';
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
    specialty: specialty || 'Fresh Agricultural Product',
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
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect') || 'dashboard.html';
    window.location.href = redirectUrl;
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
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect') || 'dashboard.html';
    window.location.href = redirectUrl;
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
    document.body.classList.toggle('is-logged-in', Boolean(user));
  }

  // Header Nav: Clean up any Dashboard link from main navigation bar (moved to header-actions)
  const headerNav = document.getElementById('headerNav');
  if (headerNav) {
    const existingDashLinks = headerNav.querySelectorAll('a[href="dashboard.html"]');
    existingDashLinks.forEach(link => link.remove());
  }

  // Header Actions: Toggle Dashboard button in the former Sell Harvest position
  const headerDashBtns = document.querySelectorAll('.header-dashboard-btn');
  headerDashBtns.forEach(btn => {
    if (user) {
      btn.style.setProperty('display', 'inline-flex', 'important');
      if (window.location.pathname.includes('dashboard.html')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    } else {
      btn.style.setProperty('display', 'none', 'important');
    }
  });

  // Toggle Header Cart Button vs Farmer Orders Management Button
  const cartBtns = document.querySelectorAll('button[aria-label="View Cart"], button[aria-label="Manage Farmer Orders"], button[onclick*="toggleCart"], button[onclick*="toggleFarmerOrdersDrawer"]');
  cartBtns.forEach(btn => {
    if (isFarmer) {
      btn.setAttribute('aria-label', 'Manage Farmer Orders');
      btn.setAttribute('title', 'Manage Farmer Received Orders');
      btn.setAttribute('onclick', 'toggleFarmerOrdersDrawer(true)');
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
          <path d="m9 14 2 2 4-4"/>
        </svg>
        <span class="cart-badge farmer-orders-badge" style="display: none;">0</span>
      `;
    } else {
      btn.setAttribute('aria-label', 'View Cart');
      btn.setAttribute('title', 'View Cart');
      btn.setAttribute('onclick', 'toggleCart(true)');
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        </svg>
        <span id="cartBadge" class="cart-badge" style="display: none;">0</span>
      `;
    }
  });

  updateCartBadge();
  renderCartPreview();

  // Remove producer welcome notification bar if present
  const farmerBanner = document.getElementById('farmerHeroBanner');
  if (farmerBanner) {
    farmerBanner.remove();
  }

  // Toggle "Sell Harvest" buttons
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

  // Update "Track Orders" navbar link to "Track Buyers' Orders" if logged in as farmer
  const trackNavLinks = document.querySelectorAll('a[href="track-orders.html"], a[href="track-orders.html#"]');
  trackNavLinks.forEach(link => {
    if (link.classList.contains('nav-link')) {
      link.textContent = isFarmer ? "Track Buyers' Orders" : "Track Orders";
    }
  });

  if (!container) return;

  if (user && user.full_name) {
    const initials = user.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const isProfilePage = window.location.pathname.includes('profile.html');
    container.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; flex-shrink: 0;">
        <a href="profile.html" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit; padding: 0.2rem 0.35rem; border-radius: var(--radius-sm); transition: opacity 0.15s ease;" title="View My Profile">
          <div style="width: 32px; height: 32px; border-radius: 9999px; background: var(--primary); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0; box-shadow: var(--shadow-sm); overflow: hidden;">
            ${user.avatar ? `<img src="${user.avatar}" alt="${user.full_name}" style="width: 100%; height: 100%; object-fit: cover;">` : initials}
          </div>
          <div style="display: flex; flex-direction: column; line-height: 1.15; text-align: left; white-space: nowrap;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); white-space: nowrap; max-width: 150px; overflow: hidden; text-overflow: ellipsis;" title="${user.full_name}">${user.full_name}</span>
            <span style="font-size: 0.68rem; color: var(--primary); font-weight: 700; text-transform: uppercase; white-space: nowrap;">${user.role === 'farmer' ? 'Farmer' : 'Buyer'}</span>
          </div>
        </a>
        <a href="profile.html" class="btn-secondary" style="font-size: 0.725rem; padding: 0.28rem 0.65rem; border-color: ${isProfilePage ? 'var(--primary)' : 'var(--border-subtle)'}; background: ${isProfilePage ? 'var(--primary-light)' : '#ffffff'}; color: ${isProfilePage ? 'var(--primary-deep)' : 'var(--text-main)'}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 700;" title="My Profile">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Profile</span>
        </a>
        <button onclick="handleLogout()" class="btn-secondary" style="font-size: 0.725rem; padding: 0.28rem 0.55rem; border-color: var(--border-subtle); white-space: nowrap;" title="Log out">
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

// -------------------------------------------------------------
// 10. FARMER DASHBOARD CONTROLLER
// -------------------------------------------------------------
const DEFAULT_FARMER_ORDERS = [
  {
    id: "ORD-8491",
    customer_name: "Maria Santos",
    customer_phone: "0917-552-3901",
    delivery_address: "Quezon City, Metro Manila",
    items: [
      { name: "Baguio Beans", quantity: 10, unit: "kg", price: 95 },
      { name: "Highland Cabbage", quantity: 15, unit: "kg", price: 70 }
    ],
    total_amount: 2000,
    status: "In Transit",
    status_code: "in_transit",
    remaining_time: "45 minutes",
    eta: "Today, 11:15 AM",
    temp_c: "3.8°C Temperature Verified",
    placed_at: "Today, 06:30 AM",
    delivery_method: "AgriConnect Direct Refrigerated Van"
  },
  {
    id: "ORD-8495",
    customer_name: "Chef Paolo Reyes (Bistro Lokal)",
    customer_phone: "0920-881-2244",
    delivery_address: "BGC, Taguig City",
    items: [
      { name: "Baguio Beans", quantity: 25, unit: "kg", price: 95 }
    ],
    total_amount: 2375,
    status: "Pending Harvest",
    status_code: "pending",
    remaining_time: "3 hours 20 minutes",
    eta: "Today, 02:30 PM",
    temp_c: "4.1°C Cold Store Verified",
    placed_at: "Today, 08:15 AM",
    delivery_method: "Direct Farmgate Bulk Pickup"
  },
  {
    id: "ORD-8512",
    customer_name: "Sari-Sari Community Mart",
    customer_phone: "0915-992-1088",
    delivery_address: "Marikina City, Metro Manila",
    items: [
      { name: "Benguet Strawberries", quantity: 12, unit: "punnets", price: 180 },
      { name: "Highland Cabbage", quantity: 30, unit: "kg", price: 70 }
    ],
    total_amount: 4260,
    status: "Scheduled Dispatch",
    status_code: "pending",
    remaining_time: "1 day",
    eta: "Tomorrow, 09:30 AM",
    temp_c: "3.5°C Chilled Prep",
    placed_at: "Today, 09:40 AM",
    delivery_method: "AgriConnect Next-Day Express"
  },
  {
    id: "ORD-8320",
    customer_name: "Elena Bautista",
    customer_phone: "0918-332-9011",
    delivery_address: "Pasig City, Metro Manila",
    items: [
      { name: "Highland Cabbage", quantity: 20, unit: "kg", price: 70 }
    ],
    total_amount: 1400,
    status: "Delivered",
    status_code: "delivered",
    remaining_time: "0 mins (Delivered)",
    eta: "Delivered Yesterday, 02:40 PM",
    temp_c: "Safe Cold-Chain Verified",
    placed_at: "Yesterday, 02:40 PM",
    delivery_method: "AgriConnect Express"
  },
  {
    id: "ORD-8210",
    customer_name: "Green Grocers Coop",
    customer_phone: "0919-441-8930",
    delivery_address: "Makati City",
    items: [
      { name: "Baguio Beans", quantity: 50, unit: "kg", price: 95 },
      { name: "Highland Cabbage", quantity: 40, unit: "kg", price: 70 }
    ],
    total_amount: 7550,
    status: "Delivered",
    status_code: "delivered",
    remaining_time: "0 mins (Delivered)",
    eta: "Delivered Sep 3, 2026",
    temp_c: "Safe Cold-Chain Verified",
    placed_at: "Sep 3, 2026",
    delivery_method: "Bulk Cold Logistics"
  },
  {
    id: "ORD-8192",
    customer_name: "Roberto Gonzales",
    customer_phone: "0927-112-4455",
    delivery_address: "San Juan City",
    items: [
      { name: "Baguio Beans", quantity: 8, unit: "kg", price: 95 }
    ],
    total_amount: 760,
    status: "Delivered",
    status_code: "delivered",
    remaining_time: "0 mins (Delivered)",
    eta: "Delivered Sep 2, 2026",
    temp_c: "Safe Cold-Chain Verified",
    placed_at: "Sep 2, 2026",
    delivery_method: "Standard Farm Dispatch"
  }
];

function getFarmerOrders() {
  const saved = localStorage.getItem('agri_farmer_orders');
  let orders = DEFAULT_FARMER_ORDERS;
  if (saved) {
    try {
      orders = JSON.parse(saved);
    } catch (e) {
      console.warn('Failed parsing farmer orders', e);
    }
  }

  // Ensure default remaining_time and eta exist on all orders
  let modified = false;
  orders = orders.map(o => {
    if (!o.remaining_time || !o.eta) {
      modified = true;
      if (o.status_code === 'delivered') {
        o.remaining_time = '0 mins (Delivered)';
        o.eta = o.eta || 'Delivered to Buyer';
        o.temp_c = o.temp_c || 'Safe Cold-Chain Verified';
      } else if (o.id === 'ORD-8491') {
        o.remaining_time = '45 minutes';
        o.eta = 'Today, 11:15 AM';
        o.temp_c = '3.8°C Temperature Verified';
      } else if (o.id === 'ORD-8495') {
        o.remaining_time = '3 hours 20 minutes';
        o.eta = 'Today, 02:30 PM';
        o.temp_c = '4.1°C Cold Store Verified';
      } else if (o.id === 'ORD-8512') {
        o.remaining_time = '1 day';
        o.eta = 'Tomorrow, 09:30 AM';
        o.temp_c = '3.5°C Chilled Prep';
      } else {
        o.remaining_time = '1 day';
        o.eta = 'Tomorrow, 10:00 AM';
        o.temp_c = '4.0°C Temperature Verified';
      }
    }
    return o;
  });

  if (modified || !saved) {
    localStorage.setItem('agri_farmer_orders', JSON.stringify(orders));
  }
  return orders;
}

function saveFarmerOrders(orders) {
  localStorage.setItem('agri_farmer_orders', JSON.stringify(orders));
}

let currentFarmerOrderFilter = 'all';

function filterFarmerOrders(filter) {
  currentFarmerOrderFilter = filter;
  renderFarmerOrders(filter);
}

function renderFarmerOrders(filter = currentFarmerOrderFilter) {
  const listEl = document.getElementById('farmerOrdersList');
  if (!listEl) return;

  const orders = getFarmerOrders();
  const pendingOrders = orders.filter(o => o.status_code === 'pending');
  const deliveredOrders = orders.filter(o => o.status_code === 'delivered');

  // Update tabs styling & counters
  const tabAll = document.getElementById('tabBtnAllOrders');
  const tabPending = document.getElementById('tabBtnPendingOrders');
  const tabDelivered = document.getElementById('tabBtnDeliveredOrders');

  if (tabAll) {
    tabAll.className = filter === 'all' ? 'btn-primary' : 'btn-secondary';
    tabAll.textContent = `All Orders (${orders.length})`;
  }
  if (tabPending) {
    tabPending.className = filter === 'pending' ? 'btn-primary' : 'btn-secondary';
    tabPending.textContent = `Pending Harvest (${pendingOrders.length})`;
  }
  if (tabDelivered) {
    tabDelivered.className = filter === 'delivered' ? 'btn-primary' : 'btn-secondary';
    tabDelivered.textContent = `Delivered (${deliveredOrders.length})`;
  }

  // Update KPI counters
  const statPending = document.getElementById('statPendingOrders');
  const statDelivered = document.getElementById('statDeliveredItems');
  if (statPending) statPending.textContent = `${pendingOrders.length} Order${pendingOrders.length === 1 ? '' : 's'}`;
  if (statDelivered) statDelivered.textContent = `${deliveredOrders.length} Completed`;

  let filtered = orders;
  if (filter === 'pending') {
    filtered = pendingOrders;
  } else if (filter === 'delivered') {
    filtered = deliveredOrders;
  }

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; background: #ffffff; border: 1px dashed var(--border-strong); border-radius: var(--radius-md);">
        <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">No orders found in this category.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map(o => `
    <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem 1.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.75rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span style="font-weight: 800; font-size: 1.05rem; color: var(--text-main);">${o.id}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">• ${o.placed_at}</span>
            <span style="font-size: 0.75rem; background: var(--bg-subtle); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--text-secondary); font-weight: 600;">${o.delivery_method}</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;">
            Buyer: <strong>${o.customer_name}</strong> • Phone: <span style="font-family: monospace;">${o.customer_phone}</span> • Destination: <span>${o.delivery_address}</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          ${o.status_code === 'pending' ? `
            <span style="background: #fef3c7; color: #b45309; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.7rem; border-radius: 9999px; border: 1px solid #fde68a;">
              ⏳ Pending Harvest & Packing
            </span>
            <button onclick="updateFarmerOrderStatus('${o.id}', 'delivered')" class="btn-primary" style="font-size: 0.75rem; padding: 0.35rem 0.75rem;">
              Mark as Delivered
            </button>
          ` : `
            <span style="background: #dcfce7; color: #166534; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.7rem; border-radius: 9999px; border: 1px solid #bbf7d0;">
              ✓ Delivered & Payout Credited
            </span>
          `}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; flex-direction: column; gap: 0.3rem;">
          ${o.items.map(item => `
            <div style="font-size: 0.85rem; color: var(--text-main);">
              <strong>${item.quantity} ${item.unit}</strong> × ${item.name} <span style="color: var(--text-muted); font-size: 0.78rem;">(@ ₱${item.price}/${item.unit})</span>
            </div>
          `).join('')}
        </div>

        <div style="text-align: right;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Direct Farmgate Total</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary-deep);">₱${o.total_amount.toLocaleString()}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function updateFarmerOrderStatus(orderId, newStatusCode) {
  const orders = getFarmerOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.status_code = newStatusCode;
  if (newStatusCode === 'delivered') {
    order.status = 'Delivered to Buyer';
    order.remaining_time = '0 mins (Delivered)';
  } else if (newStatusCode === 'in_transit') {
    order.status = 'In Transit';
    order.remaining_time = (order.remaining_time && !order.remaining_time.includes('0 mins')) ? order.remaining_time : '45 minutes';
  } else {
    order.status = 'Pending Harvest';
    order.remaining_time = (order.remaining_time && !order.remaining_time.includes('0 mins')) ? order.remaining_time : '1 day';
  }
  saveFarmerOrders(orders);
  renderFarmerOrders();
  if (typeof renderFarmerOrdersDrawer === 'function') {
    renderFarmerOrdersDrawer(currentFarmerDrawerFilter);
  }
  if (typeof renderOrderTrackingList === 'function' && document.getElementById('ordersListContainer')) {
    renderOrderTrackingList();
  }
  renderCartPreview();
  updateCartBadge(true);
  showToast(`Order ${orderId} marked as ${order.status}! Escrow payout updated.`);
}

function renderFarmerOwnProducts() {
  const container = document.getElementById('farmerProductsGrid');
  if (!container) return;

  const user = window.AgriState.user;
  let ownProducts = window.AgriState.products.filter(p => isUserOwnProduct(p));
  if (ownProducts.length === 0 && user && user.role === 'farmer') {
    ownProducts = window.AgriState.products.filter(p => p.farmer_id === 'farmer-ramon');
  }

  const statActive = document.getElementById('statActiveListings');
  if (statActive) {
    statActive.textContent = `${ownProducts.length} Product${ownProducts.length === 1 ? '' : 's'}`;
  }

  if (ownProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; background: #ffffff; border-radius: var(--radius-md); border: 1px dashed var(--border-strong);">
        <h4 style="font-size: 1.1rem; font-weight: 700;">No crops listed yet</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0.35rem 0 1rem;">Start listing your farm product directly to consumers without middlemen.</p>
        <button onclick="openSellHarvestModal()" class="btn-primary">+ List Your First Crop</button>
      </div>
    `;
    return;
  }

  container.innerHTML = ownProducts.map(p => `
    <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; display: flex; flex-direction: column; box-shadow: var(--shadow-sm);">
      <div style="position: relative; height: 180px; overflow: hidden;">
        <img src="${p.image_url}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
        <span style="position: absolute; top: 10px; left: 10px; background: rgba(21, 128, 61, 0.9); color: white; padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;">
          ${p.category_name}
        </span>
        <span style="position: absolute; top: 10px; right: 10px; background: #ffffff; color: var(--primary-deep); padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 800; box-shadow: var(--shadow-sm);">
          ${p.quantity} ${p.unit} in stock
        </span>
      </div>

      <div style="padding: 1.25rem; display: flex; flex-direction: column; flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin: 0;">${p.name}</h4>
          <span style="font-size: 0.8rem; font-weight: 700; color: #b45309;">★ ${p.rating || '5.0'}</span>
        </div>

        <p style="font-size: 0.825rem; color: var(--text-secondary); margin-bottom: 0.85rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${p.description}
        </p>

        <!-- Producer Notice: Cannot self-purchase -->
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 0.4rem 0.6rem; margin-bottom: 0.85rem; font-size: 0.725rem; color: #166534; font-weight: 600; display: flex; align-items: center; gap: 0.35rem;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Producer Listing • Public Self-Purchase Disabled
        </div>

        <div style="margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary-deep);">
              ₱${p.price.toLocaleString()}
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">per ${p.unit}</span>
          </div>

          <div style="display: flex; gap: 0.35rem;">
            <button onclick="editFarmerProductPrice('${p.id}')" class="btn-secondary" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;" title="Update Price or Inventory">
              Edit Price/Stock
            </button>
            <a href="marketplace.html" class="btn-primary" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; text-decoration: none;">
              Marketplace
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function editFarmerProductPrice(productId) {
  const p = window.AgriState.products.find(item => item.id === productId);
  if (!p) return;

  const newPriceStr = prompt(`Update price for ${p.name} (current: ₱${p.price} per ${p.unit}):`, p.price);
  if (newPriceStr === null) return;
  const newPrice = Number(newPriceStr);
  if (isNaN(newPrice) || newPrice <= 0) {
    showToast('Invalid price entered.');
    return;
  }

  const newQtyStr = prompt(`Update stock quantity for ${p.name} (current: ${p.quantity} ${p.unit}):`, p.quantity);
  if (newQtyStr === null) return;
  const newQty = Number(newQtyStr);
  if (isNaN(newQty) || newQty < 0) {
    showToast('Invalid quantity entered.');
    return;
  }

  p.price = newPrice;
  p.quantity = newQty;
  renderFarmerOwnProducts();
  showToast(`Updated "${p.name}" to ₱${newPrice}/${p.unit} with ${newQty} in stock!`);
}

// -------------------------------------------------------------
// 11. UNIFIED DASHBOARD CONTROLLER (BUYER & FARMER PORTALS)
// -------------------------------------------------------------

const DEFAULT_BUYER_ORDERS = [
  {
    id: 'AGRI-742918',
    date: 'Today, 8:15 AM',
    status: 'In Transit',
    status_code: 'to_deliver',
    eta: 'Today, ~2:30 PM (Cold-Chain Van #4)',
    fulfillment: 'delivery',
    temperature: '4.2°C (Optimal Cold-Chain)',
    origin: 'Dela Cruz Family Farm',
    originProvince: 'La Trinidad, Benguet',
    destination: 'Unit 802, Pioneer Woodlands, Mandaluyong, Metro Manila',
    driverName: 'Kuya Arnel Bautista',
    driverPhone: '0918-555-3211',
    paymentMethod: 'GCash (Paid)',
    progressStep: 3,
    items: [
      {
        id: 'prod-benguet-lettuce',
        name: 'Benguet Romaine Lettuce',
        price: 95,
        unit: 'kg',
        quantity: 2,
        farmer_name: 'Mang Ramon Dela Cruz',
        image_url: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400'
      },
      {
        id: 'prod-benguet-carrots',
        name: 'Fresh Benguet Carrots',
        price: 75,
        unit: 'kg',
        quantity: 3,
        farmer_name: 'Mang Ramon Dela Cruz',
        image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400'
      },
      {
        id: 'prod-baguio-strawberries',
        name: 'Sweet Baguio Strawberries',
        price: 280,
        unit: 'kg',
        quantity: 1,
        farmer_name: 'Mang Ramon Dela Cruz',
        image_url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400'
      }
    ],
    subtotal: 695,
    deliveryFee: 95,
    total: 790
  },
  {
    id: 'AGRI-918342',
    date: 'Yesterday, 4:20 PM',
    status: 'Harvested & Packing',
    status_code: 'to_deliver',
    eta: 'Tomorrow, Morning Dispatch (6:00 AM - 10:00 AM)',
    fulfillment: 'delivery',
    temperature: 'Ambient Ventilated Storage',
    origin: 'Santos Rice & Organic Grains',
    originProvince: 'Muñoz, Nueva Ecija',
    destination: 'Unit 802, Pioneer Woodlands, Mandaluyong, Metro Manila',
    driverName: 'Scheduled with Central Luzon Courier Hub',
    driverPhone: '0920-888-4102',
    paymentMethod: 'Cash on Delivery',
    progressStep: 2,
    items: [
      {
        id: 'prod-dinorado-rice',
        name: 'Premium Dinorado Organic Rice',
        price: 2450,
        unit: 'sack',
        quantity: 1,
        farmer_name: 'Tatay Ernesto Santos',
        image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
      }
    ],
    subtotal: 2450,
    deliveryFee: 150,
    total: 2600
  },
  {
    id: 'AGRI-582014',
    date: 'Aug 28, 2026',
    status: 'Delivered',
    status_code: 'past',
    deliveredDate: 'Aug 29, 2026, 11:15 AM',
    fulfillment: 'delivery',
    temperature: 'Cold-Chain Complete (Fresh Handover)',
    origin: 'Bukidnon Mountain Harvest',
    originProvince: 'Impasugong, Bukidnon',
    destination: 'Unit 802, Pioneer Woodlands, Mandaluyong, Metro Manila',
    driverName: 'Kuya Ronald Esguerra',
    driverPhone: '0919-444-8822',
    paymentMethod: 'GCash (Paid)',
    progressStep: 4,
    items: [
      {
        id: 'prod-sweet-papaya',
        name: 'Sweet Red Solo Papaya',
        price: 65,
        unit: 'kg',
        quantity: 5,
        farmer_name: 'Grace Tan-Bukidnon',
        image_url: 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400'
      },
      {
        id: 'prod-freerange-eggs',
        name: 'Native Free-Range Farm Eggs',
        price: 260,
        unit: 'tray',
        quantity: 2,
        farmer_name: 'Grace Tan-Bukidnon',
        image_url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400'
      }
    ],
    subtotal: 845,
    deliveryFee: 95,
    total: 940
  },
  {
    id: 'AGRI-419022',
    date: 'Aug 15, 2026',
    status: 'Delivered',
    status_code: 'past',
    deliveredDate: 'Aug 16, 2026, 3:45 PM',
    fulfillment: 'delivery',
    temperature: 'Cold-Chain Complete (Fresh Handover)',
    origin: 'Dela Cruz Family Farm',
    originProvince: 'La Trinidad, Benguet',
    destination: 'Unit 802, Pioneer Woodlands, Mandaluyong, Metro Manila',
    driverName: 'Kuya Arnel Bautista',
    driverPhone: '0918-555-3211',
    paymentMethod: 'Maya (Paid)',
    progressStep: 4,
    items: [
      {
        id: 'prod-highland-cabbage',
        name: 'Fresh Highland Cabbage',
        price: 55,
        unit: 'kg',
        quantity: 4,
        farmer_name: 'Mang Ramon Dela Cruz',
        image_url: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400'
      },
      {
        id: 'prod-baguio-beans',
        name: 'Baguio Beans (Snap Beans)',
        price: 85,
        unit: 'kg',
        quantity: 2,
        farmer_name: 'Mang Ramon Dela Cruz',
        image_url: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=400'
      }
    ],
    subtotal: 390,
    deliveryFee: 95,
    total: 485
  }
];

function getBuyerOrders() {
  const saved = localStorage.getItem('agri_buyer_orders');
  let orders = DEFAULT_BUYER_ORDERS;
  if (saved) {
    try {
      orders = JSON.parse(saved);
    } catch (e) {
      console.warn('Failed parsing buyer orders, falling back', e);
      orders = DEFAULT_BUYER_ORDERS;
    }
  }

  if (!orders || orders.length === 0) {
    orders = DEFAULT_BUYER_ORDERS;
  }

  // Also include any new session orders from AgriState.orders if not yet merged
  if (window.AgriState && Array.isArray(window.AgriState.orders)) {
    window.AgriState.orders.forEach(stateOrder => {
      if (stateOrder && stateOrder.id && !orders.some(o => o.id === stateOrder.id)) {
        orders.unshift({
          ...stateOrder,
          status_code: stateOrder.status === 'Delivered' ? 'past' : 'to_deliver',
          progressStep: stateOrder.status === 'Delivered' ? 4 : (stateOrder.status === 'In Transit' ? 3 : 1),
          temperature: stateOrder.temperature || 'Cold-Chain Monitored',
          originProvince: stateOrder.originProvince || 'Philippine Farm Hub'
        });
      }
    });
  }

  return orders;
}

function saveBuyerOrders(orders) {
  localStorage.setItem('agri_buyer_orders', JSON.stringify(orders));
}

function addBuyerOrder(newOrder) {
  const orders = getBuyerOrders();
  orders.unshift(newOrder);
  saveBuyerOrders(orders);
  if (document.getElementById('buyerOrdersList')) {
    renderBuyerOrders(currentBuyerOrderFilter);
  }
}

let currentBuyerOrderFilter = 'all';
let currentDashboardRole = 'buyer';

function initDashboard() {
  const user = window.AgriState.user;
  const isFarmer = Boolean(user && user.role === 'farmer');
  currentDashboardRole = isFarmer ? 'farmer' : 'buyer';
  switchDashboardRole(currentDashboardRole);
}

function switchDashboardRole(role) {
  currentDashboardRole = role;
  const portalHeaderTitle = document.getElementById('portalHeaderTitle');
  const portalRoleBadge = document.getElementById('portalRoleBadge');
  const portalSubIndicator = document.getElementById('portalSubIndicator');
  const portalQuickStatus = document.getElementById('portalQuickStatus');
  const portalQuickStatusText = document.getElementById('portalQuickStatusText');
  const farmerView = document.getElementById('farmerDashboardView');
  const buyerView = document.getElementById('buyerDashboardView');

  if (role === 'farmer') {
    if (farmerView) farmerView.style.display = 'block';
    if (buyerView) buyerView.style.display = 'none';
    if (portalHeaderTitle) portalHeaderTitle.textContent = 'Farmer Producer Dashboard';
    if (portalRoleBadge) {
      portalRoleBadge.textContent = 'Producer Experience';
      portalRoleBadge.style.background = '#dcfce7';
      portalRoleBadge.style.color = '#15803d';
    }
    if (portalSubIndicator) portalSubIndicator.textContent = 'Harvest Listings, Sales Revenue & Orders Fulfillment';
    if (portalQuickStatusText) portalQuickStatusText.textContent = 'Active Producer';
    if (portalQuickStatus) {
      portalQuickStatus.style.background = '#dcfce7';
      portalQuickStatus.style.color = '#15803d';
      portalQuickStatus.style.borderColor = '#bbf7d0';
    }
    document.title = 'Farmer Producer Dashboard | AgriConnect Philippine Farm-to-Table Platform';
    initFarmerDashboard();
  } else {
    if (farmerView) farmerView.style.display = 'none';
    if (buyerView) buyerView.style.display = 'block';
    if (portalHeaderTitle) portalHeaderTitle.textContent = 'Buyer Dashboard';
    if (portalRoleBadge) {
      portalRoleBadge.textContent = 'Buyer Experience';
      portalRoleBadge.style.background = 'var(--primary-light)';
      portalRoleBadge.style.color = 'var(--primary)';
    }
    if (portalSubIndicator) portalSubIndicator.textContent = 'Direct Farmgate Purchases, Cold-Chain Transit & Orders Fulfillment';
    if (portalQuickStatusText) portalQuickStatusText.textContent = 'Active Buyer';
    if (portalQuickStatus) {
      portalQuickStatus.style.background = '#dcfce7';
      portalQuickStatus.style.color = '#15803d';
      portalQuickStatus.style.borderColor = '#bbf7d0';
    }
    document.title = 'Buyer Dashboard | AgriConnect Philippine Farm-to-Table Platform';
    renderBuyerDashboard();
  }
}

function renderBuyerDashboard() {
  const user = window.AgriState.user;
  const greetingEl = document.getElementById('buyerGreeting');
  const locationEl = document.getElementById('buyerLocationDetails');
  const avatarBadge = document.getElementById('buyerAvatarBadge');

  if (user && user.full_name) {
    if (greetingEl) greetingEl.textContent = `Kumusta, ${user.full_name}!`;
    if (locationEl) locationEl.textContent = `${user.province || 'Metro Manila'} Delivery Hub • Direct Sourcing from Benguet & Nueva Ecija`;
    if (avatarBadge) {
      const initials = user.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
      avatarBadge.textContent = initials || 'JD';
    }
  } else {
    if (greetingEl) greetingEl.textContent = 'Kumusta, Juan Dela Cruz!';
    if (locationEl) locationEl.textContent = 'Metro Manila Delivery Hub • Direct Sourcing from Benguet & Nueva Ecija';
    if (avatarBadge) avatarBadge.textContent = 'JD';
  }

  renderBuyerOrders(currentBuyerOrderFilter);
  renderBuyerSupportedFarms();
}

function filterBuyerOrders(filter) {
  currentBuyerOrderFilter = filter;
  renderBuyerOrders(filter);
}

function renderBuyerOrders(filter = currentBuyerOrderFilter) {
  const listEl = document.getElementById('buyerOrdersList');
  if (!listEl) return;

  const orders = getBuyerOrders();
  const toDeliverOrders = orders.filter(o => o.status_code === 'to_deliver' || o.status !== 'Delivered');
  const pastOrders = orders.filter(o => o.status_code === 'past' || o.status === 'Delivered');

  // Update tabs
  const tabAll = document.getElementById('buyerTabAll');
  const tabToDeliver = document.getElementById('buyerTabToDeliver');
  const tabPast = document.getElementById('buyerTabPast');

  if (tabAll) tabAll.textContent = `All Orders (${orders.length})`;
  if (tabToDeliver) tabToDeliver.textContent = `Items to be Delivered (${toDeliverOrders.length})`;
  if (tabPast) tabPast.textContent = `Past Orders (${pastOrders.length})`;

  [tabAll, tabToDeliver, tabPast].forEach(tab => {
    if (tab) {
      tab.className = 'btn-secondary';
      tab.style.background = 'transparent';
      tab.style.color = 'var(--text-main)';
      tab.style.borderColor = 'var(--border-subtle)';
    }
  });

  if (filter === 'all' && tabAll) {
    tabAll.className = 'btn-primary';
    tabAll.style.background = 'var(--primary)';
    tabAll.style.color = '#ffffff';
  } else if (filter === 'to_deliver' && tabToDeliver) {
    tabToDeliver.className = 'btn-primary';
    tabToDeliver.style.background = '#d97706';
    tabToDeliver.style.color = '#ffffff';
    tabToDeliver.style.borderColor = '#d97706';
  } else if (filter === 'past' && tabPast) {
    tabPast.className = 'btn-primary';
    tabPast.style.background = 'var(--primary-deep)';
    tabPast.style.color = '#ffffff';
  }

  // Update KPI Metric Cards
  const statToDeliver = document.getElementById('statBuyerToDeliver');
  const statPastOrders = document.getElementById('statBuyerPastOrders');
  const statTotalSpend = document.getElementById('statBuyerTotalSpend');
  const statSaved = document.getElementById('statBuyerSaved');

  if (statToDeliver) {
    statToDeliver.textContent = `${toDeliverOrders.length} Shipment${toDeliverOrders.length === 1 ? '' : 's'}`;
  }
  if (statPastOrders) {
    statPastOrders.textContent = `${pastOrders.length} Completed`;
  }
  const totalSpend = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  if (statTotalSpend) {
    statTotalSpend.textContent = `₱${totalSpend.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  const estimatedSaved = Math.round(totalSpend * 0.33);
  if (statSaved) {
    statSaved.textContent = `₱${estimatedSaved.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // Filter orders
  let filtered = orders;
  if (filter === 'to_deliver') {
    filtered = toDeliverOrders;
  } else if (filter === 'past') {
    filtered = pastOrders;
  }

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem; background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
        <div style="width: 54px; height: 54px; border-radius: 9999px; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>
        </div>
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
          ${filter === 'to_deliver' ? 'No Items Scheduled for Delivery' : filter === 'past' ? 'No Past Orders Recorded' : 'No Orders Found'}
        </h4>
        <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 440px; margin: 0 auto 1.25rem;">
          ${filter === 'to_deliver' ? 'You have no active shipments in transit right now. Choose direct highland harvests from our verified farm partners.' : 'Start your first direct farm order to support local growers.'}
        </p>
        <a href="marketplace.html" class="btn-primary" style="padding: 0.55rem 1.25rem; font-size: 0.85rem; text-decoration: none;">
          + Browse Marketplace Harvests
        </a>
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map(order => {
    const isPast = order.status_code === 'past' || order.status === 'Delivered';
    const progress = order.progressStep || (isPast ? 4 : (order.status === 'In Transit' ? 3 : 2));

    const itemsHtml = (order.items || []).map(item => `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.65rem 0; border-bottom: 1px dashed var(--border-subtle); flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img 
            src="${item.image_url || 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400'}" 
            alt="${item.name}" 
            style="width: 46px; height: 46px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-subtle); flex-shrink: 0;"
          >
          <div>
            <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-main);">${item.name}</div>
            <div style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">
              🌱 Direct from ${item.farmer_name || order.origin}
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-main);">
            ₱${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">
            ${item.quantity} ${item.unit || 'kg'} &times; ₱${item.price}
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div id="buyer-order-${order.id}" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease;">
        
        <!-- Header Row -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Order ID</span>
              <span style="font-size: 1.05rem; font-weight: 800; color: var(--primary-deep); font-family: monospace;">#${order.id}</span>
              ${!isPast ? `
                <span style="background: #fef3c7; color: #b45309; font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 9999px; text-transform: uppercase;">
                  ACTIVE SHIPMENT
                </span>
              ` : `
                <span style="background: #dcfce7; color: #166534; font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 9999px; text-transform: uppercase;">
                  COMPLETED
                </span>
              `}
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
              Placed on <strong>${order.date}</strong> ${isPast && order.deliveredDate ? `• Delivered on ${order.deliveredDate}` : ''}
            </div>
          </div>

          <!-- Status Badge -->
          <div>
            ${!isPast ? `
              <span style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a; padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; animation: pulse 1.5s infinite;"></span>
                ${order.status} ${order.eta ? `• ${order.eta}` : ''}
              </span>
            ` : `
              <span style="background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Delivered &amp; Freshness Inspected
              </span>
            `}
          </div>
        </div>

        <!-- 4-Step Progress Indicator -->
        <div style="background: var(--bg-page); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem 1.25rem; margin-bottom: 1.25rem;">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; text-align: center; position: relative;">
            <div>
              <div style="width: 26px; height: 26px; border-radius: 9999px; background: #15803d; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; margin: 0 auto 0.25rem;">
                ✓
              </div>
              <span style="font-size: 0.725rem; font-weight: 700; color: #15803d;">Confirmed</span>
            </div>

            <div>
              <div style="width: 26px; height: 26px; border-radius: 9999px; background: ${progress >= 2 ? '#15803d' : 'var(--bg-subtle)'}; color: ${progress >= 2 ? '#ffffff' : 'var(--text-muted)'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; margin: 0 auto 0.25rem;">
                ${progress >= 2 ? '✓' : '2'}
              </div>
              <span style="font-size: 0.725rem; font-weight: 700; color: ${progress >= 2 ? '#15803d' : 'var(--text-muted)'};">Harvested</span>
            </div>

            <div>
              <div style="width: 26px; height: 26px; border-radius: 9999px; background: ${progress >= 3 ? (progress === 3 ? '#d97706' : '#15803d') : 'var(--bg-subtle)'}; color: ${progress >= 3 ? '#ffffff' : 'var(--text-muted)'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; margin: 0 auto 0.25rem;">
                ${progress > 3 ? '✓' : '3'}
              </div>
              <span style="font-size: 0.725rem; font-weight: 700; color: ${progress >= 3 ? (progress === 3 ? '#b45309' : '#15803d') : 'var(--text-muted)'};">Cold-Chain Transit</span>
            </div>

            <div>
              <div style="width: 26px; height: 26px; border-radius: 9999px; background: ${progress >= 4 ? '#15803d' : 'var(--bg-subtle)'}; color: ${progress >= 4 ? '#ffffff' : 'var(--text-muted)'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; margin: 0 auto 0.25rem;">
                ${progress >= 4 ? '✓' : '4'}
              </div>
              <span style="font-size: 0.725rem; font-weight: 700; color: ${progress >= 4 ? '#15803d' : 'var(--text-muted)'};">Delivered</span>
            </div>
          </div>

          <!-- Logistics & Route Details -->
          <div style="border-top: 1px solid var(--border-subtle); margin-top: 0.85rem; padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
              <span>📍 Route: <strong>${order.origin || 'Benguet Highlands'}</strong> &rarr; <strong>${order.destination || 'Metro Manila'}</strong></span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-secondary); flex-wrap: wrap;">
              <span style="background: #e0f2fe; color: #0284c7; padding: 0.15rem 0.55rem; border-radius: 9999px; font-weight: 700; font-size: 0.725rem;">
                ❄️ ${order.temperature || '4.2°C Monitored'}
              </span>
              <span>Courier: <strong>${order.driverName || 'Central Express'}</strong> (${order.driverPhone || '0918-555-3211'})</span>
            </div>
          </div>
        </div>

        <!-- Ordered Harvest Product Items -->
        <div style="margin-bottom: 1.25rem;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">
            Harvest Items Included (${(order.items || []).length})
          </div>
          <div style="display: flex; flex-direction: column;">
            ${itemsHtml}
          </div>
        </div>

        <!-- Card Footer Summary & Interactive Actions -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Total Direct Paid:</span>
              <div style="font-size: 1.2rem; font-weight: 800; color: var(--primary-deep);">
                ₱${(order.total || 0).toLocaleString()}
              </div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">
              Payment: <strong style="color: var(--text-main);">${order.paymentMethod || 'GCash'}</strong> • Includes ₱${order.deliveryFee || 95} Cold-Chain Delivery
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${!isPast ? `
              <a href="track-orders.html?order=${order.id}" class="btn-primary" style="font-size: 0.825rem; padding: 0.45rem 1rem; text-decoration: none;">
                🚚 Track Live Courier &rarr;
              </a>
              <a href="farmers.html" class="btn-secondary" style="font-size: 0.825rem; padding: 0.45rem 0.9rem; text-decoration: none;">
                Farm Origin
              </a>
            ` : `
              <button onclick="reorderBuyerItems('${order.id}')" class="btn-primary" style="font-size: 0.825rem; padding: 0.45rem 1rem;">
                🛒 Order Again
              </button>
              <button onclick="showBuyerReceipt('${order.id}')" class="btn-secondary" style="font-size: 0.825rem; padding: 0.45rem 0.9rem;">
                📄 View Invoice
              </button>
              <button onclick="showToast('Thank you for rating! 5 stars recorded for ${order.origin}.')" class="btn-secondary" style="font-size: 0.825rem; padding: 0.45rem 0.75rem;" title="Rate product quality">
                ⭐ Rate Quality
              </button>
            `}
          </div>
        </div>

      </div>
    `;
  }).join('');
}

function renderBuyerSupportedFarms() {
  const container = document.getElementById('buyerSupportedFarmsGrid');
  if (!container) return;

  const farms = [
    {
      name: 'Dela Cruz Family Farm',
      farmer: 'Mang Ramon Dela Cruz',
      province: 'La Trinidad, Benguet',
      crops: 'Highland Romaine, Crisp Carrots, Strawberries',
      deliveriesCount: 3,
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400',
      badge: 'Certified Organic'
    },
    {
      name: 'Santos Rice & Organic Grains',
      farmer: 'Tatay Ernesto Santos',
      province: 'Science City of Muñoz, Nueva Ecija',
      crops: 'Premium Dinorado, Jasmine, Black Rice',
      deliveriesCount: 1,
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      badge: 'GAP Certified'
    },
    {
      name: 'Bukidnon Mountain Harvest',
      farmer: 'Grace Tan-Bukidnon',
      province: 'Impasugong, Bukidnon',
      crops: 'Red Solo Papaya, Free-Range Eggs, Arabica',
      deliveriesCount: 2,
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      badge: 'Free-Range Producer'
    }
  ];

  container.innerHTML = farms.map(farm => `
    <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; gap: 0.85rem; align-items: center; margin-bottom: 0.75rem;">
          <img src="${farm.avatar}" alt="${farm.farmer}" style="width: 48px; height: 48px; border-radius: 9999px; object-fit: cover; border: 2px solid #86efac; flex-shrink: 0;">
          <div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); line-height: 1.2;">
              ${farm.name}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
              ${farm.province}
            </div>
          </div>
        </div>

        <div style="background: var(--bg-page); border-radius: var(--radius-sm); padding: 0.65rem 0.75rem; font-size: 0.775rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
          <div style="color: var(--text-muted); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.2rem;">Product You Sourced:</div>
          <strong style="color: var(--text-main);">${farm.crops}</strong>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; pt: 0.5rem; border-top: 1px solid var(--border-subtle); padding-top: 0.65rem;">
        <span style="font-size: 0.75rem; color: var(--primary); font-weight: 700;">
          ★ ${farm.rating} Rating • ${farm.badge}
        </span>
        <a href="farmers.html" class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.65rem; text-decoration: none;">
          View Farm &rarr;
        </a>
      </div>
    </div>
  `).join('');
}

function reorderBuyerItems(orderId) {
  const user = window.AgriState.user;
  if (!user) {
    showToast('Please log in to your account before adding items to the cart.');
    setTimeout(() => {
      window.location.href = 'auth.html?redirect=dashboard.html';
    }, 800);
    return;
  }

  const orders = getBuyerOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order || !order.items || order.items.length === 0) {
    showToast('Could not locate items to re-order.');
    return;
  }

  let count = 0;
  order.items.forEach(item => {
    const existing = window.AgriState.cart.find(c => c.id === item.id || c.name === item.name);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      window.AgriState.cart.push({
        id: item.id || 'reorder-' + Date.now() + Math.random(),
        name: item.name,
        price: item.price,
        unit: item.unit || 'kg',
        farmer_name: item.farmer_name || order.origin,
        image_url: item.image_url,
        quantity: item.quantity || 1,
        max_quantity: 999
      });
    }
    count += (item.quantity || 1);
  });

  saveCart();
  updateCartBadge();
  renderCartDrawer();
  toggleCart(true);
  showToast(`Added ${order.items.length} product item(s) from #${order.id} to your basket!`);
}

function showBuyerReceipt(orderId) {
  const orders = getBuyerOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById('buyerReceiptModal');
  const body = document.getElementById('buyerReceiptBody');
  if (!modal || !body) return;

  const itemsRows = (order.items || []).map(i => `
    <tr>
      <td style="padding: 0.45rem 0; font-weight: 600; color: var(--text-main); font-size: 0.85rem;">
        ${i.name} (${i.farmer_name || order.origin})
      </td>
      <td style="padding: 0.45rem 0; text-align: center; color: var(--text-secondary); font-size: 0.85rem;">
        ${i.quantity} ${i.unit || 'kg'}
      </td>
      <td style="padding: 0.45rem 0; text-align: right; font-weight: 700; color: var(--text-main); font-size: 0.85rem;">
        ₱${((i.price || 0) * (i.quantity || 1)).toLocaleString()}
      </td>
    </tr>
  `).join('');

  body.innerHTML = `
    <div style="font-family: inherit;">
      <div style="text-align: center; padding-bottom: 1rem; border-bottom: 1px dashed var(--border-subtle); margin-bottom: 1rem;">
        <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-deep);">AgriConnect Direct Farmgate Receipt</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">0% Middleman Deduction • Direct Cold-Chain Route</div>
        <div style="font-size: 0.8rem; font-weight: 700; font-family: monospace; margin-top: 0.4rem; color: var(--primary);">
          Invoice #${order.id}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem; margin-bottom: 1rem;">
        <div>
          <span style="color: var(--text-muted);">Date Placed:</span>
          <div style="font-weight: 700;">${order.date}</div>
        </div>
        <div>
          <span style="color: var(--text-muted);">Status:</span>
          <div style="font-weight: 700; color: #15803d;">${order.status}</div>
        </div>
        <div>
          <span style="color: var(--text-muted);">Origin Farm:</span>
          <div style="font-weight: 700;">${order.origin}</div>
        </div>
        <div>
          <span style="color: var(--text-muted);">Payment Method:</span>
          <div style="font-weight: 700;">${order.paymentMethod || 'GCash'}</div>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">
            <th style="padding: 0.5rem 0; text-align: left;">Item</th>
            <th style="padding: 0.5rem 0; text-align: center;">Qty</th>
            <th style="padding: 0.5rem 0; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
          <span>Subtotal:</span>
          <span>₱${(order.subtotal || 0).toLocaleString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
          <span>Cold-Chain Transit Fee:</span>
          <span>₱${(order.deliveryFee || 95).toLocaleString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.1rem; color: var(--primary-deep); border-top: 1px dashed var(--border-subtle); padding-top: 0.5rem;">
          <span>Total Paid:</span>
          <span>₱${(order.total || 0).toLocaleString()}</span>
        </div>
      </div>

      <div style="background: var(--primary-light); border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.75rem; color: var(--primary-deep); text-align: center; margin-bottom: 1.25rem;">
        ✓ Guaranteed 100% Direct Payout to Filipino Smallholder Farmers. Zero Predatory Middleman Cuts.
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <button onclick="window.print()" class="btn-secondary" style="flex: 1; padding: 0.6rem; font-size: 0.85rem;">
          🖨️ Print / Save PDF
        </button>
        <button onclick="closeBuyerReceiptModal()" class="btn-primary" style="flex: 1; padding: 0.6rem; font-size: 0.85rem;">
          Close
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeBuyerReceiptModal() {
  const modal = document.getElementById('buyerReceiptModal');
  if (modal) modal.classList.remove('active');
}

function initFarmerDashboard() {
  const ordersEl = document.getElementById('farmerOrdersList');
  if (!ordersEl) return;

  const user = window.AgriState.user;

  // Populate farmer greeting and details if logged in
  if (user && user.role === 'farmer') {
    const greetingEl = document.getElementById('farmerGreeting');
    const farmDetailsEl = document.getElementById('farmerFarmDetails');
    const avatarEl = document.getElementById('farmerAvatar');

    if (greetingEl) {
      greetingEl.textContent = `Kumusta, ${user.full_name}!`;
    }
    if (farmDetailsEl) {
      farmDetailsEl.textContent = `${user.farm_name || 'Dela Cruz Family Farm'} • ${user.province || 'Benguet, Philippines'}`;
    }
    if (avatarEl && user.avatar) {
      avatarEl.src = user.avatar;
    }
  }

  renderFarmerOrders('all');
  renderFarmerOwnProducts();
}

/* ==========================================================================
   AGRIMATE - AI FARMING ASSISTANT
   ========================================================================== */

window.AgriMateState = {
  isOpen: false,
  role: 'buyer', // 'buyer' or 'farmer'
  isTyping: false,
  messages: []
};

// Extensible AI API Integration Interface
// Supports plugging in Gemini, OpenAI, or a custom backend endpoint:
// e.g.: window.AgriMateAPI.endpoint = 'https://your-api.com/api/chat';
window.AgriMateAPI = {
  endpoint: null,
  apiKey: null,

  async ask(prompt, role, history) {
    if (this.endpoint) {
      try {
        const res = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {})
          },
          body: JSON.stringify({ prompt, role, history })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && (data.reply || data.message || data.text)) {
            return data.reply || data.message || data.text;
          }
        }
      } catch (err) {
        console.warn('[AgriMate] External AI API unavailable, falling back to knowledge engine:', err);
      }
    }
    // Default: Built-in Intelligent Agricultural & Platform Engine
    return getAgriMateBotReply(prompt, role);
  }
};

function initAgriMate() {
  if (document.getElementById('agrimateChatTrigger')) return;

  // Set default role based on current logged in user
  const user = window.AgriState?.user;
  if (user && user.role === 'farmer') {
    window.AgriMateState.role = 'farmer';
  } else {
    window.AgriMateState.role = 'buyer';
  }

  // Create and inject Trigger Button
  const triggerBtn = document.createElement('button');
  triggerBtn.id = 'agrimateChatTrigger';
  triggerBtn.className = 'agrimate-trigger-btn';
  triggerBtn.setAttribute('aria-label', 'Chat with AgriMate AI Farming Assistant');
  triggerBtn.setAttribute('title', 'Chat with AgriMate 🌱');
  triggerBtn.innerHTML = `
    <span class="agrimate-badge-dot"></span>
    <svg class="trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 20h10"/>
      <path d="M12 20v-8"/>
      <path d="M12 12c-3.5 0-7-2.5-7-7 4.5 0 7 3.5 7 7Z" fill="rgba(255,255,255,0.3)"/>
      <path d="M12 12c3.5 0 7-2.5 7-7-4.5 0-7 3.5-7 7Z" fill="rgba(255,255,255,0.3)"/>
    </svg>
  `;
  triggerBtn.onclick = () => toggleAgriMate();
  document.body.appendChild(triggerBtn);

  // Create and inject Floating Chat Window
  const chatWindow = document.createElement('div');
  chatWindow.id = 'agrimateChatWindow';
  chatWindow.className = 'agrimate-window';
  chatWindow.setAttribute('role', 'dialog');
  chatWindow.setAttribute('aria-modal', 'true');
  chatWindow.setAttribute('aria-labelledby', 'agrimateTitle');
  chatWindow.innerHTML = `
    <div class="agrimate-header">
      <div class="agrimate-brand">
        <div class="agrimate-avatar-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: #4ade80;">
            <path d="M7 20h10"/>
            <path d="M12 20v-8"/>
            <path d="M12 12c-3.5 0-7-2.5-7-7 4.5 0 7 3.5 7 7Z" fill="#4ade80" fill-opacity="0.35"/>
            <path d="M12 12c3.5 0 7-2.5 7-7-4.5 0-7 3.5-7 7Z" fill="#4ade80" fill-opacity="0.35"/>
          </svg>
        </div>
        <div class="agrimate-titles">
          <h3 id="agrimateTitle">AgriMate 🌱</h3>
          <p><span class="agrimate-status-dot"></span> Your AI Farming Assistant</p>
        </div>
      </div>
      <div class="agrimate-header-actions">
        <button id="agrimateRoleToggle" class="agrimate-role-badge" title="Click to toggle between Buyer and Farmer Mode">
          ${window.AgriMateState.role === 'farmer' ? '🚜 Farmer Mode' : '🌱 Buyer Mode'}
        </button>
        <button id="agrimateCloseBtn" class="agrimate-header-btn" aria-label="Close Chat Window">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <div id="agrimateMessages" class="agrimate-body"></div>

    <div id="agrimateChips" class="agrimate-chips-container"></div>

    <div class="agrimate-footer">
      <form id="agrimateForm" class="agrimate-input-row" onsubmit="handleAgriMateSubmit(event)">
        <input type="text" id="agrimateInput" class="agrimate-input" placeholder="Ask AgriMate about products, farming, orders..." autocomplete="off" />
        <button type="submit" id="agrimateSendBtn" class="agrimate-send-btn" aria-label="Send Message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(chatWindow);

  // Bind Close Button
  document.getElementById('agrimateCloseBtn').onclick = () => toggleAgriMate(false);

  // Bind Role Toggle
  document.getElementById('agrimateRoleToggle').onclick = () => toggleAgriMateRole();

  // Render initial greeting and quick action chips
  renderAgriMateInitialState();
}

function toggleAgriMate(forceState) {
  const win = document.getElementById('agrimateChatWindow');
  const trigger = document.getElementById('agrimateChatTrigger');
  if (!win) return;

  const nextState = (typeof forceState === 'boolean') ? forceState : !win.classList.contains('open');
  window.AgriMateState.isOpen = nextState;

  if (nextState) {
    win.classList.add('open');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    const input = document.getElementById('agrimateInput');
    if (input) {
      setTimeout(() => input.focus(), 280);
    }
  } else {
    win.classList.remove('open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }
}

function toggleAgriMateRole() {
  const nextRole = window.AgriMateState.role === 'farmer' ? 'buyer' : 'farmer';
  window.AgriMateState.role = nextRole;

  const badge = document.getElementById('agrimateRoleToggle');
  if (badge) {
    badge.textContent = nextRole === 'farmer' ? '🚜 Farmer Mode' : '🌱 Buyer Mode';
  }

  // Post assistant transition notice
  const note = nextRole === 'farmer'
    ? `Switched to <strong>Farmer Mode 🚜</strong>! How can I assist with your harvest listings, direct farmgate pricing, DA-RSBSA accreditation, or batch orders?`
    : `Switched to <strong>Buyer Mode 🌱</strong>! Looking for fresh farm harvests, price checks, or help with placing and tracking your orders?`;

  appendAgriMateMessage('bot', note);
  renderAgriMateChips();
}

function renderAgriMateInitialState() {
  const messagesEl = document.getElementById('agrimateMessages');
  if (!messagesEl) return;

  messagesEl.innerHTML = '';

  const greetingHtml = `Hi! I’m <strong>AgriMate 🌱</strong><br>Your AI assistant for AgriConnect. How can I help you today?`;
  appendAgriMateMessage('bot', greetingHtml, false);
  renderAgriMateChips();
}

function renderAgriMateChips() {
  const chipsEl = document.getElementById('agrimateChips');
  if (!chipsEl) return;

  const chips = [
    { label: '🔍 Find Products', query: 'Find Products' },
    { label: '🌾 Ask About Farming', query: 'Ask About Farming' },
    { label: '📦 How to Order', query: 'How to Order' },
    { label: '🚜 How to Sell', query: 'How to Sell' },
    { label: '❓ FAQ & Help', query: 'FAQ' }
  ];

  chipsEl.innerHTML = chips.map(c => `
    <button type="button" class="agrimate-chip" onclick="handleAgriMateChip('${c.query.replace(/'/g, "\\'")}')">
      ${c.label}
    </button>
  `).join('');
}

function handleAgriMateChip(query) {
  sendAgriMateMessage(query);
}

function handleAgriMateSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('agrimateInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  sendAgriMateMessage(text);
}

async function sendAgriMateMessage(userText) {
  if (window.AgriMateState.isTyping) return;

  appendAgriMateMessage('user', userText);

  // Show typing indicator
  setAgriMateTyping(true);

  // Realistic generation delay
  const minDelay = 400 + Math.random() * 250;
  const startTime = Date.now();

  try {
    const reply = await window.AgriMateAPI.ask(userText, window.AgriMateState.role, window.AgriMateState.messages);
    const elapsed = Date.now() - startTime;
    if (elapsed < minDelay) {
      await new Promise(r => setTimeout(r, minDelay - elapsed));
    }
    setAgriMateTyping(false);
    appendAgriMateMessage('bot', reply);
  } catch (err) {
    setAgriMateTyping(false);
    appendAgriMateMessage('bot', "I'm having a little trouble connecting right now, but you can explore our <a href='marketplace.html' style='color:#15803d; font-weight:700;'>Marketplace</a> or check our <a href='how-it-works.html' style='color:#15803d; font-weight:700;'>How It Works</a> guide anytime!");
  }
}

function appendAgriMateMessage(sender, htmlContent, recordHistory = true) {
  const messagesEl = document.getElementById('agrimateMessages');
  if (!messagesEl) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `agrimate-msg ${sender}`;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgDiv.innerHTML = `
    <div class="agrimate-bubble">${htmlContent}</div>
    <span class="agrimate-time">${timeStr}</span>
  `;

  messagesEl.appendChild(msgDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  if (recordHistory) {
    window.AgriMateState.messages.push({
      sender,
      content: htmlContent,
      timestamp: Date.now()
    });
  }
}

function setAgriMateTyping(isTyping) {
  window.AgriMateState.isTyping = isTyping;
  const messagesEl = document.getElementById('agrimateMessages');
  const sendBtn = document.getElementById('agrimateSendBtn');
  if (sendBtn) sendBtn.disabled = isTyping;
  if (!messagesEl) return;

  let typingEl = document.getElementById('agrimateTypingIndicator');
  if (isTyping) {
    if (!typingEl) {
      typingEl = document.createElement('div');
      typingEl.id = 'agrimateTypingIndicator';
      typingEl.className = 'agrimate-msg bot';
      typingEl.innerHTML = `
        <div class="agrimate-bubble agrimate-typing" style="display:inline-flex;">
          <span class="agrimate-dot"></span>
          <span class="agrimate-dot"></span>
          <span class="agrimate-dot"></span>
        </div>
      `;
      messagesEl.appendChild(typingEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  } else {
    if (typingEl) typingEl.remove();
  }
}

// Built-in Intelligent Agricultural & Platform Engine
function getAgriMateBotReply(query, role) {
  const q = (query || '').toLowerCase().trim();
  const products = window.AgriState?.products || [];

  // 1. Quick Action: "Find Products" or general product catalog browsing
  if (q === 'find products' || q === 'products' || q === 'browse' || q === 'search products') {
    const sample = products.slice(0, 3);
    const cardsHtml = sample.map(renderAgriMateProductCard).join('');
    return `
      Here are top featured fresh harvests straight from our local farms:
      <div style="display:flex; flex-direction:column; gap:8px; margin:8px 0;">
        ${cardsHtml}
      </div>
      Looking for something specific? You can type any crop name like <em>"tomatoes"</em>, <em>"strawberries"</em>, or <em>"rice"</em>, or visit our full <a href="marketplace.html" style="color:#15803d; font-weight:700; text-decoration:underline;">Marketplace</a>!
    `;
  }

  // 2. Specific Crop / Product Search
  const matchingProducts = products.filter(p => {
    const name = (p.name || '').toLowerCase();
    const cat = (p.category_name || '').toLowerCase();
    const desc = (p.description || '').toLowerCase();
    const farmer = (p.farmer_name || '').toLowerCase();
    return name.includes(q) || cat.includes(q) || desc.includes(q) || farmer.includes(q);
  });

  if (matchingProducts.length > 0 && q.length >= 3 && !['hello', 'hi', 'help', 'order', 'sell'].includes(q)) {
    const topMatches = matchingProducts.slice(0, 3);
    const cardsHtml = topMatches.map(renderAgriMateProductCard).join('');
    return `
      I found <strong>${matchingProducts.length} product(s)</strong> matching <em>"${escapeHtml(query)}"</em>:
      <div style="display:flex; flex-direction:column; gap:8px; margin:8px 0;">
        ${cardsHtml}
      </div>
      ${matchingProducts.length > 3 ? `<p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">+ ${matchingProducts.length - 3} more items available in the <a href="marketplace.html" style="color:#15803d; font-weight:700;">Marketplace</a>.</p>` : ''}
    `;
  }

  // 3. Quick Action: "Ask About Farming" / Agricultural Advice
  if (q.includes('farming') || q.includes('agriculture') || q.includes('crop') || q.includes('soil') || q.includes('pest') || q.includes('fertilizer') || q.includes('plant')) {
    return `
      🌾 <strong>Farming & Agricultural Insights</strong><br><br>
      Here are core sustainable practices tailored for Philippine farming:
      <ul style="margin: 0.35rem 0 0.5rem 1.2rem; padding: 0; font-size: 0.825rem; line-height: 1.55;">
        <li><strong>Organic Pest Control:</strong> Use neem oil extract or chili-garlic spray to repel aphids and caterpillars without chemical residues.</li>
        <li><strong>Soil Health:</strong> Enrich your soil with vermicompost and carbonized rice hull (CRH) to retain moisture and foster beneficial microbes.</li>
        <li><strong>Seasonal Calendar:</strong> Highland Benguet crops (strawberries, cabbage) flourish in cooler months, while lowland crops (eggplants, melons) thrive in dry sunny spells.</li>
        <li><strong>Cold-Chain Care:</strong> Harvest early in the morning (5:00 AM – 8:00 AM) to preserve moisture, natural sugars, and crispness.</li>
      </ul>
      Need specific guidance on pest management, soil preparation, or crop scheduling? Ask me anytime!
    `;
  }

  // 4. Quick Action: "How to Order" / Buyer Guidance
  if (q.includes('how to order') || q.includes('order') || q.includes('buy') || q.includes('cart') || q.includes('payment') || q.includes('delivery')) {
    return `
      📦 <strong>How to Order on AgriConnect:</strong>
      <ol style="margin: 0.35rem 0 0.5rem 1.2rem; padding: 0; font-size: 0.825rem; line-height: 1.55;">
        <li><strong>Browse:</strong> Visit our <a href="marketplace.html" style="color:#15803d; font-weight:700;">Marketplace</a> to explore fresh farm harvests.</li>
        <li><strong>Add to Basket:</strong> Click the <strong>"+ Add"</strong> button on your desired produce (log in to your account first).</li>
        <li><strong>Checkout:</strong> Review your items in the cart drawer and select your preferred payment (<strong>GCash, Maya, COD, or Bank Transfer</strong>).</li>
        <li><strong>Track:</strong> Enjoy cold-chain delivery within 4 to 24 hours of harvest, and track progress live on <a href="track-orders.html" style="color:#15803d; font-weight:700;">Track Orders</a>!</li>
      </ol>
      Every purchase directly supports verified Filipino smallholder farmers!
    `;
  }

  // 5. Quick Action: "How to Sell" / Farmer Guidance
  if (q.includes('how to sell') || q.includes('sell') || q.includes('list') || q.includes('farmer') || q.includes('harvest') || q.includes('fee') || q.includes('commission')) {
    return `
      🚜 <strong>Selling Your Harvest with AgriConnect:</strong>
      <ol style="margin: 0.35rem 0 0.5rem 1.2rem; padding: 0; font-size: 0.825rem; line-height: 1.55;">
        <li><strong>Create Account:</strong> Sign up with your farm details and get verified through DA-RSBSA accreditation.</li>
        <li><strong>List Your Crops:</strong> Go to <a href="sell-harvest.html" style="color:#15803d; font-weight:700;">Sell Harvest</a> to enter your crop type, available volume, harvest schedule, and price per kg.</li>
        <li><strong>0% Platform Commission:</strong> AgriConnect does <em>not</em> take a cut of your farmgate earnings. You keep 100% of your listed price!</li>
        <li><strong>Consolidated Logistics:</strong> AgriConnect refrigerated transit collects verified orders from agrarian hubs.</li>
      </ol>
      Ready to list? Tap <a href="sell-harvest.html" style="color:#15803d; font-weight:700; text-decoration:underline;">Sell Harvest</a> now!
    `;
  }

  // FAQ 1: Delivery fees and cold-chain transport
  if (q.includes('delivery fee') || q.includes('cold-chain') || q.includes('cold chain') || (q.includes('delivery') && (q.includes('work') || q.includes('fee') || q.includes('transport'))) || q.includes('how do delivery fees')) {
    return `
      🚚 <strong>How do delivery fees and cold-chain transport work?</strong><br><br>
      We operate scheduled cold-chain delivery routes linking <strong>Benguet, Nueva Ecija, Cavite, and Laguna</strong> directly with Metro Manila and major urban centers.<br><br>
      • <strong>Flat Delivery Fee:</strong> A transparent flat fee of <strong>₱95</strong> for standard household packages.<br>
      • <strong>Commercial Freight:</strong> Calculated by freight weight for restaurant and supermarket bulk volumes.<br>
      • <strong>Temperature-Regulated:</strong> All produce travels in refrigerated transit within 4 to 24 hours of harvest, reducing spoilage to under 5%.
    `;
  }

  // FAQ 2: Bulk purchasing for restaurants, hotels, supermarkets
  if (q.includes('bulk') || q.includes('restaurant') || q.includes('hotel') || q.includes('supermarket') || (q.includes('commercial') && q.includes('purchase')) || q.includes('can restaurants')) {
    return `
      🏨 <strong>Can restaurants, hotels, or supermarkets purchase in bulk?</strong><br><br>
      <strong>Yes!</strong> Commercial buyers can place orders by the crate, sack (50kg), or weekly recurring subscription.<br><br>
      • Browse available wholesale units directly on our <a href="marketplace.html" style="color:#15803d; font-weight:700;">Marketplace</a>.<br>
      • Or check our <a href="farmers.html" style="color:#15803d; font-weight:700;">Farmers Directory</a> to coordinate directly with certified producers for institutional pricing and harvest scheduling.
    `;
  }

  // FAQ 3: How AgriConnect verifies genuine farmers
  if (q.includes('verify') || q.includes('genuine') || q.includes('legit') || q.includes('accreditation') || q.includes('validation') || q.includes('how does agriconnect verify')) {
    return `
      🛡️ <strong>How does AgriConnect verify that a farmer is genuine?</strong><br><br>
      Every grower on AgriConnect undergoes an on-site validation check through <strong>local Municipal Agricultural Offices (MAO)</strong> and Department of Agriculture registries (<strong>DA-RSBSA</strong>).<br><br>
      We physically verify land titles/leases, sustainable chemical-free farming practices, and farmer identity before awarding the <em>Verified Farmer</em> green badge on the platform.
    `;
  }

  // FAQ 4: Farm visits & direct farmgate buying
  if (q.includes('visit') || q.includes('in person') || q.includes('farm gate') || q.includes('farmgate') || q.includes('can i visit the farm')) {
    return `
      📍 <strong>Can I visit the farm in person and buy directly at the farm gate?</strong><br><br>
      <strong>Yes!</strong> Our <a href="maps.html" style="color:#15803d; font-weight:700;">Interactive Maps section</a> provides exact GPS coordinates and expressway driving directions for each farm.<br><br>
      We recommend notifying the farmer via their contact phone number or pickup hours listed on their profile beforehand so they can prepare your freshly gathered harvest upon arrival!
    `;
  }

  // 6. Quick Action: "FAQ & Help" / Frequently Asked Questions Hub
  if (q === 'faq' || q === 'frequently asked questions' || q.includes('help') || q.includes('faq') || q.includes('support') || q.includes('question')) {
    return `
      📋 <strong>Help & Transparency • Frequently Asked Questions</strong><br>
      <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0.35rem 0 0.65rem 0;">
        Here are answers to the most common questions about AgriConnect. Tap any question below or click to expand:
      </p>

      <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 0.75rem;">
        <button type="button" class="agrimate-faq-btn" onclick="handleAgriMateChip('How do delivery fees and cold-chain transport work?')">
          🚚 How do delivery fees and cold-chain transport work?
        </button>
        <button type="button" class="agrimate-faq-btn" onclick="handleAgriMateChip('Can restaurants, hotels, or supermarkets purchase in bulk?')">
          🏨 Can restaurants, hotels, or supermarkets purchase in bulk?
        </button>
        <button type="button" class="agrimate-faq-btn" onclick="handleAgriMateChip('How does AgriConnect verify that a farmer is genuine?')">
          🛡️ How does AgriConnect verify that a farmer is genuine?
        </button>
        <button type="button" class="agrimate-faq-btn" onclick="handleAgriMateChip('Can I visit the farm in person and buy directly at the farm gate?')">
          📍 Can I visit the farm in person and buy directly at the farm gate?
        </button>
      </div>

      <div class="agrimate-faq-accordion">
        <details class="agrimate-faq-item">
          <summary>🚚 Delivery Fees & Cold-Chain</summary>
          <p>Scheduled cold-chain routes link Benguet, Nueva Ecija, Cavite, and Laguna directly with Metro Manila. Delivery is a transparent flat ₱95 fee (or calculated by freight weight for bulk commercial orders).</p>
        </details>
        <details class="agrimate-faq-item">
          <summary>🏨 Bulk & Wholesale Purchases</summary>
          <p>Yes! Commercial buyers can order by crate, 50kg sack, or weekly recurring subscription. Coordinate directly with producers on our <a href="farmers.html" style="color:var(--primary); font-weight:700;">Farmers Directory</a>.</p>
        </details>
        <details class="agrimate-faq-item">
          <summary>🛡️ Farmer Verification & Accreditation</summary>
          <p>Every grower undergoes on-site validation checks with Municipal Agricultural Offices (MAO) and Department of Agriculture registries, verifying land titles, practices, and identity.</p>
        </details>
        <details class="agrimate-faq-item">
          <summary>📍 Visiting Farms in Person</summary>
          <p>Yes! Visit our <a href="maps.html" style="color:var(--primary); font-weight:700;">Maps section</a> for exact GPS coordinates and driving directions. Please contact the farmer beforehand.</p>
        </details>
      </div>
    `;
  }

  // 7. Price inquiries
  if (q.includes('price') || q.includes('cost') || q.includes('presyo') || q.includes('how much')) {
    return `
      💰 <strong>Transparent Farmgate Pricing:</strong><br>
      Prices on AgriConnect are set directly by our partnered farmers with <strong>0% middleman markup</strong>.
      <br><br>
      You can browse real-time prices in our <a href="marketplace.html" style="color:#15803d; font-weight:700;">Marketplace</a>, or tell me which product you want to check (e.g. <em>"Price of strawberries"</em> or <em>"Price of Dinorado rice"</em>)!
    `;
  }

  // 8. Greetings & general pleasantries
  if (q.includes('hello') || q.includes('hi') || q.includes('kamusta') || q.includes('kumusta') || q.includes('good morning') || q.includes('good afternoon')) {
    return `
      Kumusta! 👋 I’m AgriMate, your AI Farming Assistant.
      <br><br>
      I can help you search farm products, understand harvesting and selling, guide your checkout, or provide sustainable agriculture advice. What would you like to explore today?
    `;
  }

  // 9. Default friendly fallback with contextual suggestions
  return `
    I'd love to help you with that! As your AI Farming Assistant, I can:
    <ul style="margin: 0.35rem 0 0.5rem 1.2rem; padding: 0; font-size: 0.825rem; line-height: 1.55;">
      <li>Find fresh products (e.g., <em>"Do you have organic strawberries?"</em>)</li>
      <li>Guide you on <strong>How to Order</strong> and payment methods</li>
      <li>Help farmers list their harvest on <strong>Sell Harvest</strong></li>
      <li>Provide sustainable farming, pest control, and soil tips</li>
    </ul>
    You can also click any of the quick action buttons below!
  `;
}

function renderAgriMateProductCard(p) {
  const imgUrl = p.image_url || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300';
  const price = (p.price || 0).toLocaleString();
  const unit = p.unit || 'kg';
  const name = escapeHtml(p.name || 'Farm Product');
  const farmer = escapeHtml(p.farmer_name || p.origin || 'Verified Farmer');
  const stock = p.stock || 50;

  return `
    <div class="agrimate-product-card">
      <img src="${imgUrl}" alt="${name}" class="agrimate-product-img" onerror="this.src='https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300'">
      <div class="agrimate-product-info">
        <div class="agrimate-product-name">${name}</div>
        <div class="agrimate-product-sub">👨‍🌾 ${farmer} • ${stock} ${unit} in stock</div>
        <div class="agrimate-product-price">₱${price} / ${unit}</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; justify-content: center;">
        <button onclick="openProductModal('${p.id}')" class="agrimate-product-action" title="View product details" style="padding: 0.25rem 0.5rem; font-size: 0.72rem;">
          👁️ Details
        </button>
        <button onclick="addToCart('${p.id}')" class="agrimate-product-action" title="Add to basket" style="background: #15803d; color: #ffffff; border-color: #15803d; padding: 0.25rem 0.5rem; font-size: 0.72rem;">
          🛒 + Add
        </button>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


