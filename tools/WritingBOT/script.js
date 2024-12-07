document.getElementById('generate').addEventListener('click', function() {
    var text = document.getElementById('text-input').value;
    var apiUrl = `https://api.caliph.biz.id/api/nuliskiri?text=${encodeURIComponent(text)}&apikey=7626a536ef7c434c`;

    if (text) {
        // Show the "Klik untuk Lihat Hasil" button and the result section
        var viewResultButton = document.getElementById('view-result');
        var resultContainer = document.getElementById('result-container');
        var resultImage = document.getElementById('result-image');

        viewResultButton.setAttribute('onclick', `window.open('${apiUrl}', '_blank')`);
        viewResultButton.classList.remove('hidden');
        
        // Display the result below the form
        resultContainer.classList.remove('hidden');
        resultImage.src = apiUrl;
    } else {
        alert('Tolong masukkan teks terlebih dahulu.');
    }
});

$(document).ready(function() {
    // Hamburger Menu toggle
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    // Toggle mobile menu visibility
    hamburgerIcon.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        hamburgerIcon.classList.toggle("open");
    });

    // Close mobile menu
    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        hamburgerIcon.classList.remove("open");
    });

    // Smooth scroll when clicking menu items
    $("a[href^='#']").on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
});