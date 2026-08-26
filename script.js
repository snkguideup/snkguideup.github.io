// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuBtn.innerHTML = "✕";
        menuBtn.setAttribute("aria-label", "Close menu");
    } else {
        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Open menu");
    }
});


// ========================================
// CLOSE MENU WHEN CLICKING NAV LINK
// ========================================

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");

        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Open menu");
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
    }

});


// ========================================
// CLOSE MOBILE MENU ON RESIZE
// ========================================

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {
        navMenu.classList.remove("active");

        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Open menu");
    }

});
