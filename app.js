document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Dashboard Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding tab pane
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 3. Table Search / Filtering
    const searchInput = document.getElementById('searchInput');
    const dataTable = document.getElementById('dataTable');

    if (searchInput && dataTable) {
        searchInput.addEventListener('keyup', function() {
            const filter = searchInput.value.toLowerCase();
            const rows = dataTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                // Get the route (column 1) and stop location (column 2) text
                const routeCol = rows[i].getElementsByTagName('td')[1];
                const stopCol = rows[i].getElementsByTagName('td')[2];
                
                if (routeCol || stopCol) {
                    const routeText = routeCol.textContent || routeCol.innerText;
                    const stopText = stopCol.textContent || stopCol.innerText;
                    
                    if (routeText.toLowerCase().indexOf(filter) > -1 || stopText.toLowerCase().indexOf(filter) > -1) {
                        rows[i].style.display = "";
                    } else {
                        rows[i].style.display = "none";
                    }
                }
            }
        });
    }

    // 4. Modal Functionality for Gallery
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const captionText = document.getElementById('modalCaption');
    const span = document.getElementsByClassName('close-modal')[0];

    // Expose openModal to global scope so onclick handlers in HTML can use it
    window.openModal = function(imgSrc, altText) {
        modal.style.display = "block";
        modalImg.src = imgSrc;
        captionText.innerHTML = altText;
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
});
