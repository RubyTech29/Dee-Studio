/* DEE'S STUDIO — HOMEPAGE INTERACTIONS */
"use strict";

/*
  EMAILJS SETUP — FREE PLAN COMPATIBLE
  - Put your Public Key, Service ID and Order Template ID below.
  - This version does NOT send image attachments.
  - It passes the publicly accessible URL of the exact selected variation
    to the email template as {{selected_image_url}}.
  - Keep your website and product images deployed at a public HTTPS URL.
*/
const EMAILJS_CONFIG = {
    publicKey: "OBEX2L9TP6ISvgjYg",
    serviceId: "service_68279gi",
    orderTemplateId: "template_zg38jjf"
};

const emailConfigReady = Object.values(EMAILJS_CONFIG).every(value =>
    value && !value.startsWith("YOUR_")
);

if (window.emailjs && emailConfigReady) {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

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
const whatsappNumber = "pyrxu4"; // Dee Studio wa.link short-link code.
const whatsappGroupLink = "https://t.me/dees_studio";

function openWhatsApp(event) {
    event.preventDefault();
    if (whatsappNumber.includes("X")) {
        alert("Please add the Dee's Studio WhatsApp number in js/main.js.");
        return;
    }
    window.open(`https://wa.link/${whatsappNumber}`, "_blank", "noopener");
}
document.getElementById("whatsappChat")?.addEventListener("click", openWhatsApp);
document.getElementById("contactWhatsApp")?.addEventListener("click", openWhatsApp);

document.getElementById("whatsappGroup")?.addEventListener("click", event => {
    event.preventDefault();
    window.open(whatsappGroupLink, "_blank", "noopener");
});

/*
  PRODUCT COLOUR VARIATIONS
  Keep each product's main image in `image`. That remains the image shown
  on the collection card. Add extra colour images inside `variations`.

  Example:
  variations: [
      { name: "White", image: "images/black-cap-white.jpg" },
      { name: "Red", image: "images/black-cap-red.jpg" }
  ]

  The main image is automatically included as the first selectable option.
*/
const fashionProducts = [
    {
        id: 1,
        name: "Face Cap",
        category: "Embroidery",
        price: 900,
        description: "A premium embroidery design.",
        image: "images/fearless1.jpg",
        defaultColor: "Black",
        variations: [
            { name: "Black", image: "images/fearless2.jpg" },
            // { name: "Burgundy", image: "images/fearless3.jpg" },
            // { name: "Navy Blue", image: "images/fearless4.jpg" },
            // { name: "Brown", image: "images/fearless5.jpg" },
            // { name: "Pink", image: "images/fearless6.jpg" }
        ]
     },
    // {
    //     id: 2,
    //     name: "Black Face Cap",
    //     category: "Embroidery",
    //     price: 900,
    //     description: "A premium embroidery design.",
    //     image: "images/fearless2.jpg",
    //     defaultColor: "Black",
    //     variations: []
    // },
    {
        id: 3,
        name: "Face Cap",
        category: "Embroidery",
        price: 900,
        description: "A premium embroidery design.",
        image: "images/fearless3.jpg",
        defaultColor: "Burgundy",
        variations: []
    },
    {
        id: 4,
        name: "Face Cap",
        category: "Embroidery",
        price: 900,
        description: "A premium embroidery design.",
        image: "images/fearless4.jpg",
        defaultColor: "Navy Blue",
        variations: []
    },
    {
        id: 5,
        name: "Face Cap",
        category: "Embroidery",
        price: 900,
        description: "A premium embroidery design.",
        image: "images/fearless5.jpg",
        defaultColor: "Brown",
        variations: []
    },
    {
        id: 6,
        name: "Cap",
        category: "Embroidery",
        price: 900,
        description: "A premium embroidery design.",
        image: "images/fearless6.jpg",
        defaultColor: "Pink",
        variations: []
    }
];

const giftProducts = [
    { id: 101, 
        name: "God is with me embroidered hoodie", 
    category: "Embroidery", 
    price: 2600, 
    description: "Fashionable and Trendy(Also available in other colours)", 
    image: "images/Unwavering9.jpg", 
    defaultColor: "Pink",
    variations: [
        { name: "Burgundy",    image: "images/Unwavering10.png"},
        { name: "Light Blue",    image: "images/Unwavering12.png"},
        { name: "Brown",    image: "images/Unwavering17.png"},
    ] 
},

    { id: 102, 
        name: "Faith on Full Volume Hoodie", 
    category: "Embroidery", 
    price: 2600, 
    description: "Pattern - Stylish(Also available in other colours)", 
    image: "images/Unwavering7.jpg", 
    defaultColor: "Brown",
    variations: [
        { name: "Blue",    image: "images/Unwavering8.jpg"},
        { name: "Burgundy",    image: "images/Unwavering6.jpg"},
        { name: "",    image: "images/Unwavering.jpg"},
    ] },

    { id: 103, 
        name: "P.U.F.N.", 
    category: "Embroidery", 
    price: 2600, 
    description: "A keepsake.(Also available in other colours)", 
    image: "images/Unwavering20.jpg", 
    defaultColor: "Purple",
    variations: [
        { name: "Blue",    image: "images/Unwavering5.jpg"},
        { name: "Butter Yellow",    image: "images/Unwavering3.jpg"},
        { name: "Brown",    image: "images/Unwavering4.jpg"},
    ] },

    { id: 104, 
        name: "Busy becoming HER", 
    category: "Embroidery", 
    price: 2600, 
    description: "Elegant.(Also available in other colours)", 
    image: "images/Unwavering14.jpg", 
    defaultColor: "Brown",
    variations: [
        { name: "Sky Blue",    image: "images/Unwaverin16.png"},
        { name: "Burgundy",    image: "images/Unwavering13.png"},
        { name: "Butter Yellow",    image: "images/Unwavering15.png"},
    ] },

    { id: 105, 
        name: "There Is More...", 
    category: "Embroidery", 
    price: 2600, 
    description: "Special - Classic (Also available in other colours)", 
    image: "images/Unwavering18.jpg",
    defaultColor: "Burgundy",
    variations: [
        { name: "Blue",    image: "images/Unwavering11.png"},
        { name: "Butter Yellow",    image: "images/Unwavering1.png"},
        { name: "Brown",    image: "images/Unwavering19.png"},
    ] },

    { id: 106, 
        name: "YHWH", 
    category: "Embroidery", 
    price: 2600, 
    description: "Embroidered Hoodie with a cross detail on the sleeve (Also available in other colours)", 
    image: "images/Unwavering2.jpg",
    defaultColor: "Peach",
    variations: [
    ] }
];

const money = amount => new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
}).format(amount);

const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
}[character]));

let currentProduct = null;
let selectedVariation = null;
let currentVariations = [];

function productCard(product) {
    return `<article class="product-card">
        <div class="product-image">
            <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.closest('.product-image').classList.add('image-missing');this.style.display='none'">
            <span>${escapeHTML(product.category)}</span>
        </div>
        <div class="product-info">
            <h3>${escapeHTML(product.name)}</h3>
            <p>${escapeHTML(product.description)}</p>
            <strong class="product-price">${money(product.price)}</strong>
            <button class="buy-now" type="button" data-product-id="${product.id}">View More <span>↗</span></button>
        </div>
    </article>`;
}

function updateOrderSummary() {
    if (!currentProduct) return;
    const quantityField = document.getElementById("orderQuantity");
    const quantity = Math.max(1, Number(quantityField?.value || 1));
    const colourText = selectedVariation?.name && selectedVariation.name !== "Default"
        ? ` — ${selectedVariation.name}`
        : "";
    const summary = document.getElementById("orderSummary");
    if (summary) {
        summary.textContent = `${currentProduct.name}${colourText} — ${money(currentProduct.price)} × ${quantity} = ${money(currentProduct.price * quantity)}`;
    }
}

function renderProductVariations(product) {
    const wrapper = document.getElementById("orderVariations");
    const options = document.getElementById("orderVariationOptions");
    if (!wrapper || !options) return;

    const defaultOption = {
        name: product.defaultColor || "Default",
        image: product.image
    };
    const extraOptions = Array.isArray(product.variations)
        ? product.variations.filter(item => item && item.name && item.image)
        : [];

    currentVariations = [defaultOption, ...extraOptions];
    selectedVariation = currentVariations[0];
    wrapper.hidden = currentVariations.length < 2;

    options.innerHTML = currentVariations.map((variation, index) => `
        <button class="order-variation${index === 0 ? " active" : ""}"
                type="button"
                data-variation-index="${index}"
                aria-pressed="${index === 0 ? "true" : "false"}"
                aria-label="Select ${escapeHTML(variation.name)} colour">
            <span class="order-variation-image">
                <img src="${escapeHTML(variation.image)}" alt="${escapeHTML(variation.name)}" loading="lazy">
            </span>
            <span class="order-variation-name">${escapeHTML(variation.name)}</span>
        </button>
    `).join("");

    const selectedName = document.getElementById("selectedVariationName");
    if (selectedName) selectedName.textContent = selectedVariation.name;
}

function chooseProductVariation(index) {
    const variation = currentVariations[index];
    if (!variation || !currentProduct) return;

    selectedVariation = variation;

    const mainImage = document.getElementById("orderProductImage");
    if (mainImage) {
        mainImage.src = variation.image;
        mainImage.alt = `${currentProduct.name} — ${variation.name}`;
    }

    document.querySelectorAll("#orderVariationOptions .order-variation").forEach((button, buttonIndex) => {
        const isSelected = buttonIndex === index;
        button.classList.toggle("active", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });

    const selectedName = document.getElementById("selectedVariationName");
    if (selectedName) selectedName.textContent = variation.name;
    updateOrderSummary();
}

function openOrderModal(product) {
    const modal = document.getElementById("orderModal");
    if (!product || !modal) return;

    currentProduct = product;
    selectedVariation = { name: product.defaultColor || "Default", image: product.image };

    const productImage = document.getElementById("orderProductImage");
    if (productImage) {
        productImage.src = product.image;
        productImage.alt = product.name;
    }

    const category = document.getElementById("orderProductCategory");
    const title = document.getElementById("orderTitle");
    const price = document.getElementById("orderProductPrice");
    const description = document.getElementById("orderProductDescription");
    if (category) category.textContent = product.category;
    if (title) title.textContent = product.name;
    if (price) price.textContent = money(product.price);
    if (description) description.textContent = product.description;

    renderProductVariations(product);

    const customisation = document.getElementById("customisation");
    const leaveCustom = document.getElementById("leaveCustom");
    const quantity = document.getElementById("orderQuantity");
    const status = document.getElementById("orderStatus");
    if (customisation) {
        customisation.value = "";
        customisation.disabled = false;
    }
    if (leaveCustom) leaveCustom.checked = false;
    if (quantity) quantity.value = "1";
    if (status) status.textContent = "";
    updateOrderSummary();

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
    selectedVariation = null;
    currentVariations = [];
}

document.addEventListener("click", event => {
    const buyButton = event.target.closest("[data-product-id]");
    if (!buyButton) return;
    const id = Number(buyButton.dataset.productId);
    const product = [...fashionProducts, ...giftProducts].find(item => item.id === id);
    openOrderModal(product);
});

document.getElementById("orderVariationOptions")?.addEventListener("click", event => {
    const button = event.target.closest("[data-variation-index]");
    if (!button) return;
    chooseProductVariation(Number(button.dataset.variationIndex));
});

document.getElementById("orderClose")?.addEventListener("click", closeOrderModal);
document.querySelectorAll("[data-close-order]").forEach(element => element.addEventListener("click", closeOrderModal));
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.getElementById("orderModal")?.classList.contains("open")) {
        closeOrderModal();
    }
});

document.getElementById("leaveCustom")?.addEventListener("change", event => {
    const field = document.getElementById("customisation");
    if (!field) return;
    field.disabled = event.target.checked;
    field.value = event.target.checked
        ? "Customer leaves customisation/design decision to Dee's Studio."
        : "";
});

document.getElementById("orderQuantity")?.addEventListener("input", updateOrderSummary);

/* Build an absolute URL for the exact selected variation image.
   The image file must be deployed publicly so it can load inside an email. */
function getSelectedImageUrl(imagePath) {
    const imageUrl = new URL(imagePath, document.baseURI);
    if (!['http:', 'https:'].includes(imageUrl.protocol)) {
        throw new Error('The selected product image does not have a valid web URL.');
    }
    return imageUrl.href;
}

function setOrderStatus(message, type = "") {
    const status = document.getElementById("orderStatus");
    if (!status) return;
    status.textContent = message;
    status.className = `order-status${type ? ` ${type}` : ""}`;
}

/* Order request — sends the selected variation as an embedded email attachment. */
const orderForm = document.getElementById("orderForm");
orderForm?.addEventListener("submit", async event => {
    event.preventDefault();
    if (!currentProduct || !selectedVariation) return;

    if (!emailConfigReady || !window.emailjs) {
        setOrderStatus("Email setup is not complete yet. Add your EmailJS public key, service ID and order template ID in js/main.js.", "error");
        return;
    }

    const customer = {
        name: document.getElementById("customerName")?.value.trim() || "",
        contact: document.getElementById("customerContact")?.value.trim() || "",
        email: document.getElementById("customerEmail")?.value.trim() || "",
        address: document.getElementById("customerAddress")?.value.trim() || ""
    };

    const quantity = Math.max(1, Number(document.getElementById("orderQuantity")?.value || 1));
    const leaveDecision = document.getElementById("leaveCustom")?.checked || false;
    const customText = leaveDecision
        ? "Customer leaves customisation/design decision to Dee's Studio."
        : document.getElementById("customisation")?.value.trim() || "No customisation requested.";

    const submitButton = orderForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.textContent;
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending request...";
    }
    setOrderStatus("Preparing your selected product image and sending your order request...");

    try {
        const selectedImageUrl = getSelectedImageUrl(selectedVariation.image);
        const productTotal = currentProduct.price * quantity;
        const colourSuffix = selectedVariation.name && selectedVariation.name !== "Default"
            ? ` — ${selectedVariation.name}`
            : "";

        const templateParams = {
            to_email: "deestudio287@gmail.com",
            order_subject: `New Dee's Studio order request — ${currentProduct.name}${colourSuffix}`,
            product_name: currentProduct.name,
            product_category: currentProduct.category,
            product_id: String(currentProduct.id),
            product_unit_price: money(currentProduct.price),
            selected_colour: selectedVariation.name,
            selected_image_path: selectedVariation.image,
            selected_image_url: selectedImageUrl,
            quantity: String(quantity),
            estimated_total: money(productTotal),
            customisation: customText,
            customer_name: customer.name,
            customer_contact: customer.contact,
            customer_email: customer.email,
            reply_to: customer.email,
            delivery_address: customer.address,
            order_summary: `${currentProduct.name}${colourSuffix} — ${money(currentProduct.price)} × ${quantity} = ${money(productTotal)}`
        };

        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.orderTemplateId,
            templateParams
        );

        setOrderStatus("Your order request has been sent successfully to Dee's Studio. The selected product image is linked in the email.", "success");
    } catch (error) {
        const details = error?.text || error?.message || String(error);
        const statusCode = error?.status ? ` (HTTP ${error.status})` : "";
        console.error("Dee's Studio EmailJS order error:", {
            status: error?.status,
            text: error?.text,
            message: error?.message,
            error
        });
        setOrderStatus(`Order could not be sent${statusCode}: ${String(details).slice(0, 260)}`, "error");
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText || "Send Order Request";
        }
    }
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

    let startX = 0;
    track.addEventListener("touchstart", event => {
        startX = event.touches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", event => {
        const distance = event.changedTouches[0].clientX - startX;
        if (Math.abs(distance) > 45) {
            index += distance < 0 ? 1 : -1;
            update();
        }
    }, { passive: true });

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

    const previous = document.getElementById("reviewPrev");
    const next = document.getElementById("reviewNext");
    if (previous) previous.disabled = reviewIndex === 0;
    if (next) next.disabled = reviewIndex === max;

    if (reviewDots) {
        reviewDots.innerHTML = reviewCards.map((_, index) =>
            `<button type="button" class="${index === reviewIndex ? "active" : ""}" aria-label="Show review ${index + 1}" data-review-index="${index}"></button>`
        ).join("");
    }
}

document.getElementById("reviewPrev")?.addEventListener("click", () => {
    reviewIndex--;
    updateReviews();
});
document.getElementById("reviewNext")?.addEventListener("click", () => {
    reviewIndex++;
    updateReviews();
});
reviewDots?.addEventListener("click", event => {
    const dot = event.target.closest("[data-review-index]");
    if (dot) {
        reviewIndex = Number(dot.dataset.reviewIndex);
        updateReviews();
    }
});
window.addEventListener("resize", updateReviews);
updateReviews();

/* Custom enquiry */
document.getElementById("customForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name")?.value.trim() || "";
    const service = document.getElementById("service")?.value || "";
    const message = document.getElementById("message")?.value.trim() || "";
    if (!name || !service || !message) return;

    const subject = `Dee's Studio custom enquiry — ${service}`;
    const body = [`Name: ${name}`, `Service: ${service}`, "", "Project details:", message].join("\n");
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
    }, { passive: true });
}
