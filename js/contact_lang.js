const translations = {
    en: {
        title: "ArisNow | Contact",
        nav: {
            home: "Main",
            portfolio: "Portfolio",
            contacts: "Contact"
        },
        header: {
            heading: "ArisNow",
            sub: "Contact me in any convenient way"
        },
        sections: {
            contactTitle: "Contacts",
            socialTitle: "Social Media"
        },
        contact: {
            phone: "Phone",
            phoneNote: "Better to message on Telegram",
            email: "Email",
            telegram: "Telegram",
            discord: "Discord"
        },
        socials: {
            steam: "Steam",
            tgChannel: "Telegram Channel",
            github: "GitHub",
            twitch: "Twitch",
            youtubeMain: "YouTube (Main)",
            youtubeSecond: "YouTube (Second)"
        }
    },
    ua: {
        title: "ArisNow | Контакти",
        nav: {
            home: "Головна",
            portfolio: "Портфоліо",
            contacts: "Контакти"
        },
        header: {
            heading: "ArisNow",
            sub: "Зв’яжіться зі мною зручним способом"
        },
        sections: {
            contactTitle: "Контакти",
            socialTitle: "Соціальні мережі"
        },
        contact: {
            phone: "Телефон",
            phoneNote: "Краще писати в Telegram",
            email: "Email",
            telegram: "Telegram",
            discord: "Discord"
        },
        socials: {
            steam: "Steam",
            tgChannel: "Telegram канал",
            github: "GitHub",
            twitch: "Twitch",
            youtubeMain: "YouTube (основний)",
            youtubeSecond: "YouTube (другий)"
        }
    }
};

function setLanguage(lang) {
    const t = translations[lang];

    const flagUrls = {
        en: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Flag_of_the_United_States_%28Pantone%29.svg",
        ua: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"
    };
    const currentFlagImg = document.querySelector("#current-flag img");
    if (currentFlagImg && flagUrls[lang]) {
        currentFlagImg.src = flagUrls[lang];
    }

    document.title = t.title;
    document.querySelector('a.tab[href="index.html"]').textContent = t.nav.home;
    document.querySelector('a.tab[href="portfolio.html"]').textContent = t.nav.portfolio;
    document.querySelector('a.tab[href="contact.html"]').textContent = t.nav.contacts;

    document.querySelector(".secheader h1").textContent = t.header.heading;
    document.querySelector(".secheader p").textContent = t.header.sub;

    document.querySelectorAll(".section-title h2")[0].textContent = t.sections.contactTitle;
    document.querySelectorAll(".section-title h2")[1].textContent = t.sections.socialTitle;

    const contactNames = document.querySelectorAll(".contact-name");
    contactNames[0].textContent = t.contact.phone;
    contactNames[1].textContent = t.contact.email;
    contactNames[2].textContent = t.contact.telegram;
    contactNames[3].textContent = t.contact.discord;

    document.querySelectorAll(".note").forEach(note => {
        note.textContent = t.contact.phoneNote;
    });

    const socialNames = document.querySelectorAll(".social-name");
    socialNames[0].textContent = t.socials.steam;
    socialNames[1].textContent = t.socials.tgChannel;
    socialNames[2].textContent = t.socials.github;
    socialNames[3].textContent = t.socials.twitch;
    socialNames[4].textContent = t.socials.youtubeMain;
    socialNames[5].textContent = t.socials.youtubeSecond;
}




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