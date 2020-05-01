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

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// check if an element is visible in the viewport
const isInViewport = function (element) {
    let bounding = element.getBoundingClientRect();
    return (
        bounding.top >= -200 &&
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
        navSectionLink.id = `${sectionID}`;

        navMenuItem.append(navSectionLink);
        navBar.appendChild(navMenuItem);
    }
}

// toggle active class if element in or out of viewport
const activeSection = function () {
    for (let pageSection of pageSections) {
        let navMenuItem = document.querySelector(`a#${pageSection.id}`);
        if (isInViewport(pageSection)) {
            activateElement(pageSection);
            activateElement(navMenuItem);
        } else {
            deactivateElement(pageSection);
            deactivateElement(navMenuItem);
        }
    }
};

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', function () {
    buildNavBar();
});

// Scroll to section on link click
document.querySelector('#navbar__list').addEventListener('click', function (event) {
    event.preventDefault();
    console.log(event);
    let sectionToScroll = document.querySelector(event.target.dataset.id);
    sectionToScroll.scrollIntoView({
        behavior: 'smooth'
    });
});

// Set sections as active
window.addEventListener('scroll', activeSection);

// function scrollToElement(element) {
//     const { x, y, top } = element.getBoundingClientRect();
//     window.scrollTo({
//         top: document.documentElement.scrollTop + y,
//         left: x,
//         behavior: 'smooth',
//     })
// }
