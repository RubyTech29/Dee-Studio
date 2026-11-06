/* DEE'S STUDIO — HOMEPAGE INTERACTIONS */
"use strict";

const heroWord = document.getElementById("heroWord");
const heroWords = ["YOURS.", "PERSONAL.", "UNIQUE.", "SPECIAL."];
let wordIndex = 0;

if (heroWord) {
    window.setInterval(() => {
        heroWord.style.opacity = "0";
        window.setTimeout(() => {
            wordIndex = (wordIndex + 1) % heroWords.length;
            heroWord.textContent = heroWords[wordIndex];
            heroWord.style.opacity = "1";
        }, 250);
    }, 2500);
}

/* Mobile navigation */
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.toggle("open");
    document.body.classList.toggle("menu-open", Boolean(isOpen));
    menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuButton?.setAttribute("aria-expanded", "false");
    });
});

const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

/* General reveal motion */
const revealElements = document.querySelectorAll(
    ".service-card, .product-card, .about-content, .custom-form-box, .creation-card, .review-card"
);
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    revealElements.forEach(element => {
        element.classList.add("reveal-on-scroll");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => element.classList.add("is-visible"));
}

/* Hero image parallax — only active if the visual exists in the HTML */
const heroVisual = document.querySelector(".hero-visual");
const heroImage = document.querySelector(".hero-image");
if (heroVisual && heroImage && window.matchMedia("(pointer:fine)").matches) {
    heroVisual.addEventListener("mousemove", event => {
        const rect = heroVisual.getBoundingClientRect();
        const moveX = (event.clientX - rect.left) / rect.width - 0.5;
        const moveY = (event.clientY - rect.top) / rect.height - 0.5;
        heroImage.style.transform = `translate(${moveX * 12}px, ${moveY * 12}px)`;
    });
    heroVisual.addEventListener("mouseleave", () => {
        heroImage.style.transform = "translate(0, 0)";
    });
}

/* Contact / WhatsApp configuration */
const whatsappNumber = "234XXXXXXXXXX"; // Replace with digits only, including country code.
const whatsappMessage = "Hello Dee's Studio! I would like to make an enquiry about your custom products.";
const whatsappGroupLink = "https://chat.whatsapp.com/YOUR_GROUP_LINK";

function openWhatsApp(event) {
    event.preventDefault();
    if (whatsappNumber.includes("X")) {
        alert("Please add the Dee's Studio WhatsApp number in js/main.js.");
        return;
    }
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener");
}
document.getElementById("whatsappChat")?.addEventListener("click", openWhatsApp);
document.getElementById("contactWhatsApp")?.addEventListener("click", openWhatsApp);

document.getElementById("whatsappGroup")?.addEventListener("click", event => {
    event.preventDefault();
    if (whatsappGroupLink.includes("YOUR_GROUP_LINK")) {
        alert("Please add the Dee's Studio WhatsApp group link in js/main.js.");
        return;
    }
    window.open(whatsappGroupLink, "_blank", "noopener");
});

/* Product catalogue data. Replace sample prices, names and image paths with confirmed stock. */
const fashionProducts = [
    {id:1,name:"Black Face Cap",category:"Embroidery",price:3500,description:"A premium embroidery design.",image:"images/fearless1.jpg"},
    {id:2,name:"Black Face Cap",category:"Embroidery",price:2500,description:"A premium embroidery design.",image:"images/fearless2.jpg"},
    {id:3,name:"Burgundy Face Cap",category:"Embroidery",price:1800,description:"A premium embroidery design.",image:"images/fearless3.jpg"},
    {id:4,name:"NavyBlue Face Cap",category:"Embroidery",price:2200,description:"A premium embroidery design.",image:"images/fearless4.jpg"},
    {id:5,name:"Brown Face Cap",category:"Embroidery",price:1500,description:"A premium embroidery design.",image:"images/fearless5.jpg"},
    {id:6,name:"Pink Face Cap",category:"Embroidery",price:1600,description:"A premium embroidery design.",image:"images/fearless6.jpg"}
];

const giftProducts = [
    {id:101,name:"A",category:"Embroidery",price:1000,description:"An elegant.",image:"images/unwavering1.jpg"},
    {id:102,name:"B",category:"Embroidery",price:1200,description:"A thoughtful.",image:"images/unwavering2.jpg"},
    {id:103,name:"C",category:"Embroidery",price:900,description:"A keepsake.",image:"images/unwavering3.jpg"},
    {id:104,name:"D",category:"Embroidery",price:1400,description:"A personalised.",image:"images/unwavering4.jpg"},
    {id:105,name:"E",category:"Embroidery",price:650,description:"A special.",image:"images/Unwavering15.jpg"},
    {id:106,name:"F",category:"Embroidery",price:1100,description:"A Customised.",image:"images/unwavering6.jpg"}
];

const money = amount => new Intl.NumberFormat("en-NG", {
    style: "currency", currency: "NGN", maximumFractionDigits: 0
}).format(amount);

let currentProduct = null;

function productCard(product) {
    return `<article class="product-card">
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.closest('.product-image').classList.add('image-missing');this.style.display='none'">
            <span>${product.category}</span>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <strong class="product-price">${money(product.price)}</strong>
            <button class="buy-now" type="button" data-product-id="${product.id}">Buy Now <span>↗</span></button>
        </div>
    </article>`;
}

function openOrderModal(product) {
    const modal = document.getElementById("orderModal");
    if (!product || !modal) return;
    currentProduct = product;
    document.getElementById("orderProductImage").src = product.image;
    document.getElementById("orderProductImage").alt = product.name;
    document.getElementById("orderProductCategory").textContent = product.category;
    document.getElementById("orderTitle").textContent = product.name;
    document.getElementById("orderProductPrice").textContent = money(product.price);
    document.getElementById("orderProductDescription").textContent = product.description;
    document.getElementById("orderSummary").textContent = `${product.name} — ${money(product.price)}`;
    const customisation = document.getElementById("customisation");
    const leaveCustom = document.getElementById("leaveCustom");
    const quantity = document.getElementById("orderQuantity");
    if (customisation) { customisation.value = ""; customisation.disabled = false; }
    if (leaveCustom) leaveCustom.checked = false;
    if (quantity) quantity.value = "1";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    document.getElementById("customerName")?.focus();
}

function closeOrderModal() {
    const modal = document.getElementById("orderModal");
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    currentProduct = null;
}
document.addEventListener("click", event => {
    const buyButton = event.target.closest("[data-product-id]");
    if (!buyButton) return;
    const id = Number(buyButton.dataset.productId);
    const product = [...fashionProducts, ...giftProducts].find(item => item.id === id);
    openOrderModal(product);
});
document.getElementById("orderClose")?.addEventListener("click", closeOrderModal);
document.querySelectorAll("[data-close-order]").forEach(element => element.addEventListener("click", closeOrderModal));
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.getElementById("orderModal")?.classList.contains("open")) closeOrderModal();
});

const leaveCustom = document.getElementById("leaveCustom");
leaveCustom?.addEventListener("change", () => {
    const field = document.getElementById("customisation");
    if (!field) return;
    field.disabled = leaveCustom.checked;
    field.value = leaveCustom.checked ? "Customer leaves customisation/design decision to Dee's Studio." : "";
});

/* Horizontal carousels: separate data, controls and progress for each featured collection. */
function setupProductCarousel(key, products, trackId) {
    const track = document.getElementById(trackId);
    const previous = document.querySelector(`[data-carousel-prev="${key}"]`);
    const next = document.querySelector(`[data-carousel-next="${key}"]`);
    const progress = document.querySelector(`[data-progress="${key}"]`);
    const count = document.querySelector(`[data-count="${key}"]`);
    if (!track) return;
    track.innerHTML = products.map(productCard).join("");
    if (count) count.textContent = products.length;
    let index = 0;

    const visible = () => window.innerWidth <= 700 ? 1 : window.innerWidth <= 1000 ? 2 : 3;
    const update = () => {
        const firstCard = track.querySelector(".product-card");
        if (!firstCard) return;
        const gap = parseFloat(getComputedStyle(track).gap) || 25;
        const max = Math.max(products.length - visible(), 0);
        index = Math.max(0, Math.min(index, max));
        track.style.transform = `translateX(-${index * (firstCard.getBoundingClientRect().width + gap)}px)`;
        if (previous) previous.disabled = index === 0;
        if (next) next.disabled = index === max;
        if (progress) progress.style.width = `${max === 0 ? 100 : ((index + visible()) / products.length) * 100}%`;
    };
    previous?.addEventListener("click", () => { index--; update(); });
    next?.addEventListener("click", () => { index++; update(); });

    // Touch / trackpad swipe support.
    let startX = 0;
    track.addEventListener("touchstart", event => { startX = event.touches[0].clientX; }, {passive:true});
    track.addEventListener("touchend", event => {
        const distance = event.changedTouches[0].clientX - startX;
        if (Math.abs(distance) > 45) { index += distance < 0 ? 1 : -1; update(); }
    }, {passive:true});
    window.addEventListener("resize", update);
    update();
}
setupProductCarousel("fashion", fashionProducts, "fashionTrack");
setupProductCarousel("gifts", giftProducts, "giftsTrack");

/* Review carousel */
const reviewTrack = document.getElementById("reviewTrack");
const reviewCards = reviewTrack ? [...reviewTrack.children] : [];
const reviewDots = document.getElementById("reviewDots");
let reviewIndex = 0;
function updateReviews() {
    if (!reviewTrack || !reviewCards.length) return;
    const max = Math.max(0, reviewCards.length - (window.innerWidth <= 700 ? 1 : 2));
    reviewIndex = Math.max(0, Math.min(reviewIndex, max));
    const cardWidth = reviewCards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(reviewTrack).gap) || 20;
    reviewTrack.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
    const prev = document.getElementById("reviewPrev");
    const next = document.getElementById("reviewNext");
    if (prev) prev.disabled = reviewIndex === 0;
    if (next) next.disabled = reviewIndex === max;
    if (reviewDots) {
        reviewDots.innerHTML = reviewCards.map((_, i) =>
            `<button type="button" class="${i === reviewIndex ? "active" : ""}" aria-label="Show review ${i+1}" data-review-index="${i}"></button>`
        ).join("");
    }
}
document.getElementById("reviewPrev")?.addEventListener("click", () => { reviewIndex--; updateReviews(); });
document.getElementById("reviewNext")?.addEventListener("click", () => { reviewIndex++; updateReviews(); });
reviewDots?.addEventListener("click", event => {
    const dot = event.target.closest("[data-review-index]");
    if (dot) { reviewIndex = Number(dot.dataset.reviewIndex); updateReviews(); }
});
window.addEventListener("resize", updateReviews);
updateReviews();

/* Custom enquiry form: opens a prepared email until a server/email service is connected. */
document.getElementById("customForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();
    if (!name || !service || !message) return;
    const subject = `Dee's Studio custom enquiry — ${service}`;
    const body = [`Name: ${name}`, `Service: ${service}`, "", "Project details:", message].join("\n");
    window.location.href = `mailto:deestudio287@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* Order request email. This launches the customer's configured mail app; it does not silently claim online submission. */
document.getElementById("orderForm")?.addEventListener("submit", event => {
    event.preventDefault();
    if (!currentProduct) return;
    const customer = {
        name: document.getElementById("customerName").value.trim(),
        contact: document.getElementById("customerContact").value.trim(),
        email: document.getElementById("customerEmail").value.trim(),
        address: document.getElementById("customerAddress").value.trim()
    };
    const quantity = Math.max(1, Number(document.getElementById("orderQuantity")?.value || 1));
    const leaveDecision = document.getElementById("leaveCustom")?.checked;
    const customText = leaveDecision
        ? "Customer leaves customisation/design decision to Dee's Studio."
        : document.getElementById("customisation").value.trim() || "No customisation requested.";
    const subject = `New Dee's Studio order request — ${currentProduct.name}`;
    const body = [
        "DEE'S STUDIO — NEW ORDER REQUEST", "",
        `Product: ${currentProduct.name}`, `Category: ${currentProduct.category}`,
        `Unit price: ${money(currentProduct.price)}`, `Quantity: ${quantity}`,
        `Estimated item total: ${money(currentProduct.price * quantity)}`,
        `Product ID: ${currentProduct.id}`, "", "CUSTOMISATION", customText, "",
        "CUSTOMER DETAILS", `Name: ${customer.name}`, `Contact: ${customer.contact}`,
        `Email: ${customer.email}`, `Delivery address: ${customer.address}`, "",
        "Please acknowledge this request and confirm availability, final price and delivery details."
    ].join("\n");
    window.location.href = `mailto:deestudio287@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* Active section navigation (only same-page anchors are considered). */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links .nav-link");
if (sections.length && navLinks.length) {
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 160) current = section.id;
        });
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${current}`);
        });
    }, {passive:true});
}