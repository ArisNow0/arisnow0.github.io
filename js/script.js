document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Фиксация шапки при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Таймер "лет опыта"
    function updateExperience() {
        const startYear = 2020;
        const currentYear = new Date().getFullYear();
        const experience = currentYear - startYear;
        document.querySelectorAll('.experience-years').forEach(el => {
            el.textContent = experience;
        });
    }
    
    updateExperience();
    setInterval(updateExperience, 1000 * 60 * 60 * 24);
});