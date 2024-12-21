document.querySelectorAll('.child').forEach(item => {
    item.addEventListener('mouseover', () => {
        const heading = document.querySelector('.page-heading h1');
        heading.classList.add('hover-gradient-' + item.id);
    });
    item.addEventListener('mouseout', () => {
        const heading = document.querySelector('.page-heading h1');
        heading.className = heading.className.replace(/\bhover-gradient-\S+/g, '');
    });
});


function checkActiveSection() {
const sections = document.querySelectorAll('section');
const navdots = document.querySelectorAll('.navdot');

let currentSection;

sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = section;
    }
});

navdots.forEach(dot => {
    dot.classList.remove('active-dot');
});

if (currentSection) {
    const activeDot = document.querySelector(`.navdot-link[href="#${currentSection.id}"] .navdot`);
    if (activeDot) {
        activeDot.classList.add('active-dot');
    }
}
}

document.addEventListener('scroll', checkActiveSection);
window.addEventListener('load', checkActiveSection);
