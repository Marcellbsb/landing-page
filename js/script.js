
const form = document.querySelector(".contact-form form"); // Corrigido o seletor para pegar o formulário correto

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Previne o envio tradicional do formulário

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()); // Converte os dados do formulário para um objeto

  // Validação dos campos obrigatórios
  if (!data.name || !data.email || !data.service || !data.message) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Manipulação do botão de envio
  const submitButton = form.querySelector("button[type='submit']");
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  try {
    const response = await axios.post("http://localhost:5004/contact", data); // Corrigida a porta para 5004
    alert("Mensagem enviada com sucesso!");
    form.reset(); // Limpa o formulário
  } catch (error) {
    console.error("Erro ao enviar a mensagem:", error);
    
    // Mensagem de erro mais detalhada
    if (error.response) {
      // Se o backend retornou um erro com mensagem
      alert(`Erro ao enviar mensagem: ${error.response.data.error || 'Erro desconhecido'}`);
    } else {
      alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText; // Restaura o texto original
  }
});





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

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    
    const header = document.querySelector('header .container');
    header.prepend(menuToggle);
    
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
});