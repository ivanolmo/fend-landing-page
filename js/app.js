/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

// variable for navbar that will be populated
const navBar = document.getElementById('navbar__list');

// variable for each section of page
const pageSections = document.querySelectorAll('section');

// variable for scroll to top button
const scrollToTopBtn = document.querySelector('a.scroll-to-top');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// check if an element is visible in the viewport
const isInViewport = function (element) {
    let bounding = element.getBoundingClientRect();
    return (
        bounding.top >= -300 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight + 300 || document.documentElement.clientHeight + 300) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const activateElement = function (element) {
    element.classList.add('active');
};

const deactivateElement = function (element) {
    element.classList.remove('active');
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// dynamically build navbar
function buildNavBar() {
    for (let pageSection of pageSections) {
        let navMenuItem = document.createElement('li');
        let navSectionLink = document.createElement('a');
        let sectionID = pageSection.id;

        navSectionLink.className = 'menu__link';
        navSectionLink.innerText = pageSection.dataset.nav;
        navSectionLink.href = `#${sectionID}`;
        navSectionLink.id = `nav-${sectionID}`;

        navMenuItem.append(navSectionLink);
        navBar.appendChild(navMenuItem);
    }
}

// toggle active class if element in or out of viewport
const activeSection = function () {
    for (let pageSection of pageSections) {
        let navMenuItem = document.querySelector(`a#nav-${pageSection.id}`);
        if (isInViewport(pageSection)) {
            activateElement(pageSection);
            activateElement(navMenuItem);
        } else {
            deactivateElement(pageSection);
            deactivateElement(navMenuItem);
        }
    }
};

//Scroll to anchor ID using scrollTO event
const scrollToSection = function (event) {
    if (event.target.className === 'menu__link') {
        event.preventDefault();
        let element = document.querySelector(event.target.getAttribute('href'));
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
};

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', function () {
    buildNavBar();
});

// Button to scroll to top
scrollToTopBtn.addEventListener('click', function () {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
});

// check whether or not to show scroll to top button
window.addEventListener('scroll', function () {
    if (!isInViewport(pageSections[0])) {
        scrollToTopBtn.style.opacity = '0.7';
    } else if (isInViewport(pageSections[0])) {
        scrollToTopBtn.style.opacity = '0';
    }
});

// Scroll to section on link click
document.addEventListener('click', scrollToSection);

// Set sections as active
window.addEventListener('scroll', activeSection);