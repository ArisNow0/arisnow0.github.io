const translations = {
    en: {
        title: "ArisNow | Portfolio",
        nav: {
            home: "Main",
            portfolio: "Portfolio",
            contacts: "Contact"
        },
        buttons: {
            more: "More",
            seeAll: "See All",
            visitSite: "Visit Site",
            close: "Close"
        },
        modal: {
            usedTech: "Used technologies:"
        },
        card: [{
                title: "3D Models and Animations",
                description: "Here are my works with 3D models, animations and visualization."
            },
            {
                title: "GadgetSale",
                description: "Online store developed in two months. It features online payment via Wayforpay, real-time product stock display, and map integration to select a postal office. After ordering, a confirmation is automatically sent to both the customer and the store email.",
                tools: "HTML, CSS, JavaScript, PHP, Leaflet service, Wayforpay service"
            },
            {
                title: "ShellChain",
                description: "Website for a Minecraft server created in three weeks. Includes visually appealing elements such as a timeline, FAQ section, and light/dark theme toggle.",
                tools: "HTML, CSS, JavaScript, FontAwesome service"
            },
            {
                title: "PardonTools",
                description: "Open-source app with many useful features like file comparison, value editing, and renaming in files. A dedicated website was also created for it.",
                tools: "C#, HTML, CSS, JavaScript"
            },
            {
                title: "BreakingNews",
                description: "Online news website with ads, filters, search, Supabase integration and an admin panel for content management.",
                tools: "HTML, CSS, JavaScript"
            }
        ]
    },
    ua: {
        title: "ArisNow | Портфоліо",
        nav: {
            home: "Головна",
            portfolio: "Портфоліо",
            contacts: "Контакти"
        },
        buttons: {
            more: "Детальніше",
            seeAll: "Побачити все",
            visitSite: "Перейти на сайт",
            close: "Закрити"
        },
        modal: {
            usedTech: "Використані технології:"
        },
        card: [{
                title: "3D Моделі та Анімації",
                description: "Тут зібрані мої роботи з 3D-моделями, анімаціями та візуалізацією."
            },
            {
                title: "GadgetSale",
                description: "Інтернет-магазин створено за два місяці. Має функцію онлайн-оплати через Wayforpay, відображення наявності товарів у реальному часі та інтеграцію карти для вибору відділення пошти. Після замовлення лист автоматично надсилається на пошту покупця та магазину.",
                tools: "HTML, CSS, JavaScript, PHP, Сервіс Leaflet, Сервіс Wayforpay"
            },
            {
                title: "ShellChain",
                description: "Сайт для Minecraft-сервера, створений за три тижні. Включає таймлайн, FAQ та перемикач світлої/темної теми.",
                tools: "HTML, CSS, JavaScript, Сервіс FontAwesome"
            }
        ]
    }
};

function setLanguage(lang) {
    const t = translations[lang];

    const flagUrls = {
        en: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_the_United_States_%2851_stars%29.svg/330px-Flag_of_the_United_States_%2851_stars%29.svg.png",
        ua: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"
    };
    const currentFlagImg = document.querySelector("#current-flag img");
    if (currentFlagImg && flagUrls[lang]) {
        currentFlagImg.src = flagUrls[lang];
    }

    document.title = translations[lang].title;
    document.querySelector('a.tab[href="index.html"]').textContent = t.nav.home;
    document.querySelector('a.tab[href="portfolio.html"]').textContent = t.nav.portfolio;
    document.querySelector('a.tab[href="contact.html"]').textContent = t.nav.contacts;

    document.querySelectorAll('.text-card-button').forEach(btn => btn.textContent = t.buttons.more);
    document.getElementById('modal-link').textContent = t.buttons.visitSite;
    document.querySelectorAll('.close-button').forEach(btn => btn.textContent = t.buttons.close);
    document.querySelector('.visit-button[href*="AnimationsAndModels.html"]').textContent = t.buttons.seeAll;

    document.getElementById('modal-tools').previousElementSibling.textContent = t.modal.usedTech;

    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach((card, index) => {
        const data = t.card[index];
        if (!data) return;
        card.querySelector('.card-title').textContent = data.title;
        card.dataset.title = data.title;
        card.dataset.description = data.description;
        if (data.tools) card.dataset.tools = data.tools;
    });

    document.getElementById('modal-titleAn').textContent = t.card[0].title;
    document.getElementById('modal-descriptionAn').textContent = t.card[0].description;

}

document.querySelectorAll(".flagd").forEach(flag => {
    flag.addEventListener("click", () => {
        const lang = flag.getAttribute("data-lang");
        setLanguage(lang);
    });
});



function loadLanguage() {
    let savedLang = localStorage.getItem("language");

    if (savedLang) {
        if (savedLang === "ru") savedLang = "en";
        setLanguage(savedLang);
    } else {
        const systemLang = navigator.language.slice(0, 2);

        const supportedLangs = ["en", "ua"];

        let selectedLang = systemLang === "uk" ? "ua" : systemLang;


        if (!supportedLangs.includes(selectedLang)) {
            selectedLang = "en";
        }

        setLanguage(selectedLang);
        saveLanguage(selectedLang);
    }
}

function saveLanguage(lang) {
    localStorage.setItem("language", lang);
}
loadLanguage();

const switcher = document.getElementById('lang-switcher');
const currentFlag = document.getElementById('current-flag').querySelector('img');
const flagsContainer = document.querySelector('.flags');
const flagOptions = document.querySelectorAll('.flagd');


switcher.addEventListener('click', () => {
    flagsContainer.classList.toggle('active');
});

flagOptions.forEach(flag => {
    flag.addEventListener('click', (e) => {
        e.stopPropagation();

        const lang = flag.getAttribute('data-lang');

        flagsContainer.classList.remove('active');

        saveLanguage(lang);
        setLanguage(lang);
    });
});



document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
        flagsContainer.classList.remove('active');
    }
});