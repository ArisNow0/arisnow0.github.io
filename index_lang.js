const translations = {
    en: {
        title: "ArisNow0 | Main",
        home: "Main",
        portfolio: "Portfolio",
        contact: "Contact",
        name: "ArisNow0",
        description: [
            "Hello, I am a developer.",
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
        title: "ArisNow0 | Головна",
        home: "Головна",
        portfolio: "Портфоліо",
        contact: "Контакти",
        name: "ArisNow0",
        description: [
            "Привет, я разработчик."
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
        en: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_the_United_States_%2851_stars%29.svg/330px-Flag_of_the_United_States_%2851_stars%29.svg.png",
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
    document.title = translations[lang].title;
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