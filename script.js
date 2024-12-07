
$(document).ready(function() {
    let toolsData = []; // Menyimpan data tools

    // Ambil data tools dari file JSON
    $.getJSON('data/toolsData.json', function(data) {
        toolsData = data;

        // Render tools di root page (slideshow)
        renderSlideshow(toolsData.slice(0, 5));  // Menampilkan 5 tools populer

        // Render tools di halaman tools (pagination)
        renderTools(1); // Render tools pertama
    });

    // Fungsi untuk merender slideshow dengan tools populer
    function renderSlideshow(tools) {
        const slideshowContainer = $("#slideshow-container");
        slideshowContainer.empty(); // Kosongkan sebelum menambah

        tools.forEach(tool => {
            const toolElement = `
                <div class="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
                    <div class="flex items-center mb-4">
                        <i class="${tool.icon || 'fas fa-cogs'} text-4xl text-blue-600 mr-4"></i>
                        <h3 class="text-xl font-semibold">${tool.name}</h3>
                    </div>
                    <p class="text-gray-600 mb-4">${tool.description}</p>
                    <a href="${tool.link}" class="inline-block py-2 px-6 bg-transparent border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all">Coba Tool</a>
                </div>
            `;
            slideshowContainer.append(toolElement);
        });

        // Menggerakkan slideshow secara otomatis
        let currentIndex = 0;
        setInterval(function() {
            currentIndex = (currentIndex + 1) % tools.length;
            const offset = -currentIndex * 320; // Pindah ke alat berikutnya (width 320px)
            $("#slideshow-container").css("transform", `translateX(${offset}px)`);
        }, 3000); // Ubah setiap 3 detik
    }

    // Fungsi untuk merender tools ke halaman tools
    function renderTools(page) {
        const toolsContainer = $("#tools-container");
        toolsContainer.empty(); // Kosongkan kontainer sebelum render ulang

        const toolsPerPage = 6;
        const startIndex = (page - 1) * toolsPerPage;
        const endIndex = Math.min(startIndex + toolsPerPage, toolsData.length);
        const toolsToShow = toolsData.slice(startIndex, endIndex);

        toolsToShow.forEach(tool => {
            const toolElement = `
                <div class="card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                    <div class="flex items-center mb-4">
                        <i class="${tool.icon || 'fas fa-cogs'} text-4xl text-blue-600 mr-4"></i>
                        <h3 class="text-xl font-semibold">${tool.name}</h3>
                    </div>
                    <p class="text-gray-600 mb-4">${tool.description}</p>
                    <a href="${tool.link}" class="inline-block py-2 px-6 bg-transparent border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all">Coba Tool</a>
                </div>
            `;
            toolsContainer.append(toolElement);
        });
    }

    // Fungsi untuk menampilkan Change Log
    $.get('changelog.txt', function(data) {
        const changelogContent = data.split('\n').map(entry => {
            return `<p class="text-gray-600">${entry}</p>`;
        }).join('');
        $("#changelog-content").html(changelogContent);
    });

    // Fungsi untuk menyalin Change Log ke clipboard
    $('#copy-changelog').on('click', function() {
        const text = $('#changelog-content').text();
        navigator.clipboard.writeText(text).then(function() {
            alert("Change Log telah disalin!");
        });
    });
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
    
