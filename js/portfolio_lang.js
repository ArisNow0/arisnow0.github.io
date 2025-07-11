const translations = {
    en: {
        nav: {
            home: "Home",
            portfolio: "Portfolio",
            contacts: "Contacts"
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
        card: [
            {
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
                title: "Pardon Tools",
                description: "Open-source app with many useful features like file comparison, value editing, and renaming in files. A dedicated website was also created for it.",
                tools: "C#, HTML, CSS, JavaScript"
            }
        ]
    },
    ru: {
        nav: {
            home: "Главная",
            portfolio: "Портфолио",
            contacts: "Контакты"
        },
        buttons: {
            more: "Подробнее",
            seeAll: "Увидеть Всё",
            visitSite: "Перейти на сайт",
            close: "Закрыть"
        },
        modal: {
            usedTech: "Используемые технологии:"
        },
        card: [
            {
                title: "3D Модели и Анимации",
                description: "Здесь собраны мои работы с 3D-моделями, анимациями и визуализацией."
            },
            {
                title: "GadgetSale",
                description: "Онлайн-магазин был разработан за два месяца. В нем реализованы функции онлайн-оплаты через сервис Wayforpay, отображение актуального количества товаров в реальном времени, а также интеграция карты для выбора отделения почты при оформлении заказа. После оформления заказ автоматически отправлялся на электронную почту покупателя и магазина для дальнейшей обработки и отправки товара.",
                tools: "HTML, CSS, JavaScript, PHP, Сервис Leaflet, Сервис Wayforpay"
            },
            {
                title: "ShellChain",
                description: "Сайт для Minecraft-сервера был разработан за три недели. Он включает в себя ряд визуально привлекательных элементов, таких как таймлайн, раздел с часто задаваемыми вопросами, а также переключатель светлой и тёмной темы.",
                tools: "HTML, CSS, JavaScript, Сервис FontAwesome"
            },
            {
                title: "Pardon Tools",
                description: "Программа с открытым исходным кодом, включающая множество полезных функций, таких как сравнение файлов, изменение значений в приложениях, а также замена названий в определённых файлах. Для программы также разработан собственный веб-сайт, доступный для пользователей.",
                tools: "C#, HTML, CSS, JavaScript"
            }
        ]
    },
    ua: {
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
        card: [
            {
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
            },
            {
                title: "Pardon Tools",
                description: "Програма з відкритим кодом, яка має безліч корисних функцій: порівняння файлів, редагування значень у додатках, перейменування файлів. Також створено окремий вебсайт для програми.",
                tools: "C#, HTML, CSS, JavaScript"
            }
        ]
    }
};

function setLanguage(lang) {
    const t = translations[lang];

    const flagUrls = {
        en: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Flag_of_the_United_States_%28Pantone%29.svg",
        ru: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png",
        ua: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"
    };
    const currentFlagImg = document.querySelector("#current-flag img");
    if (currentFlagImg && flagUrls[lang]) {
        currentFlagImg.src = flagUrls[lang];
    }
    document.querySelector('a.tab[href="index.html"]').textContent = t.nav.home;
    document.querySelector('a.tab[href="portfolio.html"]').textContent = t.nav.portfolio;
    document.querySelector('a.tab[href="#"]').textContent = t.nav.contacts;

    // Кнопки
    document.querySelectorAll('.text-card-button').forEach(btn => btn.textContent = t.buttons.more);
    document.getElementById('modal-link').textContent = t.buttons.visitSite;
    document.querySelectorAll('.close-button').forEach(btn => btn.textContent = t.buttons.close);
    document.querySelector('.visit-button[href*="animations"]').textContent = t.buttons.seeAll;

    // Модал
    document.getElementById('modal-tools').previousElementSibling.textContent = t.modal.usedTech;

    // Карточки
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach((card, index) => {
        const data = t.card[index];
        if (!data) return;
        card.querySelector('.card-title').textContent = data.title;
        card.dataset.title = data.title;
        card.dataset.description = data.description;
        if (data.tools) card.dataset.tools = data.tools;
    });

    // Анимация модал
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
        setLanguage(savedLang);
    } else {
        const systemLang = navigator.language.slice(0, 2);

        const supportedLangs = ["en", "ru", "ua"];

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