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

// Province Coordinates Lookup for Farm Pin Geocoding
function getProvinceCoordinates(provName) {
  if (!provName) return { lat: 14.5995, lng: 120.9842 };
  const p = provName.toLowerCase();
  if (p.includes('benguet') || p.includes('la trinidad') || p.includes('baguio')) return { lat: 16.455, lng: 120.588 };
  if (p.includes('nueva ecija') || p.includes('cabanatuan') || p.includes('munoz')) return { lat: 15.486, lng: 120.967 };
  if (p.includes('guimaras') || p.includes('jordan')) return { lat: 10.658, lng: 122.593 };
  if (p.includes('navotas') || p.includes('manila') || p.includes('metro manila') || p.includes('quezon city') || p.includes('pasig') || p.includes('taguig') || p.includes('makati')) return { lat: 14.669, lng: 120.939 };
  if (p.includes('quezon') || p.includes('lucban') || p.includes('tayabas')) return { lat: 14.113, lng: 121.556 };
  if (p.includes('cavite') || p.includes('silang') || p.includes('tagaytay') || p.includes('dasmarinas')) return { lat: 14.230, lng: 120.974 };
  if (p.includes('batangas') || p.includes('lipa')) return { lat: 13.756, lng: 121.058 };
  if (p.includes('laguna') || p.includes('calamba') || p.includes('los banos')) return { lat: 14.270, lng: 121.417 };
  if (p.includes('pampanga') || p.includes('san fernando') || p.includes('angeles')) return { lat: 15.035, lng: 120.685 };
  if (p.includes('bulacan') || p.includes('malolos')) return { lat: 14.852, lng: 120.816 };
  if (p.includes('pangasinan') || p.includes('dagupan')) return { lat: 15.975, lng: 120.347 };
  if (p.includes('tarlac')) return { lat: 15.480, lng: 120.597 };
  if (p.includes('isabela') || p.includes('ilagan')) return { lat: 16.975, lng: 121.810 };
  if (p.includes('bukidnon') || p.includes('malaybalay') || p.includes('impasugong')) return { lat: 8.156, lng: 125.127 };
  if (p.includes('davao')) return { lat: 7.190, lng: 125.455 };
  if (p.includes('iloilo')) return { lat: 10.720, lng: 122.562 };
  if (p.includes('cebu')) return { lat: 10.315, lng: 123.885 };
  
  // Deterministic pseudo-offset for other Philippine locations
  let hash = 0;
  for (let i = 0; i < provName.length; i++) hash = ((hash << 5) - hash) + provName.charCodeAt(i);
  const latOffset = ((Math.abs(hash) % 20) - 10) * 0.04;
  const lngOffset = ((Math.abs(hash >> 3) % 20) - 10) * 0.04;
  return { lat: 14.5995 + latOffset, lng: 120.9842 + lngOffset };
}

// Unified Accounts & Farmers Directory Database Loader
function getStoredFarmers() {
  const farmerMap = new Map();

  // 1. Load Seeded Philippine Growers
  if (Array.isArray(SEED_DATA.farmers)) {
    SEED_DATA.farmers.forEach(f => {
      if (f && f.id) farmerMap.set(f.id, { ...f });
    });
  }

  // 2. Load Persisted Custom Registered Farmers
  try {
    const custom = JSON.parse(localStorage.getItem('agri_custom_farmers') || '[]');
    if (Array.isArray(custom)) {
      custom.forEach(f => {
        if (f && f.id) farmerMap.set(f.id, { ...f });
      });
    }
  } catch (e) {
    console.warn('Error reading agri_custom_farmers', e);
  }

  // 3. Scan Registered Accounts in agri_users
  try {
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    if (Array.isArray(users)) {
      users.filter(u => u && u.role === 'farmer').forEach(u => {
        if (!farmerMap.has(u.id)) {
          const coords = getProvinceCoordinates(u.province || u.city || 'Benguet');
          const farmerEntry = {
            id: u.id,
            full_name: u.full_name,
            farm_name: u.farm_name || `${u.full_name}'s Farm`,
            city: u.city || 'Local Municipality',
            province: u.province || 'Luzon',
            latitude: u.latitude || coords.lat,
            longitude: u.longitude || coords.lng,
            address: u.address || `${u.province || 'Luzon'}, Philippines`,
            bio: u.bio || `Direct agricultural producer partner on AgriConnect specializing in ${u.specialty || 'fresh harvests'}.`,
            rating: u.rating || 5.0,
            reviewsCount: u.reviewsCount || 1,
            verified: true,
            phone: u.phone || '+63 900 000 0000',
            pickupHours: u.pickupHours || '7:00 AM – 5:00 PM (Daily)',
            specialty: u.specialty || 'Direct Farm Harvests',
            avatar: u.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'
          };
          farmerMap.set(u.id, farmerEntry);
        }
      });
    }
  } catch (e) {
    console.warn('Error reading agri_users for farmers directory', e);
  }

  return Array.from(farmerMap.values());
}

// Active User Session
const activeUser = JSON.parse(localStorage.getItem('agri_user') || 'null');

// Global App State
window.AgriState = {
  products: [],
  categories: SEED_DATA.categories,
  farmers: getStoredFarmers(),
  cart: activeUser ? JSON.parse(localStorage.getItem(`agri_cart_${activeUser.id}`) || localStorage.getItem('agri_cart') || '[]') : [],
  orders: activeUser ? (JSON.parse(localStorage.getItem(`agri_orders_${activeUser.id}`) || localStorage.getItem('agri_orders') || '[]').filter(o => o && o.id !== 'AGRI-849201' && o.id !== 'AGRI-592014')) : [],
  currentCategory: 'all',
  currentFarmerFilter: null,
  currentLocation: 'all',
  searchQuery: '',
  maxPrice: 3000,
  inStockOnly: false,
  sortBy: 'newest',
  farmerMarketView: 'my_products',
  adminTrackFilter: 'all',
  adminSubFilter: 'all',
  currentMode: localStorage.getItem('agri_mode') || 'buyer',
  user: activeUser
};

// Purge any unauthenticated / orphaned sample data when signed out, and clean up mock orders & wallets
(function purgeLegacyDemoData() {
  const mockOrderIds = new Set([
    'ORD-8491', 'ORD-8495', 'ORD-8512', 'ORD-8320', 'ORD-8210', 'ORD-8192',
    'AGRI-742918', 'AGRI-918342', 'AGRI-582014', 'AGRI-419022', 'AGRI-849201', 'AGRI-592014'
  ]);

  // Clean agri_farmer_orders
  try {
    const raw = localStorage.getItem('agri_farmer_orders');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter(o => o && !mockOrderIds.has(o.id) && !String(o.id || '').startsWith('ORD-8'));
        localStorage.setItem('agri_farmer_orders', JSON.stringify(cleaned));
      }
    }
  } catch (e) {}

  // Clean agri_orders and agri_buyer_orders
  ['agri_orders', 'agri_buyer_orders'].forEach(k => {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(o => o && !mockOrderIds.has(o.id));
          localStorage.setItem(k, JSON.stringify(cleaned));
        }
      }
    } catch (e) {}
  });

  // Clean legacy global agri_farmer_ewallets if containing Ramon Dela Cruz demo wallets
  try {
    const rawWallets = localStorage.getItem('agri_farmer_ewallets');
    if (rawWallets) {
      const parsedWallets = JSON.parse(rawWallets);
      if (Array.isArray(parsedWallets)) {
        const cleanedWallets = parsedWallets.filter(w => w && w.account_name !== 'Ramon Dela Cruz' && !String(w.id || '').startsWith('ew-gcash-1') && !String(w.id || '').startsWith('ew-landbank-1'));
        if (cleanedWallets.length === 0) {
          localStorage.removeItem('agri_farmer_ewallets');
        } else {
          localStorage.setItem('agri_farmer_ewallets', JSON.stringify(cleanedWallets));
        }
      }
    }
  } catch (e) {}
})();

if (!activeUser) {
  localStorage.removeItem('agri_cart');
  localStorage.removeItem('agri_orders');
  localStorage.removeItem('agri_buyer_orders');
} else {
  // Sync user-specific keys
  localStorage.setItem(`agri_orders_${activeUser.id}`, JSON.stringify(window.AgriState.orders));
  localStorage.setItem(`agri_cart_${activeUser.id}`, JSON.stringify(window.AgriState.cart));
}

// Clear any lingering session from the removed demo accounts
if (window.AgriState.user && ['farmer-ramon', 'buyer-juan'].includes(window.AgriState.user.id)) {
  window.AgriState.user = null;
  window.AgriState.cart = [];
  window.AgriState.orders = [];
  localStorage.removeItem('agri_user');
  localStorage.removeItem('agri_cart');
  localStorage.removeItem('agri_orders');
  localStorage.setItem('agri_mode', 'buyer');
  window.AgriState.currentMode = 'buyer';
}

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

  // Read URL params (e.g. marketplace.html?category=Fruits or ?farmer=Dela+Cruz or ?view=my_products)
  const params = new URLSearchParams(window.location.search);
  if (params.get('category')) {
    window.AgriState.currentCategory = params.get('category');
  }
  if (params.get('farmer')) {
    window.AgriState.currentFarmerFilter = params.get('farmer');
  }
  if (params.get('view')) {
    window.AgriState.farmerMarketView = params.get('view');
  }

  // Page-specific initializers
  if (document.getElementById('homeChartSection')) {
    initHomeCharts();
  }
  if (document.getElementById('sponsoredTopAdSection')) {
    initSponsoredTopAd();
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
  if (document.getElementById('adminMainView') || document.getElementById('adminTransactionsTableBody') || document.getElementById('adminAuthLockContainer')) {
    initAdminDashboard();
  }
  if (document.getElementById('adminSubMainView') || document.getElementById('adminSubLockContainer')) {
    initSubscriptionPage();
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
      } else {
        loadSeedProducts();
      }
    } else {
      loadSeedProducts();
    }
  } catch (e) {
    console.warn('Using cached agricultural catalog:', e);
    loadSeedProducts();
  }

  // Ensure all custom listings are ALWAYS merged into window.AgriState.products
  try {
    const customListings = JSON.parse(localStorage.getItem('agri_custom_products') || '[]');
    if (Array.isArray(customListings) && customListings.length > 0) {
      customListings.forEach(customProd => {
        const existingIdx = window.AgriState.products.findIndex(p => p.id === customProd.id);
        if (existingIdx >= 0) {
          window.AgriState.products[existingIdx] = customProd;
        } else {
          window.AgriState.products.unshift(customProd);
        }
      });
    }
  } catch (e) {
    console.warn('Could not parse custom products in loadInitialData:', e);
  }
}

function normalizeProduct(p) {
  let photo = p.image_url;
  if (!photo || photo.includes('photo-1534943441045') || photo.includes('photo-1598170845058-32b9d6a5c317') || photo.includes('photo-1598170845058-32b9d6a5c731') || photo.includes('photo-1596097635121') || photo.includes('photo-1596124579928')) {
    photo = getProductPhotoUrl(p.name, p.category_id || p.categories?.name);
  }
  return {
    id: p.id,
    name: p.name,
    category_id: p.category_id,
    category_name: p.categories?.name || 'Product',
    price: Number(p.price),
    unit: p.unit || 'kg',
    quantity: p.quantity ?? 50,
    is_available: p.is_available ?? true,
    image_url: photo,
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
      image_url: "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800",
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
      image_url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800",
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
  const wrapper = document.getElementById('categoryChipsWrapper') || (container ? container.parentElement : null);
  if (!container) return;

  const user = window.AgriState.user;
  const isFarmer = Boolean(user && user.role === 'farmer');

  if (isFarmer) {
    if (wrapper) wrapper.style.setProperty('display', 'none', 'important');
    container.style.setProperty('display', 'none', 'important');
    return;
  } else {
    if (wrapper) wrapper.style.removeProperty('display');
    container.style.removeProperty('display');
  }

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

  // 1. Direct ID checks (exact, prefixed, or user_id)
  if (product.farmer_id && (product.farmer_id === user.id || product.farmer_id === `farmer-${user.id}` || user.id === `farmer-${product.farmer_id}`)) {
    return true;
  }
  if (product.farmer_user_id && (product.farmer_user_id === user.id || product.farmer_user_id === `farmer-${user.id}`)) {
    return true;
  }

  // 2. Direct Email check
  if (product.farmer_email && user.email && product.farmer_email.toLowerCase() === user.email.toLowerCase()) {
    return true;
  }

  // 3. Farm name comparison
  if (user.farm_name && product.farmer_name) {
    const uFarm = user.farm_name.toLowerCase().trim();
    const pFarm = product.farmer_name.toLowerCase().trim();
    if (uFarm === pFarm || pFarm.includes(uFarm) || uFarm.includes(pFarm)) return true;
  }

  // 4. Full name comparison
  if (user.full_name && product.farmer_name) {
    const uName = user.full_name.toLowerCase().trim();
    const pFarm = product.farmer_name.toLowerCase().trim();
    if (pFarm.includes(uName) || uName.includes(pFarm)) return true;
  }

  return false;
}

function setFarmerMarketView(view) {
  window.AgriState.farmerMarketView = view;
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countLabel = document.getElementById('productsCountLabel') || document.getElementById('productCount');
  const banner = document.getElementById('activeFarmerBanner');
  if (!container) return;

  const user = window.AgriState.user;
  const isAdmin = Boolean(user && (user.role === 'admin' || user.is_admin || user.email === 'comiakrystel@gmail.com'));
  const isFarmer = Boolean(user && user.role === 'farmer' && !isAdmin);
  const isViewingMyProducts = isFarmer && (window.AgriState.farmerMarketView !== 'all');

  // Dynamic Marketplace / Analytics / My Products Header
  const subtitleEl = document.getElementById('marketplaceSubtitle');
  const titleEl = document.getElementById('marketplaceTitle');
  const descEl = document.getElementById('marketplaceDescription');
  const farmerControls = document.getElementById('farmerMarketControls');
  const btnMyProducts = document.getElementById('btnViewMyProducts');
  const btnAllMarket = document.getElementById('btnViewAllMarket');
  const farmerOwnCount = document.getElementById('farmerOwnCount');
  const farmerTotalCount = document.getElementById('farmerTotalCount');
  const adminAnalyticsPanel = document.getElementById('adminMarketplaceAnalyticsPanel');

  const ownProductsList = window.AgriState.products.filter(p => isUserOwnProduct(p));

  if (farmerControls) {
    if (isAdmin) {
      farmerControls.style.display = 'none';
      if (subtitleEl) subtitleEl.textContent = 'Platform Commercial Oversight & Product Analytics';
      if (titleEl) titleEl.textContent = 'Marketplace Dashboard & Analytics';
      if (descEl) descEl.textContent = 'Supervise real-time sales per product, top-performing farmers, best-selling items, and manage live agricultural catalog inventory.';
      if (adminAnalyticsPanel) {
        adminAnalyticsPanel.style.display = 'block';
        renderMarketplaceAdminAnalytics();
      }
    } else if (isFarmer) {
      if (adminAnalyticsPanel) adminAnalyticsPanel.style.display = 'none';
      farmerControls.style.display = 'flex';
      if (farmerOwnCount) farmerOwnCount.textContent = ownProductsList.length;
      if (farmerTotalCount) farmerTotalCount.textContent = window.AgriState.products.length;

      if (isViewingMyProducts) {
        if (subtitleEl) subtitleEl.textContent = 'Farm Inventory & Active Listings';
        if (titleEl) titleEl.textContent = 'My Products';
        if (descEl) descEl.textContent = `Viewing all ${ownProductsList.length} crops and harvests you are actively selling directly to buyers as a registered farmer.`;
        if (btnMyProducts) {
          btnMyProducts.className = 'btn-primary';
          btnMyProducts.style.background = 'var(--primary)';
          btnMyProducts.style.color = '#ffffff';
        }
        if (btnAllMarket) {
          btnAllMarket.className = 'btn-secondary';
          btnAllMarket.style.background = '#ffffff';
          btnAllMarket.style.color = 'var(--text-main)';
        }
      } else {
        if (subtitleEl) subtitleEl.textContent = 'Philippine Agricultural Catalog';
        if (titleEl) titleEl.textContent = 'All Marketplace Products';
        if (descEl) descEl.textContent = 'Browsing all platform harvests from verified Filipino farmers across the islands.';
        if (btnMyProducts) {
          btnMyProducts.className = 'btn-secondary';
          btnMyProducts.style.background = '#ffffff';
          btnMyProducts.style.color = 'var(--text-main)';
        }
        if (btnAllMarket) {
          btnAllMarket.className = 'btn-primary';
          btnAllMarket.style.background = 'var(--primary)';
          btnAllMarket.style.color = '#ffffff';
        }
      }
    } else {
      if (adminAnalyticsPanel) adminAnalyticsPanel.style.display = 'none';
      farmerControls.style.display = 'none';
      if (subtitleEl) subtitleEl.textContent = 'Philippine Agricultural Catalog';
      if (titleEl) titleEl.textContent = 'Direct Farmgate Product';
      if (descEl) descEl.textContent = 'Every purchase directly supports our local farmers. 100% transparent pricing and guaranteed freshness.';
    }
  }

  let list = window.AgriState.products.filter(p => {
    // If viewing farmer's own products
    if (isViewingMyProducts && !isUserOwnProduct(p)) {
      return false;
    }
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
    countLabel.textContent = isViewingMyProducts 
      ? `Showing ${list.length} item(s) (Your Farm Listings)` 
      : `Showing ${list.length} item(s)`;
  }

  if (list.length === 0) {
    if (isViewingMyProducts) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3.5rem 1rem; background: #ffffff; border-radius: var(--radius-md); border: 1px dashed var(--border-strong);">
          <h4 style="font-size: 1.15rem; font-weight: 700;">No crops found in this view</h4>
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.35rem; max-width: 400px; margin-left: auto; margin-right: auto;">
            You have no active products listed matching your filters. List your harvest directly to consumers!
          </p>
          <a href="sell-harvest.html" class="btn-primary" style="margin-top: 1.25rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
            + List Your Harvest Now
          </a>
        </div>
      `;
      return;
    }
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
      <div class="product-img-wrap" onclick="openProductModal('${p.id}')" style="cursor: pointer; position: relative;">
        <img src="${p.image_url}" alt="${p.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'">
        <span class="category-badge">${p.category_name}</span>
        <span class="stock-badge ${p.quantity <= 15 ? 'low' : ''}">
          ${p.quantity > 0 ? `${p.quantity} ${p.unit} in stock` : 'Sold out'}
        </span>
        ${isOwn ? `
          <span style="position: absolute; bottom: 8px; left: 8px; background: rgba(21, 128, 61, 0.92); color: white; padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.03em; box-shadow: var(--shadow-sm);">
            🌱 Your Harvest
          </span>
        ` : ''}
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
              <button onclick="editFarmerProductPrice('${p.id}')" class="btn-secondary" style="padding: 0.45rem 0.75rem; font-size: 0.8rem; border-color: #86efac; color: #166534; background: #f0fdf4; font-weight: 700;" title="Update Price or Inventory">
                Edit Stock
              </button>
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
            <a href="maps.html?lat=${f.latitude}&lng=${f.longitude}&name=${encodeURIComponent(f.farm_name)}" class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem; margin-top: 0.35rem;" title="View exact farm location & directions">
              ${ICONS.mapPin} Get Location & Directions
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
  const isAdmin = Boolean(user && (user.role === 'admin' || user.is_admin || user.email === 'comiakrystel@gmail.com'));
  const isFarmer = Boolean(user && user.role === 'farmer' && !isAdmin);

  // Update Page Headers & Search Placeholder based on Role
  const titleEl = document.getElementById('trackPageTitle');
  const subtitleEl = document.getElementById('trackPageSubtitle');
  const tagEl = document.getElementById('trackPageTag');
  const searchInput = document.getElementById('trackingSearchInput');
  const adminTrackToolbar = document.getElementById('adminTrackFiltersToolbar');

  // -----------------------------------------------------------
  // GUEST / SIGNED-OUT BARRIER: Sign in required to view orders
  // -----------------------------------------------------------
  if (!user) {
    if (adminTrackToolbar) adminTrackToolbar.style.display = 'none';
    if (titleEl) titleEl.textContent = "Track Your Farm Orders";
    if (subtitleEl) subtitleEl.textContent = "Sign in or create an account to monitor your direct farmgate orders and cold-chain dispatches in real-time.";
    if (tagEl) tagEl.textContent = "COLD-CHAIN REAL-TIME MONITORING";
    if (searchInput) searchInput.placeholder = "Sign in required to search orders";

    container.innerHTML = `
      <div style="text-align: center; padding: 4.5rem 1.75rem; background: #ffffff; border-radius: var(--radius-md); border: 1.5px dashed var(--border-strong); box-shadow: var(--shadow-sm); max-width: 680px; margin: 0 auto;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: #f0fdf4; border: 2px solid #bbf7d0; color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">
          🔒
        </div>
        <span style="font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.08em; background: var(--primary-light); padding: 0.25rem 0.75rem; border-radius: 9999px; display: inline-block; margin-bottom: 0.75rem;">
          Authentication Required
        </span>
        <h3 style="font-size: 1.45rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; letter-spacing: -0.01em;">
          Sign In Required to Track Orders
        </h3>
        <p style="font-size: 0.925rem; color: var(--text-secondary); max-width: 500px; margin: 0 auto 2rem; line-height: 1.6;">
          You are currently signed out. Please sign in or register an account to view and track your direct farmgate orders and cold-chain dispatches.
        </p>
        <div style="display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap;">
          <a href="auth.html?redirect=track-orders.html" class="btn-primary" style="padding: 0.75rem 1.6rem; text-decoration: none; font-size: 0.9rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 2px 8px rgba(21,128,61,0.25);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            <span>Log In / Register</span>
          </a>
          <a href="marketplace.html" class="btn-secondary" style="padding: 0.75rem 1.4rem; text-decoration: none; font-size: 0.9rem; font-weight: 600;">
            Browse Marketplace &rarr;
          </a>
        </div>
      </div>
    `;
    return;
  }

  // -----------------------------------------------------------
  // ADMIN VIEW: Platform-Wide Shipping Supervision & Filters
  // -----------------------------------------------------------
  if (isAdmin) {
    if (adminTrackToolbar) adminTrackToolbar.style.display = 'flex';
    if (titleEl) titleEl.textContent = "Supervise Platform Orders & Shipping Status";
    if (subtitleEl) subtitleEl.textContent = "Monitor real-time cold-chain dispatches, carrier routes, and shipping statuses across all transactions on the AgriConnect platform.";
    if (tagEl) tagEl.textContent = "👑 PLATFORM LOGISTICS & SHIPPING SUPERVISION";
    if (searchInput) searchInput.placeholder = "Search by Order ID, Buyer Name, Farmer, Crop, or Province...";

    const allPlatformOrders = getAllPlatformOrders();
    const currentTrackFilter = window.AgriState.adminTrackFilter || 'all';

    // Counts for filter tabs
    const countPending = allPlatformOrders.filter(o => {
      const s = (o.status_code || o.status || '').toLowerCase();
      return s === 'pending' || s === 'to_deliver' || s === 'processing' || s.includes('pending') || s.includes('confirm') || s.includes('harvest');
    }).length;

    const countInTransit = allPlatformOrders.filter(o => {
      const s = (o.status_code || o.status || '').toLowerCase();
      return s === 'in_transit' || s.includes('transit');
    }).length;

    const countDelivered = allPlatformOrders.filter(o => {
      const s = (o.status_code || o.status || '').toLowerCase();
      return s === 'delivered' || s.includes('delivered');
    }).length;

    const countCancelled = allPlatformOrders.filter(o => {
      const s = (o.status_code || o.status || '').toLowerCase();
      return s === 'cancelled' || s.includes('cancel');
    }).length;

    // Update filter count labels
    const elCountAll = document.getElementById('trackCountAll');
    const elCountPending = document.getElementById('trackCountPending');
    const elCountInTransit = document.getElementById('trackCountInTransit');
    const elCountDelivered = document.getElementById('trackCountDelivered');
    const elCountCancelled = document.getElementById('trackCountCancelled');

    if (elCountAll) elCountAll.textContent = allPlatformOrders.length;
    if (elCountPending) elCountPending.textContent = countPending;
    if (elCountInTransit) elCountInTransit.textContent = countInTransit;
    if (elCountDelivered) elCountDelivered.textContent = countDelivered;
    if (elCountCancelled) elCountCancelled.textContent = countCancelled;

    // Filter list
    let filteredOrders = allPlatformOrders.filter(o => {
      const s = (o.status_code || o.status || '').toLowerCase();
      if (currentTrackFilter === 'pending') {
        return s === 'pending' || s === 'to_deliver' || s === 'processing' || s.includes('pending') || s.includes('confirm') || s.includes('harvest');
      } else if (currentTrackFilter === 'in_transit') {
        return s === 'in_transit' || s.includes('transit');
      } else if (currentTrackFilter === 'delivered') {
        return s === 'delivered' || s.includes('delivered');
      } else if (currentTrackFilter === 'cancelled') {
        return s === 'cancelled' || s.includes('cancel');
      }
      return true;
    });

    // Check search input query
    const searchQuery = (searchInput ? searchInput.value : '').trim().toLowerCase();
    if (searchQuery) {
      filteredOrders = filteredOrders.filter(o => {
        const idMatch = (o.id || '').toLowerCase().includes(searchQuery);
        const buyerMatch = (o.customer_name || o.customerName || '').toLowerCase().includes(searchQuery);
        const farmerMatch = (o.farmer_name || o.origin || '').toLowerCase().includes(searchQuery);
        const addrMatch = (o.delivery_address || o.address || '').toLowerCase().includes(searchQuery);
        const itemsMatch = (o.items || []).some(i => (i.name || '').toLowerCase().includes(searchQuery));
        return idMatch || buyerMatch || farmerMatch || addrMatch || itemsMatch;
      });
    }

    if (filteredOrders.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1.5rem; background: #ffffff; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
          <div style="width: 64px; height: 64px; border-radius: 9999px; background: #fef3c7; color: #b45309; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; font-size: 1.8rem;">
            🔍
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.4rem;">
            No Platform Orders Found
          </h3>
          <p style="font-size: 0.925rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem; line-height: 1.6;">
            No transactions match the selected filter "<strong>${currentTrackFilter.toUpperCase()}</strong>".
          </p>
          <button onclick="setAdminTrackFilter('all')" class="btn-primary" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
            View All Platform Orders (${allPlatformOrders.length})
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredOrders.map(order => {
      const s = (order.status_code || order.status || '').toLowerCase();
      const isDelivered = s === 'delivered' || s.includes('delivered');
      const isInTransit = s === 'in_transit' || s.includes('transit');
      const isCancelled = s === 'cancelled' || s.includes('cancel');
      const isPending = !isDelivered && !isInTransit && !isCancelled;

      const step = isDelivered ? 4 : (isInTransit ? 3 : (isCancelled ? 0 : 2));
      const buyerName = order.customer_name || order.customerName || 'AgriConnect Buyer';
      const buyerPhone = order.customer_phone || order.phone || '+63 927 183 6734';
      const buyerAddr = order.delivery_address || order.address || 'Metro Manila';
      const farmerOrigin = order.farmer_name || order.origin || 'Benguet Organic Farm Hub';
      const totalAmt = order.total || order.total_amount || 0;
      const orderDate = order.placed_at || order.date || 'Today';

      return `
        <div id="order-${order.id}" style="background: #ffffff; border: 1.5px solid ${isCancelled ? '#fecaca' : (isDelivered ? '#bbf7d0' : (isInTransit ? '#fde68a' : 'var(--border-subtle)'))}; border-radius: var(--radius-md); padding: 1.6rem; margin-bottom: 1.75rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
          
          <!-- Top Row: Order ID, Date, Amount, Status Badge -->
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem; margin-bottom: 1rem; gap: 0.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 0.7rem; color: #ffffff; background: #0f172a; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.04em;">👑 PLATFORM TRANSACTION</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Placed: ${orderDate}</span>
              </div>
              <h4 style="font-size: 1.3rem; font-weight: 800; color: var(--primary-deep); font-family: monospace; margin: 0.25rem 0 0;">${order.id}</h4>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Transaction Amount:</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-main); font-family: monospace;">
                ₱${totalAmt.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <!-- Stepper Visualizer -->
          ${!isCancelled ? `
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin: 1rem 0 1.25rem; text-align: center;">
              <div>
                <div style="width: 30px; height: 30px; border-radius: 9999px; background: #15803d; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; margin: 0 auto 0.3rem;">1</div>
                <span style="font-size: 0.75rem; font-weight: 700; color: #15803d;">Confirmed</span>
              </div>
              <div>
                <div style="width: 30px; height: 30px; border-radius: 9999px; background: ${step >= 2 ? '#15803d' : 'var(--bg-subtle)'}; color: ${step >= 2 ? '#ffffff' : 'var(--text-light)'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; margin: 0 auto 0.3rem;">2</div>
                <span style="font-size: 0.75rem; font-weight: 700; color: ${step >= 2 ? '#15803d' : 'var(--text-muted)'};">Harvested</span>
              </div>
              <div>
                <div style="width: 30px; height: 30px; border-radius: 9999px; background: ${step >= 3 ? '#15803d' : 'var(--bg-subtle)'}; color: ${step >= 3 ? '#ffffff' : 'var(--text-light)'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; margin: 0 auto 0.3rem;">3</div>
                <span style="font-size: 0.75rem; font-weight: 700; color: ${step >= 3 ? '#15803d' : 'var(--text-muted)'};">In Transit</span>
              </div>
              <div>
                <div style="width: 30px; height: 30px; border-radius: 9999px; background: ${step >= 4 ? '#15803d' : 'var(--bg-subtle)'}; color: ${step >= 4 ? '#ffffff' : 'var(--text-light)'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; margin: 0 auto 0.3rem;">4</div>
                <span style="font-size: 0.75rem; font-weight: 700; color: ${step >= 4 ? '#15803d' : 'var(--text-muted)'};">Delivered</span>
              </div>
            </div>
          ` : `
            <div style="background: #fee2e2; border: 1px solid #fecaca; border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 1.25rem; color: #dc2626; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>✗</span> Order Cancelled / Refunded in Escrow
            </div>
          `}

          <!-- Grid: Buyer vs Producer vs Logistics Details -->
          <div style="background: var(--bg-page); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem 1.15rem; margin-bottom: 1.25rem; font-size: 0.85rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Buyer Customer</div>
              <div style="font-weight: 800; color: var(--text-main); margin-top: 0.15rem;">${buyerName}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.1rem;">📞 ${buyerPhone}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.1rem;">📍 ${buyerAddr}</div>
            </div>

            <div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Farm Origin & Producer</div>
              <div style="font-weight: 800; color: var(--primary-deep); margin-top: 0.15rem;">${farmerOrigin}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.1rem;">🌱 Direct Harvest Payout</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.1rem;">Route: ${farmerOrigin} &rarr; ${buyerAddr}</div>
            </div>

            <div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Cold-Chain Sensor & Transit</div>
              <div style="font-weight: 700; color: #15803d; margin-top: 0.15rem; display: flex; align-items: center; gap: 0.35rem;">
                ❄️ 4.2°C Cold-Chain Optimal
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.1rem;">
                🚚 ${order.delivery_method || order.fulfillment || 'AgriConnect Refrigerated Dispatch'}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.1rem;">Payment: ${order.paymentMethod || order.payment_method || 'Verified Online Settlement'}</div>
            </div>
          </div>

          <!-- Items Ordered Summary -->
          <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
            <div style="font-size: 0.725rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">Items Included in Consignment:</div>
            <div style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">
              ${(order.items || []).map(i => `<span style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); padding: 0.2rem 0.55rem; border-radius: 4px; display: inline-block; margin: 0.15rem 0.25rem 0.15rem 0;"><strong>${i.quantity} ${i.unit || 'unit'}</strong> × ${i.name} (${i.price ? `₱${i.price}` : ''})</span>`).join('')}
            </div>
          </div>

          <!-- Admin Interactive Status Controller -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 0.85rem; background: #fafafa; margin: 0 -1.6rem -1.6rem; padding: 0.85rem 1.6rem; border-bottom-left-radius: var(--radius-md); border-bottom-right-radius: var(--radius-md);">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Admin Shipping Control:</span>
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                <button onclick="adminUpdateOrderStatus('${order.id}', 'pending')" class="btn-secondary" style="font-size: 0.725rem; padding: 0.3rem 0.6rem; ${isPending ? 'background: #fef3c7; color: #b45309; border-color: #fde68a; font-weight: 800;' : ''}">
                  ⏳ Pending
                </button>
                <button onclick="adminUpdateOrderStatus('${order.id}', 'in_transit')" class="btn-secondary" style="font-size: 0.725rem; padding: 0.3rem 0.6rem; ${isInTransit ? 'background: #e0f2fe; color: #0284c7; border-color: #bae6fd; font-weight: 800;' : ''}">
                  🚚 In Transit
                </button>
                <button onclick="adminUpdateOrderStatus('${order.id}', 'delivered')" class="btn-secondary" style="font-size: 0.725rem; padding: 0.3rem 0.6rem; ${isDelivered ? 'background: #dcfce7; color: #15803d; border-color: #bbf7d0; font-weight: 800;' : ''}">
                  ✓ Delivered
                </button>
                <button onclick="adminUpdateOrderStatus('${order.id}', 'cancelled')" class="btn-secondary" style="font-size: 0.725rem; padding: 0.3rem 0.6rem; ${isCancelled ? 'background: #fee2e2; color: #dc2626; border-color: #fecaca; font-weight: 800;' : ''}">
                  ✗ Cancelled
                </button>
              </div>
            </div>

            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <span style="font-size: 0.725rem; color: var(--text-muted);">Current:</span>
              <span style="font-size: 0.8rem; font-weight: 800; color: ${isDelivered ? '#15803d' : (isInTransit ? '#0284c7' : (isCancelled ? '#dc2626' : '#b45309'))};">
                ${isDelivered ? '✓ Delivered' : (isInTransit ? '🚚 In Transit' : (isCancelled ? '✗ Cancelled' : '⏳ Pending Harvest/Dispatch'))}
              </span>
            </div>
          </div>

        </div>
      `;
    }).join('');
    return;
  } else {
    if (adminTrackToolbar) adminTrackToolbar.style.display = 'none';
  }

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
  // BUYER VIEW: Track Your Farm Orders
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
  const user = window.AgriState.user;
  if (!user) {
    showToast('Please sign in or create an account to search and track orders.');
    setTimeout(() => {
      window.location.href = 'auth.html?redirect=track-orders.html';
    }, 800);
    return;
  }

  const input = document.getElementById('trackingSearchInput');
  if (!input) return;
  const query = input.value.trim().toUpperCase();
  if (!query) {
    showToast('Please enter an Order ID to search.');
    return;
  }

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
    showToast('Please log in or create an account before adding items to your harvest basket.');
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
  const user = window.AgriState.user;
  if (user && user.id) {
    localStorage.setItem(`agri_cart_${user.id}`, JSON.stringify(window.AgriState.cart));
  } else {
    localStorage.removeItem('agri_cart');
  }
}

function updateCartBadge(shouldBump = false) {
  const user = window.AgriState.user;
  const badges = document.querySelectorAll('.cart-badge');

  if (!user) {
    badges.forEach(b => {
      b.textContent = '0';
      b.style.display = 'none';
    });
    return;
  }

  const isFarmer = Boolean(user && user.role === 'farmer');

  if (isFarmer) {
    const orders = getFarmerOrders();
    const pendingCount = orders.filter(o => o.status_code === 'pending').length;
    const farmerBadges = document.querySelectorAll('.cart-badge, .farmer-orders-badge');
    farmerBadges.forEach(b => {
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

// -------------------------------------------------------------
// CART & DRAWER SCROLL-LOCK CONTROLLER
// -------------------------------------------------------------
let activeDrawerScrollY = 0;

function lockBodyScroll() {
  if (document.body.classList.contains('cart-open')) return;
  activeDrawerScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  document.body.dataset.cartScrollY = activeDrawerScrollY.toString();
  document.documentElement.classList.add('cart-open');
  document.body.classList.add('cart-open');
  document.body.style.position = 'fixed';
  document.body.style.top = `-${activeDrawerScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.overscrollBehavior = 'none';
}

function unlockBodyScroll() {
  const cartDrawer = document.getElementById('cartDrawer');
  const farmerDrawer = document.getElementById('farmerOrdersDrawer');
  const checkoutModal = document.getElementById('checkoutModal');
  const isCartOpen = cartDrawer && cartDrawer.classList.contains('open');
  const isFarmerOpen = farmerDrawer && farmerDrawer.classList.contains('open');
  const isCheckoutOpen = checkoutModal && checkoutModal.classList.contains('open');
  if (isCartOpen || isFarmerOpen || isCheckoutOpen) return;

  if (!document.body.classList.contains('cart-open')) return;
  const savedY = parseInt(document.body.dataset.cartScrollY || activeDrawerScrollY || '0', 10);
  document.documentElement.classList.remove('cart-open');
  document.body.classList.remove('cart-open');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.documentElement.style.overscrollBehavior = '';
  window.scrollTo(0, savedY);
}

function toggleCart(open = true) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop') || document.getElementById('drawerBackdrop');
  if (!drawer) return;

  // Clean up any stray popovers
  document.querySelectorAll('.cart-preview-popover').forEach(p => p.remove());

  if (open) {
    renderCartDrawer();
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    lockBodyScroll();
  } else {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    unlockBodyScroll();
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

  // Clean up any stray popovers
  document.querySelectorAll('.cart-preview-popover').forEach(p => p.remove());

  if (open) {
    renderFarmerOrdersDrawer(currentFarmerDrawerFilter);
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    lockBodyScroll();
  } else {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    unlockBodyScroll();
  }
}

function renderFarmerOrdersDrawer(filter = 'all') {
  currentFarmerDrawerFilter = filter;
  const drawer = document.getElementById('farmerOrdersDrawer');
  if (!drawer) return;

  const user = window.AgriState.user;
  if (!user || user.role !== 'farmer') {
    drawer.innerHTML = `
      <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, #14532d 0%, #166534 100%); color: #ffffff;">
        <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: #ffffff;">Farmer Orders Management</h3>
        <button onclick="toggleFarmerOrdersDrawer(false)" style="background: none; border: none; font-size: 1.6rem; color: #ffffff; cursor: pointer; line-height: 1; padding: 0.2rem 0.5rem;" aria-label="Close Drawer">&times;</button>
      </div>
      <div style="padding: 3rem 1.5rem; text-align: center;">
        <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🔒</div>
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">Producer Access Required</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px; margin: 0 auto 1.5rem; line-height: 1.5;">
          You are currently in guest mode. Please log in with a registered farmer producer account to manage incoming farmgate orders.
        </p>
        <a href="auth.html?redirect=dashboard.html" class="btn-primary" style="text-decoration: none; padding: 0.65rem 1.25rem; font-weight: 700; display: inline-block;">Log In as Farmer</a>
      </div>
    `;
    return;
  }

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
            ${user.full_name} • ${user.farm_name || 'AgriConnect Producer Farm'}
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
  // Clean up any legacy cart preview popovers to prevent hanging redundancy
  document.querySelectorAll('.cart-preview-popover').forEach(p => p.remove());
  document.querySelectorAll('.cart-button-wrap').forEach(w => {
    while (w.firstChild) {
      w.parentNode.insertBefore(w.firstChild, w);
    }
    w.remove();
  });
}

function renderCartPreview() {
  // Safe no-op: popover preview eliminated so cart is strictly accessible on icon click
}

function renderCartDrawer() {
  const container = document.getElementById('cartItemsList') || document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  const deliveryEl = document.getElementById('cartDelivery');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (!container) return;

  const user = window.AgriState.user;
  const pageRef = (window.location.pathname.split('/').pop() || 'marketplace.html') + (window.location.search || '');

  // -----------------------------------------------------------
  // GUEST / SIGNED OUT STATE: Sign in required to view basket
  // -----------------------------------------------------------
  if (!user) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 1.25rem; color: var(--text-muted);">
        <div style="width: 56px; height: 56px; margin: 0 auto 1rem; border-radius: 50%; background: #f0fdf4; border: 1.5px solid #bbf7d0; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: var(--primary);">
          🔒
        </div>
        <span style="font-size: 0.72rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.06em; background: var(--primary-light); padding: 0.2rem 0.6rem; border-radius: 9999px; display: inline-block; margin-bottom: 0.6rem;">
          Sign In Required
        </span>
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.4rem;">
          Your Harvest Basket is Locked
        </h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px; margin: 0 auto 1.5rem; line-height: 1.5;">
          Please sign in or create an account to view and manage items in your harvest basket.
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 260px; margin: 0 auto;">
          <a href="auth.html?redirect=${encodeURIComponent(pageRef)}" class="btn-primary" style="padding: 0.7rem 1.25rem; font-size: 0.875rem; font-weight: 700; text-decoration: none; text-align: center;">
            Log In / Register
          </a>
          <a href="marketplace.html" onclick="toggleCart(false)" class="btn-secondary" style="padding: 0.65rem 1.25rem; font-size: 0.85rem; text-decoration: none; text-align: center;">
            Browse Marketplace
          </a>
        </div>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₱0';
    if (deliveryEl) deliveryEl.textContent = '₱0';
    if (totalEl) totalEl.textContent = '₱0';
    const checkoutButtons = document.querySelectorAll('#cartDrawer button.btn-primary, #cartDrawer #checkoutBtn, button[onclick*="openCheckoutModal"], button[onclick*="proceedToCheckout"]');
    checkoutButtons.forEach(btn => {
      btn.textContent = 'Log In / Register to Checkout';
      btn.onclick = () => {
        window.location.href = `auth.html?redirect=${encodeURIComponent(pageRef)}`;
      };
    });
    return;
  }

  if (window.AgriState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
        <div style="width: 44px; height: 44px; margin: 0 auto 0.75rem; border-radius: var(--radius-sm); background: var(--bg-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-light);">
          ${ICONS.package}
        </div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main);">Your cart is empty</h4>
        <p style="font-size: 0.825rem; margin-top: 0.35rem;">Add fresh harvests from the marketplace to proceed.</p>
        <a href="marketplace.html" onclick="toggleCart(false)" class="btn-primary" style="margin-top: 1.25rem; display: inline-block;">
          Browse Marketplace
        </a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₱0';
    if (deliveryEl) deliveryEl.textContent = '₱0';
    if (totalEl) totalEl.textContent = '₱0';
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
  if (deliveryEl) deliveryEl.textContent = `₱${deliveryFee.toLocaleString()}`;
  if (totalEl) totalEl.textContent = `₱${(subtotal + deliveryFee).toLocaleString()}`;
  
  // Update all cart checkout buttons across drawer
  const checkoutButtons = document.querySelectorAll('#cartDrawer button.btn-primary, #cartDrawer #checkoutBtn, button[onclick*="openCheckoutModal"], button[onclick*="proceedToCheckout"]');
  checkoutButtons.forEach(btn => {
    btn.disabled = false;
    btn.textContent = 'Proceed to Checkout';
    btn.title = 'Proceed to Checkout';
    btn.onclick = openCheckoutModal;
  });
}

function proceedToCheckout() {
  const user = window.AgriState.user;
  const page = window.location.pathname.split('/').pop() || 'marketplace.html';
  const search = window.location.search || '';
  const pageRef = page + search;

  if (!user) {
    showToast('Please log in or create an account to make a purchase.');
    setTimeout(() => {
      window.location.href = `auth.html?redirect=${encodeURIComponent(pageRef)}`;
    }, 700);
    return;
  }
  openCheckoutModal();
}

function openCheckoutModal() {
  const user = window.AgriState.user;
  const page = window.location.pathname.split('/').pop() || 'marketplace.html';
  const search = window.location.search || '';
  const pageRef = page + search;

  if (!user) {
    showToast('Please log in or create an account to make a purchase.');
    setTimeout(() => {
      window.location.href = `auth.html?redirect=${encodeURIComponent(pageRef)}`;
    }, 700);
    return;
  }

  if (window.AgriState.cart.length === 0) return;
  toggleCart(false);

  const modal = document.getElementById('checkoutModal');
  if (!modal) {
    window.location.href = 'marketplace.html';
    return;
  }

  // Pre-fill buyer shipment details if available on user account
  const form = document.getElementById('checkoutForm');
  if (form && user) {
    const nameInput = form.querySelector('input[name="fullName"], input[name="customerName"]');
    if (nameInput && !nameInput.value) nameInput.value = user.full_name || user.name || '';

    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';

    const cityInput = form.querySelector('input[name="city"]');
    if (cityInput && !cityInput.value) cityInput.value = user.shipping_city || user.province || user.city || '';

    const addrInput = form.querySelector('textarea[name="address"], input[name="address"]');
    if (addrInput && !addrInput.value) addrInput.value = user.shipping_address || user.address || '';
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

  // Pre-select Pay Now and initialize balance coverage display
  const payNowRadio = document.querySelector('#checkoutForm input[name="paymentMethod"][value*="Pay Now"]');
  if (payNowRadio) payNowRadio.checked = true;
  handlePaymentMethodChange('Pay Now (AgriConnect Balance)');

  modal.classList.add('open');
  lockBodyScroll();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('open');
  unlockBodyScroll();
}

async function submitOrder(e) {
  e.preventDefault();
  const user = window.AgriState.user;
  if (!user) {
    showToast('Please log in or create an account to complete your purchase.');
    closeCheckoutModal();
    const pageRef = (window.location.pathname.split('/').pop() || 'marketplace.html') + (window.location.search || '');
    setTimeout(() => {
      window.location.href = `auth.html?redirect=${encodeURIComponent(pageRef)}`;
    }, 700);
    return;
  }

  const form = e.target;
  const formData = new FormData(form);
  const paymentMethod = formData.get('paymentMethod') || 'Pay Now (AgriConnect Balance)';

  const subtotal = window.AgriState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const fulfillment = formData.get('fulfillment') || 'delivery';
  const deliveryFee = fulfillment === 'delivery' ? 95 : 0;
  const total = subtotal + deliveryFee;

  // Check balance if Pay Now is selected
  if (paymentMethod.includes('Pay Now') || paymentMethod.includes('AgriConnect Balance')) {
    const curBal = getBuyerBalance();
    if (curBal < total) {
      const shortfall = total - curBal;
      showToast(`⚠️ Insufficient balance! Please deposit ₱${shortfall.toLocaleString()} to complete with Pay Now.`);
      openDepositModal(shortfall);
      return;
    }
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing Order...';
  }

  const orderId = 'AGRI-' + Math.floor(100000 + Math.random() * 900000);

  // Auto-deduct from Buyer Purchase Balance if Pay Now selected
  if (paymentMethod.includes('Pay Now') || paymentMethod.includes('AgriConnect Balance')) {
    deductBuyerBalance(total, orderId, `Multi-Farmer Order #${orderId} (${window.AgriState.cart.length} items)`);
  }

  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
    items: [...window.AgriState.cart],
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    total: total,
    fulfillment: fulfillment,
    customerName: formData.get('fullName') || formData.get('customerName') || user.full_name || 'Verified Buyer',
    phone: formData.get('phone') || user.phone || '09271836734',
    address: (formData.get('address') || user.shipping_address || 'Delivery Address') + ', ' + (formData.get('city') || user.shipping_city || 'Metro Manila'),
    paymentMethod: (paymentMethod.includes('Pay Now') || paymentMethod.includes('AgriConnect Balance')) ? 'AgriConnect Balance (Pay Now)' : paymentMethod,
    paymentStatus: (paymentMethod.includes('Pay Now') || paymentMethod.includes('AgriConnect Balance')) ? 'Paid Direct (Instant Auto-Deduction)' : 'Pending Settlement',
    status: 'Order Confirmed',
    status_code: 'to_deliver',
    progressStep: 1,
    eta: 'Tomorrow, Morning Dispatch (6:00 AM - 10:00 AM)',
    temperature: 'Cold-Chain Dispatching',
    origin: window.AgriState.cart[0]?.farmer_name || 'Philippine Farm Hub',
    originProvince: 'Direct Farm Partner',
    destination: (formData.get('address') || user.shipping_address || 'Delivery Address') + ', ' + (formData.get('city') || user.shipping_city || 'Metro Manila'),
    driverName: 'Assigning Cold-Chain Express Van',
    driverPhone: 'Logistics Hotline: +63 917 842 1092'
  };

  window.AgriState.orders.unshift(newOrder);
  if (user && user.id) {
    localStorage.setItem(`agri_orders_${user.id}`, JSON.stringify(window.AgriState.orders));
    localStorage.setItem(`agri_buyer_orders_${user.id}`, JSON.stringify(window.AgriState.orders));
  }
  
  // Master Platform Orders Store for Admin Oversight
  try {
    let allMasterOrders = JSON.parse(localStorage.getItem('agri_all_orders') || '[]');
    allMasterOrders.unshift(newOrder);
    localStorage.setItem('agri_all_orders', JSON.stringify(allMasterOrders));
  } catch (err) {
    console.warn('Could not update master platform orders:', err);
  }

  if (typeof addBuyerOrder === 'function') {
    addBuyerOrder(newOrder);
  }

  // Group cart items by seller farmer and persist orders for each farmer in agri_farmer_orders
  try {
    const farmerGroups = {};
    (newOrder.items || []).forEach(item => {
      let fId = item.farmer_id;
      let fName = item.farmer_name;

      if (!fId) {
        const prod = window.AgriState.products.find(p => p.id === item.id || p.name === item.name);
        if (prod && prod.farmer_id) {
          fId = prod.farmer_id;
          fName = prod.farmer_name || fName;
        } else {
          fId = 'producer-partner';
          fName = item.farmer_name || 'Direct Farm Partner';
        }
      }

      const key = fId || fName || 'general-producer';
      if (!farmerGroups[key]) {
        farmerGroups[key] = {
          farmer_id: fId,
          farmer_name: fName || 'Direct Farm Partner',
          items: [],
          subtotal: 0
        };
      }
      farmerGroups[key].items.push(item);
      farmerGroups[key].subtotal += ((item.price || 0) * (item.quantity || 1));
    });

    let allFarmerOrders = [];
    const savedOrdersStr = localStorage.getItem('agri_farmer_orders');
    if (savedOrdersStr) {
      try {
        allFarmerOrders = JSON.parse(savedOrdersStr);
      } catch (e) {
        allFarmerOrders = [...DEFAULT_FARMER_ORDERS];
      }
    } else {
      allFarmerOrders = [...DEFAULT_FARMER_ORDERS];
    }

    const groupKeys = Object.keys(farmerGroups);
    groupKeys.forEach((k, idx) => {
      const grp = farmerGroups[k];
      const farmerOrderId = groupKeys.length > 1 ? `${orderId}-F${idx + 1}` : orderId;

      const farmerOrderRecord = {
        id: farmerOrderId,
        master_order_id: orderId,
        farmer_id: grp.farmer_id,
        farmer_name: grp.farmer_name,
        buyer_id: user.id,
        customer_name: newOrder.customerName,
        customer_phone: newOrder.phone,
        delivery_address: newOrder.address,
        items: grp.items.map(it => ({
          id: it.id,
          name: it.name,
          quantity: it.quantity,
          unit: it.unit || 'kg',
          price: it.price,
          image_url: it.image_url,
          farmer_name: it.farmer_name || grp.farmer_name,
          farmer_id: it.farmer_id || grp.farmer_id
        })),
        total_amount: grp.subtotal,
        payment_method: newOrder.paymentMethod,
        payment_status: newOrder.paymentStatus,
        status: 'Pending Harvest',
        status_code: 'pending',
        remaining_time: '1 day',
        eta: 'Tomorrow, Morning Dispatch (6:00 AM - 10:00 AM)',
        temp_c: 'Cold-Chain Verified',
        placed_at: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        delivery_method: fulfillment === 'delivery' ? 'AgriConnect Cold-Chain Direct Delivery' : 'Direct Farmgate Pickup'
      };

      allFarmerOrders.unshift(farmerOrderRecord);
    });

    localStorage.setItem('agri_farmer_orders', JSON.stringify(allFarmerOrders));
  } catch (err) {
    console.warn('Could not dispatch farmer orders to agri_farmer_orders:', err);
  }

  // Live Inventory Stock Deduction
  try {
    let customProducts = JSON.parse(localStorage.getItem('agri_custom_products') || '[]');
    let customChanged = false;

    (newOrder.items || []).forEach(cartItem => {
      const prod = window.AgriState.products.find(p => p.id === cartItem.id || p.name === cartItem.name);
      if (prod) {
        prod.quantity = Math.max(0, (prod.quantity || 0) - cartItem.quantity);
        if (prod.quantity === 0) prod.is_available = false;
      }

      const custProd = customProducts.find(p => p.id === cartItem.id || p.name === cartItem.name);
      if (custProd) {
        custProd.quantity = Math.max(0, (custProd.quantity || 0) - cartItem.quantity);
        if (custProd.quantity === 0) custProd.is_available = false;
        customChanged = true;
      }
    });

    if (customChanged) {
      localStorage.setItem('agri_custom_products', JSON.stringify(customProducts));
    }
  } catch (err) {
    console.warn('Error deducting stock inventory:', err);
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
  const body = document.getElementById('orderSuccessBody') || document.getElementById('orderSuccessContent') || (modal ? modal.querySelector('.modal-content') : null);
  if (!modal || !body) return;

  const isPayNow = order.paymentMethod && (order.paymentMethod.includes('Pay Now') || order.paymentMethod.includes('AgriConnect Balance'));
  const remainingBal = getBuyerBalance();

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
          <span style="color: var(--text-muted);">Payment Method:</span>
          <span style="color: ${isPayNow ? '#15803d' : 'var(--text-main)'}; font-weight: 700;">
            ${isPayNow ? '💳 AgriConnect Balance (Pay Now)' : order.paymentMethod}
          </span>
        </div>
        ${isPayNow ? `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem; background: #f0fdf4; padding: 0.3rem 0.5rem; border-radius: 4px; border: 1px solid #bbf7d0;">
          <span style="color: #166534; font-size: 0.8rem;">Remaining Buyer Balance:</span>
          <strong style="color: #15803d; font-size: 0.85rem;">₱${remainingBal.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </div>
        ` : ''}
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
        <a href="track-orders.html" class="btn-primary" style="flex: 1; text-align: center; justify-content: center; text-decoration: none;">
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

function getStoredFarmerRequirements(userId) {
  const user = window.AgriState.user;
  const uid = userId || (user ? (user.id || user.email || 'farmer_default') : 'farmer_default');
  const key = `agri_farmer_requirements_${uid}`;
  const stored = localStorage.getItem(key) || localStorage.getItem('agri_farmer_requirements');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  return DEFAULT_FARMER_REQUIREMENTS;
}

function saveFarmerRequirements(reqs, userId) {
  const user = window.AgriState.user;
  const uid = userId || (user ? (user.id || user.email || 'farmer_default') : 'farmer_default');
  localStorage.setItem(`agri_farmer_requirements_${uid}`, JSON.stringify(reqs));
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

// Default E-Wallets (clean zero-state for new farmer accounts)
const DEFAULT_FARMER_EWALLETS = [];

function getFarmerEWalletStorageKey(userId) {
  const user = window.AgriState.user;
  const uid = userId || (user ? (user.id || user.email || 'farmer_default') : 'farmer_default');
  return `agri_farmer_ewallets_${uid}`;
}

function getStoredFarmerEWallets(userId) {
  const key = getFarmerEWalletStorageKey(userId);
  const stored = localStorage.getItem(key);
  if (stored) {
    try { 
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {}
  }
  return DEFAULT_FARMER_EWALLETS;
}

function saveFarmerEWallets(wallets, userId) {
  const key = getFarmerEWalletStorageKey(userId);
  localStorage.setItem(key, JSON.stringify(wallets));
  localStorage.setItem('agri_farmer_ewallets', JSON.stringify(wallets));
}

// ============================================================================
// BUYER WALLET, DEPOSIT FUNDS & AUTOMATIC PAY NOW CONTROLLER
// ============================================================================

function getBuyerWalletStorageKey(userId) {
  const user = window.AgriState.user;
  const uid = userId || (user ? (user.id || user.email || 'buyer_default') : 'buyer_default');
  return `agri_buyer_wallet_${uid}`;
}

function getBuyerLedgerStorageKey(userId) {
  const user = window.AgriState.user;
  const uid = userId || (user ? (user.id || user.email || 'buyer_default') : 'buyer_default');
  return `agri_buyer_ledger_${uid}`;
}

function getBuyerBalance(userId) {
  const key = getBuyerWalletStorageKey(userId);
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    const parsed = Number(saved);
    if (!isNaN(parsed)) return parsed;
  }
  // Default clean zero balance for new buyers
  const defaultBalance = 0;
  localStorage.setItem(key, defaultBalance);
  return defaultBalance;
}

function setBuyerBalance(amount, userId) {
  const key = getBuyerWalletStorageKey(userId);
  const val = Math.max(0, Number(amount) || 0);
  localStorage.setItem(key, val);
  if (window.AgriState.user) {
    window.AgriState.user.wallet_balance = val;
    localStorage.setItem('agri_user', JSON.stringify(window.AgriState.user));
  }
  updateAllWalletDisplays();
  return val;
}

function getBuyerWalletLedger(userId) {
  const key = getBuyerLedgerStorageKey(userId);
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.warn('Failed parsing wallet ledger:', e);
    }
  }
  return [];
}

function saveBuyerWalletLedger(txList, userId) {
  const key = getBuyerLedgerStorageKey(userId);
  localStorage.setItem(key, JSON.stringify(txList));
}

function depositBuyerFunds(amount, method = 'GCash (Instant Top-Up)', reference = '') {
  const curBal = getBuyerBalance();
  const depositNum = Number(amount) || 0;
  const newBal = curBal + depositNum;
  setBuyerBalance(newBal);

  const txList = getBuyerWalletLedger();
  const txId = 'TX-DEP-' + Math.floor(1000 + Math.random() * 9000);
  const today = new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });

  txList.unshift({
    id: txId,
    type: 'deposit',
    amount: depositNum,
    date: today,
    method: method,
    desc: reference ? `Deposit (${reference})` : `Deposit via ${method}`,
    status: 'Credited'
  });

  saveBuyerWalletLedger(txList);
  updateAllWalletDisplays();
  return newBal;
}

function deductBuyerBalance(amount, orderId, desc = '') {
  const curBal = getBuyerBalance();
  const deductNum = Number(amount) || 0;
  const newBal = Math.max(0, curBal - deductNum);
  setBuyerBalance(newBal);

  const txList = getBuyerWalletLedger();
  const txId = 'TX-PAY-' + Math.floor(1000 + Math.random() * 9000);
  const today = new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });

  txList.unshift({
    id: txId,
    type: 'payment',
    amount: deductNum,
    date: today,
    method: 'Auto-Deduction (Pay Now)',
    desc: desc || `Multi-Farmer Order #${orderId}`,
    status: 'Settled'
  });

  saveBuyerWalletLedger(txList);
  updateAllWalletDisplays();
  return newBal;
}

function updateAllWalletDisplays() {
  const bal = getBuyerBalance();
  const formatted = `₱${bal.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Profile page displays
  const profileBalEl = document.getElementById('buyerWalletBalanceDisplay');
  if (profileBalEl) profileBalEl.textContent = formatted;

  const ribbonVal4 = document.getElementById('profileInfoTier');
  const user = window.AgriState.user;
  const isFarmer = Boolean(user && user.role === 'farmer');
  if (!isFarmer && ribbonVal4) {
    ribbonVal4.textContent = formatted;
  }

  // Dashboard page displays
  const dashBalEl = document.getElementById('statBuyerWalletBalance');
  if (dashBalEl) dashBalEl.textContent = formatted;

  // Checkout modal displays
  const checkoutBalEl = document.getElementById('checkoutWalletBalanceVal');
  if (checkoutBalEl) checkoutBalEl.textContent = formatted;

  renderBuyerWalletLedger();
  refreshCheckoutPayNowCoverage();
}

function renderBuyerWalletLedger() {
  const container = document.getElementById('buyerWalletLedgerContainer');
  if (!container) return;

  const ledger = getBuyerWalletLedger();
  if (ledger.length === 0) {
    container.innerHTML = `
      <div style="background: var(--bg-subtle); border: 1px dashed var(--border-strong); border-radius: var(--radius-sm); padding: 1.25rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        No deposit or purchase activity recorded yet.
      </div>
    `;
    return;
  }

  container.innerHTML = ledger.slice(0, 6).map(tx => {
    const isDeposit = tx.type === 'deposit';
    return `
      <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1rem; margin-bottom: 0.65rem; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <div style="width: 34px; height: 34px; border-radius: 8px; background: ${isDeposit ? '#dcfce7' : '#eff6ff'}; color: ${isDeposit ? '#15803d' : '#1d4ed8'}; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; flex-shrink: 0;">
            ${isDeposit ? '📥' : '🛒'}
          </div>
          <div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">${tx.desc || (isDeposit ? 'Deposit Funds' : 'Pay Now Purchase')}</div>
            <div style="font-size: 0.725rem; color: var(--text-muted);">${tx.date} • ${tx.method} ${tx.id ? `• ${tx.id}` : ''}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <strong style="font-size: 0.95rem; color: ${isDeposit ? '#15803d' : '#1e293b'}; font-weight: 800;">
            ${isDeposit ? '+' : '-'}₱${Number(tx.amount || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </strong>
          <span style="display: block; font-size: 0.675rem; color: ${isDeposit ? '#166534' : '#64748b'}; font-weight: 700;">
            ${tx.status || (isDeposit ? 'Credited' : 'Settled')}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function openDepositModal(amountOrShortfall) {
  const user = window.AgriState.user;
  const page = window.location.pathname.split('/').pop() || 'profile.html';
  const search = window.location.search || '';
  const pageRef = page + search;

  if (!user) {
    showToast('Please log in or create an account to deposit purchase funds.');
    setTimeout(() => {
      window.location.href = `auth.html?redirect=${encodeURIComponent(pageRef)}`;
    }, 700);
    return;
  }

  const modal = document.getElementById('depositFundsModal');
  if (!modal) return;

  const amountInput = document.getElementById('depositAmountInput');
  const alertEl = document.getElementById('depositCheckoutAlert');
  const alertTextEl = document.getElementById('depositCheckoutAlertText');

  if (amountOrShortfall && Number(amountOrShortfall) > 0) {
    const num = Math.ceil(Number(amountOrShortfall));
    if (amountInput) amountInput.value = num;
    if (alertEl && alertTextEl) {
      alertEl.style.display = 'flex';
      alertTextEl.innerHTML = `Your current order requires a deposit of at least <strong>₱${num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> to complete checkout with <strong>Pay Now</strong>.`;
    }
  } else {
    if (amountInput && !amountInput.value) amountInput.value = '1000';
    if (alertEl) alertEl.style.display = 'none';
  }

  modal.classList.add('open');
  lockBodyScroll();
}

function openDepositModalForCheckoutShortfall() {
  const subtotal = window.AgriState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const delivery = 95;
  const total = subtotal + delivery;
  const curBal = getBuyerBalance();
  const shortfall = Math.max(0, total - curBal);
  openDepositModal(shortfall);
}

function closeDepositModal() {
  const modal = document.getElementById('depositFundsModal');
  if (modal) modal.classList.remove('open');
  const alertEl = document.getElementById('depositCheckoutAlert');
  if (alertEl) alertEl.style.display = 'none';
  unlockBodyScroll();
}

function setDepositAmountPreset(val) {
  const input = document.getElementById('depositAmountInput');
  if (input) input.value = val;
}

function handleDepositSubmit(e) {
  if (e) e.preventDefault();
  const amountInput = document.getElementById('depositAmountInput');
  const methodSelect = document.getElementById('depositMethodSelect');
  const refInput = document.getElementById('depositReferenceInput');

  const amount = Number(amountInput?.value) || 0;
  if (amount < 50) {
    showToast('Minimum deposit amount is ₱50.00');
    return;
  }

  const method = methodSelect?.value || 'GCash (Instant Top-Up)';
  const ref = refInput?.value?.trim() || '';

  const newBal = depositBuyerFunds(amount, method, ref);
  closeDepositModal();

  showToast(`✓ Successfully deposited ₱${amount.toLocaleString()} via ${method}! New Balance: ₱${newBal.toLocaleString()}`);

  refreshCheckoutPayNowCoverage();
}

function refreshCheckoutPayNowCoverage() {
  const subtotal = window.AgriState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const delivery = 95;
  const total = subtotal + delivery;
  const bal = getBuyerBalance();

  const balDisplay = document.getElementById('checkoutWalletBalanceVal');
  if (balDisplay) balDisplay.textContent = `₱${bal.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const coverageStatus = document.getElementById('checkoutBalanceCoverageStatus');
  const prompt = document.getElementById('checkoutDepositRequiredPrompt');
  const shortfallSpan = document.getElementById('checkoutShortfallAmount');
  const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');

  const selectedMethod = document.querySelector('#checkoutForm input[name="paymentMethod"]:checked')?.value || 'Pay Now (AgriConnect Balance)';

  if (selectedMethod.includes('Pay Now') || selectedMethod.includes('AgriConnect Balance')) {
    if (bal >= total) {
      if (coverageStatus) {
        coverageStatus.style.display = 'block';
        coverageStatus.style.color = '#15803d';
        coverageStatus.innerHTML = `✓ Sufficient Balance • Remaining balance after payment: <strong>₱${(bal - total).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>`;
      }
      if (prompt) prompt.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `💳 Pay Now & Schedule Morning Dispatch (₱${total.toLocaleString()})`;
      }
    } else {
      const shortfall = total - bal;
      if (coverageStatus) coverageStatus.style.display = 'none';
      if (prompt) {
        prompt.style.display = 'block';
        if (shortfallSpan) shortfallSpan.textContent = `₱${shortfall.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Deposit Required to Complete Pay Now (Short by ₱${shortfall.toLocaleString()})`;
      }
    }
  } else {
    if (prompt) prompt.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm Order & Schedule Farm Dispatch';
    }
  }
}

function handlePaymentMethodChange(val) {
  const walletPanel = document.getElementById('checkoutWalletBalancePanel');
  const payNowLabel = document.getElementById('paymentOptionPayNow');

  if (val.includes('Pay Now') || val.includes('AgriConnect Balance')) {
    if (walletPanel) walletPanel.style.display = 'block';
    if (payNowLabel) {
      payNowLabel.style.borderColor = 'var(--primary)';
      payNowLabel.style.background = '#f0fdf4';
    }
    refreshCheckoutPayNowCoverage();
  } else {
    if (walletPanel) walletPanel.style.display = 'none';
    if (payNowLabel) {
      payNowLabel.style.borderColor = 'var(--border-strong)';
      payNowLabel.style.background = '#ffffff';
    }
    const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm Order & Schedule Farm Dispatch';
    }
  }
}

// Global window bindings for wallet modal & Pay Now interactions
window.getBuyerBalance = getBuyerBalance;
window.setBuyerBalance = setBuyerBalance;
window.depositBuyerFunds = depositBuyerFunds;
window.deductBuyerBalance = deductBuyerBalance;
window.openDepositModal = openDepositModal;
window.closeDepositModal = closeDepositModal;
window.setDepositAmountPreset = setDepositAmountPreset;
window.handleDepositSubmit = handleDepositSubmit;
window.openDepositModalForCheckoutShortfall = openDepositModalForCheckoutShortfall;
window.refreshCheckoutPayNowCoverage = refreshCheckoutPayNowCoverage;
window.handlePaymentMethodChange = handlePaymentMethodChange;
window.updateAllWalletDisplays = updateAllWalletDisplays;


function initProfilePage() {
  const user = window.AgriState.user;
  const guestContainer = document.getElementById('profileGuestContainer');
  const authContainer = document.getElementById('profileAuthenticatedContainer');
  const topActions = document.getElementById('profileTopActions');

  if (!user) {
    if (guestContainer) guestContainer.style.display = 'block';
    if (authContainer) authContainer.style.display = 'none';
    if (topActions) topActions.style.display = 'none';

    const heading = document.getElementById('profilePageHeading');
    const subheading = document.getElementById('profilePageSubheading');
    if (heading) heading.textContent = 'Account Profile';
    if (subheading) subheading.textContent = 'You are currently browsing as a guest. Please log in or create an account to view and manage your profile.';

    const dashBreadcrumb = document.getElementById('profileBreadcrumbDashboard');
    if (dashBreadcrumb) {
      dashBreadcrumb.textContent = 'Marketplace';
      dashBreadcrumb.href = 'marketplace.html';
    }
    return;
  }

  if (guestContainer) guestContainer.style.display = 'none';
  if (authContainer) authContainer.style.display = 'block';
  if (topActions) topActions.style.display = 'flex';

  const isFarmer = user.role === 'farmer';

  // Populate Header info
  const nameEl = document.getElementById('profileName') || document.getElementById('profileModalName');
  const farmEl = document.getElementById('profileFarm') || document.getElementById('profileModalFarm');
  const avatarEl = document.getElementById('profileAvatar') || document.getElementById('profileModalAvatar');

  if (nameEl) nameEl.textContent = user.full_name || (isFarmer ? 'Verified Farmer' : 'Verified Buyer');
  if (farmEl) {
    farmEl.textContent = isFarmer
      ? `${user.farm_name || 'AgriConnect Family Farm'} • ${user.cooperative || 'Benguet Farmers Multi-Purpose Cooperative'}`
      : `${user.shipping_city || user.province || 'Luzon'} Delivery Hub • Registered AgriConnect Direct Farmgate Buyer`;
  }
  if (avatarEl && user.avatar) avatarEl.src = user.avatar;

  // Header badges & role indicator on profile page
  const idBadge = document.getElementById('profileModalIdBadge');
  if (idBadge) {
    idBadge.textContent = isFarmer
      ? (user.id && user.id.startsWith('farmer-') ? `ID: ${user.id.toUpperCase()}` : 'ID: PH-AGRI-8842')
      : (user.id ? `ID: ${user.id.toUpperCase()}` : 'ID: BUYER-NCR-4820');
  }

  // Hero section badges & titles
  const dashBreadcrumb = document.getElementById('profileBreadcrumbDashboard');
  if (dashBreadcrumb) {
    dashBreadcrumb.textContent = isFarmer ? 'Producer Dashboard' : 'Marketplace';
    dashBreadcrumb.href = isFarmer ? 'dashboard.html' : 'marketplace.html';
  }

  const pageHeading = document.getElementById('profilePageHeading');
  if (pageHeading) {
    pageHeading.textContent = isFarmer
      ? 'Producer Profile & Farm Verification'
      : 'Buyer Profile & Account Details';
  }

  const pageSubheading = document.getElementById('profilePageSubheading');
  if (pageSubheading) {
    pageSubheading.textContent = isFarmer
      ? 'Complete farm identity, Department of Agriculture accreditation, geo-tagging, and direct payment channels.'
      : 'Manage your destination delivery address, recipient contacts, product shipment preferences, and purchase history.';
  }

  // Top action buttons: Hide farmer-only actions for buyer
  const dashBtn = document.getElementById('profileDashboardActionBtn');
  if (dashBtn) {
    dashBtn.style.display = isFarmer ? 'inline-flex' : 'none';
  }

  const actionBtn = document.getElementById('profileActionBtn');
  if (actionBtn) {
    if (isFarmer) {
      actionBtn.style.display = 'inline-flex';
      actionBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Sell Harvest
      `;
      actionBtn.href = 'sell-harvest.html';
    } else {
      actionBtn.style.display = 'none';
    }
  }

  const roleBadge = document.getElementById('profileRoleBadge');
  if (roleBadge) {
    roleBadge.textContent = isFarmer ? 'VERIFIED PRODUCER' : 'VERIFIED BUYER';
  }

  const partnerBadge = document.getElementById('profilePartnerBadge');
  if (partnerBadge) {
    partnerBadge.textContent = isFarmer ? '✓ Accredited Farmgate Partner' : '✓ Direct Farmgate Sourcing';
  }

  const feeBadge = document.getElementById('profileFeeBadge');
  if (feeBadge) {
    feeBadge.textContent = isFarmer ? '0% Middleman Deduction' : '0% Intermediary Markup';
  }

  const ribbonTierLabel = document.getElementById('profileRibbonTierLabel');
  if (ribbonTierLabel) {
    ribbonTierLabel.textContent = isFarmer ? 'PRODUCER ROLE & TIER' : 'BUYER ACCOUNT & TIER';
  }

  const ribbonTierSub = document.getElementById('profileRibbonTierSub');
  if (ribbonTierSub) {
    ribbonTierSub.textContent = isFarmer ? 'Accredited Supplier' : 'Direct Farmgate Sourcing';
  }

  // Card 1: Personal & Contact Information
  const card1Title = document.getElementById('profileCard1Title');
  if (card1Title) card1Title.textContent = isFarmer ? "Farmer's Personal & Contact Information" : "Buyer's Personal & Contact Information";

  const card1Subtitle = document.getElementById('profileCard1Subtitle');
  if (card1Subtitle) card1Subtitle.textContent = isFarmer ? "Verified producer credentials registered on AgriConnect" : "Verified consumer credentials registered on AgriConnect";

  // Hide farmer-specific fields in Card 1 for buyers
  const coopWrap = document.getElementById('profileInfoCoopWrapper');
  if (coopWrap) coopWrap.style.display = isFarmer ? 'block' : 'none';

  const expWrap = document.getElementById('profileInfoExpWrapper');
  if (expWrap) expWrap.style.display = isFarmer ? 'block' : 'none';

  const statusEl = document.getElementById('profileInfoStatus');
  if (statusEl) {
    statusEl.innerHTML = `<span style="width: 8px; height: 8px; border-radius: 50%; background: #16a34a;"></span> ${isFarmer ? 'Active Farmgate Supplier' : 'Active Direct Buyer'}`;
  }

  // Card 2: Location & Hub
  const card2Title = document.getElementById('profileCard2Title');
  if (card2Title) card2Title.textContent = isFarmer ? "Exact Farm Location & Geo-Tag" : "Delivery Logistics & Destination Address";

  const card2Subtitle = document.getElementById('profileCard2Subtitle');
  if (card2Subtitle) card2Subtitle.textContent = isFarmer ? "Coordinates and cold-chain consolidation hub for pickups" : "Delivery coordinates and assigned regional logistics hub";

  const card2AddrLabel = document.getElementById('profileCard2AddrLabel');
  if (card2AddrLabel) card2AddrLabel.textContent = isFarmer ? "Registered Farm Address" : "Registered Destination Address";

  const card2CoordsLabel = document.getElementById('profileCard2CoordsLabel');
  if (card2CoordsLabel) card2CoordsLabel.textContent = isFarmer ? "GPS Coordinates" : "Delivery GPS Coordinates";

  // Hide farm area and elevation for buyers
  const areaWrap = document.getElementById('profileCard2AreaWrap');
  if (areaWrap) areaWrap.style.display = isFarmer ? 'block' : 'none';

  const elevWrap = document.getElementById('profileCard2ElevWrap');
  if (elevWrap) elevWrap.style.display = isFarmer ? 'block' : 'none';

  const card2HubLabel = document.getElementById('profileCard2HubLabel');
  if (card2HubLabel) card2HubLabel.textContent = isFarmer ? "Cold-Chain Consolidation Hub" : "Assigned Logistics Consolidation Depot";

  // Card 3: Specializations & Protocols
  const card3Title = document.getElementById('profileCard3Title');
  if (card3Title) card3Title.textContent = isFarmer ? "Harvest Specializations & Quality Protocols" : "Fresh Produce Preferences & Direct Assurance";

  const card3Subtitle = document.getElementById('profileCard3Subtitle');
  if (card3Subtitle) card3Subtitle.textContent = isFarmer ? "Primary crops cultivated and farm-to-table assurance" : "Preferred fresh harvest varieties and cold-chain handling assurance";

  const card3BadgesLabel = document.getElementById('profileCard3BadgesLabel');
  if (card3BadgesLabel) card3BadgesLabel.textContent = isFarmer ? "Primary Harvest Specializations" : "Preferred Fresh Harvest Selections";

  const card3Guarantee = document.getElementById('profileCard3Guarantee');
  if (card3Guarantee) {
    card3Guarantee.innerHTML = isFarmer
      ? `<strong style="color: var(--primary-deep); display: block; margin-bottom: 0.35rem;">✓ Direct Farmgate Guarantee:</strong> No middleman markup. 100% of the product price set by the farmer is delivered straight to the farmer's electronic wallet. All crops undergo verified pre-cooling and clean packaging.`
      : `<strong style="color: var(--primary-deep); display: block; margin-bottom: 0.35rem;">✓ Farm-to-Door Cold Chain Guarantee:</strong> Guaranteed zero middleman markup. Harvested fresh at dawn by verified highland and lowland farmers, pre-cooled, and dispatched directly to your destination address with complete temperature monitoring.`;
  }

  // Card 4: Switch Requirements (Farmer) vs Product Shipment Details (Buyer)
  const reqSection = document.getElementById('profileRequirementsSection');
  const shipmentSection = document.getElementById('buyerShipmentSection');
  const farmerEWalletsSec = document.getElementById('farmerEWalletsSection');
  const buyerWalletSec = document.getElementById('buyerWalletSection');
  const buyerPurchasesSec = document.getElementById('buyerPurchasesSection');

  if (isFarmer) {
    if (reqSection) reqSection.style.display = 'block';
    if (shipmentSection) shipmentSection.style.display = 'none';
    if (farmerEWalletsSec) farmerEWalletsSec.style.display = 'block';
    if (buyerWalletSec) buyerWalletSec.style.display = 'none';
    if (buyerPurchasesSec) buyerPurchasesSec.style.display = 'none';
    renderFarmerRequirements();
    renderFarmerEWallets();
  } else {
    if (reqSection) reqSection.style.display = 'none';
    if (shipmentSection) shipmentSection.style.display = 'block';
    if (farmerEWalletsSec) farmerEWalletsSec.style.display = 'none';
    if (buyerWalletSec) buyerWalletSec.style.display = 'block';
    if (buyerPurchasesSec) buyerPurchasesSec.style.display = 'block';

    // Populate Buyer Product Shipment Details
    const shipRecipient = document.getElementById('shipmentRecipientName');
    if (shipRecipient) shipRecipient.textContent = user.full_name || 'Krystel Comia';

    const shipPhone = document.getElementById('shipmentPhone');
    if (shipPhone) shipPhone.textContent = user.phone || '09271836734';

    const shipAltPhone = document.getElementById('shipmentAltPhone');
    if (shipAltPhone) shipAltPhone.textContent = user.alt_phone || '0920-551-8930';

    const shipEmail = document.getElementById('shipmentEmail');
    if (shipEmail) shipEmail.textContent = user.email || 'comiakrystel65@gmail.com';

    const shipAddress = document.getElementById('shipmentAddress');
    if (shipAddress) {
      shipAddress.textContent = user.shipping_address || user.address || 'Unit 802, Pioneer Woodlands, EDSA cor. Pioneer St., Barangay Ilaya, Mandaluyong City, Metro Manila, 1550';
    }

    const shipLandmark = document.getElementById('shipmentLandmark');
    if (shipLandmark) {
      shipLandmark.textContent = user.delivery_landmark || 'Near Boni MRT Station. If recipient is unavailable, please leave package with 24/7 lobby concierge or building guard.';
    }

    const shipSchedule = document.getElementById('shipmentSchedule');
    if (shipSchedule) {
      shipSchedule.textContent = user.delivery_schedule || 'Morning Batch (8:00 AM – 12:00 PM) • Cold-Chain Delivery';
    }

    const shipHub = document.getElementById('shipmentHub');
    if (shipHub) {
      shipHub.textContent = user.shipping_logistics || 'Cold-Chain Refrigerated Van Delivery (Direct Farmgate Dispatch)';
    }

    const shipPayment = document.getElementById('shipmentPaymentPref');
    if (shipPayment) {
      shipPayment.textContent = user.payment_preference || 'AgriConnect Balance (Pay Now) or Direct GCash / COD';
    }

    updateAllWalletDisplays();
    renderBuyerPurchases();
  }

  // Populate ribbon metrics
  const orders = typeof getBuyerOrders === 'function' ? getBuyerOrders() : [];
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status_code !== 'past');
  const pastOrders = orders.filter(o => o.status === 'Delivered' || o.status_code === 'past');
  const totalSpent = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const ribbonLabel1 = document.getElementById('profileRibbonLabel1');
  const ribbonVal1 = document.getElementById('profileInfoRating');
  const ribbonSub1 = document.getElementById('profileRibbonSub1');
  if (ribbonLabel1) ribbonLabel1.textContent = isFarmer ? 'Customer Trust Rating' : 'Total Direct Spending';
  if (ribbonVal1) ribbonVal1.textContent = isFarmer ? (user.rating || '★ 4.9 / 5.0') : `₱${totalSpent.toLocaleString()}`;
  if (ribbonSub1) ribbonSub1.textContent = isFarmer ? '(148 verified buyers)' : 'Direct Farmgate Purchases';

  const ribbonLabel2 = document.getElementById('profileRibbonLabel2');
  const ribbonVal2 = document.getElementById('profileInfoFulfillment');
  const ribbonSub2 = document.getElementById('profileRibbonSub2');
  if (ribbonLabel2) ribbonLabel2.textContent = isFarmer ? 'Fulfillment Success' : 'Purchases Placed';
  if (ribbonVal2) ribbonVal2.textContent = isFarmer ? (user.fulfillment || '100% On-Time') : `${orders.length} Orders Placed`;
  if (ribbonSub2) ribbonSub2.textContent = isFarmer ? '(14/14 batches completed)' : `${activeOrders.length} Active • ${pastOrders.length} Delivered`;

  const ribbonLabel3 = document.getElementById('profileRibbonLabel3');
  const ribbonVal3 = document.getElementById('profileInfoCompliance');
  const ribbonSub3 = document.getElementById('profileRibbonSub3');
  if (ribbonLabel3) ribbonLabel3.textContent = isFarmer ? 'Cold-Chain Compliance' : 'Cold-Chain Assurance';
  if (ribbonVal3) ribbonVal3.textContent = isFarmer ? (user.compliance || 'Grade A+') : '100% Fresh Arrival';
  if (ribbonSub3) ribbonSub3.textContent = isFarmer ? '(<4 hrs harvest-to-cooler)' : 'Verified Direct Sourcing';

  const ribbonLabel4 = document.getElementById('profileRibbonTierLabel');
  const ribbonVal4 = document.getElementById('profileInfoTier');
  const ribbonSub4 = document.getElementById('profileRibbonTierSub');
  if (ribbonLabel4) ribbonLabel4.textContent = isFarmer ? 'Producer Role & Tier' : 'Buyer Purchase Balance';
  if (ribbonVal4) ribbonVal4.textContent = isFarmer ? (user.role_tier || 'Tier-1 Direct Farmgate') : `₱${getBuyerBalance().toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (ribbonSub4) ribbonSub4.textContent = isFarmer ? 'Accredited Supplier' : 'Pre-funded • Pay Now Active';

  // Populate View details
  const defaultAddress = user.shipping_address || user.address || (isFarmer
    ? 'Sitio Pungayan, Barangay Cabanao, La Trinidad, Benguet, Cordillera Administrative Region (CAR), 2601'
    : 'Unit 802, Pioneer Woodlands, EDSA cor. Pioneer St., Barangay Ilaya, Mandaluyong City, Metro Manila, 1550');

  const fields = isFarmer ? [
    ['profileInfoFullName', user.full_name || 'Verified Farmer'],
    ['profileInfoPhone', user.phone || '—'],
    ['profileInfoEmail', user.email || '—'],
    ['profileInfoAltPhone', user.alt_phone || '—'],
    ['profileInfoCoop', user.cooperative || 'AgriConnect Producers Network'],
    ['profileInfoExperience', user.experience || 'Direct Farm Producer'],
    ['profileInfoAddress', defaultAddress],
    ['profileInfoCoords', user.coords || 'Coordinates on file'],
    ['profileInfoArea', user.area || 'Direct Farm Parcel'],
    ['profileInfoElevation', user.elevation || '—'],
    ['profileInfoHub', user.hub || 'Regional Agri-Hub Depot'],
    ['profileInfoSpecialization', user.crops || user.specialty || 'Highland & Farmgate Crops']
  ] : [
    ['profileInfoFullName', user.full_name || 'Verified Direct Buyer'],
    ['profileInfoPhone', user.phone || '—'],
    ['profileInfoEmail', user.email || '—'],
    ['profileInfoAltPhone', user.alt_phone || '—'],
    ['profileInfoCoop', user.cooperative || 'AgriConnect Direct Consumer Sourcing'],
    ['profileInfoExperience', user.experience || 'Consumer Account • Direct Farmgate Buyer'],
    ['profileInfoAddress', defaultAddress],
    ['profileInfoCoords', user.coords || 'Delivery Zone Verified'],
    ['profileInfoArea', user.area || 'Residential Delivery Zone'],
    ['profileInfoElevation', user.elevation || '—'],
    ['profileInfoHub', user.hub || 'Direct Logistics Hub'],
    ['profileInfoSpecialization', user.crops || 'Fresh Farm Products']
  ];

  fields.forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
}

function renderBuyerPurchases() {
  const container = document.getElementById('buyerPurchasesSection');
  if (!container) return;

  const orders = typeof getBuyerOrders === 'function' ? getBuyerOrders() : [];
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status_code !== 'past');
  const pastOrders = orders.filter(o => o.status === 'Delivered' || o.status_code === 'past');
  const totalSpent = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  // Update total spending counters
  const totalSpentEl = document.getElementById('buyerTotalSpent');
  if (totalSpentEl) totalSpentEl.textContent = `₱${totalSpent.toLocaleString()}`;

  const activeCountEl = document.getElementById('buyerActiveCount');
  if (activeCountEl) activeCountEl.textContent = `${activeOrders.length} Order${activeOrders.length === 1 ? '' : 's'} Active`;

  const pastCountEl = document.getElementById('buyerPastCount');
  if (pastCountEl) pastCountEl.textContent = `${pastOrders.length} Order${pastOrders.length === 1 ? '' : 's'} Delivered`;

  // Render Active Purchases
  const activeContainer = document.getElementById('buyerActivePurchasesList');
  if (activeContainer) {
    if (activeOrders.length === 0) {
      activeContainer.innerHTML = `
        <div style="background: var(--bg-subtle); border: 1px dashed var(--border-strong); border-radius: var(--radius-sm); padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No active shipments currently in transit. Explore fresh harvests in the marketplace!
          <div style="margin-top: 0.5rem;">
            <a href="marketplace.html" class="btn-primary" style="font-size: 0.8rem; padding: 0.4rem 1rem; display: inline-flex;">Shop Farmgate Produce</a>
          </div>
        </div>
      `;
    } else {
      activeContainer.innerHTML = activeOrders.map(order => `
        <div style="background: #ffffff; border: 1.5px solid #86efac; border-radius: var(--radius-sm); padding: 1.15rem; margin-bottom: 0.85rem; box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.65rem; margin-bottom: 0.75rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <strong style="color: var(--primary-deep); font-family: monospace; font-size: 0.95rem;">${order.id}</strong>
                <span style="background: #eff6ff; color: #1d4ed8; font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.55rem; border-radius: 9999px; border: 1px solid #bfdbfe;">
                  ● ${order.status || 'In Transit'}
                </span>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.15rem;">Placed on ${order.date || 'Recent Order'} • Cold-Chain Refrigerated Van</span>
            </div>
            <div style="text-align: right;">
              <strong style="color: var(--text-main); font-size: 1rem;">₱${(order.total || 0).toLocaleString()}</strong>
              <span style="font-size: 0.725rem; color: var(--text-muted); display: block;">${order.paymentMethod || 'COD / Scan QR'}</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem;">
            ${(order.items || []).map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.825rem;">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <img src="${item.image_url || 'assets/logo.png'}" alt="${item.name}" style="width: 32px; height: 32px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-subtle);" onerror="this.src='assets/logo.png'">
                  <div>
                    <span style="font-weight: 700; color: var(--text-main);">${item.name}</span>
                    <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">${item.quantity} ${item.unit || 'kg'} • ${item.farmer_name || 'Direct Farm Partner'}</span>
                  </div>
                </div>
                <span style="font-weight: 700; color: var(--text-main);">₱${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; background: #f0fdf4; border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; font-size: 0.775rem; color: #166534; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <strong>📍 Destination:</strong> ${order.destination || order.address || 'Delivery Address'}
            </div>
            <a href="track-orders.html" class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.65rem; background: #ffffff; color: var(--primary);">
              Track Delivery →
            </a>
          </div>
        </div>
      `).join('');
    }
  }

  // Render Purchase History (Past Completed Orders)
  const pastContainer = document.getElementById('buyerPurchaseHistoryList');
  if (pastContainer) {
    if (pastOrders.length === 0) {
      pastContainer.innerHTML = `
        <div style="background: var(--bg-subtle); border: 1px dashed var(--border-strong); border-radius: var(--radius-sm); padding: 1.25rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No completed purchases yet.
        </div>
      `;
    } else {
      pastContainer.innerHTML = pastOrders.map(order => `
        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 0.75rem; transition: border-color 0.2s;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <strong style="color: var(--text-main); font-family: monospace; font-size: 0.9rem;">${order.id}</strong>
                <span style="background: #dcfce7; color: #15803d; font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px;">
                  ✓ Delivered
                </span>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.15rem;">
                ${order.deliveredDate ? `Delivered on ${order.deliveredDate}` : `Completed ${order.date}`}
              </span>
            </div>
            <div style="text-align: right;">
              <strong style="color: var(--primary-deep); font-size: 0.95rem;">₱${(order.total || 0).toLocaleString()}</strong>
              <span style="font-size: 0.7rem; color: var(--text-muted); display: block;">${order.paymentMethod || 'Paid Direct'}</span>
            </div>
          </div>

          <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; border-top: 1px dashed var(--border-subtle); padding-top: 0.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <strong>Items:</strong> ${(order.items || []).map(i => `${i.name} (${i.quantity} ${i.unit || 'kg'})`).join(', ')}
            </div>
            <span style="font-size: 0.725rem; color: #15803d; font-weight: 700;">
              From: ${order.origin || 'Benguet & Bukidnon Farm Partners'}
            </span>
          </div>
        </div>
      `).join('');
    }
  }
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
    const user = window.AgriState.user;
    if (!user) {
      showToast('Please log in or create an account to edit profile details.');
      const pageRef = (window.location.pathname.split('/').pop() || 'profile.html') + (window.location.search || '');
      setTimeout(() => {
        window.location.href = `auth.html?redirect=${encodeURIComponent(pageRef)}`;
      }, 700);
      return;
    }
    const isFarmer = user.role === 'farmer';

    // Update modal title and subtitle
    const editModalTitle = document.getElementById('editProfileModalTitle');
    const editModalSub = document.getElementById('editProfileModalSubtitle');
    if (editModalTitle) {
      editModalTitle.textContent = isFarmer ? 'Edit Profile & Farm Specifications' : 'Edit Profile & Product Shipment Details';
    }
    if (editModalSub) {
      editModalSub.textContent = isFarmer
        ? 'Update your grower details, farm address, GPS coordinates, and crop specialties.'
        : 'Update your recipient contact info, delivery address, drop-off instructions, and schedule.';
    }

    // Toggle role-specific field wrappers
    const farmerFields = document.getElementById('farmerEditSpecificFields');
    const buyerFields = document.getElementById('buyerEditSpecificFields');
    if (farmerFields) farmerFields.style.display = isFarmer ? 'contents' : 'none';
    if (buyerFields) buyerFields.style.display = isFarmer ? 'none' : 'contents';

    const fnInput = document.getElementById('editProfileFullName');
    const phoneInput = document.getElementById('editProfilePhone');
    const emailInput = document.getElementById('editProfileEmail');
    const altPhoneInput = document.getElementById('editProfileAltPhone');

    if (fnInput) fnInput.value = user.full_name || '';
    if (phoneInput) phoneInput.value = user.phone || '';
    if (emailInput) emailInput.value = user.email || '';
    if (altPhoneInput) altPhoneInput.value = user.alt_phone || '';

    if (isFarmer) {
      const farmInput = document.getElementById('editProfileFarmName');
      const coopInput = document.getElementById('editProfileCoop');
      const addrInput = document.getElementById('editProfileAddress');
      const coordsInput = document.getElementById('editProfileCoords');
      const elevInput = document.getElementById('editProfileElevation');
      const expInput = document.getElementById('editProfileExperience');
      const hubInput = document.getElementById('editProfileHub');
      const specInput = document.getElementById('editProfileSpecialization');

      if (farmInput) farmInput.value = user.farm_name || '';
      if (coopInput) coopInput.value = user.cooperative || '';
      if (addrInput) addrInput.value = user.address || '';
      if (coordsInput) coordsInput.value = user.coords || '';
      if (elevInput) elevInput.value = user.elevation || '';
      if (expInput) expInput.value = user.experience || '';
      if (hubInput) hubInput.value = user.hub || '';
      if (specInput) specInput.value = user.crops || user.specialty || '';
    } else {
      const buyerAddrInput = document.getElementById('editBuyerShipmentAddress');
      const buyerCityInput = document.getElementById('editBuyerCity');
      const buyerProvInput = document.getElementById('editBuyerProvince');
      const buyerZipInput = document.getElementById('editBuyerPostalCode');
      const buyerSchedInput = document.getElementById('editBuyerSchedule');
      const buyerLandmarkInput = document.getElementById('editBuyerLandmark');
      const buyerPayInput = document.getElementById('editBuyerPaymentPref');

      if (buyerAddrInput) buyerAddrInput.value = user.shipping_address || user.address || '';
      if (buyerCityInput) buyerCityInput.value = user.shipping_city || '';
      if (buyerProvInput) buyerProvInput.value = user.shipping_province || user.province || '';
      if (buyerZipInput) buyerZipInput.value = user.shipping_postal || '';
      if (buyerSchedInput) buyerSchedInput.value = user.delivery_schedule || 'Morning Batch (8:00 AM – 12:00 PM) • Cold-Chain Delivery';
      if (buyerLandmarkInput) buyerLandmarkInput.value = user.delivery_landmark || '';
      if (buyerPayInput) buyerPayInput.value = user.payment_preference || 'Cash on Delivery (COD) or Direct GCash / Maya QR Scan';
    }

    editContainer.style.display = 'block';
    editContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    editContainer.style.display = 'none';
  }
}

function saveFarmerProfile(e) {
  if (e) e.preventDefault();

  const user = window.AgriState.user;
  if (!user) {
    showToast('Please log in or create an account to save profile changes.');
    return;
  }
  const isFarmer = user.role === 'farmer';

  const fn = document.getElementById('editProfileFullName')?.value.trim();
  const phone = document.getElementById('editProfilePhone')?.value.trim();
  const email = document.getElementById('editProfileEmail')?.value.trim();
  const altPhone = document.getElementById('editProfileAltPhone')?.value.trim();

  if (fn) user.full_name = fn;
  if (phone) user.phone = phone;
  if (email) user.email = email;
  if (altPhone) user.alt_phone = altPhone;

  if (isFarmer) {
    const farm = document.getElementById('editProfileFarmName')?.value.trim();
    const coop = document.getElementById('editProfileCoop')?.value.trim();
    const addr = document.getElementById('editProfileAddress')?.value.trim();
    const coords = document.getElementById('editProfileCoords')?.value.trim();
    const elev = document.getElementById('editProfileElevation')?.value.trim();
    const exp = document.getElementById('editProfileExperience')?.value.trim();
    const hub = document.getElementById('editProfileHub')?.value.trim();
    const spec = document.getElementById('editProfileSpecialization')?.value.trim();

    if (farm) user.farm_name = farm;
    if (coop) user.cooperative = coop;
    if (addr) user.address = addr;
    if (coords) user.coords = coords;
    if (elev) user.elevation = elev;
    if (exp) user.experience = exp;
    if (hub) user.hub = hub;
    if (spec) user.crops = spec;
  } else {
    const buyerAddr = document.getElementById('editBuyerShipmentAddress')?.value.trim();
    const buyerCity = document.getElementById('editBuyerCity')?.value.trim();
    const buyerProv = document.getElementById('editBuyerProvince')?.value.trim();
    const buyerZip = document.getElementById('editBuyerPostalCode')?.value.trim();
    const buyerSched = document.getElementById('editBuyerSchedule')?.value;
    const buyerLandmark = document.getElementById('editBuyerLandmark')?.value.trim();
    const buyerPay = document.getElementById('editBuyerPaymentPref')?.value;

    if (buyerCity) user.shipping_city = buyerCity;
    if (buyerProv) {
      user.shipping_province = buyerProv;
      user.province = buyerProv;
    }
    if (buyerZip) user.shipping_postal = buyerZip;
    if (buyerSched) user.delivery_schedule = buyerSched;
    if (buyerLandmark) user.delivery_landmark = buyerLandmark;
    if (buyerPay) user.payment_preference = buyerPay;

    if (buyerAddr) {
      const fullAddr = [buyerAddr, buyerCity, buyerProv, buyerZip].filter(Boolean).join(', ');
      user.shipping_address = fullAddr;
      user.address = fullAddr;
    }
  }

  localStorage.setItem('agri_user', JSON.stringify(user));

  // Sync with registered users array in localStorage if applicable
  const registeredUsers = JSON.parse(localStorage.getItem('agri_users') || '[]');
  const userIdx = registeredUsers.findIndex(u => (u.id && u.id === user.id) || (u.email && u.email.toLowerCase() === (user.email || '').toLowerCase()));
  if (userIdx >= 0) {
    registeredUsers[userIdx] = { ...registeredUsers[userIdx], ...user };
    localStorage.setItem('agri_users', JSON.stringify(registeredUsers));
  }

  if (isFarmer) {
    try {
      const customFarmers = JSON.parse(localStorage.getItem('agri_custom_farmers') || '[]');
      const fIdx = customFarmers.findIndex(f => f.id === user.id);
      const coords = getProvinceCoordinates(user.province || user.city || 'Benguet');
      const updatedEntry = {
        id: user.id,
        full_name: user.full_name,
        farm_name: user.farm_name || `${user.full_name}'s Farm`,
        city: user.city || 'Local Municipality',
        province: user.province || 'Luzon',
        latitude: user.latitude || coords.lat,
        longitude: user.longitude || coords.lng,
        address: user.address || `${user.province || 'Luzon'}, Philippines`,
        bio: user.bio || `Direct agricultural producer partner on AgriConnect specializing in ${user.crops || user.specialty || 'fresh harvests'}.`,
        rating: user.rating || 5.0,
        reviewsCount: user.reviewsCount || 1,
        verified: true,
        phone: user.phone || '+63 900 000 0000',
        pickupHours: user.pickupHours || '7:00 AM – 5:00 PM (Daily)',
        specialty: user.crops || user.specialty || 'Direct Farm Harvests',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'
      };
      if (fIdx >= 0) {
        customFarmers[fIdx] = { ...customFarmers[fIdx], ...updatedEntry };
      } else {
        customFarmers.unshift(updatedEntry);
      }
      localStorage.setItem('agri_custom_farmers', JSON.stringify(customFarmers));
      window.AgriState.farmers = getStoredFarmers();
    } catch (e) {
      console.warn('Error updating custom farmer entry:', e);
    }
  }

  // Sync with Dashboard elements if present
  const welcomeFarmerName = document.getElementById('welcomeFarmerName');
  if (welcomeFarmerName) welcomeFarmerName.textContent = user.full_name;
  const welcomeFarmerFarm = document.getElementById('welcomeFarmerFarm');
  if (welcomeFarmerFarm) welcomeFarmerFarm.textContent = `${user.farm_name || 'Verified Farm'} • ${user.province || 'Philippines'}`;

  const farmerGreeting = document.getElementById('farmerGreeting');
  if (farmerGreeting) farmerGreeting.textContent = `Kumusta, ${user.full_name}!`;
  const farmerFarmDetails = document.getElementById('farmerFarmDetails');
  if (farmerFarmDetails) farmerFarmDetails.textContent = `${user.farm_name || 'Verified Farm'} • ${user.address ? user.address.split(',').slice(0, 3).join(',') : (user.province || 'Philippines')}`;

  // Update views
  initProfilePage();
  toggleEditFarmerProfile(false);
  updateAuthUI();

  showToast(isFarmer ? 'Profile and farm information updated successfully!' : 'Product shipment and profile details updated successfully!');
}

function handleProfileAvatarUpload(e) {
  if (!e.target.files || !e.target.files[0]) return;
  const user = window.AgriState.user;
  if (!user) {
    showToast('Please log in or create an account to update your profile photo.');
    return;
  }
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    user.avatar = dataUrl;
    localStorage.setItem('agri_user', JSON.stringify(user));

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
  if (wallets.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; background: #ffffff; border-radius: var(--radius-sm); padding: 2.25rem 1.5rem; border: 1.5px dashed var(--border-strong); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--bg-subtle); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--text-muted);">
          💳
        </div>
        <div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.25rem;">No Payout Channels Linked</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 440px; margin: 0 auto; line-height: 1.5;">
            Link your GCash, Maya, LandBank, or other bank account to receive direct payments and disbursements from buyers with 0% middleman fees.
          </p>
        </div>
        <button type="button" onclick="openAddEWalletModal()" class="btn-primary" style="margin-top: 0.5rem; font-size: 0.85rem; padding: 0.55rem 1.25rem; display: inline-flex; align-items: center; gap: 0.4rem;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Your First Bank / E-Wallet
        </button>
      </div>
    `;
    return;
  }

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
            ${w.is_primary ? `<span style="font-size: 0.7rem; background: #dcfce7; color: #166534; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px;">Primary</span>` : `<button type="button" onclick="deleteFarmerEWallet('${w.id}')" title="Remove Wallet" style="background: none; border: none; color: #ef4444; font-size: 0.9rem; cursor: pointer; padding: 0.2rem;">🗑</button>`}
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

  const user = window.AgriState.user;
  const nameInput = document.getElementById('newWalletAccountName');
  if (nameInput && user && user.full_name) {
    nameInput.value = user.full_name;
  }

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

  const user = window.AgriState.user;
  const defaultHolder = (user && user.full_name) ? user.full_name : 'Account Holder';
  const provider = providerSelect ? providerSelect.value : 'other';
  const accountName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : defaultHolder;
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
  const wallets = getStoredFarmerEWallets();
  const isFirst = wallets.length === 0;

  const newWallet = {
    id: `ew-${Date.now()}`,
    provider: provider,
    bank_name: bankName,
    badge_bg: badgeBg,
    badge_letter: badgeLetter,
    account_name: accountName,
    account_number: accountNumber,
    is_primary: isFirst,
    qr_code: qrCodeData
  };

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
let stagedCustomProductImage = null;

function handleProductImageFileChange(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    showToast('Image file too large. Please select an image under 10MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    stagedCustomProductImage = evt.target.result;

    const urlInput = document.getElementById('pageProductImageUrl');
    if (urlInput) urlInput.value = '';

    const resetBtn = document.getElementById('resetProductImageBtn');
    if (resetBtn) resetBtn.style.display = 'inline-block';

    const thumb = document.getElementById('formProductImgThumb');
    if (thumb) thumb.src = stagedCustomProductImage;

    const badge = document.getElementById('formProductImgBadge');
    if (badge) badge.textContent = 'Custom Photo';

    const previewImg = document.getElementById('previewProductImg');
    if (previewImg) previewImg.src = stagedCustomProductImage;

    showToast('Harvest photo uploaded and attached successfully!');
  };
  reader.readAsDataURL(file);
}

function handleProductImageUrlChange() {
  const urlInput = document.getElementById('pageProductImageUrl');
  const url = urlInput ? urlInput.value.trim() : '';

  const cropInput = document.getElementById('pageCropName') || document.getElementById('sellCropName');
  const catSelect = document.getElementById('pageCropCategory') || document.getElementById('sellCategory');
  const cropName = cropInput ? cropInput.value.trim() : '';
  const categoryVal = catSelect ? catSelect.value : 'cat-veg';

  const resetBtn = document.getElementById('resetProductImageBtn');
  const thumb = document.getElementById('formProductImgThumb');
  const badge = document.getElementById('formProductImgBadge');
  const previewImg = document.getElementById('previewProductImg');

  if (url) {
    stagedCustomProductImage = url;
    if (resetBtn) resetBtn.style.display = 'inline-block';
    if (thumb) thumb.src = url;
    if (badge) badge.textContent = 'URL Photo';
    if (previewImg) previewImg.src = url;
  } else {
    stagedCustomProductImage = null;
    if (resetBtn) resetBtn.style.display = 'none';
    const defaultUrl = getProductPhotoUrl(cropName, categoryVal);
    if (thumb) thumb.src = defaultUrl;
    if (badge) badge.textContent = 'Default Photo';
    if (previewImg) previewImg.src = defaultUrl;
  }
}

function resetToDefaultProductImage() {
  stagedCustomProductImage = null;
  const fileInput = document.getElementById('pageProductImageFile');
  if (fileInput) fileInput.value = '';
  const urlInput = document.getElementById('pageProductImageUrl');
  if (urlInput) urlInput.value = '';
  const resetBtn = document.getElementById('resetProductImageBtn');
  if (resetBtn) resetBtn.style.display = 'none';

  handleListingFormInput();
  showToast('Reset to automatic farmgate crop photo.');
}

function getProductPhotoUrl(cropName, categoryId) {
  const name = (cropName || '').toLowerCase();
  if (name.includes('strawberr') || name.includes('fresa')) {
    return 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=800';
  }
  if (name.includes('bean') || name.includes('habichuelas') || name.includes('baguio')) {
    return 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=800';
  }
  if (name.includes('cabbage') || name.includes('repolyo')) {
    return 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800';
  }
  if (name.includes('carrot')) {
    return 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800';
  }
  if (name.includes('lettuce') || name.includes('romaine') || name.includes('salad') || name.includes('greens') || name.includes('wombok')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800';
  }
  if (name.includes('rice') || name.includes('bigas') || name.includes('palay') || name.includes('dinorado') || name.includes('sinandomeng') || name.includes('grain')) {
    return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800';
  }
  if (name.includes('corn') || name.includes('mais')) {
    return 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800';
  }
  if (name.includes('egg') || name.includes('itlog')) {
    return 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800';
  }
  if (name.includes('chicken') || name.includes('manok') || name.includes('poultry')) {
    return 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800';
  }
  if (name.includes('mango') || name.includes('mangga')) {
    return 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800';
  }
  if (name.includes('banana') || name.includes('saging') || name.includes('lakatan')) {
    return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800';
  }
  if (name.includes('pineapple') || name.includes('pinya')) {
    return 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800';
  }
  if (name.includes('tomato') || name.includes('kamatis')) {
    return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800';
  }
  if (name.includes('eggplant') || name.includes('talong')) {
    return 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=800';
  }
  if (name.includes('pepper') || name.includes('sili')) {
    return 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800';
  }
  if (name.includes('bangus') || name.includes('milkfish')) {
    return 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800';
  }
  if (name.includes('tilapia')) {
    return 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800';
  }
  if (name.includes('fish') || name.includes('seafood') || name.includes('isda')) {
    return 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800';
  }
  if (name.includes('shrimp') || name.includes('suahe') || name.includes('hipon')) {
    return 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800';
  }
  if (name.includes('cassava') || name.includes('kamoteng kahoy')) {
    return 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800';
  }
  if (name.includes('camote') || name.includes('sweet potato')) {
    return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800';
  }
  if (name.includes('buko') || name.includes('coconut') || name.includes('niyog')) {
    return 'https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=800';
  }
  if (name.includes('vco') || name.includes('oil')) {
    return 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800';
  }
  if (name.includes('herb') || name.includes('spice') || name.includes('ginger') || name.includes('luya') || name.includes('garlic')) {
    return 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800';
  }

  // Category fallbacks
  switch (categoryId) {
    case 'cat-fruit':
      return 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800';
    case 'cat-rice':
      return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800';
    case 'cat-root':
      return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800';
    case 'cat-poultry':
      return 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800';
    case 'cat-fish':
      return 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800';
    case 'cat-coco':
      return 'https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=800';
    case 'cat-herb':
      return 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800';
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
      previewFarmer.textContent = user.farm_name || user.full_name || 'Your Farm / Producer';
    }
    const previewLoc = document.getElementById('previewFarmerLocation');
    if (previewLoc) {
      previewLoc.textContent = user.city || user.province || 'Local Hub';
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

  const activeImgSrc = stagedCustomProductImage || (document.getElementById('pageProductImageUrl')?.value?.trim()) || getProductPhotoUrl(cropName, categoryVal);
  if (previewImg) previewImg.src = activeImgSrc;

  const formThumb = document.getElementById('formProductImgThumb');
  if (formThumb) formThumb.src = activeImgSrc;

  const formBadge = document.getElementById('formProductImgBadge');
  if (formBadge) {
    formBadge.textContent = stagedCustomProductImage ? 'Custom Photo' : (document.getElementById('pageProductImageUrl')?.value?.trim() ? 'URL Photo' : 'Default Photo');
  }

  // Auto-adapt AI recommendations dynamically
  triggerAiPriceRecommendation(false);
}

function quickFillCrop(name, categoryVal, unit, price, qty, desc) {
  stagedCustomProductImage = null;
  const fileInput = document.getElementById('pageProductImageFile');
  if (fileInput) fileInput.value = '';
  const urlInput = document.getElementById('pageProductImageUrl');
  if (urlInput) urlInput.value = '';
  const resetBtn = document.getElementById('resetProductImageBtn');
  if (resetBtn) resetBtn.style.display = 'none';

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
  const harvestDate = dateInput && dateInput.value ? dateInput.value : new Date().toISOString().split('T')[0];
  const hubLocation = hubInput && hubInput.value.trim() ? hubInput.value.trim() : 'Km. 5 Agri-Hub Cold-Chain Facility, La Trinidad';
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
    image_url: stagedCustomProductImage || (document.getElementById('pageProductImageUrl')?.value?.trim()) || getProductPhotoUrl(cropName, categoryVal),
    farmer_name: (user && (user.farm_name || user.full_name)) || 'Local Farm Producer',
    farmer_id: (user && user.id) || ('farmer-' + Date.now()),
    farmer_user_id: user ? user.id : null,
    farmer_email: user ? (user.email || '') : '',
    city: (user && (user.city || user.province)) || 'Benguet',
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

  if (typeof refreshAdminData === 'function' && document.getElementById('adminMainView')) {
    refreshAdminData();
  }

  // Always show clear, prominent Toast notification
  showToast(`✓ Successfully added! "${newProd.name}" is now visible in your farm products and the marketplace.`);

  // Show Success Modal if on sell-harvest page
  const successModal = document.getElementById('harvestPublishSuccessModal');
  const successTitle = document.getElementById('successCropTitle');
  const successDetails = document.getElementById('successCropDetails');

  if (successModal) {
    if (successTitle) successTitle.textContent = `${newProd.name} Successfully Added!`;
    if (successDetails) {
      successDetails.innerHTML = `
        Your harvest batch of <strong>${newProd.quantity} ${newProd.unit}</strong> at <strong>₱${newProd.price.toLocaleString()}/${newProd.unit}</strong> has been successfully added to your farm listings and is now live on the marketplace where buyers can view and purchase it!
      `;
    }
    successModal.classList.add('open');
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

  stagedCustomProductImage = null;
  const fileInput = document.getElementById('pageProductImageFile');
  if (fileInput) fileInput.value = '';
  const urlInput = document.getElementById('pageProductImageUrl');
  if (urlInput) urlInput.value = '';
  const resetBtn = document.getElementById('resetProductImageBtn');
  if (resetBtn) resetBtn.style.display = 'none';

  const form = document.getElementById('sellHarvestPageForm');
  if (form) {
    form.reset();
    handleListingFormInput();
  }
}

function resetListingForm() {
  stagedCustomProductImage = null;
  const fileInput = document.getElementById('pageProductImageFile');
  if (fileInput) fileInput.value = '';
  const urlInput = document.getElementById('pageProductImageUrl');
  if (urlInput) urlInput.value = '';
  const resetBtn = document.getElementById('resetProductImageBtn');
  if (resetBtn) resetBtn.style.display = 'none';

  setTimeout(() => {
    handleListingFormInput();
    triggerAiPriceRecommendation(false);
  }, 50);
}

function renderSellHarvestActiveListings() {
  const container = document.getElementById('activeFarmerListingsContainer');
  if (!container) return;

  const ownProducts = window.AgriState.products.filter(p => isUserOwnProduct(p));

  if (ownProducts.length === 0) {
    container.innerHTML = `
      <div style="padding: 1.5rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.8rem; background: var(--bg-page); border-radius: var(--radius-sm); border: 1px dashed var(--border-subtle);">
        No active listings yet. Fill in the form on the left to publish your first harvest directly to consumers!
      </div>
    `;
    return;
  }

  container.innerHTML = ownProducts.slice(0, 6).map(p => `
    <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); background: var(--bg-page); transition: transform 0.15s ease;">
      <img src="${p.image_url}" alt="${p.name}" style="width: 48px; height: 48px; border-radius: 6px; object-fit: cover; flex-shrink: 0;" onerror="this.src='assets/logo.png'">
      <div style="flex: 1; min-width: 0;">
        <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${p.quantity} ${p.unit} in stock • ₱${p.price.toLocaleString()}/${p.unit}</div>
      </div>
      <div style="text-align: right; flex-shrink: 0;">
        <span style="font-size: 0.7rem; font-weight: 700; color: #15803d; background: #dcfce7; padding: 0.15rem 0.45rem; border-radius: 4px;">Active</span>
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

  // Prevent background swiping up/down on mobile and wheel scrolling on desktop when cart is open
  document.addEventListener('touchmove', (e) => {
    if (!document.body.classList.contains('cart-open')) return;
    const scrollable = e.target.closest('#cartItemsList, #farmerOrdersItemsList, [data-drawer-scroll="true"]');
    if (!scrollable) {
      if (e.cancelable) e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('wheel', (e) => {
    if (!document.body.classList.contains('cart-open')) return;
    const scrollable = e.target.closest('#cartItemsList, #farmerOrdersItemsList, [data-drawer-scroll="true"]');
    if (!scrollable) {
      if (e.cancelable) e.preventDefault();
    }
  }, { passive: false });

  // Escape key closes open cart / farmer drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const cartDrawer = document.getElementById('cartDrawer');
      if (cartDrawer && cartDrawer.classList.contains('open')) {
        toggleCart(false);
      }
      const farmerDrawer = document.getElementById('farmerOrdersDrawer');
      if (farmerDrawer && farmerDrawer.classList.contains('open')) {
        toggleFarmerOrdersDrawer(false);
      }
    }
  });
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
  const email = (form.email.value || '').trim().toLowerCase();
  const password = form.password.value;

  if (!email || !password) {
    showToast('Please enter both email and password.');
    return;
  }

  // Ensure Admin Account is seeded in storage
  if (typeof ensureAdminAccountExists === 'function') {
    ensureAdminAccountExists();
  }

  // Specific Admin Account Authentication
  if (email === 'comiakrystel@gmail.com') {
    if (password !== 'adminkrystel123') {
      showToast('⚠️ Incorrect password for Executive Administrator account.');
      return;
    }

    const adminUser = {
      id: 'admin-krystel',
      full_name: 'Krystel Comia',
      email: 'comiakrystel@gmail.com',
      role: 'admin',
      is_admin: true,
      phone: '+63 917 123 4567',
      province: 'National Capital Region',
      city: 'Quezon City',
      address: 'AgriConnect National Operations Center, Quezon City, Metro Manila',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Executive Platform Administrator & PhilGAP Compliance Director',
      createdAt: '2026-01-01T00:00:00.000Z'
    };

    window.AgriState.user = adminUser;
    window.AgriState.currentMode = 'admin';
    localStorage.setItem('agri_user', JSON.stringify(adminUser));
    localStorage.setItem('agri_mode', 'admin');

    updateAuthUI();
    showToast('👑 Welcome back, Administrator Krystel Comia! Directing to Executive Access...');

    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect') || 'admin.html';

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 500);
    return;
  }

  // Check saved registered users
  const registeredUsers = JSON.parse(localStorage.getItem('agri_users') || '[]');
  const matchedUser = registeredUsers.find(u => u.email.toLowerCase() === email);

  if (!matchedUser) {
    showToast('No account found with that email. Please create an account first.');
    return;
  }

  // Persist session
  window.AgriState.user = matchedUser;
  localStorage.setItem('agri_user', JSON.stringify(matchedUser));

  // Load user-scoped cart and orders
  window.AgriState.cart = JSON.parse(localStorage.getItem(`agri_cart_${matchedUser.id}`) || '[]');
  window.AgriState.orders = JSON.parse(localStorage.getItem(`agri_orders_${matchedUser.id}`) || '[]');

  if (matchedUser.role === 'admin') {
    window.AgriState.currentMode = 'admin';
    localStorage.setItem('agri_mode', 'admin');
  } else if (matchedUser.role === 'farmer') {
    window.AgriState.currentMode = 'farmer';
    localStorage.setItem('agri_mode', 'farmer');
  } else {
    window.AgriState.currentMode = 'buyer';
    localStorage.setItem('agri_mode', 'buyer');
  }

  updateAuthUI();
  updateCartBadge();
  showToast(`Welcome back, ${matchedUser.full_name}!`);

  setTimeout(() => {
    if (matchedUser.role === 'admin') {
      window.location.href = 'admin.html';
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect') || (matchedUser.role === 'farmer' ? 'dashboard.html' : 'marketplace.html');
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
    const coords = getProvinceCoordinates(newUser.province || 'Benguet');
    const newFarmer = {
      id: newUser.id,
      full_name: newUser.full_name,
      farm_name: newUser.farm_name,
      city: 'Local Municipality',
      province: newUser.province,
      latitude: coords.lat,
      longitude: coords.lng,
      address: `${newUser.province}, Philippines`,
      bio: `Direct farmer partner on AgriConnect specializing in ${newUser.specialty}.`,
      rating: 5.0,
      reviewsCount: 1,
      verified: true,
      phone: newUser.phone,
      pickupHours: '7:00 AM – 5:00 PM (Daily)',
      specialty: newUser.specialty,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'
    };

    try {
      const customFarmers = JSON.parse(localStorage.getItem('agri_custom_farmers') || '[]');
      const existIdx = customFarmers.findIndex(f => f.id === newFarmer.id);
      if (existIdx >= 0) {
        customFarmers[existIdx] = newFarmer;
      } else {
        customFarmers.unshift(newFarmer);
      }
      localStorage.setItem('agri_custom_farmers', JSON.stringify(customFarmers));
    } catch (err) {
      console.warn('Error saving custom farmer:', err);
    }

    window.AgriState.farmers = getStoredFarmers();
    window.AgriState.currentMode = 'farmer';
    localStorage.setItem('agri_mode', 'farmer');
  }

  // Persist current session
  window.AgriState.user = newUser;
  localStorage.setItem('agri_user', JSON.stringify(newUser));

  // Initialize empty cart & orders for new user
  window.AgriState.cart = [];
  window.AgriState.orders = [];
  localStorage.setItem(`agri_cart_${newUser.id}`, JSON.stringify([]));
  localStorage.setItem(`agri_orders_${newUser.id}`, JSON.stringify([]));

  updateAuthUI();
  updateCartBadge();
  showToast(`Account created successfully! Welcome, ${newUser.full_name}.`);

  setTimeout(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect') || 'dashboard.html';
    window.location.href = redirectUrl;
  }, 700);
}

function handleLogout() {
  const prevUser = window.AgriState.user;
  if (prevUser && prevUser.id) {
    if (window.AgriState.cart) {
      localStorage.setItem(`agri_cart_${prevUser.id}`, JSON.stringify(window.AgriState.cart));
    }
    if (window.AgriState.orders) {
      localStorage.setItem(`agri_orders_${prevUser.id}`, JSON.stringify(window.AgriState.orders));
    }
  }

  window.AgriState.user = null;
  window.AgriState.cart = [];
  window.AgriState.orders = [];
  localStorage.removeItem('agri_user');
  localStorage.removeItem('agri_cart');
  localStorage.removeItem('agri_orders');
  localStorage.removeItem('agri_buyer_orders');
  localStorage.setItem('agri_mode', 'buyer');
  window.AgriState.currentMode = 'buyer';

  updateAuthUI();
  updateCartBadge();
  if (document.getElementById('ordersListContainer')) {
    renderOrderTrackingList();
  }
  showToast('You have been signed out. Reverted to guest state.');

  if (window.location.pathname.includes('auth.html')) {
    switchAuthTab('login');
  } else if (window.location.pathname.includes('profile.html')) {
    initProfilePage();
  } else if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('sell-harvest.html') || window.location.pathname.includes('track-orders.html')) {
    setTimeout(() => {
      window.location.reload();
    }, 400);
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
  const isAdmin = Boolean(user && (user.role === 'admin' || user.is_admin));
  
  headerDashBtns.forEach(btn => {
    if (user) {
      btn.style.setProperty('display', 'inline-flex', 'important');
      if (isAdmin) {
        btn.href = 'admin.html';
        btn.setAttribute('title', 'Open Admin Executive Console');
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Admin Console';
        if (window.location.pathname.includes('admin.html')) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      } else {
        btn.href = 'dashboard.html';
        btn.setAttribute('title', 'Open Dashboard');
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Dashboard';
        if (window.location.pathname.includes('dashboard.html')) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    } else {
      btn.style.setProperty('display', 'none', 'important');
    }
  });

  // Toggle Header Cart Button vs Farmer Orders Management Button
  const cartBtns = document.querySelectorAll('button[aria-label="View Cart"], button[aria-label="Manage Farmer Orders"], button[onclick*="toggleCart"], button[onclick*="toggleFarmerOrdersDrawer"]');
  cartBtns.forEach(btn => {
    if (isAdmin) {
      btn.setAttribute('aria-label', 'Admin Console');
      btn.setAttribute('title', 'Open Admin Executive Console');
      btn.setAttribute('onclick', "window.location.href='admin.html'");
      btn.innerHTML = `
        <span style="font-size: 0.95rem;">👑</span>
      `;
    } else if (isFarmer) {
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

  // Replace "How It Works" navbar link with "Subscription Status" if logged in as Admin
  const howItWorksNavLinks = document.querySelectorAll('a[href="how-it-works.html"], a[href="how-it-works.html#"], a[href="subscriptions.html"], a[href="subscriptions.html#"]');
  howItWorksNavLinks.forEach(link => {
    if (link.classList.contains('nav-link')) {
      if (isAdmin) {
        link.href = "subscriptions.html";
        link.textContent = "Subscription Status";
        link.setAttribute('title', "Monitor Farmer Subscriptions, Earnings & Expirations");
        if (window.location.pathname.includes('subscriptions.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } else {
        link.href = "how-it-works.html";
        link.textContent = "How It Works";
        link.setAttribute('title', "How AgriConnect Works");
        if (window.location.pathname.includes('how-it-works.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    }
  });

  // Update "Marketplace" navbar link to "My Products" if logged in as farmer
  const marketplaceNavLinks = document.querySelectorAll('a[href="marketplace.html"], a[href="marketplace.html#"]');
  marketplaceNavLinks.forEach(link => {
    if (link.classList.contains('nav-link')) {
      link.textContent = isFarmer ? "My Products" : "Marketplace";
      link.setAttribute('title', isFarmer ? "View all products you are selling as a farmer" : "Browse marketplace");
    }
  });

  // Update "Track Orders" navbar link to "Track Buyers' Orders" if logged in as farmer
  const trackNavLinks = document.querySelectorAll('a[href="track-orders.html"], a[href="track-orders.html#"]');
  trackNavLinks.forEach(link => {
    if (link.classList.contains('nav-link')) {
      link.textContent = isAdmin ? "Track Orders" : (isFarmer ? "Track Buyers' Orders" : "Track Orders");
    }
  });

  // Update hero browse marketplace button on index.html if present
  const heroBrowseBtn = document.querySelector('.hero-actions a[href="marketplace.html"]');
  if (heroBrowseBtn) {
    heroBrowseBtn.innerHTML = isFarmer ? 'View My Products &rarr;' : 'Browse Marketplace &rarr;';
  }

  // Toggle Subscription sections: Hide from buyer accounts (buyers only see homepage sponsored ads)
  const isBuyer = Boolean(user && user.role !== 'farmer' && !isAdmin);
  const subSection = document.getElementById('subscriptionsSection');
  if (subSection) {
    subSection.style.setProperty('display', isBuyer ? 'none' : '', isBuyer ? 'important' : '');
  }
  const farmerSubGuide = document.getElementById('farmerSubscriptionGuide');
  if (farmerSubGuide) {
    farmerSubGuide.style.setProperty('display', isBuyer ? 'none' : '', isBuyer ? 'important' : '');
  }

  // Toggle Marketplace Category Filter Chips (hidden for farmer accounts)
  const categoryChipsWrapper = document.getElementById('categoryChipsWrapper');
  const categoryChipsEl = document.getElementById('categoryChips');
  if (categoryChipsWrapper) {
    categoryChipsWrapper.style.setProperty('display', isFarmer ? 'none' : '', isFarmer ? 'important' : '');
  }
  if (categoryChipsEl) {
    categoryChipsEl.style.setProperty('display', isFarmer ? 'none' : '', isFarmer ? 'important' : '');
  }

  if (!container) return;

  if (user && user.full_name) {
    const initials = user.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const isProfilePage = window.location.pathname.includes('profile.html');
    const roleBadgeText = isAdmin ? '👑 Admin' : (user.role === 'farmer' ? 'Farmer' : 'Buyer');
    const roleBadgeColor = isAdmin ? '#dc2626' : 'var(--primary)';
    const profileLink = isAdmin ? 'admin.html' : 'profile.html';

    container.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; flex-shrink: 0;">
        <a href="${profileLink}" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit; padding: 0.2rem 0.35rem; border-radius: var(--radius-sm); transition: opacity 0.15s ease;" title="Open Profile/Console">
          <div style="width: 32px; height: 32px; border-radius: 9999px; background: ${isAdmin ? '#dc2626' : 'var(--primary)'}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0; box-shadow: var(--shadow-sm); overflow: hidden;">
            ${user.avatar ? `<img src="${user.avatar}" alt="${user.full_name}" style="width: 100%; height: 100%; object-fit: cover;">` : initials}
          </div>
          <div style="display: flex; flex-direction: column; line-height: 1.15; text-align: left; white-space: nowrap;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); white-space: nowrap; max-width: 150px; overflow: hidden; text-overflow: ellipsis;" title="${user.full_name}">${user.full_name}</span>
            <span style="font-size: 0.68rem; color: ${roleBadgeColor}; font-weight: 800; text-transform: uppercase; white-space: nowrap;">${roleBadgeText}</span>
          </div>
        </a>
        <a href="${profileLink}" class="btn-secondary" style="font-size: 0.725rem; padding: 0.28rem 0.65rem; border-color: ${isProfilePage || window.location.pathname.includes('admin.html') ? 'var(--primary)' : 'var(--border-subtle)'}; background: ${isProfilePage || window.location.pathname.includes('admin.html') ? 'var(--primary-light)' : '#ffffff'}; color: ${isProfilePage || window.location.pathname.includes('admin.html') ? 'var(--primary-deep)' : 'var(--text-main)'}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 700;" title="${isAdmin ? 'Admin Console' : 'My Profile'}">
          ${isAdmin ? '<span>👑 Admin</span>' : '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Profile</span>'}
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
const DEFAULT_FARMER_ORDERS = [];

function getFarmerOrders() {
  const user = window.AgriState.user;
  if (!user || user.role !== 'farmer') {
    return [];
  }

  const saved = localStorage.getItem('agri_farmer_orders');
  let allOrders = [];
  if (saved) {
    try {
      allOrders = JSON.parse(saved);
      if (!Array.isArray(allOrders)) allOrders = [];
    } catch (e) {
      console.warn('Failed parsing farmer orders', e);
      allOrders = [];
    }
  } else {
    allOrders = [];
  }

  // Filter orders strictly for the active logged-in farmer
  const farmerOrders = allOrders.filter(o => {
    if (!o) return false;
    // 1. Direct farmer_id match
    if (o.farmer_id && o.farmer_id === user.id) return true;

    // 2. Farmer farm name match
    if (user.farm_name && o.farmer_name) {
      const uFarm = user.farm_name.toLowerCase().trim();
      const oFarm = o.farmer_name.toLowerCase().trim();
      if (uFarm === oFarm || oFarm.includes(uFarm) || uFarm.includes(oFarm)) return true;
    }

    // 3. Farmer full name match
    if (user.full_name && o.farmer_name) {
      const uName = user.full_name.toLowerCase().trim();
      const oFarm = o.farmer_name.toLowerCase().trim();
      if (oFarm.includes(uName)) return true;
    }

    // 4. Check if any items belong to this farmer
    if (o.items && Array.isArray(o.items)) {
      const hasMatchingItem = o.items.some(item => {
        if (item.farmer_id && item.farmer_id === user.id) return true;
        const p = window.AgriState.products.find(prod => prod.id === item.id || prod.name === item.name);
        return p && isUserOwnProduct(p);
      });
      if (hasMatchingItem) return true;
    }

    return false;
  });

  return farmerOrders.map(o => {
    if (!o.remaining_time || !o.eta) {
      if (o.status_code === 'delivered') {
        o.remaining_time = '0 mins (Delivered)';
        o.eta = o.eta || 'Delivered to Buyer';
        o.temp_c = o.temp_c || 'Safe Cold-Chain Verified';
      } else if (o.status_code === 'in_transit') {
        o.remaining_time = o.remaining_time || '45 minutes';
        o.eta = o.eta || 'Today, 11:15 AM';
        o.temp_c = o.temp_c || '3.8°C Temperature Verified';
      } else {
        o.remaining_time = o.remaining_time || '1 day';
        o.eta = o.eta || 'Tomorrow, 09:30 AM';
        o.temp_c = o.temp_c || 'Cold-Chain Verified';
      }
    }
    return o;
  });
}

function saveFarmerOrders(orders) {
  const saved = localStorage.getItem('agri_farmer_orders');
  let allOrders = [];
  if (saved) {
    try {
      allOrders = JSON.parse(saved);
    } catch (e) {
      allOrders = [];
    }
  }

  const map = new Map();
  allOrders.forEach(o => { if (o && o.id) map.set(o.id, o); });
  orders.forEach(o => { if (o && o.id) map.set(o.id, o); });

  localStorage.setItem('agri_farmer_orders', JSON.stringify(Array.from(map.values())));
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
  const totalSalesAmount = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const deliveredPayoutAmount = deliveredOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

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
  const statTotalSales = document.getElementById('statTotalSales');
  const statPending = document.getElementById('statPendingOrders');
  const statDelivered = document.getElementById('statDeliveredItems');
  const payoutValEl = document.getElementById('farmerPayoutBalanceVal');
  const statActiveListings = document.getElementById('statActiveListings');

  if (statTotalSales) statTotalSales.textContent = `₱${totalSalesAmount.toLocaleString()}`;
  if (statPending) statPending.textContent = `${pendingOrders.length} Order${pendingOrders.length === 1 ? '' : 's'}`;
  if (statDelivered) statDelivered.textContent = `${deliveredOrders.length} Completed`;
  if (payoutValEl) payoutValEl.textContent = `₱${deliveredPayoutAmount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const ownProds = (window.AgriState && window.AgriState.products) ? window.AgriState.products.filter(p => isUserOwnProduct(p)) : [];
  if (statActiveListings) {
    statActiveListings.textContent = `${ownProds.length} Product${ownProds.length === 1 ? '' : 's'}`;
  }

  // Render Sales Summary & Crop Performance container
  const salesSummaryContainer = document.getElementById('farmerSalesSummaryContainer');
  if (salesSummaryContainer) {
    if (orders.length === 0) {
      salesSummaryContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; background: var(--bg-subtle); border: 1px dashed var(--border-strong); border-radius: var(--radius-sm); color: var(--text-muted);">
          <div style="font-size: 1.5rem; margin-bottom: 0.35rem;">📊</div>
          <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">No sales recorded yet</div>
          <div style="font-size: 0.775rem; color: var(--text-secondary);">When buyers place orders for your harvests, your crop revenue analytics will appear here.</div>
        </div>
      `;
    } else {
      const cropMap = new Map();
      orders.forEach(o => {
        (o.items || []).forEach(item => {
          const key = item.name;
          const current = cropMap.get(key) || { name: key, totalQty: 0, unit: item.unit || 'kg', totalAmount: 0 };
          current.totalQty += (Number(item.quantity) || 0);
          current.totalAmount += ((Number(item.price) || 0) * (Number(item.quantity) || 1));
          cropMap.set(key, current);
        });
      });
      const cropList = Array.from(cropMap.values());
      salesSummaryContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${cropList.map(crop => {
            const pct = totalSalesAmount > 0 ? Math.min(100, Math.round((crop.totalAmount / totalSalesAmount) * 100)) : 0;
            return `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                  <strong style="color: var(--text-main);">${crop.name} (${crop.totalQty} ${crop.unit})</strong>
                  <span style="font-weight: 700; color: var(--primary-deep);">₱${crop.totalAmount.toLocaleString()} (${pct}%)</span>
                </div>
                <div style="height: 6px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
                  <div style="width: ${pct}%; height: 100%; background: var(--primary); border-radius: 9999px;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  // Render Connected Payout Channel container
  const payoutChannelContainer = document.getElementById('farmerPayoutChannelContainer');
  if (payoutChannelContainer) {
    const wallets = getStoredFarmerEWallets();
    const primaryWallet = wallets.find(w => w.is_primary) || wallets[0];
    if (primaryWallet) {
      const badgeBg = primaryWallet.badge_bg || '#0284c7';
      const badgeLetter = (primaryWallet.bank_name || 'E')[0];
      payoutChannelContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 38px; height: 38px; border-radius: 8px; background: ${badgeBg}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; flex-shrink: 0;">
              ${badgeLetter}
            </div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">${primaryWallet.bank_name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${primaryWallet.account_number} • ${primaryWallet.account_name}</div>
            </div>
          </div>
          <span style="font-size: 0.7rem; font-weight: 700; background: #dcfce7; color: #166534; padding: 0.2rem 0.5rem; border-radius: 9999px;">Primary</span>
        </div>
      `;
    } else {
      payoutChannelContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div style="width: 38px; height: 38px; border-radius: 8px; background: #e2e8f0; color: #64748b; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
              💳
            </div>
            <div>
              <div style="font-size: 0.825rem; font-weight: 700; color: var(--text-main);">No Payout Channel Linked</div>
              <div style="font-size: 0.725rem; color: var(--text-muted);">Link GCash or Bank to receive disbursements</div>
            </div>
          </div>
          <a href="profile.html#farmerEWalletsSection" class="btn-secondary" style="font-size: 0.725rem; padding: 0.3rem 0.6rem; text-decoration: none; white-space: nowrap;">
            + Connect
          </a>
        </div>
      `;
    }
  }

  let filtered = orders;
  if (filter === 'pending') {
    filtered = pendingOrders;
  } else if (filter === 'delivered') {
    filtered = deliveredOrders;
  }

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; background: #ffffff; border: 1px dashed var(--border-strong); border-radius: var(--radius-md);">
        <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">${filter === 'pending' ? 'No orders currently pending harvest.' : filter === 'delivered' ? 'No delivered orders recorded yet.' : 'No orders received for your farm products yet. Once buyers place orders, they will appear here in real-time!'}</p>
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
          ${(o.items || []).map(item => `
            <div style="font-size: 0.85rem; color: var(--text-main);">
              <strong>${item.quantity} ${item.unit}</strong> × ${item.name} <span style="color: var(--text-muted); font-size: 0.78rem;">(@ ₱${item.price}/${item.unit})</span>
            </div>
          `).join('')}
        </div>

        <div style="text-align: right;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Direct Farmgate Total</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary-deep);">₱${(o.total_amount || 0).toLocaleString()}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function updateFarmerOrderStatus(orderId, newStatusCode) {
  const saved = localStorage.getItem('agri_farmer_orders');
  let allOrders = [];
  if (saved) {
    try { allOrders = JSON.parse(saved); } catch (e) { allOrders = []; }
  }

  const order = allOrders.find(o => o.id === orderId);
  if (!order) return;

  order.status_code = newStatusCode;
  if (newStatusCode === 'delivered') {
    order.status = 'Delivered to Buyer';
    order.remaining_time = '0 mins (Delivered)';
    order.eta = 'Delivered Today';
  } else if (newStatusCode === 'in_transit') {
    order.status = 'In Transit';
    order.remaining_time = (order.remaining_time && !order.remaining_time.includes('0 mins')) ? order.remaining_time : '45 minutes';
    order.eta = 'Today, Cold-Chain Transit';
  } else {
    order.status = 'Pending Harvest';
    order.remaining_time = (order.remaining_time && !order.remaining_time.includes('0 mins')) ? order.remaining_time : '1 day';
    order.eta = 'Tomorrow, Morning Dispatch';
  }

  localStorage.setItem('agri_farmer_orders', JSON.stringify(allOrders));

  // Sync with Buyer Orders in localStorage so the buyer sees the updated status in track-orders.html and profile.html!
  const masterId = order.master_order_id || order.id.split('-F')[0];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('agri_orders') || key.startsWith('agri_buyer_orders'))) {
      try {
        let bOrders = JSON.parse(localStorage.getItem(key) || '[]');
        if (Array.isArray(bOrders)) {
          let modified = false;
          bOrders.forEach(bo => {
            if (bo && (bo.id === masterId || bo.id === order.id)) {
              if (newStatusCode === 'delivered') {
                bo.status = 'Delivered';
                bo.status_code = 'past';
                bo.progressStep = 4;
              } else if (newStatusCode === 'in_transit') {
                bo.status = 'In Transit';
                bo.status_code = 'to_deliver';
                bo.progressStep = 3;
              } else {
                bo.status = 'Order Confirmed';
                bo.status_code = 'to_deliver';
                bo.progressStep = 1;
              }
              modified = true;
            }
          });
          if (modified) {
            localStorage.setItem(key, JSON.stringify(bOrders));
          }
        }
      } catch (err) {
        console.warn('Error syncing buyer order status', err);
      }
    }
  }

  // Update in-memory orders if active
  if (window.AgriState.orders && Array.isArray(window.AgriState.orders)) {
    window.AgriState.orders.forEach(bo => {
      if (bo && (bo.id === masterId || bo.id === order.id)) {
        if (newStatusCode === 'delivered') {
          bo.status = 'Delivered';
          bo.status_code = 'past';
          bo.progressStep = 4;
        } else if (newStatusCode === 'in_transit') {
          bo.status = 'In Transit';
          bo.status_code = 'to_deliver';
          bo.progressStep = 3;
        }
      }
    });
  }

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

  const ownProducts = window.AgriState.products.filter(p => isUserOwnProduct(p));

  const statActive = document.getElementById('statActiveListings');
  if (statActive) {
    statActive.textContent = `${ownProducts.length} Product${ownProducts.length === 1 ? '' : 's'}`;
  }

  if (ownProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; background: #ffffff; border-radius: var(--radius-md); border: 1px dashed var(--border-strong);">
        <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">No crops listed yet</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0.35rem 0 1rem;">Start listing your farm produce directly to consumers without middlemen.</p>
        <a href="sell-harvest.html" class="btn-primary" style="text-decoration: none; display: inline-block; padding: 0.6rem 1.25rem;">+ List Your First Crop</a>
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
  if (document.getElementById('productsGrid')) {
    renderProducts();
  }
  showToast(`Updated "${p.name}" to ₱${newPrice}/${p.unit} with ${newQty} in stock!`);
}

// -------------------------------------------------------------
// 11. UNIFIED DASHBOARD CONTROLLER (BUYER & FARMER PORTALS)
// -------------------------------------------------------------

const DEFAULT_BUYER_ORDERS = [];

function getBuyerOrders() {
  const user = window.AgriState.user;
  if (!user) {
    return [];
  }

  const userKey = `agri_buyer_orders_${user.id}`;
  const saved = localStorage.getItem(userKey);
  let orders = [];
  if (saved) {
    try {
      orders = JSON.parse(saved);
    } catch (e) {
      console.warn('Failed parsing buyer orders', e);
      orders = [];
    }
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
  const user = window.AgriState.user;
  if (user && user.id) {
    localStorage.setItem(`agri_buyer_orders_${user.id}`, JSON.stringify(orders));
    localStorage.setItem(`agri_orders_${user.id}`, JSON.stringify(orders));
  }
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
  if (!user) {
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.innerHTML = `
        <div style="text-align: center; padding: 5rem 1.5rem; background: #ffffff; border-radius: var(--radius-md); border: 1.5px dashed var(--border-strong); box-shadow: var(--shadow-sm); max-width: 620px; margin: 3rem auto;">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: #f0fdf4; border: 2px solid #bbf7d0; color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">
            🔒
          </div>
          <span style="font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.08em; background: var(--primary-light); padding: 0.25rem 0.75rem; border-radius: 9999px; display: inline-block; margin-bottom: 0.75rem;">
            Authentication Required
          </span>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
            Sign In Required to Access Dashboard
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 460px; margin: 0 auto 2rem; line-height: 1.6;">
            Please log in or register an account to access your personalized buyer order history, farmer harvest listings, or wallet balance.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <a href="auth.html?redirect=dashboard.html" class="btn-primary" style="padding: 0.75rem 1.6rem; text-decoration: none; font-size: 0.9rem; font-weight: 700;">
              Log In / Register &rarr;
            </a>
            <a href="marketplace.html" class="btn-secondary" style="padding: 0.75rem 1.4rem; text-decoration: none; font-size: 0.9rem; font-weight: 600;">
              Browse Marketplace
            </a>
          </div>
        </div>
      `;
    }
    return;
  }
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
    if (greetingEl) greetingEl.textContent = 'Kumusta, Direct Buyer!';
    if (locationEl) locationEl.textContent = 'Metro Manila Delivery Hub • Direct Sourcing from Benguet & Nueva Ecija';
    if (avatarBadge) avatarBadge.textContent = 'DB';
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
  const statWalletBal = document.getElementById('statBuyerWalletBalance');

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
  if (statWalletBal) {
    statWalletBal.textContent = `₱${getBuyerBalance().toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
      farmDetailsEl.textContent = `${user.farm_name || 'Verified Farm'} • ${user.province || 'Philippines'}`;
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

/* ============================================================ */
/* AI-Generated 15-Second Video Commercial Top Showcase Logic   */
/* ============================================================ */
const AD_DURATION_SECONDS = 15;
let currentAdIndex = 0;
let adSecondsRemaining = AD_DURATION_SECONDS;
let isAdPaused = false;
let isManualPause = false;
let adTickInterval = null;
let adProgressInterval = null;
let aiPipelineInterval = null;
let commercialAudioCtx = null;
let commercialAudioGain = null;
let commercialAudioArpTimer = null;
let isCommercialAudioPlaying = false;
let currentRenderedSceneIndex = -1;
let currentRenderedAdId = null;

// Curated 15-second commercial showcase ads (each has 3 5-second cinematic scenes)
const DEFAULT_SPONSORED_ADS = [
  {
    id: 'ad-benguet-strawberries',
    tierName: 'Monthly Grower Pro',
    tierBadge: '⭐ VIP Grower Sponsor',
    durationBadge: '🗓️ 1 Month Homepage Feature',
    durationDays: 30,
    farmName: 'Cordillera Highland Strawberry & Greens',
    farmerName: 'Mang Ramon Dela Cruz',
    totalSales: 1284500,
    ordersCompleted: 3412,
    location: 'La Trinidad, Benguet',
    avatar: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=300',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • HIGHLAND TERROIR (1,500m ALTITUDE)',
        headline: '🍓 High-Altitude Terroir & Mineral Loam Soil',
        subtext: 'Nestled 1,500m above sea level in La Trinidad, Benguet. Crisp mountain air and volcanic soil deliver strawberries with deep natural Brix sweetness.',
        badges: ['Benguet Highlands', '1,500m Altitude', 'Pesticide-Free Terroir'],
        bgImage: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=1400&q=80',
        actionText: 'View Benguet Harvest',
        actionLink: 'marketplace.html?category=Fruits'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • 5:00 AM HARVEST (0% MIDDLEMEN)',
        headline: '🌱 Handpicked Daily at Dawn with Crisp Wombok',
        subtext: 'Harvested by local family growers at first sunrise. Guaranteed 100% fair farmgate returns with zero intermediary trading markups.',
        badges: ['Zero Middlemen', 'Sunrise Hand-Picked', 'Direct Farmgate Price'],
        bgImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1400&q=80',
        actionText: 'Browse Fresh Greens',
        actionLink: 'marketplace.html?category=Vegetables'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • DIRECT COLD-CHAIN DISPATCH',
        headline: '🚚 Dispatched via Refrigerated Cold-Chain in 18 Hours',
        subtext: 'Direct depot delivery to Metro Manila restaurants, fruit vendors, and organic markets. Freshness locked from mountain terrace to your table.',
        badges: ['Refrigerated Cold-Chain', '18-Hour Dispatch', 'Wholesale Bulk Available'],
        bgImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80',
        actionText: 'Order Strawberries Direct &rarr;',
        actionLink: 'marketplace.html?category=Fruits'
      }
    ]
  },
  {
    id: 'ad-ne-grains',
    tierName: 'Yearly Champion Co-Op',
    tierBadge: '🏆 Annual Champion Sponsor',
    durationBadge: '🗓️ 1 Year Homepage Feature',
    durationDays: 365,
    farmName: 'Vergara Rice Mills & Grain Collective',
    farmerName: 'Aling Nena Bautista',
    totalSales: 2765300,
    ordersCompleted: 5128,
    location: 'Muñoz, Nueva Ecija',
    avatar: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • RICE GRANARY OF THE PHILIPPINES',
        headline: '🌾 Central Luzon Golden Alluvial Plains',
        subtext: 'Cultivated in the fertile agricultural heartland of Muñoz, Nueva Ecija. Naturally irrigated by mountain rivers for plump, nutrient-dense grains.',
        badges: ['Granary of PH', 'Volcanic Soil', 'Generational Mill'],
        bgImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80',
        actionText: 'View Grain Harvest',
        actionLink: 'marketplace.html?category=Grains'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • CHEMICAL-FREE MILLING',
        headline: '🍚 100% Whole Grain Jasmine & Dinorado Aromatic',
        subtext: 'Freshly de-husked and milled weekly on-site. Zero artificial whitening and zero chemical fumigation, preserving aroma and vitamin B.',
        badges: ['Chemical-Free', 'Freshly Milled Weekly', 'Whole Grain Aromatic'],
        bgImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1400&q=80',
        actionText: 'Explore Grain Sacks',
        actionLink: 'marketplace.html?category=Grains'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • WHOLESALE DIRECT DEPOT SACKS',
        headline: '📦 25kg & 50kg Bulk Sacks Straight from Mill',
        subtext: 'Direct depot dispatch to institutional buyers, restaurants, caterers, and pantries at true farmgate mill prices.',
        badges: ['Direct Mill Price', '25kg & 50kg Sacks', 'Express Metro Cargo'],
        bgImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1400&q=80',
        actionText: 'Order Rice Sacks Direct &rarr;',
        actionLink: 'marketplace.html?category=Grains'
      }
    ]
  },
  {
    id: 'ad-guimaras-mangoes',
    tierName: 'Weekly Flash Boost',
    tierBadge: '🌟 Featured Harvest Flash',
    durationBadge: '🗓️ 1 Week Homepage Feature',
    durationDays: 7,
    farmName: 'Jordan Sweet Carabao Mango Orchard',
    farmerName: 'Kuya Jun Villanueva',
    totalSales: 948750,
    ordersCompleted: 2207,
    location: 'Jordan, Guimaras',
    avatar: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • WORLD-RENOWNED GUIMARAS TERROIR',
        headline: '🥭 The World’s Sweetest Certified Carabao Mangoes',
        subtext: 'Protected by Guimaras strict bio-security quarantine. Grown in limestone-rich coastal soil with guaranteed 16°+ Brix natural sweetness.',
        badges: ['Guimaras Certified', '16°+ Brix Sweetness', 'Quarantine Protected'],
        bgImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=1400&q=80',
        actionText: 'Explore Sweet Mangoes',
        actionLink: 'marketplace.html?category=Fruits'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • TREE-RIPENED EXPORT GRADE SELECTION',
        headline: '☀️ Hand-Inspected at Peak Ripeness (Zero Chemicals)',
        subtext: 'Every mango is bagged on the branch and picked by hand. Zero artificial calcium carbide ripening for clean, velvety golden nectar.',
        badges: ['Tree-Ripened', 'Export Grade A', 'No Artificial Ripener'],
        bgImage: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1400&q=80',
        actionText: 'View Mango Crates',
        actionLink: 'marketplace.html?category=Fruits'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • DIRECT SEA & AIR CARGO TO BUYERS',
        headline: '✈️ Flown Direct from Orchard to NCR & Cebu',
        subtext: 'Fast consolidated freight directly from Jordan port. Arrives firm, fragrant, and ready for commercial kitchens and gift crates.',
        badges: ['Direct Air Cargo', 'Consolidated Freight', 'Limited Harvest Batch'],
        bgImage: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=1400&q=80',
        actionText: 'Order Mangoes Direct &rarr;',
        actionLink: 'marketplace.html?category=Fruits'
      }
    ]
  }
];

// Presets for AI Commercial Auto-Generation (zero manual copywriting needed)
const FARM_CATALOG_PRESETS = {
  'farmer-ramon': {
    farmName: 'Mang Ramon Dela Cruz — Dela Cruz Family Farm',
    location: 'La Trinidad, Benguet',
    avatar: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=300',
    actionLink: 'marketplace.html?category=Fruits',
    actionText: 'Order Strawberries Direct',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • MOUNTAIN TERROIR (1,500m)',
        headline: '🍓 Benguet High-Altitude Strawberries & Crisp Greens',
        subtext: 'Cultivated in La Trinidad rich highland volcanic loam. Morning dew and cool altitude produce sweet, pesticide-free harvest.',
        badges: ['Highland Soil', '1,500m Altitude', 'Zero Middlemen'],
        bgImage: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=1400&q=80'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • 5:00 AM HARVEST',
        headline: '🥬 Crisp Highland Wombok & Ruby Berries Handpicked',
        subtext: 'Picked at first sunrise by Mang Ramon family cooperative. Straight from mountain terraces at genuine farmgate wholesale prices.',
        badges: ['Handpicked at Dawn', '100% Fair Price', 'Zero Chemical Wax'],
        bgImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1400&q=80'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • COLD-CHAIN DISPATCH',
        headline: '🚚 Dispatched Cold-Chain to Metro Manila in 18 Hours',
        subtext: 'Guaranteed crisp farmgate freshness delivered directly to restaurants, grocers, and families.',
        badges: ['Refrigerated Transit', 'Direct Delivery', 'Fresh Guarantee'],
        bgImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80'
      }
    ]
  },
  'farmer-nena': {
    farmName: 'Aling Nena Bautista — Bautista Rice Fields',
    location: 'Muñoz, Nueva Ecija',
    avatar: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
    actionLink: 'marketplace.html?category=Grains',
    actionText: 'Order Rice Direct',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • CENTRAL LUZON GRANARY',
        headline: '🌾 Nueva Ecija Golden Paddy Plains',
        subtext: 'Grown across the sun-drenched plains of Muñoz. Naturally irrigated and harvested at peak golden grain maturity.',
        badges: ['Nueva Ecija Rice', 'River-Irrigated', 'Zero Fumigation'],
        bgImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • CHEMICAL-FREE MILLING',
        headline: '🍚 Fresh Aromatic Dinorado & Jasmine Whole Grains',
        subtext: 'Milled freshly on demand by Aling Nena collective. No synthetic polish, retaining natural nutrients and irresistible aroma.',
        badges: ['Freshly Milled', 'Aromatic Pandan', 'Farmgate Direct'],
        bgImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1400&q=80'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • BULK WHOLESALE SACKS',
        headline: '📦 25kg & 50kg Sacks Dispatched Direct from Depot',
        subtext: 'Direct mill prices for restaurants, catering, and community pantries with fast delivery across Luzon.',
        badges: ['25kg & 50kg Bulk', 'Depot Dispatch', 'Fair Producer Return'],
        bgImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1400&q=80'
      }
    ]
  },
  'farmer-jun': {
    farmName: 'Kuya Jun Villanueva — Villanueva Mango Orchard',
    location: 'Jordan, Guimaras',
    avatar: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300',
    actionLink: 'marketplace.html?category=Fruits',
    actionText: 'Order Mangoes Direct',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • CERTIFIED GUIMARAS SOIL',
        headline: '🥭 World-Famous Guimaras Sweet Carabao Mangoes',
        subtext: 'Naturally pollinated on the sunlit hills of Jordan, Guimaras. Tested and guaranteed 16°+ Brix natural sweetness.',
        badges: ['Guimaras Sweetest', '16°+ Brix Nectar', 'Bio-Quarantine Certified'],
        bgImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=1400&q=80'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • TREE-RIPENED EXPORT HARVEST',
        headline: '✨ Hand-Graded Export Quality with Zero Artificial Ripening',
        subtext: 'Picked tree-ripe without chemical carbide baths. Golden, juicy, fiber-free mango flesh direct from Kuya Jun orchard.',
        badges: ['Tree-Ripened', 'Export Grade A', 'Hand-Selected'],
        bgImage: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1400&q=80'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • AIR CARGO TO YOUR DOOR',
        headline: '✈️ Express Direct Flight to NCR & Cebu Buyers',
        subtext: 'Direct cargo shipment ensuring crisp freshness upon arrival. Perfect for premium gifting and commercial bakeries.',
        badges: ['Air Express', 'Guaranteed Sweetness', 'Zero Middlemen'],
        bgImage: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=1400&q=80'
      }
    ]
  },
  'farmer-marites': {
    farmName: 'Ate Marites Sarmiento — Sarmiento Coastal Catch',
    location: 'Dagupan & Navotas',
    avatar: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=300',
    actionLink: 'marketplace.html?category=Fish',
    actionText: 'Order Fresh Catch Direct',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • BRACKISH WATER TERROIR',
        headline: '🐟 Dagupan Boneless Milkfish & Tiger Prawns',
        subtext: 'Bred in the pristine brackish estuaries of Pangasinan. Known for tender belly fat and zero muddy taste.',
        badges: ['Dagupan Certified', 'Brackish Water', 'Daily Harvest'],
        bgImage: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=1400&q=80'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • 3:00 AM HARVEST',
        headline: '🌊 Hauled at Midnight & Iced Immediately',
        subtext: 'Packaged in ice slurry right at the water edge to lock in sea freshness. De-boned by master local processors.',
        badges: ['Sub-Zero Icing', 'De-boned On-Site', '0% Middleman Cut'],
        bgImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1400&q=80'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • INSULATED VAN DISPATCH',
        headline: '🚛 Delivered to Manila Seafood Hubs in 4 Hours',
        subtext: 'Fast insulated delivery for palengke vendors, restaurants, and retail shoppers looking for true portside pricing.',
        badges: ['Insulated Van', 'Portside Pricing', 'Fresh Guarantee'],
        bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80'
      }
    ]
  },
  'farmer-berting': {
    farmName: 'Tatay Berting Lopez — Lopez Coconut & Root Farm',
    location: 'Lucban, Quezon',
    avatar: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300',
    actionLink: 'marketplace.html?category=Vegetables',
    actionText: 'Order Coconut & Ube Direct',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • MT. BANAHAW VOLCANIC SLOPES',
        headline: '🥥 Rich Coconut Groves & Mountain Ube Tubers',
        subtext: 'Organically grown along the fertile foot of Mt. Banahaw. Abundant rainfall and mineral-rich volcanic soil.',
        badges: ['Banahaw Soil', '100% Organic', 'Generational Farm'],
        bgImage: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=1400&q=80'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • FRESH COLD-PRESSED & SORTED',
        headline: '🌿 Fresh Buko, Cold-Pressed Coconut Oil & Vivid Ube',
        subtext: 'Harvested fresh from tree canopy and harvested tubers sorted with care. Zero chemical additives or bleaching.',
        badges: ['Cold-Pressed', 'Rich Aromatics', 'True Farmgate Price'],
        bgImage: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1400&q=80'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • DIRECT EXPRESS LOGISTICS',
        headline: '📦 Dispatched Weekly to Commercial Bakers & Markets',
        subtext: 'Wholesale deliveries direct to bakeries, kakanin makers, and organic markets at guaranteed fair producer returns.',
        badges: ['Direct Wholesale', 'Bulk Available', 'Zero Middlemen'],
        bgImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=1400&q=80'
      }
    ]
  },
  'farmer-cora': {
    farmName: 'Nanay Cora Aquino — Aquino Poultry Yard',
    location: 'Silang, Cavite',
    avatar: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300',
    actionLink: 'marketplace.html?category=Poultry',
    actionText: 'Order Free-Range Eggs Direct',
    scenes: [
      {
        sceneNum: 1,
        timeSpan: '0s - 5s',
        sceneTag: 'SCENE 1/3 • OPEN-PASTURE CANOPY',
        headline: '🥚 Pasture-Raised Free-Range Eggs & Native Poultry',
        subtext: 'Roamed freely under Cavite fruit tree orchards with clean natural forage, sunlight, and mountain air.',
        badges: ['Open Pasture', 'Cage-Free', 'Non-GMO Feed'],
        bgImage: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1400&q=80'
      },
      {
        sceneNum: 2,
        timeSpan: '5s - 10s',
        sceneTag: 'SCENE 2/3 • COLLECTED TWICE DAILY',
        headline: '🍳 Deep Golden Yolks Rich in Natural Omega-3',
        subtext: 'Collected morning and afternoon by Nanay Cora. Unwashed protective cuticle preserved for superior shelf-life.',
        badges: ['Golden Yolks', 'Rich Omega-3', 'Zero Hormones'],
        bgImage: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=1400&q=80'
      },
      {
        sceneNum: 3,
        timeSpan: '10s - 15s',
        sceneTag: 'SCENE 3/3 • CRATE DELIVERY TO NCR',
        headline: '🚚 Dispatched in Shock-Proof Egg Crates Direct',
        subtext: 'Direct delivery to residential co-ops, artisan bakeries, and brunch cafes at honest producer prices.',
        badges: ['Shock-Proof Crates', 'Direct to Door', 'Fair Farmgate Price'],
        bgImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1400&q=80'
      }
    ]
  }
};

/* ============================================================ */
/* Storage & Active Ad Helpers (with Expiration Check)          */
/* ============================================================ */
function getActiveAiGeneration() {
  const json = localStorage.getItem('agri_ai_ad_generation');
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch (e) {
    console.warn('Error parsing AI generation state:', e);
    return null;
  }
}

function getActiveSponsoredAds() {
  const customAdJson = localStorage.getItem('agri_custom_sponsor_ad');
  if (customAdJson) {
    try {
      const customAd = JSON.parse(customAdJson);

      // Check package duration expiration
      if (customAd.expiresAt && Date.now() > customAd.expiresAt) {
        console.info('Subscriber ad package has expired after full homepage duration:', customAd.id);
        localStorage.removeItem('agri_custom_sponsor_ad');
        localStorage.removeItem('agri_active_subscription');
        return DEFAULT_SPONSORED_ADS;
      }

      // Calculate and format real remaining days
      if (customAd.expiresAt) {
        const msLeft = customAd.expiresAt - Date.now();
        const daysLeft = Math.max(1, Math.ceil(msLeft / (24 * 3600 * 1000)));
        const totalDays = customAd.durationDays || 7;
        customAd.durationBadge = `🗓️ ${totalDays}-Day Homepage Feature (${daysLeft}d left)`;
      }

      return [customAd, ...DEFAULT_SPONSORED_ADS];
    } catch (e) {
      console.warn('Error parsing custom sponsor ad', e);
      return DEFAULT_SPONSORED_ADS;
    }
  }
  return DEFAULT_SPONSORED_ADS;
}

/* ============================================================ */
/* Lifecycle Initializer                                        */
/* ============================================================ */
function initSponsoredTopAd() {
  const container = document.getElementById('sponsoredAdContent');
  if (!container) return;

  // Check if an AI generation is currently pending (5-10 min pipeline)
  const aiJob = getActiveAiGeneration();
  if (aiJob) {
    if (Date.now() >= aiJob.readyAt) {
      finalizeAiVideoGeneration(aiJob);
    } else {
      renderAiStudioPipeline(aiJob);
      startAiPipelineTrackingLoop();
      return;
    }
  }

  renderCurrentSponsoredAd(true);
  startAdCountdownLoop();

  const card = document.getElementById('sponsoredAdCard');
  if (card) {
    card.addEventListener('mouseenter', () => {
      if (!isManualPause) {
        isAdPaused = true;
        updatePauseUI();
      }
    });
    card.addEventListener('mouseleave', () => {
      if (!isManualPause) {
        isAdPaused = false;
        updatePauseUI();
      }
    });
  }
}

/* ============================================================ */
/* AI Video Generation Pipeline (5-10 min wait time)            */
/* ============================================================ */
function generateAiVideoAdData(farmKey, customName, customLoc, tier, durationDays, price) {
  let preset = FARM_CATALOG_PRESETS[farmKey];

  if (!preset) {
    const safeFarmName = customName || 'Verified Philippine Agri Collective';
    const safeLocation = customLoc || 'Philippines';
    preset = {
      farmName: safeFarmName,
      location: safeLocation,
      avatar: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=300',
      actionLink: 'marketplace.html',
      actionText: 'Explore Direct Harvest',
      scenes: [
        {
          sceneNum: 1,
          timeSpan: '0s - 5s',
          sceneTag: 'SCENE 1/3 • PROVENANCE & SOIL TERROIR',
          headline: `🌱 100% Direct Farmgate from ${safeLocation}`,
          subtext: `Verified agricultural provenance and regenerative cultivation practices. Straight from ${safeFarmName}.`,
          badges: ['Direct Origin', 'Verified Producer', 'Zero Middlemen'],
          bgImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80'
        },
        {
          sceneNum: 2,
          timeSpan: '5s - 10s',
          sceneTag: 'SCENE 2/3 • FRESH MORNING HARVEST',
          headline: '✨ Harvested at Peak Quality with Fair Returns',
          subtext: 'Chemical-free handling, carefully sorted and packaged to protect nutrient density and natural freshness.',
          badges: ['Peak Freshness', 'Fair Farmgate Return', 'Direct Trade Certified'],
          bgImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1400&q=80'
        },
        {
          sceneNum: 3,
          timeSpan: '10s - 15s',
          sceneTag: 'SCENE 3/3 • EXPRESS DISPATCH & ORDER',
          headline: '🚚 Direct Delivery to Wholesale & Retail Buyers',
          subtext: 'Connect directly with local producers. Guaranteed honest prices and reliable cargo delivery.',
          badges: ['Fast Delivery', 'Wholesale & Retail', 'Zero Middlemen'],
          bgImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80'
        }
      ]
    };
  }

  let tierBadge = '⭐ VIP Grower Sponsor';
  let tierLabel = 'Monthly Grower Pro';
  if (tier === 'weekly') {
    tierBadge = '🌟 Featured Harvest Flash';
    tierLabel = 'Weekly Flash';
  } else if (tier === 'yearly') {
    tierBadge = '🏆 Annual Champion Sponsor';
    tierLabel = 'Yearly Champion Co-Op';
  }

  const durationLabel = durationDays === 7 ? '1 Week Homepage Feature' : durationDays === 30 ? '1 Month Homepage Feature' : '1 Year Homepage Feature';
  const expiresAt = Date.now() + (durationDays * 24 * 60 * 60 * 1000);

  const farmerName = String(preset.farmName || '').split(' — ')[0].trim() || preset.farmName;
  const salesSeed = getAdSalesFigures({ farmerName });

  return {
    id: 'ai-gen-commercial-' + Date.now(),
    tierName: tierLabel,
    tierBadge: tierBadge,
    durationBadge: `🗓️ ${durationLabel}`,
    durationDays: durationDays,
    expiresAt: expiresAt,
    farmName: preset.farmName,
    farmerName: farmerName,
    totalSales: salesSeed.totalSales,
    ordersCompleted: salesSeed.ordersCompleted,
    location: preset.location,
    avatar: preset.avatar,
    scenes: preset.scenes,
    actionText: preset.actionText,
    actionLink: preset.actionLink
  };
}

function startAiVideoGeneration(adData, durationDays, price, farmName, tier) {
  // Realistic 5-10 minute wait period (7 minutes = 420,000 ms)
  const totalDurationMs = 7 * 60 * 1000;
  const now = Date.now();

  const aiJob = {
    id: 'job-' + now,
    farmName: farmName,
    tier: tier,
    price: price,
    durationDays: durationDays,
    startedAt: now,
    readyAt: now + totalDurationMs,
    totalDurationMs: totalDurationMs,
    adData: adData,
    status: 'processing'
  };

  localStorage.setItem('agri_ai_ad_generation', JSON.stringify(aiJob));

  // Stop previous commercial video timers while rendering
  if (adTickInterval) clearInterval(adTickInterval);
  if (adProgressInterval) clearInterval(adProgressInterval);

  renderAiStudioPipeline(aiJob);
  startAiPipelineTrackingLoop();

  showToast(`✨ AI Commercial synthesis initiated! AgriMate AI is rendering your 15-second 4K video. Finalization takes 5–10 minutes — tracking live status below.`);

  const adSection = document.getElementById('sponsoredTopAdSection');
  if (adSection) {
    adSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    setTimeout(() => {
      window.location.href = 'index.html#sponsoredTopAdSection';
    }, 1200);
  }
}

function renderAiStudioPipeline(aiJob) {
  const container = document.getElementById('sponsoredAdContent');
  if (!container) return;

  const now = Date.now();
  const msLeft = Math.max(0, aiJob.readyAt - now);
  const totalMs = aiJob.totalDurationMs || (7 * 60 * 1000);
  const elapsed = Math.max(0, now - aiJob.startedAt);
  const pct = Math.min(99, Math.max(8, Math.floor((elapsed / totalMs) * 100)));

  const mins = Math.floor(msLeft / 60000);
  const secs = Math.floor((msLeft % 60000) / 1000);
  const timeFormatted = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

  // Update timer display & duration tag in top header
  const timerDisplay = document.getElementById('adTimerDisplay');
  if (timerDisplay) {
    timerDisplay.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span>AI Queue: ${timeFormatted} left</span>
    `;
  }

  const durationTag = document.getElementById('adDurationBadge');
  if (durationTag) {
    durationTag.innerHTML = `⚙️ Rendering 15s Commercial • ${aiJob.durationDays} Days Active Upon Finalization`;
  }

  const steps = [
    { title: '1. Terroir Analysis', desc: 'Scanning farm altitude, soil type & verified produce catalog', at: 20 },
    { title: '2. 4K Scene Cuts', desc: 'Synthesizing 3 cinematic 5-second scenes & sunrise sweeps', at: 45 },
    { title: '3. Kinetic Typography', desc: 'Generating modern lower-third text & zero-middleman badges', at: 70 },
    { title: '4. Commercial Audio', desc: 'Mastering broadcast-grade audio track & rhythm timing', at: 90 },
    { title: '5. Homepage Dispatch', desc: 'Finalizing 15-second video file & encoding for homepage showcase', at: 100 }
  ];

  const stepsHtml = steps.map(s => {
    let stateClass = '';
    let stateIcon = '⏳';
    if (pct >= s.at) {
      stateClass = 'done';
      stateIcon = '✓';
    } else if (pct >= s.at - 25) {
      stateClass = 'active';
      stateIcon = '⚡';
    }
    return `
      <div class="ai-step-item ${stateClass}">
        <span style="font-weight: 800;">${stateIcon}</span>
        <div>
          <div style="font-weight: 700;">${escapeHtml(s.title)}</div>
          <div style="font-size: 0.68rem; opacity: 0.85;">${escapeHtml(s.desc)}</div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="ai-studio-gen-card">
      <div class="ai-studio-gen-header">
        <div>
          <span style="background: rgba(16, 185, 129, 0.2); border: 1px solid #34d399; color: #a7f3d0; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 9999px; text-transform: uppercase;">
            ✨ AgriMate AI Studio • Automated Synthesis
          </span>
          <h3 style="margin: 0.4rem 0 0.15rem; font-size: 1.25rem; font-weight: 800; color: #ffffff;">
            Rendering 15-Second Modern Video Commercial for ${escapeHtml(aiJob.farmName)}
          </h3>
          <p style="margin: 0; font-size: 0.8rem; color: #cbd5e1;">
            Zero manual creative input needed. The AI engine is assembling a 15-second multi-scene promotional video ad.
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.35rem; font-weight: 800; color: #fde047; font-variant-numeric: tabular-nums;">
            ${timeFormatted}
          </div>
          <span style="font-size: 0.72rem; color: #94a3b8;">Est. Finalization (5–10 mins)</span>
        </div>
      </div>

      <!-- Animated Progress Bar -->
      <div class="ai-studio-progress-track">
        <div class="ai-studio-progress-fill" style="width: ${pct}%;"></div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 0.75rem; color: #a7f3d0;">
        <span>Progress: <strong>${pct}%</strong> completed</span>
        <span>Package: <strong>${escapeHtml(aiJob.tier.toUpperCase())} (${aiJob.durationDays} Days Homepage Visibility)</strong></span>
      </div>

      <!-- 5-Step Pipeline Grid -->
      <div class="ai-studio-steps-grid">
        ${stepsHtml}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 1rem;">
        <span style="font-size: 0.75rem; color: #e2e8f0;">
          💡 <em>Once finalized, your ad automatically appears right here at the top of the homepage and stays for ${aiJob.durationDays} days.</em>
        </span>
        <button type="button" onclick="expediteAiVideoRender()" class="btn-primary" style="font-size: 0.78rem; padding: 0.45rem 0.95rem; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; font-weight: 800; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4);" title="Complete AI synthesis immediately for instant testing">
          ⚡ Expedite AI Render (Instant Preview)
        </button>
      </div>
    </div>
  `;
}

function startAiPipelineTrackingLoop() {
  if (aiPipelineInterval) clearInterval(aiPipelineInterval);

  aiPipelineInterval = setInterval(() => {
    const aiJob = getActiveAiGeneration();
    if (!aiJob) {
      clearInterval(aiPipelineInterval);
      return;
    }

    if (Date.now() >= aiJob.readyAt) {
      clearInterval(aiPipelineInterval);
      finalizeAiVideoGeneration(aiJob);
    } else {
      renderAiStudioPipeline(aiJob);
    }
  }, 1000);
}

function expediteAiVideoRender() {
  const aiJob = getActiveAiGeneration();
  if (!aiJob) return;

  aiJob.readyAt = Date.now() - 1000;
  localStorage.setItem('agri_ai_ad_generation', JSON.stringify(aiJob));

  if (aiPipelineInterval) clearInterval(aiPipelineInterval);
  finalizeAiVideoGeneration(aiJob);
}

function finalizeAiVideoGeneration(aiJob) {
  // Store custom sponsor ad and subscription record
  localStorage.setItem('agri_custom_sponsor_ad', JSON.stringify(aiJob.adData));
  localStorage.setItem('agri_active_subscription', JSON.stringify({
    tier: aiJob.tier,
    price: aiJob.price,
    farmName: aiJob.farmName,
    durationDays: aiJob.durationDays,
    expiresAt: aiJob.adData.expiresAt,
    activatedAt: new Date().toISOString()
  }));

  localStorage.removeItem('agri_ai_ad_generation');

  showToast(`🎉 AI Commercial Finalized! Your 15-second video is now live at the top of the homepage for ${aiJob.durationDays} days!`);

  // Reset ad showcase to show the new custom ad at index 0
  currentAdIndex = 0;
  adSecondsRemaining = AD_DURATION_SECONDS;
  currentRenderedSceneIndex = -1;
  currentRenderedAdId = null;

  renderCurrentSponsoredAd(true);
  startAdCountdownLoop();
}

/* ============================================================ */
/* 15-Second Video Ad Commercial Playback Engine               */
/* ============================================================ */
function startAdCountdownLoop() {
  if (adTickInterval) clearInterval(adTickInterval);
  if (adProgressInterval) clearInterval(adProgressInterval);

  adSecondsRemaining = AD_DURATION_SECONDS;
  updateTimerDisplay();

  adProgressInterval = setInterval(() => {
    if (!isAdPaused) {
      const bar = document.getElementById('adTimerProgressBar');
      if (bar) {
        // Progress runs smoothly across the 15 seconds
        const pct = Math.max(0, ((15 - adSecondsRemaining) / 15) * 100);
        bar.style.width = pct + '%';
      }
    }
  }, 100);

  adTickInterval = setInterval(() => {
    if (!isAdPaused) {
      adSecondsRemaining--;

      // Determine which scene (0-5s = Scene 1, 5-10s = Scene 2, 10-15s = Scene 3)
      const elapsed = AD_DURATION_SECONDS - adSecondsRemaining;
      const targetSceneIdx = Math.min(2, Math.floor(elapsed / 5));

      if (targetSceneIdx !== currentRenderedSceneIndex) {
        renderCurrentSponsoredAd(false);
      }

      updateTimerDisplay();
      updateSceneTimelineDots(targetSceneIdx);

      if (adSecondsRemaining <= 0) {
        nextSponsoredAd(true);
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerDisplay = document.getElementById('adTimerDisplay');
  if (timerDisplay) {
    const elapsed = AD_DURATION_SECONDS - adSecondsRemaining;
    const currentScene = Math.min(3, Math.floor(elapsed / 5) + 1);
    timerDisplay.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span>Scene ${currentScene}/3 • ${Math.max(1, adSecondsRemaining)}s remaining</span>
    `;
  }
}

function updateSceneTimelineDots(activeIdx) {
  const dots = document.querySelectorAll('.scene-timeline-dots .scene-dot');
  dots.forEach((dot, idx) => {
    if (idx === activeIdx) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function seekAdScene(startSecond) {
  // 0s => Scene 1 (15s remaining)
  // 5s => Scene 2 (10s remaining)
  // 10s => Scene 3 (5s remaining)
  adSecondsRemaining = Math.max(1, AD_DURATION_SECONDS - startSecond);
  renderCurrentSponsoredAd(false);
  updateTimerDisplay();
  const activeIdx = Math.min(2, Math.floor(startSecond / 5));
  updateSceneTimelineDots(activeIdx);
}

// Returns the farmer's sales figures for an ad (falls back to a stable
// name-seeded figure for newly generated subscriber ads without history)
function getAdSalesFigures(ad) {
  if (ad && typeof ad.totalSales === 'number') {
    return { totalSales: ad.totalSales, ordersCompleted: ad.ordersCompleted || 0 };
  }
  const name = String((ad && (ad.farmerName || ad.farmName)) || 'AgriConnect Farmer');
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return {
    totalSales: 150000 + (hash % 850000),
    ordersCompleted: 400 + (hash % 2600)
  };
}

function getAdFarmerName(ad) {
  if (ad.farmerName) return ad.farmerName;
  return String(ad.farmName || 'AgriConnect Farmer').split(' — ')[0].trim();
}

function renderCurrentSponsoredAd(forceFullRebuild = false) {
  const container = document.getElementById('sponsoredAdContent');
  if (!container) return;

  const ads = getActiveSponsoredAds();
  if (currentAdIndex >= ads.length) currentAdIndex = 0;
  if (currentAdIndex < 0) currentAdIndex = ads.length - 1;

  const ad = ads[currentAdIndex];
  const elapsed = AD_DURATION_SECONDS - adSecondsRemaining;
  const sceneIdx = Math.min(2, Math.floor(elapsed / 5));
  const scenes = ad.scenes || [];
  const scene = scenes[sceneIdx] || scenes[0] || {};

  currentRenderedSceneIndex = sceneIdx;
  currentRenderedAdId = ad.id;

  const farmerName = getAdFarmerName(ad);
  const sales = getAdSalesFigures(ad);

  // Minimal ad: only the farmer's name and sales figures over the video background
  container.innerHTML = `
    <div class="video-commercial-reel ad-minimal-reel" id="videoReelStage">
      <img src="${escapeHtml(scene.bgImage || ad.avatar || 'assets/logo.png')}" alt="${escapeHtml(farmerName)}" class="video-scene-bg">
      <div class="video-cinematic-overlay"></div>

      <div class="ad-minimal-info">
        <h3 class="ad-minimal-name">${escapeHtml(farmerName)}</h3>
        <div class="ad-minimal-sales">
          <div class="ad-minimal-stat">
            <span class="ad-minimal-value">₱${Number(sales.totalSales).toLocaleString()}</span>
            <span class="ad-minimal-label">Total Sales</span>
          </div>
          <div class="ad-minimal-divider"></div>
          <div class="ad-minimal-stat">
            <span class="ad-minimal-value">${Number(sales.ordersCompleted).toLocaleString()}</span>
            <span class="ad-minimal-label">Orders Sold</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function nextSponsoredAd(isAuto = false) {
  const ads = getActiveSponsoredAds();
  currentAdIndex = (currentAdIndex + 1) % ads.length;
  adSecondsRemaining = AD_DURATION_SECONDS;
  currentRenderedSceneIndex = -1;
  renderCurrentSponsoredAd(true);
  updateTimerDisplay();
}

function prevSponsoredAd() {
  const ads = getActiveSponsoredAds();
  currentAdIndex = (currentAdIndex - 1 + ads.length) % ads.length;
  adSecondsRemaining = AD_DURATION_SECONDS;
  currentRenderedSceneIndex = -1;
  renderCurrentSponsoredAd(true);
  updateTimerDisplay();
}

function togglePauseAdShowcase() {
  isManualPause = !isManualPause;
  isAdPaused = isManualPause;
  updatePauseUI();
}

function updatePauseUI() {
  const icon = document.getElementById('adPauseIcon');
  const btn = document.getElementById('adPauseBtn');
  if (icon) {
    icon.textContent = isAdPaused ? '▶️' : '⏸️';
  }
  if (btn) {
    btn.title = isAdPaused ? 'Resume 15s Commercial' : 'Pause 15s Commercial';
  }
}

/* ============================================================ */
/* Commercial Audio Synthesizer (Web Audio API)                */
/* ============================================================ */
function toggleAdAudioSound() {
  const btn = document.getElementById('adSoundBtn');
  const icon = document.getElementById('adSoundIcon');

  if (isCommercialAudioPlaying) {
    stopCommercialAudio();
    if (btn) btn.classList.remove('sound-active');
    if (icon) icon.textContent = '🔇';
    isCommercialAudioPlaying = false;
  } else {
    startCommercialAudio();
    if (btn) btn.classList.add('sound-active');
    if (icon) icon.textContent = '🔊';
    isCommercialAudioPlaying = true;
  }
}

function startCommercialAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!commercialAudioCtx) {
      commercialAudioCtx = new AudioContext();
    }
    if (commercialAudioCtx.state === 'suspended') {
      commercialAudioCtx.resume();
    }

    commercialAudioGain = commercialAudioCtx.createGain();
    commercialAudioGain.gain.setValueAtTime(0.08, commercialAudioCtx.currentTime);
    commercialAudioGain.connect(commercialAudioCtx.destination);

    // Warm commercial harmonic arpeggio (C maj9: C4, E4, G4, B4, D5)
    const notes = [261.63, 329.63, 392.00, 493.88, 587.33, 493.88, 392.00];
    let noteIdx = 0;

    commercialAudioArpTimer = setInterval(() => {
      if (!isCommercialAudioPlaying || !commercialAudioCtx || commercialAudioCtx.state === 'closed') return;
      try {
        const osc = commercialAudioCtx.createOscillator();
        const noteGain = commercialAudioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], commercialAudioCtx.currentTime);
        noteIdx++;

        noteGain.gain.setValueAtTime(0.06, commercialAudioCtx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, commercialAudioCtx.currentTime + 0.85);

        osc.connect(noteGain);
        noteGain.connect(commercialAudioGain);

        osc.start();
        osc.stop(commercialAudioCtx.currentTime + 0.9);
      } catch (err) {
        // Safe catch for audio frame drops
      }
    }, 450);
  } catch (e) {
    console.warn('Commercial audio synthesis not supported or blocked:', e);
  }
}

function stopCommercialAudio() {
  if (commercialAudioArpTimer) {
    clearInterval(commercialAudioArpTimer);
    commercialAudioArpTimer = null;
  }
  if (commercialAudioGain && commercialAudioCtx) {
    try {
      commercialAudioGain.gain.linearRampToValueAtTime(0.001, commercialAudioCtx.currentTime + 0.1);
    } catch (e) {}
  }
}

/* ============================================================ */
/* Subscription Modal & AI Trigger (Zero Manual Work)           */
/* ============================================================ */
function openSubscribeModal(tier, price, planName, durationDays) {
  // Prevent buyers from opening subscription modal (buyers don't subscribe)
  if (window.AgriState?.user && window.AgriState.user.role !== 'farmer') {
    return;
  }
  const modal = document.getElementById('subscribeAdModal');
  if (!modal) return;

  const resolvedDuration = durationDays || (tier === 'weekly' ? 7 : tier === 'monthly' ? 30 : 365);

  const tierInput = document.getElementById('subTierInput');
  const priceInput = document.getElementById('subPriceInput');
  const durationInput = document.getElementById('subDurationDaysInput');
  const badge = document.getElementById('subModalPlanBadge');
  const title = document.getElementById('subModalTitle');
  const priceDisplay = document.getElementById('subModalPriceDisplay');
  const durationDisplay = document.getElementById('subModalDurationDisplay');

  if (tierInput) tierInput.value = tier;
  if (priceInput) priceInput.value = price;
  if (durationInput) durationInput.value = resolvedDuration;
  if (badge) badge.textContent = planName;
  if (title) title.textContent = `AI-Generated 15-Second Commercial (${planName})`;
  if (priceDisplay) priceDisplay.textContent = `₱${Number(price).toLocaleString()}`;
  if (durationDisplay) {
    durationDisplay.textContent = resolvedDuration === 7 ? '1 Week (7 Days)' : resolvedDuration === 30 ? '1 Month (30 Days)' : '1 Year (365 Days)';
  }

  modal.classList.add('open');
}

function closeSubscribeModal() {
  const modal = document.getElementById('subscribeAdModal');
  if (modal) modal.classList.remove('open');
}

function handleSubFarmChange() {
  const select = document.getElementById('subFarmSelect');
  const customWrap = document.getElementById('customFarmWrap');
  if (select && customWrap) {
    customWrap.style.display = (select.value === 'custom') ? 'block' : 'none';
  }
}

function handleSubscribeSubmit(e) {
  e.preventDefault();

  const tier = document.getElementById('subTierInput')?.value || 'weekly';
  const price = document.getElementById('subPriceInput')?.value || '200';
  const durationDays = parseInt(document.getElementById('subDurationDaysInput')?.value || '7', 10);
  const farmSelect = document.getElementById('subFarmSelect')?.value || 'farmer-ramon';
  const customName = document.getElementById('customFarmName')?.value?.trim();
  const customLoc = document.getElementById('customFarmLocation')?.value?.trim();

  // 100% Automated AI Creative Generation - zero manual copywriting required
  const generatedAd = generateAiVideoAdData(farmSelect, customName, customLoc, tier, durationDays, price);

  closeSubscribeModal();

  // Launch the 5-10 minute AI video synthesis pipeline
  startAiVideoGeneration(generatedAd, durationDays, price, generatedAd.farmName, tier);
}

/* ============================================================ */
/* 15. EXECUTIVE ADMIN CONSOLE & REAL-TIME INTERCONNECTED SYSTEM */
/* ============================================================ */

const ADMIN_ACCOUNT = {
  id: 'admin-krystel',
  full_name: 'Krystel Comia',
  email: 'comiakrystel@gmail.com',
  password: 'adminkrystel123',
  role: 'admin',
  is_admin: true,
  phone: '+63 917 123 4567',
  province: 'National Capital Region',
  city: 'Quezon City',
  address: 'AgriConnect National Operations Center, Quezon City, Metro Manila',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
  bio: 'Executive Platform Administrator & PhilGAP Compliance Director',
  createdAt: '2026-01-01T00:00:00.000Z'
};

function ensureAdminAccountExists() {
  try {
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    const exists = users.some(u => u && u.email && u.email.toLowerCase() === ADMIN_ACCOUNT.email.toLowerCase());
    if (!exists) {
      users.unshift(ADMIN_ACCOUNT);
      localStorage.setItem('agri_users', JSON.stringify(users));
    }
  } catch (e) {
    console.warn('Could not initialize admin account in agri_users:', e);
  }
}

// Auto-seed admin account immediately
ensureAdminAccountExists();

function autoLoginAsAdmin() {
  ensureAdminAccountExists();
  window.AgriState.user = ADMIN_ACCOUNT;
  window.AgriState.currentMode = 'admin';
  localStorage.setItem('agri_user', JSON.stringify(ADMIN_ACCOUNT));
  localStorage.setItem('agri_mode', 'admin');
  updateAuthUI();
  showToast('👑 Logged in as Executive Administrator Krystel Comia!');
  setTimeout(() => {
    window.location.href = 'admin.html';
  }, 400);
}

function fillAdminCredentials() {
  const form = document.querySelector('form[onsubmit*="handleLogin"]');
  if (form) {
    if (form.email) form.email.value = 'comiakrystel@gmail.com';
    if (form.password) form.password.value = 'adminkrystel123';
    showToast('Admin credentials filled: comiakrystel@gmail.com / adminkrystel123');
  }
}

// -------------------------------------------------------------
// HISTORICAL SHIPMENT LEDGER (past platform transactions)
// Self-contained records: every order total is derived from its own line items
// (qty x price) + flat delivery fee, so sales figures always reconcile.
// Orders are attributed to the registered buyer account (if one exists), so
// no fictitious customers are ever created.
// -------------------------------------------------------------
const HISTORICAL_SHIPMENT_LEDGER = [
  { id: 'AGRI-H1001', date: '2026-08-12', farmer_id: 'farmer-ramon', status_code: 'delivered', lines: [
    { id: 'prod-1', name: 'Baguio Beans', unit: 'kg', price: 95, quantity: 5 },
    { id: 'prod-2', name: 'Highland Cabbage', unit: 'kg', price: 70, quantity: 10 } ] },
  { id: 'AGRI-H1002', date: '2026-08-19', farmer_id: 'farmer-nena', status_code: 'delivered', lines: [
    { id: 'prod-4', name: 'Sinandomeng Rice (50kg Sack)', unit: 'sack', price: 2450, quantity: 2 },
    { id: 'prod-5', name: 'Dinorado Fragrant Rice', unit: 'kg', price: 62, quantity: 20 } ] },
  { id: 'AGRI-H1003', date: '2026-08-27', farmer_id: 'farmer-jun', status_code: 'delivered', lines: [
    { id: 'prod-3', name: 'Guimaras Carabao Mangoes', unit: 'kg', price: 180, quantity: 12 } ] },
  { id: 'AGRI-H1004', date: '2026-09-03', farmer_id: 'farmer-marites', status_code: 'delivered', lines: [
    { id: 'prod-6', name: 'Fresh Dagupan Bangus (Milkfish)', unit: 'kg', price: 210, quantity: 6 },
    { id: 'prod-7', name: 'Live Suahe (White Shrimp)', unit: 'kg', price: 420, quantity: 3 } ] },
  { id: 'AGRI-H1005', date: '2026-09-10', farmer_id: 'farmer-berting', status_code: 'delivered', lines: [
    { id: 'prod-12', name: 'Cold-Pressed Virgin Coconut Oil (500ml)', unit: 'bottle', price: 320, quantity: 4 },
    { id: 'prod-13', name: 'Fresh Buko (Young Coconut)', unit: 'piece', price: 45, quantity: 24 } ] },
  { id: 'AGRI-H1006', date: '2026-09-16', farmer_id: 'farmer-cora', status_code: 'delivered', lines: [
    { id: 'prod-8', name: 'Fresh Farm Eggs (30-pc Tray)', unit: 'tray', price: 260, quantity: 3 },
    { id: 'prod-9', name: 'Free-Range Native Chicken', unit: 'kg', price: 330, quantity: 2 } ] },
  { id: 'AGRI-H1007', date: '2026-09-22', farmer_id: 'farmer-ramon', status_code: 'delivered', lines: [
    { id: 'prod-15', name: 'Fresh Benguet Carrots', unit: 'kg', price: 85, quantity: 8 },
    { id: 'prod-11', name: 'Native Ginger (Luya)', unit: 'kg', price: 120, quantity: 2 } ] },
  { id: 'AGRI-H1008', date: '2026-09-28', farmer_id: 'farmer-nena', status_code: 'cancelled', lines: [
    { id: 'prod-10', name: 'Sweet Corn (Mais)', unit: 'piece', price: 20, quantity: 50 } ] },
  { id: 'AGRI-H1009', date: '2026-10-03', farmer_id: 'farmer-jun', status_code: 'delivered', lines: [
    { id: 'prod-3', name: 'Guimaras Carabao Mangoes', unit: 'kg', price: 180, quantity: 8 } ] },
  { id: 'AGRI-H1010', date: '2026-10-06', farmer_id: 'farmer-berting', status_code: 'delivered', lines: [
    { id: 'prod-14', name: 'Sweet Purple Camote (Sweet Potato)', unit: 'kg', price: 55, quantity: 10 },
    { id: 'prod-12', name: 'Cold-Pressed Virgin Coconut Oil (500ml)', unit: 'bottle', price: 320, quantity: 2 } ] },
  { id: 'AGRI-H1011', date: '2026-10-09', farmer_id: 'farmer-marites', status_code: 'in_transit', lines: [
    { id: 'prod-6', name: 'Fresh Dagupan Bangus (Milkfish)', unit: 'kg', price: 210, quantity: 4 } ] },
  { id: 'AGRI-H1012', date: '2026-10-10', farmer_id: 'farmer-cora', status_code: 'pending', lines: [
    { id: 'prod-16', name: 'Fresh Ripe Tomatoes (Kamatis)', unit: 'kg', price: 60, quantity: 10 },
    { id: 'prod-8', name: 'Fresh Farm Eggs (30-pc Tray)', unit: 'tray', price: 260, quantity: 2 } ] }
];

const HISTORICAL_STATUS_LABELS = {
  delivered: 'Delivered & Escrow Settled',
  in_transit: 'In Cold-Chain Transit',
  pending: 'Order Confirmed',
  cancelled: 'Order Cancelled'
};

// A "sale" is any order that was not cancelled; cancelled orders are refunded and excluded from sales totals.
function isSaleOrder(o) {
  if (!o) return false;
  return !(o.status_code === 'cancelled' || /cancel/i.test(o.status || ''));
}

// Upserts the historical ledger into the platform order store (idempotent; later admin status edits are preserved).
function ensureHistoricalShipments() {
  try {
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    const buyer = (Array.isArray(users) ? users : []).find(u =>
      u && u.id && u.role !== 'farmer' && u.role !== 'admin' && !u.is_admin &&
      !(u.email && u.email.toLowerCase() === ADMIN_ACCOUNT.email.toLowerCase())
    );
    if (!buyer) return;

    const farmers = getStoredFarmers();
    const newOrders = [];
    const master = JSON.parse(localStorage.getItem('agri_all_orders') || '[]');
    const masterIds = new Set((Array.isArray(master) ? master : []).map(o => o && o.id));

    HISTORICAL_SHIPMENT_LEDGER.forEach(h => {
      if (masterIds.has(h.id)) return;
      const farmer = farmers.find(f => f.id === h.farmer_id);
      if (!farmer) return;
      const items = h.lines.map(l => ({ ...l, farmer_name: farmer.farm_name, farmer_id: farmer.id }));
      const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const deliveryFee = 95;
      const total = subtotal + deliveryFee;
      const d = new Date(h.date + 'T09:00:00');
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const code = h.status_code;
      const address = [buyer.shipping_address || buyer.address, buyer.shipping_city || buyer.city].filter(Boolean).join(', ') || 'Metro Manila';
      newOrders.push({
        id: h.id,
        is_historical: true,
        buyer_id: buyer.id,
        date: dateStr,
        placed_at: dateStr + ', 09:00 AM',
        customerName: buyer.full_name,
        customer_name: buyer.full_name,
        phone: buyer.phone || '',
        customer_phone: buyer.phone || '',
        address: address,
        delivery_address: address,
        items: items,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total,
        total_amount: total,
        fulfillment: 'delivery',
        paymentMethod: 'AgriConnect Balance (Pay Now)',
        paymentStatus: code === 'delivered' ? 'Paid Direct (Escrow Cleared)' : (code === 'cancelled' ? 'Escrow Refunded to Buyer' : 'Paid - Escrow Held'),
        status: HISTORICAL_STATUS_LABELS[code],
        status_code: code,
        farmer_id: farmer.id,
        farmer_name: farmer.farm_name,
        origin: farmer.farm_name + ', ' + farmer.province,
        originProvince: farmer.province,
        destination: address
      });
    });

    if (newOrders.length === 0) return;
    localStorage.setItem('agri_all_orders', JSON.stringify([...(Array.isArray(master) ? master : []), ...newOrders]));

    // Mirror into the buyer's own order history so buyer / admin / tracking views agree
    ['agri_orders_', 'agri_buyer_orders_'].forEach(prefix => {
      const key = prefix + buyer.id;
      const own = JSON.parse(localStorage.getItem(key) || '[]');
      const ownArr = Array.isArray(own) ? own : [];
      const ownIds = new Set(ownArr.map(o => o && o.id));
      const merged = [...ownArr, ...newOrders.filter(o => !ownIds.has(o.id))];
      localStorage.setItem(key, JSON.stringify(merged));
    });
  } catch (e) {
    console.warn('Could not initialise historical shipments:', e);
  }
}

// Aggregates all buyer orders from all platform stores
function getAllPlatformOrders() {
  ensureHistoricalShipments();
  const orderMap = new Map();

  // 1. Check agri_all_orders (master transactions log)
  try {
    const masterOrders = JSON.parse(localStorage.getItem('agri_all_orders') || '[]');
    if (Array.isArray(masterOrders)) {
      masterOrders.forEach(o => {
        if (o && o.id) orderMap.set(o.id, { ...o });
      });
    }
  } catch (e) {}

  // 2. Check general agri_orders
  try {
    const genOrders = JSON.parse(localStorage.getItem('agri_orders') || '[]');
    if (Array.isArray(genOrders)) {
      genOrders.forEach(o => {
        if (o && o.id && !orderMap.has(o.id)) orderMap.set(o.id, { ...o });
      });
    }
  } catch (e) {}

  // 3. Scan all user-scoped orders in localStorage
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('agri_orders_') || key.startsWith('agri_buyer_orders_'))) {
        try {
          const userOrders = JSON.parse(localStorage.getItem(key) || '[]');
          if (Array.isArray(userOrders)) {
            userOrders.forEach(o => {
              if (o && o.id && !orderMap.has(o.id)) orderMap.set(o.id, { ...o });
            });
          }
        } catch (e) {}
      }
    }
  } catch (e) {}

  // 4. Scan agri_farmer_orders
  try {
    const farmerOrders = JSON.parse(localStorage.getItem('agri_farmer_orders') || '[]');
    if (Array.isArray(farmerOrders)) {
      farmerOrders.forEach(fo => {
        const key = fo.master_order_id || fo.id;
        if (key && !orderMap.has(key)) {
          orderMap.set(key, {
            id: key,
            date: fo.placed_at || new Date().toLocaleDateString('en-PH'),
            placed_at: fo.placed_at || 'Oct 9, 2026',
            customer_name: fo.customer_name || 'Verified Buyer',
            customer_phone: fo.customer_phone || '+63 927 183 6734',
            delivery_address: fo.delivery_address || 'Delivery Address, Metro Manila',
            items: fo.items || [],
            subtotal: fo.total_amount || 0,
            deliveryFee: 95,
            total: (fo.total_amount || 0) + 95,
            total_amount: (fo.total_amount || 0) + 95,
            fulfillment: 'delivery',
            paymentMethod: fo.payment_method || 'AgriConnect Balance (Pay Now)',
            paymentStatus: fo.payment_status || 'Paid Direct (Instant Auto-Deduction)',
            status: fo.status || 'Order Confirmed',
            status_code: fo.status_code || 'pending',
            farmer_name: fo.farmer_name || 'Benguet Organic Farm Hub',
            origin: fo.farmer_name || 'Benguet Organic Farm Hub',
            originProvince: 'Benguet',
            destination: fo.delivery_address || 'Metro Manila'
          });
        }
      });
    }
  } catch (e) {}

  // Only genuine buyer orders are listed; no fictitious seeded transactions.

  const ordersArray = Array.from(orderMap.values()).map(o => {
    const items = Array.isArray(o.items) ? o.items : [];
    const itemsSubtotal = items.reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0), 0);
    const subtotal = o.subtotal != null ? Number(o.subtotal) : itemsSubtotal;
    const deliveryFee = o.deliveryFee != null ? Number(o.deliveryFee) : 0;
    const total = o.total != null ? Number(o.total) : (o.total_amount != null ? Number(o.total_amount) : subtotal + deliveryFee);
    return {
      ...o,
      customerName: o.customerName || o.customer_name,
      phone: o.phone || o.customer_phone,
      address: o.address || o.delivery_address,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total
    };
  });
  return ordersArray.sort((a, b) => {
    const timeA = new Date(a.date || a.placed_at || 0).getTime();
    const timeB = new Date(b.date || b.placed_at || 0).getTime();
    return timeB - timeA;
  });
}

// Master Unified User Accounts Aggregator (Excludes system admin by default for customer/producer metrics)
function getAllPlatformUsers(includeAdmin = false) {
  const userMap = new Map();

  // 1. Seed Admin only if explicitly requested
  if (includeAdmin) {
    userMap.set(ADMIN_ACCOUNT.id, { ...ADMIN_ACCOUNT });
  }

  // 2. agri_users (excluding admin accounts)
  try {
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    if (Array.isArray(users)) {
      users.forEach(u => {
        if (u && u.id) {
          const isAdmin = u.role === 'admin' || u.is_admin || (u.email && u.email.toLowerCase() === ADMIN_ACCOUNT.email.toLowerCase());
          if (includeAdmin || !isAdmin) {
            userMap.set(u.id, { ...u });
          }
        }
      });
    }
  } catch (e) {}

  // 3. Stored farmers
  try {
    const farmers = getStoredFarmers();
    if (Array.isArray(farmers)) {
      farmers.forEach(f => {
        if (f && f.id && !userMap.has(f.id)) {
          userMap.set(f.id, {
            id: f.id,
            full_name: f.full_name,
            email: `${f.id.replace('farmer-', '')}@agriconnect.ph`,
            phone: f.phone || '+63 917 555 0192',
            role: 'farmer',
            farm_name: f.farm_name,
            province: f.province,
            city: f.city,
            specialty: f.specialty,
            verified: f.verified !== false,
            avatar: f.avatar,
            createdAt: '2026-01-01T00:00:00.000Z'
          });
        }
      });
    }
  } catch (e) {}

  return Array.from(userMap.values());
}

// Master Farmers Aggregator
function getAllPlatformFarmers() {
  const farmerMap = new Map();
  const allUsers = getAllPlatformUsers();
  
  allUsers.filter(u => u.role === 'farmer').forEach(u => {
    farmerMap.set(u.id, {
      ...u,
      farm_name: u.farm_name || `${u.full_name}'s Farm`,
      province: u.province || 'Benguet',
      verified: u.verified !== false
    });
  });

  const storedFarmers = getStoredFarmers();
  storedFarmers.forEach(f => {
    if (!farmerMap.has(f.id)) {
      farmerMap.set(f.id, { ...f, role: 'farmer', verified: f.verified !== false });
    }
  });

  return Array.from(farmerMap.values());
}

// Farmer Accreditation Requirements Store
function adminGetFarmerRequirements(farmerId) {
  const reqKey = 'agri_farmer_requirements';
  let allReqs = {};
  try {
    allReqs = JSON.parse(localStorage.getItem(reqKey) || '{}');
  } catch (e) {}

  if (allReqs[farmerId]) {
    return allReqs[farmerId];
  }

  const farmers = getAllPlatformFarmers();
  const farmer = farmers.find(f => f.id === farmerId) || { full_name: 'Farmer Partner', province: 'Benguet' };
  const isDefaultVerified = farmer.verified !== false;

  const defaultReqs = [
    {
      id: 'rsbsa',
      name: 'RSBSA Registration (DA Official Registry)',
      docNumber: 'RSBSA-CAR-2026-' + (farmerId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 90000 + 10000),
      issuingAgency: 'Department of Agriculture Regional Field Office CAR',
      dateSubmitted: 'Jan 15, 2026',
      status: isDefaultVerified ? 'verified' : 'pending_review',
      badge: isDefaultVerified ? 'Verified' : 'Under Review',
      docType: 'Registry Certificate',
      notes: 'Active Farmer Producer profile in DA RSBSA national agricultural registry.'
    },
    {
      id: 'gov_id',
      name: 'PhilSys National ID / Government Photo ID',
      docNumber: 'PSN-7492-9182-4821',
      issuingAgency: 'Philippine Statistics Authority (PSA)',
      dateSubmitted: 'Jan 15, 2026',
      status: isDefaultVerified ? 'verified' : 'pending_review',
      badge: isDefaultVerified ? 'Verified' : 'Under Review',
      docType: 'Government Identity Proof',
      notes: 'Verified biometric digital Philippine National ID.'
    },
    {
      id: 'brgy_cert',
      name: 'Barangay Land Tenancy & Farming Certification',
      docNumber: 'BLC-' + (farmer.province || 'LUZON').slice(0, 3).toUpperCase() + '-2026-084',
      issuingAgency: `Office of the Punong Barangay (${farmer.city || 'La Trinidad'}, ${farmer.province || 'Benguet'})`,
      dateSubmitted: 'Jan 16, 2026',
      status: isDefaultVerified ? 'verified' : 'pending_review',
      badge: isDefaultVerified ? 'Verified' : 'Under Review',
      docType: 'Land / Tenancy Clearance',
      notes: 'Certifies active bona fide farming cultivation of parcel land.'
    },
    {
      id: 'philgap',
      name: 'PhilGAP (Good Agricultural Practices) Safe Produce Clearance',
      docNumber: 'BPI-PhilGAP-2026-' + (farmerId.includes('ramon') ? '019' : farmerId.includes('maria') ? '024' : '048'),
      issuingAgency: 'Bureau of Plant Industry (BPI) - DA',
      dateSubmitted: 'Jan 18, 2026',
      status: isDefaultVerified ? 'verified' : 'pending_review',
      badge: isDefaultVerified ? 'Verified' : 'Under Review',
      docType: 'Agricultural Safety Compliance',
      notes: 'Pesticide residue limit & soil organic management compliant.'
    },
    {
      id: 'water_test',
      name: 'Farm Irrigation & Potability Microbiological Water Test',
      docNumber: 'DOST-PSTC-WT-9921',
      issuingAgency: 'DOST Regional Laboratory Services',
      dateSubmitted: 'Jan 18, 2026',
      status: isDefaultVerified ? 'verified' : 'pending_review',
      badge: isDefaultVerified ? 'Verified' : 'Under Review',
      docType: 'Laboratory Analysis Report',
      notes: 'E. coli & heavy metal free irrigation source compliant.'
    }
  ];

  allReqs[farmerId] = defaultReqs;
  localStorage.setItem(reqKey, JSON.stringify(allReqs));
  return defaultReqs;
}

function adminSaveFarmerRequirements(farmerId, reqs) {
  const reqKey = 'agri_farmer_requirements';
  let allReqs = {};
  try {
    allReqs = JSON.parse(localStorage.getItem(reqKey) || '{}');
  } catch (e) {}
  allReqs[farmerId] = reqs;
  localStorage.setItem(reqKey, JSON.stringify(allReqs));
}

// Approve a single requirement document
function adminApproveRequirement(farmerId, reqId) {
  const reqs = adminGetFarmerRequirements(farmerId);
  const target = reqs.find(r => r.id === reqId);
  if (target) {
    target.status = 'verified';
    target.badge = 'Verified';
    delete target.rejectReason;
    adminSaveFarmerRequirements(farmerId, reqs);
    showToast(`✓ Document "${target.name}" approved.`);
    
    // Check if all are now verified
    const allVerified = reqs.every(r => r.status === 'verified');
    if (allVerified) {
      adminSetFarmerVerificationStatus(farmerId, true);
    }
    refreshAdminData();
    openAdminFarmerReviewModal(farmerId);
  }
}

// Reject a single requirement document
function adminRejectRequirement(farmerId, reqId, reason) {
  const reqs = adminGetFarmerRequirements(farmerId);
  const target = reqs.find(r => r.id === reqId);
  if (target) {
    target.status = 'rejected';
    target.badge = 'Rejected';
    target.rejectReason = reason || 'Document image unclear or requires renewed accreditation.';
    adminSaveFarmerRequirements(farmerId, reqs);
    adminSetFarmerVerificationStatus(farmerId, false);
    showToast(`⚠️ Document "${target.name}" marked as rejected.`);
    refreshAdminData();
    openAdminFarmerReviewModal(farmerId);
  }
}

// Full Farmer Accreditation Approval
function adminApproveFarmerAccount(farmerId) {
  const reqs = adminGetFarmerRequirements(farmerId);
  reqs.forEach(r => {
    r.status = 'verified';
    r.badge = 'Verified';
    delete r.rejectReason;
  });
  adminSaveFarmerRequirements(farmerId, reqs);
  adminSetFarmerVerificationStatus(farmerId, true);
  showToast(`🎉 Farmer accreditation APPROVED! Full PhilGAP Verified status active across platform.`);
  refreshAdminData();
  closeAdminDocReviewModal();
}

// Full Farmer Rejection
function adminRejectFarmerAccount(farmerId, reason) {
  const reqs = adminGetFarmerRequirements(farmerId);
  reqs.forEach(r => {
    if (r.status !== 'verified') {
      r.status = 'rejected';
      r.badge = 'Rejected';
      r.rejectReason = reason || 'Accreditation documents incomplete.';
    }
  });
  adminSaveFarmerRequirements(farmerId, reqs);
  adminSetFarmerVerificationStatus(farmerId, false);
  showToast(`⚠️ Farmer verification rejected.`);
  refreshAdminData();
  closeAdminDocReviewModal();
}

// Synchronize Verification Status across all databases
function adminSetFarmerVerificationStatus(farmerId, isVerified) {
  // 1. Update agri_users
  try {
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    const u = users.find(x => x.id === farmerId);
    if (u) {
      u.verified = isVerified;
      u.verification_status = isVerified ? 'verified' : 'rejected';
      localStorage.setItem('agri_users', JSON.stringify(users));
    }
  } catch (e) {}

  // 2. Update agri_custom_farmers
  try {
    const customFarmers = JSON.parse(localStorage.getItem('agri_custom_farmers') || '[]');
    const cf = customFarmers.find(x => x.id === farmerId);
    if (cf) {
      cf.verified = isVerified;
      localStorage.setItem('agri_custom_farmers', JSON.stringify(customFarmers));
    }
  } catch (e) {}

  // 3. Update window.AgriState.farmers
  if (window.AgriState && Array.isArray(window.AgriState.farmers)) {
    const f = window.AgriState.farmers.find(x => x.id === farmerId);
    if (f) {
      f.verified = isVerified;
    }
  }

  // 4. If current logged in user is this farmer, update session
  if (window.AgriState?.user && window.AgriState.user.id === farmerId) {
    window.AgriState.user.verified = isVerified;
    window.AgriState.user.verification_status = isVerified ? 'verified' : 'rejected';
    localStorage.setItem('agri_user', JSON.stringify(window.AgriState.user));
    updateAuthUI();
  }
}

// Update Order Status across all platform databases
function adminUpdateOrderStatus(orderId, newStatus, newStatusCode) {
  const resolvedCode = newStatusCode || (newStatus.toLowerCase().includes('delivered') ? 'delivered' : newStatus.toLowerCase().includes('transit') ? 'in_transit' : 'to_deliver');
  
  // 1. Update agri_all_orders
  try {
    const allOrders = JSON.parse(localStorage.getItem('agri_all_orders') || '[]');
    const target = allOrders.find(o => o.id === orderId);
    if (target) {
      target.status = newStatus;
      target.status_code = resolvedCode;
      if (resolvedCode === 'delivered') {
        target.paymentStatus = 'Settled & Released to Farmer';
      }
      localStorage.setItem('agri_all_orders', JSON.stringify(allOrders));
    }
  } catch (e) {}

  // 2. Update all user-scoped orders
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('agri_orders_') || key.startsWith('agri_buyer_orders_'))) {
        try {
          const userOrders = JSON.parse(localStorage.getItem(key) || '[]');
          let changed = false;
          userOrders.forEach(o => {
            if (o.id === orderId) {
              o.status = newStatus;
              o.status_code = resolvedCode;
              if (resolvedCode === 'delivered') o.paymentStatus = 'Settled & Released to Farmer';
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem(key, JSON.stringify(userOrders));
          }
        } catch (e) {}
      }
    }
  } catch (e) {}

  // 3. Update agri_farmer_orders
  try {
    const farmerOrders = JSON.parse(localStorage.getItem('agri_farmer_orders') || '[]');
    let changed = false;
    farmerOrders.forEach(fo => {
      if (fo.master_order_id === orderId || fo.id === orderId || (fo.id && fo.id.startsWith(orderId))) {
        fo.status = newStatus;
        fo.status_code = resolvedCode;
        if (resolvedCode === 'delivered') fo.payment_status = 'Disbursed to Escrow Wallet';
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem('agri_farmer_orders', JSON.stringify(farmerOrders));
    }
  } catch (e) {}

  // 4. Update window.AgriState.orders if matches
  if (window.AgriState && Array.isArray(window.AgriState.orders)) {
    window.AgriState.orders.forEach(o => {
      if (o.id === orderId) {
        o.status = newStatus;
        o.status_code = resolvedCode;
      }
    });
  }

  showToast(`Order #${orderId} status updated to "${newStatus}"!`);
  refreshAdminData();
}

// Disburse Escrow Funds
function adminDisburseEscrow(orderId) {
  adminUpdateOrderStatus(orderId, 'Delivered & Escrow Settled', 'delivered');
  showToast(`💰 Escrow payment for Order #${orderId} successfully disbursed to farmer!`);
}

// Toggle Crop Catalog Availability
function adminToggleProductAvailability(productId) {
  const prod = (window.AgriState?.products || []).find(p => p.id === productId);
  if (prod) {
    prod.is_available = !prod.is_available;
    try {
      let customProducts = JSON.parse(localStorage.getItem('agri_custom_products') || '[]');
      const cp = customProducts.find(p => p.id === productId);
      if (cp) {
        cp.is_available = prod.is_available;
        localStorage.setItem('agri_custom_products', JSON.stringify(customProducts));
      }
    } catch (e) {}
    showToast(`Product "${prod.name}" marked as ${prod.is_available ? 'IN STOCK' : 'OUT OF STOCK'}.`);
    renderAdminProducts(document.getElementById('adminGlobalSearch')?.value || '');
  }
}

// Initialize Admin Dashboard Console
let adminActiveTab = 'transactions';
let adminTxFilter = 'all';
let adminFarmerFilter = 'all';
let adminUserFilter = 'all';

function initAdminDashboard() {
  const user = window.AgriState?.user;
  const lockContainer = document.getElementById('adminAuthLockContainer');
  const mainView = document.getElementById('adminMainView');

  const isAdmin = Boolean(user && (user.role === 'admin' || user.is_admin));

  if (!isAdmin) {
    if (lockContainer) lockContainer.style.display = 'block';
    if (mainView) mainView.style.display = 'none';
    return;
  }

  if (lockContainer) lockContainer.style.display = 'none';
  if (mainView) mainView.style.display = 'block';

  const userDisplayName = document.getElementById('adminUserDisplayName');
  if (userDisplayName) {
    userDisplayName.textContent = `${user.full_name} (${user.email}) • Admin`;
  }

  refreshAdminData();
}

function switchAdminTab(tabName) {
  adminActiveTab = tabName;

  // Toggle Tab Buttons
  const tabBtns = {
    transactions: document.getElementById('tabBtnTransactions'),
    farmers: document.getElementById('tabBtnFarmers'),
    users: document.getElementById('tabBtnUsers'),
    products: document.getElementById('tabBtnProducts')
  };

  Object.keys(tabBtns).forEach(k => {
    if (tabBtns[k]) {
      tabBtns[k].classList.toggle('active', k === tabName);
    }
  });

  // Toggle Sections
  const sections = {
    transactions: document.getElementById('adminSectionTransactions'),
    farmers: document.getElementById('adminSectionFarmers'),
    users: document.getElementById('adminSectionUsers'),
    products: document.getElementById('adminSectionProducts')
  };

  Object.keys(sections).forEach(k => {
    if (sections[k]) {
      sections[k].style.display = (k === tabName) ? 'block' : 'none';
    }
  });

  const searchVal = document.getElementById('adminGlobalSearch')?.value || '';
  handleAdminSearch(searchVal);
}

function handleAdminSearch(query) {
  const q = (query || '').trim().toLowerCase();
  if (adminActiveTab === 'transactions') {
    renderAdminTransactions(q, adminTxFilter);
  } else if (adminActiveTab === 'farmers') {
    renderAdminFarmers(q, adminFarmerFilter);
  } else if (adminActiveTab === 'users') {
    renderAdminUsers(q, adminUserFilter);
  } else if (adminActiveTab === 'products') {
    renderAdminProducts(q);
  }
}

function filterAdminTransactions(filter) {
  adminTxFilter = filter;
  const btns = {
    all: document.getElementById('txFilterAll'),
    pending: document.getElementById('txFilterPending'),
    in_transit: document.getElementById('txFilterTransit'),
    delivered: document.getElementById('txFilterDelivered'),
    cancelled: document.getElementById('txFilterCancelled')
  };
  Object.keys(btns).forEach(k => {
    if (btns[k]) {
      btns[k].className = (k === filter) ? 'btn-primary' : 'btn-secondary';
      btns[k].style.fontSize = '0.775rem';
      btns[k].style.padding = '0.35rem 0.75rem';
    }
  });
  renderAdminTransactions(document.getElementById('adminGlobalSearch')?.value || '', filter);
}

function filterAdminFarmers(filter) {
  adminFarmerFilter = filter;
  const btns = {
    all: document.getElementById('farmerFilterAll'),
    pending: document.getElementById('farmerFilterPending'),
    verified: document.getElementById('farmerFilterVerified')
  };
  Object.keys(btns).forEach(k => {
    if (btns[k]) {
      btns[k].className = (k === filter) ? 'btn-primary' : 'btn-secondary';
      btns[k].style.fontSize = '0.775rem';
      btns[k].style.padding = '0.35rem 0.75rem';
    }
  });
  renderAdminFarmers(document.getElementById('adminGlobalSearch')?.value || '', filter);
}

function filterAdminUsers(filter) {
  adminUserFilter = filter;
  const btns = {
    all: document.getElementById('userFilterAll'),
    farmer: document.getElementById('userFilterFarmer'),
    buyer: document.getElementById('userFilterBuyer')
  };
  Object.keys(btns).forEach(k => {
    if (btns[k]) {
      btns[k].className = (k === filter) ? 'btn-primary' : 'btn-secondary';
      btns[k].style.fontSize = '0.775rem';
      btns[k].style.padding = '0.35rem 0.75rem';
    }
  });
  renderAdminUsers(document.getElementById('adminGlobalSearch')?.value || '', filter);
}

function refreshAdminData() {
  const orders = getAllPlatformOrders();
  const farmers = getAllPlatformFarmers();
  const users = getAllPlatformUsers();
  const products = window.AgriState?.products || [];

  // 1. KPI Calculations
  const totalGMV = orders.filter(isSaleOrder).reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const kpiGMV = document.getElementById('kpiAdminTotalGMV');
  if (kpiGMV) kpiGMV.textContent = `₱${totalGMV.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const kpiOrders = document.getElementById('kpiAdminTotalOrders');
  if (kpiOrders) kpiOrders.textContent = `${orders.length} Orders`;

  const inTransitCount = orders.filter(o => o.status_code === 'in_transit' || (o.status && o.status.toLowerCase().includes('transit'))).length;
  const deliveredCount = orders.filter(o => o.status_code === 'delivered' || (o.status && o.status.toLowerCase().includes('delivered'))).length;
  const cancelledCount = orders.filter(o => !isSaleOrder(o)).length;
  const kpiOrdersSubtext = document.getElementById('kpiAdminOrdersSubtext');
  if (kpiOrdersSubtext) kpiOrdersSubtext.textContent = `${inTransitCount} In Transit • ${deliveredCount} Delivered • ${cancelledCount} Cancelled`;

  const pendingFarmersCount = farmers.filter(f => !f.verified).length;
  const kpiPending = document.getElementById('kpiAdminPendingVerifications');
  if (kpiPending) kpiPending.textContent = `${pendingFarmersCount} Pending`;

  const kpiUsers = document.getElementById('kpiAdminTotalUsers');
  if (kpiUsers) kpiUsers.textContent = `${users.length} Accounts`;

  const farmerCount = users.filter(u => u.role === 'farmer').length;
  const buyerCount = users.filter(u => u.role === 'buyer' || !u.role).length;
  const farmerText = farmerCount === 1 ? '1 Farmer' : `${farmerCount} Farmers`;
  const buyerText = buyerCount === 1 ? '1 Buyer' : `${buyerCount} Buyers`;
  const kpiUsersSubtext = document.getElementById('kpiAdminUsersSubtext');
  if (kpiUsersSubtext) kpiUsersSubtext.textContent = `${farmerText} • ${buyerText}`;

  const kpiCrops = document.getElementById('kpiAdminTotalCrops');
  if (kpiCrops) kpiCrops.textContent = `${products.length} Crops`;

  // Tab Badge Counters
  const countTx = document.getElementById('tabCountTransactions');
  if (countTx) countTx.textContent = orders.length;

  const countFarmers = document.getElementById('tabCountFarmers');
  if (countFarmers) countFarmers.textContent = farmers.length;

  const countUsers = document.getElementById('tabCountUsers');
  if (countUsers) countUsers.textContent = users.length;

  const countProducts = document.getElementById('tabCountProducts');
  if (countProducts) countProducts.textContent = products.length;

  // Render Sub-Views
  const searchVal = document.getElementById('adminGlobalSearch')?.value || '';
  renderAdminTransactions(searchVal, adminTxFilter);
  renderAdminFarmers(searchVal, adminFarmerFilter);
  renderAdminUsers(searchVal, adminUserFilter);
  renderAdminProducts(searchVal);
}

// -------------------------------------------------------------
// RENDER 1: BUYER TRANSACTIONS MASTER TABLE
// -------------------------------------------------------------
function renderAdminTransactions(searchQuery, statusFilter) {
  const tbody = document.getElementById('adminTransactionsTableBody');
  if (!tbody) return;

  let orders = getAllPlatformOrders();
  const q = (searchQuery || '').toLowerCase();
  const filter = statusFilter || 'all';

  if (filter === 'pending') {
    orders = orders.filter(o => o.status_code === 'pending' || (o.status && o.status.toLowerCase().includes('pending')));
  } else if (filter === 'in_transit') {
    orders = orders.filter(o => o.status_code === 'in_transit' || (o.status && o.status.toLowerCase().includes('transit')));
  } else if (filter === 'delivered') {
    orders = orders.filter(o => o.status_code === 'delivered' || (o.status && o.status.toLowerCase().includes('delivered')));
  } else if (filter === 'cancelled') {
    orders = orders.filter(o => !isSaleOrder(o));
  }

  if (q) {
    orders = orders.filter(o => {
      const matchId = (o.id || '').toLowerCase().includes(q);
      const matchBuyer = (o.customerName || '').toLowerCase().includes(q);
      const matchPhone = (o.phone || '').toLowerCase().includes(q);
      const matchAddr = (o.address || '').toLowerCase().includes(q);
      const matchOrigin = (o.origin || '').toLowerCase().includes(q);
      const matchItem = (o.items || []).some(it => (it.name || '').toLowerCase().includes(q));
      return matchId || matchBuyer || matchPhone || matchAddr || matchOrigin || matchItem;
    });
  }

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">No Buyer Transactions Found</div>
          <p style="font-size: 0.85rem; margin-top: 0.25rem;">No orders match the selected filters or search terms.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders.map(order => {
    const isPaid = (order.paymentStatus || '').toLowerCase().includes('paid') || (order.paymentStatus || '').toLowerCase().includes('settled');
    const isDelivered = (order.status_code === 'delivered') || (order.status || '').toLowerCase().includes('delivered');
    const isInTransit = (order.status_code === 'in_transit') || (order.status || '').toLowerCase().includes('transit');

    const isCancelled = !isSaleOrder(order);
    const statusPillClass = isCancelled ? 'background: #fee2e2; color: #dc2626; border: 1px solid #fecaca;' : isDelivered 
      ? 'background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;' 
      : isInTransit 
      ? 'background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd;' 
      : 'background: #fef3c7; color: #b45309; border: 1px solid #fde68a;';

    const itemsSummary = (order.items || []).map(it => {
      return `<div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.775rem; margin-bottom: 0.2rem;">
        <span style="font-weight: 700; color: var(--primary-deep);">${it.quantity}x</span>
        <span style="font-weight: 600; color: var(--text-main);">${it.name}</span>
        <span style="color: var(--text-muted);">(@ ₱${it.price}/${it.unit || 'kg'})</span>
      </div>`;
    }).join('');

    return `
      <tr>
        <td>
          <div style="font-weight: 800; font-family: monospace; font-size: 0.875rem; color: var(--primary-deep);">
            #${order.id}
          </div>
          <span style="font-size: 0.7rem; font-weight: 700; background: #f1f5f9; padding: 0.15rem 0.45rem; border-radius: 9999px; text-transform: uppercase; color: var(--text-secondary); display: inline-block; margin-top: 0.25rem;">
            ${order.fulfillment === 'pickup' ? 'Farmgate Pickup' : 'Cold-Chain Delivery'}
          </span>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--text-main);">${order.customerName || 'Verified Buyer'}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${order.phone || '09000000000'}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${order.address || ''}">
            📍 ${order.address || 'Metro Manila'}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">
            🗓️ ${order.date || 'Today'}
          </div>
        </td>
        <td>
          <div style="max-height: 90px; overflow-y: auto; padding-right: 0.25rem;">
            ${itemsSummary || '<span style="color: var(--text-muted); font-size: 0.75rem;">Direct Harvest Order</span>'}
          </div>
        </td>
        <td>
          <div style="font-weight: 700; font-size: 0.8rem; color: var(--text-main);">
            ${order.origin || 'Benguet Farm Hub'}
          </div>
          <div style="font-size: 0.725rem; color: var(--primary); font-weight: 600;">
            ✓ Verified Cold-Chain Route
          </div>
        </td>
        <td>
          <div style="font-size: 1rem; font-weight: 800; color: var(--primary-deep);">
            ₱${Number(order.total || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">
            Subtotal: ₱${Number(order.subtotal || 0).toLocaleString()} • Ship: ₱${order.deliveryFee || 95}
          </div>
        </td>
        <td>
          <div style="font-size: 0.75rem; font-weight: 700; color: ${isPaid ? '#15803d' : '#b45309'}; margin-bottom: 0.25rem;">
            ${order.paymentMethod || 'AgriConnect Balance'}
          </div>
          <span style="font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 9999px; ${isPaid ? 'background: #dcfce7; color: #15803d;' : 'background: #fef3c7; color: #b45309;'}">
            ${isPaid ? '✓ Direct Settled' : '⏳ Escrow Held'}
          </span>
        </td>
        <td>
          <span class="admin-status-pill" style="${statusPillClass}">
            ${order.status || 'Order Confirmed'}
          </span>
          <div style="margin-top: 0.4rem;">
            <select onchange="adminUpdateOrderStatus('${order.id}', this.value)" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); background: #ffffff; cursor: pointer;">
              <option value="" disabled selected>Update Status...</option>
              <option value="Order Confirmed">Order Confirmed</option>
              <option value="Harvesting at Farm">Harvesting at Farm</option>
              <option value="In Cold-Chain Transit">In Cold-Chain Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered & Escrow Settled">Delivered & Escrow Settled</option>
            </select>
          </div>
        </td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 0.35rem; justify-content: flex-end; flex-wrap: wrap;">
            <button onclick="openAdminReceiptModal('${order.id}')" class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; font-weight: 700;" title="View Full Receipt">
              🧾 Receipt
            </button>
            ${!isDelivered && !isCancelled ? `
              <button onclick="adminDisburseEscrow('${order.id}')" class="btn-primary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; font-weight: 700; background: #047857;" title="Disburse Escrow to Farmer">
                💰 Settle
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// -------------------------------------------------------------
// RENDER 2: FARMER ACCREDITATIONS & REQUIREMENTS
// -------------------------------------------------------------
function renderAdminFarmers(searchQuery, statusFilter) {
  const container = document.getElementById('adminFarmersListContainer');
  if (!container) return;

  let farmers = getAllPlatformFarmers();
  const q = (searchQuery || '').toLowerCase();
  const filter = statusFilter || 'all';

  if (filter === 'pending') {
    farmers = farmers.filter(f => !f.verified);
  } else if (filter === 'verified') {
    farmers = farmers.filter(f => f.verified);
  }

  if (q) {
    farmers = farmers.filter(f => {
      return (f.full_name || '').toLowerCase().includes(q) ||
             (f.farm_name || '').toLowerCase().includes(q) ||
             (f.province || '').toLowerCase().includes(q) ||
             (f.specialty || '').toLowerCase().includes(q) ||
             (f.email || '').toLowerCase().includes(q);
    });
  }

  if (farmers.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 1rem; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👨‍🌾</div>
        <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-main);">No Farmers Found</div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">Try adjusting the filter or search keyword.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = farmers.map(farmer => {
    const isVerified = farmer.verified !== false;
    const reqs = adminGetFarmerRequirements(farmer.id);
    const verifiedDocsCount = reqs.filter(r => r.status === 'verified').length;
    const allDocsVerified = verifiedDocsCount === reqs.length;

    const docBadgesHtml = reqs.map(r => {
      const isDocOk = r.status === 'verified';
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.65rem; background: ${isDocOk ? '#f0fdf4' : '#fffbeb'}; border: 1px solid ${isDocOk ? '#bbf7d0' : '#fde68a'}; border-radius: var(--radius-sm); font-size: 0.775rem;">
          <div style="display: flex; align-items: center; gap: 0.45rem;">
            <span>${isDocOk ? '✅' : '⏳'}</span>
            <span style="font-weight: 700; color: var(--text-main);">${r.name}</span>
          </div>
          <span style="font-size: 0.7rem; font-weight: 800; color: ${isDocOk ? '#15803d' : '#b45309'}; text-transform: uppercase;">
            ${isDocOk ? 'Verified' : 'Under Review'}
          </span>
        </div>
      `;
    }).join('');

    return `
      <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 1rem;">
        
        <!-- Farmer Header Row -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
          <div style="display: flex; gap: 1rem; align-items: center;">
            <img src="${farmer.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'}" alt="${farmer.full_name}" style="width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover; border: 2px solid var(--primary-light);">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin: 0;">
                  ${farmer.full_name}
                </h4>
                <span class="admin-status-pill" style="${isVerified ? 'background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;' : 'background: #fee2e2; color: #dc2626; border: 1px solid #fecaca;'}">
                  ${isVerified ? '✓ DA PhilGAP Accredited' : '⏳ Accreditation Pending'}
                </span>
              </div>
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-deep); margin-top: 0.15rem;">
                🏡 ${farmer.farm_name || `${farmer.full_name}'s Farm`} • 📍 ${farmer.province || 'Benguet, Philippines'}
              </div>
              <div style="font-size: 0.775rem; color: var(--text-muted); margin-top: 0.2rem;">
                📞 ${farmer.phone || '+63 900 000 0000'} • ✉️ ${farmer.email || `${farmer.id}@agriconnect.ph`}
              </div>
            </div>
          </div>

          <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: ${allDocsVerified ? '#15803d' : '#b45309'}; background: ${allDocsVerified ? '#f0fdf4' : '#fffbeb'}; padding: 0.25rem 0.65rem; border-radius: 9999px; border: 1px solid ${allDocsVerified ? '#bbf7d0' : '#fde68a'};">
              ${verifiedDocsCount} of ${reqs.length} Documents Approved
            </div>
            <button onclick="openAdminFarmerReviewModal('${farmer.id}')" class="btn-primary" style="font-size: 0.825rem; padding: 0.45rem 0.95rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>Review Requirements & Accreditations &rarr;</span>
            </button>
          </div>
        </div>

        <!-- 5 Accreditation Requirements Checklist Grid -->
        <div>
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Submitted Regulatory & Safety Filings
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.5rem;">
            ${docBadgesHtml}
          </div>
        </div>

      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// RENDER 3: USER ACCOUNTS DATABASE (BUYERS & FARMERS)
// -------------------------------------------------------------
function renderAdminUsers(searchQuery, roleFilter) {
  const tbody = document.getElementById('adminUsersTableBody');
  if (!tbody) return;

  let users = getAllPlatformUsers();
  const q = (searchQuery || '').toLowerCase();
  const filter = roleFilter || 'all';

  if (filter === 'farmer') {
    users = users.filter(u => u.role === 'farmer');
  } else if (filter === 'buyer') {
    users = users.filter(u => u.role === 'buyer' || !u.role);
  }

  if (q) {
    users = users.filter(u => {
      return (u.full_name || '').toLowerCase().includes(q) ||
             (u.email || '').toLowerCase().includes(q) ||
             (u.phone || '').toLowerCase().includes(q) ||
             (u.province || '').toLowerCase().includes(q) ||
             (u.city || '').toLowerCase().includes(q) ||
             (u.role || '').toLowerCase().includes(q);
    });
  }

  if (users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">👥</div>
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">No Accounts Found</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = users.map(user => {
    const isAdmin = user.role === 'admin' || user.is_admin;
    const isFarmer = user.role === 'farmer';

    const rolePill = isAdmin
      ? '<span style="background: #fee2e2; color: #dc2626; font-size: 0.725rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; border: 1px solid #fecaca;">👑 Admin</span>'
      : isFarmer
      ? '<span style="background: #dcfce7; color: #15803d; font-size: 0.725rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; border: 1px solid #bbf7d0;">🌾 Farmer Producer</span>'
      : '<span style="background: #e0f2fe; color: #0369a1; font-size: 0.725rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; border: 1px solid #bae6fd;">🛒 Verified Buyer</span>';

    const initials = (user.full_name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--primary); color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; overflow: hidden; flex-shrink: 0;">
              ${user.avatar ? `<img src="${user.avatar}" alt="${user.full_name}" style="width: 100%; height: 100%; object-fit: cover;">` : initials}
            </div>
            <div>
              <div style="font-weight: 800; color: var(--text-main); font-size: 0.875rem;">
                ${user.full_name}
              </div>
              <div style="font-size: 0.7rem; font-family: monospace; color: var(--text-muted);">
                ${user.id}
              </div>
            </div>
          </div>
        </td>
        <td>${rolePill}</td>
        <td>
          <div style="font-weight: 600; font-size: 0.8rem; color: var(--text-main);">${user.email}</div>
          <div style="font-size: 0.725rem; color: var(--text-muted);">${user.phone || '+63 900 000 0000'}</div>
        </td>
        <td>
          <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-main);">
            ${user.farm_name ? `🏡 ${user.farm_name}` : (user.province || 'Metro Manila')}
          </div>
          <div style="font-size: 0.725rem; color: var(--text-muted);">${user.city || user.province || 'Philippines'}</div>
        </td>
        <td>
          <div style="font-size: 0.75rem; color: var(--text-main); font-weight: 600;">
            ${isFarmer ? `🌾 ${user.specialty || 'Fresh Harvests'}` : '🛒 Active Consumer'}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">
            Reg: ${user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-PH', { month: 'short', year: 'numeric' }) : 'Jan 2026'}
          </div>
        </td>
        <td>
          <span style="font-size: 0.725rem; font-weight: 700; ${user.verified !== false ? 'color: #15803d;' : 'color: #dc2626;'}">
            ${user.verified !== false ? '✓ Good Standing' : '⏳ Pending Approval'}
          </span>
        </td>
        <td style="text-align: right;">
          ${isFarmer ? `
            <button onclick="openAdminFarmerReviewModal('${user.id}')" class="btn-secondary" style="font-size: 0.725rem; padding: 0.28rem 0.55rem; font-weight: 700;">
              Inspect
            </button>
          ` : `
            <button onclick="showToast('User profile ${user.full_name} in good standing.')" class="btn-secondary" style="font-size: 0.725rem; padding: 0.28rem 0.55rem;">
              Verified
            </button>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

// -------------------------------------------------------------
// RENDER 4: HARVEST INVENTORY CATALOG MODERATION
// -------------------------------------------------------------
function renderAdminProducts(searchQuery) {
  const tbody = document.getElementById('adminProductsTableBody');
  if (!tbody) return;

  let products = window.AgriState?.products || [];
  const q = (searchQuery || '').toLowerCase();

  if (q) {
    products = products.filter(p => {
      return (p.name || '').toLowerCase().includes(q) ||
             (p.category_name || '').toLowerCase().includes(q) ||
             (p.farmer_name || '').toLowerCase().includes(q);
    });
  }

  if (products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌱</div>
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">No Crops in Catalog</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = products.map(prod => {
    const isAvail = prod.is_available !== false && (prod.quantity ?? 1) > 0;
    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <img src="${prod.image_url || 'assets/dashboard-banner.jpg'}" alt="${prod.name}" style="width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover;">
            <div>
              <div style="font-weight: 800; font-size: 0.875rem; color: var(--text-main);">${prod.name}</div>
              <div style="font-size: 0.7rem; color: var(--text-muted); font-family: monospace;">${prod.id}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-size: 0.725rem; font-weight: 700; background: var(--bg-subtle); padding: 0.2rem 0.55rem; border-radius: var(--radius-sm); color: var(--text-secondary);">
            ${prod.category_name || 'Produce'}
          </span>
        </td>
        <td>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--primary-deep);">${prod.farmer_name || 'Benguet Farm Hub'}</div>
        </td>
        <td>
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--primary-deep);">
            ₱${Number(prod.price || 0).toLocaleString('en-PH')}/${prod.unit || 'kg'}
          </div>
          <div style="font-size: 0.68rem; color: #15803d; font-weight: 700;">✓ DA SRP Compliant</div>
        </td>
        <td>
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">
            ${prod.quantity ?? 50} ${prod.unit || 'kg'}
          </div>
        </td>
        <td>
          <span style="font-size: 0.725rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; ${isAvail ? 'background: #dcfce7; color: #15803d;' : 'background: #fee2e2; color: #dc2626;'}">
            ${isAvail ? '● In Stock' : '○ Out of Stock'}
          </span>
        </td>
        <td style="text-align: right;">
          <button onclick="adminToggleProductAvailability('${prod.id}')" class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.65rem; font-weight: 700;">
            ${isAvail ? 'Mark Sold Out' : 'Restore Stock'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// -------------------------------------------------------------
// MODAL 1: ORDER TRANSACTION FULL OFFICIAL RECEIPT
// -------------------------------------------------------------
function openAdminReceiptModal(orderId) {
  const modal = document.getElementById('adminReceiptModal');
  const title = document.getElementById('adminReceiptModalTitle');
  const body = document.getElementById('adminReceiptModalBody');
  if (!modal || !body) return;

  const orders = getAllPlatformOrders();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    showToast('Order not found.');
    return;
  }

  if (title) title.textContent = `Official Transaction Invoice • #${order.id}`;

  const isPaid = (order.paymentStatus || '').toLowerCase().includes('paid') || (order.paymentStatus || '').toLowerCase().includes('settled');

  const itemsHtml = (order.items || []).map(it => `
    <tr style="border-bottom: 1px solid var(--border-subtle);">
      <td style="padding: 0.65rem 0.5rem; font-weight: 700; color: var(--text-main);">
        ${it.name}
        <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: normal;">Producer: ${it.farmer_name || order.origin || 'Benguet Farm Hub'}</div>
      </td>
      <td style="padding: 0.65rem 0.5rem; text-align: center; color: var(--text-main); font-weight: 600;">
        ${it.quantity} ${it.unit || 'kg'}
      </td>
      <td style="padding: 0.65rem 0.5rem; text-align: right; color: var(--text-secondary);">
        ₱${Number(it.price || 0).toLocaleString()}
      </td>
      <td style="padding: 0.65rem 0.5rem; text-align: right; font-weight: 700; color: var(--primary-deep);">
        ₱${((it.price || 0) * (it.quantity || 1)).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
      </td>
    </tr>
  `).join('');

  body.innerHTML = `
    <div style="border: 1.5px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem; background: #fafafa; margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed var(--border-strong); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
        <div>
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-deep);">AgriConnect Philippines</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Direct Farm-to-Table Cold-Chain Network</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-main);">Date: ${order.date || 'Today'}</div>
          <div style="font-size: 0.75rem; font-family: monospace; font-weight: 800; color: var(--primary);">TX-${order.id}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.8rem; margin-bottom: 0.75rem;">
        <div>
          <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted);">Billed To (Buyer):</div>
          <div style="font-weight: 800; color: var(--text-main); font-size: 0.9rem;">${order.customerName || 'Verified Buyer'}</div>
          <div style="color: var(--text-secondary);">📞 ${order.phone || '09000000000'}</div>
          <div style="color: var(--text-secondary);">📍 ${order.address || 'Metro Manila'}</div>
        </div>
        <div>
          <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted);">Farm Logistics Origin:</div>
          <div style="font-weight: 800; color: var(--primary-deep); font-size: 0.9rem;">${order.origin || 'Benguet Farm Hub'}</div>
          <div style="color: var(--text-secondary);">🚚 ${order.fulfillment === 'pickup' ? 'Farmgate Direct Pickup' : 'AgriConnect Cold-Chain Van'}</div>
          <div style="color: #15803d; font-weight: 700;">🌡️ Cold-Chain Temp Verified (4°C)</div>
        </div>
      </div>

      <!-- Line Items -->
      <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; margin-top: 0.75rem;">
        <thead>
          <tr style="background: var(--bg-subtle); border-bottom: 1px solid var(--border-subtle); text-align: left;">
            <th style="padding: 0.5rem; font-weight: 700;">Harvest Item</th>
            <th style="padding: 0.5rem; text-align: center; font-weight: 700;">Qty</th>
            <th style="padding: 0.5rem; text-align: right; font-weight: 700;">Price</th>
            <th style="padding: 0.5rem; text-align: right; font-weight: 700;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Totals Summary -->
      <div style="margin-top: 1rem; border-top: 1px dashed var(--border-strong); padding-top: 0.75rem; display: flex; justify-content: flex-end;">
        <div style="min-width: 220px; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
            <span style="color: var(--text-secondary);">Subtotal:</span>
            <span style="font-weight: 700;">₱${Number(order.subtotal || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
            <span style="color: var(--text-secondary);">Cold-Chain Shipping:</span>
            <span style="font-weight: 700;">₱${Number(order.deliveryFee || 95).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800; color: var(--primary-deep); border-top: 1px solid var(--border-subtle); padding-top: 0.35rem; margin-top: 0.35rem;">
            <span>Grand Total:</span>
            <span>₱${Number(order.total || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 0.75rem; background: ${isPaid ? '#f0fdf4' : '#fffbeb'}; border: 1px solid ${isPaid ? '#bbf7d0' : '#fde68a'}; border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; font-size: 0.775rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-weight: 700; color: ${isPaid ? '#15803d' : '#b45309'};">Settlement: ${order.paymentMethod || 'AgriConnect Balance'}</span>
          <div style="color: var(--text-muted); font-size: 0.7rem;">Status: ${order.paymentStatus || 'Direct Deduction'}</div>
        </div>
        <span style="font-weight: 800; font-size: 0.75rem; color: ${isPaid ? '#15803d' : '#b45309'}; text-transform: uppercase;">
          ${isPaid ? '✓ Direct Settled' : '⏳ Escrow Held'}
        </span>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeAdminReceiptModal() {
  const modal = document.getElementById('adminReceiptModal');
  if (modal) modal.classList.remove('open');
}

// -------------------------------------------------------------
// MODAL 2: FARMER ACCREDITATION DOCUMENT REVIEW DRAWER
// -------------------------------------------------------------
function openAdminFarmerReviewModal(farmerId) {
  const modal = document.getElementById('adminDocReviewModal');
  const title = document.getElementById('adminDocModalFarmerTitle');
  const body = document.getElementById('adminDocModalBody');
  if (!modal || !body) return;

  const farmers = getAllPlatformFarmers();
  const farmer = farmers.find(f => f.id === farmerId);

  if (!farmer) {
    showToast('Farmer record not found.');
    return;
  }

  if (title) title.textContent = `Accreditation Review • ${farmer.full_name}`;

  const reqs = adminGetFarmerRequirements(farmerId);
  const isAllApproved = reqs.every(r => r.status === 'verified');

  const reqListHtml = reqs.map((req, idx) => {
    const isDocVerified = req.status === 'verified';
    const isDocRejected = req.status === 'rejected';

    return `
      <div style="border: 1px solid ${isDocVerified ? '#bbf7d0' : isDocRejected ? '#fecaca' : 'var(--border-strong)'}; background: ${isDocVerified ? '#f0fdf4' : isDocRejected ? '#fef2f2' : '#ffffff'}; border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 0.85rem;">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: ${isDocVerified ? '#15803d' : isDocRejected ? '#dc2626' : '#b45309'}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800;">
              ${idx + 1}
            </span>
            <div>
              <div style="font-weight: 800; font-size: 0.9rem; color: var(--text-main);">${req.name}</div>
              <div style="font-size: 0.725rem; color: var(--text-muted);">Doc No: <code style="font-weight: 700; color: var(--primary-deep);">${req.docNumber}</code> • Agency: ${req.issuingAgency}</div>
            </div>
          </div>

          <span class="admin-status-pill" style="${isDocVerified ? 'background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;' : isDocRejected ? 'background: #fee2e2; color: #dc2626; border: 1px solid #fecaca;' : 'background: #fef3c7; color: #b45309; border: 1px solid #fde68a;'}">
            ${isDocVerified ? '✓ Approved' : isDocRejected ? '✗ Rejected' : '⏳ Pending Review'}
          </span>
        </div>

        <div style="background: rgba(0,0,0,0.02); border-radius: var(--radius-sm); padding: 0.6rem 0.75rem; font-size: 0.775rem; color: var(--text-secondary); margin-bottom: 0.65rem; border: 1px solid var(--border-subtle);">
          <strong>Compliance Check:</strong> ${req.notes}
          ${req.rejectReason ? `<div style="color: #dc2626; font-weight: 700; margin-top: 0.25rem;">⚠️ Reason for Rejection: ${req.rejectReason}</div>` : ''}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-size: 0.7rem; color: var(--text-muted);">Filing Date: ${req.dateSubmitted || 'Jan 2026'}</span>
          <div style="display: flex; gap: 0.35rem;">
            ${!isDocVerified ? `
              <button onclick="adminApproveRequirement('${farmerId}', '${req.id}')" class="btn-primary" style="font-size: 0.725rem; padding: 0.3rem 0.65rem; background: #15803d; border-color: #15803d; font-weight: 700;">
                ✓ Approve Document
              </button>
            ` : `
              <span style="font-size: 0.725rem; color: #15803d; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
                ✓ Clearance Verified
              </span>
            `}
            ${!isDocRejected ? `
              <button onclick="adminRejectRequirement('${farmerId}', '${req.id}', prompt('Enter reason for document revision:'))" class="btn-secondary" style="font-size: 0.725rem; padding: 0.3rem 0.65rem; color: #dc2626; border-color: #fca5a5;">
                Reject / Request Revision
              </button>
            ` : ''}
          </div>
        </div>

      </div>
    `;
  }).join('');

  body.innerHTML = `
    <!-- Farmer Brief Profile Card -->
    <div style="display: flex; align-items: center; gap: 1rem; background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem; border: 1px solid var(--border-subtle);">
      <img src="${farmer.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'}" alt="${farmer.full_name}" style="width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover;">
      <div style="flex: 1;">
        <div style="font-weight: 800; font-size: 1rem; color: var(--text-main);">${farmer.full_name}</div>
        <div style="font-size: 0.8rem; color: var(--primary-deep); font-weight: 700;">${farmer.farm_name || `${farmer.full_name}'s Farm`} • ${farmer.province || 'Benguet'}</div>
        <div style="font-size: 0.725rem; color: var(--text-muted);">📞 ${farmer.phone || '+63 900 000 0000'} • ✉️ ${farmer.email || `${farmer.id}@agriconnect.ph`}</div>
      </div>
      <div style="text-align: right;">
        <span class="admin-status-pill" style="${farmer.verified !== false ? 'background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;' : 'background: #fee2e2; color: #dc2626; border: 1px solid #fecaca;'}">
          ${farmer.verified !== false ? '✓ Accredited' : '⏳ Action Required'}
        </span>
      </div>
    </div>

    <!-- Requirements Submissions List -->
    <div style="max-height: 400px; overflow-y: auto; padding-right: 0.35rem; margin-bottom: 1.25rem;">
      ${reqListHtml}
    </div>

    <!-- Master Action Bar -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
      <button onclick="closeAdminDocReviewModal()" class="btn-secondary" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
        Close Review
      </button>

      <div style="display: flex; gap: 0.5rem;">
        <button onclick="adminRejectFarmerAccount('${farmerId}', prompt('Enter overall accreditation rejection reason:'))" class="btn-secondary" style="font-size: 0.85rem; padding: 0.5rem 1rem; color: #dc2626; border-color: #fca5a5;">
          Reject Farmer Profile
        </button>
        <button onclick="adminApproveFarmerAccount('${farmerId}')" class="btn-primary" style="font-size: 0.85rem; padding: 0.5rem 1.25rem; font-weight: 800; background: #15803d; border-color: #15803d;">
          🎉 Approve All & Issue PhilGAP Accreditation
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeAdminDocReviewModal() {
  const modal = document.getElementById('adminDocReviewModal');
  if (modal) modal.classList.remove('open');
}

// =============================================================================
// 6. ADMIN EXECUTIVE SUBSCRIPTION STATUS & AD MANAGEMENT CONTROLLER
// =============================================================================

function getAllFarmerSubscriptions() {
  const subMap = new Map();

  // 1. Check custom / saved subscriptions in localStorage
  try {
    const storedSubs = JSON.parse(localStorage.getItem('agri_farmer_subscriptions') || '[]');
    if (Array.isArray(storedSubs)) {
      storedSubs.forEach(s => {
        if (s && s.id) subMap.set(s.id, { ...s });
      });
    }
  } catch (e) {}

  // 2. Base platform participating farmer subscriptions
  const baseSubscriptions = [
    {
      id: 'SUB-2026-001',
      farmer_id: 'farmer-ramon',
      farmer_name: 'Mang Ramon Dela Cruz',
      farm_name: 'Dela Cruz Family Farm',
      province: 'Benguet',
      city: 'La Trinidad',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400',
      plan_id: 'monthly',
      plan_name: 'Monthly Pro (AI Video Ad)',
      plan_cost: 700,
      period_days: 30,
      start_date: '2026-09-12',
      end_date: '2026-10-12', // 2 days remaining (Expiring soon)
      impressions: 14280,
      clicks: 1890,
      reminded: false
    },
    {
      id: 'SUB-2026-002',
      farmer_id: 'farmer-nena',
      farmer_name: 'Aling Nena Bautista',
      farm_name: 'Bautista Rice Fields',
      province: 'Nueva Ecija',
      city: 'Cabanatuan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      plan_id: 'annual',
      plan_name: 'Annual VIP (Priority Commercials)',
      plan_cost: 5000,
      period_days: 365,
      start_date: '2026-01-15',
      end_date: '2027-01-15', // Active
      impressions: 89400,
      clicks: 11240,
      reminded: false
    },
    {
      id: 'SUB-2026-003',
      farmer_id: 'farmer-jun',
      farmer_name: 'Kuya Jun Villanueva',
      farm_name: 'Villanueva Mango Orchard',
      province: 'Guimaras',
      city: 'Jordan',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      plan_id: 'weekly',
      plan_name: 'Weekly Boost',
      plan_cost: 200,
      period_days: 7,
      start_date: '2026-10-02',
      end_date: '2026-10-09', // Expired
      impressions: 4820,
      clicks: 640,
      reminded: false
    },
    {
      id: 'SUB-2026-004',
      farmer_id: 'farmer-marites',
      farmer_name: 'Ate Marites Sarmiento',
      farm_name: 'Sarmiento Coastal Catch',
      province: 'Metro Manila',
      city: 'Navotas',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      plan_id: 'monthly',
      plan_name: 'Monthly Pro (AI Video Ad)',
      plan_cost: 700,
      period_days: 30,
      start_date: '2026-09-11',
      end_date: '2026-10-11', // 1 day remaining (Expiring soon)
      impressions: 16840,
      clicks: 2190,
      reminded: false
    },
    {
      id: 'SUB-2026-005',
      farmer_id: 'farmer-berting',
      farmer_name: 'Tatay Berting Lopez',
      farm_name: 'Lopez Coconut & Root Farm',
      province: 'Quezon',
      city: 'Lucena',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      plan_id: 'monthly',
      plan_name: 'Monthly Pro (AI Video Ad)',
      plan_cost: 700,
      period_days: 30,
      start_date: '2026-09-25',
      end_date: '2026-10-25', // 15 days remaining (Active)
      impressions: 9420,
      clicks: 1350,
      reminded: false
    },
    {
      id: 'SUB-2026-006',
      farmer_id: 'farmer-cora',
      farmer_name: 'Nanay Cora Aquino',
      farm_name: 'Aquino Poultry Yard',
      province: 'Cavite',
      city: 'Silang',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      plan_id: 'weekly',
      plan_name: 'Weekly Boost',
      plan_cost: 200,
      period_days: 7,
      start_date: '2026-10-07',
      end_date: '2026-10-14', // Active
      impressions: 3950,
      clicks: 580,
      reminded: false
    }
  ];

  baseSubscriptions.forEach(s => {
    if (!subMap.has(s.id)) {
      subMap.set(s.id, s);
    }
  });

  // Only registered farmer accounts may hold subscriptions (keeps totals aligned with the accounts database)
  const registeredFarmerIds = new Set(getAllPlatformFarmers().map(f => f.id));
  Array.from(subMap.keys()).forEach(k => {
    if (!registeredFarmerIds.has(subMap.get(k).farmer_id)) subMap.delete(k);
  });

  const now = new Date('2026-10-10T00:00:00');
  const subscriptions = Array.from(subMap.values()).map(sub => {
    const end = new Date(sub.end_date);
    const diffTime = end.getTime() - now.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status_code = 'active';
    if (daysRemaining <= 0) {
      status_code = 'expired';
    } else if (daysRemaining <= 3) {
      status_code = 'expiring_soon';
    }

    return {
      ...sub,
      days_remaining: daysRemaining,
      status_code: status_code,
      reminded: Boolean(sub.reminded)
    };
  });

  return subscriptions.sort((a, b) => {
    if (a.status_code === 'expiring_soon' && b.status_code !== 'expiring_soon') return -1;
    if (b.status_code === 'expiring_soon' && a.status_code !== 'expiring_soon') return 1;
    return a.days_remaining - b.days_remaining;
  });
}

function initSubscriptionPage() {
  const lockEl = document.getElementById('adminSubLockContainer');
  const mainEl = document.getElementById('adminSubMainView');
  const user = window.AgriState.user;
  const isAdmin = Boolean(user && (user.role === 'admin' || user.is_admin || user.email === 'comiakrystel@gmail.com'));

  if (!isAdmin) {
    if (lockEl) lockEl.style.display = 'block';
    if (mainEl) mainEl.style.display = 'none';
    return;
  }

  if (lockEl) lockEl.style.display = 'none';
  if (mainEl) mainEl.style.display = 'block';

  refreshSubscriptionData();
}

function refreshSubscriptionData() {
  const subs = getAllFarmerSubscriptions();
  
  // Calculate KPIs
  const totalEarnings = subs.reduce((sum, s) => sum + (s.plan_cost || 0), 0);
  const activeSubs = subs.filter(s => s.status_code === 'active' || s.status_code === 'expiring_soon');
  const expiringSubs = subs.filter(s => s.status_code === 'expiring_soon');
  const expiredSubs = subs.filter(s => s.status_code === 'expired');

  // Plan counts & earnings
  const weeklySubs = subs.filter(s => s.plan_id === 'weekly');
  const monthlySubs = subs.filter(s => s.plan_id === 'monthly');
  const annualSubs = subs.filter(s => s.plan_id === 'annual');

  const weeklyEarnings = weeklySubs.reduce((sum, s) => sum + s.plan_cost, 0);
  const monthlyEarnings = monthlySubs.reduce((sum, s) => sum + s.plan_cost, 0);
  const annualEarnings = annualSubs.reduce((sum, s) => sum + s.plan_cost, 0);

  // Update KPI Elements
  const kpiEarnings = document.getElementById('kpiSubTotalEarnings');
  const kpiActive = document.getElementById('kpiSubActiveCount');
  const kpiActiveSubtext = document.getElementById('kpiSubActiveSubtext');
  const kpiExpiring = document.getElementById('kpiSubExpiringCount');
  const kpiPopularPlan = document.getElementById('kpiSubPopularPlan');
  const kpiPopularSubtext = document.getElementById('kpiSubPopularSubtext');

  if (kpiEarnings) kpiEarnings.textContent = `₱${totalEarnings.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
  if (kpiActive) kpiActive.textContent = `${activeSubs.length} Active`;
  if (kpiActiveSubtext) kpiActiveSubtext.textContent = `${subs.length} Total participating farmers`;
  if (kpiExpiring) kpiExpiring.textContent = `${expiringSubs.length} Expiring Soon`;

  // Determine Most Popular Tier
  let popularName = 'Monthly Pro (₱700)';
  let popularPct = '48%';
  if (monthlySubs.length >= weeklySubs.length && monthlySubs.length >= annualSubs.length) {
    popularName = 'Monthly Pro (₱700)';
    popularPct = `${Math.round((monthlySubs.length / subs.length) * 100)}% of producers`;
  } else if (annualSubs.length >= weeklySubs.length) {
    popularName = 'Annual VIP (₱5,000)';
    popularPct = `${Math.round((annualSubs.length / subs.length) * 100)}% of producers`;
  } else {
    popularName = 'Weekly Boost (₱200)';
    popularPct = `${Math.round((weeklySubs.length / subs.length) * 100)}% of producers`;
  }
  if (kpiPopularPlan) kpiPopularPlan.textContent = popularName;
  if (kpiPopularSubtext) kpiPopularSubtext.textContent = `Preferred by ${popularPct}`;

  // Update Plan Breakdown Cards
  const elWeeklyCount = document.getElementById('planCountWeekly');
  const elWeeklyEarnings = document.getElementById('planEarningsWeekly');
  const elMonthlyCount = document.getElementById('planCountMonthly');
  const elMonthlyEarnings = document.getElementById('planEarningsMonthly');
  const elAnnualCount = document.getElementById('planCountAnnual');
  const elAnnualEarnings = document.getElementById('planEarningsAnnual');

  if (elWeeklyCount) elWeeklyCount.textContent = weeklySubs.length;
  if (elWeeklyEarnings) elWeeklyEarnings.textContent = `₱${weeklyEarnings.toLocaleString('en-PH')}`;
  if (elMonthlyCount) elMonthlyCount.textContent = monthlySubs.length;
  if (elMonthlyEarnings) elMonthlyEarnings.textContent = `₱${monthlyEarnings.toLocaleString('en-PH')}`;
  if (elAnnualCount) elAnnualCount.textContent = annualSubs.length;
  if (elAnnualEarnings) elAnnualEarnings.textContent = `₱${annualEarnings.toLocaleString('en-PH')}`;

  // Update filter counts
  const cAll = document.getElementById('countSubFilterAll');
  const cExpiring = document.getElementById('countSubFilterExpiring');
  const cActive = document.getElementById('countSubFilterActive');
  const cExpired = document.getElementById('countSubFilterExpired');

  if (cAll) cAll.textContent = subs.length;
  if (cExpiring) cExpiring.textContent = expiringSubs.length;
  if (cActive) cActive.textContent = activeSubs.length;
  if (cExpired) cExpired.textContent = expiredSubs.length;

  renderAdminSubscriptions();
}

function renderAdminSubscriptions(searchQuery = '', statusFilter = null) {
  const tbody = document.getElementById('adminSubscriptionsTableBody');
  if (!tbody) return;

  const currentFilter = statusFilter || window.AgriState.adminSubFilter || 'all';
  let subs = getAllFarmerSubscriptions();

  // Search filter
  const query = (searchQuery || (document.getElementById('subSearchInput') ? document.getElementById('subSearchInput').value : '')).trim().toLowerCase();
  if (query) {
    subs = subs.filter(s => 
      s.farmer_name.toLowerCase().includes(query) ||
      s.farm_name.toLowerCase().includes(query) ||
      s.province.toLowerCase().includes(query) ||
      s.plan_name.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (currentFilter === 'expiring') {
    subs = subs.filter(s => s.status_code === 'expiring_soon');
  } else if (currentFilter === 'active') {
    subs = subs.filter(s => s.status_code === 'active');
  } else if (currentFilter === 'expired') {
    subs = subs.filter(s => s.status_code === 'expired');
  }

  if (subs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📋</div>
          <div style="font-weight: 700; font-size: 1rem; color: var(--text-main);">No subscription records match your filter criteria</div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">Try resetting your search query or selecting "All Plans".</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = subs.map(sub => {
    const isExpiring = sub.status_code === 'expiring_soon';
    const isExpired = sub.status_code === 'expired';
    const isActive = sub.status_code === 'active';

    let statusPill = '';
    if (isExpiring) {
      statusPill = `<span class="sub-status-pill" style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a;">⚠️ Expiring Soon (${sub.days_remaining}d)</span>`;
    } else if (isExpired) {
      statusPill = `<span class="sub-status-pill" style="background: #fee2e2; color: #dc2626; border: 1px solid #fecaca;">✗ Expired (${Math.abs(sub.days_remaining)}d ago)</span>`;
    } else {
      statusPill = `<span class="sub-status-pill" style="background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;">✓ Active (${sub.days_remaining}d)</span>`;
    }

    // Days remaining progress bar
    const maxDays = sub.period_days || 30;
    const pct = Math.max(0, Math.min(100, Math.round((sub.days_remaining / maxDays) * 100)));
    const barColor = isExpiring ? '#f59e0b' : (isExpired ? '#ef4444' : '#22c55e');

    return `
      <tr style="${isExpiring ? 'background: #fffdf5;' : ''}">
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${sub.avatar}" alt="${sub.farmer_name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid ${isExpiring ? '#f59e0b' : 'var(--border-subtle)'};">
            <div>
              <div style="font-weight: 800; font-size: 0.9rem; color: var(--text-main);">${sub.farmer_name}</div>
              <div style="font-size: 0.725rem; color: var(--text-muted); font-family: monospace;">ID: ${sub.id}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--text-main); font-size: 0.85rem;">${sub.farm_name}</div>
          <div style="font-size: 0.75rem; color: var(--primary-deep); font-weight: 600;">📍 ${sub.city}, ${sub.province}</div>
        </td>
        <td>
          <div style="font-weight: 800; font-size: 0.85rem; color: ${sub.plan_id === 'annual' ? '#7c3aed' : (sub.plan_id === 'monthly' ? '#15803d' : '#2563eb')};">
            ${sub.plan_name}
          </div>
          <div style="font-weight: 800; font-size: 0.8rem; color: var(--text-main); font-family: monospace;">
            ₱${sub.plan_cost.toLocaleString('en-PH')} / ${sub.period_days} Days
          </div>
        </td>
        <td>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">${sub.start_date} &rarr; ${sub.end_date}</div>
          <div style="font-size: 0.725rem; color: var(--text-muted);">${sub.period_days} Days Billing Cycle</div>
        </td>
        <td>
          <div style="min-width: 110px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800; color: ${barColor}; margin-bottom: 0.2rem;">
              <span>${isExpired ? '0 Days' : `${sub.days_remaining} Days`}</span>
              <span>${pct}%</span>
            </div>
            <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
              <div style="width: ${pct}%; height: 100%; background: ${barColor}; border-radius: 9999px;"></div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">🎬 ${(sub.impressions || 0).toLocaleString()} Views</div>
          <div style="font-size: 0.725rem; color: #15803d; font-weight: 600;">👆 ${(sub.clicks || 0).toLocaleString()} Store Clicks</div>
        </td>
        <td>
          ${statusPill}
        </td>
        <td style="text-align: right;">
          <div style="display: inline-flex; gap: 0.35rem; justify-content: flex-end; align-items: center;">
            ${sub.reminded ? `
              <span style="background: #dcfce7; color: #15803d; font-size: 0.725rem; font-weight: 800; padding: 0.35rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid #bbf7d0; display: inline-flex; align-items: center; gap: 0.3rem;">
                ✓ Reminded
              </span>
            ` : `
              <button 
                onclick="adminSendSubscriptionReminder('${sub.id}', '${sub.farmer_name.replace(/'/g, "\\'")}')" 
                class="btn-primary" 
                style="padding: 0.35rem 0.75rem; font-size: 0.75rem; font-weight: 800; background: ${isExpiring ? '#d97706' : '#15803d'}; border-color: ${isExpiring ? '#d97706' : '#15803d'}; display: inline-flex; align-items: center; gap: 0.3rem;"
                title="Send automated push & SMS reminder to ${sub.farmer_name} to renew before expiration"
              >
                🔔 Remind
              </button>
            `}
            <button 
              onclick="adminManualRenewSubscription('${sub.id}', '${sub.farmer_name.replace(/'/g, "\\'")}', '${sub.plan_id}')" 
              class="btn-secondary" 
              style="padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 700; white-space: nowrap;"
              title="Renew subscription contract for ${sub.farmer_name}"
            >
              ⚡ Renew
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterSubscriptions(filter) {
  window.AgriState.adminSubFilter = filter;
  
  const buttons = ['all', 'expiring', 'active', 'expired'];
  buttons.forEach(b => {
    const btn = document.getElementById(`subFilter${b.charAt(0).toUpperCase() + b.slice(1)}`);
    if (btn) {
      if (b === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });

  renderAdminSubscriptions('', filter);
}

function handleSubSearch(query) {
  renderAdminSubscriptions(query, window.AgriState.adminSubFilter || 'all');
}

function adminSendSubscriptionReminder(subId, farmerName) {
  const subs = getAllFarmerSubscriptions();
  const sub = subs.find(s => s.id === subId);
  if (!sub) return;

  sub.reminded = true;
  sub.last_reminded_at = new Date().toISOString();

  // Save to agri_farmer_subscriptions
  try {
    const stored = JSON.parse(localStorage.getItem('agri_farmer_subscriptions') || '[]');
    const existingIdx = stored.findIndex(s => s.id === subId);
    if (existingIdx >= 0) {
      stored[existingIdx] = { ...stored[existingIdx], reminded: true, last_reminded_at: sub.last_reminded_at };
    } else {
      stored.push(sub);
    }
    localStorage.setItem('agri_farmer_subscriptions', JSON.stringify(stored));
  } catch (e) {}

  // Save notification for the farmer
  try {
    const notifKey = `agri_notifications_${sub.farmer_id}`;
    const notifs = JSON.parse(localStorage.getItem(notifKey) || '[]');
    notifs.unshift({
      id: `notif-${Date.now()}`,
      type: 'subscription_expiring',
      title: '🔔 Subscription Renewal Alert',
      message: `Your ${sub.plan_name} is expiring in ${sub.days_remaining} day(s). Renew today to keep your AI Video Commercial actively promoting your harvest on the AgriConnect marketplace.`,
      timestamp: new Date().toISOString(),
      read: false
    });
    localStorage.setItem(notifKey, JSON.stringify(notifs));
  } catch (e) {}

  showToast(`🔔 Renewal reminder successfully dispatched to ${farmerName}! Notification logged.`);
  renderAdminSubscriptions();
}

function adminManualRenewSubscription(subId, farmerName, planType = 'monthly') {
  const subs = getAllFarmerSubscriptions();
  const sub = subs.find(s => s.id === subId);
  if (!sub) return;

  const durationDays = planType === 'annual' ? 365 : (planType === 'weekly' ? 7 : 30);
  const cost = planType === 'annual' ? 5000 : (planType === 'weekly' ? 200 : 700);
  const newStartDate = new Date('2026-10-10');
  const newEndDate = new Date(newStartDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

  sub.start_date = newStartDate.toISOString().split('T')[0];
  sub.end_date = newEndDate.toISOString().split('T')[0];
  sub.plan_id = planType;
  sub.plan_cost = cost;
  sub.period_days = durationDays;
  sub.plan_name = planType === 'annual' ? 'Annual VIP (Priority Commercials)' : (planType === 'weekly' ? 'Weekly Boost' : 'Monthly Pro (AI Video Ad)');
  sub.reminded = false;

  try {
    const stored = JSON.parse(localStorage.getItem('agri_farmer_subscriptions') || '[]');
    const existingIdx = stored.findIndex(s => s.id === subId);
    if (existingIdx >= 0) {
      stored[existingIdx] = sub;
    } else {
      stored.push(sub);
    }
    localStorage.setItem('agri_farmer_subscriptions', JSON.stringify(stored));
  } catch (e) {}

  showToast(`⚡ ${sub.plan_name} renewed successfully for ${farmerName} (+${durationDays} days extended)!`);
  refreshSubscriptionData();
}

// =============================================================================
// 7. ADMIN MARKETPLACE DASHBOARD ANALYTICS CONTROLLER
// =============================================================================

function renderMarketplaceAdminAnalytics() {
  const container = document.getElementById('adminMarketplaceAnalyticsPanel');
  if (!container) return;

  const products = window.AgriState.products || [];
  const orders = getAllPlatformOrders();

  // 1. Calculate Product Sales & Units
  const productSalesMap = new Map();
  
  // Every catalog listing starts at zero; all figures come from recorded (non-cancelled) orders only
  products.forEach(p => {
    productSalesMap.set(p.id, {
      id: p.id,
      name: p.name,
      category: p.category_name || 'Produce',
      farmer_name: p.farmer_name || 'Verified Farmer',
      province: p.province || 'Luzon',
      price: p.price || 0,
      image: p.image_url,
      stock: p.quantity || 50,
      unit: p.unit || 'kg',
      units_sold: 0,
      revenue: 0
    });
  });

  let productRevenueTotal = 0;
  let shippingTotal = 0;
  let ordersGMV = 0;
  orders.filter(isSaleOrder).forEach(order => {
    ordersGMV += Number(order.total) || 0;
    shippingTotal += Number(order.deliveryFee) || 0;
    (order.items || []).forEach(item => {
      const qty = Number(item.quantity || 1);
      const lineRevenue = qty * (Number(item.price) || 0);
      productRevenueTotal += lineRevenue;
      const pId = item.id || item.product_id;
      let rec = null;
      if (pId && productSalesMap.has(pId)) {
        rec = productSalesMap.get(pId);
      } else if (item.name) {
        for (const r of productSalesMap.values()) {
          if (r.name.toLowerCase() === item.name.toLowerCase()) { rec = r; break; }
        }
      }
      if (!rec) {
        rec = {
          id: pId || ('item-' + item.name),
          name: item.name || 'Item',
          category: item.category_name || 'Produce',
          farmer_name: item.farmer_name || order.origin || 'Verified Farmer',
          province: item.province || order.originProvince || 'Luzon',
          price: Number(item.price) || 0,
          image: item.image_url || item.image,
          stock: 0,
          unit: item.unit || 'kg',
          units_sold: 0,
          revenue: 0
        };
        productSalesMap.set(rec.id, rec);
      }
      rec.units_sold += qty;
      rec.revenue += lineRevenue;
    });
  });

  const productSalesList = Array.from(productSalesMap.values());
  // GMV = sum of non-cancelled order totals (product sales + delivery fees); identical to the Executive Console total
  const totalMarketplaceGMV = ordersGMV;
  const totalUnitsSold = productSalesList.reduce((sum, p) => sum + p.units_sold, 0);

  // 2. Calculate Top Performing Farmers
  const farmerSalesMap = new Map();
  productSalesList.forEach(p => {
    const fKey = p.farmer_name;
    if (!farmerSalesMap.has(fKey)) {
      farmerSalesMap.set(fKey, {
        farmer_name: fKey,
        province: p.province,
        total_revenue: 0,
        units_sold: 0,
        product_count: 0,
        rating: 4.9,
        orders_count: 0
      });
    }
    const fRec = farmerSalesMap.get(fKey);
    fRec.total_revenue += p.revenue;
    fRec.units_sold += p.units_sold;
    fRec.product_count += 1;
  });

  // Attach order counts
  orders.forEach(o => {
    const fName = o.farmer_name || o.origin;
    if (fName && farmerSalesMap.has(fName)) {
      farmerSalesMap.get(fName).orders_count += 1;
    }
  });

  const topFarmersList = Array.from(farmerSalesMap.values()).sort((a, b) => b.total_revenue - a.total_revenue);
  const topFarmer = (topFarmersList[0] && topFarmersList[0].total_revenue > 0) ? topFarmersList[0] : { farmer_name: 'No sales yet', total_revenue: 0, province: 'Philippines' };

  // 3. Calculate Best-Selling Items
  const bestSellersList = [...productSalesList].sort((a, b) => b.units_sold - a.units_sold);
  const topItem = (bestSellersList[0] && bestSellersList[0].units_sold > 0) ? bestSellersList[0] : { name: 'No sales yet', units_sold: 0, unit: 'units', revenue: 0 };

  // Current active tab (default: 'products')
  const activeTab = window.AgriState.adminAnalyticsTab || 'products';

  container.innerHTML = `
    <!-- Top Executive Admin Header Bar -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a29 100%); border-radius: var(--radius-md); padding: 1.5rem 1.75rem; color: #ffffff; margin-bottom: 1.5rem; box-shadow: var(--shadow-sm); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span style="background: #dc2626; color: #ffffff; font-size: 0.725rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">
            👑 Admin Analytics Console
          </span>
          <span style="font-size: 0.75rem; color: #bbf7d0; font-weight: 600;">Philippine Agricultural GMV & Performance</span>
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin: 0;">
          Marketplace Sales & Producer Intelligence
        </h2>
        <p style="font-size: 0.85rem; color: #f0fdf4; opacity: 0.9; margin: 0.2rem 0 0;">
          Comprehensive real-time analytics for farmgate revenue, top agricultural producers, and volume velocity across all crop tiers.
        </p>
      </div>

      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <a href="subscriptions.html" class="btn-secondary" style="background: rgba(255,255,255,0.15); color: #ffffff; border-color: rgba(255,255,255,0.3); font-size: 0.8rem; font-weight: 700; padding: 0.5rem 1rem; text-decoration: none;">
          👑 Subscription Status &rarr;
        </a>
        <a href="admin.html" class="btn-primary" style="background: #166534; border-color: #166534; font-size: 0.8rem; font-weight: 700; padding: 0.5rem 1rem; text-decoration: none;">
          Executive Console &rarr;
        </a>
      </div>
    </div>

    <!-- 4 KPI Metrics Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      
      <!-- Metric 1: Total Marketplace Sales -->
      <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Marketplace GMV</span>
          <span style="width: 28px; height: 28px; border-radius: var(--radius-sm); background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.95rem;">₱</span>
        </div>
        <div style="font-size: 1.65rem; font-weight: 800; color: var(--primary-deep); font-family: monospace;">
          ₱${totalMarketplaceGMV.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
        </div>
        <div style="font-size: 0.725rem; color: #15803d; font-weight: 700; margin-top: 0.25rem;">
          Products ₱${productRevenueTotal.toLocaleString('en-PH')} + Shipping ₱${shippingTotal.toLocaleString('en-PH')}
        </div>
      </div>

      <!-- Metric 2: Total Units Sold -->
      <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Harvest Volume Sold</span>
          <span style="width: 28px; height: 28px; border-radius: var(--radius-sm); background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center;">📦</span>
        </div>
        <div style="font-size: 1.65rem; font-weight: 800; color: var(--text-main);">
          ${totalUnitsSold.toLocaleString()} Units
        </div>
        <div style="font-size: 0.725rem; color: var(--text-muted); margin-top: 0.25rem;">
          Across ${productSalesList.length} catalog listings
        </div>
      </div>

      <!-- Metric 3: Top Performing Farmer -->
      <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Top-Performing Farmer</span>
          <span style="width: 28px; height: 28px; border-radius: var(--radius-sm); background: #fef3c7; color: #b45309; display: flex; align-items: center; justify-content: center;">🏆</span>
        </div>
        <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${topFarmer.farmer_name}">
          ${topFarmer.farmer_name}
        </div>
        <div style="font-size: 0.725rem; color: var(--primary-deep); font-weight: 700; margin-top: 0.25rem;">
          ₱${(topFarmer.total_revenue || 0).toLocaleString('en-PH')} • ${topFarmer.province}
        </div>
      </div>

      <!-- Metric 4: Best-Selling Item -->
      <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Best-Selling Item</span>
          <span style="width: 28px; height: 28px; border-radius: var(--radius-sm); background: #ede9fe; color: #7c3aed; display: flex; align-items: center; justify-content: center;">🌟</span>
        </div>
        <div style="font-size: 1.2rem; font-weight: 800; color: #7c3aed; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${topItem.name}">
          ${topItem.name}
        </div>
        <div style="font-size: 0.725rem; color: var(--text-muted); margin-top: 0.25rem;">
          ${(topItem.units_sold || 0).toLocaleString()} ${topItem.unit} sold (${Math.round(((topItem.revenue || 1) / (totalMarketplaceGMV || 1)) * 100)}% of GMV)
        </div>
      </div>

    </div>

    <!-- Analytics Tab Navigation -->
    <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); overflow: hidden; margin-bottom: 1.5rem;">
      <div style="display: flex; border-bottom: 1px solid var(--border-subtle); background: #fafafa; overflow-x: auto;">
        <button 
          onclick="switchAdminMarketplaceAnalyticsTab('products')" 
          style="padding: 0.85rem 1.25rem; font-size: 0.85rem; font-weight: 800; border: none; background: ${activeTab === 'products' ? '#ffffff' : 'transparent'}; color: ${activeTab === 'products' ? 'var(--primary)' : 'var(--text-secondary)'}; border-bottom: 2.5px solid ${activeTab === 'products' ? 'var(--primary)' : 'transparent'}; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; white-space: nowrap;"
        >
          📊 Sales Per Product (${productSalesList.length})
        </button>
        <button 
          onclick="switchAdminMarketplaceAnalyticsTab('farmers')" 
          style="padding: 0.85rem 1.25rem; font-size: 0.85rem; font-weight: 800; border: none; background: ${activeTab === 'farmers' ? '#ffffff' : 'transparent'}; color: ${activeTab === 'farmers' ? 'var(--primary)' : 'var(--text-secondary)'}; border-bottom: 2.5px solid ${activeTab === 'farmers' ? 'var(--primary)' : 'transparent'}; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; white-space: nowrap;"
        >
          🏆 Top-Performing Farmers (${topFarmersList.length})
        </button>
        <button 
          onclick="switchAdminMarketplaceAnalyticsTab('bestsellers')" 
          style="padding: 0.85rem 1.25rem; font-size: 0.85rem; font-weight: 800; border: none; background: ${activeTab === 'bestsellers' ? '#ffffff' : 'transparent'}; color: ${activeTab === 'bestsellers' ? 'var(--primary)' : 'var(--text-secondary)'}; border-bottom: 2.5px solid ${activeTab === 'bestsellers' ? 'var(--primary)' : 'transparent'}; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; white-space: nowrap;"
        >
          🌟 Best-Selling Items Leaderboard
        </button>
      </div>

      <!-- Tab Content Area -->
      <div style="padding: 1.25rem;">
        
        <!-- TAB 1: Sales Per Product Table -->
        ${activeTab === 'products' ? `
          <div style="overflow-x: auto;">
            <table class="sub-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
              <thead>
                <tr style="background: var(--bg-subtle); text-transform: uppercase; font-size: 0.725rem; color: var(--text-secondary); letter-spacing: 0.04em;">
                  <th style="padding: 0.75rem 1rem; text-align: left;">Product Item</th>
                  <th style="padding: 0.75rem 1rem; text-align: left;">Farmer Producer</th>
                  <th style="padding: 0.75rem 1rem; text-align: right;">Unit Price</th>
                  <th style="padding: 0.75rem 1rem; text-align: right;">Units Sold</th>
                  <th style="padding: 0.75rem 1rem; text-align: right;">Gross Sales (₱)</th>
                  <th style="padding: 0.75rem 1rem; text-align: center;">Stock Status</th>
                  <th style="padding: 0.75rem 1rem; text-align: right;">GMV Share</th>
                </tr>
              </thead>
              <tbody>
                ${productSalesList.map(p => {
                  const gmvPct = Math.round((p.revenue / (totalMarketplaceGMV || 1)) * 100);
                  const isLowStock = (p.stock || 0) < 20;

                  return `
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 0.85rem 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.65rem;">
                          <img src="${p.image || 'assets/placeholder.jpg'}" alt="${p.name}" style="width: 36px; height: 36px; border-radius: var(--radius-sm); object-fit: cover;">
                          <div>
                            <div style="font-weight: 800; color: var(--text-main); font-size: 0.875rem;">${p.name}</div>
                            <div style="font-size: 0.725rem; color: var(--text-muted);">${p.category}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding: 0.85rem 1rem;">
                        <div style="font-weight: 700; color: var(--text-main); font-size: 0.825rem;">${p.farmer_name}</div>
                        <div style="font-size: 0.725rem; color: var(--primary-deep);">📍 ${p.province}</div>
                      </td>
                      <td style="padding: 0.85rem 1rem; text-align: right; font-family: monospace; font-weight: 700;">
                        ₱${p.price.toLocaleString()} / ${p.unit}
                      </td>
                      <td style="padding: 0.85rem 1rem; text-align: right; font-weight: 800; color: var(--text-main);">
                        ${p.units_sold.toLocaleString()} ${p.unit}
                      </td>
                      <td style="padding: 0.85rem 1rem; text-align: right; font-weight: 800; color: var(--primary-deep); font-family: monospace;">
                        ₱${p.revenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </td>
                      <td style="padding: 0.85rem 1rem; text-align: center;">
                        <span style="font-size: 0.725rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; ${isLowStock ? 'background: #fee2e2; color: #dc2626;' : 'background: #dcfce7; color: #15803d;'}">
                          ${isLowStock ? `Low Stock (${p.stock})` : `In Stock (${p.stock})`}
                        </span>
                      </td>
                      <td style="padding: 0.85rem 1rem; text-align: right;">
                        <div style="font-weight: 700; font-size: 0.8rem; color: var(--text-secondary);">${gmvPct}%</div>
                        <div style="width: 60px; height: 4px; background: #e2e8f0; border-radius: 9999px; margin-left: auto; overflow: hidden; margin-top: 0.2rem;">
                          <div style="width: ${Math.min(100, gmvPct * 2)}%; height: 100%; background: var(--primary);"></div>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- TAB 2: Top-Performing Farmers Leaderboard -->
        ${activeTab === 'farmers' ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            ${topFarmersList.map((f, idx) => {
              return `
                <div style="border: 1.5px solid ${idx === 0 ? 'var(--primary)' : 'var(--border-subtle)'}; background: ${idx === 0 ? '#f0fdf4' : '#ffffff'}; border-radius: var(--radius-sm); padding: 1.15rem; box-shadow: var(--shadow-sm);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.65rem;">
                      <span style="width: 26px; height: 26px; border-radius: 50%; background: ${idx === 0 ? '#15803d' : (idx === 1 ? '#0284c7' : '#64748b')}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.75rem;">
                        #${idx + 1}
                      </span>
                      <div>
                        <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">${f.farmer_name}</div>
                        <div style="font-size: 0.75rem; color: var(--primary-deep); font-weight: 700;">📍 ${f.province} • PhilGAP Certified</div>
                      </div>
                    </div>
                    <span style="background: #dcfce7; color: #15803d; font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 9999px;">
                      ⭐ 4.9 Rating
                    </span>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; background: rgba(0,0,0,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.65rem; margin-bottom: 0.75rem;">
                    <div>
                      <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Gross Sales</div>
                      <div style="font-weight: 800; font-size: 1.05rem; color: var(--primary-deep); font-family: monospace;">
                        ₱${f.total_revenue.toLocaleString('en-PH')}
                      </div>
                    </div>
                    <div>
                      <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Volume Shipped</div>
                      <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-main);">
                        ${f.units_sold.toLocaleString()} Units
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
                    <span>Active Crop Listings: <strong>${f.product_count}</strong></span>
                    <span style="color: #15803d; font-weight: 700;">✓ 99.4% Fulfillment Rate</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- TAB 3: Best-Selling Items Breakdown -->
        ${activeTab === 'bestsellers' ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            ${bestSellersList.slice(0, 8).map((item, idx) => {
              const pct = Math.round((item.revenue / (totalMarketplaceGMV || 1)) * 100);

              return `
                <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem; background: #ffffff; box-shadow: var(--shadow-sm);">
                  <div style="display: flex; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <img src="${item.image || 'assets/placeholder.jpg'}" alt="${item.name}" style="width: 56px; height: 56px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-subtle);">
                    <div style="flex: 1;">
                      <span style="background: #ede9fe; color: #7c3aed; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.4rem; border-radius: 9999px; text-transform: uppercase;">Rank #${idx + 1} Best Seller</span>
                      <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main); margin-top: 0.2rem;">${item.name}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">${item.farmer_name}</div>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: space-between; font-size: 0.825rem; font-weight: 700; margin-bottom: 0.35rem;">
                    <span>Volume: <strong style="color: var(--text-main);">${item.units_sold.toLocaleString()} ${item.unit}</strong></span>
                    <span>Revenue: <strong style="color: var(--primary-deep);">₱${item.revenue.toLocaleString('en-PH')}</strong></span>
                  </div>

                  <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
                    <div style="width: ${Math.min(100, pct * 3)}%; height: 100%; background: #7c3aed; border-radius: 9999px;"></div>
                  </div>
                  <div style="font-size: 0.7rem; color: var(--text-muted); text-align: right; margin-top: 0.2rem;">
                    ${pct}% of total platform marketplace GMV
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function switchAdminMarketplaceAnalyticsTab(tabName) {
  window.AgriState.adminAnalyticsTab = tabName;
  renderMarketplaceAdminAnalytics();
}

// =============================================================================
// 8. ADMIN PLATFORM ORDER TRACKING & LOGISTICS SUPERVISION CONTROLLER
// =============================================================================

function setAdminTrackFilter(status) {
  window.AgriState.adminTrackFilter = status;

  const buttons = [
    { id: 'btnTrackFilterAll', status: 'all' },
    { id: 'btnTrackFilterPending', status: 'pending' },
    { id: 'btnTrackFilterInTransit', status: 'in_transit' },
    { id: 'btnTrackFilterDelivered', status: 'delivered' },
    { id: 'btnTrackFilterCancelled', status: 'cancelled' }
  ];

  buttons.forEach(b => {
    const el = document.getElementById(b.id);
    if (el) {
      if (b.status === status) {
        el.className = 'btn-primary';
        el.style.background = 'var(--primary)';
        el.style.color = '#ffffff';
      } else {
        el.className = 'btn-secondary';
        el.style.background = '#ffffff';
        el.style.color = 'var(--text-main)';
      }
    }
  });

  renderOrderTrackingList();
}

function adminUpdateOrderStatus(orderId, newStatus, newStatusCode) {
  let resolvedCode = newStatusCode;
  let statusLabel = newStatus;

  const raw = (newStatus || '').toLowerCase();
  if (!resolvedCode) {
    if (raw === 'delivered' || raw.includes('delivered')) {
      resolvedCode = 'delivered';
      statusLabel = 'Delivered to Buyer';
    } else if (raw === 'in_transit' || raw.includes('transit')) {
      resolvedCode = 'in_transit';
      statusLabel = 'In Cold-Chain Transit';
    } else if (raw === 'cancelled' || raw.includes('cancel')) {
      resolvedCode = 'cancelled';
      statusLabel = 'Order Cancelled';
    } else {
      resolvedCode = 'pending';
      statusLabel = 'Order Confirmed';
    }
  }

  // 1. Update in agri_all_orders
  try {
    const masterOrders = JSON.parse(localStorage.getItem('agri_all_orders') || '[]');
    const order = masterOrders.find(o => o.id === orderId);
    if (order) {
      order.status = statusLabel;
      order.status_code = resolvedCode;
      if (resolvedCode === 'delivered') order.paymentStatus = 'Settled & Released to Farmer';
      localStorage.setItem('agri_all_orders', JSON.stringify(masterOrders));
    }
  } catch (e) {}

  // 2. Update in agri_orders
  try {
    const orders = JSON.parse(localStorage.getItem('agri_orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = statusLabel;
      order.status_code = resolvedCode;
      if (resolvedCode === 'delivered') order.paymentStatus = 'Settled & Released to Farmer';
      localStorage.setItem('agri_orders', JSON.stringify(orders));
    }
  } catch (e) {}

  // 3. Update in user-scoped orders
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('agri_orders_') || key.startsWith('agri_buyer_orders_'))) {
        try {
          const userOrders = JSON.parse(localStorage.getItem(key) || '[]');
          let modified = false;
          userOrders.forEach(o => {
            if (o && o.id === orderId) {
              o.status = statusLabel;
              o.status_code = resolvedCode;
              if (resolvedCode === 'delivered') o.paymentStatus = 'Settled & Released to Farmer';
              modified = true;
            }
          });
          if (modified) {
            localStorage.setItem(key, JSON.stringify(userOrders));
          }
        } catch (e) {}
      }
    }
  } catch (e) {}

  // 4. Update in agri_farmer_orders
  try {
    const farmerOrders = JSON.parse(localStorage.getItem('agri_farmer_orders') || '[]');
    let modified = false;
    farmerOrders.forEach(fo => {
      if (fo && (fo.id === orderId || fo.master_order_id === orderId)) {
        fo.status = statusLabel;
        fo.status_code = resolvedCode;
        if (resolvedCode === 'delivered') fo.payment_status = 'Disbursed to Escrow Wallet';
        modified = true;
      }
    });
    if (modified) {
      localStorage.setItem('agri_farmer_orders', JSON.stringify(farmerOrders));
    }
  } catch (e) {}

  // 5. Update window.AgriState.orders
  if (window.AgriState && Array.isArray(window.AgriState.orders)) {
    window.AgriState.orders.forEach(o => {
      if (o && o.id === orderId) {
        o.status = statusLabel;
        o.status_code = resolvedCode;
      }
    });
  }

  const readableName = resolvedCode === 'delivered' ? '✓ Delivered' : (resolvedCode === 'in_transit' ? '🚚 In Transit' : (resolvedCode === 'cancelled' ? '✗ Cancelled' : '⏳ Pending'));
  showToast(`✓ Order #${orderId} status updated to [${readableName}]! Platform synchronized.`);

  if (document.getElementById('ordersListContainer')) {
    renderOrderTrackingList();
  }
  if (typeof refreshAdminData === 'function' && document.getElementById('adminTransactionsTableBody')) {
    refreshAdminData();
  }
}






