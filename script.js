// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


// ========================================
// OPEN / CLOSE MENU
// ========================================

menuBtn.addEventListener("click", function () {

    const isOpen = navMenu.classList.toggle("active");

    if (isOpen) {
        menuBtn.innerHTML = "✕";
        menuBtn.setAttribute("aria-label", "Close menu");
        menuBtn.setAttribute("aria-expanded", "true");
    } else {
        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.setAttribute("aria-expanded", "false");
    }

});


// ========================================
// CLOSE MENU AFTER CLICKING A LINK
// ========================================

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.setAttribute("aria-expanded", "false");

    });

});


// ========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ========================================

document.addEventListener("click", function (event) {

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {

        navMenu.classList.remove("active");

        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.setAttribute("aria-expanded", "false");

    }

});


// ========================================
// CLOSE MENU ON WINDOW RESIZE
// ========================================

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        navMenu.classList.remove("active");

        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Open menu");
        menuBtn.setAttribute("aria-expanded", "false");

    }

});
