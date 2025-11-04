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
        // Remove active from all
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

            // Remove active from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            showcaseContents.forEach(content => content.classList.remove('active'));

            // Add active to clicked tab + its content
            button.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

});
