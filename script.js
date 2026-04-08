// Navigation scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on state
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal, .reveal-right');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Setup active link highlight on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Certificates Modal functionality
const certData = {
    'aiml': {
        title: 'AI/ML Engineering',
        icon: 'fa-robot',
        desc: 'Completed an intensive certification focusing on machine learning algorithms, deep learning, and practical AI applications for real-world scenarios.'
    },
    'autocad': {
        title: 'AutoCAD (3D Design)',
        icon: 'fa-drafting-compass',
        desc: 'Certified proficiency in 3D modeling, spatial visualization, and detailed CAD design for complex hardware components and architecture.'
    },
    'management': {
        title: 'Project Management',
        icon: 'fa-tasks',
        desc: 'Gained skills in strategic planning, agile methodologies, and effective team coordination to successfully deliver technology projects on time.'
    },
    'vlsi': {
        title: 'VLSI',
        icon: 'fa-memory',
        desc: 'Specialized training in Very Large Scale Integration, focusing on integrated circuit design, fabrication processes, and hardware optimization.'
    }
};

const certBadges = document.querySelectorAll('.cert-clickable');
const modalOverlay = document.getElementById('cert-modal');
const modalCloseBtn = document.getElementById('modal-close');
const modalIconEl = document.getElementById('modal-icon');
const modalTitleEl = document.getElementById('modal-title');
const modalDescEl = document.getElementById('modal-desc');

if (certBadges && modalOverlay) {
    certBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            const certId = badge.getAttribute('data-cert');
            const data = certData[certId];
            
            if (data) {
                modalIconEl.innerHTML = `<i class="fas ${data.icon}"></i>`;
                modalTitleEl.textContent = data.title;
                modalDescEl.textContent = data.desc;
                modalOverlay.classList.add('active');
            }
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
}
