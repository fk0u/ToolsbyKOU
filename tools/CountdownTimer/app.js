let countdownInterval;
        let countdownTime; // In seconds
        let isFullscreen = false;
        let countdownStarted = false;

        document.getElementById('start-button').addEventListener('click', function() {
            if (countdownStarted) {
                // Stop countdown if it's already started
                clearInterval(countdownInterval);
                document.getElementById('start-button').innerText = 'Mulai Waktu Mundur';
                document.getElementById('start-button').classList.remove('bg-red-600');
                document.getElementById('start-button').classList.add('bg-blue-600');
                countdownStarted = false;

                // Stop the alarm sound
                document.getElementById('alarm-sound').pause();
                document.getElementById('alarm-sound').currentTime = 0; // Reset the sound
            } else {
                const hours = parseInt(document.getElementById('hour-input').value) || 0;
                const minutes = parseInt(document.getElementById('minute-input').value) || 0;
                const seconds = parseInt(document.getElementById('second-input').value) || 0;
                
                // Convert to total seconds
                countdownTime = (hours * 3600) + (minutes * 60) + seconds;

                if (countdownTime > 0) {
                    startCountdown(countdownTime);
                    document.getElementById('start-button').innerText = 'Stop';
                    document.getElementById('start-button').classList.remove('bg-blue-600');
                    document.getElementById('start-button').classList.add('bg-red-600');
                    countdownStarted = true;
                } else {
                    alert('Masukkan waktu yang valid.');
                }
            }
        });

        document.getElementById('fullscreen-button').addEventListener('click', function() {
            toggleFullscreen();
        });

        function startCountdown(time) {
            clearInterval(countdownInterval);

            countdownInterval = setInterval(function() {
                if (time <= 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('countdown-display').innerHTML = '00:00:00';
                    document.getElementById('countdown-end').classList.remove('hidden');
                    document.getElementById('countdown-display').classList.add('text-red-600');

                    // Play sound and keep looping
                    document.getElementById('alarm-sound').play();

                    // Show SweetAlert when time ends
                    Swal.fire({
                        icon: 'error',
                        title: 'Waktu Habis!',
                        text: 'Klik OK untuk berhenti.',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showCancelButton: false,
                        confirmButtonText: 'OK',
                        willClose: () => {
                            // Stop the alarm sound when SweetAlert is closed
                            document.getElementById('alarm-sound').pause();
                            document.getElementById('alarm-sound').currentTime = 0; // Reset sound
                        }
                    });

                    return;
                }

                let hours = Math.floor(time / 3600);
                let minutes = Math.floor((time % 3600) / 60);
                let seconds = time % 60;
                
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                document.getElementById('countdown-display').innerHTML = `${hours}:${minutes}:${seconds}`;
                time--;
            }, 1000);
        }

        function toggleFullscreen() {
            if (isFullscreen) {
                document.exitFullscreen();
                document.body.classList.remove('fullscreen');
                isFullscreen = false;
            } else {
                document.documentElement.requestFullscreen();
                document.body.classList.add('fullscreen');
                isFullscreen = true;
            }
        }