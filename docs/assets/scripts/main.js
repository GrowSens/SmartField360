
const track = document.getElementById('sliderTrack');
const slides = Array.from(track.children);
const totalSlides = slides.length;
let currentSlide = 1;
let isMoving = false; // 👈 control de bloqueo

// Clona primero y último
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = track.children;
const slideWidth = window.innerWidth;

track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

window.addEventListener('resize', () => {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${window.innerWidth * currentSlide}px)`;
});

function moveSlide(direction) {
    if (isMoving) return; // 🛑 Evita múltiples clics rápidos
    isMoving = true;

    const slideCount = allSlides.length;
    const newSlide = currentSlide + direction;

    currentSlide = newSlide;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${window.innerWidth * currentSlide}px)`;

    track.addEventListener('transitionend', handleLoopFix, { once: true });
}

function handleLoopFix() {
    const slideCount = allSlides.length;

    if (currentSlide === slideCount - 1) {
        track.style.transition = 'none';
        currentSlide = 1;
        track.style.transform = `translateX(-${window.innerWidth * currentSlide}px)`;
    }

    if (currentSlide === 0) {
        track.style.transition = 'none';
        currentSlide = slideCount - 2;
        track.style.transform = `translateX(-${window.innerWidth * currentSlide}px)`;
    }

    // ✅ Permitir siguiente movimiento solo cuando terminó la transición
    isMoving = false;
}