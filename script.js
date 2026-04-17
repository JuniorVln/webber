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

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const fields = {
                nome: (formData.get('nome') || '').toString().trim(),
                telefone: (formData.get('telefone') || '').toString().trim(),
                email: (formData.get('email') || '').toString().trim(),
                servico: (formData.get('servico') || '').toString().trim(),
                mensagem: (formData.get('mensagem') || '').toString().trim()
            };

            const lines = [
                'Olá, vim pelo site da Webber Fundações.',
                fields.nome && `Nome: ${fields.nome}`,
                fields.telefone && `Telefone: ${fields.telefone}`,
                fields.email && `E-mail: ${fields.email}`,
                fields.servico && `Serviço: ${fields.servico}`,
                fields.mensagem && `Mensagem: ${fields.mensagem}`
            ].filter(Boolean);

            const whatsappUrl = `https://wa.me/5541999669778?text=${encodeURIComponent(lines.join('\n'))}`;
            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }

});
