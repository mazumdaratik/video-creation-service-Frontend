document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle'); // Use class selector
    const mainNav = document.querySelector('.main-nav');      // Use class selector

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Toggle a class on the nav element itself (or body/header)
            mainNav.classList.toggle('nav-active');

            // Toggle ARIA attribute for accessibility
            const isExpanded = mainNav.classList.contains('nav-active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // Optional: Change icon on toggle (requires icon font setup)
            const icon = menuToggle.querySelector('i'); // Assumes RemixIcon
            if (icon) {
                icon.classList.toggle('ri-menu-line');
                icon.classList.toggle('ri-close-line');
            }
        });
    } else {
        console.warn("Mobile menu toggle button or navigation element not found.");
    }


    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');

            if (questionButton) {
                questionButton.addEventListener('click', () => {
                    const currentlyActive = item.classList.contains('active');
                    const answerWrapper = item.querySelector('.faq-answer-wrapper');
                    const answer = answerWrapper ? answerWrapper.querySelector('.faq-answer') : null;

                    // --- Close all other items first ---
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherButton = otherItem.querySelector('.faq-question');
                            if (otherButton) {
                                otherButton.setAttribute('aria-expanded', 'false');
                            }
                            const otherAnswerWrapper = otherItem.querySelector('.faq-answer-wrapper');
                            if (otherAnswerWrapper) {
                                otherAnswerWrapper.style.maxHeight = null; // Collapse
                            }
                        }
                    });

                    // --- Toggle the clicked item ---
                    if (!currentlyActive && answerWrapper && answer) {
                        // Open the clicked item
                        item.classList.add('active');
                        questionButton.setAttribute('aria-expanded', 'true');
                        // Set max-height for opening animation
                        answerWrapper.style.maxHeight = answer.scrollHeight + 'px';
                    } else if (answerWrapper) {
                        // Close the clicked item (if it was already active)
                        item.classList.remove('active');
                        questionButton.setAttribute('aria-expanded', 'false');
                        answerWrapper.style.maxHeight = null; // Collapse
                    }
                });
            } else {
                 console.warn("FAQ question button not found within an item:", item);
            }

            // Set initial max-height for the item that starts open on page load
            if (item.classList.contains('active')) {
                 const answerWrapper = item.querySelector('.faq-answer-wrapper');
                 const answer = answerWrapper ? answerWrapper.querySelector('.faq-answer') : null;
                 if(answerWrapper && answer) {
                    answerWrapper.style.maxHeight = answer.scrollHeight + 'px';
                 }
            }
        });
    } else {
        console.warn("No FAQ items found on the page.");
    }

    // --- Add other JS functionalities as needed ---
    // e.g., Video Modal Popups, Form Validations, Sliders/Carousels

}); // End DOMContentLoaded