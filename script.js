/* =========================================================
   SNK GUIDEUP ACADEMY
   COMPLETE SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileNavigation =
        document.getElementById("mobileNavigation");


    const freeCourseToggle =
        document.getElementById("freeCourseToggle");

    const freeCourseMenu =
        document.getElementById("freeCourseMenu");


    const paidCourseToggle =
        document.getElementById("paidCourseToggle");

    const paidCourseMenu =
        document.getElementById("paidCourseMenu");


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function openMobileMenu() {

        mobileMenuBtn.classList.add("active");

        mobileNavigation.classList.add("active");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuBtn.setAttribute(
            "aria-label",
            "Close menu"
        );

        document.body.classList.add(
            "mobile-menu-open"
        );

    }


    function closeMobileMenu() {

        mobileMenuBtn.classList.remove("active");

        mobileNavigation.classList.remove("active");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuBtn.setAttribute(
            "aria-label",
            "Open menu"
        );

        document.body.classList.remove(
            "mobile-menu-open"
        );

    }


    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    mobileNavigation.classList.contains(
                        "active"
                    );

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       FREE COURSE DROPDOWN
    ====================================================== */

    if (
        freeCourseToggle &&
        freeCourseMenu
    ) {

        freeCourseToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    freeCourseMenu.classList.contains(
                        "active"
                    );


                /* Close Paid Course */

                if (paidCourseMenu) {

                    paidCourseMenu.classList.remove(
                        "active"
                    );

                }

                if (paidCourseToggle) {

                    paidCourseToggle.classList.remove(
                        "active"
                    );

                    paidCourseToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                /* Toggle Free Course */

                if (isOpen) {

                    freeCourseMenu.classList.remove(
                        "active"
                    );

                    freeCourseToggle.classList.remove(
                        "active"
                    );

                    freeCourseToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    freeCourseMenu.classList.add(
                        "active"
                    );

                    freeCourseToggle.classList.add(
                        "active"
                    );

                    freeCourseToggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    }


    /* =====================================================
       PAID COURSE DROPDOWN
    ====================================================== */

    if (
        paidCourseToggle &&
        paidCourseMenu
    ) {

        paidCourseToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    paidCourseMenu.classList.contains(
                        "active"
                    );


                /* Close Free Course */

                if (freeCourseMenu) {

                    freeCourseMenu.classList.remove(
                        "active"
                    );

                }

                if (freeCourseToggle) {

                    freeCourseToggle.classList.remove(
                        "active"
                    );

                    freeCourseToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                /* Toggle Paid Course */

                if (isOpen) {

                    paidCourseMenu.classList.remove(
                        "active"
                    );

                    paidCourseToggle.classList.remove(
                        "active"
                    );

                    paidCourseToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    paidCourseMenu.classList.add(
                        "active"
                    );

                    paidCourseToggle.classList.add(
                        "active"
                    );

                    paidCourseToggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING MOBILE COURSE LINK
    ====================================================== */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-navigation a"
        );


    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();

                closeAllMobileDropdowns();

            }
        );

    });


    /* =====================================================
       CLOSE ALL MOBILE DROPDOWNS
    ====================================================== */

    function closeAllMobileDropdowns() {

        if (freeCourseMenu) {

            freeCourseMenu.classList.remove(
                "active"
            );

        }

        if (freeCourseToggle) {

            freeCourseToggle.classList.remove(
                "active"
            );

            freeCourseToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (paidCourseMenu) {

            paidCourseMenu.classList.remove(
                "active"
            );

        }

        if (paidCourseToggle) {

            paidCourseToggle.classList.remove(
                "active"
            );

            paidCourseToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* =====================================================
       CLICK OUTSIDE MOBILE MENU
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                mobileNavigation &&
                mobileMenuBtn &&
                !mobileNavigation.contains(event.target) &&
                !mobileMenuBtn.contains(event.target)
            ) {

                closeMobileMenu();

                closeAllMobileDropdowns();

            }

        }
    );


    /* =====================================================
       ESC KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMobileMenu();

                closeAllMobileDropdowns();

            }

        }
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 900
            ) {

                closeMobileMenu();

                closeAllMobileDropdowns();

            }

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


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


                if (target) {

                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top
                        +
                        window.scrollY
                        -
                        headerHeight
                        -
                        10;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION ON SCROLL
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const desktopLinks =
        document.querySelectorAll(
            ".desktop-nav > li > a"
        );


    function updateActiveSection() {

        const scrollPosition =
            window.scrollY +
            120;


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                desktopLinks.forEach(
                    function (link) {

                        link.classList.remove(
                            "active"
                        );

                    }
                );


                const activeLink =
                    document.querySelector(
                        '.desktop-nav a[href="#' +
                        sectionId +
                        '"]'
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveSection
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    closeMobileMenu();

    closeAllMobileDropdowns();

});
