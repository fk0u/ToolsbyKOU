// Daftar mata uang yang akan digunakan
const currencies = [
    "USD", "EUR", "IDR", "JPY", "GBP", "AUD", "CAD", "CHF", "INR", "CNY", "SGD", "MYR", "THB", "PHP", "KRW", "RUB", "NZD"
];

// Mendapatkan elemen-elemen yang diperlukan
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const resultDisplay = document.getElementById("result");
const toggleCurrencyBtn = document.getElementById("toggle-currency");

// Menambahkan opsi mata uang ke dropdown
function populateCurrencyOptions() {
    currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;

        fromCurrencySelect.appendChild(optionFrom);
        toCurrencySelect.appendChild(optionTo);
    });
}

// Fungsi untuk mengonversi mata uang
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.innerHTML = "Silakan masukkan jumlah yang valid.";
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];

        if (rate) {
            const result = (amount * rate).toFixed(2);
            resultDisplay.innerHTML = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        } else {
            resultDisplay.innerHTML = 'Mata uang tidak ditemukan.';
        }
    } catch (error) {
        resultDisplay.innerHTML = 'Terjadi kesalahan dalam pengambilan data kurs. Coba lagi nanti.';
    }
}

// Fungsi untuk menukar mata uang
function toggleCurrencies() {
    const fromCurrency = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = fromCurrency;
}

// Inisialisasi halaman
window.onload = () => {
    populateCurrencyOptions();
};

// Menangani klik tombol konversi
convertBtn.addEventListener("click", convertCurrency);

// Menangani toggle mata uang
toggleCurrencyBtn.addEventListener("click", toggleCurrencies);

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