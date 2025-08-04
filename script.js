document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const messageDiv = document.getElementById('message');

    // Determine API URL based on environment
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiUrl = isDevelopment ? 'http://localhost:3000/api/submit-form' : '/api/submit-form';

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        hideMessage();

        // Get form data
        const formData = new FormData(form);
        const data = {
            nama: formData.get('nama'),
            email: formData.get('email'),
            telepon: formData.get('telepon') || '',
            pesan: formData.get('pesan'),
            timestamp: new Date().toISOString()
        };

        try {
            // Send data to Google Sheets
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                showMessage('Pesan berhasil dikirim! Data telah tersimpan di Google Sheets.', 'success');
                form.reset();
            } else {
                throw new Error(result.error || 'Terjadi kesalahan saat mengirim data');
            }
        } catch (error) {
            console.error('Error:', error);
            
            // Handle different error scenarios
            if (error.message.includes('405')) {
                showMessage('API endpoint tidak tersedia. Pastikan server berjalan dengan benar.', 'error');
            } else if (error.message.includes('Failed to fetch')) {
                showMessage('Tidak dapat terhubung ke server. Cek koneksi internet Anda.', 'error');
            } else {
                showMessage('Gagal mengirim pesan. Silakan coba lagi.', 'error');
            }
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }

    function hideMessage() {
        messageDiv.style.display = 'none';
    }

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 