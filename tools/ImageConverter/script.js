document.getElementById('convert-button').addEventListener('click', function() {
    const imageInput = document.getElementById('image-input');
    const outputFormat = document.getElementById('output-format').value;
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('download-link');
    const errorMessage = document.getElementById('error-message');
    const file = imageInput.files[0];
    
    // Clear previous error and output
    errorMessage.classList.add('hidden');
    downloadLink.classList.add('hidden');
    canvas.classList.add('hidden');
    
    if (!file) {
        errorMessage.textContent = 'Please select an image file to convert.';
        errorMessage.classList.remove('hidden');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Set canvas size to image size
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw the image onto the canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // Convert canvas to the selected format
            const convertedImage = canvas.toDataURL(outputFormat);
            
            // Show download link
            downloadLink.href = convertedImage;
            downloadLink.classList.remove('hidden');
            downloadLink.textContent = `Download as ${outputFormat.split('/')[1].toUpperCase()}`;
            
            // Show canvas (optional for preview)
            canvas.classList.remove('hidden');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});
