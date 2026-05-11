/* ===========================
   HAVEN — script.js
   =========================== */

// ── PROPERTY DATA ──────────────────────────────────
const properties = [
  {
    id: 1,
    name: "The Wren Residences",
    location: "Worli, Mumbai",
    type: "penthouse",
    beds: 4, baths: 4, area: 3800,
    price: "₹8.2 Cr",
    badge: "Exclusive",
    hue: "35deg",
    desc: "A sky-high penthouse perched atop one of Worli's most iconic towers, offering panoramic sea views across the Arabian Sea. Features include a 1,200 sq ft terrace, private pool, and a home automation system.",
  },
  {
    id: 2,
    name: "Bandra Cliffside",
    location: "Bandra West, Mumbai",
    type: "villa",
    beds: 5, baths: 5, area: 5200,
    price: "₹14.5 Cr",
    badge: "Featured",
    hue: "200deg",
    desc: "An architectural masterpiece in the heart of Bandra West. This heritage villa blends colonial charm with contemporary design. Private garden, double-height ceilings, and custom Italian marble flooring throughout.",
  },
  {
    id: 3,
    name: "Lumière Juhu",
    location: "Juhu, Mumbai",
    type: "apartment",
    beds: 3, baths: 3, area: 2100,
    price: "₹4.8 Cr",
    badge: "New",
    hue: "280deg",
    desc: "Steps from Juhu beach, Lumière offers a curated collection of residences that marry coastal living with urban sophistication. Every apartment faces the sea with floor-to-ceiling windows.",
  },
  {
    id: 4,
    name: "One Parel Heights",
    location: "Lower Parel, Mumbai",
    type: "apartment",
    beds: 2, baths: 2, area: 1450,
    price: "₹2.9 Cr",
    badge: "Ready",
    hue: "160deg",
    desc: "Situated in Mumbai's thriving business district, this modern two-bedroom apartment puts you at the centre of culture, commerce, and connectivity. State-of-the-art amenities and concierge services.",
  },
  {
    id: 5,
    name: "Powai Lake View",
    location: "Powai, Mumbai",
    type: "apartment",
    beds: 3, baths: 2, area: 1800,
    price: "₹3.4 Cr",
    badge: "Hot",
    hue: "50deg",
    desc: "A serene address overlooking the Powai lake with the backdrop of the Sanjay Gandhi National Park. Premium residences with private balconies, a sky garden, and a jogging track around the lake.",
  },
  {
    id: 6,
    name: "Prabhadevi Signature",
    location: "Prabhadevi, Mumbai",
    type: "penthouse",
    beds: 5, baths: 5, area: 6100,
    price: "₹22 Cr",
    badge: "Ultra Luxury",
    hue: "320deg",
    desc: "Mumbai's crown jewel — a sprawling duplex penthouse with its own private lift lobby, rooftop jacuzzi, wine cellar, and staff quarters. Only two such units exist in the entire development.",
  },
];

let visibleCount = 3;
let activeFilter = "all";
let favs = new Set();

// ── RENDER PROPERTIES ──────────────────────────────
function getPropertySVG(hue, size = 160) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="50" width="100" height="90" rx="2" fill="hsl(${hue}, 50%, 50%)" opacity="0.12"/>
    <rect x="45" y="40" width="70" height="100" rx="2" fill="hsl(${hue}, 55%, 55%)" opacity="0.15"/>
    <rect x="55" y="30" width="50" height="110" rx="2" fill="hsl(${hue}, 60%, 58%)" opacity="0.18"/>
    <rect x="63" y="45" width="12" height="15" rx="1" fill="hsl(${hue}, 70%, 65%)" opacity="0.7"/>
    <rect x="85" y="45" width="12" height="15" rx="1" fill="hsl(${hue}, 70%, 65%)" opacity="0.4"/>
    <rect x="63" y="70" width="12" height="15" rx="1" fill="hsl(${hue}, 70%, 65%)" opacity="0.5"/>
    <rect x="85" y="70" width="12" height="15" rx="1" fill="hsl(${hue}, 70%, 65%)" opacity="0.8"/>
    <rect x="63" y="95" width="12" height="15" rx="1" fill="hsl(${hue}, 70%, 65%)" opacity="0.6"/>
    <rect x="85" y="95" width="12" height="15" rx="1" fill="hsl(${hue}, 70%, 65%)" opacity="0.45"/>
    <rect x="72" y="118" width="16" height="22" rx="1" fill="hsl(${hue}, 60%, 60%)" opacity="0.55"/>
  </svg>`;
}

function renderProperties() {
  const grid = document.getElementById("propertiesGrid");
  const filtered = activeFilter === "all"
    ? properties
    : properties.filter(p => p.type === activeFilter);
  const toShow = filtered.slice(0, visibleCount);

  grid.innerHTML = toShow.map(p => `
    <div class="prop-card reveal" data-id="${p.id}" style="--card-hue:${p.hue}">
      <div class="prop-img">
        <div class="prop-img-inner" style="background: linear-gradient(135deg, hsl(${p.hue},20%,8%) 0%, hsl(${p.hue},30%,12%) 100%)">
          <div class="prop-icon-svg">${getPropertySVG(p.hue)}</div>
        </div>
        <span class="prop-badge">${p.badge}</span>
        <button class="prop-fav${favs.has(p.id) ? " active" : ""}" data-fav="${p.id}" title="Save">♡</button>
      </div>
      <div class="prop-body">
        <div class="prop-location">${p.location}</div>
        <div class="prop-name">${p.name}</div>
        <div class="prop-specs">
          <span class="prop-spec">🛏 ${p.beds} Beds</span>
          <span class="prop-spec">🚿 ${p.baths} Baths</span>
          <span class="prop-spec">📐 ${p.area.toLocaleString()} sq ft</span>
        </div>
        <div class="prop-footer">
          <div>
            <span class="prop-price">${p.price}</span>
          </div>
          <span class="prop-cta">View Details →</span>
        </div>
      </div>
    </div>
  `).join("");

  // Observe new cards for reveal
  observeReveal();

  // Bind fav buttons
  grid.querySelectorAll(".prop-fav").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.fav);
      if (favs.has(id)) { favs.delete(id); btn.classList.remove("active"); btn.textContent = "♡"; }
      else { favs.add(id); btn.classList.add("active"); btn.textContent = "♥"; }
    });
  });

  // Bind card click for modal
  grid.querySelectorAll(".prop-card").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.classList.contains("prop-fav")) return;
      const id = parseInt(card.dataset.id);
      openModal(id);
    });
  });

  // Load more button
  const btn = document.getElementById("loadMoreBtn");
  if (visibleCount >= filtered.length) {
    btn.style.display = "none";
  } else {
    btn.style.display = "inline-block";
  }
}

// ── FILTER BUTTONS ─────────────────────────────────
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    visibleCount = 3;
    renderProperties();
  });
});

// ── LOAD MORE ──────────────────────────────────────
document.getElementById("loadMoreBtn").addEventListener("click", () => {
  visibleCount += 3;
  renderProperties();
});

// ── MODAL ──────────────────────────────────────────
function openModal(id) {
  const p = properties.find(x => x.id === id);
  if (!p) return;
  const body = document.getElementById("modalBody");
  body.innerHTML = `
    <div class="modal-img" style="background: linear-gradient(135deg, hsl(${p.hue},20%,8%) 0%, hsl(${p.hue},30%,14%) 100%)">
      ${getPropertySVG(p.hue, 200)}
    </div>
    <div class="modal-location">${p.location}</div>
    <div class="modal-name">${p.name}</div>
    <div class="modal-price">${p.price}</div>
    <div class="modal-specs">
      <div class="modal-spec"><strong>${p.beds}</strong>Bedrooms</div>
      <div class="modal-spec"><strong>${p.baths}</strong>Bathrooms</div>
      <div class="modal-spec"><strong>${p.area.toLocaleString()} sq ft</strong>Built-up Area</div>
      <div class="modal-spec"><strong>${p.type.charAt(0).toUpperCase() + p.type.slice(1)}</strong>Type</div>
    </div>
    <p class="modal-desc">${p.desc}</p>
    <div class="modal-actions">
      <a href="#contact" class="btn-primary" id="modalContact">Enquire Now</a>
      <button class="btn-outline" onclick="document.getElementById('modalOverlay').classList.remove('open')">Close</button>
    </div>
  `;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";

  document.getElementById("modalContact")?.addEventListener("click", () => {
    closeModal();
  });
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", e => {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ── NAV SCROLL ─────────────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// ── HAMBURGER ──────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;

hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  const spans = hamburger.querySelectorAll("span");
  if (menuOpen) {
    spans[0].style.transform = "rotate(45deg) translate(4px, 4px)";
    spans[1].style.transform = "rotate(-45deg) translate(4px, -4px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.transform = "";
  }
});

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    hamburger.querySelectorAll("span").forEach(s => s.style.transform = "");
  });
});

// ── SEARCH TABS ────────────────────────────────────
document.querySelectorAll(".stab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".stab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// ── REVEAL ON SCROLL ───────────────────────────────
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}

// ── COUNT-UP ANIMATION ─────────────────────────────
function animateCounters() {
  document.querySelectorAll(".stat-num").forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters when stat strip is visible
const statObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounters();
    statObserver.disconnect();
  }
}, { threshold: 0.5 });

const statStrip = document.querySelector(".hero-stat-strip");
if (statStrip) statObserver.observe(statStrip);

// ── TESTIMONIAL SLIDER ─────────────────────────────
let tCurrent = 0;
const tCards = document.querySelectorAll(".tcard");
const tTrack = document.getElementById("testimonialTrack");
const tDots = document.getElementById("tDots");

// Build dots
tCards.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "tnav-dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => goToSlide(i));
  tDots.appendChild(dot);
});

function goToSlide(n) {
  tCurrent = (n + tCards.length) % tCards.length;
  tTrack.style.transform = `translateX(-${tCurrent * 100}%)`;
  document.querySelectorAll(".tnav-dot").forEach((d, i) => d.classList.toggle("active", i === tCurrent));
}

document.getElementById("tPrev").addEventListener("click", () => goToSlide(tCurrent - 1));
document.getElementById("tNext").addEventListener("click", () => goToSlide(tCurrent + 1));

// Auto-advance
setInterval(() => goToSlide(tCurrent + 1), 5000);

// Touch swipe on testimonials
let tStartX = 0;
tTrack.addEventListener("touchstart", e => { tStartX = e.touches[0].clientX; }, { passive: true });
tTrack.addEventListener("touchend", e => {
  const diff = tStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goToSlide(tCurrent + (diff > 0 ? 1 : -1));
});

// ── CONTACT FORM ───────────────────────────────────
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  const btn = form.querySelector("button[type='submit']");
  btn.textContent = "Sending…";
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = "none";
    document.getElementById("formSuccess").classList.add("show");
  }, 1200);
});

// ── CUSTOM CURSOR ──────────────────────────────────
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener("mousemove", e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animateCursor() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + "px";
  follower.style.top = fy + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── LOCATION CARD CLICKS ───────────────────────────
document.querySelectorAll(".loc-card").forEach(card => {
  card.addEventListener("click", () => {
    const loc = card.dataset.loc;
    // Scroll to properties and filter by location (simple demo)
    document.getElementById("properties").scrollIntoView({ behavior: "smooth" });
  });
});

// ── SEARCH BUTTON ──────────────────────────────────
document.querySelector(".search-btn").addEventListener("click", () => {
  document.getElementById("properties").scrollIntoView({ behavior: "smooth" });
});

// ── INIT ───────────────────────────────────────────
renderProperties();
observeReveal();

// Trigger hero reveals
setTimeout(() => {
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 150);
  });
}, 100);
