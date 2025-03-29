document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 segundos
    
    // Cria os dots de navegação
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Inicia o slider automático
    function startSlider() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, intervalTime);
    }
    
    // Para o slider automático
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Vai para um slide específico
    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = (index + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1);
        stopSlider();
        startSlider();
    }
    
    // Próximo slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });
    
    // Pausa o slider quando o mouse está sobre ele
    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);
    
    // Inicia o slider
    startSlider();
});