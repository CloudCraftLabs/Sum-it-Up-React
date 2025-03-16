document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Initialize theme
    if (localStorage.getItem('theme') === 'dark') {
        toggleTheme();
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Summary Length Options
    const lengthButtons = document.querySelectorAll('.option-btn');
    lengthButtons.forEach(button => {
        button.addEventListener('click', () => {
            lengthButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Main Summarize Button
    const summarizeButton = document.getElementById('openSummarizationPanel');
    summarizeButton.addEventListener('click', async function() {
        try {
            this.classList.add('loading');
            
            // Get selected options
            const selectedLength = document.querySelector('.option-btn.active').dataset.length;
            const selectedStyle = document.getElementById('summaryStyle').value;

            // Send message to content script to open panel
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    todo: "openSummarizationPanel",
                    options: {
                        length: selectedLength,
                        style: selectedStyle
                    }
                });
            });

            // Close popup after sending message
            window.close();

        } catch (error) {
            console.error('Error:', error);
            this.classList.remove('loading');
        }
    });

    // Quick Action Buttons
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a subtle feedback animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            const action = this.getAttribute('title');
            
            // Send message to content script based on action
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    todo: action.toLowerCase().replace(/\s+/g, '_'),
                });
            });
        });
    });
});