// Gestion du menu mobile
let hamburger = document.querySelector('.hamburger');
let mobileMenu = document.querySelector('#mobile-menu');
let navItemsMobile = document.querySelectorAll('#mobile-menu a');

hamburger.addEventListener('click', () => {
    // Toggle la classe sur le menu mobile
    mobileMenu.classList.toggle('-translate-x-full');
    
    // Mise à jour de l'attribut aria-expanded
    const isExpanded = !mobileMenu.classList.contains('-translate-x-full');
    hamburger.setAttribute('aria-expanded', isExpanded);
    
    // Changement de l'icône
    const icon = hamburger.querySelector('i');
    if (isExpanded) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fermer le menu après avoir cliqué sur un lien
navItemsMobile.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-x-full');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Fermer le menu en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('-translate-x-full');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Gestion du formulaire de contact
const form = document.querySelector('.myform');
const submitButton = form.querySelector('button[type="submit"]');
const submitStatus = document.getElementById('submit-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Désactiver le bouton pendant l'envoi
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    
    // Réinitialiser les messages d'erreur
    const errorElements = document.querySelectorAll('[id$="-error"]');
    errorElements.forEach(el => {
        el.classList.add('hidden');
        el.textContent = '';
    });
    
    // Validation côté client
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    let hasErrors = false;
    
    // Validation des champs
    if (!data.prenom.trim()) {
        showError('prenom-error', 'Le prénom est requis');
        hasErrors = true;
    }
    
    if (!data.nom.trim()) {
        showError('nom-error', 'Le nom est requis');
        hasErrors = true;
    }
    
    if (!data.email.trim()) {
        showError('email-error', 'L\'email est requis');
        hasErrors = true;
    } else if (!isValidEmail(data.email)) {
        showError('email-error', 'Veuillez entrer un email valide');
        hasErrors = true;
    }
    
    if (!data.message.trim()) {
        showError('message-error', 'Le message est requis');
        hasErrors = true;
    }
    
    if (hasErrors) {
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyer le message';
        return;
    }
    
    try {
        // Simulation d'envoi (remplacer par votre logique d'envoi)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        submitStatus.textContent = 'Message envoyé avec succès !';
        submitStatus.className = 'text-center text-sm text-green-300';
        form.reset();
        
    } catch (error) {
        submitStatus.textContent = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
        submitStatus.className = 'text-center text-sm text-red-300';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyer le message';
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animation des cartes de compétences au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            entry.target.classList.add('animate-fadeInUp');
        }
    });
}, observerOptions);

// Observer les cartes de compétences
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});