// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference in local storage
    if (localStorage.getItem('theme') === 'light-mode') {
        body.classList.add('light-mode');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'dark-mode');
            darkModeToggle.textContent = '🌙';
        }
    });

    // --- 2. Showcase Tab Switching Logic (FIXED) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const showcaseContents = document.querySelectorAll('.showcase-content');

    // CRITICAL FIX: Function to enforce the correct tab state on page load
    function initializeTabs() {
        // Find the button marked 'active' in HTML (should be 'Projects')
        const initialButton = document.querySelector('.tab-button.active');
        // Default to 'projects-content' if no button is marked active
        const initialTargetId = initialButton ? initialButton.dataset.target : 'projects-content';

        // 1. Hide ALL content panels immediately (overrides potential CSS loading issue)
        showcaseContents.forEach(content => {
            content.classList.remove('active');
        });

        // 2. Show only the content panel corresponding to the active button
        const initialContent = document.getElementById(initialTargetId);
        if (initialContent) {
            initialContent.classList.add('active');
        }
    }

    // Run initialization immediately on load to prevent content spillover
    initializeTabs();


    // Add click listeners for normal tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;

            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Remove active class from all content sections (hides them)
            showcaseContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Add active class to the target content section (shows it)
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 3. Contact Form Submission (using EmailJS) ---
    const contactForm = document.querySelector('.contact-form');

    // NOTE: Replace 'YOUR_EMAILJS_USER_ID' and 'template_id_here' with your actual credentials.
    (function() {
        emailjs.init('YOUR_EMAILJS_USER_ID'); 
    })();

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const serviceID = 'default_service'; // Default service ID for EmailJS
        const templateID = 'template_id_here'; // Replace with your actual EmailJS Template ID

        // Validation check for EmailJS ID
        if (emailjs.getAccount() === undefined || emailjs.getAccount() === 'YOUR_EMAILJS_USER_ID') {
            alert('Error: EmailJS User ID is a placeholder. Please update js/script.js with your actual ID and Template ID.');
            return;
        }

        // Disable button and change text while sending
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert('Message Sent Successfully!');
                contactForm.reset();
            }, (error) => {
                console.error('EmailJS Error:', error);
                alert('Failed to send the message. Please try again. (Error: ' + JSON.stringify(error) + ')');
            })
            .finally(() => {
                // Re-enable button and reset text
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            });
    });
});