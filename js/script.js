// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'light-mode') {
        body.classList.add('light-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️';
    }

    if (darkModeToggle) {
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
    }

    // --- 2. Showcase Tab Switching Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const showcaseContents = document.querySelectorAll('.showcase-content');

    function initializeTabs() {
        showcaseContents.forEach(c => c.classList.remove('active'));

        const activeBtn = document.querySelector('.tab-button.active');
        const initialId = activeBtn ? activeBtn.dataset.target : 'projects-content';
        const initialContent = document.getElementById(initialId);

        if (initialContent) initialContent.classList.add('active');
    }

    initializeTabs();

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            showcaseContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // --- 3. Contact Form EmailJS Integration ---

    // ✅ Initialize EmailJS with your Public Key
    emailjs.init("BlLgAXLEjsOlMiboF");

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const serviceID = "service_bwngb8j";   // ✅ Your Service ID
            const templateID = "template_1lwndut"; // ✅ Your Template ID

            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert("✅ Message Sent Successfully!");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("❌ EmailJS Error:", error);
                    alert("❌ Failed to send message. Check console for details.");
                })
                .finally(() => {
                    submitButton.textContent = "Send Message";
                    submitButton.disabled = false;
                });
        });
    }

});
