//Triggering gradient change on H1 with mouse event on .child containers
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

//Restarting @kiwifunk animation each time card is brought back into view
document.addEventListener('DOMContentLoaded', () => {
    const options = { threshold: 0.5 };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const span = entry.target.querySelector('.page-heading h2 span');
            if (span) {
                span.classList.toggle('animated', entry.isIntersecting);
                if (entry.isIntersecting) {
                    void span.offsetWidth; // Trigger a reflow
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    document.querySelectorAll('section').forEach(section => observer.observe(section));
});


// Navigation Dot
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

// Show Tab content when appropriate tab is selected
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('input[name="tabs"]');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('change', function() {
            contents.forEach(content => {
                content.style.display = 'none';
            });
            const contentID = tab.id.replace('-tab', '-content');
            document.getElementById(contentID).style.display = 'block';
        });
    });

    const selectedTab = document.querySelector('input[name="tabs"]:checked');
    document.getElementById(selectedTab.id.replace('-tab', '-content')).style.display = 'block';
});

//Apply different width properties to the percentage-bar class depending on the element using it

/* 
LEGACY CODE
document.addEventListener('DOMContentLoaded', function() {
    const bars = document.querySelectorAll('.percentage-bar');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--width', width + 'vw');
    });
})
*/

//Updated version that uses IntersectionObserver to reload the page whenever this section is in the viewport
document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.percentage-bar');
    const setWidths = () => bars.forEach(bar => bar.style.setProperty('--width', bar.dataset.width + 'vw'));
    setWidths();

    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            bars.forEach(bar => {
                bar.style.animation = 'none';
                bar.offsetHeight; /* trigger reflow */
                bar.style.animation = 'bar-grow 3s ease-out, animate-gradient 20s infinite';
            });
            setWidths();
        }
    }, { threshold: 0.5 }).observe(document.querySelector('#skills-card'));
});
