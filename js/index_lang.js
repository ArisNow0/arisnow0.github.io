const translations = {
    ru: {
        home: "Главная",
        portfolio: "Портфолио",
        contact: "Контакты",
        name: "ArisNow0",
        description: [
            "Я fullstack разработчик с опытом работы в различных областях программирования. Основатель студии CatBios. Работаю с C++, Java, JavaScript, Python и веб-технологиями.",
            "Параллельно занимаюсь 3D графикой в Blender. Люблю сложные технические задачи и творческие проекты.",
            "Готов взяться за любой проект - от сложных систем до простых скриптов. Если идея интересная, то я уже с вами ."
        ],
        skills: {
            programming: "Кодинг",
            graphics: {
                title: "3D Графика",
                Modeling: "Моделирование",
                Animation: "Анимация",
                Texturing: "Текстурирование"
            },
            tools: "Инструменты",
            web: "Веб-разработка"
        },
        scroll: "Прокрутите вниз"
    },
    en: {
        home: "Home",
        portfolio: "Portfolio",
        contact: "Contact",
        name: "ArisNow0",
        description: [
            "I'm a fullstack developer with experience in various programming areas. Founder of CatBios studio. I work with C++, Java, JavaScript, Python, and web technologies.",
            "In parallel, I work with 3D graphics in Blender. I love complex technical challenges and creative projects.",
            "I'm ready to take on any project — from complex systems to simple scripts. If the idea is interesting, I'm in."
        ],
        skills: {
            programming: "Programming",
            graphics: {
                title: "3D Graphics",
                Modeling: "Modeling",
                Animation: "Animation",
                Texturing: "Texturing"
            },
            tools: "Tools",
            web: "Web Development"
        },
        scroll: "Scroll down"
    },
    ua: {
        home: "Головна",
        portfolio: "Портфоліо",
        contact: "Контакти",
        name: "ArisNow0",
        description: [
            "Я fullstack розробник з досвідом у різних галузях програмування. Засновник студії CatBios. Працюю з C++, Java, JavaScript, Python та веб-технологіями.",
            "Паралельно займаюся 3D графікою в Blender. Люблю складні технічні завдання та творчі проекти.",
            "Готовий взятися за будь-який проєкт — від складних систем до простих скриптів. Якщо ідея цікава — я з вами."
        ],
        skills: {
            programming: "Кодування",
            graphics: {
                title: "3D Графіка",
                Modeling: "Моделювання",
                Animation: "Анімація",
                Texturing: "Текстурування"
            },
            tools: "Інструменти",
            web: "Веб-розробка"
        },
        scroll: "Прокрутіть вниз"
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

    const scrollSpan = document.querySelector('.icon-text-block span');
    scrollSpan.textContent = t.scroll;
    document.querySelectorAll(".tab")[0].textContent = t.home;
    document.querySelectorAll(".tab")[1].textContent = t.portfolio;
    document.querySelectorAll(".tab")[2].textContent = t.contact;

    document.getElementById("name").textContent = t.name;
    const desc = document.getElementById("des");
    desc.innerHTML = "";
    t.description.forEach(line => {
        const p = document.createElement("p");
        p.textContent = line;
        desc.appendChild(p);
    });

    document.querySelector("#card3 h3").textContent = t.skills.programming;
    document.querySelector("#card2 h3").textContent = t.skills.graphics.title;
    const listItems = document.querySelectorAll("#card2 li");

    listItems[1].textContent = t.skills.graphics.Modeling;
    listItems[2].textContent = t.skills.graphics.Animation;
    listItems[3].textContent = t.skills.graphics.Texturing;

    document.querySelector("#card1 h3").textContent = t.skills.tools;
    document.querySelector("#card4 h3").textContent = t.skills.web;
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