// Mock Data for Initial Population
const initialAds = [
    {
        id: 1,
        title: "Toyota Premio 2018 for Sale",
        category: "Vehicles",
        price: 12500000,
        description: "Mint condition, first owner, low mileage. Pearl white color with beige interior. Recently serviced.",
        image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        contact: "0771234567",
        date: new Date().toISOString()
    },
    {
        id: 2,
        title: "Luxury Apartment in Colombo 03",
        category: "Property",
        price: 45000000,
        description: "3 Bedroom fully furnished apartment with sea view. Swimming pool, gym and 24h security included.",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        contact: "0711234567",
        date: new Date().toISOString()
    },
    {
        id: 3,
        title: "iPhone 14 Pro Max - 256GB",
        category: "Electronics",
        price: 385000,
        description: "Brand new sealed pack. 1 year Apple care warranty. Deep Purple color available.",
        image: "https://images.unsplash.com/photo-1695048180490-75dbc9d020d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        contact: "0751234567",
        date: new Date().toISOString()
    },
    {
        id: 4,
        title: "Web Developer Needed",
        category: "Jobs",
        price: 150000,
        description: "Looking for an experienced frontend developer with React and Node.js skills. Remote work available.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        contact: "0112345678",
        date: new Date().toISOString()
    }
];

// Initialize Data
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('ads')) {
        localStorage.setItem('ads', JSON.stringify(initialAds));
    }
    
    // Page Router
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        renderFeaturedAds();
    } else if (window.location.pathname.includes('listings.html')) {
        renderAllAds();
    } else if (window.location.pathname.includes('post-ad.html')) {
        setupForm();
    }
});

function getAds() {
    return JSON.parse(localStorage.getItem('ads') || '[]');
}

// Render Featured Ads (Index Page) (Shows latest 4)
function renderFeaturedAds() {
    const container = document.getElementById('latest-ads-container');
    if (!container) return;

    const ads = getAds().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
    
    container.innerHTML = ads.map(ad => createAdCard(ad)).join('');
}

// Render All Ads (Listings Page)
function renderAllAds() {
    const container = document.getElementById('listings-grid');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    
    let ads = getAds().sort((a, b) => new Date(b.date) - new Date(a.date));

    if (categoryFilter) {
        ads = ads.filter(ad => ad.category === categoryFilter);
    }

    if (ads.length === 0) {
        document.getElementById('empty-state').classList.remove('hidden');
    } else {
        container.innerHTML = ads.map(ad => createAdCard(ad)).join('');
        document.getElementById('empty-state').classList.add('hidden');
    }

    // Setup Category click listeners if they exist on buttons
    const filterButtons = document.querySelectorAll('button[data-filter]');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
             // Visual updates
             filterButtons.forEach(b => {
                 b.classList.remove('bg-primary', 'text-white');
                 b.classList.add('bg-gray-100');
             });
             e.target.classList.remove('bg-gray-100');
             e.target.classList.add('bg-primary', 'text-white');

             const filter = e.target.getAttribute('data-filter');
             let filteredAds = getAds();
             
             if (filter !== 'all') {
                 filteredAds = filteredAds.filter(ad => ad.category === filter);
             }

             if (filteredAds.length === 0) {
                 container.innerHTML = '';
                 document.getElementById('empty-state').classList.remove('hidden');
             } else {
                 document.getElementById('empty-state').classList.add('hidden');
                 container.innerHTML = filteredAds.map(ad => createAdCard(ad)).join('');
             }
        });
    });
}

// Helper to create Ad Card HTML
function createAdCard(ad) {
    return `
        <a href="ad-details.html?id=${ad.id}" class="ad-card block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-primary/20 bg-white">
            <div class="h-48 overflow-hidden relative">
                <span class="absolute top-2 left-2 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded font-medium z-10">${ad.category}</span>
                <img src="${ad.image || 'https://via.placeholder.com/400x300?text=No+Image'}" alt="${ad.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg text-gray-800 line-clamp-1">${ad.title}</h3>
                </div>
                <div class="text-primary font-bold text-xl mb-3">Rs. ${parseInt(ad.price).toLocaleString()}</div>
                <div class="flex justify-between items-center text-gray-400 text-xs">
                    <span>${new Date(ad.date).toLocaleDateString()}</span>
                    <span>Sri Lanka</span>
                </div>
            </div>
        </a>
    `;
}

// Setup Form Logic
function setupForm() {
    const form = document.getElementById('post-ad-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const price = document.getElementById('price').value;
        const contact = document.getElementById('contact').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image-input').files[0];
        // Note: For real image upload, we'd need cloud storage. 
        // Here we use Base64 for local storage demo, or a placeholder if large.
        
        processImage(imageFile, (base64Image) => {
            const newAd = {
                id: Date.now(),
                title,
                category,
                price,
                contact,
                description,
                image: base64Image || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg", // Fallback
                date: new Date().toISOString()
            };

            const ads = getAds();
            ads.push(newAd);
            localStorage.setItem('ads', JSON.stringify(ads));

            // Show success modal
            const modal = document.getElementById('success-modal');
            const modalContent = document.getElementById('modal-content');
            modal.classList.remove('hidden');
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        });
    });
}

function processImage(file, callback) {
    if (!file) {
        callback(null);
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    // If file is too large, localStorage might crash (limit is ~5MB). 
    // In a real app, upload to server. Here we assume small files for demo.
    reader.readAsDataURL(file); 
}
