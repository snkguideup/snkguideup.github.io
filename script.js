/* =========================================================
   SNK GUIDEUP ACADEMY
   COMPLETE SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const mobileMenuBtn =
        document.querySelector(".mobile-menu-btn");

    const mobileNavigation =
        document.querySelector(".mobile-navigation");

    const mobileCoursesToggle =
        document.querySelector(".mobile-courses-toggle");

    const mobileCoursesMenu =
        document.querySelector(".mobile-courses-menu");

    const desktopDropdowns =
        document.querySelectorAll(".nav-dropdown");

    const desktopDropdownButtons =
        document.querySelectorAll(".nav-dropdown-button");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!mobileMenuBtn || !mobileNavigation) return;

        mobileMenuBtn.classList.add("active");
        mobileNavigation.classList.add("active");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "mobile-menu-open"
        );
    }


    function closeMobileMenu() {

        if (!mobileMenuBtn || !mobileNavigation) return;

        mobileMenuBtn.classList.remove("active");
        mobileNavigation.classList.remove("active");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "mobile-menu-open"
        );

        closeMobileCourses();
    }


    function toggleMobileMenu() {

        if (!mobileNavigation) return;

        if (
            mobileNavigation.classList.contains(
                "active"
            )
        ) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                toggleMobileMenu();
            }
        );

    }


    /* =====================================================
       MOBILE COURSES DROPDOWN
    ===================================================== */

    function openMobileCourses() {

        if (
            !mobileCoursesToggle ||
            !mobileCoursesMenu
        ) return;

        mobileCoursesToggle.classList.add(
            "active"
        );

        mobileCoursesMenu.classList.add(
            "active"
        );

        mobileCoursesToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    }


    function closeMobileCourses() {

        if (
            !mobileCoursesToggle ||
            !mobileCoursesMenu
        ) return;

        mobileCoursesToggle.classList.remove(
            "active"
        );

        mobileCoursesMenu.classList.remove(
            "active"
        );

        mobileCoursesToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    function toggleMobileCourses() {

        if (!mobileCoursesMenu) return;

        if (
            mobileCoursesMenu.classList.contains(
                "active"
            )
        ) {
            closeMobileCourses();
        } else {
            openMobileCourses();
        }
    }


    if (mobileCoursesToggle) {

        mobileCoursesToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                toggleMobileCourses();
            }
        );

    }


    /* =====================================================
       MOBILE NAV LINKS
    ===================================================== */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-navigation a"
        );

    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                /*
                 * Do not close the menu if this is
                 * the Courses dropdown button.
                 */
                if (
                    link.closest(
                        ".mobile-courses-menu"
                    )
                ) {
                    return;
                }

                closeMobileMenu();
            }
        );

    });


    /* =====================================================
       DESKTOP DROPDOWN
    ===================================================== */

    function closeAllDesktopDropdowns(
        except = null
    ) {

        desktopDropdowns.forEach(
            (dropdown) => {

                if (dropdown !== except) {

                    dropdown.classList.remove(
                        "open"
                    );

                    const button =
                        dropdown.querySelector(
                            ".nav-dropdown-button"
                        );

                    if (button) {

                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            }
        );

    }


    desktopDropdownButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    const dropdown =
                        button.closest(
                            ".nav-dropdown"
                        );

                    if (!dropdown) return;

                    const isOpen =
                        dropdown.classList.contains(
                            "open"
                        );

                    closeAllDesktopDropdowns(
                        isOpen ? null : dropdown
                    );

                    if (isOpen) {

                        dropdown.classList.remove(
                            "open"
                        );

                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    } else {

                        dropdown.classList.add(
                            "open"
                        );

                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       CLICK OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            /* Desktop dropdown */

            if (
                !event.target.closest(
                    ".nav-dropdown"
                )
            ) {

                closeAllDesktopDropdowns();

            }


            /* Mobile menu */

            if (
                mobileNavigation &&
                mobileNavigation.classList.contains(
                    "active"
                )
            ) {

                const clickedInsideMenu =
                    event.target.closest(
                        ".mobile-navigation"
                    );

                const clickedMenuButton =
                    event.target.closest(
                        ".mobile-menu-btn"
                    );

                if (
                    !clickedInsideMenu &&
                    !clickedMenuButton
                ) {

                    closeMobileMenu();

                }

            }

        }
    );


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();
                closeAllDesktopDropdowns();

            }

        }
    );


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                () => {

                    /*
                     * If screen becomes desktop,
                     * close mobile menu.
                     */

                    if (
                        window.innerWidth > 900
                    ) {

                        closeMobileMenu();

                    }

                },
                150
            );

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                closeMobileMenu();
                closeAllDesktopDropdowns();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const allNavLinks =
        document.querySelectorAll(
            ".desktop-nav a, .mobile-navigation a"
        );

    allNavLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        /*
         * Only compare normal HTML pages.
         */
        if (
            href.endsWith(".html") &&
            href === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       PREVENT DROPDOWN LINKS FROM CLOSING
       UNEXPECTEDLY
    ===================================================== */

    document
        .querySelectorAll(
            ".nav-dropdown-menu"
        )
        .forEach((menu) => {

            menu.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                }
            );

        });


    /* =====================================================
       MOBILE COURSE MENU LINK HANDLING
    ===================================================== */

    if (mobileCoursesMenu) {

        const courseLinks =
            mobileCoursesMenu.querySelectorAll(
                "a"
            );

        courseLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    /*
                     * Allow the link to navigate,
                     * then close the menu.
                     */
                    setTimeout(
                        () => {
                            closeMobileMenu();
                        },
                        100
                    );

                }
            );

        });

    }


    /* =====================================================
       INITIAL ARIA STATE
    ===================================================== */

    if (mobileMenuBtn) {

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    if (mobileCoursesToggle) {

        mobileCoursesToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    desktopDropdownButtons.forEach(
        (button) => {

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "SNK GuideUp Academy loaded successfully."
    );

});
