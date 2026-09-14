const heroWord = document.getElementById("heroWord");

const heroWords = ["YOURS.", "PERSONAL.", "UNIQUE.", "SPECIAL."];
let wordIndex = 0;

setInterval(() => {
    if (!heroWord) return;

    heroWord.style.opacity = "0";

    setTimeout(() => {
        wordIndex = (wordIndex + 1) % heroWords.length;
        heroWord.textContent = heroWords[wordIndex];
        heroWord.style.opacity = "1";
    }, 250);
}, 2500);

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton?.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open");
});

mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
    });
});

const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

const customForm = document.getElementById("customForm");

customForm?.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !service || !message) {
        alert("Please complete all required fields.");
        return;
    }

    alert(`Thank you, ${name}! Your ${service} request has been received. The email and database system will be connected in the next stage.`);
    customForm.reset();
});

const whatsappNumber = "234XXXXXXXXXX";
const whatsappMessage = "Hello Dee Studio! I would like to make an enquiry about your custom products.";

function openWhatsApp(event) {
    event.preventDefault();

    if (whatsappNumber.includes("X")) {
        alert("Please add the Dee Studio WhatsApp number in main.js.");
        return;
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
}

document.getElementById("whatsappChat")?.addEventListener("click", openWhatsApp);
document.getElementById("contactWhatsApp")?.addEventListener("click", openWhatsApp);

const whatsappGroupLink = "https://chat.whatsapp.com/YOUR_GROUP_LINK";
const whatsappGroup = document.getElementById("whatsappGroup");

whatsappGroup?.addEventListener("click", event => {
    event.preventDefault();

    if (whatsappGroupLink.includes("YOUR_GROUP_LINK")) {
        alert("Please add the Dee Studio WhatsApp group link in main.js.");
        return;
    }

    window.open(whatsappGroupLink, "_blank");
});

const revealElements = document.querySelectorAll(".service-card, .product-card, .about-content, .custom-form-box");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";
    revealObserver.observe(element);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
});

const heroVisual = document.querySelector(".hero-visual");
const heroImage = document.querySelector(".hero-image");

if (heroVisual && heroImage) {
    heroVisual.addEventListener("mousemove", event => {
        const rect = heroVisual.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const moveX = (x / rect.width - 0.5) * 12;
        const moveY = (y / rect.height - 0.5) * 12;

        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
        heroImage.style.transform = "translate(0, 0)";
    });
}

const collectionProducts=[
    {id:1,name:"Custom Embroidered Hand Bag",
    category:"Embroidery",
    price:35000,
    description:"A premium hand bag personalised with your chosen embroidery design.",
    image:"images/embroidery-1.jpg"},
    {id:2,name:"Rhinestone Statement Tee",
    category:"Rhinestone",
    price:25000,
    description:"A statement tee finished with a custom rhinestone design.",
    image:"images/Rhinestones-1.jpg"},

    {id:3,
        name:"Psalm Vinyl T-Shirt",
    category:"Vinyl",
    price:18000,
    description:"A clean psalm vinyl piece created around your chosen text or design.",
    image:"images/vinyl-1.jpg"},

    {id:4,
        name:"Custom Embroidery Hoodie",
    category:"Embroidery",
    price:22000,
    description:"A personalised embroidery beauty wear.",
    image:"images/embriodery-2.jpg"},

    {id:5,
        name:"Foil-Themed Birthday Frame",
    category:"Calligraphy + Foiling",
    price:10000,
    description:"An elegant foil-themed birthday piece designed for gifting.",
    image:"images/foiled-1.jpg"}
    ];
    const productTrack=document.getElementById("productTrack"),collectionPrev=document.getElementById("collectionPrev"),collectionNext=document.getElementById("collectionNext"),collectionProgress=document.getElementById("collectionProgress"),productCount=document.getElementById("productCount");
    let collectionIndex=0,currentProduct=null;
    const money=amount=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(amount);
    function renderProducts(){if(!productTrack)return;productTrack.innerHTML=collectionProducts.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span>${p.category}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><strong class="product-price">${money(p.price)}</strong><button class="buy-now" data-product-id="${p.id}">Buy Now ↗</button></div></article>`).join("");productCount.textContent=collectionProducts.length;productTrack.querySelectorAll(".buy-now").forEach(b=>b.addEventListener("click",()=>openOrderModal(collectionProducts.find(p=>p.id===Number(b.dataset.productId)))));updateCarousel()}
    function visibleProducts(){return window.innerWidth<=700?1:window.innerWidth<=1000?2:3}
    function updateCarousel(){if(!productTrack)return;const visible=visibleProducts(),max=Math.max(collectionProducts.length-visible,0);collectionIndex=Math.min(collectionIndex,max);const card=productTrack.querySelector(".product-card");if(!card)return;productTrack.style.transform=`translateX(-${collectionIndex*(card.getBoundingClientRect().width+25)}px)`;collectionPrev.disabled=collectionIndex===0;collectionNext.disabled=collectionIndex===max;collectionProgress.style.width=`${max===0?100:Math.min(((collectionIndex+visible)/collectionProducts.length)*100,100)}%`}
    collectionPrev?.addEventListener("click",()=>{collectionIndex--;updateCarousel()});collectionNext?.addEventListener("click",()=>{collectionIndex++;updateCarousel()});window.addEventListener("resize",updateCarousel);
    const orderModal=document.getElementById("orderModal"),orderClose=document.getElementById("orderClose"),orderProductImage=document.getElementById("orderProductImage"),orderProductCategory=document.getElementById("orderProductCategory"),orderTitle=document.getElementById("orderTitle"),orderProductPrice=document.getElementById("orderProductPrice"),orderProductDescription=document.getElementById("orderProductDescription"),orderSummary=document.getElementById("orderSummary"),customisation=document.getElementById("customisation"),leaveCustom=document.getElementById("leaveCustom"),orderForm=document.getElementById("orderForm");
    function openOrderModal(product){if(!product)return;currentProduct=product;orderProductImage.src=product.image;orderProductImage.alt=product.name;orderProductCategory.textContent=product.category;orderTitle.textContent=product.name;orderProductPrice.textContent=money(product.price);orderProductDescription.textContent=product.description;orderSummary.textContent=`${product.name} — ${money(product.price)}`;customisation.value="";leaveCustom.checked=false;customisation.disabled=false;orderModal.classList.add("open");orderModal.setAttribute("aria-hidden","false");document.body.classList.add("menu-open");document.getElementById("customerName")?.focus()}
    function closeOrderModal(){orderModal?.classList.remove("open");orderModal?.setAttribute("aria-hidden","true");document.body.classList.remove("menu-open");currentProduct=null}
    orderClose?.addEventListener("click",closeOrderModal);document.querySelectorAll("[data-close-order]").forEach(e=>e.addEventListener("click",closeOrderModal));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&orderModal?.classList.contains("open"))closeOrderModal()});
    leaveCustom?.addEventListener("change",()=>{customisation.disabled=leaveCustom.checked;customisation.value=leaveCustom.checked?"Customer leaves customisation/design decision to Dee Studio.":""});
    orderForm?.addEventListener("submit",e=>{e.preventDefault();if(!currentProduct)return;const customer={name:document.getElementById("customerName").value.trim(),contact:document.getElementById("customerContact").value.trim(),email:document.getElementById("customerEmail").value.trim(),address:document.getElementById("customerAddress").value.trim()};const customText=leaveCustom.checked?"Leave customisation/design decision to Dee Studio.":customisation.value.trim()||"No customisation requested.";const subject=`New Dee Studio Order Request — ${currentProduct.name}`;const body=["DEE STUDIO — NEW ORDER REQUEST","",`Product: ${currentProduct.name}`,`Category: ${currentProduct.category}`,`Price: ${money(currentProduct.price)}`,`Product ID: ${currentProduct.id}`,"","CUSTOMISATION",customText,"","CUSTOMER DETAILS",`Name: ${customer.name}`,`Contact: ${customer.contact}`,`Email: ${customer.email}`,`Address: ${customer.address}`,"","Please acknowledge this request and confirm the final production/delivery details."].join("\n");const studioEmail="YOUR_EMAIL@example.com";if(studioEmail==="taleatemmanuel@gmail.com"){alert("THANKS FOR YOUR INTEREST, you'll get a response from the Dee Studio receiving email.");return}window.location.href=`mailto:${studioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`});
    renderProducts();