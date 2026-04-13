document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Services Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    const dynamicImage = document.getElementById('dynamic-service-image');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Check if this is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(acc => {
                acc.classList.remove('active');
                // update icon to plus
                const iconContainer = acc.querySelector('.accordion-icon');
                if(iconContainer && iconContainer.innerHTML.includes('minus')) {
                    iconContainer.innerHTML = '<i data-lucide="plus"></i>';
                }
            });
            
            if (!isActive) {
                // Open this item
                item.classList.add('active');
                // update icon to minus
                const iconContainer = item.querySelector('.accordion-icon');
                if(iconContainer) {
                    iconContainer.innerHTML = '<i data-lucide="minus"></i>';
                }
                
                // Swap image if dataset is available
                if(dynamicImage && item.dataset.image) {
                    dynamicImage.style.opacity = '0';
                    setTimeout(() => {
                        dynamicImage.src = item.dataset.image;
                        dynamicImage.style.opacity = '1';
                    }, 300);
                }
            }
            
            // re-render the lucide icons inside accordion
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });
});
