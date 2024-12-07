$(document).ready(function() {
    let toolsData = []; // Menyimpan data tools
    let currentPage = 1;
    const toolsPerPage = 8;

    // Ambil data tools dari file JSON
    $.getJSON('/data/toolsData.json', function(data) {
        toolsData = data;
        renderTools(currentPage); // Render tools awal
    });

    // Fungsi untuk merender tools ke halaman
    function renderTools(page) {
        const toolsContainer = $("#tools-container");
        toolsContainer.empty(); // Kosongkan kontainer sebelum render ulang

        const startIndex = (page - 1) * toolsPerPage;
        const endIndex = Math.min(startIndex + toolsPerPage, toolsData.length);
        const toolsToShow = toolsData.slice(startIndex, endIndex);
        const totalPages = Math.ceil(toolsData.length / toolsPerPage);

        // Update pagination info
        $("#current-page").text(page);
        $("#total-pages").text(totalPages);
        

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

        // Update pagination buttons
        $("#prev-btn").toggleClass('hidden', page === 1);
        $("#next-btn").toggleClass('hidden', page * toolsPerPage >= toolsData.length);
    }

    // Fungsi untuk menghandle pencarian
    $("#search-bar").on("input", function() {
        const query = $(this).val().toLowerCase();
        const filteredTools = toolsData.filter(tool => 
            tool.name.toLowerCase().includes(query) || 
            tool.description.toLowerCase().includes(query)
        );
        toolsData = filteredTools;
        currentPage = 1; // Reset halaman ke 1
        renderTools(currentPage);
    });

    // Fungsi untuk navigasi halaman
    $("#next-btn").on("click", function() {
        currentPage++;
        renderTools(currentPage);
    });

    $("#prev-btn").on("click", function() {
        currentPage--;
        renderTools(currentPage);
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
