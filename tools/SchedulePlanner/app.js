    // Ambil elemen form
    const eventNameInput = document.getElementById("event-name");
    const eventDateInput = document.getElementById("event-date");
    const eventTimeInput = document.getElementById("event-time");
    const eventDescriptionInput = document.getElementById("event-description");
    const eventLocationInput = document.getElementById("event-location");
    const eventGuestsInput = document.getElementById("event-guests");
    const eventReminderSelect = document.getElementById("event-reminder");
    const addToCalendarBtn = document.getElementById("add-to-calendar-btn");

    // Fungsi untuk menambah acara ke Google Calendar
    addToCalendarBtn.addEventListener("click", function() {
        // Ambil input dari form
        const eventName = eventNameInput.value;
        const eventDate = eventDateInput.value;
        const eventTime = eventTimeInput.value;
        const eventDescription = eventDescriptionInput.value;
        const eventLocation = eventLocationInput.value;
        const eventGuests = eventGuestsInput.value;
        const eventReminder = eventReminderSelect.value;

        // Validasi input (misalnya, cek jika nama acara ada)
        if (!eventName || !eventDate || !eventTime) {
            alert("Harap lengkapi nama acara, tanggal, dan waktu!");
            return;
        }

        // Gabungkan tanggal dan waktu menjadi satu format ISO 8601
        const eventDateTime = `${eventDate}T${eventTime}:00`; // Format: YYYY-MM-DDTHH:MM:SS

        // Konversi waktu pengingat menjadi format waktu yang benar
        const reminderTime = eventReminder * 60; // Konversi ke menit

        // Siapkan URL untuk menambahkan ke Google Calendar
        const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${eventDateTime}/${eventDateTime}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}&sprop=&sprop=name%3A&trp=false`;

        // Cek jika ada tamu yang diinput
        if (eventGuests) {
            // Pisahkan email tamu dan tambahkan ke URL
            const guestsArray = eventGuests.split(',').map(email => email.trim());
            const guestsParam = guestsArray.join(',');
            googleCalendarURL += `&add=${guestsParam}`;
        }

        // Tambahkan pengingat ke URL Google Calendar
        googleCalendarURL += `&reminder=${reminderTime}`;

        // Arahkan pengguna ke Google Calendar
        window.open(googleCalendarURL, '_blank');
    });

